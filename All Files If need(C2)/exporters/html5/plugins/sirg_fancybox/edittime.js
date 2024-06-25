function GetPluginSettings()
{
	return {
		"name":			"fancyBox",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"sirg_fancyBox",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Show popup window.",
		"author":		"SirG",
		"help url":		"https://www.scirra.com/forum/plugin-fancybox_topic75982.html",
		"category":		"Notifications",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
,
        "dependency":	"jquery.fancybox.pack.js;jquery.fancybox.css;blank.gif;fancybox_loading.gif;fancybox_loading@2x.gif;fancybox_overlay.png;fancybox_sprite.png;fancybox_sprite@2x.png"
	};
};

////////////////////////////////////////
// Conditions
////////////////////////////////////////
// Actions
AddAnyTypeParam("Text", "Content to be displayed.",'""');
AddAction(0, af_none, "FancyBox - Simple", "FancyBox Simple", "Show simple FancyBox", "Show popup window from simple text", "ShowFancyBoxSimple");
/////
AddAnyTypeParam("Title", "FancyBox title.",'""');

AddComboParamOption("false");
AddComboParamOption("true");
AddComboParam("Show title", "");

AddComboParamOption("float");
AddComboParamOption("inside");
AddComboParamOption("outside");
AddComboParamOption("over");
AddComboParam("Title style", "");

AddComboParamOption("bottom");
AddComboParamOption("top");
AddComboParam("Title position (affects only if title style: inside, outside)", "");

AddAnyTypeParam("Text", "Content to be displayed.",'""');
AddAction(1, af_none, "FancyBox - inline", "FancyBox Simple", "Show inline FancyBox {0}", "Show popup window from inline text", "ShowFancyBoxInline");
//////
AddAnyTypeParam("Title", "FancyBox title.",'""');

AddComboParamOption("false");
AddComboParamOption("true");
AddComboParam("Show title", "");

AddComboParamOption("float");
AddComboParamOption("inside");
AddComboParamOption("outside");
AddComboParamOption("over");
AddComboParam("Title style", "");

AddComboParamOption("bottom");
AddComboParamOption("top");
AddComboParam("Title position (affects only if title style: inside, outside)", "");

AddAnyTypeParam("Text", "Content to be displayed (you can use html tags).",'""');
AddAction(2, af_none, "FancyBox - HTML", "FancyBox Simple", "Show html FancyBox {0}", "Show popup window from html text", "ShowFancyBoxHtml");
/////
AddAnyTypeParam("Title", "FancyBox title.",'""');

AddComboParamOption("false");
AddComboParamOption("true");
AddComboParam("Show title", "");

AddComboParamOption("float");
AddComboParamOption("inside");
AddComboParamOption("outside");
AddComboParamOption("over");
AddComboParam("Title style", "");

AddComboParamOption("bottom");
AddComboParamOption("top");
AddComboParam("Title position (affects only if title style: inside, outside)", "");

AddAnyTypeParam("Link", "Enter the URL of iframe page.",'""');
AddAction(3, af_none, "FancyBox - iframe", "FancyBox (online)", "Show iframe FancyBox {0}", "Show popup window from iframe link", "ShowFancyBoxIframe");
//////
AddAnyTypeParam("Title", "FancyBox title.",'""');

AddComboParamOption("false");
AddComboParamOption("true");
AddComboParam("Show title", "");

AddComboParamOption("float");
AddComboParamOption("inside");
AddComboParamOption("outside");
AddComboParamOption("over");
AddComboParam("Title style", "");

AddComboParamOption("bottom");
AddComboParamOption("top");
AddComboParam("Title position (affects only if title style: inside, outside)", "");

AddAnyTypeParam("Link", "Enter the URL of ajax file.",'""');
AddAction(4, af_none, "FancyBox - ajax", "FancyBox (online)", "Show ajax FancyBox {0}", "Show popup window from ajax link", "ShowFancyBoxAjax");
//////
AddAnyTypeParam("Title", "FancyBox title.",'""');

AddComboParamOption("false");
AddComboParamOption("true");
AddComboParam("Show title", "");

AddComboParamOption("float");
AddComboParamOption("inside");
AddComboParamOption("outside");
AddComboParamOption("over");
AddComboParam("Title style", "");

AddComboParamOption("bottom");
AddComboParamOption("top");
AddComboParam("Title position (affects only if title style: inside, outside)", "");

AddAnyTypeParam("Link", "Enter the URL of image file.",'""');
AddAction(5, af_none, "FancyBox - image", "FancyBox (online)", "Show image FancyBox {0}", "Show popup window from image link", "ShowFancyBoxImage");
//////
AddAnyTypeParam("Title", "FancyBox title.",'""');

AddComboParamOption("false");
AddComboParamOption("true");
AddComboParam("Show title", "");

AddComboParamOption("float");
AddComboParamOption("inside");
AddComboParamOption("outside");
AddComboParamOption("over");
AddComboParam("Title style", "");

AddComboParamOption("bottom");
AddComboParamOption("top");
AddComboParam("Title position (affects only if title style: inside, outside)", "");

AddAnyTypeParam("Link", "Enter the URL of swf file.",'""');
AddAction(6, af_none, "FancyBox - swf", "FancyBox (online)", "Show swf FancyBox {0}", "Show popup window from swf link", "ShowFancyBoxSwf");
//////

////////////////////////////////////////
// Expressions
////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
var property_list = [];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}
