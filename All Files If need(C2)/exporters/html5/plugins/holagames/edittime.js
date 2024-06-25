function GetPluginSettings()
{
	return {
		"name":			"Holagames",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"Holagames",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Holagames plugin",
		"author":		"<Tobiasz/uncertainstudio>",
		"help url":		"<http://uncertainstudio.com>",
		"category":		"Platform specific",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0
						| pf_singleglobal						// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
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
				
// example				
//AddNumberParam("Number", "Enter a number to test if positive.");
//AddCondition(0, cf_none, "Hola Initialise", "Main", "{0} is positive", "Must be called when the sdk is loaded.", "HolaInitialise");
AddCondition(0, cf_trigger, "Hola Paused", "Main", "Paused", "Game Paused in HolaPlay.", "HolaGamePaused");
AddCondition(1, cf_trigger, "Hola Resumed", "Main", "Resumed", "Game Resumed in HolaPlay.", "HolaGameResumed");
AddCondition(2, cf_trigger, "Hola Restarted", "Main", "Restarted", "Game Restarted in HolaPlay.", "HolaGameRestarted");
//AddCondition(1, cf_trigger, "On any key pressed", "Keyboard", "On any key pressed", "Triggered when any keyboard key is pressed.", "OnAnyKey");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
//AddStringParam("Message", "Enter a string to alert.");
AddAction(0, af_none, "HolaInitialise", "Main", "Hola Initialise", "Must be called when the sdk is loaded.", "HolaInitialise");

AddNumberParam("Score", "The value to submit for the statistic.  Must be a positive integer.");
AddAction(1, 0, "SendHighscore", "Statistics", "Submit Score", "Submit a statistic to the Holagames statistics system.", "SendHighscore");

AddAction(2, 0, "StatusGameLoaded", "State", "Game Loaded", "This should be called  when game is loaded.", "StatusGameLoaded");

AddAction(3, 0, "StatusGameStart", "State", "Started Game", "Place this when player clicks restart or start.", "StatusGameStart");

AddAction(4, 0, "StatusGameResume", "State", "Resumed Game", "Place this when player clicks restart or start.", "StatusGameResume");

AddAction(5, 0, "StatusGamePause", "State", "Paused Game", "Place this when player clicks restart or start.", "StatusGamePause");

//AddNumberParam("Ad Type", "Enter the ad type number. Types: 1. fullscreen 2. Banner on bottom 3. banner on top.");
//AddAction(6, 0, "ShowAd", "Ads", "Hola Ad", "Place this to show the hola ad.", "ShowAd");

//AddNumberParam("ShowAd Position", "Enter the ad type number. Types: 1. fullscreen 2. Banner on bottom 3. banner on top.");
//AddNumberParam("ShowAd Type", "Enter the ad type number. Types: 1. fullscreen 2. Banner on bottom 3. banner on top.");
//AddComboParam("ShowAd Position", "ShowAd Position Types: 1. fullscreen 2. Banner on bottom 3. banner on top." [, initial_selection = 0]);

AddComboParamOption("Fullscreen");
AddComboParamOption("BannerBottom");
AddComboParamOption("BannerTop");
AddComboParam("Ad Position", "Ad Position Types: 1. Fullscreen 2. Banner on bottom 3. Banner on top.");
AddComboParamOption("PauseAd");
AddComboParamOption("LoadingAd");
AddComboParamOption("StartAd");
AddComboParamOption("OverAd");
AddComboParamOption("PassAd");
AddComboParam("Ad Type", "Select the ad relative to the current game state.");
AddAction(6, 0, "ShowAd", "Ads", "Hola Ad <b>{0}</b>/<b>{1}</b>", "Place this to show the hola ad.", "ShowAd");

AddNumberParam("Score", "Fill the score to challenge. If no score fill with 0.  Must be a positive integer.", initial_string = 0);
AddNumberParam("Level", "Fill the level to challenge. If no level fill with 1.  Must be a positive integer.", initial_string = 1);
AddNumberParam("duration", "Fill the time to challenge. If no time fill with 0.  Must be a positive integer.", initial_string = 0);
AddAction(7, 0, "HolaChallenge", "HolaIcons", "Send Challenge", "Hola Player challenges friend. Must be called when score changed.", "HolaChallenge");

AddNumberParam("Score", "Fill the score to challenge. If no score fill with 0.  Must be a positive integer.", initial_string = 0);
AddNumberParam("Level", "Fill the level to challenge. If no level fill with 0.  Must be a positive integer.", initial_string = 0);
AddNumberParam("duration", "Fill the time to challenge. If no time fill with 0.  Must be a positive integer.", initial_string = 0);
AddAction(8, 0, "HolaChallengePing", "HolaIcons", "Ping Challenge", "Hola Player challenges friend", "HolaChallenge");

AddStringParam("Title", "Title of the share.", initial_string = "\"This game rocks.\"");
AddStringParam("Description", "Description of the share.", initial_string = "\"I got a score of: SCORE in GAMENAME\"");
AddAction(9, 0, "HolaShare", "HolaIcons", "Hola Share", "Hola Player shares", "HolaShare");

AddAction(10, 0, "HolaExit", "HolaIcons", "Hola Exit", "Hola Player exits game", "HolaExit");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");

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
	new cr.Property(ept_text, 	"AppID",		77,		"Add your AppID.")
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