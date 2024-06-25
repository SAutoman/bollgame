// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
//           vvvvvvvvvv
cr.behaviors.rojoIsoSort = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
	//                               vvvvvvvvvv
	var behaviorProto = cr.behaviors.rojoIsoSort.prototype;
		
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
		if(!this.behavior.state)
		{
			this.behavior.state={
				objList:[],
				enabled:true,
				sortOnce:false
			};
		}
		this.state = this.behavior.state;
		this.isoList = this.state.objList;
		
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
		// Load properties
		this.ix = this.properties[0];
		this.iy = this.properties[1];
		this.iz = this.properties[2];
		this.sx = this.properties[3];
		this.sy = this.properties[4];
		this.sz = this.properties[5];
		if (this.properties[6]) // calculate ix and iy from x,y and iz
			this.isoFromXY();
		else
			this.updatePosFromIso();
		// object is sealed after this call, so make sure any properties you'll ever need are created, e.g.
		
		this.type.isoList.push(this);
		
		this.visited=false;
		this.behind=[];
		this.isIsoRojo=true; // identifier
	};
	
	behinstProto.onDestroy = function ()
	{
		// called when associated object is being destroyed
		// note runtime may keep the object and behavior alive after this call for recycling;
		// release, recycle or reset any references here as necessary
		
		cr.arrayFindRemove(this.type.isoList, this);
	};
	
	// called when saving the full state of the game
	behinstProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your behavior's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	behinstProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	behinstProto.overlapCheck = function (other, offsetx, offsety, offsetz)
	{
		if ( this!=other && Math.abs(this.ix+offsetx-other.ix)<(this.sx+other.sx)/2
							 && Math.abs(this.iy+offsety-other.iy)<(this.sy+other.sy)/2
							 && Math.abs(this.iz+offsetz-other.iz)<(this.sz+other.sz)/2)
			return true;
		else
			return false;
	};
	
	behinstProto.pushOut = function (other)
	{
		if(other == this)
			return;
			
		var dx,dy,dz;
		// check for overlap and displacement amount on each iso axis.
		if (this.ix > other.ix){	// x
			dx = (other.ix+other.sx/2)-(this.ix-this.sx/2); //other.max-this.min
			if (dx < 0)	return;
		}else{
			dx = (other.ix-other.sx/2)-(this.ix+this.sx/2); //other.min-this.max
			if (dx > 0)	return;
		}
		if (this.iy > other.iy){	// y
			dy = (other.iy+other.sy/2)-(this.iy-this.sy/2); //other.max-this.min
			if (dy < 0)	return;
		}else{
			dy = (other.iy-other.sy/2)-(this.iy+this.sy/2); //other.min-this.max
			if (dy > 0)	return;
		}
		if (this.iz > other.iz){	// z
			dz = (other.iz+other.sz/2)-(this.iz-this.sz/2); //other.max-this.min
			if (dz < 0)	return;
		}else{
			dz = (other.iz-other.sz/2)-(this.iz+this.sz/2); //other.min-this.max
			if (dz > 0)	return;
		}
		
		//use the minimum displacement to resolve the overlap
		if (Math.abs(dx) <= Math.abs(dy) && Math.abs(dx) <= Math.abs(dz))
			this.ix += dx;
		else if (Math.abs(dy) <= Math.abs(dx) && Math.abs(dy) <= Math.abs(dz))
			this.iy += dy;
		else if (Math.abs(dz) <= Math.abs(dx) && Math.abs(dz) <= Math.abs(dy))
			this.iz += dz;
		this.updatePosFromIso();
	};
	
	behinstProto.isoFromXY = function ()
	{
		this.ix = (this.inst.y-240) + (this.inst.x-320)/2 + this.iz;
		this.iy = (this.inst.y-240) - (this.inst.x-320)/2 + this.iz;
	};
	
	behinstProto.updatePosFromIso = function ()
	{
		this.inst.x = 320 + this.ix - this.iy;
		this.inst.y = 240 + (this.ix + this.iy)/2 - this.iz;
		this.inst.set_bbox_changed();
		//this.inst.update_bbox();
	};
	
	behinstProto.tick = function ()
	{
		//alert(window.rojoList.length);
		var isoList = this.type.isoList; //alert(isoList.length);
		if (this === isoList[0] && (this.type.state.enabled || this.type.state.sortOnce))  // only run once
		{
			this.type.state.sortOnce = false;
			var isoA, isoB, a, b;
			
			// updade positions from isometric positions
			for (a=0; a<isoList.length; a++)
			{
				isoA = isoList[a];
				//isoA.updatePosFromIso();
				isoA.inst.update_bbox();
				isoA.visited=false;
			}
			
			// build dependency graph
			for (a=0; a<isoList.length; a++)
			{
				isoA = isoList[a];
				
				// culling
				if (!isoA.visited && !isoA.inst.visible && !this.IsInstOnScreen(isoA.inst))
				{
					isoA.visited=true;
					continue;
				}
				
				for (b=0; b<isoList.length; b++)
				{
					isoB = isoList[b];
					
					// culling
					if (!isoB.visited && !isoB.inst.visible && !this.IsInstOnScreen(isoB.inst))
					{
						isoB.visited=true;
						continue;
					}
						
					if ( isoA != isoB 
						&& isoA.inst.bbox.intersects_rect(isoB.inst.bbox)  //bounding box check
						&& isoA.ix-isoA.sx/2 < isoB.ix+isoB.sx/2 -0.001
						&& isoA.iy-isoA.sy/2 < isoB.iy+isoB.sy/2 -0.001
						&& isoA.iz-isoA.sz/2 < isoB.iz+isoB.sz/2 -0.001)
							isoA.behind.push(isoB);
				}
			}
			
			// topo sort
			for (a=0; a<isoList.length; a++)
				isoList[a].visitNode();
		}
	};
	
	behinstProto.visitNode = function ()
	{
		if(!this.visited)
		{
			this.visited = true;
			for (var i=0; i<this.behind.length; i++)
				this.behind[i].visitNode();
			this.behind.length=0;
			this.MoveInstToBottom(this.inst);
		}
	};
	
	behinstProto.IsInstOnScreen = function (inst) //
	{
		var layer = inst.layer;				
		inst.update_bbox();
		var bbox = inst.bbox;

		return !(bbox.right < layer.viewLeft || bbox.bottom < layer.viewTop || bbox.left > layer.viewRight || bbox.top > layer.viewBottom);
	};
	
	behinstProto.MoveInstToBottom = function (inst) //almost a copy of MoveToBottom from commonaces.js
	{
		var zindex = inst.get_zindex();
	
		// is already at bottom: don't do anything
		if (zindex === 0)
			return;
			
		// remove and re-insert at bottom
		cr.arrayRemove(inst.layer.instances, zindex);
		inst.layer.instances.unshift(inst);
		inst.runtime.redraw = true;
		
		// all objects on this layer need their z index updating - lazy assign
		inst.layer.zindices_stale = true;
	};
	
	behinstProto.getIsoBehaviorIndex = function(inst)
	{
		//alert(inst.behavior_insts.length);
		for (var i=0; i<inst.behavior_insts.length; i++)
		{
			if( inst.behavior_insts[i].isIsoRojo)
				return i;
		}
		assert2(false, "Isometric Behavior Error!  An object type was used as a parameter that doesn't have the iso behavior.") 
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	behinstProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": this.type.name,
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				//{"name": "My property", "value": this.myProperty}
			]
		});
	};
	
	behinstProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			;//this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.IsOverlapIso = function (offsetx, offsety, offsetz)
	{
		var isoList = this.type.isoList;
		var other;
		for (var i=0; i<isoList.length; i++)
		{
			other = isoList[i];
			if ( this.overlapCheck(other, offsetx, offsety, offsetz))
				return true;
		}
		return false;
	};
	
	Cnds.prototype.OverlapIsoObj = function (objType, offsetx, offsety, offsetz)
	{
		var isoList = objType.getCurrentSol().getObjects();
		var other;
		var isoIndex = this.getIsoBehaviorIndex(isoList[0]);
		for (var i=0; i<isoList.length; i++)
		{
			other = isoList[i].behavior_insts[isoIndex];
			if ( this.overlapCheck(other, offsetx, offsety, offsetz))
				return true;
		}
		return false;
	};
	
/*	Cnds.prototype.IsoOverlapPlane = function (plane) //xy, xz, yz
	{
		var isoList = this.type.isoSet.valuesRef();
		var other;
		for (var i=0; i<isoList.length; i++)
		{
			other = isoList[i];
			if ( this!=other && (plane==2 || Math.abs(this.ix-other.ix)<(this.sx+other.sx)/2)
							 && (plane==1 || Math.abs(this.iy-other.iy)<(this.sy+other.sy)/2)
							 && (plane==0 || Math.abs(this.iz-other.iz)<(this.sz+other.sz)/2))
				return true;
		}
		return false;
	};*/
	
	Cnds.prototype.compareIsoX = function (cmp, value)
	{
		return cr.do_cmp(this.ix, cmp, value);
	};
	
	Cnds.prototype.compareIsoY = function (cmp, value)
	{
		return cr.do_cmp(this.iy, cmp, value);
	};
	
	Cnds.prototype.compareIsoZ = function (cmp, value)
	{
		return cr.do_cmp(this.iz, cmp, value);
	};
	
	// ... other conditions here ...
	
	behaviorProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	//Acts.prototype.sort = function ()// not used
	//{
	//	//alert(this.inst.x);
	//	// ... see other behaviors for example implementations ...
	//};
	Acts.prototype.isoMoveOffset = function (dx, dy, dz)
	{
		this.ix += dx;
		this.iy += dy;
		this.iz += dz;
		this.updatePosFromIso();
	};
	
	Acts.prototype.setIsoPos = function (ix, iy, iz)
	{
		this.ix = ix;
		this.iy = iy;
		this.iz = iz;
		this.updatePosFromIso();
	};
	
	Acts.prototype.setIsoX = function (ix)
	{
		this.ix = ix;
		this.updatePosFromIso();
	};
	Acts.prototype.setIsoY = function (iy)
	{
		this.iy = iy;
		this.updatePosFromIso();
	};
	Acts.prototype.setIsoZ = function (iz)
	{
		this.iz = iz;
		this.updatePosFromIso();
	};
	
	Acts.prototype.setIsoSizeX = function (sx)
	{
		this.sx = sx;
	};
	Acts.prototype.setIsoSizeY = function (sy)
	{
		this.sy = sy;
	};
	Acts.prototype.setIsoSizeZ = function (sz)
	{
		this.sz = sz;
	};
	
	Acts.prototype.isoPushOut = function ()
	{
		var isoList = this.type.isoList;
		var other, dx,dy,dz;
		for (var i=0; i<isoList.length; i++)
		{
			other = isoList[i];
			this.pushOut(other);
		}
	};
	
	Acts.prototype.positionShadowObj = function (obj)
	{
		var shadowInst = obj.getPairedInstance(this.inst);

		if (!shadowInst)
			return;
		
		var isoList = this.type.isoList;
		var other, minZ, minInst, curZ;
		for (var i=0; i<isoList.length; i++)
		{
			other = isoList[i];
			curZ = other.iz+other.sz/2;
			if(	other!=this
				 && this.iz > curZ
				 && Math.abs(this.ix-other.ix) < (this.sx+other.sx)/2
				 && Math.abs(this.iy-other.iy) < (this.sy+other.sy)/2)
				if(!minInst || curZ>minZ)
				{
					minInst = other;
					minZ = curZ;
				}
		}
		
		if(minInst)
		{
			shadowInst.x = this.inst.x;
			shadowInst.y= this.inst.y + this.iz - minZ;
			shadowInst.set_bbox_changed();
			
			// move shadowInst to be infront of minInst
			// First move shadowInst to same layer as minInst object if different
			if (shadowInst.layer.index !== minInst.inst.layer.index)
			{
				cr.arrayRemove(shadowInst.layer.instances, shadowInst.get_zindex());
				shadowInst.layer.zindices_stale = true;
				
				shadowInst.layer = minInst.inst.layer;
				shadowInst.zindex = minInst.inst.layer.instances.length;
				minInst.inst.layer.instances.push(shadowInst);
			}
			
			// Now both objects are definitely on the same layer: move in the Z order.
			var myZ = shadowInst.get_zindex();
			var insertZ = minInst.inst.get_zindex();
			
			cr.arrayRemove(shadowInst.layer.instances, myZ);
			
			// if myZ is lower than insertZ, insertZ will have shifted down one index
			if (myZ < insertZ)
				insertZ--;
				
			// if inserting after object, increment the insert index
			insertZ++;
				
			// insertZ may now be pointing at the end of the array. If so, push instead of splice
			if (insertZ === shadowInst.layer.instances.length)
				shadowInst.layer.instances.push(shadowInst);
			else
				shadowInst.layer.instances.splice(insertZ, 0, shadowInst);
				
			shadowInst.layer.zindices_stale = true;
			
			shadowInst.runtime.redraw = true;
		}
	};
	
	Acts.prototype.enableDisSort = function (onOff)
	{
		this.type.state.enabled = !onOff;
	};
	
	Acts.prototype.triggerSort = function ()
	{
		this.type.state.sortOnce = true;
	};
	
	Acts.prototype.isoPushOutObj = function (objType)
	{
		var isoList = objType.getCurrentSol().getObjects();
		var other;
		var isoIndex = this.getIsoBehaviorIndex(isoList[0]);
		for (var i=0; i<isoList.length; i++)
		{
			other = isoList[i].behavior_insts[isoIndex];
			this.pushOut(other);
		}
	};
	
	Acts.prototype.updateIsoFromXY = function ()
	{
		this.isoFromXY();
	};
	
	behaviorProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.isoX = function (ret)
	{
		ret.set_float(this.ix);
	};
	Exps.prototype.isoY = function (ret)
	{
		ret.set_float(this.iy);
	};
	Exps.prototype.isoZ = function (ret)
	{
		ret.set_float(this.iz);
	};
	
	Exps.prototype.isoSizeX = function (ret)
	{
		ret.set_float(this.sx);
	};
	Exps.prototype.isoSizeY = function (ret)
	{
		ret.set_float(this.sy);
	};
	Exps.prototype.isoSizeZ = function (ret)
	{
		ret.set_float(this.sz);
	};
	
	//this.ix = (this.inst.y-240) + (this.inst.x-320)/2 + this.iz;
	//this.iy = (this.inst.y-240) - (this.inst.x-320)/2 + this.iz;
	//isoA.inst.x = 320 + isoA.ix - isoA.iy;
	//isoA.inst.y = 240 + (isoA.ix + isoA.iy)/2 - isoA.iz;
	Exps.prototype.isoPos2LayoutX = function (ret, ix,iy,iz)
	{		
		ret.set_float(320+ix-iy);
	};
	
	Exps.prototype.isoPos2LayoutY = function (ret, ix,iy,iz)
	{		
		ret.set_float(240+(ix+iy)/2-iz);
	};
	
	//Exps.prototype.xy2isoX = function (ret, ix,iy,iz)
	//{		
	//	ret.set_float(240+(ix+iy)/2-iz);
	//};
	
	Exps.prototype.isoBoxMinX = function (ret)
	{
		ret.set_float(this.ix-this.sx/2);
	};
	Exps.prototype.isoBoxMaxX = function (ret)
	{
		ret.set_float(this.ix+this.sx/2);
	};
	Exps.prototype.isoBoxMinY = function (ret)
	{
		ret.set_float(this.iy-this.sy/2);
	};
	Exps.prototype.isoBoxMaxY = function (ret)
	{
		ret.set_float(this.iy+this.sy/2);
	};
	Exps.prototype.isoBoxMinZ = function (ret)
	{
		ret.set_float(this.iz-this.sz/2);
	};
	Exps.prototype.isoBoxMaxZ = function (ret)
	{
		ret.set_float(this.iz+this.sz/2);
	};
	
	behaviorProto.exps = new Exps();
	
}());