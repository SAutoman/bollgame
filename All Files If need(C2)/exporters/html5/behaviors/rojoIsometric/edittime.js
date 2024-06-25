function GetBehaviorSettings()
{
	return {
		"name":			"iso",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"rojoIsoSort",			// this is used to identify this behavior and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"Isometric sorting and positioning",
		"author":		"R0J0hound",
		"help url":		"<your website or a manual entry on Scirra.com>",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"flags":		0						// uncomment lines to enable flags...
						| bf_onlyone			// can only be added once to an object, e.g. solid
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
				
AddNumberParam("offset x", "offset x");
AddNumberParam("offset y", "offset y");
AddNumberParam("offset z", "offset z");		
AddCondition(0, cf_none, "Isometric overlap?", "Isometric", "Iso overlap at offset ({0},{1},{2})", "Check for overlap at offset in isometric space", "IsOverlapIso");

AddCmpParam("Comparison", "How to compare the isometric X position.");
AddNumberParam("Value", "The value to compare the isometric X position to.");
AddCondition(1,	cf_none, "Compare iso X", "Isometric", "iso X {0} {1}", "Compare the isometric X position to a value.", "compareIsoX");

AddCmpParam("Comparison", "How to compare the isometric Y position.");
AddNumberParam("Value", "The value to compare the isometric Y position to.");
AddCondition(2,	cf_none, "Compare iso Y", "Isometric", "iso Y {0} {1}", "Compare the isometric Y position to a value.", "compareIsoY");

AddCmpParam("Comparison", "How to compare the isometric Z position.");
AddNumberParam("Value", "The value to compare the isometric Z position to.");
AddCondition(3,	cf_none, "Compare iso Z", "Isometric", "iso Z {0} {1}", "Compare the isometric Z position to a value.", "compareIsoZ");

AddObjectParam("object type", "Object type must have the isometric behavior");
AddNumberParam("offset x", "offset x");
AddNumberParam("offset y", "offset y");
AddNumberParam("offset z", "offset z");		
AddCondition(4, cf_none, "Overlaps objects at iso offset", "Isometric", "Overlaps {0} at iso offset ({1},{2},{3})", "Check for overlap of objects at offset in isometric space", "OverlapIsoObj");

/*AddComboParamOption("xy");
AddComboParamOption("xz");
AddComboParamOption("yz");
AddComboParam("plane", "Isometric plane to check overlaps on.  The missing axis is ignored.")
AddCondition(4, cf_none, "Isometric overlap on plane", "Isometric", "Iso overlap on {0} plane.", "Check for overlap on a plane in isometric space", "IsoOverlapPlane");*/

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

AddNumberParam("iso offset x", "iso x offset");
AddNumberParam("iso offset y", "iso y offset");
AddNumberParam("iso offset z", "iso z offset");
AddAction(0, af_none, "Iso move by offset", "Isometric", "Iso move by offset ({0}, {1}, {2})", "Moves by offset in isometric space.", "isoMoveOffset");

AddNumberParam("iso x", "iso x position");
AddNumberParam("iso y", "iso y position");
AddNumberParam("iso z", "iso z position");
AddAction(1, af_none, "Set iso position", "Isometric", "Set iso position to ({0}, {1}, {2})", "Set isometric position.", "setIsoPos");

AddNumberParam("iso x", "iso x position");
AddAction(2, af_none, "Set isoX", "Isometric", "Set isoX to {0}", "Set isometric x position.", "setIsoX");
AddNumberParam("iso y", "iso y position");
AddAction(3, af_none, "Set isoY", "Isometric", "Set isoY to {0}", "Set isometric y position.", "setIsoY");
AddNumberParam("iso z", "iso z position");
AddAction(4, af_none, "Set isoZ", "Isometric", "Set isoZ to {0}", "Set isometric z position.", "setIsoZ");

AddAction(5, af_none, "Iso Push out", "Isometric helper", "Iso Push out", "Pushes out of other isometric objects in the closest direction.", "isoPushOut");

AddNumberParam("iso size x", "iso x size");
AddAction(6, af_none, "Set iso size X", "Isometric size", "Set iso size X to {0}", "Set isometric x size.", "setIsoSizeX");
AddNumberParam("iso size y", "iso y size");
AddAction(7, af_none, "Set iso size Y", "Isometric size", "Set iso size Y to {0}", "Set isometric y size.", "setIsoSizeY");
AddNumberParam("iso size z", "iso z size");
AddAction(8, af_none, "Set iso size Z", "Isometric size", "Set iso size Z to {0}", "Set isometric z size.", "setIsoSizeZ");

AddObjectParam("Object", "Object to use as shadow.")
AddAction(9, af_none, "Position shadow object.", "Isometric helper", "Position object {0} as shadow.", "Positions an object below the isometric object on the next closest below for a shadow.", "positionShadowObj");

AddComboParamOption("Enable");
AddComboParamOption("Disable");
AddComboParam("state", "Setting to turn off sorting.");
AddAction(10, af_none, "Enable/disable sorting.", "Isometric sorting", "{0} isometric sorting.", "Enable/disable isometric sorting.", "enableDisSort");

AddAction(11, af_none, "trigger sort next tick.", "Isometric sorting", "trigger a sort next tick.", "If sorting is disabled this will cause a sort next tick.", "triggerSort");

AddObjectParam("Object type", "Object type to push out of. Type needs to have isometric behavior.")
AddAction(12, af_none, "Iso Push out Object", "Isometric helper", "Iso Push out of {0}", "Pushes out of a isometric object type in the closest direction.", "isoPushOutObj");

AddAction(13, af_none, "Update iso postion from XY", "Isometric", "Update iso postion from XY", "Update isometric postion from XY and isoZ.", "updateIsoFromXY");
/*AddNumberParam("iso offset x", "iso x offset");
AddNumberParam("iso offset y", "iso y offset");
AddNumberParam("iso offset z", "iso z offset");
AddAction(0, af_none, "Iso move at angle", "Isometric", "Iso move {0} at angles {1} and {2}", "Moves by offset in isometric space.", "isoMoveAtAngle");*/
////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

AddExpression(0, ef_return_number, "iso x", "Isometric", "isoX", "Return the isometric x position.");
AddExpression(1, ef_return_number, "iso y", "Isometric", "isoY", "Return the isometric y position.");
AddExpression(2, ef_return_number, "iso y", "Isometric", "isoZ", "Return the isometric z position.");

AddExpression(3, ef_return_number, "iso size x", "Isometric size", "isoSizeX", "Return the isometric x size.");
AddExpression(4, ef_return_number, "iso size y", "Isometric size", "isoSizeY", "Return the isometric y size.");
AddExpression(5, ef_return_number, "iso size y", "Isometric size", "isoSizeZ", "Return the isometric z size.");

AddNumberParam("iso x", "iso x position");
AddNumberParam("iso y", "iso y position");
AddNumberParam("iso z", "iso z position");
AddExpression(6, ef_return_number, "iso pos to layout x", "Isometric conversions", "isoPos2LayoutX", "Converts an isometric position to layout X.");

AddNumberParam("iso x", "iso x position");
AddNumberParam("iso y", "iso y position");
AddNumberParam("iso z", "iso z position");
AddExpression(7, ef_return_number, "iso pos to layout y", "Isometric conversions", "isoPos2LayoutY", "Converts an isometric position to layout Y.");

AddExpression(8, ef_return_number, "iso box min x", "Isometric box", "isoBoxMinX", "Returns the min X of the isometric box.");
AddExpression(9, ef_return_number, "iso box max x", "Isometric box", "isoBoxMaxX", "Returns the max X of the isometric box.");
AddExpression(10, ef_return_number, "iso box min y", "Isometric box", "isoBoxMinY", "Returns the min Y of the isometric box.");
AddExpression(11, ef_return_number, "iso box max y", "Isometric box", "isoBoxMaxY", "Returns the max Y of the isometric box.");
AddExpression(12, ef_return_number, "iso box min z", "Isometric box", "isoBoxMinZ", "Returns the min Z of the isometric box.");
AddExpression(13, ef_return_number, "iso box max z", "Isometric box", "isoBoxMaxZ", "Returns the max Z of the isometric box.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
	new cr.Property(ept_float, 	"iso x",		0,		"Isometric X position. Positive is right/down."),
	new cr.Property(ept_float, 	"iso y",		0,		"Isometric Y position. Positive is left/down."),
	new cr.Property(ept_float, 	"iso z",		0,		"Isometric Z position. Positive is up."),
	new cr.Property(ept_float, 	"iso size x",		32,		"Isometric X size."),
	new cr.Property(ept_float, 	"iso size y",		32,		"Isometric Y size."),
	new cr.Property(ept_float, 	"iso size z",		32,		"Isometric Z size."),
	new cr.Property(ept_combo, "Initial isoXY from XY", "Yes", "If yes, the starting isoX and isoY will be calculated at runtime.", "No|Yes")
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
}
