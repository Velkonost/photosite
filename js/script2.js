(function() {
    var e, t, i, s, o, a = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        },
        r = [].indexOf || function(e) {
            for (var t = 0, i = this.length; i > t; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
    t = function() {
        function e() {}
        return e.prototype.extend = function(e, t) {
            var i, s;
            for (i in t) s = t[i], null == e[i] && (e[i] = s);
            return e
        }, e.prototype.isMobile = function(e) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
        }, e.prototype.createEvent = function(e, t, i, s) {
            var o;
            return null == t && (t = !1), null == i && (i = !1), null == s && (s = null), null != document.createEvent ? (o = document.createEvent("CustomEvent"), o.initCustomEvent(e, t, i, s)) : null != document.createEventObject ? (o = document.createEventObject(), o.eventType = e) : o.eventName = e, o
        }, e.prototype.emitEvent = function(e, t) {
            return null != e.dispatchEvent ? e.dispatchEvent(t) : t in (null != e) ? e[t]() : "on" + t in (null != e) ? e["on" + t]() : void 0
        }, e.prototype.addEvent = function(e, t, i) {
            return null != e.addEventListener ? e.addEventListener(t, i, !1) : null != e.attachEvent ? e.attachEvent("on" + t, i) : e[t] = i
        }, e.prototype.removeEvent = function(e, t, i) {
            return null != e.removeEventListener ? e.removeEventListener(t, i, !1) : null != e.detachEvent ? e.detachEvent("on" + t, i) : delete e[t]
        }, e.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, e
    }(), i = this.WeakMap || this.MozWeakMap || (i = function() {
        function e() {
            this.keys = [], this.values = []
        }
        return e.prototype.get = function(e) {
            var t, i, s, o, a;
            for (a = this.keys, t = s = 0, o = a.length; o > s; t = ++s)
                if (i = a[t], i === e) return this.values[t]
        }, e.prototype.set = function(e, t) {
            var i, s, o, a, r;
            for (r = this.keys, i = o = 0, a = r.length; a > o; i = ++o)
                if (s = r[i], s === e) return void(this.values[i] = t);
            return this.keys.push(e), this.values.push(t)
        }, e
    }()), e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function() {
        function e() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return e.notSupported = !0, e.prototype.observe = function() {}, e
    }()), s = this.getComputedStyle || function(e) {
        return this.getPropertyValue = function(t) {
            var i;
            return "float" === t && (t = "styleFloat"), o.test(t) && t.replace(o, function(e, t) {
                return t.toUpperCase()
            }), (null != (i = e.currentStyle) ? i[t] : void 0) || null
        }, this
    }, o = /(\-([a-z]){1})/g, this.WOW = function() {
        function o(e) {
            null == e && (e = {}), this.scrollCallback = a(this.scrollCallback, this), this.scrollHandler = a(this.scrollHandler, this), this.resetAnimation = a(this.resetAnimation, this), this.start = a(this.start, this), this.scrolled = !0, this.config = this.util().extend(e, this.defaults), null != e.scrollContainer && (this.config.scrollContainer = document.querySelector(e.scrollContainer)), this.animationNameCache = new i, this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return o.prototype.defaults = {
            boxClass: "js-animate",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
        }, o.prototype.init = function() {
            var e;
            return this.element = window.document.documentElement, "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, o.prototype.start = function() {
            var t, i, s, o;
            if (this.stopped = !1, this.boxes = function() {
                    var e, i, s, o;
                    for (s = this.element.querySelectorAll("." + this.config.boxClass), o = [], e = 0, i = s.length; i > e; e++) t = s[e], o.push(t);
                    return o
                }.call(this), this.all = function() {
                    var e, i, s, o;
                    for (s = this.boxes, o = [], e = 0, i = s.length; i > e; e++) t = s[e], o.push(t);
                    return o
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (o = this.boxes, i = 0, s = o.length; s > i; i++) t = o[i], this.applyStyle(t, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new e(function(e) {
                return function(t) {
                    var i, s, o, a, r;
                    for (r = [], i = 0, s = t.length; s > i; i++) a = t[i], r.push(function() {
                        var e, t, i, s;
                        for (i = a.addedNodes || [], s = [], e = 0, t = i.length; t > e; e++) o = i[e], s.push(this.doSync(o));
                        return s
                    }.call(e));
                    return r
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, o.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, o.prototype.sync = function() {
            return e.notSupported ? this.doSync(this.element) : void 0
        }, o.prototype.doSync = function(e) {
            var t, i, s, o, a;
            if (null == e && (e = this.element), 1 === e.nodeType) {
                for (e = e.parentNode || e, o = e.querySelectorAll("." + this.config.boxClass), a = [], i = 0, s = o.length; s > i; i++) t = o[i], r.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0), a.push(this.scrolled = !0)) : a.push(void 0);
                return a
            }
        }, o.prototype.show = function(e) {
            return this.applyStyle(e), e.className = e.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(e), this.util().emitEvent(e, this.wowEvent), this.util().addEvent(e, "animationend", this.resetAnimation), this.util().addEvent(e, "oanimationend", this.resetAnimation), this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation), e
        }, o.prototype.applyStyle = function(e, t) {
            var i, s, o;
            return s = e.getAttribute("data-wow-duration"), i = e.getAttribute("data-wow-delay"), o = e.getAttribute("data-wow-iteration"), this.animate(function(a) {
                return function() {
                    return a.customStyle(e, t, s, i, o)
                }
            }(this))
        }, o.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(e) {
                return window.requestAnimationFrame(e)
            } : function(e) {
                return e()
            }
        }(), o.prototype.resetStyle = function() {
            var e, t, i, s, o;
            for (s = this.boxes, o = [], t = 0, i = s.length; i > t; t++) e = s[t], o.push(e.style.visibility = "visible");
            return o
        }, o.prototype.resetAnimation = function(e) {
            var t;
            return e.type.toLowerCase().indexOf("animationend") >= 0 ? (t = e.target || e.srcElement, t.className = t.className.replace(this.config.animateClass, "").trim()) : void 0
        }, o.prototype.customStyle = function(e, t, i, s, o) {
            return t && this.cacheAnimationName(e), e.style.visibility = t ? "hidden" : "visible", i && this.vendorSet(e.style, {
                animationDuration: i
            }), s && this.vendorSet(e.style, {
                animationDelay: s
            }), o && this.vendorSet(e.style, {
                animationIterationCount: o
            }), this.vendorSet(e.style, {
                animationName: t ? "none" : this.cachedAnimationName(e)
            }), e
        }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function(e, t) {
            var i, s, o, a;
            s = [];
            for (i in t) o = t[i], e["" + i] = o, s.push(function() {
                var t, s, r, l;
                for (r = this.vendors, l = [], t = 0, s = r.length; s > t; t++) a = r[t], l.push(e["" + a + i.charAt(0).toUpperCase() + i.substr(1)] = o);
                return l
            }.call(this));
            return s
        }, o.prototype.vendorCSS = function(e, t) {
            var i, o, a, r, l, n;
            for (l = s(e), r = l.getPropertyCSSValue(t), a = this.vendors, i = 0, o = a.length; o > i; i++) n = a[i], r = r || l.getPropertyCSSValue("-" + n + "-" + t);
            return r
        }, o.prototype.animationName = function(e) {
            var t;
            try {
                t = this.vendorCSS(e, "animation-name").cssText
            } catch (i) {
                t = s(e).getPropertyValue("animation-name")
            }
            return "none" === t ? "" : t
        }, o.prototype.cacheAnimationName = function(e) {
            return this.animationNameCache.set(e, this.animationName(e))
        }, o.prototype.cachedAnimationName = function(e) {
            return this.animationNameCache.get(e)
        }, o.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, o.prototype.scrollCallback = function() {
            var e;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var t, i, s, o;
                for (s = this.boxes, o = [], t = 0, i = s.length; i > t; t++) e = s[t], e && (this.isVisible(e) ? this.show(e) : o.push(e));
                return o
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, o.prototype.offsetTop = function(e) {
            for (var t; void 0 === e.offsetTop;) e = e.parentNode;
            for (t = e.offsetTop; e = e.offsetParent;) t += e.offsetTop;
            return t
        }, o.prototype.isVisible = function(e) {
            var t, i, s, o, a;
            return i = e.getAttribute("data-wow-offset") || this.config.offset, a = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, o = a + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, s = this.offsetTop(e), t = s + e.clientHeight, o >= s && t >= a
        }, o.prototype.util = function() {
            return null != this._util ? this._util : this._util = new t
        }, o.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, o
    }()
}).call(this), (new WOW).init(),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["jquery"], function(e) {
            return t(e)
        }) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(this, function(e) {
        ! function() {
            "use strict";

            function t(t, s) {
                if (this.el = t, this.jQueryel = e(t), this.s = e.extend({}, i, s), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.jQueryitems = this.s.dynamic ? this.s.dynamicEl : "this" === this.s.selector ? this.jQueryel : "" !== this.s.selector ? this.s.selectWithin ? e(this.s.selectWithin).find(this.s.selector) : this.jQueryel.find(e(this.s.selector)) : this.jQueryel.children(), this.jQueryslide = "", this.jQueryouter = "", this.init(), this
            }
            var i = {
                mode: "lg-slide",
                cssEasing: "ease",
                easing: "linear",
                speed: 600,
                height: "100%",
                width: "100%",
                addClass: "",
                startClass: "lg-start-zoom",
                backdropDuration: 150,
                hideBarsDelay: 6e3,
                useLeft: !1,
                closable: !0,
                loop: !0,
                escKey: !0,
                keyPress: !0,
                controls: !0,
                slideEndAnimatoin: !0,
                hideControlOnEnd: !1,
                mousewheel: !0,
                getCaptionFromTitleOrAlt: !0,
                appendSubHtmlTo: ".lg-sub-html",
                subHtmlSelectorRelative: !1,
                preload: 1,
                showAfterLoad: !0,
                selector: "",
                selectWithin: "",
                nextHtml: "",
                prevHtml: "",
                index: !1,
                iframeMaxWidth: "100%",
                download: !0,
                counter: !0,
                appendCounterTo: ".lg-toolbar",
                swipeThreshold: 50,
                enableSwipe: !0,
                enableDrag: !0,
                dynamic: !1,
                dynamicEl: [],
                galleryId: 1
            };
            t.prototype.init = function() {
                var t = this;
                t.s.preload > t.jQueryitems.length && (t.s.preload = t.jQueryitems.length);
                var i = window.location.hash;
                i.indexOf("lg=" + this.s.galleryId) > 0 && (t.index = parseInt(i.split("&slide=")[1], 10), e("body").addClass("lg-from-hash"), e("body").hasClass("lg-on") || (setTimeout(function() {
                    t.build(t.index)
                }), e("body").addClass("lg-on"))), t.s.dynamic ? (t.jQueryel.trigger("onBeforeOpen.lg"), t.index = t.s.index || 0, e("body").hasClass("lg-on") || setTimeout(function() {
                    t.build(t.index), e("body").addClass("lg-on")
                })) : t.jQueryitems.on("click.lgcustom", function(i) {
                    try {
                        i.preventDefault(), i.preventDefault()
                    } catch (s) {
                        i.returnValue = !1
                    }
                    t.jQueryel.trigger("onBeforeOpen.lg"), t.index = t.s.index || t.jQueryitems.index(this), e("body").hasClass("lg-on") || (t.build(t.index), e("body").addClass("lg-on"))
                })
            }, t.prototype.build = function(t) {
                var i = this;
                i.structure(), e.each(e.fn.lightGallery.modules, function(t) {
                    i.modules[t] = new e.fn.lightGallery.modules[t](i.el)
                }), i.slide(t, !1, !1), i.s.keyPress && i.keyPress(), i.jQueryitems.length > 1 && (i.arrow(), setTimeout(function() {
                    i.enableDrag(), i.enableSwipe()
                }, 50), i.s.mousewheel && i.mousewheel()), i.counter(), i.closeGallery(), i.jQueryel.trigger("onAfterOpen.lg"), i.jQueryouter.on("mousemove.lg click.lg touchstart.lg", function() {
                    i.jQueryouter.removeClass("lg-hide-items"), clearTimeout(i.hideBartimeout), i.hideBartimeout = setTimeout(function() {
                        i.jQueryouter.addClass("lg-hide-items")
                    }, i.s.hideBarsDelay)
                })
            }, t.prototype.structure = function() {
                var t, i = "",
                    s = "",
                    o = 0,
                    a = "",
                    r = this;
                for (e("body").append('<div class="lg-backdrop"></div>'), e(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), o = 0; o < this.jQueryitems.length; o++) i += '<div class="lg-item"></div>';
                if (this.s.controls && this.jQueryitems.length > 1 && (s = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (a = '<div class="lg-sub-html"></div>'), t = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + i + '</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>' + s + a + "</div></div>", e("body").append(t), this.jQueryouter = e(".lg-outer"), this.jQueryslide = this.jQueryouter.find(".lg-item"), this.s.useLeft ? (this.jQueryouter.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.jQueryouter.addClass("lg-use-css3"), r.setTop(), e(window).on("resize.lg orientationchange.lg", function() {
                        setTimeout(function() {
                            r.setTop()
                        }, 100)
                    }), this.jQueryslide.eq(this.index).addClass("lg-current"), this.doCss() ? this.jQueryouter.addClass("lg-css3") : (this.jQueryouter.addClass("lg-css"), this.s.speed = 0), this.jQueryouter.addClass(this.s.mode), this.s.enableDrag && this.jQueryitems.length > 1 && this.jQueryouter.addClass("lg-grab"), this.s.showAfterLoad && this.jQueryouter.addClass("lg-show-after-load"), this.doCss()) {
                    var l = this.jQueryouter.find(".lg-inner");
                    l.css("transition-timing-function", this.s.cssEasing), l.css("transition-duration", this.s.speed + "ms")
                }
                setTimeout(function() {
                    e(".lg-backdrop").addClass("in")
                }), setTimeout(function() {
                    r.jQueryouter.addClass("lg-visible")
                }, this.s.backdropDuration), this.s.download && this.jQueryouter.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = e(window).scrollTop()
            }, t.prototype.setTop = function() {
                if ("100%" !== this.s.height) {
                    var t = e(window).height(),
                        i = (t - parseInt(this.s.height, 10)) / 2,
                        s = this.jQueryouter.find(".lg");
                    t >= parseInt(this.s.height, 10) ? s.css("top", i + "px") : s.css("top", "0px")
                }
            }, t.prototype.doCss = function() {
                var e = function() {
                    var e = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                        t = document.documentElement,
                        i = 0;
                    for (i = 0; i < e.length; i++)
                        if (e[i] in t.style) return !0
                };
                return e() ? !0 : !1
            }, t.prototype.isVideo = function(e, t) {
                var i;
                if (i = this.s.dynamic ? this.s.dynamicEl[t].html : this.jQueryitems.eq(t).attr("data-html"), !e && i) return {
                    html5: !0
                };
                var s = e.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                    o = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                    a = e.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                    r = e.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
                return s ? {
                    youtube: s
                } : o ? {
                    vimeo: o
                } : a ? {
                    dailymotion: a
                } : r ? {
                    vk: r
                } : void 0
            }, t.prototype.counter = function() {
                this.s.counter && e(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.jQueryitems.length + "</span></div>")
            }, t.prototype.addHtml = function(t) {
                var i, s, o = null;
                if (this.s.dynamic ? this.s.dynamicEl[t].subHtmlUrl ? i = this.s.dynamicEl[t].subHtmlUrl : o = this.s.dynamicEl[t].subHtml : (s = this.jQueryitems.eq(t), s.attr("data-sub-html-url") ? i = s.attr("data-sub-html-url") : (o = s.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !o && (o = s.attr("title") || s.find("img").first().attr("alt")))), !i)
                    if ("undefined" != typeof o && null !== o) {
                        var a = o.substring(0, 1);
                        ("." === a || "#" === a) && (o = this.s.subHtmlSelectorRelative && !this.s.dynamic ? s.find(o).html() : e(o).html())
                    } else o = "";
                    ".lg-sub-html" === this.s.appendSubHtmlTo ? i ? this.jQueryouter.find(this.s.appendSubHtmlTo).load(i) : this.jQueryouter.find(this.s.appendSubHtmlTo).html(o) : i ? this.jQueryslide.eq(t).load(i) : this.jQueryslide.eq(t).append(o), "undefined" != typeof o && null !== o && ("" === o ? this.jQueryouter.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.jQueryouter.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.jQueryel.trigger("onAfterAppendSubHtml.lg", [t])
            }, t.prototype.preload = function(e) {
                var t = 1,
                    i = 1;
                for (t = 1; t <= this.s.preload && !(t >= this.jQueryitems.length - e); t++) this.loadContent(e + t, !1, 0);
                for (i = 1; i <= this.s.preload && !(0 > e - i); i++) this.loadContent(e - i, !1, 0)
            }, t.prototype.loadContent = function(t, i, s) {
                var o, a, r, l, n, p, c = this,
                    h = !1,
                    d = function(t) {
                        for (var i = [], s = [], o = 0; o < t.length; o++) {
                            var r = t[o].split(" ");
                            "" === r[0] && r.splice(0, 1), s.push(r[0]), i.push(r[1])
                        }
                        for (var l = e(window).width(), n = 0; n < i.length; n++)
                            if (parseInt(i[n], 10) > l) {
                                a = s[n];
                                break
                            }
                    };
                if (c.s.dynamic) {
                    if (c.s.dynamicEl[t].poster && (h = !0, r = c.s.dynamicEl[t].poster), p = c.s.dynamicEl[t].html, a = c.s.dynamicEl[t].src, c.s.dynamicEl[t].responsive) {
                        var u = c.s.dynamicEl[t].responsive.split(",");
                        d(u)
                    }
                    l = c.s.dynamicEl[t].srcset, n = c.s.dynamicEl[t].sizes
                } else {
                    if (c.jQueryitems.eq(t).attr("data-poster") && (h = !0, r = c.jQueryitems.eq(t).attr("data-poster")), p = c.jQueryitems.eq(t).attr("data-html"), a = c.jQueryitems.eq(t).attr("href") || c.jQueryitems.eq(t).attr("data-src"), c.jQueryitems.eq(t).attr("data-responsive")) {
                        var _ = c.jQueryitems.eq(t).attr("data-responsive").split(",");
                        d(_)
                    }
                    l = c.jQueryitems.eq(t).attr("data-srcset"), n = c.jQueryitems.eq(t).attr("data-sizes")
                }
                var m = !1;
                c.s.dynamic ? c.s.dynamicEl[t].iframe && (m = !0) : "true" === c.jQueryitems.eq(t).attr("data-iframe") && (m = !0);
                var jQuery = c.isVideo(a, t);
                if (!c.jQueryslide.eq(t).hasClass("lg-loaded")) {
                    if (m) c.jQueryslide.eq(t).prepend('<div class="lg-video-cont" style="max-width:' + c.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + a + '"  allowfullscreen="true"></iframe></div></div>');
                    else if (h) {
                        var v = "";
                        v = jQuery && jQuery.youtube ? "lg-has-youtube" : jQuery && jQuery.vimeo ? "lg-has-vimeo" : "lg-has-html5", c.jQueryslide.eq(t).prepend('<div class="lg-video-cont ' + v + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + r + '" /></div></div>')
                    } else jQuery ? (c.jQueryslide.eq(t).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), c.jQueryel.trigger("hasVideo.lg", [t, a, p])) : c.jQueryslide.eq(t).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + a + '" /></div>');
                    if (c.jQueryel.trigger("onAferAppendSlide.lg", [t]), o = c.jQueryslide.eq(t).find(".lg-object"), n && o.attr("sizes", n), l) {
                        o.attr("srcset", l);
                        try {
                            picturefill({
                                elements: [o[0]]
                            })
                        } catch (g) {
                            console.error("Make sure you have included Picturefill version 2")
                        }
                    }
                    ".lg-sub-html" !== this.s.appendSubHtmlTo && c.addHtml(t), c.jQueryslide.eq(t).addClass("lg-loaded")
                }
                c.jQueryslide.eq(t).find(".lg-object").on("load.lg error.lg", function() {
                    var i = 0;
                    s && !e("body").hasClass("lg-from-hash") && (i = s), setTimeout(function() {
                        c.jQueryslide.eq(t).addClass("lg-complete"), c.jQueryel.trigger("onSlideItemLoad.lg", [t, s || 0])
                    }, i)
                }), jQuery && jQuery.html5 && !h && c.jQueryslide.eq(t).addClass("lg-complete"), i === !0 && (c.jQueryslide.eq(t).hasClass("lg-complete") ? c.preload(t) : c.jQueryslide.eq(t).find(".lg-object").on("load.lg error.lg", function() {
                    c.preload(t)
                }))
            }, t.prototype.slide = function(t, i, s) {
                var o = this.jQueryouter.find(".lg-current").index(),
                    a = this;
                if (!a.lGalleryOn || o !== t) {
                    var r = this.jQueryslide.length,
                        l = a.lGalleryOn ? this.s.speed : 0,
                        n = !1,
                        p = !1;
                    if (!a.lgBusy) {
                        if (this.s.download) {
                            var c;
                            c = a.s.dynamic ? a.s.dynamicEl[t].downloadUrl !== !1 && (a.s.dynamicEl[t].downloadUrl || a.s.dynamicEl[t].src) : "false" !== a.jQueryitems.eq(t).attr("data-download-url") && (a.jQueryitems.eq(t).attr("data-download-url") || a.jQueryitems.eq(t).attr("href") || a.jQueryitems.eq(t).attr("data-src")), c ? (e("#lg-download").attr("href", c), a.jQueryouter.removeClass("lg-hide-download")) : a.jQueryouter.addClass("lg-hide-download")
                        }
                        if (this.jQueryel.trigger("onBeforeSlide.lg", [o, t, i, s]), a.lgBusy = !0, clearTimeout(a.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                                a.addHtml(t)
                            }, l), this.arrowDisable(t), i) {
                            var h = t - 1,
                                d = t + 1;
                            0 === t && o === r - 1 ? (d = 0, h = r - 1) : t === r - 1 && 0 === o && (d = 0, h = r - 1), this.jQueryslide.removeClass("lg-prev-slide lg-current lg-next-slide"), a.jQueryslide.eq(h).addClass("lg-prev-slide"), a.jQueryslide.eq(d).addClass("lg-next-slide"), a.jQueryslide.eq(t).addClass("lg-current")
                        } else a.jQueryouter.addClass("lg-no-trans"), this.jQueryslide.removeClass("lg-prev-slide lg-next-slide"), o > t ? (p = !0, 0 !== t || o !== r - 1 || s || (p = !1, n = !0)) : t > o && (n = !0, t !== r - 1 || 0 !== o || s || (p = !0, n = !1)), p ? (this.jQueryslide.eq(t).addClass("lg-prev-slide"), this.jQueryslide.eq(o).addClass("lg-next-slide")) : n && (this.jQueryslide.eq(t).addClass("lg-next-slide"), this.jQueryslide.eq(o).addClass("lg-prev-slide")), setTimeout(function() {
                            a.jQueryslide.removeClass("lg-current"), a.jQueryslide.eq(t).addClass("lg-current"), a.jQueryouter.removeClass("lg-no-trans")
                        }, 50);
                        a.lGalleryOn ? (setTimeout(function() {
                            a.loadContent(t, !0, 0)
                        }, this.s.speed + 50), setTimeout(function() {
                            a.lgBusy = !1, a.jQueryel.trigger("onAfterSlide.lg", [o, t, i, s])
                        }, this.s.speed)) : (a.loadContent(t, !0, a.s.backdropDuration), a.lgBusy = !1, a.jQueryel.trigger("onAfterSlide.lg", [o, t, i, s])), a.lGalleryOn = !0, this.s.counter && e("#lg-counter-current").text(t + 1)
                    }
                }
            }, t.prototype.goToNextSlide = function(e) {
                var t = this;
                t.lgBusy || (t.index + 1 < t.jQueryslide.length ? (t.index++, t.jQueryel.trigger("onBeforeNextSlide.lg", [t.index]), t.slide(t.index, e, !1)) : t.s.loop ? (t.index = 0, t.jQueryel.trigger("onBeforeNextSlide.lg", [t.index]), t.slide(t.index, e, !1)) : t.s.slideEndAnimatoin && (t.jQueryouter.addClass("lg-right-end"), setTimeout(function() {
                    t.jQueryouter.removeClass("lg-right-end")
                }, 400)))
            }, t.prototype.goToPrevSlide = function(e) {
                var t = this;
                t.lgBusy || (t.index > 0 ? (t.index--, t.jQueryel.trigger("onBeforePrevSlide.lg", [t.index, e]), t.slide(t.index, e, !1)) : t.s.loop ? (t.index = t.jQueryitems.length - 1, t.jQueryel.trigger("onBeforePrevSlide.lg", [t.index, e]), t.slide(t.index, e, !1)) : t.s.slideEndAnimatoin && (t.jQueryouter.addClass("lg-left-end"), setTimeout(function() {
                    t.jQueryouter.removeClass("lg-left-end")
                }, 400)))
            }, t.prototype.keyPress = function() {
                var t = this;
                this.jQueryitems.length > 1 && e(window).on("keyup.lg", function(e) {
                    t.jQueryitems.length > 1 && (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()), 39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()))
                }), e(window).on("keydown.lg", function(e) {
                    t.s.escKey === !0 && 27 === e.keyCode && (e.preventDefault(), t.jQueryouter.hasClass("lg-thumb-open") ? t.jQueryouter.removeClass("lg-thumb-open") : t.destroy())
                })
            }, t.prototype.arrow = function() {
                var e = this;
                this.jQueryouter.find(".lg-prev").on("click.lg", function() {
                    e.goToPrevSlide()
                }), this.jQueryouter.find(".lg-next").on("click.lg", function() {
                    e.goToNextSlide()
                })
            }, t.prototype.arrowDisable = function(e) {
                !this.s.loop && this.s.hideControlOnEnd && (e + 1 < this.jQueryslide.length ? this.jQueryouter.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.jQueryouter.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), e > 0 ? this.jQueryouter.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.jQueryouter.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
            }, t.prototype.setTranslate = function(e, t, i) {
                this.s.useLeft ? e.css("left", t) : e.css({
                    transform: "translate3d(" + t + "px, " + i + "px, 0px)"
                })
            }, t.prototype.touchMove = function(t, i) {
                var s = i - t;
                Math.abs(s) > 15 && (this.jQueryouter.addClass("lg-dragging"), this.setTranslate(this.jQueryslide.eq(this.index), s, 0), this.setTranslate(e(".lg-prev-slide"), -this.jQueryslide.eq(this.index).width() + s, 0), this.setTranslate(e(".lg-next-slide"), this.jQueryslide.eq(this.index).width() + s, 0))
            }, t.prototype.touchEnd = function(e) {
                var t = this;
                "lg-slide" !== t.s.mode && t.jQueryouter.addClass("lg-slide"), this.jQueryslide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                    t.jQueryouter.removeClass("lg-dragging"), 0 > e && Math.abs(e) > t.s.swipeThreshold ? t.goToNextSlide(!0) : e > 0 && Math.abs(e) > t.s.swipeThreshold ? t.goToPrevSlide(!0) : Math.abs(e) < 5 && t.jQueryel.trigger("onSlideClick.lg"), t.jQueryslide.removeAttr("style")
                }), setTimeout(function() {
                    t.jQueryouter.hasClass("lg-dragging") || "lg-slide" === t.s.mode || t.jQueryouter.removeClass("lg-slide")
                }, t.s.speed + 100)
            }, t.prototype.enableSwipe = function() {
                var e = this,
                    t = 0,
                    i = 0,
                    s = !1;
                e.s.enableSwipe && e.isTouch && e.doCss() && (e.jQueryslide.on("touchstart.lg", function(i) {
                    e.jQueryouter.hasClass("lg-zoomed") || e.lgBusy || (i.preventDefault(), e.manageSwipeClass(), t = i.originalEvent.targetTouches[0].pageX)
                }), e.jQueryslide.on("touchmove.lg", function(o) {
                    e.jQueryouter.hasClass("lg-zoomed") || (o.preventDefault(), i = o.originalEvent.targetTouches[0].pageX, e.touchMove(t, i), s = !0)
                }), e.jQueryslide.on("touchend.lg", function() {
                    e.jQueryouter.hasClass("lg-zoomed") || (s ? (s = !1, e.touchEnd(i - t)) : e.jQueryel.trigger("onSlideClick.lg"))
                }))
            }, t.prototype.enableDrag = function() {
                var t = this,
                    i = 0,
                    s = 0,
                    o = !1,
                    a = !1;
                t.s.enableDrag && !t.isTouch && t.doCss() && (t.jQueryslide.on("mousedown.lg", function(s) {
                    t.jQueryouter.hasClass("lg-zoomed") || (e(s.target).hasClass("lg-object") || e(s.target).hasClass("lg-video-play")) && (s.preventDefault(), t.lgBusy || (t.manageSwipeClass(), i = s.pageX, o = !0, t.jQueryouter.scrollLeft += 1, t.jQueryouter.scrollLeft -= 1, t.jQueryouter.removeClass("lg-grab").addClass("lg-grabbing"), t.jQueryel.trigger("onDragstart.lg")))
                }), e(window).on("mousemove.lg", function(e) {
                    o && (a = !0, s = e.pageX, t.touchMove(i, s), t.jQueryel.trigger("onDragmove.lg"))
                }), e(window).on("mouseup.lg", function(r) {
                    a ? (a = !1, t.touchEnd(s - i), t.jQueryel.trigger("onDragend.lg")) : (e(r.target).hasClass("lg-object") || e(r.target).hasClass("lg-video-play")) && t.jQueryel.trigger("onSlideClick.lg"), o && (o = !1, t.jQueryouter.removeClass("lg-grabbing").addClass("lg-grab"))
                }))
            }, t.prototype.manageSwipeClass = function() {
                var e = this.index + 1,
                    t = this.index - 1,
                    i = this.jQueryslide.length;
                this.s.loop && (0 === this.index ? t = i - 1 : this.index === i - 1 && (e = 0)), this.jQueryslide.removeClass("lg-next-slide lg-prev-slide"), t > -1 && this.jQueryslide.eq(t).addClass("lg-prev-slide"), this.jQueryslide.eq(e).addClass("lg-next-slide")
            }, t.prototype.mousewheel = function() {
                var e = this;
                e.jQueryouter.on("mousewheel.lg", function(t) {
                    t.deltaY && (t.deltaY > 0 ? e.goToPrevSlide() : e.goToNextSlide(), t.preventDefault())
                })
            }, t.prototype.closeGallery = function() {
                var t = this,
                    i = !1;
                this.jQueryouter.find(".lg-close").on("click.lg", function() {
                    t.destroy()
                }), t.s.closable && (t.jQueryouter.on("mousedown.lg", function(t) {
                    i = e(t.target).is(".lg-outer") || e(t.target).is(".lg-item ") || e(t.target).is(".lg-img-wrap") ? !0 : !1
                }), t.jQueryouter.on("mouseup.lg", function(s) {
                    (e(s.target).is(".lg-outer") || e(s.target).is(".lg-item ") || e(s.target).is(".lg-img-wrap") && i) && (t.jQueryouter.hasClass("lg-dragging") || t.destroy())
                }))
            }, t.prototype.destroy = function(t) {
                var i = this;
                t || i.jQueryel.trigger("onBeforeClose.lg"), e(window).scrollTop(i.prevScrollTop), t && (i.s.dynamic || this.jQueryitems.off("click.lg click.lgcustom"), e.removeData(i.el, "lightGallery")), this.jQueryel.off(".lg.tm"), e.each(e.fn.lightGallery.modules, function(e) {
                    i.modules[e] && i.modules[e].destroy()
                }), this.lGalleryOn = !1, clearTimeout(i.hideBartimeout), this.hideBartimeout = !1, e(window).off(".lg"), e("body").removeClass("lg-on lg-from-hash"), i.jQueryouter && i.jQueryouter.removeClass("lg-visible"), e(".lg-backdrop").removeClass("in"), setTimeout(function() {
                    i.jQueryouter && i.jQueryouter.remove(), e(".lg-backdrop").remove(), t || i.jQueryel.trigger("onCloseAfter.lg")
                }, i.s.backdropDuration + 50)
            }, e.fn.lightGallery = function(i) {
                return this.each(function() {
                    if (e.data(this, "lightGallery")) try {
                        e(this).data("lightGallery").init()
                    } catch (s) {
                        console.error("lightGallery has not initiated properly")
                    } else e.data(this, "lightGallery", new t(this, i))
                })
            }, e.fn.lightGallery.modules = {}
        }()
    }), jQuery(document).ready(function() {
        jQuery(".js-gallery").lightGallery({
            selector: "a"
        })
    }),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        "use strict";
        var t = window.Slick || {};
        t = function() {
            function t(t, s) {
                var o, a = this;
                a.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: e(t),
                    appendDots: e(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, i) {
                        return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, a.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    jQuerydots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    jQuerynextArrow: null,
                    jQueryprevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    jQueryslideTrack: null,
                    jQueryslides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    jQuerylist: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, e.extend(a, a.initials), a.activeBreakpoint = null, a.animType = null, a.animProp = null, a.breakpoints = [], a.breakpointSettings = [], a.cssTransitions = !1, a.focussed = !1, a.interrupted = !1, a.hidden = "hidden", a.paused = !0, a.positionProp = null, a.respondTo = null, a.rowCount = 1, a.shouldClick = !0, a.jQueryslider = e(t), a.jQueryslidesCache = null, a.transformType = null, a.transitionType = null, a.visibilityChange = "visibilitychange", a.windowWidth = 0, a.windowTimer = null, o = e(t).data("slick") || {}, a.options = e.extend({}, a.defaults, s, o), a.currentSlide = a.options.initialSlide, a.originalSettings = a.options, "undefined" != typeof document.mozHidden ? (a.hidden = "mozHidden", a.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (a.hidden = "webkitHidden", a.visibilityChange = "webkitvisibilitychange"), a.autoPlay = e.proxy(a.autoPlay, a), a.autoPlayClear = e.proxy(a.autoPlayClear, a), a.autoPlayIterator = e.proxy(a.autoPlayIterator, a), a.changeSlide = e.proxy(a.changeSlide, a), a.clickHandler = e.proxy(a.clickHandler, a), a.selectHandler = e.proxy(a.selectHandler, a), a.setPosition = e.proxy(a.setPosition, a), a.swipeHandler = e.proxy(a.swipeHandler, a), a.dragHandler = e.proxy(a.dragHandler, a), a.keyHandler = e.proxy(a.keyHandler, a), a.instanceUid = i++, a.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)jQuery/, a.registerBreakpoints(), a.init(!0)
            }
            var i = 0;
            return t
        }(), t.prototype.activateADA = function() {
            var e = this;
            e.jQueryslideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, t.prototype.addSlide = t.prototype.slickAdd = function(t, i, s) {
            var o = this;
            if ("boolean" == typeof i) s = i, i = null;
            else if (0 > i || i >= o.slideCount) return !1;
            o.unload(), "number" == typeof i ? 0 === i && 0 === o.jQueryslides.length ? e(t).appendTo(o.jQueryslideTrack) : s ? e(t).insertBefore(o.jQueryslides.eq(i)) : e(t).insertAfter(o.jQueryslides.eq(i)) : s === !0 ? e(t).prependTo(o.jQueryslideTrack) : e(t).appendTo(o.jQueryslideTrack), o.jQueryslides = o.jQueryslideTrack.children(this.options.slide), o.jQueryslideTrack.children(this.options.slide).detach(), o.jQueryslideTrack.append(o.jQueryslides), o.jQueryslides.each(function(t, i) {
                e(i).attr("data-slick-index", t)
            }), o.jQueryslidesCache = o.jQueryslides, o.reinit()
        }, t.prototype.animateHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                var t = e.jQueryslides.eq(e.currentSlide).outerHeight(!0);
                e.jQuerylist.animate({
                    height: t
                }, e.options.speed)
            }
        }, t.prototype.animateSlide = function(t, i) {
            var s = {},
                o = this;
            o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (t = -t), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.jQueryslideTrack.animate({
                left: t
            }, o.options.speed, o.options.easing, i) : o.jQueryslideTrack.animate({
                top: t
            }, o.options.speed, o.options.easing, i) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), e({
                animStart: o.currentLeft
            }).animate({
                animStart: t
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(e) {
                    e = Math.ceil(e), o.options.vertical === !1 ? (s[o.animType] = "translate(" + e + "px, 0px)", o.jQueryslideTrack.css(s)) : (s[o.animType] = "translate(0px," + e + "px)", o.jQueryslideTrack.css(s))
                },
                complete: function() {
                    i && i.call()
                }
            })) : (o.applyTransition(), t = Math.ceil(t), s[o.animType] = o.options.vertical === !1 ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)", o.jQueryslideTrack.css(s), i && setTimeout(function() {
                o.disableTransition(), i.call()
            }, o.options.speed))
        }, t.prototype.getNavTarget = function() {
            var t = this,
                i = t.options.asNavFor;
            return i && null !== i && (i = e(i).not(t.jQueryslider)), i
        }, t.prototype.asNavFor = function(t) {
            var i = this,
                s = i.getNavTarget();
            null !== s && "object" == typeof s && s.each(function() {
                var i = e(this).slick("getSlick");
                i.unslicked || i.slideHandler(t, !0)
            })
        }, t.prototype.applyTransition = function(e) {
            var t = this,
                i = {};
            i[t.transitionType] = t.options.fade === !1 ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.jQueryslideTrack.css(i) : t.jQueryslides.eq(e).css(i)
        }, t.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, t.prototype.autoPlayClear = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
        }, t.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || (e.options.infinite === !1 && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 === 0 && (e.direction = 1))), e.slideHandler(t))
        }, t.prototype.buildArrows = function() {
            var t = this;
            t.options.arrows === !0 && (t.jQueryprevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.jQuerynextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.jQueryprevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.jQuerynextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.jQueryprevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.jQuerynextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.jQueryprevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.jQueryprevArrow.add(t.jQuerynextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, t.prototype.buildDots = function() {
            var t, i, s = this;
            if (s.options.dots === !0 && s.slideCount > s.options.slidesToShow) {
                for (s.jQueryslider.addClass("slick-dotted"), i = e("<ul />").addClass(s.options.dotsClass), t = 0; t <= s.getDotCount(); t += 1) i.append(e("<li />").append(s.options.customPaging.call(this, s, t)));
                s.jQuerydots = i.appendTo(s.options.appendDots), s.jQuerydots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, t.prototype.buildOut = function() {
            var t = this;
            t.jQueryslides = t.jQueryslider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.jQueryslides.length, t.jQueryslides.each(function(t, i) {
                e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
            }), t.jQueryslider.addClass("slick-slider"), t.jQueryslideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.jQueryslider) : t.jQueryslides.wrapAll('<div class="slick-track"/>').parent(), t.jQuerylist = t.jQueryslideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.jQueryslideTrack.css("opacity", 0), (t.options.centerMode === !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll = 1), e("img[data-lazy]", t.jQueryslider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.options.draggable === !0 && t.jQuerylist.addClass("draggable")
        }, t.prototype.buildRows = function() {
            var e, t, i, s, o, a, r, l = this;
            if (s = document.createDocumentFragment(), a = l.jQueryslider.children(), l.options.rows > 1) {
                for (r = l.options.slidesPerRow * l.options.rows, o = Math.ceil(a.length / r), e = 0; o > e; e++) {
                    var n = document.createElement("div");
                    for (t = 0; t < l.options.rows; t++) {
                        var p = document.createElement("div");
                        for (i = 0; i < l.options.slidesPerRow; i++) {
                            var c = e * r + (t * l.options.slidesPerRow + i);
                            a.get(c) && p.appendChild(a.get(c))
                        }
                        n.appendChild(p)
                    }
                    s.appendChild(n)
                }
                l.jQueryslider.empty().append(s), l.jQueryslider.children().children().children().css({
                    width: 100 / l.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, t.prototype.checkResponsive = function(t, i) {
            var s, o, a, r = this,
                l = !1,
                n = r.jQueryslider.width(),
                p = window.innerWidth || e(window).width();
            if ("window" === r.respondTo ? a = p : "slider" === r.respondTo ? a = n : "min" === r.respondTo && (a = Math.min(p, n)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                o = null;
                for (s in r.breakpoints) r.breakpoints.hasOwnProperty(s) && (r.originalSettings.mobileFirst === !1 ? a < r.breakpoints[s] && (o = r.breakpoints[s]) : a > r.breakpoints[s] && (o = r.breakpoints[s]));
                null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || i) && (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[o]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), l = o) : (r.activeBreakpoint = o, "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[o]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), l = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t), l = o), t || l === !1 || r.jQueryslider.trigger("breakpoint", [r, l])
            }
        }, t.prototype.changeSlide = function(t, i) {
            var s, o, a, r = this,
                l = e(t.currentTarget);
            switch (l.is("a") && t.preventDefault(), l.is("li") || (l = l.closest("li")), a = r.slideCount % r.options.slidesToScroll !== 0, s = a ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
                case "previous":
                    o = 0 === s ? r.options.slidesToScroll : r.options.slidesToShow - s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, i);
                    break;
                case "next":
                    o = 0 === s ? r.options.slidesToScroll : s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, i);
                    break;
                case "index":
                    var n = 0 === t.data.index ? 0 : t.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(n), !1, i), l.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, t.prototype.checkNavigable = function(e) {
            var t, i, s = this;
            if (t = s.getNavigableIndexes(), i = 0, e > t[t.length - 1]) e = t[t.length - 1];
            else
                for (var o in t) {
                    if (e < t[o]) {
                        e = i;
                        break
                    }
                    i = t[o]
                }
            return e
        }, t.prototype.cleanUpEvents = function() {
            var t = this;
            t.options.dots && null !== t.jQuerydots && e("li", t.jQuerydots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), t.jQueryslider.off("focus.slick blur.slick"), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.jQueryprevArrow && t.jQueryprevArrow.off("click.slick", t.changeSlide), t.jQuerynextArrow && t.jQuerynextArrow.off("click.slick", t.changeSlide)), t.jQuerylist.off("touchstart.slick mousedown.slick", t.swipeHandler), t.jQuerylist.off("touchmove.slick mousemove.slick", t.swipeHandler), t.jQuerylist.off("touchend.slick mouseup.slick", t.swipeHandler), t.jQuerylist.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.jQuerylist.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), t.options.accessibility === !0 && t.jQuerylist.off("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.jQueryslideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.jQueryslideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.cleanUpSlideEvents = function() {
            var t = this;
            t.jQuerylist.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.jQuerylist.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
        }, t.prototype.cleanUpRows = function() {
            var e, t = this;
            t.options.rows > 1 && (e = t.jQueryslides.children().children(), e.removeAttr("style"), t.jQueryslider.empty().append(e))
        }, t.prototype.clickHandler = function(e) {
            var t = this;
            t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, t.prototype.destroy = function(t) {
            var i = this;
            i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), e(".slick-cloned", i.jQueryslider).detach(), i.jQuerydots && i.jQuerydots.remove(), i.jQueryprevArrow && i.jQueryprevArrow.length && (i.jQueryprevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.jQueryprevArrow.remove()), i.jQuerynextArrow && i.jQuerynextArrow.length && (i.jQuerynextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.jQuerynextArrow.remove()), i.jQueryslides && (i.jQueryslides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                e(this).attr("style", e(this).data("originalStyling"))
            }), i.jQueryslideTrack.children(this.options.slide).detach(), i.jQueryslideTrack.detach(), i.jQuerylist.detach(), i.jQueryslider.append(i.jQueryslides)), i.cleanUpRows(), i.jQueryslider.removeClass("slick-slider"), i.jQueryslider.removeClass("slick-initialized"), i.jQueryslider.removeClass("slick-dotted"), i.unslicked = !0, t || i.jQueryslider.trigger("destroy", [i])
        }, t.prototype.disableTransition = function(e) {
            var t = this,
                i = {};
            i[t.transitionType] = "", t.options.fade === !1 ? t.jQueryslideTrack.css(i) : t.jQueryslides.eq(e).css(i)
        }, t.prototype.fadeSlide = function(e, t) {
            var i = this;
            i.cssTransitions === !1 ? (i.jQueryslides.eq(e).css({
                zIndex: i.options.zIndex
            }), i.jQueryslides.eq(e).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.jQueryslides.eq(e).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), t && setTimeout(function() {
                i.disableTransition(e), t.call()
            }, i.options.speed))
        }, t.prototype.fadeSlideOut = function(e) {
            var t = this;
            t.cssTransitions === !1 ? t.jQueryslides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.jQueryslides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.jQueryslidesCache = t.jQueryslides, t.unload(), t.jQueryslideTrack.children(this.options.slide).detach(), t.jQueryslidesCache.filter(e).appendTo(t.jQueryslideTrack), t.reinit())
        }, t.prototype.focusHandler = function() {
            var t = this;
            t.jQueryslider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
                i.stopImmediatePropagation();
                var s = e(this);
                setTimeout(function() {
                    t.options.pauseOnFocus && (t.focussed = s.is(":focus"), t.autoPlay())
                }, 0)
            })
        }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
            var e = this;
            return e.currentSlide
        }, t.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                i = 0,
                s = 0;
            if (e.options.infinite === !0)
                for (; t < e.slideCount;) ++s, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else if (e.options.centerMode === !0) s = e.slideCount;
            else if (e.options.asNavFor)
                for (; t < e.slideCount;) ++s, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else s = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
            return s - 1
        }, t.prototype.getLeft = function(e) {
            var t, i, s, o = this,
                a = 0;
            return o.slideOffset = 0, i = o.jQueryslides.first().outerHeight(!0), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, a = i * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll !== 0 && e + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (e - o.slideCount)) * o.slideWidth * -1, a = (o.options.slidesToShow - (e - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, a = o.slideCount % o.options.slidesToScroll * i * -1))) : e + o.options.slidesToShow > o.slideCount && (o.slideOffset = (e + o.options.slidesToShow - o.slideCount) * o.slideWidth, a = (e + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, a = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), t = o.options.vertical === !1 ? e * o.slideWidth * -1 + o.slideOffset : e * i * -1 + a, o.options.variableWidth === !0 && (s = o.jQueryslideTrack.children(".slick-slide").eq(o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? e : e + o.options.slidesToShow), t = o.options.rtl === !0 ? s[0] ? -1 * (o.jQueryslideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, o.options.centerMode === !0 && (s = o.jQueryslideTrack.children(".slick-slide").eq(o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? e : e + o.options.slidesToShow + 1), t = o.options.rtl === !0 ? s[0] ? -1 * (o.jQueryslideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, t += (o.jQuerylist.width() - s.outerWidth()) / 2)), t
        }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
            var t = this;
            return t.options[e]
        }, t.prototype.getNavigableIndexes = function() {
            var e, t = this,
                i = 0,
                s = 0,
                o = [];
            for (t.options.infinite === !1 ? e = t.slideCount : (i = -1 * t.options.slidesToScroll, s = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); e > i;) o.push(i), i = s + t.options.slidesToScroll, s += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return o
        }, t.prototype.getSlick = function() {
            return this
        }, t.prototype.getSlideCount = function() {
            var t, i, s, o = this;
            return s = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.jQueryslideTrack.find(".slick-slide").each(function(t, a) {
                return a.offsetLeft - s + e(a).outerWidth() / 2 > -1 * o.swipeLeft ? (i = a, !1) : void 0
            }), t = Math.abs(e(i).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
            var i = this;
            i.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, t.prototype.init = function(t) {
            var i = this;
            e(i.jQueryslider).hasClass("slick-initialized") || (e(i.jQueryslider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), t && i.jQueryslider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
        }, t.prototype.initADA = function() {
            var t = this;
            t.jQueryslides.add(t.jQueryslideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), t.jQueryslideTrack.attr("role", "listbox"), t.jQueryslides.not(t.jQueryslideTrack.find(".slick-cloned")).each(function(i) {
                e(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + t.instanceUid + i
                })
            }), null !== t.jQuerydots && t.jQuerydots.attr("role", "tablist").find("li").each(function(i) {
                e(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + t.instanceUid + i,
                    id: "slick-slide" + t.instanceUid + i
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
        }, t.prototype.initArrowEvents = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.jQueryprevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.jQuerynextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, t.prototype.initDotEvents = function() {
            var t = this;
            t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.jQuerydots).on("click.slick", {
                message: "index"
            }, t.changeSlide), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && e("li", t.jQuerydots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
        }, t.prototype.initSlideEvents = function() {
            var t = this;
            t.options.pauseOnHover && (t.jQuerylist.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.jQuerylist.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
        }, t.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.jQuerylist.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, t.swipeHandler), t.jQuerylist.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, t.swipeHandler), t.jQuerylist.on("touchend.slick mouseup.slick", {
                action: "end"
            }, t.swipeHandler), t.jQuerylist.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, t.swipeHandler), t.jQuerylist.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), t.options.accessibility === !0 && t.jQuerylist.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.jQueryslideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.jQueryslideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.initUI = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.jQueryprevArrow.show(), e.jQuerynextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.jQuerydots.show()
        }, t.prototype.keyHandler = function(e) {
            var t = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && t.options.accessibility === !0 ? t.changeSlide({
                data: {
                    message: t.options.rtl === !0 ? "next" : "previous"
                }
            }) : 39 === e.keyCode && t.options.accessibility === !0 && t.changeSlide({
                data: {
                    message: t.options.rtl === !0 ? "previous" : "next"
                }
            }))
        }, t.prototype.lazyLoad = function() {
            function t(t) {
                e("img[data-lazy]", t).each(function() {
                    var t = e(this),
                        i = e(this).attr("data-lazy"),
                        s = document.createElement("img");
                    s.onload = function() {
                        t.animate({
                            opacity: 0
                        }, 100, function() {
                            t.attr("src", i).animate({
                                opacity: 1
                            }, 200, function() {
                                t.removeAttr("data-lazy").removeClass("slick-loading")
                            }), r.jQueryslider.trigger("lazyLoaded", [r, t, i])
                        })
                    }, s.onerror = function() {
                        t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.jQueryslider.trigger("lazyLoadError", [r, t, i])
                    }, s.src = i
                })
            }
            var i, s, o, a, r = this;
            r.options.centerMode === !0 ? r.options.infinite === !0 ? (o = r.currentSlide + (r.options.slidesToShow / 2 + 1), a = o + r.options.slidesToShow + 2) : (o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), a = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, a = Math.ceil(o + r.options.slidesToShow), r.options.fade === !0 && (o > 0 && o--, a <= r.slideCount && a++)), i = r.jQueryslider.find(".slick-slide").slice(o, a), t(i), r.slideCount <= r.options.slidesToShow ? (s = r.jQueryslider.find(".slick-slide"), t(s)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (s = r.jQueryslider.find(".slick-cloned").slice(0, r.options.slidesToShow), t(s)) : 0 === r.currentSlide && (s = r.jQueryslider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), t(s))
        }, t.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.jQueryslideTrack.css({
                opacity: 1
            }), e.jQueryslider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, t.prototype.next = t.prototype.slickNext = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, t.prototype.orientationChange = function() {
            var e = this;
            e.checkResponsive(), e.setPosition()
        }, t.prototype.pause = t.prototype.slickPause = function() {
            var e = this;
            e.autoPlayClear(), e.paused = !0
        }, t.prototype.play = t.prototype.slickPlay = function() {
            var e = this;
            e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
        }, t.prototype.postSlide = function(e) {
            var t = this;
            t.unslicked || (t.jQueryslider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && t.initADA())
        }, t.prototype.prev = t.prototype.slickPrev = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, t.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, t.prototype.progressiveLazyLoad = function(t) {
            t = t || 1;
            var i, s, o, a = this,
                r = e("img[data-lazy]", a.jQueryslider);
            r.length ? (i = r.first(), s = i.attr("data-lazy"), o = document.createElement("img"), o.onload = function() {
                i.attr("src", s).removeAttr("data-lazy").removeClass("slick-loading"), a.options.adaptiveHeight === !0 && a.setPosition(), a.jQueryslider.trigger("lazyLoaded", [a, i, s]), a.progressiveLazyLoad()
            }, o.onerror = function() {
                3 > t ? setTimeout(function() {
                    a.progressiveLazyLoad(t + 1)
                }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.jQueryslider.trigger("lazyLoadError", [a, i, s]), a.progressiveLazyLoad())
            }, o.src = s) : a.jQueryslider.trigger("allImagesLoaded", [a])
        }, t.prototype.refresh = function(t) {
            var i, s, o = this;
            s = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > s && (o.currentSlide = s), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), i = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {
                currentSlide: i
            }), o.init(), t || o.changeSlide({
                data: {
                    message: "index",
                    index: i
                }
            }, !1)
        }, t.prototype.registerBreakpoints = function() {
            var t, i, s, o = this,
                a = o.options.responsive || null;
            if ("array" === e.type(a) && a.length) {
                o.respondTo = o.options.respondTo || "window";
                for (t in a)
                    if (s = o.breakpoints.length - 1, i = a[t].breakpoint, a.hasOwnProperty(t)) {
                        for (; s >= 0;) o.breakpoints[s] && o.breakpoints[s] === i && o.breakpoints.splice(s, 1), s--;
                        o.breakpoints.push(i), o.breakpointSettings[i] = a[t].settings
                    }
                o.breakpoints.sort(function(e, t) {
                    return o.options.mobileFirst ? e - t : t - e
                })
            }
        }, t.prototype.reinit = function() {
            var t = this;
            t.jQueryslides = t.jQueryslideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.jQueryslides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), t.options.focusOnSelect === !0 && e(t.jQueryslideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.jQueryslider.trigger("reInit", [t])
        }, t.prototype.resize = function() {
            var t = this;
            e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
            }, 50))
        }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, i) {
            var s = this;
            return "boolean" == typeof e ? (t = e, e = t === !0 ? 0 : s.slideCount - 1) : e = t === !0 ? --e : e, s.slideCount < 1 || 0 > e || e > s.slideCount - 1 ? !1 : (s.unload(), i === !0 ? s.jQueryslideTrack.children().remove() : s.jQueryslideTrack.children(this.options.slide).eq(e).remove(), s.jQueryslides = s.jQueryslideTrack.children(this.options.slide), s.jQueryslideTrack.children(this.options.slide).detach(), s.jQueryslideTrack.append(s.jQueryslides), s.jQueryslidesCache = s.jQueryslides, void s.reinit())
        }, t.prototype.setCSS = function(e) {
            var t, i, s = this,
                o = {};
            s.options.rtl === !0 && (e = -e), t = "left" == s.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == s.positionProp ? Math.ceil(e) + "px" : "0px", o[s.positionProp] = e, s.transformsEnabled === !1 ? s.jQueryslideTrack.css(o) : (o = {}, s.cssTransitions === !1 ? (o[s.animType] = "translate(" + t + ", " + i + ")", s.jQueryslideTrack.css(o)) : (o[s.animType] = "translate3d(" + t + ", " + i + ", 0px)", s.jQueryslideTrack.css(o)))
        }, t.prototype.setDimensions = function() {
            var e = this;
            e.options.vertical === !1 ? e.options.centerMode === !0 && e.jQuerylist.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.jQuerylist.height(e.jQueryslides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.jQuerylist.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.jQuerylist.width(), e.listHeight = e.jQuerylist.height(), e.options.vertical === !1 && e.options.variableWidth === !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.jQueryslideTrack.width(Math.ceil(e.slideWidth * e.jQueryslideTrack.children(".slick-slide").length))) : e.options.variableWidth === !0 ? e.jQueryslideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.jQueryslideTrack.height(Math.ceil(e.jQueryslides.first().outerHeight(!0) * e.jQueryslideTrack.children(".slick-slide").length)));
            var t = e.jQueryslides.first().outerWidth(!0) - e.jQueryslides.first().width();
            e.options.variableWidth === !1 && e.jQueryslideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, t.prototype.setFade = function() {
            var t, i = this;
            i.jQueryslides.each(function(s, o) {
                t = i.slideWidth * s * -1, e(o).css(i.options.rtl === !0 ? {
                    position: "relative",
                    right: t,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                } : {
                    position: "relative",
                    left: t,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                })
            }), i.jQueryslides.eq(i.currentSlide).css({
                zIndex: i.options.zIndex - 1,
                opacity: 1
            })
        }, t.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                var t = e.jQueryslides.eq(e.currentSlide).outerHeight(!0);
                e.jQuerylist.css("height", t)
            }
        }, t.prototype.setOption = t.prototype.slickSetOption = function() {
            var t, i, s, o, a, r = this,
                l = !1;
            if ("object" === e.type(arguments[0]) ? (s = arguments[0], l = arguments[1], a = "multiple") : "string" === e.type(arguments[0]) && (s = arguments[0], o = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? a = "responsive" : "undefined" != typeof arguments[1] && (a = "single")), "single" === a) r.options[s] = o;
            else if ("multiple" === a) e.each(s, function(e, t) {
                r.options[e] = t
            });
            else if ("responsive" === a)
                for (i in o)
                    if ("array" !== e.type(r.options.responsive)) r.options.responsive = [o[i]];
                    else {
                        for (t = r.options.responsive.length - 1; t >= 0;) r.options.responsive[t].breakpoint === o[i].breakpoint && r.options.responsive.splice(t, 1), t--;
                        r.options.responsive.push(o[i])
                    }
            l && (r.unload(), r.reinit())
        }, t.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.jQueryslider.trigger("setPosition", [e])
        }, t.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = e.options.vertical === !0 ? "top" : "left", "top" === e.positionProp ? e.jQueryslider.addClass("slick-vertical") : e.jQueryslider.removeClass("slick-vertical"), (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && e.options.useCSS === !0 && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && e.animType !== !1
        }, t.prototype.setSlideClasses = function(e) {
            var t, i, s, o, a = this;
            i = a.jQueryslider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), a.jQueryslides.eq(e).addClass("slick-current"), a.options.centerMode === !0 ? (t = Math.floor(a.options.slidesToShow / 2), a.options.infinite === !0 && (e >= t && e <= a.slideCount - 1 - t ? a.jQueryslides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (s = a.options.slidesToShow + e, i.slice(s - t + 1, s + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - a.options.slidesToShow).addClass("slick-center") : e === a.slideCount - 1 && i.eq(a.options.slidesToShow).addClass("slick-center")), a.jQueryslides.eq(e).addClass("slick-center")) : e >= 0 && e <= a.slideCount - a.options.slidesToShow ? a.jQueryslides.slice(e, e + a.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= a.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = a.slideCount % a.options.slidesToShow, s = a.options.infinite === !0 ? a.options.slidesToShow + e : e, a.options.slidesToShow == a.options.slidesToScroll && a.slideCount - e < a.options.slidesToShow ? i.slice(s - (a.options.slidesToShow - o), s + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(s, s + a.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === a.options.lazyLoad && a.lazyLoad()
        }, t.prototype.setupInfinite = function() {
            var t, i, s, o = this;
            if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (i = null, o.slideCount > o.options.slidesToShow)) {
                for (s = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - s; t -= 1) i = t - 1, e(o.jQueryslides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.jQueryslideTrack).addClass("slick-cloned");
                for (t = 0; s > t; t += 1) i = t, e(o.jQueryslides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.jQueryslideTrack).addClass("slick-cloned");
                o.jQueryslideTrack.find(".slick-cloned").find("[id]").each(function() {
                    e(this).attr("id", "")
                })
            }
        }, t.prototype.interrupt = function(e) {
            var t = this;
            e || t.autoPlay(), t.interrupted = e
        }, t.prototype.selectHandler = function(t) {
            var i = this,
                s = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
                o = parseInt(s.attr("data-slick-index"));
            return o || (o = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(o), void i.asNavFor(o)) : void i.slideHandler(o)
        }, t.prototype.slideHandler = function(e, t, i) {
            var s, o, a, r, l, n = null,
                p = this;
            return t = t || !1, p.animating === !0 && p.options.waitForAnimate === !0 || p.options.fade === !0 && p.currentSlide === e || p.slideCount <= p.options.slidesToShow ? void 0 : (t === !1 && p.asNavFor(e), s = e, n = p.getLeft(s), r = p.getLeft(p.currentSlide), p.currentLeft = null === p.swipeLeft ? r : p.swipeLeft, p.options.infinite === !1 && p.options.centerMode === !1 && (0 > e || e > p.getDotCount() * p.options.slidesToScroll) ? void(p.options.fade === !1 && (s = p.currentSlide, i !== !0 ? p.animateSlide(r, function() {
                p.postSlide(s)
            }) : p.postSlide(s))) : p.options.infinite === !1 && p.options.centerMode === !0 && (0 > e || e > p.slideCount - p.options.slidesToScroll) ? void(p.options.fade === !1 && (s = p.currentSlide, i !== !0 ? p.animateSlide(r, function() {
                p.postSlide(s)
            }) : p.postSlide(s))) : (p.options.autoplay && clearInterval(p.autoPlayTimer), o = 0 > s ? p.slideCount % p.options.slidesToScroll !== 0 ? p.slideCount - p.slideCount % p.options.slidesToScroll : p.slideCount + s : s >= p.slideCount ? p.slideCount % p.options.slidesToScroll !== 0 ? 0 : s - p.slideCount : s, p.animating = !0, p.jQueryslider.trigger("beforeChange", [p, p.currentSlide, o]), a = p.currentSlide, p.currentSlide = o, p.setSlideClasses(p.currentSlide), p.options.asNavFor && (l = p.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(p.currentSlide)), p.updateDots(), p.updateArrows(), p.options.fade === !0 ? (i !== !0 ? (p.fadeSlideOut(a), p.fadeSlide(o, function() {
                p.postSlide(o)
            })) : p.postSlide(o), void p.animateHeight()) : void(i !== !0 ? p.animateSlide(n, function() {
                p.postSlide(o)
            }) : p.postSlide(o))))
        }, t.prototype.startLoad = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.jQueryprevArrow.hide(), e.jQuerynextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.jQuerydots.hide(), e.jQueryslider.addClass("slick-loading")
        }, t.prototype.swipeDirection = function() {
            var e, t, i, s, o = this;
            return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(t, e), s = Math.round(180 * i / Math.PI), 0 > s && (s = 360 - Math.abs(s)), 45 >= s && s >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= s && s >= 315 ? o.options.rtl === !1 ? "left" : "right" : s >= 135 && 225 >= s ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? s >= 35 && 135 >= s ? "down" : "up" : "vertical"
        }, t.prototype.swipeEnd = function() {
            var e, t, i = this;
            if (i.dragging = !1, i.interrupted = !1, i.shouldClick = i.touchObject.swipeLength > 10 ? !1 : !0, void 0 === i.touchObject.curX) return !1;
            if (i.touchObject.edgeHit === !0 && i.jQueryslider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
                switch (t = i.swipeDirection()) {
                    case "left":
                    case "down":
                        e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
                }
                "vertical" != t && (i.slideHandler(e), i.touchObject = {}, i.jQueryslider.trigger("swipe", [i, t]))
            } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
        }, t.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1 || t.options.draggable === !1 && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, t.prototype.swipeMove = function(e) {
            var t, i, s, o, a, r = this;
            return a = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !r.dragging || a && 1 !== a.length ? !1 : (t = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== a ? a[0].pageX : e.clientX, r.touchObject.curY = void 0 !== a ? a[0].pageY : e.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== e.originalEvent && r.touchObject.swipeLength > 4 && e.preventDefault(), o = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (o = r.touchObject.curY > r.touchObject.startY ? 1 : -1), s = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (s = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.swipeLeft = r.options.vertical === !1 ? t + s * o : t + s * (r.jQuerylist.height() / r.listWidth) * o, r.options.verticalSwiping === !0 && (r.swipeLeft = t + s * o), r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
        }, t.prototype.swipeStart = function(e) {
            var t, i = this;
            return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(i.dragging = !0))
        }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.jQueryslidesCache && (e.unload(), e.jQueryslideTrack.children(this.options.slide).detach(), e.jQueryslidesCache.appendTo(e.jQueryslideTrack), e.reinit())
        }, t.prototype.unload = function() {
            var t = this;
            e(".slick-cloned", t.jQueryslider).remove(), t.jQuerydots && t.jQuerydots.remove(), t.jQueryprevArrow && t.htmlExpr.test(t.options.prevArrow) && t.jQueryprevArrow.remove(), t.jQuerynextArrow && t.htmlExpr.test(t.options.nextArrow) && t.jQuerynextArrow.remove(), t.jQueryslides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, t.prototype.unslick = function(e) {
            var t = this;
            t.jQueryslider.trigger("unslick", [t, e]), t.destroy()
        }, t.prototype.updateArrows = function() {
            var e, t = this;
            e = Math.floor(t.options.slidesToShow / 2), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.jQueryprevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.jQuerynextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.jQueryprevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.jQuerynextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 ? (t.jQuerynextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.jQueryprevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0 && (t.jQuerynextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.jQueryprevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, t.prototype.updateDots = function() {
            var e = this;
            null !== e.jQuerydots && (e.jQuerydots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.jQuerydots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, t.prototype.visibility = function() {
            var e = this;
            e.options.autoplay && (e.interrupted = document[e.hidden] ? !0 : !1)
        }, e.fn.slick = function() {
            var e, i, s = this,
                o = arguments[0],
                a = Array.prototype.slice.call(arguments, 1),
                r = s.length;
            for (e = 0; r > e; e++)
                if ("object" == typeof o || "undefined" == typeof o ? s[e].slick = new t(s[e], o) : i = s[e].slick[o].apply(s[e].slick, a), "undefined" != typeof i) return i;
            return s
        }
    }), jQuery(document).ready(function() {
        jQuery(".js-slider").slick({
            slidesToShow: 1
        }), jQuery(".js-sliderPreview--slider").slick({
            slidesToShow: 1,
            focusOnSelect:true,
            arrows:0,
            draggable:false,
            asNavFor: ".js-sliderPreview--nav"
        }), jQuery(".js-sliderPreview--nav").slick({
            slidesToShow: 2,
            asNavFor:".js-sliderPreview--slider",
            focusOnSelect:true,
            draggable:false,
            arrows: !0,
            аccessibility:true,
            mobileFirst: !0,
            responsive: [{
                breakpoint: 480,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 8
                }
            }]
        }), jQuery(".js-sliderReviews--slider").slick({
            mobileFirst: !0,
            responsive: [{
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            }]
        })
        jQuery('button[type="button"]').click(function(){
            jQuery(".slick-track").find("img").removeClass("slick-active").removeClass('slick-current').attr("aria-hidden", "true");
  
        })
    }), jQuery(function(e) {
        e(window).scroll(function() {
            e(this).scrollTop() > 500 ? e(".layout-fixed").addClass("layout-fixed-active") : e(this).scrollTop() < 200 && e(".layout-fixed").removeClass("layout-fixed-active")
        })
    }), jQuery(document).clientWidth < 992 && (jQuery(".js-nav--menuLink").attr("href", "#"), jQuery(".js-nav--menuCallSubmenu").click(function() {
        jQuery(".nav--submenu").toggleClass("nav--submenu-active")
    })), jQuery(".js-calcForm--input").change(function() {
        jQuery(".js-calcForm--col").find("img:first").attr("src", jQuery(".js-calcForm--input option:selected").attr("data-path")), "BEUATI" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".BEUATI").addClass("calculator-active") : jQuery(".BEUATI").removeClass("calculator-active"), "model" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".model").addClass("calculator-active") : jQuery(".model").removeClass("calculator-active"), "arenda" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".arenda").addClass("calculator-active") : jQuery(".arenda").removeClass("calculator-active"), "portrait" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".portrait").addClass("calculator-active") : jQuery(".portrait").removeClass("calculator-active"), "family" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".family").addClass("calculator-active") : jQuery(".family").removeClass("calculator-active"), "pregnant" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".pregnant").addClass("calculator-active") : jQuery(".pregnant").removeClass("calculator-active"), "video" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".video").addClass("calculator-active") : jQuery(".video").removeClass("calculator-active"), "children" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".children").addClass("calculator-active") : jQuery(".children").removeClass("calculator-active"), "person" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".person").addClass("calculator-active") : jQuery(".person").removeClass("calculator-active"), "report" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".report").addClass("calculator-active") : jQuery(".report").removeClass("calculator-active"), "wedding" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".wedding").addClass("calculator-active") : jQuery(".wedding").removeClass("calculator-active"), "street" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".street").addClass("calculator-active") : jQuery(".street").removeClass("calculator-active"), "noCalculator" == jQuery(".js-calcForm--input option:selected").val() ? jQuery(".noCalculator").addClass("calculator-active") : jQuery(".noCalculator").removeClass("calculator-active")
    });


(function($) {

    if (typeof _wpcf7 == 'undefined' || _wpcf7 === null)
        _wpcf7 = {};

    _wpcf7 = $.extend({ cached: 0 }, _wpcf7);

    $(function() {
        _wpcf7.supportHtml5 = $.wpcf7SupportHtml5();
        $('div.wpcf7 > form').wpcf7InitForm();
    });

    $.fn.wpcf7InitForm = function() {
        this.ajaxForm({
            beforeSubmit: function(arr, $form, options) {
                $form.wpcf7ClearResponseOutput();
                $form.find('[aria-invalid]').attr('aria-invalid', 'false');
                $form.find('img.ajax-loader').css({ visibility: 'visible' });
                return true;
            },
            beforeSerialize: function($form, options) {
                $form.find('[placeholder].placeheld').each(function(i, n) {
                    $(n).val('');
                });
                return true;
            },
            data: { '_wpcf7_is_ajax_call': 1 },
            dataType: 'json',
            success: $.wpcf7AjaxSuccess,
            error: function(xhr, status, error, $form) {
                var e = $('<div class="ajax-error"></div>').text(error.message);
                $form.after(e);
            }
        });

        if (_wpcf7.cached)
            this.wpcf7OnloadRefill();

        this.wpcf7ToggleSubmit();

        this.find('.wpcf7-submit').wpcf7AjaxLoader();

        this.find('.wpcf7-acceptance').click(function() {
            $(this).closest('form').wpcf7ToggleSubmit();
        });

        this.find('.wpcf7-exclusive-checkbox').wpcf7ExclusiveCheckbox();

        this.find('.wpcf7-list-item.has-free-text').wpcf7ToggleCheckboxFreetext();

        this.find('[placeholder]').wpcf7Placeholder();

        if (_wpcf7.jqueryUi && ! _wpcf7.supportHtml5.date) {
            this.find('input.wpcf7-date[type="date"]').each(function() {
                $(this).datepicker({
                    dateFormat: 'yy-mm-dd',
                    minDate: new Date($(this).attr('min')),
                    maxDate: new Date($(this).attr('max'))
                });
            });
        }

        if (_wpcf7.jqueryUi && ! _wpcf7.supportHtml5.number) {
            this.find('input.wpcf7-number[type="number"]').each(function() {
                $(this).spinner({
                    min: $(this).attr('min'),
                    max: $(this).attr('max'),
                    step: $(this).attr('step')
                });
            });
        }
    };

    $.wpcf7AjaxSuccess = function(data, status, xhr, $form) {
        if (! $.isPlainObject(data) || $.isEmptyObject(data))
            return;

        var $responseOutput = $form.find('div.wpcf7-response-output');

        $form.wpcf7ClearResponseOutput();

        $form.find('.wpcf7-form-control').removeClass('wpcf7-not-valid');
        $form.removeClass('invalid spam sent failed');

        if (data.captcha)
            $form.wpcf7RefillCaptcha(data.captcha);

        if (data.quiz)
            $form.wpcf7RefillQuiz(data.quiz);

        if (data.invalids) {
            $.each(data.invalids, function(i, n) {
                $form.find(n.into).wpcf7NotValidTip(n.message);
                $form.find(n.into).find('.wpcf7-form-control').addClass('wpcf7-not-valid');
                $form.find(n.into).find('[aria-invalid]').attr('aria-invalid', 'true');
            });

            $responseOutput.addClass('wpcf7-validation-errors');
            $form.addClass('invalid');

            $(data.into).trigger('invalid.wpcf7');

        } else if (1 == data.spam) {
            $responseOutput.addClass('wpcf7-spam-blocked');
            $form.addClass('spam');

            $(data.into).trigger('spam.wpcf7');

        } else if (1 == data.mailSent) {
            $responseOutput.addClass('wpcf7-mail-sent-ok');
            $form.addClass('sent');

            if (data.onSentOk)
                $.each(data.onSentOk, function(i, n) { eval(n) });

            $(data.into).trigger('mailsent.wpcf7');

        } else {
            $responseOutput.addClass('wpcf7-mail-sent-ng');
            $form.addClass('failed');

            $(data.into).trigger('mailfailed.wpcf7');
        }

        if (data.onSubmit)
            $.each(data.onSubmit, function(i, n) { eval(n) });

        $(data.into).trigger('submit.wpcf7');

        if (1 == data.mailSent)
            $form.resetForm();

        $form.find('[placeholder].placeheld').each(function(i, n) {
            $(n).val($(n).attr('placeholder'));
        });

        $responseOutput.append(data.message).slideDown('fast');
        $responseOutput.attr('role', 'alert');

        $.wpcf7UpdateScreenReaderResponse($form, data);
    }

    $.fn.wpcf7ExclusiveCheckbox = function() {
        return this.find('input:checkbox').click(function() {
            $(this).closest('.wpcf7-checkbox').find('input:checkbox').not(this).removeAttr('checked');
        });
    };

    $.fn.wpcf7Placeholder = function() {
        if (_wpcf7.supportHtml5.placeholder)
            return this;

        return this.each(function() {
            $(this).val($(this).attr('placeholder'));
            $(this).addClass('placeheld');

            $(this).focus(function() {
                if ($(this).hasClass('placeheld'))
                    $(this).val('').removeClass('placeheld');
            });

            $(this).blur(function() {
                if ('' == $(this).val()) {
                    $(this).val($(this).attr('placeholder'));
                    $(this).addClass('placeheld');
                }
            });
        });
    };

    $.fn.wpcf7AjaxLoader = function() {
        return this.each(function() {
            var loader = $('<img class="ajax-loader" />')
                .attr({ src: _wpcf7.loaderUrl, alt: _wpcf7.sending })
                .css('visibility', 'hidden');

            $(this).after(loader);
        });
    };

    $.fn.wpcf7ToggleSubmit = function() {
        return this.each(function() {
            var form = $(this);
            if (this.tagName.toLowerCase() != 'form')
                form = $(this).find('form').first();

            if (form.hasClass('wpcf7-acceptance-as-validation'))
                return;

            var submit = form.find('input:submit');
            if (! submit.length) return;

            var acceptances = form.find('input:checkbox.wpcf7-acceptance');
            if (! acceptances.length) return;

            submit.removeAttr('disabled');
            acceptances.each(function(i, n) {
                n = $(n);
                if (n.hasClass('wpcf7-invert') && n.is(':checked')
                    || ! n.hasClass('wpcf7-invert') && ! n.is(':checked'))
                    submit.attr('disabled', 'disabled');
            });
        });
    };

    $.fn.wpcf7ToggleCheckboxFreetext = function() {
        return this.each(function() {
            var $wrap = $(this).closest('.wpcf7-form-control');

            if ($(this).find(':checkbox, :radio').is(':checked')) {
                $(this).find(':input.wpcf7-free-text').prop('disabled', false);
            } else {
                $(this).find(':input.wpcf7-free-text').prop('disabled', true);
            }

            $wrap.find(':checkbox, :radio').change(function() {
                var $cb = $('.has-free-text', $wrap).find(':checkbox, :radio');
                var $freetext = $(':input.wpcf7-free-text', $wrap);

                if ($cb.is(':checked')) {
                    $freetext.prop('disabled', false).focus();
                } else {
                    $freetext.prop('disabled', true);
                }
            });
        });
    };

    $.fn.wpcf7NotValidTip = function(message) {
        return this.each(function() {
            var $into = $(this);

            $into.find('span.wpcf7-not-valid-tip').remove();
            $into.append('<span role="alert" class="wpcf7-not-valid-tip">' + message + '</span>');

            if ($into.is('.use-floating-validation-tip *')) {
                $('.wpcf7-not-valid-tip', $into).mouseover(function() {
                    $(this).wpcf7FadeOut();
                });

                $(':input', $into).focus(function() {
                    $('.wpcf7-not-valid-tip', $into).not(':hidden').wpcf7FadeOut();
                });
            }
        });
    };

    $.fn.wpcf7FadeOut = function() {
        return this.each(function() {
            $(this).animate({
                opacity: 0
            }, 'fast', function() {
                $(this).css({'z-index': -100});
            });
        });
    };

    $.fn.wpcf7OnloadRefill = function() {
        return this.each(function() {
            var url = $(this).attr('action');
            if (0 < url.indexOf('#'))
                url = url.substr(0, url.indexOf('#'));

            var id = $(this).find('input[name="_wpcf7"]').val();
            var unitTag = $(this).find('input[name="_wpcf7_unit_tag"]').val();

            $.getJSON(url,
                { _wpcf7_is_ajax_call: 1, _wpcf7: id, _wpcf7_request_ver: $.now() },
                function(data) {
                    if (data && data.captcha)
                        $('#' + unitTag).wpcf7RefillCaptcha(data.captcha);

                    if (data && data.quiz)
                        $('#' + unitTag).wpcf7RefillQuiz(data.quiz);
                }
            );
        });
    };

    $.fn.wpcf7RefillCaptcha = function(captcha) {
        return this.each(function() {
            var form = $(this);

            $.each(captcha, function(i, n) {
                form.find(':input[name="' + i + '"]').clearFields();
                form.find('img.wpcf7-captcha-' + i).attr('src', n);
                var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
                form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
            });
        });
    };

    $.fn.wpcf7RefillQuiz = function(quiz) {
        return this.each(function() {
            var form = $(this);

            $.each(quiz, function(i, n) {
                form.find(':input[name="' + i + '"]').clearFields();
                form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
                form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
            });
        });
    };

    $.fn.wpcf7ClearResponseOutput = function() {
        return this.each(function() {
            $(this).find('div.wpcf7-response-output').hide().empty().removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked').removeAttr('role');
            $(this).find('span.wpcf7-not-valid-tip').remove();
            $(this).find('img.ajax-loader').css({ visibility: 'hidden' });
        });
    };

    $.wpcf7UpdateScreenReaderResponse = function($form, data) {
        $('.wpcf7 .screen-reader-response').html('').attr('role', '');

        if (data.message) {
            var $response = $form.siblings('.screen-reader-response').first();
            $response.append(data.message);

            if (data.invalids) {
                var $invalids = $('<ul></ul>');

                $.each(data.invalids, function(i, n) {
                    if (n.idref) {
                        var $li = $('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
                    } else {
                        var $li = $('<li></li>').append(n.message);
                    }

                    $invalids.append($li);
                });

                $response.append($invalids);
            }

            $response.attr('role', 'alert').focus();
        }
    }

    $.wpcf7SupportHtml5 = function() {
        var features = {};
        var input = document.createElement('input');

        features.placeholder = 'placeholder' in input;

        var inputTypes = ['email', 'url', 'tel', 'number', 'range', 'date'];

        $.each(inputTypes, function(index, value) {
            input.setAttribute('type', value);
            features[value] = input.type !== 'text';
        });

        return features;
    };

})(jQuery);