var mediaQuery = "(-webkit-min-device-pixel-ratio: 2),\
                  (min--moz-device-pixel-ratio: 2),\
                  (-o-min-device-pixel-ratio: 4/2),\
                  (min-resolution: 2dppx)";
var retina = ((window.devicePixelRatio > 1.5) || (window.matchMedia && window.matchMedia(mediaQuery).matches)) ? true : false;
var retinaLogo = function(el) {
    var el = $(el);
    if (retina == true) {
        if (el.attr("data-src2x")) {
            el.attr("src", el.attr("data-src2x"));
        }  
        else {
            el.attr("src", el.attr("data-src"));
        }
        if (el.attr("data-width2x")) {
            el.attr("width", el.attr("data-width2x"));
        }
    }
    else {
        if (el.attr("data-src")) {
            el.attr("src", el.attr("data-src"));
        }                  
    }    
}

var retinaBackground = function(el) {
    var el = $(el);
    if (retina == true) {
        if (el.attr("data-src2x")) {
            el.css("backgroundImage", "url(" + el.attr("data-src2x") + ")");
        }
        else {
            el.css("backgroundImage", "url(" + el.attr("data-src") + ")");
        }
        if (el.attr("data-width2x")) {
            el.css("width", el.attr("data-width2x"));
        }
    }
    else {
        if (el.attr("data-src")) {
            el.css("backgroundImage", "url(" + el.attr("data-src") + ")");
        }
    }
}