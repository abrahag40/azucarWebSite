/**
 * Panel de precios -- lectura y escritura (ADR-0007, Fase 1).
 *
 * `GET`  devuelve los precios tal como estan HOY en el repositorio.
 * `PUT`  escribe un precio nuevo, haciendo un commit, y Cloudflare Pages
 *        reconstruye el sitio solo.
 *
 * ── POR QUE LEE DE GITHUB Y NO DEL BUILD ───────────────────────────────────
 * Podria importar `src/data/precios.json` y servirlo, que es mas simple. Pero
 * ese JSON es el del ULTIMO BUILD, no el del repositorio: justo despues de
 * guardar un precio, el build tarda uno o dos minutos, y durante ese rato el
 * panel mostraria el valor viejo. Quien acaba de guardar creeria que fallo y
 * volveria a guardar. Leer del repositorio siempre dice la verdad.
 *
 * ── 🔴 QUIEN PUEDE LLAMAR A ESTO ───────────────────────────────────────────
 * La proteccion REAL es Cloudflare Access, configurado sobre `/panel*` y
 * sobre `/api/precios` -a nivel de RED: una peticion sin sesion valida no
 * llega hasta aqui-. Esta funcion comprueba ademas la cabecera que Access
 * inyecta (`Cf-Access-Jwt-Assertion`) como defensa en profundidad, y falla
 * cerrado si falta.
 *
 * ⚠️ ESA COMPROBACION NO VALIDA LA FIRMA DEL JWT. Comprueba que exista y que
 * traiga un correo. Es suficiente MIENTRAS Access este configurado -sin sesion
 * no hay cabecera que enviar-, pero no sustituye a Access: si alguien
 * desplegara este panel sin configurarlo, la cabecera se podria falsificar.
 * Validar la firma contra las claves publicas del equipo
 * (`https://<equipo>.cloudflareaccess.com/cdn-cgi/access/certs`) es trabajo de
 * la Fase 2 y **requisito de entrada a produccion**. Queda anotado aqui y en
 * el runbook, no en la memoria de nadie.
 *
 * ── EL RADIO DE DANO, LIMITADO POR DISENO ──────────────────────────────────
 * La ruta del archivo esta FIJADA EN EL CODIGO (`RUTA_PRECIOS`), no viene de
 * la peticion. Las claves aceptadas son las que ya existen en el archivo. El
 * valor tiene que pasar `precioValido`. Lo peor que puede lograr una peticion
 * manipulada es dejar un precio mal -reversible con `git revert`-, nunca
 * escribir otro archivo del repositorio.
 */
import { precioValido, PRECIO_MINIMO, PRECIO_MAXIMO, TIPOS_VALIDOS } from '../../src/data/precios.ts';

interface Entorno {
  /** Token de alcance fino, con permiso de CONTENIDO sobre ESTE repositorio y
   *  nada mas. Secreto de Cloudflare Pages, jamas en el repositorio (R-26). */
  GITHUB_TOKEN?: string;
  /** `usuario/repositorio`, p. ej. `abrahag40/azucarWebSite`. */
  GITHUB_REPO?: string;
  /** Rama sobre la que se hace el commit. */
  GITHUB_RAMA?: string;
}

/** 🔴 Fijada aqui a proposito: nunca se toma de la peticion. Ver cabecera. */
const RUTA_PRECIOS = 'site/src/data/precios.json';
const API = 'https://api.github.com';

interface ArchivoPrecios {
  moneda: string;
  actualizado: string | null;
  actualizadoPor: string | null;
  publicable: boolean;
  porTipo: Record<string, number | null>;
  [clave: string]: unknown;
}

export const onRequestGet = async (contexto: { request: Request; env: Entorno }): Promise<Response> => {
  const fallo = revisarAcceso(contexto.request, contexto.env);
  if (fallo) return fallo;
  try {
    const { contenido } = await leerPrecios(contexto.env);
    return json(200, contenido);
  } catch (err) {
    console.error('precios: fallo al leer', err);
    return json(502, { error: 'lectura-fallida' });
  }
};

export const onRequestPut = async (contexto: { request: Request; env: Entorno }): Promise<Response> => {
  const { request, env } = contexto;
  const fallo = revisarAcceso(request, env);
  if (fallo) return fallo;

  let cambio: { tipo?: string; precio?: unknown };
  try {
    cambio = await request.json();
  } catch {
    return json(400, { error: 'json-invalido' });
  }

  // 🔴 La validacion de la ENTRADA va ANTES de tocar la red, y el orden
  // importa por dos motivos:
  //   · Una peticion con basura se rechaza sin gastar una llamada a la API de
  //     GitHub, que tiene limite de uso.
  //   · Hace la funcion probable sin un token valido. Con la validacion
  //     despues de leer, un token de prueba devolvia 502 antes de llegar a
  //     comprobar nada, y la mitad del comportamiento quedaba sin verificar
  //     (L-074: probar contra el servicio real, incluso sin credenciales).
  //
  // `TIPOS_VALIDOS` sale del MISMO archivo que se va a escribir, importado en
  // el build. Asi una peticion manipulada no puede anadir tipos inventados ni
  // tocar `publicable` ni `moneda`.
  if (!cambio.tipo || !TIPOS_VALIDOS.includes(cambio.tipo)) {
    return json(400, { error: 'tipo-desconocido' });
  }
  // `null` es valido: es "borrar el precio", no un valor invalido.
  if (cambio.precio !== null && !precioValido(cambio.precio)) {
    return json(400, { error: 'precio-invalido', minimo: PRECIO_MINIMO, maximo: PRECIO_MAXIMO });
  }

  try {
    const { contenido, sha } = await leerPrecios(env);
    const correo = correoDeAcceso(request);
    const nuevo: ArchivoPrecios = {
      ...contenido,
      actualizado: new Date().toISOString(),
      actualizadoPor: correo,
      porTipo: { ...contenido.porTipo, [cambio.tipo]: cambio.precio as number | null },
    };

    await escribirPrecios(env, nuevo, sha, cambio.tipo, correo);
    // 202 y no 200: el commit esta hecho, pero el sitio TODAVIA no lo refleja
    // -Cloudflare tiene que reconstruir-. El codigo dice la verdad sobre el
    // estado real, y el panel lo usa para no decir "listo" antes de tiempo.
    return json(202, { guardado: true, porTipo: nuevo.porTipo, actualizado: nuevo.actualizado });
  } catch (err) {
    console.error('precios: fallo al escribir', err);
    return json(502, { error: 'escritura-fallida' });
  }
};

/** Falla cerrado: sin configuracion o sin sesion de Access, no se opera. */
function revisarAcceso(request: Request, env: Entorno): Response | null {
  if (!env.GITHUB_TOKEN || !env.GITHUB_REPO || !env.GITHUB_RAMA) {
    return json(503, { error: 'configuracion-incompleta' });
  }
  if (!correoDeAcceso(request)) {
    return json(403, { error: 'sin-sesion' });
  }
  return null;
}

/**
 * El correo de quien esta autenticado, segun la cabecera que inyecta
 * Cloudflare Access. Se lee del *payload* del JWT sin validar la firma -ver
 * la advertencia de la cabecera del archivo-. Sirve para dos cosas: exigir
 * que haya sesion, y firmar el commit con quien lo hizo.
 */
function correoDeAcceso(request: Request): string | null {
  const jwt = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!jwt) return null;
  const partes = jwt.split('.');
  if (partes.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(partes[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.email === 'string' ? payload.email : null;
  } catch {
    return null;
  }
}

async function leerPrecios(env: Entorno): Promise<{ contenido: ArchivoPrecios; sha: string }> {
  const url = `${API}/repos/${env.GITHUB_REPO}/contents/${RUTA_PRECIOS}?ref=${env.GITHUB_RAMA}`;
  const resp = await fetch(url, { headers: cabecerasGitHub(env) });
  if (!resp.ok) throw new Error(`GitHub respondio ${resp.status} al leer`);
  const datos = (await resp.json()) as { content: string; sha: string };
  // El contenido viene en base64 con saltos de linea que `atob` no tolera.
  const texto = new TextDecoder().decode(
    Uint8Array.from(atob(datos.content.replace(/\n/g, '')), (c) => c.charCodeAt(0)),
  );
  return { contenido: JSON.parse(texto) as ArchivoPrecios, sha: datos.sha };
}

async function escribirPrecios(
  env: Entorno,
  contenido: ArchivoPrecios,
  sha: string,
  tipo: string,
  correo: string | null,
): Promise<void> {
  const texto = JSON.stringify(contenido, null, 2) + '\n';
  const bytes = new TextEncoder().encode(texto);
  const base64 = btoa(String.fromCharCode(...bytes));

  const resp = await fetch(`${API}/repos/${env.GITHUB_REPO}/contents/${RUTA_PRECIOS}`, {
    method: 'PUT',
    headers: { ...cabecerasGitHub(env), 'content-type': 'application/json' },
    body: JSON.stringify({
      // Mensaje en espanol y con Conventional Commits, como el resto del
      // proyecto: estos commits van a convivir en el mismo `git log`.
      message: `chore(precios): ${tipo} actualizado desde el panel\n\nPor: ${correo ?? 'desconocido'}`,
      content: base64,
      // 🔴 El `sha` del archivo que se leyo. Si alguien mas lo cambio mientras
      // tanto, GitHub rechaza el commit en vez de pisar el cambio ajeno. Es
      // control de concurrencia optimista, y sale gratis con esta API.
      sha,
      branch: env.GITHUB_RAMA,
    }),
  });
  if (!resp.ok) throw new Error(`GitHub respondio ${resp.status} al escribir`);
}

function cabecerasGitHub(env: Entorno): Record<string, string> {
  return {
    authorization: `Bearer ${env.GITHUB_TOKEN}`,
    accept: 'application/vnd.github+json',
    'x-github-api-version': '2022-11-28',
    // GitHub exige `User-Agent` en todas las peticiones a su API.
    'user-agent': 'azucar-hotel-panel',
  };
}

function json(estado: number, datos: unknown): Response {
  return new Response(JSON.stringify(datos), {
    status: estado,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
