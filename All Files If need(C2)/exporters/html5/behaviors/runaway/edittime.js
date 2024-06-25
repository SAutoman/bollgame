function GetBehaviorSettings()
{
	return {
		"name":			"runaway",				// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"runaway",				// this is used to identify this behavior and is saved to the project; never change it
		"version":		"1.02",
		"description":	"Make an object runaway.",
		"author":		"rfisher",
		"help url":		"http://www.jenpop.com",
		"category":		"Movements",			// Prefer to re-use existing categories, but you can set anything here
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
				
////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

AddNumberParam("Runaway Speed", "The Speed of the Runaway object, in pixels.");
AddAction(0, af_none, "Set Runaway Speed", "", "Set {my} Runaway Speed to {0} pixels", "Set the runaway speed of objects.", "SetRunawaySpeed");

AddNumberParam("Max Distance", "The Max Distance, in pixels.");
AddAction(1, af_none, "Set Max Distance", "", "Set {my} Max Distance to {0} pixels", "Set the Max Distance.", "SetMaxDistance");

AddNumberParam("Runaway Delay", "The Runaway Delay, in seconds.");
AddAction(2, af_none, "Set Runaway Delay", "", "Set {my} Runaway Delay to {0} seconds", "Set the Runaway Delay.", "SetRunawayDelay");

AddComboParamOption("Enabled");
AddComboParamOption("Disabled");
AddComboParam("Enable/Disable", "Runaway Enable or Disable.");
AddAction(3, 0, "Enable/Disable", "", "Runaway for {my} is {0}", "Runaway Enable or Disable.", "SetRunawayToggle");

AddComboParamOption("8-Way");
AddComboParamOption("4-Way");
AddComboParamOption("Up 3-Way");
AddComboParamOption("Down 3-Way");
AddComboParamOption("Left 3-Way");
AddComboParamOption("Right 3-Way");
AddComboParamOption("Up");
AddComboParamOption("Down");
AddComboParamOption("Left");
AddComboParamOption("Right");
AddComboParamOption("Left-Right");
AddComboParamOption("Up-Down");
AddComboParam("Runaway Behavior", "Runaway Behavior.");
AddAction(4, 0, "Runaway Behavior", "", "Runaway Behavior for {my} is {0}", "Runaway Behavior.", "SetRunawayBehavior");

AddNumberParam("X Destination", "The X Destination of the Runaway object.");
AddNumberParam("Y Destination", "The Y Destination of the Runaway object.");
AddAction(5, af_none, "Set Destination", "", "Set {my} to destination {0},{1}", "Set the destination of objects.", "SetRunawayDestination");

AddComboParamOption("Enabled");
AddComboParamOption("Disabled");
AddComboParam("Enable/Disable Destination", "Destination Enable or Disable.");
AddAction(6, 0, "Enable/Disable Destination", "", "Destination for {my} is {0}", "Destination Enable or Disable.", "SetDestinationToggle");

AddNumberParam("Destination Attempts", "Number of destination Attempts before random movement.");
AddAction(7, af_none, "Set Destination Attempts", "", "Set {my} Destination Attempts to {0}", "Set the Destination Attempts of objects.", "SetDestinationAttempts");


////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel
AddExpression(0,ef_return_number,"Get Runaway Speed","","RunawaySpeed","The speed of the Runaway object.");
AddExpression(1,ef_return_number,"Get Max Distance","","MaxDistance","The Max Distance in pixels.");
AddExpression(2,ef_return_number,"Get Runaway Delay","","RunawayDelay","The Runaway Delay in seconds.");
AddExpression(3,ef_return_number,"Get Behavior","","RunawayBehavior","The Runaway Behavior Number.");


////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
	new cr.Property(ept_float, "RunawaySpeed", 5,	"The speed of the Runaway object in pixels."),
	new cr.Property(ept_float, "MaxDistance", 100, "The Max Distance in pixels."),
        new cr.Property(ept_float, "RunawayDelay", 1, "The Runaway Delay in seconds."),
        new cr.Property(ept_combo, "RunawayToggle", "Enabled", "Runaway Enable or Disable.", "Enabled|Disabled"),
        new cr.Property(ept_combo, "RunawayBehavior", "8-Way", "Runaway Behavior.", "8-Way|4-Way|Up 3-Way|Down 3-Way|Left 3-Way|Right 3-Way|Up|Down|Left|Right")
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
