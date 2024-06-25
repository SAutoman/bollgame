// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.hmmg_layoutTransition = function(runtime)
{
	this.runtime = runtime;
};
var hmmg_animationName = "";
var hmmg_finishedAnimationName = "";
(function ()
{
	/////////////////////////////////////
	// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
	//                            vvvvvvvv
	var pluginProto = cr.plugins_.hmmg_layoutTransition.prototype;
		
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
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
		this.hmmg_element = $("body");
		this.isTransitioning = false ;
		var self = this ;
		
		
		this.hmmg_element.addClass("animated").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(a)
		{
			hmmg_finishedAnimationName = a.originalEvent.animationName ;
			if(hmmg_finishedAnimationName.indexOf("Out") != -1)
			{
				self.hmmg_element.css("opacity","0");
			}
			self.runtime.trigger(cr.plugins_.hmmg_layoutTransition.prototype.cnds.isTransitionFinished, self);
			self.hmmg_element.removeClass(hmmg_animationName);
			hmmg_animationName = "";
			self.isTransitioning = false;
		});
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
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.isTransitionFinished = function ()
	{
		return true;
	};
	
	
	Cnds.prototype.isTransitioning = function ()
	{
		return this.isTransitioning;
	};
	
	Cnds.prototype.isTransitionFinishedNameEqual = function (index)
	{
		var name ;
		switch (index)
		{
			case 0  : name = "bounceIn";break;
			case 1  : name = "bounceInDown";break;
			case 2  : name = "bounceInLeft";break;
			case 3  : name = "bounceInRight";break;
			case 4  : name = "bounceInUp";break;
			case 5  : name = "bounceOut";break;
			case 6  : name = "bounceOutDown";break;
			case 7  : name = "bounceOutLeft";break;
			case 8  : name = "bounceOutRight";break;
			case 9  : name = "bounceOutUp";break;
			case 10 : name = "fadeIn";break;
			case 11 : name = "fadeInDown";break;
			case 12 : name = "fadeInDownBig";break;
			case 13 : name = "fadeInLeft";break;
			case 14 : name = "fadeInLeftBig";break;
			case 15 : name = "fadeInRight";break;
			case 16 : name = "fadeInRightBig";break;
			case 17 : name = "fadeInUp";break;
			case 18 : name = "fadeInUpBig";break;
			case 19 : name = "fadeOut";break;
			case 20 : name = "fadeOutDown";break;
			case 21 : name = "fadeOutDownBig";break;
			case 22 : name = "fadeOutLeft";break;
			case 23 : name = "fadeOutLeftBig";break;
			case 24 : name = "fadeOutRight";break;
			case 25 : name = "fadeOutRightBig";break;
			case 26 : name = "fadeOutUp";break;
			case 27 : name = "fadeOutUpBig";break;
			case 28 : name = "flipInX";break;
			case 29 : name = "flipInY";break;
			case 30 : name = "flipOutX";break;
			case 31 : name = "flipOutY";break;
			case 32 : name = "lightSpeedIn";break;
			case 33 : name = "lightSpeedOut";break;
			case 34 : name = "rotateIn";break;
			case 35 : name = "rotateInDownLeft";break;
			case 36 : name = "rotateInDownRight";break;
			case 37 : name = "rotateInUpLeft";break;
			case 38 : name = "rotateInUpRight";break;
			case 39 : name = "rotateOut";break;
			case 40 : name = "rotateOutDownLeft";break;
			case 41 : name = "rotateOutDownRight";break;
			case 42 : name = "rotateOutUpLeft";break;
			case 43 : name = "rotateOutUpRight";break;
			case 44 : name = "rollIn";break;
			case 45 : name = "rollOut";break;
			case 46 : name = "zoomIn";break;
			case 47 : name = "zoomInDown";break;
			case 48 : name = "zoomInLeft";break;
			case 49 : name = "zoomInRight";break;
			case 50 : name = "zoomInUp";break;
			case 51 : name = "zoomOut";break;
			case 52 : name = "zoomOutDown";break;
			case 53 : name = "zoomOutLeft";break;
			case 54 : name = "zoomOutRight";break;
			case 55 : name = "zoomOutUp";break;
			case 56 : name = "slideInDown";break;
			case 57 : name = "slideInLeft";break;
			case 58 : name = "slideInRight";break;
			case 59 : name = "slideInUp";break;
			case 60 : name = "slideOutDown";break;
			case 61 : name = "slideOutLeft";break;
			case 62 : name = "slideOutRight";break;
			case 63 : name = "slideOutUp";break;
			default : name = "";break;

		}
		if(name == hmmg_finishedAnimationName)
		{
			return true;
			this.isTransitioning = false;
		}
		else
			return false;
	};
	
	
	
	
	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.entranceTransition = function (index , duration ,delay)
	{
		this.isTransitioning = true;
		if(duration < 0)
		{
			this.hmmg_element.hmmgRemoveCss("-webkit-animation-duration");
			this.hmmg_element.hmmgRemoveCss("-moz-animation-duration");
			this.hmmg_element.hmmgRemoveCss("-o-animation-duration");
			this.hmmg_element.hmmgRemoveCss("-ms-animation-duration");
			this.hmmg_element.hmmgRemoveCss("animation-duration");
		}
		else
		{
			this.hmmg_element.css(
			{
				"-webkit-animation-duration":duration+"s",
				"-moz-animation-duration":duration+"s",
				"-o-animation-duration":duration+"s",
				"-ms-animation-duration":duration+"s",
				"animation-duration":duration+"s",
			});
		}
		
		if(delay < 0)
		{
			this.hmmg_element.hmmgRemoveCss("-webkit-animation-delay");
			this.hmmg_element.hmmgRemoveCss("-moz-animation-delay");
			this.hmmg_element.hmmgRemoveCss("-o-animation-delay");
			this.hmmg_element.hmmgRemoveCss("-ms-animation-delay");
			this.hmmg_element.hmmgRemoveCss("animation-delay");
		}
		else
		{
			this.hmmg_element.css(
			{
				"-webkit-animation-delay":delay+"s",
				"-moz-animation-delay":delay+"s",
				"-o-animation-delay":delay+"s",
				"-ms-animation-delay":delay+"s",
				"animation-delay":delay+"s",
			});
		}
		
		switch(index)
		{
			case 0 : hmmg_animationName = "bounceIn";break;
			case 1 : hmmg_animationName = "bounceInDown";break;
			case 2 : hmmg_animationName = "bounceInLeft";break;
			case 3 : hmmg_animationName = "bounceInRight";break;
			case 4 : hmmg_animationName = "bounceInUp";break;

			case 5 : hmmg_animationName = "fadeIn";break;
			case 6 : hmmg_animationName = "fadeInDown";break;
			case 7 : hmmg_animationName = "fadeInDownBig";break;
			case 8 : hmmg_animationName = "fadeInLeft";break;
			case 9 : hmmg_animationName = "fadeInLeftBig";break;
			case 10 : hmmg_animationName = "fadeInRight";break;
			case 11 : hmmg_animationName = "fadeInRightBig";break;
			case 12 : hmmg_animationName = "fadeInUp";break;
			case 13 : hmmg_animationName = "fadeInUpBig";break;

			case 14 : hmmg_animationName = "flipInX";break;
			case 15 : hmmg_animationName = "flipInY";break;

			case 16 : hmmg_animationName = "lightSpeedIn";break;

			case 17 : hmmg_animationName = "rotateIn";break;
			case 18 : hmmg_animationName = "rotateInDownLeft";break;
			case 19 : hmmg_animationName = "rotateInDownRight";break;
			case 20 : hmmg_animationName = "rotateInUpLeft";break;
			case 21 : hmmg_animationName = "rotateInUpRight";break;

			case 22 : hmmg_animationName = "rollIn";break;

			case 23 : hmmg_animationName = "zoomIn";break;
			case 24 : hmmg_animationName = "zoomInDown";break;
			case 25 : hmmg_animationName = "zoomInLeft";break;
			case 26 : hmmg_animationName = "zoomInRight";break;
			case 27 : hmmg_animationName = "zoomInUp";break;

			case 28 : hmmg_animationName = "slideInDown";break;
			case 29 : hmmg_animationName = "slideInLeft";break;
			case 30 : hmmg_animationName = "slideInRight";break;
			case 31 : hmmg_animationName = "slideInUp";break;
			default : hmmg_animationName = "bounceIn";break;
		}
		this.hmmg_element.css("opacity","1").addClass(hmmg_animationName);
	};
	
	Acts.prototype.exitTransition = function (index , duration ,delay)
	{
		this.isTransitioning = true;
		if(duration < 0)
		{
			this.hmmg_element.hmmgRemoveCss("-webkit-animation-duration");
			this.hmmg_element.hmmgRemoveCss("-moz-animation-duration");
			this.hmmg_element.hmmgRemoveCss("-o-animation-duration");
			this.hmmg_element.hmmgRemoveCss("-ms-animation-duration");
			this.hmmg_element.hmmgRemoveCss("animation-duration");
		}
		else
		{
			this.hmmg_element.css(
			{
				"-webkit-animation-duration":duration+"s",
				"-moz-animation-duration":duration+"s",
				"-o-animation-duration":duration+"s",
				"-ms-animation-duration":duration+"s",
				"animation-duration":duration+"s",
			});
		}
		
		if(delay < 0)
		{
			this.hmmg_element.hmmgRemoveCss("-webkit-animation-delay");
			this.hmmg_element.hmmgRemoveCss("-moz-animation-delay");
			this.hmmg_element.hmmgRemoveCss("-o-animation-delay");
			this.hmmg_element.hmmgRemoveCss("-ms-animation-delay");
			this.hmmg_element.hmmgRemoveCss("animation-delay");
		}
		else
		{
			this.hmmg_element.css(
			{
				"-webkit-animation-delay":delay+"s",
				"-moz-animation-delay":delay+"s",
				"-o-animation-delay":delay+"s",
				"-ms-animation-delay":delay+"s",
				"animation-delay":delay+"s",
			});
		}
		
		switch(index)
		{
			case 0 : hmmg_animationName = "bounceOut";break;
			case 1 : hmmg_animationName = "bounceOutDown";break;
			case 2 : hmmg_animationName = "bounceOutLeft";break;
			case 3 : hmmg_animationName = "bounceOutRight";break;
			case 4 : hmmg_animationName = "bounceOutUp";break;

			case 5 : hmmg_animationName = "fadeOut";break;
			case 6 : hmmg_animationName = "fadeOutDown";break;
			case 7 : hmmg_animationName = "fadeOutDownBig";break;
			case 8 : hmmg_animationName = "fadeOutLeft";break;
			case 9 : hmmg_animationName = "fadeOutLeftBig";break;
			case 10 : hmmg_animationName = "fadeOutRight";break;
			case 11 : hmmg_animationName = "fadeOutRightBig";break;
			case 12 : hmmg_animationName = "fadeOutUp";break;
			case 13 : hmmg_animationName = "fadeOutUpBig";break;

			case 14 : hmmg_animationName = "flipOutX";break;
			case 15 : hmmg_animationName = "flipOutY";break;

			case 16 : hmmg_animationName = "lightSpeedOut";break;

			case 17 : hmmg_animationName = "rotateOut";break;
			case 18 : hmmg_animationName = "rotateOutDownLeft";break;
			case 19 : hmmg_animationName = "rotateOutDownRight";break;
			case 20 : hmmg_animationName = "rotateOutUpLeft";break;
			case 21 : hmmg_animationName = "rotateOutUpRight";break;

			case 22 : hmmg_animationName = "rollOut";break;

			case 23 : hmmg_animationName = "zoomOut";break;
			case 24 : hmmg_animationName = "zoomOutDown";break;
			case 25 : hmmg_animationName = "zoomOutLeft";break;
			case 26 : hmmg_animationName = "zoomOutRight";break;
			case 27 : hmmg_animationName = "zoomOutUp";break;

			case 28 : hmmg_animationName = "slideOutDown";break;
			case 29 : hmmg_animationName = "slideOutLeft";break;
			case 30 : hmmg_animationName = "slideOutRight";break;
			case 31 : hmmg_animationName = "slideOutUp";break;
			default : hmmg_animationName = "bounceOut";break;
		}
		
		this.hmmg_element.addClass(hmmg_animationName);
	};

	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	// the example expression
	Exps.prototype.FinishedTransitionName = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_string(hmmg_finishedAnimationName);
	};
	
	// ... other expressions here ...
	
	pluginProto.exps = new Exps();

}());


$.fn.hmmgRemoveCss=function(toDelete)
{
	if(typeof($(this).attr('style')) != "undefined")
	{
		var props=$(this).attr('style').split(';');
		var tmp=-1;
		for( var p=0;p<props.length; p++)
		{
			if(props[p].indexOf(toDelete)!==-1)
			{
				tmp=p;
			}
		};
		if(tmp!==-1)
		{

		   delete props[tmp];
		}

		  return $(this).attr('style',props.join(';')+';');
	}
}