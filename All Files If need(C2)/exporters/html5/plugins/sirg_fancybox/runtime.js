// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.sirg_fancyBox = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.sirg_fancyBox.prototype;
		
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

	Acts.prototype.ShowFancyBoxInline = function (titletext,showtitle,titlestyle,titleposition,text)
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
			jQuery.fancybox({
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

	Acts.prototype.ShowFancyBoxAjax = function (titletext,showtitle,titlestyle,titleposition,linkext)
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
			jQuery.fancybox({
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

	Acts.prototype.ShowFancyBoxIframe = function (titletext,showtitle,titlestyle,titleposition,linkext)
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
			jQuery.fancybox({
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

	Acts.prototype.ShowFancyBoxSwf = function (titletext,showtitle,titlestyle,titleposition,linkext)
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
			jQuery.fancybox({
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

	Acts.prototype.ShowFancyBoxImage = function (titletext,showtitle,titlestyle,titleposition,linkext)
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
			jQuery.fancybox({
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

	Acts.prototype.ShowFancyBoxHtml = function (titletext,showtitle,titlestyle,titleposition,text)
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
			jQuery.fancybox({
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

	Acts.prototype.ShowFancyBoxSimple = function (text)
	{
			jQuery.fancybox({
					type: 'inline',
					content: text
			});
	}

	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	pluginProto.exps = new Exps();

}());
