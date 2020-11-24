!function(){"use strict";function handleFormSubmit(encoded){encoded.preventDefault();var form=encoded.target,encoded=function(form){var honeypot,elements=form.elements,fields=Object.keys(elements).filter(function(k){return"honeypot"!==elements[k].name&&"address"!==elements[k].name||(honeypot=elements[k].value,!1)}).map(function(k){return void 0!==elements[k].name?elements[k].name:0<elements[k].length?elements[k].item(0).name:void 0}).filter(function(item,pos,self){return self.indexOf(item)==pos&&item}),formData={};return fields.forEach(function(name){var element=elements[name];if(formData[name]=element.value,element.length){for(var data=[],i=0;i<element.length;i++){var item=element.item(i);(item.checked||item.selected)&&data.push(item.value)}formData[name]=data.join(", ")}}),fields.push("locationData","os","browser","honeypot"),formData.formDataNameOrder=JSON.stringify(fields),formData.formGoogleSheetName=form.dataset.sheet||"responses",formData.formGoogleSendEmail=form.dataset.email||"",formData.locationData="https://tools.keycdn.com/geo.json?host="+window.ip,formData.os=window.browserInfo.os,formData.browser=window.browserInfo.name+" "+window.browserInfo.version+" ("+window.browserInfo.screenSize+")",{data:formData,honeypot:honeypot}}(form),data=encoded.data;if(encoded.honeypot)return!1;!function(form){for(var buttons=form.querySelectorAll("button"),i=0;i<buttons.length;i++)buttons[i].disabled=!0}(form);var url=form.action,xhr=new XMLHttpRequest,submitButton=form.querySelector("#submit-button"),formElements=form.querySelector(".fields"),encoded=document.querySelectorAll(".contact-message"),contactMessages=[].slice.call(encoded),reCAPTCHA=document.querySelector("div.g-recaptcha"),contactInner=document.querySelector("#contact > .inner");xhr.open("POST",url),xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),xhr.onloadstart=function(){contactInner.style.opacity=.3,contactInner.style.transition="none",form.classList.add("overlay")},xhr.onload=function(){contactInner.style.opacity=1,form.classList.remove("overlay"),formElements&&contactMessages&&submitButton&&(formElements.style.display="none",contactMessages.forEach(function(message){message.style.display="none"}),submitButton.style.display="none",reCAPTCHA.style.display="none");var pEmail,thankYouMessage=form.querySelector(".thankyou_message");thankYouMessage&&(thankYouMessage.style.display="block",(pEmail=document.createElement("p")).textContent="📧: "+data.email,pEmail.style.fontSize="larger",pEmail.style.color="lightgrey",thankYouMessage.appendChild(pEmail))},xhr.onerror=function(){document.write("<h2>Hiba történt, kérjük próbálkozzon újra később. (Error "+xhr.status+")</h2>")},xhr.onloadend=function(){if(404==xhr.status)throw new Error(url+" replied 404")};encoded=Object.keys(data).map(function(k){return encodeURIComponent(k)+"="+encodeURIComponent(data[k])}).join("&");xhr.send(encoded)}document.addEventListener("DOMContentLoaded",function(){var noscriptItem,form=document.querySelector("form.gform");"IE"===window.browserInfo.name&&window.browserInfo.version<11&&(noscriptItem=document.querySelectorAll(".script"),noscriptItem=[].slice.call(noscriptItem),form&&noscriptItem&&(form.style.display="none",noscriptItem.forEach(function(item){item.style.display="none"})),(noscriptItem=document.querySelector("#noscript-fb-container"))&&(noscriptItem.style.display="flex",noscriptItem.className="fb-container")),form.addEventListener("submit",handleFormSubmit,!1)},!1),window.onload=function(){document.querySelector("form.gform");var recaptcha=document.querySelector("#g-recaptcha-response");recaptcha&&(recaptcha.required=!0,recaptcha.oninvalid=function(e){[document.querySelector("#name"),document.querySelector("#email"),document.querySelector("#message")].every(function(input){return!input.value})&&alert("Kérlek pipáld be hogy nem vagy robot!")})}}();