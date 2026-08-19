jQuery( document ).ready(function() {
   console.log( "ready!" );
    
   jQuery('.telephone_input_class').each(function(index, value) {

      var name =  jQuery(this).attr("name");
      var enable_dropdown =  jQuery(this).attr("enable_dropdown");

      var inputa = document.querySelector("input[name="+ name +"]");

      const iti = window.intlTelInput(inputa, {
            allowDropdown: enable_dropdown,
            utilsScript: telephone_ajax.ajax_urla+"/public/js/utils.js",
      });

      // Function to update the hidden 'dial_code' field with the selected country's dial code
      function updateDialCode() {
         const dialCode = iti.getSelectedCountryData().dialCode; // Get dial code (e.g., '1', '91', etc.)
         jQuery("input[name='"+ name +"_dial_code']").val("+" + dialCode); // Set the dial code in the hidden field
      }

      // Update dial code on 'keyup', 'change', or 'countrychange' event
      inputa.addEventListener("keyup", updateDialCode);
      inputa.addEventListener("change", updateDialCode);
      inputa.addEventListener("countrychange", updateDialCode);
   });
});