// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.C3ArrayXY = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.C3ArrayXY.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};
	
	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};
	
		
	

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;
	
	// For recycling arrays
	var arrCache = [];
	
	function allocArray()
	{
		if (arrCache.length)
			return arrCache.pop();
		else
			return [];
	};
	
	
	// Compatibility shim
	if (!Array.isArray)
	{
		Array.isArray = function (vArg) {
			return Object.prototype.toString.call(vArg) === "[object Array]";
		};
	}

	function freeArray(a)
	{
		// Try to recycle any other arrays stored in this array
		var i, len;
		for (i = 0, len = a.length; i < len; i++)
		{
			if (Array.isArray(a[i]))
				freeArray(a[i]);
		}
		
		cr.clearArray(a);
		arrCache.push(a);
	};

	instanceProto.onCreate = function()
	{
		this.cx = this.properties[0];
		this.cy = this.properties[1];
		this.cz = this.properties[2];
		
		// Recycle array if possible
		if (!this.recycled)
			this.arr = allocArray();
			
		var a = this.arr;
		
		a.length = this.cx;
		
		var x, y, z;
		for (x = 0; x < this.cx; x++)
		{
			if (!a[x])
				a[x] = allocArray();
			
			a[x].length = this.cy;
			
			for (y = 0; y < this.cy; y++)
			{
				if (!a[x][y])
					a[x][y] = allocArray();
				
				a[x][y].length = this.cz;
				
				for (z = 0; z < this.cz; z++)
					a[x][y][z] = 0;
			}
		}
		
		// Loop indices need to be a stack to support recursive loops
		this.forX = [];
		this.forY = [];
		this.forZ = [];
		this.forDepth = -1;
		
		
		
		
		
		
		
				
		
		
		
		
	};
	
	instanceProto.onDestroy = function ()
	{
		// Recycle as many arrays as possible
		var x;
		for (x = 0; x < this.cx; x++)
			freeArray(this.arr[x]);		// will recurse down and recycle other arrays
		
		cr.clearArray(this.arr);
	};

	
	instanceProto.at = function (x, y, z)
	{
		x = Math.floor(x);
		y = Math.floor(y);
		z = Math.floor(z);
		
		if (isNaN(x) || x < 0 || x > this.cx - 1)
			return 0;
			
		if (isNaN(y) || y < 0 || y > this.cy - 1)
			return 0;
			
		if (isNaN(z) || z < 0 || z > this.cz - 1)
			return 0;
			
		return this.arr[x][y][z];
	};
	
	instanceProto.set = function (x, y, z, val)
	{
		x = Math.floor(x);
		y = Math.floor(y);
		z = Math.floor(z);
		
		if (isNaN(x) || x < 0 || x > this.cx - 1)
			return;
			
		if (isNaN(y) || y < 0 || y > this.cy - 1)
			return;
			
		if (isNaN(z) || z < 0 || z > this.cz - 1)
			return;
			
		this.arr[x][y][z] = val;
	};

	instanceProto.getAsJSON = function ()
	{
		return JSON.stringify({
			"c2array": true,
			"size": [this.cx, this.cy, this.cz],
			"data": this.arr
		});
	};
	
	instanceProto.saveToJSON = function ()
	{
		return {
			"size": [this.cx, this.cy, this.cz],
			"data": this.arr
		};
	};
	
	instanceProto.loadFromJSON = function (o)
	{
		var sz = o["size"];
		this.cx = sz[0];
		this.cy = sz[1];
		this.cz = sz[2];
		
		this.arr = o["data"];
	};
	
	instanceProto.setSize = function (w, h, d)
	{
		if (w < 0) w = 0;
		if (h < 0) h = 0;
		if (d < 0) d = 0;
		
		if (this.cx === w && this.cy === h && this.cz === d)
			return;		// no change
		
		this.cx = w;
		this.cy = h;
		this.cz = d;
		
		var x, y, z;
		var a = this.arr;
		a.length = w;
		
		for (x = 0; x < this.cx; x++)
		{
			if (cr.is_undefined(a[x]))
				a[x] = allocArray();
				
			a[x].length = h;
			
			for (y = 0; y < this.cy; y++)
			{
				if (cr.is_undefined(a[x][y]))
					a[x][y] = allocArray();
					
				a[x][y].length = d;
				
				for (z = 0; z < this.cz; z++)
				{
					if (cr.is_undefined(a[x][y][z]))
						a[x][y][z] = 0;
				}
			}
		}
	};
	
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		propsections.push({
			"title": "Array",
			"properties": [
				{"name": "Width", "value": this.cx},
				{"name": "Height", "value": this.cy},
				{"name": "Depth", "value": this.cz},
				{"name": "Total elements", "value": this.cx * this.cy * this.cz, "readonly": true}
			]
		});
			
		var props = [];
		var x;
		
		// Show one-dimensional as flat list
		if (this.cy === 1 && this.cz === 1)
		{
			for (x = 0; x < this.cx; x++)
			{
				props.push({"name": x.toString(), "value": this.C3ArrayXY[x][0][0]});
			}
		}
		else
		{
			for (x = 0; x < this.cx; x++)
			{
				props.push({"name": x.toString(), "value": this.C3ArrayXY[x].toString(), "readonly": true});
			}
		}
		
		if (props.length)
		{
			propsections.push({
				"title": "Array data",
				"properties": props
			});
		}
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		if (header === "Array")
		{
			if (name === "Width")
				this.setSize(value, this.cy, this.cz);
			else if (name === "Height")
				this.setSize(this.cx, value, this.cz);
			else if (name === "Depth")
				this.setSize(this.cx, this.cy, value);
		}
		else if (header === "Array data")
		{
			// If one-dimensional, write at the index given by the property name
			if (this.cy === 1 && this.cz === 1)
			{
				this.set(parseInt(name, 10), 0, 0, value);
			}
		}
	};
	/**END-PREVIEWONLY**/
	
	instanceProto.getForX = function ()
	{
		if (this.forDepth >= 0 && this.forDepth < this.forX.length)
			return this.forX[this.forDepth];
		else
			return 0;
	};
	
	instanceProto.getForY = function ()
	{
		if (this.forDepth >= 0 && this.forDepth < this.forY.length)
			return this.forY[this.forDepth];
		else
			return 0;
	};
	
	instanceProto.getForZ = function ()
	{
		if (this.forDepth >= 0 && this.forDepth < this.forZ.length)
			return this.forZ[this.forDepth];
		else
			return 0;
	};

	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	
	Cnds.prototype.OnOnline = function()
	{
		return true;
	};
	Cnds.prototype.OnOffline = function()
	{
		return true;
	};
	Cnds.prototype.IsOnlineComInternet = function()
	{
		return navigator ? navigator.onLine : false;
	};
	Cnds.prototype.CheckInIframeAPPSWISE = function ()
	{             
		return false;
	}
	Cnds.prototype.IsInIframeAPPSWISE = function ()
	{            
        return (window.top != window);
	};
	
	

	instanceProto.doForEachTrigger = function (current_event)
	{
		this.runtime.pushCopySol(current_event.solModifiers);
		current_event.retrigger();
		this.runtime.popSol(current_event.solModifiers);
	};
	
	
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.Clear = function ()
	{
		var x, y, z;
		
		for (x = 0; x < this.cx; x++)
			for (y = 0; y < this.cy; y++)
				for (z = 0; z < this.cz; z++)
					this.C3ArrayXY[x][y][z] = 0;
	};
	
	Acts.prototype.SetSize = function (w, h, d)
	{
		this.setSize(w, h, d);
	};
	
	Acts.prototype.SetX = function (x, val)
	{
		this.set(x, 0, 0, val);
	};
	
	Acts.prototype.SetXY = function (x, y, val)
	{
		this.set(x, y, 0, val);
	};
	
	Acts.prototype.Push = function (where, value, axis)
	{
		var x = 0, y = 0, z = 0;
		var a = this.C3ArrayXY;
		
		switch (axis) {
		case 0:	// X axis
		
			if (where === 0)	// back
			{
				x = a.length;
				a.push(allocArray());
			}
			else				// front
			{
				x = 0;
				a.unshift(allocArray());
			}
			
			a[x].length = this.cy;
			
			for ( ; y < this.cy; y++)
			{
				a[x][y] = allocArray();
				a[x][y].length = this.cz;
				
				for (z = 0; z < this.cz; z++)
					a[x][y][z] = value;
			}
			
			this.cx++;
			
			break;
		case 1: // Y axis
			for ( ; x < this.cx; x++)
			{
				if (where === 0)	// back
				{
					y = a[x].length;
					a[x].push(allocArray());
				}
				else				// front
				{
					y = 0;
					a[x].unshift(allocArray());
				}
				
				a[x][y].length = this.cz;
				
				for (z = 0; z < this.cz; z++)
					a[x][y][z] = value;
			}
			
			this.cy++;
			
			break;
		case 2:	// Z axis
			for ( ; x < this.cx; x++)
			{
				for (y = 0; y < this.cy; y++)
				{
					if (where === 0)	// back
					{
						a[x][y].push(value);
					}
					else				// front
					{
						a[x][y].unshift(value);
					}
				}
			}
			
			this.cz++;
			
			break;
		}
	};
	
	
	function compareValues(va, vb)
	{
		// Both numbers: compare as numbers
		if (cr.is_number(va) && cr.is_number(vb))
			return va - vb;
		// Either is a string: compare as strings
		else
		{
			var sa = "" + va;
			var sb = "" + vb;
			
			if (sa < sb)
				return -1;
			else if (sa > sb)
				return 1;
			else
				return 0;
		}
	}
	
	
	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.At = function (ret, x, y_, z_)
	{
		var y = y_ || 0;
		var z = z_ || 0;
		
		ret.set_any(this.at(x, y, z));
	};
	
	Exps.prototype.Width = function (ret)
	{
		ret.set_int(this.cx);
	};
	
	Exps.prototype.Height = function (ret)
	{
		ret.set_int(this.cy);
	};
	
	Exps.prototype.Depth = function (ret)
	{
		ret.set_int(this.cz);
	};
	
	Exps.prototype.CurX = function (ret)
	{
		ret.set_int(this.getForX());
	};
	
	Exps.prototype.CurY = function (ret)
	{
		ret.set_int(this.getForY());
	};
	
	Exps.prototype.CurZ = function (ret)
	{
		ret.set_int(this.getForZ());
	};
	
	Exps.prototype.CurValue = function (ret)
	{
		ret.set_any(this.at(this.getForX(), this.getForY(), this.getForZ()));
	};
	
	Exps.prototype.Front = function (ret)
	{
		ret.set_any(this.at(0, 0, 0));
	};
	
	Exps.prototype.Back = function (ret)
	{
		ret.set_any(this.at(this.cx - 1, 0, 0));
	};
	
	Exps.prototype.IndexOf = function (ret, v)
	{
		for (var i = 0; i < this.cx; i++)
		{
			if (this.C3ArrayXY[i][0][0] === v)
			{
				ret.set_int(i);
				return;
			}
		}
		
		ret.set_int(-1);
	};
	
	Exps.prototype.LastIndexOf = function (ret, v)
	{
		for (var i = this.cx - 1; i >= 0; i--)
		{
			if (this.C3ArrayXY[i][0][0] === v)
			{
				ret.set_int(i);
				return;
			}
		}
		
		ret.set_int(-1);
	};
	
	Exps.prototype.AsJSON = function (ret)
	{
		ret.set_string(this.getAsJSON());
	};
	
	pluginProto.exps = new Exps();

}());