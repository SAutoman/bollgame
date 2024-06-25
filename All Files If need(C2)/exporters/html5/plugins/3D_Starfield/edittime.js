/*

-
*/

function GetPluginSettings() 
{
	return {
		"name":			"3D_Starfield",
		"id":			"c23dstarfield",
		"version":		"1.0",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"3D Starfield",
		"author":		"Gigatron",
		"help url":		"http://www.scirra.com",
		"category":		"Auto Run Plugin",
		"type":			"world",			// appears in layout
		"rotatable":	true,
		"flags":		pf_texture | pf_position_aces | pf_size_aces | pf_angle_aces | pf_appearance_aces | pf_zorder_aces,
		
	};
};

// Conditions, actions and expressions
AddComboParamOption("(none)");
AddComboParamOption("Additive");
AddComboParamOption("XOR");
AddComboParamOption("Copy");
AddComboParamOption("Destination over");
AddComboParamOption("Source in");
AddComboParamOption("Destination in");
AddComboParamOption("Source out");
AddComboParamOption("Destination out");
AddComboParamOption("Source atop");
AddComboParamOption("Destination atop");
AddComboParam("Effect", "Choose the new effect for this object.");
AddAction(1, 0, "Set effect", "Appearance", "Set effect to <i>{0}</i>", "Set the rendering effect of this object.", "SetEffect");

AddNumberParam("Speed", "Change the Stars Speed");
AddAction(2, 0, "Set Speed", "3D StarsField Parameters", "Set Speed to {0}", "Set the Stars Speed value", "SetSpeed");

AddNumberParam("X Center", "Change X Position from Center To");
AddAction(3, 0, "Set XCenter", "3D StarsField Parameters", "Set Xcenter to {0}", "Set X Position Center From center  ", "Xcenter");

AddNumberParam("Y Center", "Change Y Position from Center To");
AddAction(4, 0, "Set YCenter", "3D StarsField Parameters", "Set Ycenter to {0}", "Set Y Position Center From center  ", "Ycenter");

ACESDone();

// Property grid properties for this plugin
var property_list = [
	
	new cr.Property(ept_combo,	"Effect",				"(none)",	"Choose an effect for this object.  (This does not preview in the layout, only when you run.)", "(none)|Additive|XOR|Copy|Destination over|Source in|Destination in|Source out|Destination out|Source atop|Destination atop"),
	new cr.Property(ept_combo,	"Initial visibility",	"Visible",	"Choose whether the object is visible when the layout starts.", "Visible|Invisible"),
	// 3d starfield components !
	new cr.Property(ept_integer,	"Numbers Of Stars",	300,		"Numbers of Stars "),
	new cr.Property(ept_integer,	"Stars Speed",	5,		"Stars Speed Factor"),
	new cr.Property(ept_integer,	"Center X Pos",	5,		"Stars Center X Position"),
	new cr.Property(ept_integer,	"Center Y Pos",	5,		"Stars Center Y Position"),
	new cr.Property(ept_color,		"Stars Base Color",	cr.RGB(255, 255, 255),	"Color of the Stars"),
		
	new cr.Property(ept_combo,	"Hotspot",				"Top-left",	"Choose the location of the hot spot in the object.", "Top-left|Top|Top-right|Left|Center|Right|Bottom-left|Bottom|Bottom-right"),
	 
    
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
	this.just_inserted = false;
}

IDEInstance.prototype.OnCreate = function()
{

	switch (this.properties["Hotspot"])
	{
    case "Top-left" :
      this.instance.SetHotspot(new cr.vector2(0, 0));
      break;
    case "Top" :
      this.instance.SetHotspot(new cr.vector2(0.5, 0));
      break;
    case "Top-right" :
      this.instance.SetHotspot(new cr.vector2(1, 0));
      break;
    case "Left" :
      this.instance.SetHotspot(new cr.vector2(0, 0.5));
      break;
    case "Center" :
      this.instance.SetHotspot(new cr.vector2(0.5, 0.5));
      break;
    case "Right" :
      this.instance.SetHotspot(new cr.vector2(1, 0.5));
      break;
    case "Bottom-left" :
      this.instance.SetHotspot(new cr.vector2(0, 1));
      break;
    case "Bottom" :
      this.instance.SetHotspot(new cr.vector2(0.5, 1));
      break;
    case "Bottom-right" :
		  this.instance.SetHotspot(new cr.vector2(1, 1));
      break;
	}
}

IDEInstance.prototype.OnInserted = function()
{
	this.just_inserted = true;
}

IDEInstance.prototype.OnDoubleClicked = function()
{
	this.instance.EditTexture();
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
	// Edit image link
	if (property_name === "Image")
	{
		this.instance.EditTexture();
	}
	else if (property_name === "Hotspot")
	{
    switch (this.properties["Hotspot"])
    {
      case "Top-left" :
        this.instance.SetHotspot(new cr.vector2(0, 0));
      break;
      case "Top" :
        this.instance.SetHotspot(new cr.vector2(0.5, 0));
      break;
      case "Top-right" :
        this.instance.SetHotspot(new cr.vector2(1, 0));
      break;
      case "Left" :
        this.instance.SetHotspot(new cr.vector2(0, 0.5));
      break;
      case "Center" :
        this.instance.SetHotspot(new cr.vector2(0.5, 0.5));
      break;
      case "Right" :
        this.instance.SetHotspot(new cr.vector2(1, 0.5));
      break;
      case "Bottom-left" :
        this.instance.SetHotspot(new cr.vector2(0, 1));
      break;
      case "Bottom" :
        this.instance.SetHotspot(new cr.vector2(0.5, 1));
      break;
      case "Bottom-right" :
        this.instance.SetHotspot(new cr.vector2(1, 1));
      break;
    }
	}
}

IDEInstance.prototype.OnRendererInit = function(renderer)
{
	renderer.LoadTexture(this.instance.GetTexture());
}
	
// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer)
{
	var texture = this.instance.GetTexture();
	renderer.SetTexture(this.instance.GetTexture());
	
	renderer.SetTexture(null);
	var quad = this.instance.GetBoundingQuad();
	renderer.Fill(quad, cr.RGB(100, 140, 160));
	renderer.Outline(quad, cr.RGB(0, 0, 0));
	cr.quad.prototype.offset.call(quad, 0, 2);
	
	// If there is a font present, draw it
	if (this.font)
	{
		var halign = ha_left;
		var valign = va_top;
		
		var hprop = this.properties["Horizontal alignment"];
		var vprop = this.properties["Vertical alignment"];
		
		if (hprop == "Center")
			halign = ha_center;
		else if (hprop == "Right")
			halign = ha_right;
			
		if (vprop == "Center")
			valign = ha_center;
		else if (vprop == "Bottom")
			valign = va_bottom;
		
		this.font.DrawText(this.properties["Text"],
								this.instance.GetBoundingQuad(),
								this.properties["Color"],
								halign,
								this.instance.GetOpacity(),
								this.instance.GetAngle(),
								(this.properties["Wrapping"] === "Word"),
								this.properties["Line height"],
								valign);
	}
	 
}

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
	renderer.ReleaseTexture(this.instance.GetTexture());
}