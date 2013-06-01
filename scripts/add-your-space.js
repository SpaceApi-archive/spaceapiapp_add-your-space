$(document).ready(function(){
    
    Recaptcha.create(
        recaptcha_public_key, // from config.js
        "recaptcha_div",
        {
            lang: "en",
            theme: "clean",
            callback: Recaptcha.focus_response_field
        }
    );
        
    $("#add-your-space-url-form").submit(function(){
        
        $(".add-your-space-message-box").fadeIn();
        $(".add-your-space-recaptcha-box").fadeOut();
        $("#add-your-space-error").html('<img src="../c/images/loadspinner.gif">');
        
        var url = $("#add-your-space-url").val();
        
        $.getJSON( site_url + "/validate/?url=" + url)
        .success(function(results) {
        
            if (results.hasOwnProperty("error")) {
                $("#add-your-space-error").text(results.error);
                $(".add-your-space-recaptcha-box").fadeOut();
                return;
            }
            
            if(results.valid.length>0)
            {              
                $("#add-your-space-error").html("Congrats, your implementation is valid. <br>Now <span id=\"add-your-space-recaptcha-confirm-link-span\">confirm that you're human</span>.");
                $("#add-your-space-recaptcha-form-url").val(url);
              
                $(".add-your-space-recaptcha-box").delay(1800).fadeIn("slow");
                
                try
                {
                    // reload the captcha and focus the text field
                    Recaptcha.reload();
                    
                    // TODO: why can't I focus the recaptcha input field?
                    //$("#recaptcha_response_field").delay(1900).focus();
                    Recaptcha.focus_response_field();
                    
                    $('#recaptcha_response_field').attr("style", "");
                
                    // TODO: remove the border, this doesn't work
                    //$('#recaptcha_table').delay(500).css("border", "none !important");
                }
                catch(e)
                {
                    $("#add-your-space-error").html("Could not refresch the captcha fields: " + e);
                }
            }
            else
            {
                $("#add-your-space-error").html('Your Space API implementation contains errors. Please check it with the <a href="validator">validator</a>.');
            }
        })
        .error(function(){
            $("#add-your-space-error").text("There's a problem with AJAX. One reason can be an adblock add-on in your browser that's blocking the request. Disable your adblock add-on and try again. If you're sure that this is not your issue please file a ticket here: https://github.com/slopjong/OpenSpaceLint/issues");
        });
        
        return false;
    }); 
    
    $('#add-your-space-recaptcha-form').submit(function() {
        $.getJSON(
            site_url + "/directory.json",
            $(this).serialize(),
            function(response){
                
                if(response.ok){
                    $("#add-your-space-error").text(response.message);
                    $(".add-your-space-recaptcha-box").fadeOut();
                }
                else{
                    $("#add-your-space-error")
                        .text("Your captcha was wrong, please retry!")
                        .show();
                    Recaptcha.reload();
                }
            }
        );
        
        return false;
    });
    
    $('#add-your-space-recaptcha-cancel').click(function(event){
        event.preventDefault();
        $(".add-your-space-recaptcha-box").fadeOut();
        $("#add-your-space-recaptcha-confirm-link-span").wrapInner('<a href="#" />');
        $("#add-your-space-recaptcha-confirm-link-span a").click(function(event){
            event.preventDefault();
            $(".add-your-space-recaptcha-box").fadeIn();
            
            // when making the recaptcha box visible again, remove the
            // link from the message box and make the text there normal again
            $("#add-your-space-recaptcha-confirm-link-span").text($(this).text());
        }); 
    });
    
    $("#add-your-space-url").focus();
});