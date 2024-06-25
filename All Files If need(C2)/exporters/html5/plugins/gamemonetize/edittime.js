function GetPluginSettings()
{
	return {
		"name":			"GameMonetize Google Ads",
		"id":			"gamemonetize",
		"version":		"1.0",
		"description":	"GameMonetize.com HTML5 SDK",
		"author":		"GameMonetize",
		"category":		"Monetization",
		"type":			"object",			// appears in layout
		"rotatable":	false,
		"flags":		pf_singleglobal
	};
};

AddCondition(0, 0, "Is showing banner ad", "Ads", "Is showing an advertisement", "True if currently showing an advertisement.", "IsShowingBanner");
AddCondition(2, cf_trigger, "On SDK loaded", "Ads", "On SDK loaded", "Called when the SDK is ready.", "onInit");
AddCondition(3, cf_trigger, "On Error occurs", "Ads", "On Error", "Called when an error has occured.", "onError");
AddCondition(4, cf_trigger, "On Resume game", "Ads", "On resume game", "Called when an advertisement is closed or not received.", "onResumeGame");
AddCondition(5, cf_trigger, "On Pause game", "Ads", "On pause game", "Called when an advertisement is received and ready to show.", "onPauseGame");

// Actions
AddStringParam("Key Name", "Key for analytics");
AddAction(0, af_none, "Show Banner", "Ads", "Show an advertisement.", "Show an advertisement.", "ShowBanner");

AddStringParam("Key Name", "Key for analytics");

AddAction(3, 0, "Init SDK", "Ads", "Load the SDK", "Loads the GameMonetize.com HTML5 SDK for showing advertisements.", "InitAds");

ACESDone();

// Property grid properties for this plugin
var property_list = [	
	new cr.Property(ept_section,	"GameMonetize Account",	"",	"Account settings. You can get your GameId from https://gamemonetize.com."),
	new cr.Property(ept_text,		"GameId",		"",	"Your GameId, you can find it after uploading a game to GameMonetize.com.")
	];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
};

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
};

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
};

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

	// Plugin-specific variables
	this.just_inserted = false;
};

IDEInstance.prototype.OnCreate = function()
{
};

IDEInstance.prototype.OnInserted = function()
{
};

IDEInstance.prototype.OnDoubleClicked = function()
{
};

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
};

IDEInstance.prototype.OnRendererInit = function(renderer)
{
};

// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer)
{
};

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
};