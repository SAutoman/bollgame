function GetPluginSettings()  
{
	return {
		"name":			"OutRun_2D", //OutRun_2D
		"id":			"outrunmt",
		"version":		"1.0",	
		"description":	"This project started to be implemented in javascript (because it is easy for prototyping), but it is not intended to demonstrate javascript techniques or best practices.",
		"author":		"José Eliel da Rocha Alves", //José Eliel da Rocha Alves
		"help url":		"https://www.facebook.com/appswiseGames",
		"category":		"APPS WISE - GAMES", //APPS WISE - GAMES
		"type":			"world",			// appears in layout
		"rotatable":	true,
		"flags":		pf_texture | pf_position_aces | pf_size_aces | pf_angle_aces | pf_appearance_aces | pf_zorder_aces,
		"dependency":	"appswisegames_com.js"
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
// Conditions
AddAction(2, 0, "Finish Track", "Finish Line", "Finish Track", "Finish Track", "finish_track");

AddAction(3, 0, "Car Left", "Car Misc", "Car Left", "", "GoLeft");
AddAction(4, 0, "Car Right", "Car Misc", "Car Right", "", "GoRight");
 
AddAction(5, 0, "Car Accelerate", "Car Misc", "Car Accelerate ", "", "SetAcc");
AddAction(6, 0, "Car Delecerate", "Car Misc", "Car Decelerate ", "", "SetDec");

AddAction(7, 0, "Car Not Move", "Car Misc", "Car Not Move", "", "NotMove");

// Actions
AddExpression(0, ef_return_number, "Get Speed Of The Car", "APPSWISE-Games", "car_spd", "Return Speed of The Car");
AddExpression(1, ef_return_number, "Get Position Of The Car", "APPSWISE-Games", "car_pos", "Return The Position of The car on Track");
AddExpression(2, ef_return_number, "Get Segments Length", "APPSWISE-Games", "seg_length", "Return The Segments Length");
AddExpression(3, ef_return_string, "Get Current Lap Time", "APPSWISE-Games", "cur_lt", "Return Current Lap Time 00.00.00");
AddExpression(4, ef_return_string, "Get Last Lap Time", "APPSWISE-Games", "last_lt", "Return Last Lap Time 00.00.00");
AddExpression(5, ef_return_string, "Get Player X", "APPSWISE-Games", "player_x", "Return Player X position");
AddExpression(6, ef_return_number, "Get Lap Counter", "APPSWISE-Games", "lap_counter", "Return Lap Counter");
AddExpression(7, ef_return_number, "Get Max Speed ", "APPSWISE-Games", "max_speed", "Return Max Speed Of The Car");
AddExpression(8, ef_return_number, "Get End Segment Height ", "APPSWISE-Games", "endseg_height", "Return The End Segment Height");
AddExpression(9, ef_return_number, "Get Current Time in Seconds", "APPSWISE-Games", "cur_lt_sec", "Return Current Time in Seconds");

ACESDone();

// Property grid properties for this plugin
var property_list = [
	
	new cr.Property(ept_combo,	"Effect",				"(none)",	"Choose an effect for this object.  (This does not preview in the layout, only when you run.)", "(none)|Additive|XOR|Copy|Destination over|Source in|Destination in|Source out|Destination out|Source atop|Destination atop"),
	new cr.Property(ept_section, "APPSWISE-Games Technicals", "",	"Outrun Technical Parameters"),
	new cr.Property(ept_integer,	"Number Of Lanes",	4,		"Number Of Lanes"),
	new cr.Property(ept_integer,	"Road Width",	2000,		"Road Width"),
	new cr.Property(ept_integer,	"CameraHeight",	800,		"CameraHeight"),

	new cr.Property(ept_integer,	"DrawDistance",	300,		"DrawDistance"),
	new cr.Property(ept_integer,	"Field of View",100,		"Fiel Of View"),
	new cr.Property(ept_integer,	"Fog Density",5,		    "Fog Density"),
	new cr.Property(ept_integer,	"Number Of Cars",80,		    "Number Of Cars On the Game"),
	new cr.Property(ept_section, "Out Run Colors", "",	"Colors Of The Game"),

	new cr.Property(ept_color,	"Start Line Color",	cr.RGB(255,255, 204),	"Star Line Color"),
	new cr.Property(ept_color,	"Finish Line Color",cr.RGB(0,0, 0),	"Finish Line Color"),
	new cr.Property(ept_color,	"Fog Color",	cr.RGB(171,108, 53),	"Fog Color"),
	new cr.Property(ept_color,	"Road LIGHT Color",	cr.RGB(107,107, 107),	"Road Light Color"),
	new cr.Property(ept_color,	"Road DARK Color",	cr.RGB(105,105, 105),	"Road Dark Color"),

	new cr.Property(ept_color,	"Grass LIGHT Color",	cr.RGB(198,132, 74),	"Grass Light Color"),
	new cr.Property(ept_color,	"Grass DARK Color",	    cr.RGB(198,132, 74),	"Grass Dark Color"),
	new cr.Property(ept_color,	"Rumble LIGHT Color",	cr.RGB(85,85,85),	"Rumble Light Color"),
	new cr.Property(ept_color,	"Rumble DARK Color",	cr.RGB(255,153, 0),	"Rumble Dark Color"),
	new cr.Property(ept_color,	"Lanes Colors",	        cr.RGB(204,204, 204),	"Lanes Colors"),
	
	new cr.Property(ept_section, "APPSWISE-Games Road Segments", "",	"C2 users role is drawing road good luck.."),
	
	new cr.Property(ept_combo, "Start Segment","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_combo, "Between Seg.1","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_combo, "Between Seg.2","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
   	new cr.Property(ept_combo, "Between Seg.3","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_combo, "Between Seg.4","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),

	new cr.Property(ept_combo, "Between Seg.5","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_combo, "Between Seg.6","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_combo, "Between Seg.7","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_combo, "Between Seg.8","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_combo, "Between Seg.9","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	
	new cr.Property(ept_combo, "Between Seg.10","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_combo, "End Segment","Straight Short",	"Choise Road Type","Straight Short|Straight Medium|Straight Long|LowRollingHills|Curves|Cruve Easy|Curve Medium|Curve Hard|Bumps|Hill Low|Hill Medium|Hill High|Curve Left Easy|Curve Left Medium|Curve Left Hard|Curve Right Easy|Curve Right Medium|Curve Right Hard|Down Hill Straight|Down Hill Left|Down Hill Right"),
	new cr.Property(ept_section, "Out Run Road Sprites", "",	"C2 users role is adding sprites to the left/right side of the road.."),
	new cr.Property(ept_combo, "Start Segment Sprites Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
    new cr.Property(ept_combo, "Start Segment B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),

	new cr.Property(ept_combo, "Start Segment Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Start Segment Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	new cr.Property(ept_combo, "Between Seg.1 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.1 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.1 Plants","none","Choise Plants For Start Segment","none|Plants Random"),

	new cr.Property(ept_combo, "Between Seg.1 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
//37
	new cr.Property(ept_combo, "Between Seg.2 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.2 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.2 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.2 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "Between Seg.3 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.3 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.3 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.3 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "Between Seg.4 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.4 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.4 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.4 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "Between Seg.5 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.5 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.5 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.5 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "Between Seg.6 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.6 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.6 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.6 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "Between Seg.7 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.7 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.7 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.7 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "Between Seg.8 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.8 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.8 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.8 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "Between Seg.9 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.9 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.9 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.9 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "Between Seg.10 Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "Between Seg.10 B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "Between Seg.10 Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "Between Seg.10 Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	new cr.Property(ept_combo, "End Segment Side","Left Side","Choise Sprites Side","Left Side|Right Side|Both Side"),
	new cr.Property(ept_combo, "End Segment B-boards","none","Choise Billboard For Start Segment","none|Billboard Random"),
	new cr.Property(ept_combo, "End Segment Plants","none","Choise Plants For Start Segment","none|Plants Random"),
	new cr.Property(ept_combo, "End Segment Misc","none","Choise Plants For Start Segment","none|Crops|Column 1|Column 2"),
	
	
	
	
	
	
	
	
	
	
	
		
	new cr.Property(ept_section, "C2 Classics", "",	"Visibility Hot-Spot Etc.."),
	new cr.Property(ept_combo,	"Initial visibility",	"Visible",	"Choose whether the object is visible when the layout starts.", "Visible|Invisible"),
	new cr.Property(ept_combo,	"Hotspot",				"Center",	"Choose the location of the hot spot in the object.", "Top-left|Top|Top-right|Left|Center|Right|Bottom-left|Bottom|Bottom-right"),    
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
	 
}
	
// Called to draw self in the editor
IDEInstance.prototype.Draw = function(renderer)
{
	//var isCheckbox = (this.properties["Type"] === "Checkbox");
	
	if (!this.font)
		this.font = renderer.CreateFont("Arial", 14, false, false);
		
	renderer.SetTexture(null);
	var quad = this.instance.GetBoundingQuad();

	renderer.Fill(quad, cr.RGB(0, 255, 255));
	renderer.Outline(quad, cr.RGB(0, 0, 0));
		
	cr.quad.prototype.offset.call(quad, 0, 2);

	this.font.DrawText(this.properties["Text"],
							quad,
							cr.RGB(0, 0, 0),
							ha_center);
	
	 
}

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
	 
}