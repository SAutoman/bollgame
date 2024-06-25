//Version 0.5
//
//change from 0.4:
//
//	1. Now minify compliant.
//
////////////////////////////////

function GetPluginSettings()
{
	return {
		"name":		"MouseLock",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"MouseLock",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"0.5",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Allows the game to lock the cursor from a key or with an in-game command. Outputs raw x/y movment from mouse. Esc to exit (this cannot be overridden--don't keybind esc to anything else). Chrome/Firefox only.",
		"author":		"Tim Hamilton",
		"help url":		"<your website or a manual entry on Scirra.com>",
		"category":		"Input",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
												
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
//AddComboParamOption("True");
//AddComboParamOption("False");
//AddComboParam("Enable", "Enable/Disable Mouse Lock." ["True", "False", initial_selection = 1]);

//Status Conditions:
AddCondition(0, cf_none, "Is supported",	"Status Conditions",	"Mouse Lock is supported.", 
			"True if mouse lock is supported. For now, only supported in Firefox and Chrome.", 
			"IsSupported");
			
AddCondition(1, cf_none, "Is locked",		"Status Conditions",	"Mouse is currently locked.", 
			"True if mouse is locked.", 
			"IsLocked");
			
AddCondition(2, cf_none, "Is moving",		"Status Conditions",	"Mouse is moving.", 
			"True if mouse is moving. This can be affected by the deadzone.", 
			"IsMoving");

//Trigger Conditions:
AddCondition(3, cf_trigger, "On Lock",	 "Trigger Conditions", "On Mouse Lock",	
			"Triggered when pointer is locked.",
			"OnLock");
			
AddCondition(4, cf_trigger, "On Unlock", "Trigger Conditions", "On Mouse Unlock",	
			"Triggered when pointer is unlocked.",
			"OnUnlock");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

//Action: Set Mouse Lock (Enabled, Disabled)
AddComboParamOption("Enable");
AddComboParamOption("Disable");
AddComboParam("Set Mouse Lock:", "Enable/Disable Mouse Lock.", ["Enabled", "Disabled", initial_selection = 1]);

AddAction(1, af_none, "Set Mouse Lock", "On/Off", "{0} Mouse Lock", 
			"Manually enable/disable the mouse lock. If 'Activate On' is set to 'Manual Trigger', this command is the only way to lock the mouse.", 
			"SetMouseLock");

//Action: Set Smoothing (Enabled, Disabled)
AddComboParamOption("Enable");
AddComboParamOption("Disable");
AddComboParam("Smoothing:", "Enable/Disable Smoothing.", ["Enable", "Disable", initial_selection = 1]);

AddAction(2, af_none, "Smoothing", "On/Off", "{0} Smoothing", 
			"Manually enable/disable smoothing.", 
			"SetSmoothing");

//Action: Invert X Axis (True, False)
AddComboParamOption("True");
AddComboParamOption("False");
AddComboParam("Invert X Axis:", "Invert X Axis.", ["True", "False", initial_selection = 1]);

AddAction(3, af_none, "Invert X Axis", "Invert", "Invert X Axis is {0}", 
			"Set property Invert X Axis", 
			"InvertX");

//Action: Invert Y Axis (True, False)
AddComboParamOption("True");
AddComboParamOption("False");
AddComboParam("Invert Y Axis:", "Invert Y Axis.", ["True", "False", initial_selection = 1]);

AddAction(4, af_none, "Invert Y Axis", "Invert", "Invert Y Axis is {0}", 
			"Set property Invert Y Axis", 
			"InvertY");

//Action: Set Cursor Speed
AddNumberParam("Cursor Speed", "Set the cursor speed.");

AddAction(5, af_none, "Set Cursor Speed", "Movement", "Set Cursor Speed to {0}", 
			"Set property Cursor Speed", 
			"SetCursorSpeed");

//Action: Set Speed Cap
AddNumberParam("Speed Cap", "Set the cursor speed cap.");

AddAction(6, af_none, "Set Speed Cap", "Movement", "Set Speed Cap to {0}", 
			"Set property Speed Cap", 
			"SetSpeedCap");

//Action: Set Dead Zone
AddNumberParam("Dead Zone", "Set the deadzone.");

AddAction(7, af_none, "Set Dead Zone", "Movement", "Set Dead Zone to {0}", 
			"Set property Deadzone", 
			"SetDeadZone");

//Action: Set Response Curve
AddNumberParam("Response Curve", "Set the response curve.");

AddAction(8, af_none, "Set Response Curve", "Movement", "Set Response Curve to {0}", 
			"Set property Response Curve", 
			"SetResponseCurve");

//Action: Set Custom Lock Activate Key (For 'Activate On')
AddKeybParam("Custom Lock Activate Key", 
			"Choose a custom key to activate mouse lock. 'Activate On' must be set to 'Custom Key' for this to work. Note that international users and users on different operating systems or devices may not have the same keys available.");

AddAction(9, af_none, "Mouse Lock on Custom Key", "Keyboard", "Set Custom Lock Activate Key to <b>{0}</b>.", 
			"Choose a custom key to activate mouse lock. Defaults to Enter/Return (keycode 13) 'Activate On' must be set to 'Custom Key' for this to work.", 
			"SetCustomLockActivateKey");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

AddExpression(1, ef_return_number, "Raw X", "Input", "RawX", 
				"(X axis)Raw mouse position change from last tick.");
				
AddExpression(2, ef_return_number, "Raw Y", "Input", "RawY", 
				"(Y axis)Raw mouse position change from last tick.");
				
AddExpression(3, ef_return_number | ef_variadic_parameters, "Mouse Lock X", "Input", "MouseLockX", 
				"(X axis)Mouse position on current layer (layout?). Can be unbound, or bound to window(parm Bounding).");
				
AddExpression(4, ef_return_number | ef_variadic_parameters, "Mouse Lock Y", "Input", "MouseLockY", 
				"(Y axis)Mouse position on current layer (layout?). Can be unbound, or bound to window(parm Bounding).");
				
AddExpression(5, ef_return_number, "Movement Angle", "Input", "MovementAngle", 
				"Cursor's angle of movement. Computed from last two or three positions. If no movement, returns -1.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [

	//Constraints:
	new cr.Property(ept_section, "Constraints", "",	"Initial settings and constraints."),
	
	new cr.Property(ept_combo,	"Activate On",					"Double Click",
					"Single Click and Double Click are self explanatory. Custom Key activates on...a custom key.", 
					"Single Click|Double Click|Custom Button"),

	//This is commented out for now because I can't find a satisfactory way to implement it.				
/*	new cr.Property(ept_integer,	"Custom Key",					"Enter",
					"Custom key to activate mouse lock."),
*/					
	new cr.Property(ept_combo,	"Bounding",						"Bound to Window",
					"Bound to Window and Bound to Layer do just that. Unbounded is for custom (event based) bounding.", 
					"Bound to Window|Bound to Layout|Unbounded"),
					
	new cr.Property(ept_combo,	"Disable If Unlock",			"False",
					"Disable RawX/Y and MouseLockX/Y if mouse is not locked. Said values will read 0.",
					"False|True"),
					
	new cr.Property(ept_combo,	"Enable Quantum Tunnelling",	"Yes-No",
					"Enable Quantum Tunnelling. This may be entirely useless.", 
					"Yes-No|Maybe"),

	//Movement Properties:
	new cr.Property(ept_section, "Movement Properties", "",	"Properties that affect the movement of the cursor."),
	
	new cr.Property(ept_combo,	"Smoothing",			"False",
					"Not currently enabled.", 
					"False|True"),
					
	new cr.Property(ept_combo,	"Invert X",				"False",
					"Invert X axis movement.",
					"False|True"),
					
	new cr.Property(ept_combo,	"Invert Y",				"False",
					"Invert Y axis movement.",
					"False|True"),
					
	new cr.Property(ept_float, 	"Cursor Speed",			1,
					"How fast cursor moves in relation to normal cursor speed. 2 would be twice as fast, 0.5 half as fast, etc."),
					
	new cr.Property(ept_float, 	"Dead Zone",			0,
					"If cursor is moving slowly, movements are ignored. More specifically: if per-tick change is under this value for RawX/Y, ignore the change."),
	new cr.Property(ept_integer,"Speed Cap",			0,
					"If per tick change is over cap, clamp to cap. So: cap is 100, x movement is 127, x movement equal 100. 0(default) is disabled."),
	new cr.Property(ept_integer,"Response Curve",		0,
					"Response Curve. Not yet implemented."),
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
alert(	"Mouse Lock is not a replacement for any input plugin. It only functions in firefox and chrome; please provide alternate controls with either the mouse, touch, gamepad, or keyboard plugin. Otherwise, players on Opera, IE, Safari, etc., will not be able to control your game.");
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
//This shouldn't do anything right now, because custom key isn't enabled.
if(property_name == "Custom Key")
	{
	alert(	"You just changed the custom key param.");
	}
}
