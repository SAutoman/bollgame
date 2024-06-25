function GetBehaviorSettings()
{
	return {
		"name":			"Chipmunk",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"rojoChipmunkBeta",		// this is used to identify this behavior and is saved to the project; never change it
		"version":		"2.3",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"A subset of the Chipmunk physics library.",
		"author":		"R0J0hound",
		"help url":		"<your website or a manual entry on Scirra.com>",
		"category":		"Movements",				// Prefer to re-use existing categories, but you can set anything here
		"flags":		0						// uncomment lines to enable flags...
						| bf_onlyone			// can only be added once to an object, e.g. solid
	};
};

function AddVectorParam(name, desc)
{
	AddComboParamOption("rect");
	AddComboParamOption("polar");
	AddComboParam(name + ": vector type", name+". Allows you to choose between a rect:(x,y) or polar:(angle,dist) vector.");
	AddNumberParam(name + ": x or angle", "X or angle for "+name+". "+desc);
	AddNumberParam(name + ": y or dist", "Y or distance for "+name+". "+desc);
};

function AddAnchorParam(name, desc)
{
	AddComboParamOption("rect");
	AddComboParamOption("polar");
	AddComboParamOption("layout");
	AddComboParamOption("imagepoint");
	AddComboParam(name + ": vector type", name+". Either relative vectors rect:(x,y) and polar:(angle,dist) or absolute layout:(x,y) and imagepoint.", 2);
	AddNumberParam(name + ": x, angle, or imagepoint", "X, angle or imagepoint number for "+name+". If imagepoint, using -1 will use the COM. "+desc);
	AddNumberParam(name + ": y or distance", "Y or distance for "+name+". "+desc+" If imagepoint is picked this value is unused.");
};

function AddXYParam(name, desc)
{
	AddNumberParam(name + " x", "X position for "+name+". "+desc);
	AddNumberParam(name + " y", "Y position for "+name+". "+desc);
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
				
// sleeping probably won't work due to statics not being able to move without issues.				
AddCondition(0, cf_none, "Is sleeping", "Chipmunk", "{my} is sleeping", "Pick sleeping instances.", "isSleeping");
AddCondition(9, cf_none, "Is disabled", "Chipmunk", "{my} Is disabled", "Pick disabled instances.", "isDisabled");
AddCondition(10, cf_none, "Is immovable", "Chipmunk", "{my} Is immovable", "Pick immovable instances", "isImmovable");
AddCondition(11, cf_none, "Is unrotatable", "Chipmunk", "{my} Is unrotatable", "Pick instances with prevent rotation", "isUnrotatable");


AddComboParamOption("None");
AddComboParamOption("Box");
AddComboParamOption("Circle");
AddComboParamOption("Polygon");
AddComboParamOption("Segment");
AddComboParam("Collision shape", "Collision shape");
AddCondition(1, cf_none, "Compare collision shape", "Chipmunk", "{my} collision shape is {0}", "Compares collision shape.", "compareCollisionShape");

AddComboParamOption("Fixed");
AddComboParamOption("Variable");
AddComboParam("Stepping mode", "Stepping mode");
AddCondition(2, cf_static, "Compare stepping mode", "Chipmunk", "{my} stepping mode is {0}", "Compares the stepping mode.", "compareSteppingMode");

//TODO: for each?
// filering with group/layers?
AddXYParam("Point");
AddCondition(3, cf_none, "Query all from point", "Query", "{my} Query all from point ({0},{1})", "Calculates the closest points on all picked instances.", "queryPoint");

AddXYParam("Point");
AddNumberParam("Max distance", "Maximum distance.", "Infinity");
AddNumberParam("Group", "Objects with the same non-zero group won't collide.", "0");
AddAnyTypeParam("Layers", "If two object's with this bitwise anded together is nonzero, they can collide.  Can take a number or a hexadecimal number string.", "\"ffffffff\"");
AddCondition(4, cf_static, "Query closest to point", "Query", "{my} Query closest to point ({0},{1}) within {2} pixels and in group:{3} and layers{4}", "Picks the closest instance to a point and also finds the closest point on that instance.", "nearestQueryPoint");

// for each?
AddXYParam("PointA");
AddXYParam("PointB");
AddCondition(5, cf_none, "Query all hitting line segment", "Query", "{my} Query all hitting line from ({0},{1}) to ({2},{3})", "Picks objects overlapping line segment and calculates the first point that hits.", "querySegment");

AddXYParam("PointA");
AddXYParam("PointB");
AddNumberParam("Group", "Objects with the same non-zero group won't collide.", "0");
AddAnyTypeParam("Layers", "If two object's with this bitwise anded together is nonzero, they can collide.  Can take a number or a hexadecimal number string.", "\"ffffffff\"");
AddCondition(6, cf_static, "Query first hitting line segment", "Query", "{my} Query first hitting line from ({0},{1}) to ({2},{3}), in group:{4} and layers:{5}", "Pick the first instance hit along a line segment and calculate hit info.", "nearestQuerySegment");

AddCondition(7, cf_trigger, "On pre-step", "Chipmunk", "{my} On pre step", "Triggered right before physics simulation step. Useful to negate acceleration from gravity.", "onPreStep");

AddCondition(8, cf_trigger, "On post collide", "Chipmunk", "{my} On post collide", "Triggered right after a collision response.  Additional collision info can be retrieved from here.", "onPostCollide");

AddCondition(12, cf_looping, "For each collision pair", "Chipmunk", "{my} For each collision pair", "", "forEachCollisionPair");

AddCondition(13, cf_trigger, "On pre collide", "Chipmunk", "{my} On pre collide", "Triggered right before a collision response is calculated.  You can ignore the collision here.", "onPreCollide");

// next 14
// TODO: joint iterating?

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// velocities
AddVectorParam("Velocity", "");
AddAction(0, af_none, "Set velocity", "Dynamics", "Set {my} velocity to {0}({1},{2})", "Sets the object's velocity.", "setVelocity");

AddNumberParam("Angular velocity", "In degrees per second.");
AddAction(1, af_none, "Set angular velocity", "Dynamics", "Set {my} angular velocity to {0}", "Set's the object's angular velocity.", "setAngularVelocity");

//forces
AddVectorParam("Force", "");
AddVectorParam("Offset", "Vector is relative to the object center.");
AddAction(11, af_none, "Apply force at offset", "Dynamics", "{my} Apply force {0}({1},{2}) at offset {3}({4},{5})", "Applies a force to an offset from the object's center of mass.", "applyForceAt");

AddVectorParam("Impulse", "");
AddVectorParam("Offset", "Vector is relative to the object center.");
AddAction(13, af_none, "Apply impulse at offset", "Dynamics", "{my} Apply impulse {0}({1},{2}) at offset {3}({4},{5})", "Applies an impulse to an offset from the object's center of mass.", "applyImpulseAt");

AddNumberParam("Torque", "Torque.");
AddAction(14, af_none, "Set torque", "Dynamics", "Set {my} torque to {0}", "Applies torque to object.", "setTorque");

AddNumberParam("Max angular speed", "In degrees per second.");
AddAction(35, af_none, "Set max angular speed", "Dynamics", "Set {my} max angular speed to {0}", "Set's a max limit for the object's angular speed.", "setMaxAngularSpeed");

AddNumberParam("Max speed", "In pixels per second.");
AddAction(36, af_none, "Set max speed", "Dynamics", "Set {my} max speed to {0}", "Set's a max limit for the object's speed.", "setMaxSpeed");

//properties
AddComboParamOption("No");
AddComboParamOption("Yes");
AddComboParam("Immovable", "Immovable");
AddAction(26, af_none, "Set immovable", "Properties", "Set {my} immovable to {0}", "Makes the object immovable or movable.", "setImmovable");

AddComboParamOption("No");
AddComboParamOption("Yes");
AddComboParam("Prevent rotation", "Prevent rotation");
AddAction(42, af_none, "Set prevent rotation", "Properties", "Set {my} prevent rotation to {0}", "Makes the object not rotate on collisions. Does nothing with tilemaps.", "setNoRotation");

AddComboParamOption("None");
AddComboParamOption("Box");
AddComboParamOption("Circle");
AddComboParamOption("Polygon");
AddComboParamOption("Segment");
AddComboParam("Collision shape", "Collision shape");
AddNumberParam("Segment radius", "Radius of segment shape. Use a negative number to keep the shape inside object.", "16");
AddAction(25, af_none, "Set collision shape", "Properties", "Set {my} collision shape to {0} and if segment, radius {1}", "Set's the object's collision shape. Tilemaps only can use None, Box or Polygon.  Circle and Segment are the same as None with tilemaps.", "setCollisionShape");

AddNumberParam("Group", "Objects with the same non-zero group won't collide.");
AddAction(8, af_none, "Set collision group", "Properties", "Set {my} collision group to {0}", "Set's the object's collision group.", "setCollisionGroup");

AddAnyTypeParam("Layers", "If two object's with this bitwise anded together is nonzero, they can collide.  Can take a number or a hexadecimal number string.", "\"ffffffff\"");
AddAction(23, af_none, "Set collision layers", "Properties", "Set {my} collision layers to {0}", "Set's the object's collision layers.", "setCollisionLayers");

AddNumberParam("Mass", "object mass", "1");
AddAction(24, af_none, "Set mass", "Properties", "Set {my} mass to {0}", "Set's the object's mass", "setMass");
//TODO: set inertia? Too advanced?

AddNumberParam("Friction", "friction");
AddAction(7, af_none, "Set friction", "Properties", "Set {my} friction to {0}", "Set's the object's friction.", "setFriction");

AddNumberParam("Elasticity", "elasticity");
AddAction(6, af_none, "Set elasticity", "Properties", "Set {my} elasticity to {0}", "Set's the object's elasticity.", "setElasticity");

//AddAction(33, af_none, "Update collision shape", "Properties", "Update {my} collision shape", "Description for my action!", "updateCollisionShape");

AddComboParamOption("Disable");
AddComboParamOption("Enable");
AddComboParam("Enable/disable", "Enable or disable behavior");
AddAction(34, af_none, "enable/disable", "Properties", "{0} {my} physics", "Enables or disables behavior for object.", "disablePhysics");


//global properties
AddNumberParam("Iterations", "Iterations allow you to control the accuracy of the solver. Defaults to 10.", "10");
AddAction(31, af_none, "Set iterations", "Global Settings", "Set {my} space iterations to {0}", "Set's the number of iterations for the simulation", "setIterations");

AddNumberParam("Damping", "Amount of simple damping to apply to the space. A value of 0.9 means that each body will lose 10% of it’s velocity per second. Defaults to 1.", "1");
AddAction(27, af_none, "Set damping", "Global Settings", "Set {my} space damping to {0}", "Set's the ammount of damping for the simulation", "setDamping");

AddVectorParam("Gravity", "");
AddAction(9, af_none, "Set gravity", "Global Settings", "Set {my} space gravity to {0}({1},{2})", "Set's the gravity", "setGravity");

AddComboParamOption("Fixed");
AddComboParamOption("Variable");
AddComboParam("Stepping mode", "Variable causes weird collisions so it isn't reccomended.");
AddAction(29, af_none, "Set stepping mode", "Global Settings", "Set {my} space stepping mode to {0}", "Set's the simulation's stepping mode.", "setSteppingMode");

AddNumberParam("Time step", "Fixed timestep to use.  1/30 is the default. The stepping mode needs to be 'fixed' to use this.", "1/30");
AddAction(30, af_none, "Set fixed timestep", "Global Settings", "Set {my} fixed timestep to {0}", "Set the fixed time step of the simulation.", "setFixedTimestep");

AddNumberParam("Sleep time threshold", "How long the object has to idle before going to sleep. Infinity disables sleeping.", "1.0");
AddAction(40, af_none, "Set sleep time threshold", "Global Settings", "Set {my} sleep time threshold to {0}", "Set the sleep time threshold of the simulation.", "setSleepTimeThreshold");

AddNumberParam("Idle speed threshold", "The maximum speed an object can be going and still be considered idle, which is used for sleeping. With 0 a value baised on the gravity will be used.", "0");
AddAction(41, af_none, "Set idle speed threshold", "Global Settings", "Set {my} idle speed threshold to {0}", "Set the idle speed threshold of the simulation.", "setIdleSpeedThreshold");

//32 reserved for other advanced nonsense

//joints

AddAnchorParam("Anchor1", "The first object's anchor point. The distance between the anchors will be the pin length.");
AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddAnchorParam("Anchor2", "The second object's anchor point. The distance between the anchors will be the pin length.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(2, af_none, "Add pin joint", "Joints", "{my} Add pin joint from {0}({1},{2}) to obj {3} at {4}({5},{6}). Tag:{7}", "A line connected to either object at it's ends.", "addPinJoint");

AddAnchorParam("Anchor1", "The first object's anchor point. After creation the two anchors will move together.");
AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddAnchorParam("Anchor2", "The second object's anchor point. After creation the two anchors will move together.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(3, af_none, "Add pivot joint", "Joints", "{my} Add piviot joint from {0}({1},{2}) to obj {3} at {4}({5},{6}). Tag:{7}", "A hinge", "addPivotJoint");

AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddNumberParam("X", "X on layout. The relative anchor points of both ojects will be calculated from this point.");
AddNumberParam("Y", "Y on layout. The relative anchor points of both ojects will be calculated from this point.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(4, af_none, "Add pivot joint at XY", "Joints", "{my} Add piviot joint with obj {0} at ({1},{2}). Tag:{3}", "A hinge", "addPivotJointAtXY");

AddAnchorParam("GrooveA", "The first point of the groove on the first object. The second object will freely move in the groove.");
AddAnchorParam("GrooveB", "The second point of the groove on the first object. The second object will freely move in the groove.");
AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddAnchorParam("Anchor2", "Anchor of the second object. This will move in the groove of the first object.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(15, af_none, "Add groove joint", "Joints", "{my} Add groove joint from {0}({1},{2})->{3}({4},{5}) to obj {6} at {7}({8},{9}). Tag:{10}", "A hinge that can slide through a groove line.", "addGrooveJoint");

AddAnchorParam("Anchor1", "The first object's anchor point. This joint limits the distance between the objects to a range.");
AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddAnchorParam("Anchor2", "The second object's anchor point. This joint limits the distance between the objects to a range.");
AddNumberParam("Min dist", "Minimum distance the objects can be from each other.");
AddNumberParam("Max dist", "Maximum distance the objects can be from each other.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(16, af_none, "Add slide joint", "Joints", "{my} Add slide joint from {0}({1},{2}) to obj {3} at {4}({5},{6}) with range of ({7},{8}). Tag:{9}", "Like a pin joint but the length has a range.", "addSlideJoint");

AddAnchorParam("Anchor1", "The first object's anchor point.");
AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddAnchorParam("Anchor2", "The second object's anchor point.");
AddNumberParam("Rest length", "The rest length of the spring.", 100);
AddNumberParam("Stiffness", "The stiffness of the spring.", 5);
AddNumberParam("Damping", "The damping of the spring", 1);
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(17, af_none, "Add damped spring", "Joints", "{my} Add damped spring from {0}({1},{2}) to obj {3} at {4}({5},{6}) with rest length {7}, stiffness {8} and damping {9}. Tag:{10}", "A linear spring.", "addDampedSpring");

AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddNumberParam("Rest angle", "Rest angle of the spring. It's relative to the second object's angle.");
AddNumberParam("Stiffness", "The stiffness of the spring.", 5);
AddNumberParam("Damping", "The damping of the spring.", 1);
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(18, af_none, "Add damped rotary spring", "Joints", "{my} Add damped rotary spring to obj {0} with rest angle {1}, stiffness {2} and damping {3}. Tag:{4}", "A angular spring.", "addDampedRotarySpring");

AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddNumberParam("Phase", "The initial offset to use when deciding where the ratchet angles are. It's relative to the second object's angle.");
AddNumberParam("Ratchet", "The distance between 'clicks'.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(19, af_none, "Add ratchet joint", "Joints", "{my} Add ratchet joint to obj {0} with phase {1} and rachet {2}. Tag:{3}", "Like a socket wrench.", "addRatchetJoint");

AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddNumberParam("Phase", "The initial angular offset of the two bodies. It's relative to the second object's angle.");
AddNumberParam("Ratio", "Keeps the angular velocity ratio of a pair of bodies constant.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(20, af_none, "Add gear joint", "Joints", "{my} Add gear joint to obj {0} with phase {1} and ratio {2}. Tag:{3}", "Set's angle to a ratio of another object's angle.", "addGearJoint");

AddNumberParam("Object2 UID", "UID of the second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddNumberParam("Rate", "Speed in degrees per second.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(21, af_none, "Add simple motor", "Joints", "{my} Add simple motor to obj {0} with rate {1}. Tag:{2}", "A motor that makes a constant rotation speed.", "addSimpleMotor");

AddNumberParam("Object2 UID", "UID of second object. Object needs to have the chipmunk behavior to work. Set to -1 to use the layout." , "-1");
AddNumberParam("Min", "The minimum angle. Relative to object.");
AddNumberParam("Max", "The maximum angle limit. It is clockwise from 'min'. Relative to object.");
AddStringParam("Tag", "Tag to use later to reference joint.");
AddAction(22, af_none, "Add rotary limit joint", "Joints", "{my} Add rotary limit joint to obj {0} with range from {1} CW to {2}. Tag:{3}", "Limits angles to a range.", "addRotaryLimitJoint");

AddAction(5, af_none, "Destroy all connected joints", "Joints", "{my} Destroy all connected joints", "Destroy all connected joints.", "destroyConnectedJoints");

AddAnyTypeParam("Tag", "Tag of joint. Can be an index or a string.", "\"\"");
AddAction(37, af_none, "Destroy joint", "Joints", "{my} Destroy joint {0}", "Destroys a joint.", "destroyJointAtTag");

AddNumberParam("Max force", "The maximum force the joint can apply.", "Infinity");
AddAnyTypeParam("Tag", "Tag of joint. Can be an index or a string.", "\"\"");
AddAction(38, af_none, "Set max joint force", "Joints", "Set {my} max force to {0} for joint {1}", "Sets the maximum force of a joint.", "setMaxJointForceAtTag");
//TODO?	bias?

AddComboParamOption("Pin Dist");
AddComboParamOption("Slide Min");
AddComboParamOption("Slide Max");
AddComboParamOption("Spring Rest");
AddComboParamOption("Spring Stiff");
AddComboParamOption("Spring Damp");
AddComboParamOption("Rotary Limit Min");
AddComboParamOption("Rotary Limit Max");
AddComboParamOption("Ratchet Angle");
AddComboParamOption("Ratchet Phase");
AddComboParamOption("Ratchet Ratchet");
AddComboParamOption("Gear Phase");
AddComboParamOption("Gear Ratio");
AddComboParamOption("Motor Rate");
AddComboParam("Joint property", "The joint propery needs to match the joints type");
AddNumberParam("Value", "The value to set the property to");
AddAnyTypeParam("Tag", "Tag of joint. Can be an index or a string.", "\"\"");
AddAction(43, af_none, "Set joint properties", "Joints", "{my} Set <b>{0}</b> to {1} for joint {2}", "Modifies properties of a joint.  It will have no effect if the joint isn't of the type indicated.", "setJointProperty");

//
AddComboParamOption("Sleep");
AddComboParamOption("Wake up");
AddComboParam("Sleep/Wake up", "Put object to sleep or not");
AddAction(39, af_none, "Sleep/wake", "Properties", "{0} {my}", "Put {my} object to sleep or wake it up.", "sleepWake");

AddAction(44, af_none, "Ignore collision", "Properties", "{my} Ignore a collision", "{my} Ignores a collision. Should be used only in the 'pre collide' trigger.", "ignoreCollision");

//next 45

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_number, "Get X velocity", "Motion", "velocityX", "Returns the x velocity.");
AddExpression(1, ef_return_number, "Get Y velocity", "Motion", "velocityY", "Returns the y velocity.");
AddExpression(2, ef_return_number, "Get speed", "Motion", "speed", "Returns the speed.");
AddExpression(3, ef_return_number, "Get angle of motion", "Motion", "angleOfMotion", "Returns the angle of motion..");

AddExpression(14, ef_return_number, "Get angular velocity", "Motion", "angVel", "Returns the angular velocity.");
AddExpression(15, ef_return_number, "Get applied torque", "Motion", "torque", "Returns the applied torque.");
AddExpression(16, ef_return_number, "Get applied force x", "Motion", "forceX", "Returns the applied force x.");
AddExpression(17, ef_return_number, "Get applied force y", "Motion", "forceY", "Returns the applied force y.");
//TODO? add mag + ang?
AddExpression(18, ef_return_number, "Get max speed", "Motion limits", "maxSpeed", "Returns the maximum speed.");
AddExpression(19, ef_return_number, "Get max angular speed", "Motion limits", "maxAngSpeed", "Returns the max angular speed.");

AddExpression(4, ef_return_number, "Get collision group", "Properties", "group", "Object's collision group.");
AddExpression(5, ef_return_number, "Get collision layers", "Properties", "layers", "Object's collision layers as number.");
AddExpression(6, ef_return_number, "Get mass", "Properties", "mass", "Returns the mass.");
AddExpression(7, ef_return_number, "Get elasticity", "Properties", "elasticity", "Returns the elasticity.");
AddExpression(8, ef_return_number, "Get friction", "Properties", "friction", "Returns the friction.");
AddExpression(40, ef_return_number, "Get segment radius", "Properties", "segmentRadius", "Returns the radius of the line segment shape.");
AddExpression(41, ef_return_number, "Get shape area", "Properties", "area", "Returns the area of the object.");
AddExpression(42, ef_return_number, "Get x com", "Properties", "CoMx", "Returns the x center of mass.");
AddExpression(43, ef_return_number, "Get y com", "Properties", "CoMy", "Returns the y center of mass.");


AddExpression(20, ef_return_number, "Get moment of inertia", "Properties", "inertia", "Returns the inertia of the object.");
//TODO? surface vel?

AddExpression(9, ef_return_number, "Get iterations", "Global properties", "SpaceIterations", "Returns the number of interations of the simulation.");
AddExpression(10, ef_return_number, "Get damping", "Global properties", "SpaceDamping", "Returns the damping.");
AddExpression(11, ef_return_number, "Get timestep", "Global properties", "SpaceTimestep", "Returns the timestep used. dt or fixed timestep..");
AddExpression(49, ef_return_number, "Get sleep time threshold", "Global properties", "sleepTimeThreshold", "Returns the sleep time threshold.");
AddExpression(50, ef_return_number, "Get idle speed threshold", "Global properties", "idleSpeedThreshold", "Returns the idle speed threshold. Aka max speed to still be considered idle.");

AddExpression(12, ef_return_number, "Get gravity x", "Global properties", "gravityX", "Returns the gravity x.");
AddExpression(13, ef_return_number, "Get gravity y", "Global properties", "gravityY", "Returns the gravity y.");
//Add angle and magnitude?

AddExpression(21, ef_return_number, "Get point x", "Query", "queryX", "Returns the y hit point of a query.");
AddExpression(22, ef_return_number, "Get point y", "Query", "queryY", "Returns the x hit point of a query.");
AddExpression(23, ef_return_number, "Get distance", "Query", "queryDist", "Returns the distance from the start point of a query to the hit point");
AddExpression(24, ef_return_number, "Get t", "Query", "queryT", "Returns 0 to 1 along a segment where a hit occurs.");
AddExpression(25, ef_return_number, "Get point normal x", "Query", "queryNormX", "Returns the the normal x from a raycast");
AddExpression(26, ef_return_number, "Get point normal y", "Query", "queryNormY", "Returns the the normal y from a raycast");
// point x,y
// distance
// gradient? pq
// t sq
// normal sq

// joints
AddExpression(27, ef_return_number, "Get joint count", "Joints", "jointCount", "Returns the number of joints.");

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(28, ef_return_number, "Get max force of joint", "Joints", "jointMaxForce", "Returns the maximum force of a joint.");

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(29, ef_return_number, "Get impulse of joint", "Joints", "jointImpulse", "Returns the impulse applied to a joint.");

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(48, ef_return_number, "Get uid of connected obj", "Joints", "jointOtherUID", "Returns the uid of the other connected object.");
// bias?

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(51, ef_return_string, "Get joint type", "Joints", "jointType", "Returns the type of a joint as a string.");

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(52, ef_return_number, "Get anchor x", "Joints", "jointAnchorX", "Returns the anchor x of this object.");

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(53, ef_return_number, "Get anchor y", "Joints", "jointAnchorY", "Returns the anchor y of this object.");

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(54, ef_return_number, "Get other anchor x", "Joints", "jointOtherAnchorX", "Returns the anchor x of the other object.");

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(55, ef_return_number, "Get other anchor y", "Joints", "jointOtherAnchorY", "Returns the anchor y of the other object.");

AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(56, ef_return_number, "Get pin distance", "Joint properties", "joint_PinDist", "Returns the distance between anchors.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(57, ef_return_number, "Get min slide distance", "Joint properties", "joint_SlideMin", "Returns the minimum distance between anchors.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(58, ef_return_number, "Get max slide distance", "Joint properties", "joint_SlideMax", "Returns the maximum distance between anchors.");
AddAnyTypeParam("Tag", "Tag of joint");
// AddExpression(59, ef_return_number, "Get x of 1st groove point", "Joint properties", "joint_GrooveAX", "Returns ...");
// AddAnyTypeParam("Tag", "Tag of joint");
// AddExpression(60, ef_return_number, "Get y of 1st groove point", "Joint properties", "joint_GrooveAY", "Returns ...");
// AddAnyTypeParam("Tag", "Tag of joint");
// AddExpression(61, ef_return_number, "Get x of 2nd groove point", "Joint properties", "joint_GrooveBX", "Returns ...");
// AddAnyTypeParam("Tag", "Tag of joint");
// AddExpression(62, ef_return_number, "Get y of 2nd groove point", "Joint properties", "joint_GrooveBY", "Returns ...");
// AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(63, ef_return_number, "Get spring rest", "Joint properties", "joint_SpringRest", "Returns the rest length or relative rest angle of a spring.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(64, ef_return_number, "Get spring stiffness", "Joint properties", "joint_SpringStiff", "Returns the spring stiffness.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(65, ef_return_number, "Get spring damping", "Joint properties", "joint_SpringDamp", "Returns the spring damping");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(66, ef_return_number, "Get min rotary limit", "Joint properties", "joint_RotaryLimitMin", "Returns the minimum relative angle.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(67, ef_return_number, "Get max rotary limit", "Joint properties", "joint_RotaryLimitMax", "Returns the maximum relative angle.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(68, ef_return_number, "Get ratchet angle", "Joint properties", "joint_RatchetAngle", "Returns the relative angle.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(69, ef_return_number, "Get ratchet phase", "Joint properties", "joint_RatchetPhase", "Returns the relative phase angle.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(70, ef_return_number, "Get ratchet ratchet", "Joint properties", "joint_RatchetRatchet", "Returns the ratchet angle.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(71, ef_return_number, "Get gear phase", "Joint properties", "joint_GearPhase", "Returns the relative phase angle.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(72, ef_return_number, "Get gear ratio", "Joint properties", "joint_GearRatio", "Returns the gear ratio.");
AddAnyTypeParam("Tag", "Tag of joint");
AddExpression(73, ef_return_number, "Get motor rate", "Joint properties", "joint_MotorRate", "Returns the angular speed of the motor.");



AddExpression(30, ef_return_number, "Get x impulse of collision", "Collision", "CollisionImpactX", "Returns the x impulse of a collsion.");
AddExpression(39, ef_return_number, "Get y impulse of collision", "Collision", "CollisionImpactY", "Returns the y impulse of a collsion.");
AddExpression(31, ef_return_number, "Get energy lost in collision", "Collision", "CollisionKE", "Returns Kinetic energy of a collision.");
AddExpression(32, ef_return_number, "Get uid of other object", "Collision", "CollisionOtherObj", "Returns the uid of the object colliding with.");
AddExpression(33, ef_return_number, "Get number of contact points", "Collision", "ContactCount", "Returns the number of contact points.");

AddAnyTypeParam("index", "index","0");
AddExpression(34, ef_return_number, "Get nth contact point x", "Collision", "ContactPointX", "Returns the x of a contact point.");
AddAnyTypeParam("index", "index","0");
AddExpression(35, ef_return_number, "Get nth contact point y", "Collision", "ContactPointY", "Returns the y of a contact point.");
AddAnyTypeParam("index", "index","0");
AddExpression(36, ef_return_number, "Get nth contact normal x", "Collision", "ContactNormX", "Returns the x normal of a contact point.");
AddAnyTypeParam("index", "index","0");
AddExpression(37, ef_return_number, "Get nth contact normal y", "Collision", "ContactNormY", "Returns the y normal of a contact point.");
AddAnyTypeParam("index", "index","0");
AddExpression(38, ef_return_number, "Get nth contact depth", "Collision", "ContactDepth", "Returns the overlap depth of a contact point.");

AddNumberParam("x", "x","0");
AddNumberParam("y", "y","0");
AddExpression(44, ef_return_number, "World xy to local x position", "Utility", "world2LocalX", "World xy to local x position");
AddNumberParam("x", "x","0");
AddNumberParam("y", "y","0");
AddExpression(45, ef_return_number, "World xy to local y position", "Utility", "world2LocalY", "World xy to local y position");
AddNumberParam("x", "x","0");
AddNumberParam("y", "y","0");
AddExpression(46, ef_return_number, "Local xy to world x position", "Utility", "local2WorldX", "Local xy to world x position");
AddNumberParam("x", "x","0");
AddNumberParam("y", "y","0");
AddExpression(47, ef_return_number, "Local xy to world y position", "Utility", "local2WorldY", "Local xy to world y position");
//next 74

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
	new cr.Property(ept_combo,		"Immovable",		"No",		"Object can move or not", "No|Yes"),
	new cr.Property(ept_combo,		"Collision Shape",	"Box",		"Collision Shape.  Tilemaps only can use None, Box or Polygon.  Circle and Segment are the same as None with tilemaps.", "None|Box|Circle|Polygon|Segment"),
	new cr.Property(ept_integer,	"Collision Group",	"0",		"Objects with the same non-zero group won't collide."),
	new cr.Property(ept_text,		"Collision Layers",	"ffffffff",	"If two object's with this bitwise anded together is nonzero, they can collide.  Only takes hexadecimal numbers."),
	new cr.Property(ept_float,		"Mass",				"1",		"Object's mass"),
	new cr.Property(ept_float,		"Elasticity",		"0",		"Object's elasticity"),
	new cr.Property(ept_float,		"Friction",			"0.8",		"Object's friction"),
	new cr.Property(ept_combo,		"Disabled at start","No",		"Behavior is disabled at start", "No|Yes"),
	new cr.Property(ept_float,		"Segment shape radius",		"0", "Radius of segment shape. Use a negative number to keep the shape inside object."),
	new cr.Property(ept_combo,		"Prevent rotation",		"No",		"Prevent object from rotating on collisions.  Tilemaps use 'yes' no matter what.", "No|Yes")
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
	if (property_name == "Collision Layers")
	{
		var value = parseInt(this.properties["Collision Layers"],16);
		if(isNaN(value))
		{
			value = "ffffffff";
			alert("Warning: bad value passed for Chipmunk layers property. 'ffffffff' used instead");
		}
		this.properties["Collision Layers"] = ("00000000"+value.toString(16)).slice(-8);
	}
	else if (!this.betaFix1 && property_name == "Collision Shape")
	{
		//ROJO: Fix for beta change
		var shape = this.properties["Collision Shape"];
		switch (shape)
		{
			case "circle":
				shape = "Circle";
				break;
			case "polygon":
				shape = "Polygon";
				break;
		}
		this.properties["Collision Shape"] = shape;
		this.betaFix1 = true;
	}
}
