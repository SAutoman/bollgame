function GetPluginSettings()
{
	return {
		"name":			"C3 Appswise Plus",
		"id":			"APPSWISE_C3Plus",
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

//////////////////////////////////////////////////////////////
// Conditions
AddStringParam("Tag", "", "\"\"");
AddCondition(0,	cf_trigger, "Concluido", "C3AppswisePlus", "", "", "OnComplete");

AddStringParam("Tag", "", "\"\"");
AddCondition(1,	cf_trigger, "Falhou", "C3AppswisePlus", "", "", "OnError");


//////////////////////////////////////////////////////////////
// Actions
AddStringParam("T:", "", "\"\"");
AddStringParam("U:", "", "\"http://\"");
AddAction(0, 0, "Pedido", "C3AppswisePlus", "", "", "Request");

AddStringParam("T:", "", "\"\"");
AddFileParam("A:", "");
AddAction(1, 0, "Pedido de Arquivo", "C3AppswisePlus", "", "", "RequestFile");

AddStringParam("T:", "", "\"\"");
AddStringParam("U:", "", "\"http://\"");
AddStringParam("D:", "");
AddStringParam("M:", "", "\"POST\"");
AddAction(2, 0, "Enviar por link", "C3AppswisePlus", "", "", "Post");

//////////////////////////////////////////////////////////////
// Expressions
AddExpression(0, ef_return_string, "Obtenha os últimos dados", "C3AppswisePlus", "ObtenhaOsUltimosDados", "");

ACESDone();

// Property grid properties for this plugin
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
	return new IDEInstance(instance, this);
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
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
	
// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}
