function GetPluginSettings()
{
	return {
		"name":			"Splaash",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"Splaash",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"HTML5 Splash Plugin",
		"author":		"stctr",
		"help url":		"https://www.scirra.com/forum/viewtopic.php?f=153&t=128099&p=903435#p903435",
		"category":		"HTML5 extension",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"dependency": "splash.png",
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".											
	};
};
AddCondition(0, cf_trigger, "On splash hide", "Splash Functions", "On splash hide", "On splash hide", "OnSplashHide");
AddAction(0, af_none, "Hide splash mate!", "Splash Functions", "Hide splash mate!", "Hide splash mate!", "HideSplash");
ACESDone();
var property_list = [
	new cr.Property(ept_combo, "Auto hide splash", "No", "Hide splash screen automatically after specified seconds.", "No|Yes"),
	new cr.Property(ept_text, "Specified seconds", "3", "Specified seconds for auto hide if Yes enabled"),
	new cr.Property(ept_color, "Background-Color", "14803425", "Change background color"),
	new cr.Property(ept_combo, "Splash image position pc", "Center Centered", "Specify a position for the splash image for pc.", "No position|Center Centered|Top Center|Bottom Center|Left Centered|Left Top|Left Bottom|Right Centered|Right Top|Right Bottom"),
	new cr.Property(ept_text, "Splash image", "splash.png", "Change splash image like splash.png, leave empty to use ads."),
	new cr.Property(ept_text, "Splash image CSS", "", "Change splash image CSS default is Splash image position. Works only if NO POSITION is selected."),
	new cr.Property(ept_text, "Ad code", "", "Ads will be only used if splash image is empty."),
	new cr.Property(ept_text, "Ad code Mobile", "", "Ads will be only used if splash image is empty."),
	];
function CreateIDEObjectType()
{
	return new IDEObjectType();
}
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	this.instance = instance;
	this.type = type;
	this.properties = {};
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}
IDEInstance.prototype.OnInserted = function()
{
}
IDEInstance.prototype.OnDoubleClicked = function()
{
}
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}
IDEInstance.prototype.Draw = function(renderer)
{
}
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}
