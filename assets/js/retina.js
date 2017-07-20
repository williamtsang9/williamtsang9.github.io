// retina.js, a high-resolution image swapper (http://retinajs.com), v0.0.2


(function() {
    var root = (typeof exports === 'undefined' ? window : exports);
    var config = {
        // An option to choose a suffix for 2x images
        retinaImageSuffix : '@2x',

        // Ensure Content-Type is an image before trying to load @2x image
        // https://github.com/imulus/retinajs/pull/45)
        check_mime_type: true,

        // Resize high-resolution images to original image's pixel dimensions
        // https://github.com/imulus/retinajs/issues/8
        force_original_dimensions: true
    };

    function Retina() {}

    root.Retina = Retina;

    Retina.configure = function(options) {
        if (options === null) {
            options = {};
        }

        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                config[prop] = options[prop];
            }
        }
    };

    Retina.init = function(context) {
        if (context === null) {
            context = root;
        }
        context.addEventListener('load', function (){
            var images = document.getElementsByTagName('img'), imagesLength = images.length, retinaImages = [], i, image;
            for (i = 0; i < imagesLength; i += 1) {
                image = images[i];

                if (!!!image.getAttributeNode('data-no-retina')) {
                    if (image.src) {
                        retinaImages.push(new RetinaImage(image));
                    }
                }
            }
        });
    };

    Retina.isRetina = function(){
        var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

        if (root.devicePixelRatio > 1) {
            return true;
        }

        if (root.matchMedia && root.matchMedia(mediaQuery).matches) {
            return true;
        }

        return false;
    };


    var regexMatch = /\.[\w\?=]+$/;
    function suffixReplace (match) {
        return config.retinaImageSuffix + match;
    }

    function RetinaImagePath(path, at_2x_path) {
        this.path = path || '';
        if (typeof at_2x_path !== 'undefined' && at_2x_path !== null) {
            this.at_2x_path = at_2x_path;
            this.perform_check = false;
        } else {
            if (undefined !== document.createElement) {
                var locationObject = document.createElement('a');
                locationObject.href = this.path;
                locationObject.pathname = locationObject.pathname.replace(regexMatch, suffixReplace);
                this.at_2x_path = locationObject.href;
            } else {
                var parts = this.path.split('?');
                parts[0] = parts[0].replace(regexMatch, suffixReplace);
                this.at_2x_path = parts.join('?');
            }
            this.perform_check = true;
        }
    }

    root.RetinaImagePath = RetinaImagePath;

    RetinaImagePath.confirmed_paths = [];

    RetinaImagePath.prototype.is_external = function() {
        return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) );
    };

    RetinaImagePath.prototype.check_2x_variant = function(callback) {
        var http, that = this;
        if (!this.perform_check && typeof this.at_2x_path !== 'undefined' && this.at_2x_path !== null) {
            return callback(true);
        } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
            return callback(true);
        } else if (this.is_external()) {
            return callback(false);
        } else {
            http = new XMLHttpRequest();
            http.open('HEAD', this.at_2x_path);
            http.onreadystatechange = function() {
                if (http.readyState !== 4) {
                    return callback(false);
                }

                if (http.status >= 200 && http.status <= 399) {
                    if (config.check_mime_type) {
                        var type = http.getResponseHeader('Content-Type');
                        if (type === null || !type.match(/^image/i)) {
                            return callback(false);
                        }
                    }

                    RetinaImagePath.confirmed_paths.push(that.at_2x_path);
                    return callback(true);
                } else {
                    return callback(false);
                }
            };
            http.send();
        }
    };

    function RetinaImage(el) {
        this.el = el;
        this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
        var that = this;
        this.path.check_2x_variant(function(hasVariant) {
            if (hasVariant) {
                that.swap();
            }
        });
    }

    root.RetinaImage = RetinaImage;

    RetinaImage.prototype.swap = function(path) {
        if (typeof path === 'undefined') {
            path = this.path.at_2x_path;
        }

        var that = this;
        function load() {
            if (! that.el.complete) {
                setTimeout(load, 5);
            } else {
                if (config.force_original_dimensions) {
                    if (that.el.offsetWidth == 0 && that.el.offsetHeight == 0) {
                        that.el.setAttribute('width', that.el.naturalWidth);
                        that.el.setAttribute('height', that.el.naturalHeight);
                    } else {
                        that.el.setAttribute('width', that.el.offsetWidth);
                        that.el.setAttribute('height', that.el.offsetHeight);
                    }
                }

                that.el.setAttribute('src', path);
            }
        }
        load();
    };


    if (Retina.isRetina()) {
        Retina.init(root);
    }
})();

// (function(){function t(e){this.path=e;var t=this.path.split("."),n=t.slice(0,t.length-1).join("."),r=t[t.length-1];this.at_2x_path=n+"@2x."+r}function n(e){this.el=e,this.path=new t(this.el.getAttribute("src"));var n=this;this.path.check_2x_variant(function(e){e&&n.swap()})}var e=typeof exports=="undefined"?window:exports;e.RetinaImagePath=t,t.confirmed_paths=[],t.prototype.is_external=function(){return!!this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain)},t.prototype.check_2x_variant=function(e){var n,r=this;if(this.is_external())return e(!1);if(this.at_2x_path in t.confirmed_paths)return e(!0);n=new XMLHttpRequest,n.open("HEAD",this.at_2x_path),n.onreadystatechange=function(){return n.readyState!=4?e(!1):n.status>=200&&n.status<=399?(t.confirmed_paths.push(r.at_2x_path),e(!0)):e(!1)},n.send()},e.RetinaImage=n,n.prototype.swap=function(e){function n(){t.el.complete?(t.el.setAttribute("width",t.el.offsetWidth),t.el.setAttribute("height",t.el.offsetHeight),t.el.setAttribute("src",e)):setTimeout(n,5)}typeof e=="undefined"&&(e=this.path.at_2x_path);var t=this;n()},e.devicePixelRatio>1&&(window.onload=function(){var e=document.getElementsByTagName("img"),t=[],r,i;for(r=0;r<e.length;r++)i=e[r],t.push(new n(i))})})();