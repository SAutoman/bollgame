function GetPluginSettings()
{
	return {
		"name":			"C3 XML Plus",
		"id":			"C3XML_Plus",		
		"version":      "1.0.0.0",
		"description":	"You just need to have the creativity to create what you want.",
		"author":		"José Eliel da Rocha Alves",
		"help url":		"http://store.appswisegames.com/",
		"category":		"APPS WISE - C3",
		"type":			"object",
		"rotatable":	false,
		"flags":		pf_singleglobal,				

	};
};

////////////////////////////////////////
// Conditions
			
////////////////////////////////////////
// Actions
AddStringParam("C3XML Plus:", "");
AddAction(0, 0, "Carregar", "Documento", "", "", "Load");

////////////////////////////////////////
// Expressions
AddStringParam("CaminhoX", "");
AddExpression(0, ef_return_string, "",		"C3 XML Plus",	"ValorString", "");

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