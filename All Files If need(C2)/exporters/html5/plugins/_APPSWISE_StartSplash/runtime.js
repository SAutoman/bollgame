﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.APPSWISE_StartSplash = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.APPSWISE_StartSplash.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
	};
	
	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};

	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	pluginProto.cnds = new Cnds();
	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.ShowSplashInline = function (titletext,showtitle,titlestyle,titleposition,text)
	{
		showtitle = (showtitle == 1) ? titletext : null;
		titleposition = (titleposition == 1) ? 'top' : 'bottom';

		switch (titlestyle) {
		  case 0:
			titlestyle = 'float';
			break;
		  case 1:
			titlestyle = 'inside';
			break;
		  case 2:
			titlestyle = 'outside';
			break;
		  case 3:
			titlestyle = 'over';
			break;
		  default:
			titlestyle = 'outside';
		}
			jQuery.Splash({
					type: 'inline',
					content: text,
					title: showtitle,
					helpers:  {
						title : {
							type : titlestyle, position: titleposition
						}
					}
			});
	}

	Acts.prototype.ShowSplashAjax = function (titletext,showtitle,titlestyle,titleposition,linkext)
	{
		showtitle = (showtitle == 1) ? titletext : null;
		titleposition = (titleposition == 1) ? 'top' : 'bottom';

		switch (titlestyle) {
		  case 0:
			titlestyle = 'float';
			break;
		  case 1:
			titlestyle = 'inside';
			break;
		  case 2:
			titlestyle = 'outside';
			break;
		  case 3:
			titlestyle = 'over';
			break;
		  default:
			titlestyle = 'outside';
		}
			jQuery.Splash({
					type: 'ajax',
					href: linkext,
					title: showtitle,
					helpers:  {
						title : {
							type : titlestyle, position: titleposition
						}
					}
			});
	}

	Acts.prototype.ShowSplashIframe = function (titletext,showtitle,titlestyle,titleposition,linkext)
	{
		showtitle = (showtitle == 1) ? titletext : null;
		titleposition = (titleposition == 1) ? 'top' : 'bottom';

		switch (titlestyle) {
		  case 0:
			titlestyle = 'float';
			break;
		  case 1:
			titlestyle = 'inside';
			break;
		  case 2:
			titlestyle = 'outside';
			break;
		  case 3:
			titlestyle = 'over';
			break;
		  default:
			titlestyle = 'outside';
		}
			jQuery.Splash({
					type: 'iframe',
					href: linkext,
					title: showtitle,
					helpers:  {
						title : {
							type : titlestyle, position: titleposition
						}
					}
			});
	}

	Acts.prototype.ShowSplashSwf = function (titletext,showtitle,titlestyle,titleposition,linkext)
	{
		showtitle = (showtitle == 1) ? titletext : null;
		titleposition = (titleposition == 1) ? 'top' : 'bottom';

		switch (titlestyle) {
		  case 0:
			titlestyle = 'float';
			break;
		  case 1:
			titlestyle = 'inside';
			break;
		  case 2:
			titlestyle = 'outside';
			break;
		  case 3:
			titlestyle = 'over';
			break;
		  default:
			titlestyle = 'outside';
		}
			jQuery.Splash({
					type: 'swf',
					href: linkext,
					title: showtitle,
					helpers:  {
						title : {
							type : titlestyle, position: titleposition
						}
					}
			});
	}

	Acts.prototype.ShowSplashImage = function (titletext,showtitle,titlestyle,titleposition,linkext)
	{
		showtitle = (showtitle == 1) ? titletext : null;
		titleposition = (titleposition == 1) ? 'top' : 'bottom';

		switch (titlestyle) {
		  case 0:
			titlestyle = 'float';
			break;
		  case 1:
			titlestyle = 'inside';
			break;
		  case 2:
			titlestyle = 'outside';
			break;
		  case 3:
			titlestyle = 'over';
			break;
		  default:
			titlestyle = 'outside';
		}
			jQuery.Splash({
					type: 'image',
					href: linkext,
					title: showtitle,
					helpers:  {
						title : {
							type : titlestyle, position: titleposition
						}
					}
			});
	}

	Acts.prototype.ShowSplashHtml = function (titletext,showtitle,titlestyle,titleposition,text)
	{
		showtitle = (showtitle == 1) ? titletext : null;
		titleposition = (titleposition == 1) ? 'top' : 'bottom';

		switch (titlestyle) {
		  case 0:
			titlestyle = 'float';
			break;
		  case 1:
			titlestyle = 'inside';
			break;
		  case 2:
			titlestyle = 'outside';
			break;
		  case 3:
			titlestyle = 'over';
			break;
		  default:
			titlestyle = 'outside';
		}
			jQuery.Splash({
					type: 'html',
					content: text,
					title: showtitle,
					helpers:  {
						title : {
							type : titlestyle, position: titleposition
						}
					}
			});
	}

	Acts.prototype.ShowSplashSimple = function (text)
	{
			jQuery.Splash({
					type: 'inline',
					content: text
			});
	}
	
	
	// ConvertJson
	// for future //
	
	
	
	
	

	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	
	
	// JSON
	Exps.prototype.JSON = function (ret, myparam)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
        console.log("Raw ParamString is " + myparam);
        var object = JSON.parse(myparam);
        console.log("Object is " + object);

		if (object.length === 0){
		  ret.set_string("Failed");
		}
		else
        {
		  //Get the number of records
    	    var width = Object.keys(object).length; //3 records
    		console.log(height);
       		//Get the number of columns per record
    	    var height = Object.keys(object[0]).length; //4 properties
    		console.log(width);
    	    var array = []
           // Map object to array
    		//For each record
    	    for (var i in object) {
    			//for each property in the record
    	        for (var e in object[i]) {
    	            object[i][e] === null ? object[i][e] = 0 : object[i][e] = '"' + object[i][e] + '"';
    	            array.push(object[i][e]);
    	        }
    	    }	
	   	   console.log(array);
           // Create string in C2 format
    	    var c2ArrayData = "[";
    	    for (var i = 0; i < array.length; i++) {
    	        if (i < array.length && i > 0) c2ArrayData += ",";
    	        if (i % height === 0) c2ArrayData += "[";
    	        c2ArrayData += "[" + array[i] + "]";
    	        if ((i + 1) % height === 0) c2ArrayData += "]";
	       }
	       c2ArrayData += "]";

	       var c2Array = '{"c2array":true,"size":[' + width + ',' + height + ',1],"data":' + c2ArrayData + "}";

		  console.log(c2Array);
          ret.set_string(c2Array);		// for ef_return_string
		}
		//ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		 
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	pluginProto.exps = new Exps();

}());
