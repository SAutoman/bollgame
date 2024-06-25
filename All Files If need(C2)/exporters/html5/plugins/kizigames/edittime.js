function GetPluginSettings()
{
	return {
		"name":			"Kizi",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"Kizi",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Kizi plugin",
		"author":		"<Tobiasz/uncertainstudio>",
		"help url":		"http://uncertainstudio.com",
		"category":		"Platform specific",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0 | pf_singleglobal,
		"dependency":	"kizi_api.js"
	};
};

AddCondition(0, cf_trigger, "Kizigames Ad Started", "Main", "Ad Started", "Kizi - This callback function will be called when ad starts to play.", "KiziAdStarted");

AddCondition(1, cf_trigger, "Kizigames Ad Ended", "Main", "Ad Ended", "Kizi - This callback function will be call on ad completion.", "KiziAdEnded");

AddAction(0, 0, "StatusGameStart", "State", "Started Game",
 "Place this when layout starts.", "StatusGameStart");

AddAction(1, 0, "StatusGameEnd", "State", "Ended Game",
 "Place this when player clicks restart or start.", "StatusGameEnd");


AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");

////////////////////////////////////////
ACESDone();

var property_list = [
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

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}


// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}