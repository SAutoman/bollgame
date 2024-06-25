function GetBehaviorSettings()
{
	return {
		"name":			"Rogue",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"RezRogue",			// this is used to identify this behavior and is saved to the project; never change it
		"version":		"1.1",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"A rogueish behaviour for pathfinding and grid based sight.",
		"author":		"00Rez",
		"help url":		"",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"flags":		0						// uncomment lines to enable flags...
					//	| bf_onlyone			// can only be added once to an object, e.g. solid
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
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>, and {my} for the current behavior icon & name
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
AddNumberParam("X", "The X position.", "0")
AddNumberParam("Y", "The Y position.", "0")
AddComboParamOption("in pixels");
AddComboParamOption("in grid cells");
AddComboParam("Measurements", "Choose a measurement type in pixels or cells.", 0);
AddComboParamOption("seen");
AddComboParamOption("not seen");
AddComboParamOption("seen before");
AddComboParamOption("not seen before");
AddComboParamOption("seen and seen before");
AddComboParamOption("seen and not seen before");
AddComboParamOption("not seen and seen before");
AddComboParamOption("not seen and not seen before");
AddComboParam("Check type", "Choose a check type.", 0);
AddCondition(0, 0, "Check a sight tile", "Sight", "If {my} cell is <b>{3}</b> at ({0}, {1}) {2}", "Check a sight tile.", "CheckSightTile");

AddNumberParam("X", "The X origin.", "0");
AddNumberParam("Y", "The Y origin.", "0");
AddComboParamOption("in pixels");
AddComboParamOption("in grid cells");
AddComboParam("Measurements", "Choose a measurement type in pixels or cells.", 0);
AddCondition(1, cf_looping | cf_not_invertible, "For each cell in the radius (position)", "Sight", "For each {my} cell in radius around ({0},{1}) {2}", "Repeat the event for each cell within the radius around a position.", "ArrayForEach");

AddCondition(2, cf_looping | cf_not_invertible, "For each sight cell in the radius around myself", "Sight", "For each {my} sight cell in radius around myself", "Repeat the event for each cell within the radius around myself.", "ArrayForEachSelf");

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
AddAction(0, af_none, "Stop", "My category", "Stop {my}", "Description for my action!", "Stop");

AddNumberParam("Start X", "The X position the path starts from.", "0");
AddNumberParam("Start Y", "The Y position the path starts from.", "0");
AddNumberParam("End X", "The X position the path ends at.", "0");
AddNumberParam("End Y", "The Y position the path ends at.", "0");
AddComboParamOption("in pixels");
AddComboParamOption("in grid cells");
AddComboParam("Measurements", "Choose a measurement type in pixels or grid cells.", 0);
AddComboParamOption("manhattan");
AddComboParamOption("diagonal");
AddComboParamOption("euclidean");
AddComboParam("Heuristic", "Choose the heuristic type for the pathfinding.", 0);
AddComboParamOption("true");
AddComboParamOption("false");
AddComboParam("Diagonals", "Choose whether diagonals are included or not.", 0);
AddAction(1, 0, "Find a path from a position", "Pathfinding", "Find {my} path from ({0},{1}) to ({2},{3}) <i>{4}</i>", "Find a path.", "FindPath");

AddNumberParam("End X", "The X position the path ends at.", "0");
AddNumberParam("End Y", "The Y position the path ends at.", "0");
AddComboParamOption("in pixels");
AddComboParamOption("in grid cells");
AddComboParam("Measurements", "Choose a measurement type in pixels or grid cells.", 0);
AddComboParamOption("manhattan");
AddComboParamOption("diagonal");
AddComboParamOption("euclidean");
AddComboParam("Heuristic", "Choose the heuristic type for the pathfinding.", 0);
AddComboParamOption("true");
AddComboParamOption("false");
AddComboParam("Diagonals", "Choose whether diagonals are included or not.", 0);
AddAction(2, 0, "Find a path from myself to a position", "Pathfinding", "Find {my} <b>path</b> from myself to ({0},{1}) <i>{2}</i>", "Find a path from myself.", "FindPathFromSelf");

AddObjectParam("Object", "The object type used to block cells.", "0");
AddAction(3, 0, "Block a path using an object type", "Pathfinding", "Block {my} <i>path</i> using {0}", "Block path for each object type.", "BlockPathUsingObject");

AddObjectParam("Object", "The object type used to unblock cells.", "0");
AddAction(4, 0, "Unblock a path using an object type", "Pathfinding", "Unblock {my} <i>path</i> using {0}", "Unblock path for each object type.", "UnblockPathUsingObject");

AddComboParamOption("including last");
AddComboParamOption("not including last");
AddComboParam("Last position", "Choose whether the last position is included.", 0);
AddAction(5, 0, "Goto next position in path list", "Pathfinding", "{my} goto <b>next</b> position in path list <i>{0}</i>", "Goto next position in the path list.", "NextPathPosition");

AddAction(6, 0, "Goto previous position in path list", "Pathfinding", "{my} goto <b>previous</b> position in path list", "Goto previous position in the path list.", "PreviousPathPosition");

AddAction(7, 0, "Calculate sight from myself", "Sight", "Calculate {my} <b>sight</b> from myself", "Calculate sight from myself.", "CalculateSight");

AddObjectParam("Object", "The object type created for each sight cell.", "0");
AddLayerParam("Layer", "Layer to create objects onto.");
AddNumberParam("Opacity", "Opacity range", "1.0");
AddAction(8, 0, "Create object for each sight tile", "Sight", "Create sight cell for {my} using {0}", "Create object for each sight tile.", "CreateSightTiles");

AddObjectParam("Object", "The object type used to block cells.", "0");
AddAction(9, 0, "Block sight using an object type", "Sight", "Block {my} <i>sight</i> using {0}", "Block sight for each object type.", "BlockSightUsingObject");

AddObjectParam("Object", "The object type used to unblock cells.", "0");
AddAction(10, 0, "Unblock sight using an object type", "Sight", "Unblock {my} <i>sight</i> using {0}", "Unblock sight for each object type.", "UnblockSightUsingObject");

AddObjectParam("Object", "The object type used to block cells.", "0");
AddAction(11, 0, "Block sight and path using an object type", "Sight/Pathfinding", "Block {my} <i>sight and path</i> using {0}", "Block sight and path for each object type.", "BlockBothUsingObject");

AddObjectParam("Object", "The object type used to unblock cells.", "0");
AddAction(12, 0, "Unblock sight and path using an object type", "Sight/Pathfinding", "Unblock {my} <i>sight and path</i> using {0}", "Unblock sight and path for each object type.", "UnblockBothUsingObject");

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
AddExpression(1, ef_return_number, "Current path's x position", "Pathfinding", "PathX", "Return the current path's x position.");
AddExpression(2, ef_return_number, "Current path's y position", "Pathfinding", "PathY", "Return the current path's y position.");
AddExpression(3, ef_return_number, "Current x step", "Pathfinding", "StepX", "Return step x.");
AddExpression(4, ef_return_number, "Current y step", "Pathfinding", "StepY", "Return step y.");
AddExpression(5, ef_return_number, "Current for X sight value.", "Sight", "CurrentSightX", "Return current sight for X.");
AddExpression(6, ef_return_number, "Current for Y sight value.", "Sight", "CurrentSightY", "Return current sight for X.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
	new cr.Property(ept_integer, 	"Tile size",		32,		"Grid tile size used in calculations."),
	new cr.Property(ept_integer, 	"Sight radius",		8,		"Sight radius.")
	];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of the behavior in the IDE
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
		
	// any other properties here, e.g...
	// this.myValue = 0;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
	this.ts = this.properties[1];
}
