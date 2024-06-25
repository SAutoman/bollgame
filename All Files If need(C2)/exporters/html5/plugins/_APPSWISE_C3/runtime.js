// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.APPSWISE_c3 = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var $zkey = "";
	var $APPSWISE_Data = "";
	
	var pluginProto = cr.plugins_.APPSWISE_c3.prototype;
	
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
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		if (this.runtime.isDomFree)
		{
			cr.logexport("[Construct 2] Plugin WISE - não suportado nesta plataforma - o objeto não será criado");
			return;
		}
		
	};
	

	instanceProto.onDestroy = function ()
	{
	};

	instanceProto.saveToJSON = function ()
	{

		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	instanceProto.loadFromJSON = function (o)
	{

	};
	
	instanceProto.draw = function(ctx)
	{
	};

	instanceProto.drawGL = function (glw)
	{
	};
	
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{

		propsections.push({
			"title": "My debugger section",
			"properties": [

			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{

		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

		
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.FFData = function (Data,Key)
	{
		$APPSWISE_Data = encrypt(Data, Key);
	}; 

	Acts.prototype.DDData = function (Data,Key)
	{
		$APPSWISE_Data = decrypt(Data, Key);
	};
	
	Acts.prototype.IRData = function (url, target)
	{
		if (this.runtime.isCocoonJs)
			CocoonJS["App"]["openURL"](url);
		else if (this.runtime.isEjecta)
			ejecta["openURL"](url);
		else if (this.runtime.isWinJS)
			Windows["System"]["Launcher"]["launchUriAsync"](new Windows["Foundation"]["Uri"](url));
		else if (navigator["app"] && navigator["app"]["loadUrl"])
			navigator["app"]["loadUrl"](url, { "openExternal": true });
		else if (this.runtime.isCordova)
			window.open(url, "_system");
		else if (!this.is_arcade && !this.runtime.isDomFree)
		{
			if (target === 2 && !this.is_arcade)		// top
				window.top.location = url;
			else if (target === 1 && !this.is_arcade)	// parent
				window.parent.location = url;
			else					// self
				window.location = url;
		}
	};
	
	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	Exps.prototype.CC = function (ret)	
	{
		ret.set_string($APPSWISE_Data);
	};
	
	Exps.prototype.DD = function (ret)
	{
		ret.set_string($APPSWISE_Data);
	};

	Exps.prototype.UU = function (ret)
	{
		ret.set_string(this.runtime.isDomFree ? "" : window.location.toString());
	};

	pluginProto.exps = new Exps();

}());