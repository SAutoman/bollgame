// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
cr.behaviors.lgshake = function(runtime)
{
	this.runtime = runtime;
	
	this.shakeMag = 0;
	this.shakeStart = 0;
	this.shakeEnd = 0;
	this.shakeMode = 0;
	this.shakeEnforcePosition = 0;
	this.shakeOriginalX = 0;
	this.shakeOriginalY = 0; 
};

(function ()
{
	var behaviorProto = cr.behaviors.lgshake.prototype;
		
	/////////////////////////////////////
	// Behavior type class
	behaviorProto.Type = function(behavior, objtype)
	{
		this.behavior = behavior;
		this.objtype = objtype;
		this.runtime = behavior.runtime;
	};

	var behtypeProto = behaviorProto.Type.prototype;

	behtypeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Behavior instance class
	behaviorProto.Instance = function(type, inst)
	{
		this.type = type;
		this.behavior = type.behavior;
		this.inst = inst;				// associated object instance to modify
		this.runtime = type.runtime;
	};
	
	var behinstProto = behaviorProto.Instance.prototype;

	behinstProto.onCreate = function()
	{
		this.enabled = (this.properties[0] !== 0);
	};

	behinstProto.saveToJSON = function ()
	{
		return {
			"smg": this.behavior.shakeMag,
			"ss": this.behavior.shakeStart,
			"se": this.behavior.shakeEnd,
			"smd": this.behavior.shakeMode
		};
	};
	
	behinstProto.loadFromJSON = function (o)
	{
		this.behavior.shakeMag = o["smg"];
		this.behavior.shakeStart = o["ss"];
		this.behavior.shakeEnd = o["se"];
		this.behavior.shakeMode = o["smd"];
	};
	
	behinstProto.tick = function ()
	{
		// Do work in tick2 instead, to eliminate one-frame lag if object position changes in events
	};
	
	function getShakeBehavior(inst)
	{
		var i, len, binst;
		for (i = 0, len = inst.behavior_insts.length; i < len; ++i)
		{
			binst = inst.behavior_insts[i];
			
			if (binst.behavior instanceof cr.behaviors.lgshake)
				return binst;
		}
		
		return null;
	};
	
	behinstProto.tick2 = function ()
	{
		if (!this.enabled)
			return;
		
		// Is in a shake?
		var now = this.runtime.kahanTime.sum;
		var offx = 0, offy = 0;
		
		if (now >= this.behavior.shakeStart && now < this.behavior.shakeEnd)
		{
			var mag = this.behavior.shakeMag * Math.min(this.runtime.timescale, 1);
			
			// Mode 0 - reducing magnitude - lerp to zero
			if (this.behavior.shakeMode === 0)
				mag *= 1 - (now - this.behavior.shakeStart) / (this.behavior.shakeEnd - this.behavior.shakeStart);
				
			var a = Math.random() * Math.PI * 2;
			var d = Math.random() * mag;
			offx = Math.cos(a) * d;
			offy = Math.sin(a) * d;
		}
		
		//update only when necessary and one more time to enforce object position
		if (offx != 0 || offy != 0 || (this.behavior.shakeEnforcePosition === 1 && this.behavior.shakeStart > 0)) {
		
			this.inst.x = this.behavior.shakeEnforcePosition ? this.behavior.shakeOriginalX + offx : this.inst.x + offx;
			this.inst.y = this.behavior.shakeEnforcePosition ? this.behavior.shakeOriginalY + offy : this.inst.y + offy;
			this.inst.set_bbox_changed();
			
			//turn off
			if (this.behavior.shakeEnforcePosition === 1 && now > this.behavior.shakeEnd)
				this.behavior.shakeStart = 0;
		}
	};
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.Shake = function (mag, dur, mode, enforcePosition)
	{
		this.behavior.shakeMag = mag;
		this.behavior.shakeStart = this.runtime.kahanTime.sum;
		this.behavior.shakeEnd = this.behavior.shakeStart + dur;
		this.behavior.shakeMode = mode;
		this.behavior.shakeEnforcePosition = enforcePosition;
		this.behavior.shakeOriginalX = this.inst.x;
		this.behavior.shakeOriginalY = this.inst.y;
	};
	
	Acts.prototype.SetEnabled = function (e)
	{
		this.enabled = (e !== 0);
	};
	
	behaviorProto.acts = new Acts();
	
}());