function GetPluginSettings()
{
	return {
		"name":			"Start Splash",				
		"id":			"APPSWISE_StartSplash",
		"version":		"0.0.0.1",
		"description":	"ShowSplash popup window for mobile and browsers.",
		"author":		"José Eliel da Rocha Alves",
		"help url":		"http://store.appswisegames.com/",
		"category":		"APPS WISE - Splash",
		"type":			"object",
		"rotatable":	false,	
		"flags":		0	
						| pf_singleglobal
						| pf_predraw											
	,
        "dependency":	"SplashAPPSWISE.min.js;jquery.Splash.pack.js;jquery.Splash.css;blank.gif;Splash_loading.gif;loading_Splash.gif;Splash_overlay.png;Splash_sprite.png;sprite_Splash.png"
	};
};

////////////////////////////////////////
// Conditions
////////////////////////////////////////
// Actions
AddAnyTypeParam("Text", "Content to be displayed.",'""');
AddAction(0, af_none, "Start Splash - Simple", "Splash Simple", "Show simple Splash", "Show popup window from simple text", "ShowSplashSimple");
/////
AddAnyTypeParam("Title", "Splash title.",'""');

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
AddAction(1, af_none, "Splash - inline", "Splash Simple", "Show inline Splash {0}", "Show popup window from inline text", "ShowSplashInline");
//////
AddAnyTypeParam("Title", "Splash title.",'""');

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
AddAction(2, af_none, "Splash - HTML", "Splash Simple", "Show html Splash {0}", "Show popup window from html text", "ShowSplashHtml");
/////
AddAnyTypeParam("Title", "Splash title.",'""');

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
AddAction(3, af_none, "Splash - iframe", "Splash (online)", "Show iframe Splash {0}", "Show popup window from iframe link", "ShowSplashIframe");
//////
AddAnyTypeParam("Title", "Splash title.",'""');

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
AddAction(4, af_none, "Splash - ajax", "Splash (online)", "Show ajax Splash {0}", "Show popup window from ajax link", "ShowSplashAjax");
//////
AddAnyTypeParam("Title", "Splash title.",'""');

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
AddAction(5, af_none, "Splash - image", "Splash (online)", "Show image Splash {0}", "Show popup window from image link", "ShowSplashImage");
//////
AddAnyTypeParam("Title", "Splash title.",'""');

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
AddAction(6, af_none, "Splash - swf", "Splash (online)", "Show swf Splash {0}", "Show popup window from swf link", "ShowSplashSwf");
//////

////////////////////////////////////////
// Expressions
////////////////////////////////////////

// JSON String
AddStringParam("JSON String", "The JSON String to be converted");
AddExpression(7, ef_return_string, "Convert JSON array to be readable by Array", "Arrays and JSON", "JSON", "Return the converted JSON String");


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
