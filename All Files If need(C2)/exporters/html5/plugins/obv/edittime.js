function GetPluginSettings()
{
	return {
		"name":			"Obv API",
		"id":			"Obv",
		"version":		"1.0",
		"description":	"Dumpygames.com API plugin",
		"author":		"Oliverbv",
		"help url":		"oliverbv.designer@gmail.com",
		"category":		"General",
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
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
};

//////////////////////////////////////////////////////////////
// Conditions
AddCondition(0,	cf_trigger, "On any completed", "AJAX", "On any completed", "Triggered when any AJAX request completes successfully. The 'Tag' expression identifies the request.", "OnAnyComplete");
////////////////////////////////////////
// Actions


//Leaderboards
AddAnyTypeParam("nickname", "nickname value (String) . Please, input string value.");
AddAnyTypeParam("score", "Score value (Int) . Please, input string value.");
AddAnyTypeParam("success", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("error", "Go to Name Error Layout value (String) . Please, input string value.");
AddAction(2, 0, "Enviar Score", "Obv", "Submit <b>{0}</b> ,<b>{1}</b> ,<b>{2} ,<b>{3}</b>", "Enviar Score", "postScore");

AddAnyTypeParam("Take", "Take value (String) . Please, input string value.");
AddAnyTypeParam("nickname", "nickname value (String) . Please, input string value.");
AddAnyTypeParam("success", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("error", "Go to Name Error Layout value (String) . Please, input string value.");
AddAction(3, 0, "Listar Scores Global", "Obv", "Submit <b>{0}</b> ,<b>{1}</b> ,<b>{2}</b> ,<b>{3}</b> ", "Mostrar Scores Global", "getScores");

////////////////////////////////////////
// Expressions
AddExpression(0, ef_return_string, "Get last data", "AJAX", "LastData", "Get the data returned by the last successful request.");

ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_text,"username","","Username"),
	new cr.Property(ept_text,"password","","Password"),
	new cr.Property(ept_text,"gamekey","","Gamekey"),
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