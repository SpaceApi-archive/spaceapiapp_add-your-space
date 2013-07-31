<?php

/**
 * Notes:
 *
 *  * URLs are not allowed to contain urlencoded data except in the query
 *     * http://stackoverflow.com/questions/3235219/urlencoded-forward-slash-is-breaking-url
 *     * http://stackoverflow.com/questions/1957115/is-a-slash-equivalent-to-an-encoded-slash-2f-in-the-path-portion-of-a
 *
 */

//********************************************************************
// do not edit this section

if(!defined("APPSDIR"))
    die("Direct access is not allowed!");

//********************************************************************

$page->addStylesheet("css/style.css");

$scripts = array(
    "add-your-space.js",
    "recaptcha_ajax.js"
);

foreach($scripts as $script)
    $page->addScript("scripts/$script");


$html = <<<HTML

    <section>
    
        <h2>Add your space</h2>
        
        <div class="row">
            <!-- we need the form for caching the URL, the request finally is made as ajax though -->
            <form id="add-your-space-url-form" action="" method="GET">
                <div class="span10">
                    <input type="text" id="add-your-space-url" name="url" style="width: 100%;" placeholder="http://put-here-the-spaceapi.implementation-endpoint.of-your-hackerspace.org/anization">        
                </div>
                <div class="span2">
                    <input class="btn" type="submit" id="add-your-space-submit" value="Add" style="width: 100%; height: 100%; padding-bottom: 5px;">
                </div>
            </form>
        </div>
        
        <div class="row">
        
            <div class="span5">
                <div class="spaceapi-box add-your-space-message-box">
                    <span id="add-your-space-error"><img src="../c/images/loadspinner.gif"></span>
                </div>
            </div>
            
            <div class="span7">
                <div class="spaceapi-box add-your-space-recaptcha-box">
                
                    <!--
                        The action URL and the method in this form are not relevant. The data are
                        transmitted to the URL defined in the submit event handler in add-hackerspace.js
                        by using the GET method. @see $('#add-space-form').submit(function(){...})
                    -->
                    <form id="add-your-space-recaptcha-form">

                        <p>
                            <div id="recaptcha_div"></div>
                        </p>
                        <p>
                            <button type="submit">Confirm</button>
                            <a id="add-your-space-recaptcha-cancel" href="">No thanks!</a>
                        </p>
                        <input type="hidden" value="" id="add-your-space-recaptcha-form-url" name="url"/>
                        <input type="hidden" value="" id="add-your-space-recaptcha-form-space" name="space"/>
                    </form>
                </div>
            </div>
        </div>
        
    </section>
    
    <hr>
    
    <section>
        <h2>Change request</h2>
        
        <p>
            If you want us change your endpoint URL, please choose one of the following options.
        </p>
        
        <p>
            <ol>
                <li>Create a new issue on <a href="https://github.com/spaceapi/OpenSpaceDirectory/issues/new" target="_blank">Github</a>.</li>
                <li>Join <a href="https://webchat.freenode.net/?channels=spaceapi" target="_blank">#spaceapi</a> on freenode.</li>
                <li>Subscribe to <a href="mailto:spaceapi-devel@lists.hackerspaces.org">spaceapi-devel@lists.hackerspaces.org</a> and ask for a change.</li>
            </ol>
        </p>
    </section>
HTML;

$page->addContent($html);