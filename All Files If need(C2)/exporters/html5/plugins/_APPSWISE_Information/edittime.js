function GetPluginSettings() {
    return {
        "name": "Information", // as appears in 'insert object' dialog, can be changed as long as "id" stays the same
        "id": "APPSWISE_Information", // this is used to identify this plugin and is saved to the project; never change it
        "version": "1.0.0.1", // (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
        "description": "A BEAUTIFUL ISSUE OF INFORMATION SCREEN 'APPS WISE'",
        "author": "José Eliel da Rocha Alves",
        "help url": "https://store.appswisegames.com/",
        "category": "APPS WISE", // Prefer to re-use existing categories, but you can set anything here
        "type": "object", // either "world" (appears in layout and is drawn), else "object"
        "rotatable": false, // only used when "type" is "world".  Enables an angle property on the object.
        "flags": pf_singleglobal, // uncomment lines to enable flags...
        "dependency": "Information-APPSWISE.min.css;Information-APPSWISE.min.js;Information-promise.js"
            //   | pf_singleglobal      // exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
            //   | pf_texture         // object has a single texture (e.g. tiled background)
            //   | pf_position_aces      // compare/set/get x, y...
            //   | pf_size_aces         // compare/set/get width, height...
            //   | pf_angle_aces         // compare/set/get angle (recommended that "rotatable" be set to true)
            //   | pf_appearance_aces   // compare/set/get visible, opacity...
            //   | pf_tiling            // adjusts image editor features to better suit tiled images (e.g. tiled background)
            //   | pf_animations         // enables the animations system.  See 'Sprite' for usage
            //   | pf_zorder_aces      // move to top, bottom, layer...
            //  | pf_nosize            // prevent resizing in the editor
            //   | pf_effects         // allow WebGL shader effects to be added
            //  | pf_predraw         // set for any plugin which draws and is not a sprite (i.e. does not simply draw
            // a single non-tiling image the size of the object) - required for effects to work properly
    };
};

AddCondition(0, cf_trigger, "On close", "Close Information", "If it is closed", "Run when the alert has been closed.", "OnInformationClose");

AddStringParam("Title:", "Enter the strings:");
AddStringParam("Information:", "Enter the string message.");
AddStringParam("Image URL:", "Enter the address of the image.");
AddStringParam("Button Text:", "Enter the confirm button string message.");
AddAction(1, cf_none, "Add Information", "Add Information", "Information Data: Do not 'edit e not remove' this line! ", " ", "ImageInformation");

// AddExpression
//AddExpression(0, ef_return_string, "GetLastValue", "Alert Information", "GetLastValue", "Get a last input alert message text.");

//////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,      name,   initial_value,   description)      // an integer value
// new cr.Property(ept_float,      name,   initial_value,   description)      // a float value
// new cr.Property(ept_text,      name,   initial_value,   description)      // a string
// new cr.Property(ept_color,      name,   initial_value,   description)      // a color dropdown
// new cr.Property(ept_font,      name,   "Arial,-16",    description)      // a font with the given face name and size
// new cr.Property(ept_combo,      name,   "Item 1",      description, "Item 1|Item 2|Item 3")   // a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,      name,   link_text,      description, "firstonly")      // has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
    // new cr.Property(ept_integer,    "My property",      77,      "An example property.")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
    return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType() {
    assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance) {
    return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
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
IDEInstance.prototype.OnInserted = function() {}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function() {}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name) {}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer) {}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer) {}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer) {}
