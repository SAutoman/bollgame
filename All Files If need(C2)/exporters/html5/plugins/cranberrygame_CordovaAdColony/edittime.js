function GetPluginSettings()
{
	return {
		"name":			"Cordova AdColony",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"cranberrygame_CordovaAdColony",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0.12",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"show adcolony interstitial ad and rewarded video ad.",
		"author":		"cranberrygame",
		"help url":		"http://cranberrygame.github.io?referrer=edittime.js",
		"category":		"Cordova extension: ad: video",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
/*
//cranberrygame start
cordova-plugin-ad-adcolony
phonegap build service: 
cordova registry: http://plugins.cordova.io/#/package/com.cranberrygame.cordova.plugin.ad.adcolony
github: https://github.com/cranberrygame/cordova-plugin-ad-adcolony
//cranberrygame end
*/
		"cordova-plugins":	"https://github.com/cranberrygame/cordova-plugin-ad-adcolony",
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
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
/*
		// example
		,"dependency": "three.min.js;OBJLoader.js"
*/
//cranberrygame start
//cranberrygame start
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name

/*				
// example				
AddNumberParam("Number", "Enter a number to test if positive.");
AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");
AddCondition(1, cf_trigger, "Trigger Condition", "My category", "Trigger Condition", "Triggered when TriggerAction", "TriggerCondition");//cranberrygame
*/
//cranberrygame start
AddCondition(0, cf_trigger, "On interstitial ad shown", "Interstitial ad", "On interstitial ad shown", "Triggered when TriggerAction", "OnInterstitialAdShown");//cranberrygame
AddCondition(1, cf_trigger, "On interstitial ad hidden", "Interstitial ad", "On interstitial ad hidden", "Triggered when TriggerAction", "OnInterstitialAdHidden");//cranberrygame
//
AddCondition(2, cf_trigger, "On rewarded video ad shown", "Rewarded video ad", "On rewarded video ad shown", "Triggered when TriggerAction", "OnRewardedVideoAdShown");//cranberrygame
AddCondition(3, cf_trigger, "On rewarded video ad hidden", "Rewarded video ad", "On rewarded video ad hidden", "Triggered when TriggerAction", "OnRewardedVideoAdHidden");//cranberrygame
AddCondition(4, cf_trigger, "On rewarded video ad completed", "Rewarded video ad", "On rewarded video ad completed", "Triggered when TriggerAction", "OnRewardedVideoAdCompleted");//cranberrygame
//
AddCondition(5, cf_none, "Is showing interstitial ad", "Interstitial ad", "Is showing interstitial ad", "Description for my condition!", "IsShowingInterstitialAd");
AddCondition(6, cf_none, "Is showing rewarded video ad", "Rewarded video ad", "Is showing rewarded video ad", "Description for my condition!", "IsShowingRewardedVideoAd");
//
AddCondition(7, cf_trigger, "On interstitial ad loaded", "Interstitial ad", "On interstitial ad loaded", "Triggered when TriggerAction", "OnInterstitialAdLoaded");//cranberrygame
AddCondition(8, cf_trigger, "On rewarded video ad loaded", "Rewarded video ad", "On rewarded video ad loaded", "Triggered when TriggerAction", "OnRewardedVideoAdLoaded");//cranberrygame
AddCondition(9, cf_none, "Loaded interstitial ad", "Interstitial ad", "Loaded interstitial ad", "Description for my condition!", "LoadedInterstitialAd");
AddCondition(10, cf_none, "Loaded rewarded video ad", "Rewarded video ad", "Loaded rewarded video ad", "Description for my condition!", "LoadedRewardedVideoAd");
//cranberrygame end
	
////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

/*
// example
AddStringParam("Message", "Enter a string to alert.");
AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");
AddAction(1, af_none, "Trigger Action", "My category", "Trigger Action", "Trigger TriggerCondition", "TriggerAction");//cranberrygame
*/
//cranberrygame start
AddAction(0, af_none, "Show interstitial ad", "Interstitial ad", "Show interstitial ad", "Description for my action!", "ShowInterstitialAd");
AddAction(1, af_none, "Show rewarded video ad", "Rewarded video ad", "Show rewarded video ad", "Description for my action!", "ShowRewardedVideoAd");
//cranberrygame end

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

/*
// example
AddExpression(0, ef_return_number, "Get cell x count", "My category", "MyExpression", "Get cell x count."); //cranberrygame
AddExpression(1, ef_return_string, "Get text.", "My category", "TextWithNoParam", "Get text."); //cranberrygame
AddStringParam("StringParam", "Enter string param");
AddExpression(2, ef_return_string, "Get text.", "My category", "Text", "Get text."); //cranberrygame
*/
//cranberrygame start
//cranberrygame end

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
/*
	new cr.Property(ept_integer, 	"My property",		77,		"An example property.") //cranberrygame , this.properties[0] from runtime.js
*/
//cranberrygame start
	new cr.Property(ept_text, 	"Android app id",		"",		"ex) app185a7e71e1714831a49ec7"), //cranberrygame , this.properties[0] from runtime.js
	new cr.Property(ept_text, 	"Android interstitial ad zone id",		"",		"ex) vz06e8c32a037749699e7050"), //cranberrygame , this.properties[0] from runtime.js
	new cr.Property(ept_text, 	"Android rewarded video ad zone id",		"",		"ex) vz1fd5a8b2bf6841a0a4b826"), //cranberrygame , this.properties[0] from runtime.js
	new cr.Property(ept_text, 	"iOS app id",		"",		"ex) appbdee68ae27024084bb334a"), //cranberrygame , this.properties[1] from runtime.js
	new cr.Property(ept_text, 	"iOS interstitial ad zone id",		"",		"ex) vzf8fb4670a60e4a139d01b5"), //cranberrygame , this.properties[0] from runtime.js
	new cr.Property(ept_text, 	"iOS rewarded video ad zone id",		"",		"ex) vzf8e4e97704c4445c87504e") //cranberrygame , this.properties[0] from runtime.js
/*
	new cr.Property(ept_section, "License info", "",	""),
	new cr.Property(ept_text, 	"Email",		"",		"An example property."), //cranberrygame , this.properties[0] from runtime.js
	new cr.Property(ept_text, 	"License key",		"",		"An example property."), //cranberrygame , this.properties[1] from runtime.js
	new cr.Property(ept_text, "Notice 1", "If no license key, 2% ad traffic share for dev support.", "", "", true),
	new cr.Property(ept_text, "Notice 2", "You can get paid license key: https://cranberrygame.github.io/request_cordova_ad_plugin_paid_license_key", "", "", true)
*/	
//cranberrygame emd
	];
	
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
		
	// Plugin-specific variables
	// this.myValue = 0...
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

//cranberrygame start
//cranberrygame end
