// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
cr.behaviors.runaway = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var behaviorProto = cr.behaviors.runaway.prototype;
		
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
                this.maxdistance = this.properties[1];
		this.runawayspeed = this.properties[0];
                this.runawaydelay = this.properties[2];
                this.runawayenabled = this.properties[3];
                this.runawaybehavior = this.properties[4];
                this.runawaybehaviorlength = 0;
		this.dirdistance = 10000;
                this.runawaydirection = -1;
                this.dtcnt = 0;
                this.delayflag = 0;
                this.destx = 0;
                this.desty = 0;
                this.destenabled = 1;
                this.destflag = 0;
                this.hold = 0;
                this.destattempts = 4;
	};

	behinstProto.tick = function ()
	{
            if ( this.runawayenabled == 0  && this.runtime.timescale > 0 )
            {

            var hold = 0;  
            var dt = this.runtime.getDt(this.inst) * this.runtime.timescale;
            var tmpx = this.inst.x;
            var tmpy = this.inst.y;

            if ( this.delayflag == 0 )
            {

                switch(this.runawaybehavior)
                {
                    case 0:
                        var list = [0,1,2,3,4,5,6,7];
                        this.runawaybehaviorlength = 8;
                        break;
                    case 1:
                        var list = [0,1,2,3];
                        this.runawaybehaviorlength = 4;
                        break;
                    case 2:
                        var list = [3,5,3,7,3];
                        this.runawaybehaviorlength = 5;
                        break;
                    case 3:
                        var list = [2,4,2,6,2];
                        this.runawaybehaviorlength = 5;
                        break;
                    case 4:
                        var list = [1,5,1,6,1];
                        this.runawaybehaviorlength = 5;
                        break;
                    case 5:
                        var list = [0,4,0,7,0];
                        this.runawaybehaviorlength = 5;
                        break;
                    case 6:
                        var list = [3,3,3,3,3];
                        this.runawaybehaviorlength = 5;
                        break;
                    case 7:
                        var list = [2,2,2,2,2];
                        this.runawaybehaviorlength = 5;
                        break;
                    case 8:
                        var list = [1,1,1,1,1];
                        this.runawaybehaviorlength = 5;
                        break;
                    case 9:
                        var list = [0,0,0,0,0];
                        this.runawaybehaviorlength = 5;
                        break;
                    case 10:
                        var list = [1,0,1,0,1,0];
                        this.runawaybehaviorlength = 6;
                        break;
                    case 11:
                        var list = [2,3,2,3,2,3];
                        this.runawaybehaviorlength = 6;
                        break;
                }
            
                this.inst.set_bbox_changed();

                switch(this.runawaydirection)
                {
                    case 0:
                        this.inst.x += this.runawayspeed;
                        break;
                    case 1:
                        this.inst.x -= this.runawayspeed;
                        break;
                    case 2:
                        this.inst.y += this.runawayspeed;
                        break;
                    case 3:
                        this.inst.y -= this.runawayspeed;
                        break;
                    case 4:
                        this.inst.x += this.runawayspeed;
                        this.inst.y += this.runawayspeed;
                        break;
                    case 5:
                        this.inst.x -= this.runawayspeed;
                        this.inst.y -= this.runawayspeed;
                        break;
                    case 6:
                        this.inst.x -= this.runawayspeed;
                        this.inst.y += this.runawayspeed;
                        break;
                    case 7:
                        this.inst.x += this.runawayspeed;
                        this.inst.y -= this.runawayspeed;
                        break;
                }
                
                this.dirdistance += this.runawayspeed;

                var collobj = this.runtime.testOverlapSolid(this.inst);
                
                if ( collobj || this.dirdistance >= this.maxdistance )
                { 
                    if ( collobj )
                    {
                        this.runtime.registerCollision(this.inst, collobj);
                    }
                    if ( this.runawaydelay > 0 )
                    {
                        this.delayflag = 1;
                    }
                    if ( this.destenabled == 0 && this.destflag == 0 )
                    { 
                        this.destflag = 1;
                    }
                    this.dirdistance = 0; 
                    
                    this.inst.x = tmpx;
                    this.inst.y = tmpy;
                    
                    if ( this.runawaybehavior < 2 )
                    {
                        while ( list[(hold = (Math.floor(Math.random()*43541)%this.runawaybehaviorlength))] == this.runawaydirection );
                        this.runawaydirection = list[hold];
                    }
                    else if ( this.runawaybehavior >= 2 && this.runawaybehavior < 6 )
                    {
                        this.runawaydirection = list[Math.floor(Math.random()*43541)%this.runawaybehaviorlength];
                    }
                    else
                    {
                        this.runawaydirection = list[0];
                    } 

                    if ( this.destenabled == 0 && this.destflag > 0 && this.destflag <= this.destattempts )
                    {
                        if ( this.destflag == 1 )
                        {
                            this.hold = this.runawaybehavior;
                        }
                        if ( Math.abs(this.inst.x-this.destx) > Math.abs(this.inst.y-this.desty) )
                        {
                            if ( this.inst.x > this.destx )
                            {
                                this.runawaybehavior = 4;
                            }
                            else
                            {
                                this.runawaybehavior = 5;
                            }
                        }
                        else
                        {
                            if ( this.inst.y > this.desty )
                            {
                                this.runawaybehavior = 2;
                            }
                            else
                            {
                                this.runawaybehavior = 3;
                            }
                        } 
                        if ( this.destflag == this.destattempts )
                        {
                            this.runawaybehavior = this.hold;
                            this.destflag = 0;
                        }
                        else
                        {
                            this.destflag++;
                        }
                    }
  
                }
            }
            else
            {
                this.dtcnt += dt;
                if ( this.dtcnt >= this.runawaydelay )
                {
                    this.dtcnt = 0;
                    this.delayflag = 0;
                }
            }

            }
	};

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.IsMoving = function ()
	{
		// ... see other behaviors for example implementations ...
		return false;
	};
	
	// ... other conditions here ...
	
	behaviorProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.SetRunawaySpeed = function (s)
	{
		this.runawayspeed = s;
	};
	
	Acts.prototype.SetMaxDistance = function (a)
	{
		this.maxdistance = a;
	};

        Acts.prototype.SetRunawayDelay = function (a)
	{
		this.runawaydelay = a;
	};

        Acts.prototype.SetRunawayToggle = function (a)
	{
		this.runawayenabled = a;
	};

        Acts.prototype.SetRunawayBehavior = function (a)
	{
		this.runawaybehavior = a;
	};

        Acts.prototype.SetRunawayDestination = function (a,b)
	{
		this.destx = a;
                this.desty = b;
	};

        Acts.prototype.SetDestinationToggle = function (a)
	{
		this.destenabled = a;
	};  
 
        Acts.prototype.SetDestinationAttempts = function (a)
	{
		this.destattempts = a;
	};      

        behaviorProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.RunawaySpeed = function (ret)
	{
                ret.set_float(this.runawayspeed);
        };
	
	Exps.prototype.MaxDistance = function (ret)
	{
                ret.set_float(this.maxdistance);
	};

        Exps.prototype.RunawayDelay = function (ret)
	{
                ret.set_float(this.runawaydelay);
	};

        Exps.prototype.RunawayToggle = function (ret)
	{
                ret.set_int(this.runawayenabled);
	};

        Exps.prototype.RunawayBehavior = function (ret)
	{
                ret.set_int(this.runawaybehavior);
	};

        behaviorProto.exps = new Exps();
	
}());