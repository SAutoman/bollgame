// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.Holagames = function(runtime)
{
	this.runtime = runtime;
};


var _ID = null;

(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.Holagames.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;
/*
	var _document = null;
	var _unsafeWindow = null;
	var idNetRuntime = null;
	var idNetInst = null;
	var idnetUserName = "Guest";
	var authorized = false;
	var idnetSessionKey = "";
	var onlineSavesData = ""; */
	var HolaAppId = "AAAAAAAAAAAAAAAAAAAAAAAAA";
	//var HolaAppId = "2e7116fc4a5d45afb32f82a5952aafad";



	// called on startup for each object type
	typeProto.onCreate = function()
	{
		// Non-browser platforms like CocoonJS do not have a DOM, so your plugin will most likely not work on these platforms.
	   jsfile_load("http://game-ad-sdk.haloapps.com/static/abyhola/sdk/js_ad_sdk_loader.js?v=052");


	};


	var jsfile_load = function(file_name)
	{
	    var scripts=document.getElementsByTagName("script");
	    var exist=false;
	    for(var i=0;i<scripts.length;i++)
	    {
	    	if(scripts[i].src.indexOf(file_name) != -1)
	    	{
	    		exist=true;
	    		break;
	    	}
	    }
	    if(!exist)
	    {
	    	var newScriptTag=document.createElement("script");
	    	newScriptTag.setAttribute("type","text/javascript");
	    	newScriptTag.setAttribute("src", file_name);
	    	document.getElementsByTagName("head")[0].appendChild(newScriptTag);
	    }
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
 			
		HolaAppId = this.properties[0];
			console.log("AppId:" + HolaAppId);
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;

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
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};

	instanceProto.onHolaPause= function()
	{
		HolaF('Game.Event.onPause', function (handle) {
			if(handle >= 0)
			{ 
				this.runtime.trigger(cr.plugins_.Holagames.prototype.cnds.HolaGamePaused, this);
			}
		});
	}
	instanceProto.onHolaResume= function()
	{
		HolaF('Game.Event.onResume', function (handle) {
			if(handle >= 0)
			{ 
				this.runtime.trigger(cr.plugins_.Holagames.prototype.cnds.HolaGameResumed, this);
			}
		});
	}
	instanceProto.onHolaRestart= function()
	{
		HolaF('Game.Event.onRestart', function (handle) {
			if(handle >= 0)
			{ 
				this.runtime.trigger(cr.plugins_.Holagames.prototype.cnds.HolaGameRestarted, this);
			}
		});
	}
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.HolaGamePaused = function ()
	{
		// return true if number is positive
		//return myparam >= 0;
	
		return true;
	};
	Cnds.prototype.HolaGameResumed = function ()
	{
		return true;
	};
	Cnds.prototype.HolaGameRestarted = function ()
	{
		return true;
	};
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.HolaInitialise = function (myparam)
	{
		// alert the message
		HolaF('init', {app_id: HolaAppId, debug: false, on_error: function(err_msg) { alert(err_msg); }, on_init: function(sdk_info) { console.log(sdk_info); } });
	};
	/*Acts.prototype.SDKLoaded = function ()
	{
		// Initialization of SDK, call it after game loaded done, only once can be called.
		HolaF('init', {app_id: HolaAppId});
	};  */ 
	Acts.prototype.StatusGameLoaded = function ()
	{
		// Call this function when game load.
		HolaF('Game.Status.load');
	};

	Acts.prototype.StatusGameStart = function ()
	{
		// Call this function when game starts(such as user click start button etc.).

		// level:number, game level. If there is no level system or it is a single level game, value= 0.
		HolaF('Game.Status.start', 0);
	};
	Acts.prototype.SendHighscore = function (myparam)
	{
		// alert the message
		HolaF('Game.Status.over', { score: myparam });
	};

	Acts.prototype.StatusGamePause = function (myparam)
	{
		// alert the message
		HolaF('Game.Status.pause');
	};

		Acts.prototype.StatusGameResume = function (myparam)
	{
		// alert the message
		HolaF('Game.Status.resume');
	};



	Acts.prototype.ShowAd = function (myparam, secondparam )
	{
		switch (myparam) {
			case "Fullscreen":
				myparam = 1;
				break;
			case "BannerBottom":
				myparam = 2;
				break;
			case "BannerTop":
				myparam = 3;
				break;
			default:
				myparam = 1;
		}
		switch (secondparam) {
			case "PauseAd":
				secondparam = "_pause";
				break;
			case "LoadingAd":
				secondparam = "_loading";
				break;
			case "OverAd":
				secondparam = "_over";
				break;
			case "PassAd":
				secondparam = "_pass";
				break;
			default:
				myparam = "_pause";
		}
		// alert the message
		HolaF('Ad.show', { placement_id: HolaAppId + secondparam, placement_type: myparam, on_error: function(err) { console.log(err); } });
	}; 

	Acts.prototype.HolaChallenge = function (myparam,secondparam,thirdparam)
	{
		HolaF('Challenge.send', { score: myparam, level: secondparam, duration: thirdparam });
		//HolaF('Barrage.send', {});
		//console.log("score:"+ myparam + ",level: "+ secondparam+","+ "duration:"+ thirdparam );
	};

	Acts.prototype.HolaChallengePing = function (myparam,secondparam,thirdparam)
	{
		HolaF('Challenge.ping', { score: myparam, level: secondparam, duration: thirdparam });
	};

	Acts.prototype.HolaShare = function (myparam,secondparam)
	{
		// Call this function when game load.
		HolaF('share', { title: myparam, description: secondparam });
		//HolaF('share.send', {});
	};

	Acts.prototype.HolaExit = function ()
	{
		// Call this function when game load.
		HolaF('Game.exit');
	};

	
	// ... other actions here ...

	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	// the example expression
	Exps.prototype.MyExpression = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(1337);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());