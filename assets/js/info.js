window.browserInfo = (function() {
    
    var ua = navigator.userAgent, tem, M;

    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d.]+)/i) || [];

    var os = ua.substring( ua.indexOf('(') + 1, ua.indexOf(')') );
    var screenSize = window.screen.width + ' x ' + window.screen.height

    var browser = { name: undefined, version: undefined, os: os, screenSize: screenSize };

    /* IE version < 11 */    // We only use fb for IE version < 11, form-submission-handler.js --> function loaded()
    /*if (M[1] == 'MSIE') {  
        browser.name = 'IE'; browser.version = parseInt(M[2]);
        return browser;
    }*/

    /* IE 11 */
    if( /trident/i.test(M[1]) ) {
        tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
        browser.name = "IE", browser.version = (tem[1] || "");
        return browser;
    }

    /* Chromium, SamsungBrowser, Opera, Edge */
    if(M[1] === 'Chrome') {            
        tem = ua.match(/\b(OPR|SamsungBrowser|Edge?)\/([\d.]+)/);

        if (tem === null) {
            var isChromium = [].slice.call(navigator.plugins).some( function(plugin) { return plugin.name.match(/chromium/i) });
            if ( isChromium ) {
                browser.name = "Chromium", browser.version = M[2];
                return browser;
            }
        }

        if( tem !== null) {   
            browser.name = tem[1].replace('OPR', 'Opera').replace('Edg', 'Edge');
            browser.version = tem[2];
            return browser;
        }
    }

    M = M[2]
        ? [ M[1], M[2] ]
        : [navigator.appName, navigator.appVersion, '-?'];

    /* Safari ex.:  "Version/12.1"   */
    if((tem = ua.match(/version\/([\d.]+)/i)) !== null)
        // Starting from M[1] which is the version, delete 1 item, and use the version part of the array instead.
        M.splice(1, 1, tem[1]); 


    /* Tor Browser */
    if ( M[0] == 'Firefox' && !('geolocation' in navigator) )
        M[0] += '/Tor';

    browser.name = M[0], browser.version = M[1];
    return browser;
})();