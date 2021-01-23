(function () {
    
    'use strict';

    // get all data in form and return object
    function getFormData(form) {
        var elements = form.elements;
        var honeypot;

        var fields = Object.keys(elements).filter(function(k) {
            if (elements[k].name === "honeypot" || elements[k].name === "address") {  // honeypot for dumb bots and address for smart bots
                if (elements[k].value !== "")
                    honeypot = true;
                
                return false;
            } else if (elements[k].name === "g-recaptcha-response")
                return false;
            
            return true;
        }).map(function(k) {
            if(elements[k].name !== undefined) {
                return elements[k].name;
                // special case for Edge's html collection
            } else if(elements[k].length > 0) {
                return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};    
        fields.forEach(function(name){
            var element = elements[name];

            // singular form elements just have one value
            formData[name] = element.value;

            // when our element has multiple items, get their values
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
                formData[name] = data.join(', ');
            }
        });
        
        fields.push('locationData', 'os', 'browser');

        /*var reCAPTCHA = document.querySelector('form #g-recaptcha-response');
        formData.reCAPTCHA = reCAPTCHA;*/
        
        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        // formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
        formData.locationData = 'https://tools.keycdn.com/geo.json?host=' + window.ip; // egy stringként adom vissza egyszerűen...
        formData.os = window.browserInfo.os;
        formData.browser = window.browserInfo.name + " " + window.browserInfo.version + " (" + window.browserInfo.screenSize + ")";
        
        return {data: formData, honeypot: honeypot};
    } // function getFormData(form)



    function handleFormSubmit(event) {  // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below         
        
        var form = event.target;  
        var formData = getFormData(form);
        var data = formData.data;

        // If a honeypot field is filled, assume it was done so by a spam bot.
        if (formData.honeypot) {
            return false;
        }

        disableAllButtons(form);
        var url = form.action;
        //var url = 'https://somewhere.org/i-dont-exist';  // for error testing purposes...
        var xhr = new XMLHttpRequest();
        
        var submitButton = form.querySelector("#submit-button");
        var formElements = form.querySelector(".fields");
            var contactMessageNodeList = document.querySelectorAll(".contact-message");  // <h2 class="contact-message">Kapcsolat</h2> 
        var contactMessages = [].slice.call(contactMessageNodeList); // no IE support for Array.from()...
        var reCAPTCHA = document.querySelector('div.g-recaptcha');
        
        var contactInner = document.querySelector('#contact > .inner');
        
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        /*xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
            // In local files, status is 0 upon success
            if ( xhr.readyState === XMLHttpRequest.DONE && (xhr.status === 0 || xhr.status === 200 )) {    
                //form.reset(); // no need to reset the form because we're going to hide it...
            }
        };*/
        
                
        xhr.onloadstart = function() { // no support for loadstart and loadend events in IE versions < 10...
            contactInner.style.opacity = 0.3;
            contactInner.style.transition = "none";
            //contactInner.style.filter = "blur(3px)"; // no IE support for filters...
            form.classList.add('overlay');
        }
        
        xhr.onload = function() {  // no support for load event in IE version < 9...         
            contactInner.style.opacity = 1;
            form.classList.remove('overlay');            
            
            // hide form
            if (formElements && contactMessages && submitButton && reCAPTCHA) {
                formElements.style.display = "none";
                contactMessages.forEach( function(message) { // no IE support for arrow functions...
                    message.style.display = "none";
                });
                submitButton.style.display = "none";
                reCAPTCHA.style.display = "none";
            }            
            
            // show thank you message
            var thankYouMessage = form.querySelector(".thankyou_message");
            if (thankYouMessage) {
                thankYouMessage.style.display = "block";
                var pEmail = document.createElement('p');
                pEmail.textContent = "📧: " + data.email;
                pEmail.style.fontSize = "larger";
                pEmail.style.color = "lightgrey";
                thankYouMessage.appendChild(pEmail);
            }
        };
        
        xhr.onerror = function() { // no support for error events in IE versions < 10...
            document.write('<h2>Hiba történt, kérjük próbálkozzon újra később. (Error ' + xhr.status + ')</h2>');     
        };
        
        // A 404 status will not trigger xhr.onerror() because, technically it's not an error; the 404 itself is a valid response.
        // One solution is to use the loadend() handler, which fires no matter what. Then check the status for 404, or whichever status you're interested in.
        xhr.onloadend = function() {
            if(xhr.status == 404) 
                throw new Error(url + ' replied 404');
        };
        
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
    } // function handleFormSubmit(event)


    function loaded() {
        var form = document.querySelector("form.gform");        
        
        // no support for element.dataset (ex.: form.dataset) in IE versions < 11
        // that we need in the "getFormData(form)" function:
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
        // because of this we can't send the email in those browsers so no form is provided for them...
        if (window.browserInfo.name === 'IE' && window.browserInfo.version < 11) {         
            // we use .script class to show elements when we have JS.
            // we might have JS but cannot send emails in IE < 11 so we hide these elements...
            var scriptNodeList = document.querySelectorAll(".script");
            var itemsToHide = [].slice.call(scriptNodeList); // no IE support for Array.from()...
            
            if (form && itemsToHide) {                
                form.style.display = "none";
                itemsToHide.forEach( function(item) { // no IE support for arrow functions...
                    item.style.display = "none";  // Array.forEach is supported in IE 9+
                });
            }
            
            // the same thing with the .noscript class, we use it show elements
            // when we have no JS.
            // Let's also show them when browser version < IE 11:
            var noscriptItem = document.querySelector('#noscript-fb-container');
            if ( noscriptItem ) {
                noscriptItem.style.display = "flex"; // only needed if main.js:47 doesn't work.
                noscriptItem.className = "fb-container"; // css class in main.css                
                // noscriptItem.classList.add('fb-container'); // doesn't work in IE < 10
            }
        }             
        
        
        // if the user scrolled below the advantages section or navigated to #contact section add validation logic to recaptcha
        function required() {   
            // window.scrollY does NOT work in IE!
            //      The pageYOffset property is an alias for the scrollY property.
            //          window.pageYOffset === window.scrollY; // always true
            //      For cross-browser compatibility, use window.pageYOffset instead of window.scrollY.
            if (window.pageYOffset > document.querySelector('#advantages').offsetTop || window.location.hash == "#contact") {
                
                // remove scroll event as soon as the above condition is met...
                window.removeEventListener('scroll', required);
                
                // check if recaptcha is in the DOM at every 100 ms.
                var exists = setInterval(function() {                    
                    var r=document.querySelector('#g-recaptcha-response');
                    if (r) {                        
                        r.required=true;
                        r.oninvalid=function() {
                            var inputs = [ document.querySelector('#name'), document.querySelector('#email'), document.querySelector('#message') ];
                            var allFilled = inputs.every( function(input) { return input.value } );
                            if ( allFilled ) { // only show this alert when all fields are filled
                                alert("Kérlek pipáld be hogy nem vagy robot!");
                            }       
                        }

                        // Get the IP address as well if we are here.
                        $.get("https://ipinfo.io", function (response) {
                            window.ip = response.ip;            
                        }, "jsonp");
                        /*$.ajax({
                            url: "https://ipinfo.io",
                            success: function (response) { window.ip = response.ip; },
                            dataType: "jsonp"
                            // timeout: 1000
                        });*/
                        
                        /* JSONP stands for JSON with Padding. It is a historical JavaScript technique for requesting a file from another domain can cause problems,
                        due to cross-domain policy. Requesting an external script from another domain does not have this problem. JSONP uses this advantage,
                        and request files using the script tag instead of the XMLHttpRequest object. */

                        clearInterval(exists);
                    }
                }, 100); 
            } // end of main if
        } // end of function required
        window.addEventListener('scroll', required);
        
        // In case of refreshing the browser when the URL has #contact in it.
        if (sessionStorage.getItem('reloaded')) { required(); }
        else sessionStorage.setItem('reloaded', 'true');
        
        
        // bind to the submit event of our form        
        form.addEventListener("submit", handleFormSubmit, false);
    } // function loaded()
    document.addEventListener("DOMContentLoaded", loaded, false);
        

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    } // function disableAllButtons(form)
    
})();