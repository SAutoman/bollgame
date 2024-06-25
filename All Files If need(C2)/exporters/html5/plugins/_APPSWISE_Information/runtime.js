// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.APPSWISE_Information = function(runtime) {
    this.runtime = runtime;
};

(function() {
    /////////////////////////////////////
    // *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
    //                            vvvvvvvv
    var pluginProto = cr.plugins_.APPSWISE_Information.prototype;

    /////////////////////////////////////
    // Object type class
    pluginProto.Type = function(plugin) {
        this.plugin = plugin;
        this.runtime = plugin.runtime;
    };

    var typeProto = pluginProto.Type.prototype;

    // called on startup for each object type
    typeProto.onCreate = function() {};

    /////////////////////////////////////
    // Instance class
    pluginProto.Instance = function(type) {
        this.type = type;
        this.runtime = type.runtime;
        this.tag = "";
        this.lastValue = "";
        // any other properties you need, e.g...
        // this.myValue = 0;
    };

    var instanceProto = pluginProto.Instance.prototype;

    // called whenever an instance is created
    instanceProto.onCreate = function() {
        // note the object is sealed after this call; ensure any properties you'll ever need are set on the object
        // e.g...
        // this.myValue = 0;
    };

    // called whenever an instance is destroyed
    // note the runtime may keep the object after this call for recycling; be sure
    // to release/recycle/reset any references to other objects in this function.
    instanceProto.onDestroy = function() {};

    // called when saving the full state of the game
    instanceProto.saveToJSON = function() {
        // return a Javascript object containing information about your object's state
        // note you MUST use double-quote syntax (e.g. "property": value) to prevent
        // Closure Compiler renaming and breaking the save format
        return {
            // e.g.
            //"myValue": this.myValue
        };
    };

    // called when loading the full state of the game
    instanceProto.loadFromJSON = function(o) {
        // load from the state previously saved by saveToJSON
        // 'o' provides the same object that you saved, e.g.
        // this.myValue = o["myValue"];
        // note you MUST use double-quote syntax (e.g. o["property"]) to prevent
        // Closure Compiler renaming and breaking the save format
    };

    // only called if a layout object - draw to a canvas 2D context
    instanceProto.draw = function(ctx) {};

    // only called if a layout object in WebGL mode - draw to the WebGL context
    // 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
    // directory or just copy what other plugins do.
    instanceProto.drawGL = function(glw) {};

    //////////////////////////////////////
    // Conditions
    function Cnds() {};

    Cnds.prototype.OnInformationClose = function() {
        return true;
    };

    pluginProto.cnds = new Cnds();

    //////////////////////////////////////
    // Actions
    function Acts() {};


    Acts.prototype.AlertMessage = function(title, text, type, btnConfirmText) {
        var self = this;
        var msgType = GetType(type);

        if (btnConfirmText == "") {
            btnConfirmText = "CLOSE";
        }
        swal({
            title: title,
            text: text,
            type: msgType,
            confirmButtonColor: '#8F49FF',//FF4B4B
            confirmButtonText: btnConfirmText
        }).then(function() {
            self.runtime.trigger(cr.plugins_.APPSWISE_Information.prototype.cnds.OnInformationClose, self);
        });
    };

    Acts.prototype.ImageInformation = function(title, text, customImageUrl, btnConfirmText) {
        var self = this;

        if (btnConfirmText == "") {
            btnConfirmText = "CLOSE";
        }
		////customImageUrl,
        swal({
            title: title,
            text: text,
            imageUrl: customImageUrl,
            confirmButtonColor: '#8F49FF',//FF4B4B
            confirmButtonText: btnConfirmText
        }).then(function() {
            self.runtime.trigger(cr.plugins_.APPSWISE_Information.prototype.cnds.OnInformationClose, self);
        });
    };

    pluginProto.acts = new Acts();

    function ConvertToC2Array(array) {
        var response = {
            "c2array": true,
            "size": [1, 1, 1],
            "data": []
        };

        response.size[0] = array.length;

        for (var i = 0; i < array.length; i++) {
            var data = [
                [
                    array[i]
                ]
            ];
            response.data.push(data);
        }

        return JSON.stringify(response);
    }

    //////////////////////////////////////
    // Expressions
    function Exps() {};

    // the example expression
    Exps.prototype.MyExpression = function(ret) // 'ret' must always be the first parameter - always return the expression's result through it!
        {
            ret.set_int(1337); // return our value
            // ret.set_float(0.5);         // for returning floats
            // ret.set_string("Hello");      // for ef_return_string
            // ret.set_any("woo");         // for ef_return_any, accepts either a number or string
        };

    // ... other expressions here ...

    Exps.prototype.GetLastValue = function(ret) {
        ret.set_string(this.lastValue);
    };

    pluginProto.exps = new Exps();

}());
