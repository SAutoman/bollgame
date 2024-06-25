window._HolaQueueList = [];
window._HolaUseLoader = true;
var HolaF = function () {
    console.log('HolaF: ' + JSON.stringify(arguments));
    var arg0 = arguments[0];
    if (!arg0) return;
    if (typeof Hola === typeof undefined) {
        window._HolaQueueList.push(arguments);
    } else {
        var fs = arg0.split('.');
        var h = Hola;
        for (var i = 0; i < fs.length; i++) {
            var f = fs[i];
            if (typeof h[f] === typeof undefined) {
                console.error('Hola.' + arg0 + ' not exists');
                return;
            }
            h = h[f];
        }
        var args = [];
        for (var i in arguments) {
            if (i == 0) continue;
            args.push(arguments[i]);
        }
        h.apply(h, args);
    }
};

(function () {
    //if (typeof Hola === typeof undefined) {
    if (true) { // å¼ºåˆ¶é‡æ–°åŠ è½½
        var now = new Date();
        var sc = document.createElement('script');
        sc.src = 'http://game-ad-sdk.haloapps.com/static/abyhola/sdk/js_ad_sdk.js?r='
            + (now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '-' + now.getHours());
        sc.onload = function () {
            console.log('js_ad_sdk.js load success');
        };
        sc.onerror = function () {
            console.error('js_ad_sdk.js load failed. ' + sc.src);
        };
        document.head.appendChild(sc);
    }
})();