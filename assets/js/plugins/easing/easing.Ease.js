(function(app, $, $dom, EV, _){

    app.define("plugins.easing.Ease");

    var j = "Ease expects an easing function.";

    function k(a, b) {
        if (typeof a !== "function") {
            throw new TypeError(j)
        }
        this.easingFunction = a;
        this.cssString = b || null
    }
    var l = k.prototype;
    l.getValue = function(a) {
        return this.easingFunction(a, 0, 1, 1)
    };

    app.plugins.easing.Ease = k;

})(app, $, app.$dom, app.events, app.utils);
