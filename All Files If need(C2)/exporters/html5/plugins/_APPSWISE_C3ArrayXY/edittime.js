function GetPluginSettings()
{
	return {
		"name":			"C3 Array XY",
		"id":			"C3ArrayXY",		
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
AddCondition(0, 0, "Conectado com a internet", "Conectado a internet", "Quando estiver conectado", "O navegador esta on-line (ou seja, nao em um modo de navegacao off-line).", "IsOnlineComInternet");
AddCondition(1, cf_deprecated, "Aceitavel", "Verifica", "Está em iframe aceitavel","Verificar se a página atual não está em iframe ou em iframe aceitável.", "CheckInIframeAPPSWISE");
AddCondition(2, 0, "Esta dentro de uma iframe", "Iframes", "Esta dentro de uma iframe","Retornar verdadeiro se esta aplicacao estiver em um iframe.", "IsInIframeAPPSWISE"); 
//AddCondition(1, cf_trigger, "Online:", "Navegador", "On entrou online", "Disparado quando o usuário está off-line e uma conexão se torna disponível.", "OnOnline");
//AddCondition(2, cf_trigger, "Offline", "Navegador", "On foi desligado", "Disparado quando o usuário está online e a conexão fica indisponível.", "OnOffline");


//////////////////////////////////////////////////////////////
// Actions
AddNumberParam("X:", "", "0");
AddAnyTypeParam("Valor:", "", "0");
AddAction(0, 0, "Definido no X", "Array XY", "", "", "SetX");

AddNumberParam("X:", "", "0");
AddNumberParam("Y:", "", "0");
AddAnyTypeParam("Valor:", "", "0");
AddAction(1, 0, "Definido no XY", "Array XY", "", "", "SetXY");

//////////////////////////////////////////////////////////////
// Expressions
AddNumberParam("X", "O índice X (baseado em 0) do valor da matriz a ser obtido.", "0");
AddExpression(0, ef_return_any | ef_variadic_parameters, "Obtenha valor em", "C3ArrayXY", "At", "Obtenha valor da matriz. Adicione segundo ou terceiro parâmetros para especificar os índices Y e Z.");

ACESDone();

// Property grid properties for this plugin
var property_list = [
		new cr.Property(ept_integer,		"W:",		10,			"Elementos no eixo X."),
		new cr.Property(ept_integer,		"H:",		3,			"Elementos no eixo Y."),
		new cr.Property(ept_integer,		"D:",		1,			"Elementos no eixo Z."),
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
	if (this.properties["Width"] < 0)
		this.properties["Width"] = 0;
		
	if (this.properties["Height"] < 0)
		this.properties["Height"] = 0;
		
	if (this.properties["Depth"] < 0)
		this.properties["Depth"] = 0;
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
