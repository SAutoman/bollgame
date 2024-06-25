function GetPluginSettings()
{
	return {
		"name":			"YummiCookie API",
		"id":			"YummiCookie",
		"version":		"1.0",
		"description":	"YummiCookieapidev.poweredbytechsys.co.za API plugin",
		"author":		"Oliverbv",
		"help url":		"oliverbv.designer@gmail.com",
		"category":		"Monetisation",
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
////////////////////////////////////////
// Actions

//New Player
AddAnyTypeParam("emailAddress", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("fullName", "fullName value (String) . Please, input string value.");
AddAnyTypeParam("mobileNumber", "mobileNumber value (String) . Please, input string value.");
AddAnyTypeParam("acceptedTerms", "acceptedTerms value (String) . Please, input string value.");
AddAnyTypeParam("showIdin", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("showNamein", "Variable name (String) . Please, input string value.");

AddAnyTypeParam("erroremail", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("errorfullname", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("errormobile", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("errorterms", "Go to Name Complete Layout value (String) . Please, input string value.");

AddAnyTypeParam("success", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("exists", "Go to Name Exists Layout value (String) . Please, input string value.");
AddAnyTypeParam("error", "Go to Name Error Layout value (String) . Please, input string value.");
AddAction(0, 0, "Nuevo Player", "YummiCookie", "Submit <b>{0}</b> ,<b>{1}</b> ,<b>{2}</b> ,<b>{3}</b> ,<b>{4}</b>,<b>{5}</b>,<b>{6}</b>,<b>{7}</b>,<b>{8}</b>,<b>{9}</b>,<b>{10}</b>,<b>{11}</b>,<b>{12}</b>", "Nuevo Player", "newPlayer");
//Get Player Id
AddAnyTypeParam("id", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("showin", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("success", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("error", "Go to Name Error Layout value (String) . Please, input string value.");
AddAction(2, 0, "Obtener Player Id", "YummiCookie", "Submit <b>{0}</b> ,<b>{1}</b> ,<b>{2}</b>,<b>{3}</b>", "Buscar Player ID", "getPlayerId");
//Get Players
AddAnyTypeParam("skip", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("take", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("orderBy", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("orderDirection", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("search", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("includeDeleted", "Variable name (String) . Please, input string value.");
AddAnyTypeParam("object", "Object to Show List value (string) . Please, input string value.");
AddAnyTypeParam("success", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("error", "Go to Name Error Layout value (String) . Please, input string value.");
AddAction(3, 0, "Listar Players", "YummiCookie", "Submit <b>{0}</b> ,<b>{1}</b> ,<b>{2}</b>,<b>{3}</b> ,<b>{4}</b>,<b>{5}</b>,<b>{6}</b>,<b>{7}</b>,<b>{8}</b>", "Buscar Players", "getPlayers");

//New Leaderboards
AddAnyTypeParam("mobileNumber", "mobileNumber value (String) . Please, input string value.");
AddAnyTypeParam("score", "Score value (Int) . Please, input string value.");

AddAnyTypeParam("escenePrice1", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("escenePrice2", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("escenePrice3", "Go to Name Complete Layout value (String) . Please, input string value.");

AddAnyTypeParam("success", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("error", "Go to Name Error Layout value (String) . Please, input string value.");
AddAction(4, 0, "Enviar Score", "YummiCookie", "Submit <b>{0}</b> ,<b>{1}</b> ,<b>{2} ,<b>{3}</b>,<b>{4}</b>,<b>{5}</b>,<b>{6}</b>", "Enviar Score", "postScore");
//Get Leaderboards
AddAnyTypeParam("mobileNumber", "Take value (String) . Please, input string value.");
AddAnyTypeParam("take", "mobileNumber value (String) . Please, input string value.");
AddAnyTypeParam("object", "Object to Show List value (string) . Please, input string value.");
AddAnyTypeParam("success", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("error", "Go to Name Error Layout value (String) . Please, input string value.");
AddAction(5, 0, "Listar Scores Global", "YummiCookie", "Submit <b>{0}</b> ,<b>{1}</b> ,<b>{2}</b> ,<b>{3}</b> ,<b>{4}</b>", "Mostrar Scores Global", "getScores");
//Get Leaderboards Player
AddAnyTypeParam("mobileNumber", "Take value (String) . Please, input string value.");
AddAnyTypeParam("take", "mobileNumber value (String) . Please, input string value.");
AddAnyTypeParam("object", "Object to Show List value (string) . Please, input string value.");
AddAnyTypeParam("success", "Go to Name Complete Layout value (String) . Please, input string value.");
AddAnyTypeParam("error", "Go to Name Error Layout value (String) . Please, input string value.");
AddAction(6, 0, "Listar Scores Current", "YummiCookie", "Submit <b>{0}</b> ,<b>{1}</b> ,<b>{2}</b> ,<b>{3}</b> ,<b>{4}</b>", "Mostrar Scores Current", "getScore");

////////////////////////////////////////
// Expressions

ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_text,"username","","Username"),
	new cr.Property(ept_text,"password","","Password")
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