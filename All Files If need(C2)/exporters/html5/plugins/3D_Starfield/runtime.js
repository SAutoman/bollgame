// ECMAScript 5 strict mode
"use strict";



assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");


// global var please !!!	

 
var mystarfield;
var st_speed=0;
var st_col;
var st_numbers;
var c_xpos;
var c_ypos;

/////////////////////////////////////
// Plugin class
cr.plugins_.c23dstarfield = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.c23dstarfield.prototype;
		
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
		// Create the texture
		 this.texture_img = new Image();
		 this.texture_img.src = this.texture_file;
		 this.texture_img.cr_filesize = this.texture_filesize;
		
		// Tell runtime to wait for this to load
		this.runtime.wait_for_textures.push(this.texture_img);
		
		//this.pattern = null;
		//this.webGL_texture = null;
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	var fxNames = [ "lighter",
					"xor",
					"copy",
					"destination-over",
					"source-in",
					"destination-in",
					"source-out",
					"destination-out",
					"source-atop",
					"destination-atop"];

	instanceProto.effectToCompositeOp = function(effect)
	{
		// (none) = source-over
		if (effect <= 0 || effect >= 11)
			return "source-over";
			
		// (none)|Additive|XOR|Copy|Destination over|Source in|Destination in|Source out|Destination out|Source atop|Destination atop
		return fxNames[effect - 1];	// not including "none" so offset by 1
	};
	
	instanceProto.updateBlend = function(effect)
	{
		var gl = this.runtime.gl;
		
		if (!gl)
			return;
			
		// default alpha blend
		this.srcBlend = gl.ONE;
		this.destBlend = gl.ONE_MINUS_SRC_ALPHA;
		
		switch (effect) {
		case 1:		// lighter (additive)
			this.srcBlend = gl.ONE;
			this.destBlend = gl.ONE;
			break;
		case 2:		// xor
			break;	// todo
		case 3:		// copy
			this.srcBlend = gl.ONE;
			this.destBlend = gl.ZERO;
			break;
		case 4:		// destination-over
			this.srcBlend = gl.ONE_MINUS_DST_ALPHA;
			this.destBlend = gl.ONE;
			break;
		case 5:		// source-in
			this.srcBlend = gl.DST_ALPHA;
			this.destBlend = gl.ZERO;
			break;
		case 6:		// destination-in
			this.srcBlend = gl.ZERO;
			this.destBlend = gl.SRC_ALPHA;
			break;
		case 7:		// source-out
			this.srcBlend = gl.ONE_MINUS_DST_ALPHA;
			this.destBlend = gl.ZERO;
			break;
		case 8:		// destination-out
			this.srcBlend = gl.ZERO;
			this.destBlend = gl.ONE_MINUS_SRC_ALPHA;
			break;
		case 9:		// source-atop
			this.srcBlend = gl.DST_ALPHA;
			this.destBlend = gl.ONE_MINUS_SRC_ALPHA;
			break;
		case 10:	// destination-atop
			this.srcBlend = gl.ONE_MINUS_DST_ALPHA;
			this.destBlend = gl.SRC_ALPHA;
			break;
		}	
	};

	instanceProto.onCreate = function()
	{
		this.visible = (this.properties[1] === 0);							// 0=visible, 1=invisible
		this.compositeOp = this.effectToCompositeOp(this.properties[0]);
		this.updateBlend(this.properties[0]);
		this.canvas = document.createElement('canvas');
		this.canvas.width=this.width;
		this.canvas.height=this.height;
		this.ctx = this.canvas.getContext('2d');
		//this.ctx.drawImage(this.type.texture_img,0,0,this.width,this.height);
	
	 

		var w =this.canvas.width;
		var h=this.canvas.height;
		var ctx=this.ctx;
		this.dest=this.canvas; 
		st_col=(this.properties[6]);
		st_speed=(this.properties[3]);
		st_numbers=this.properties[2];
		c_xpos=(this.properties[4]);
		c_ypos=(this.properties[5]);
		mystarfield=new starfield3D(this.canvas,st_numbers, st_speed, w,h,w/2,h/2-c_ypos,st_col, 100,0,0);
					
	   this.runtime.tickMe(this);
			
		
	};

	instanceProto.tick = function ()
		{
			var dt = this.runtime.getDt(this);
			var ctx=this.ctx;
			var w =this.canvas.width;
			var h=this.canvas.height;
			var dest=this.canvas;
			 
			function draw(){
				
				
			var tmp=ctx.strokeStyle;
			var tmp2 = ctx.globalAlpha;
			var tmp3 = ctx.lineWidth;
			remplie('AAA000');
			ctx.globalAlpha=1;
			ctx.strokeStyle=mystarfield.color;
		
		//	var slen=mystarfield.n;
			
			//for(var i=0; i<mystarfield.n; i++){
		    
		    for(var i=0,slen=mystarfield.n; i<slen; i++){  // 4 fps gained !
			mystarfield.test=true;
			mystarfield.star_x_save=mystarfield.star[i][3];
			mystarfield.star_y_save=mystarfield.star[i][4];
			mystarfield.star[i][0]+=(mystarfield.centx-mystarfield.x-c_xpos)>>4; if(mystarfield.star[i][0]>mystarfield.x<<1) { mystarfield.star[i][0]-=mystarfield.w<<1; mystarfield.test=false; } if(mystarfield.star[i][0]<-mystarfield.x<<1) { mystarfield.star[i][0]+=mystarfield.w<<1; mystarfield.test=false; }
			mystarfield.star[i][1]+=(mystarfield.centy-mystarfield.y-c_ypos)>>4; if(mystarfield.star[i][1]>mystarfield.y<<1) { mystarfield.star[i][1]-=mystarfield.h<<1; mystarfield.test=false; } if(mystarfield.star[i][1]<-mystarfield.y<<1) { mystarfield.star[i][1]+=mystarfield.h<<1; mystarfield.test=false; }
			mystarfield.star[i][2]-=mystarfield.star_speed*st_speed; if(mystarfield.star[i][2]>mystarfield.z) { mystarfield.star[i][2]-=mystarfield.z; mystarfield.test=false; } if(mystarfield.star[i][2]<0) { mystarfield.star[i][2]+=mystarfield.z; mystarfield.test=false; }
			mystarfield.star[i][3]=mystarfield.x+(mystarfield.star[i][0]/mystarfield.star[i][2])*mystarfield.star_ratio;
			mystarfield.star[i][4]=mystarfield.y+(mystarfield.star[i][1]/mystarfield.star[i][2])*mystarfield.star_ratio;			
			
			if(mystarfield.star_x_save>0&&mystarfield.star_x_save<mystarfield.w&&mystarfield.star_y_save>0&&mystarfield.star_y_save<mystarfield.h&&mystarfield.test){
				ctx.lineWidth=(1-mystarfield.star_color_ratio*mystarfield.star[i][2])*2;
				ctx.beginPath();
				ctx.moveTo(mystarfield.star_x_save+mystarfield.offsetx,mystarfield.star_y_save+mystarfield.offsety);
				ctx.lineTo(mystarfield.star[i][3]+mystarfield.offsetx,mystarfield.star[i][4]+mystarfield.offsety);
				ctx.stroke();
				ctx.closePath();
			}
			 
			}
			
		ctx.strokeStyle=tmp;
		ctx.globalAlpha=tmp2;
		ctx.lineWidth=tmp3;
			
		} 
		
		
			 
			function remplie(color)
		{
			var tmp = ctx.fillStyle;
			var tmp2=ctx.globalAlpha;
			ctx.globalAlpha=1.0;
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, w,h);
			ctx.fillStyle = tmp
			ctx.globalAlpha=tmp2;
			
			
			// var my_gradient = ctx.createLinearGradient(0, 0, 0, h);
            // my_gradient.addColorStop(0, '#000000');
            // my_gradient.addColorStop(.5, '#FF0000');
            // my_gradient.addColorStop(1., '#000000');
 
			// ctx.fillStyle = my_gradient;
			// ctx.fillRect(0, 0, w, h);
			
		}	
	


	
			draw(); 
			
			 this.runtime.redraw = true;
			 this.update_tex = true;
		};  

  
    // called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
    
    // called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
            "canvas_w":this.canvas.width,
            "canvas_h":this.canvas.height,
            "image":this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
        var canvasWidth = this.canvas.width = o["canvas_w"];
        var canvasHeight = this.canvas.height = o["canvas_h"];
        var data = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data;
        for (var y = 0; y < canvasHeight; ++y) {
            for (var x = 0; x < canvasWidth; ++x) {
                var index = (y * canvasWidth + x)*4;
                for (var c = 0; c < 4; ++c)
                data[index+c] = o["image"][index+c];
            }
        }
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	//helper function
	instanceProto.draw_instances = function (instances, ctx)
    {
        for(var x in instances)
        {
            if(instances[x].visible==false && this.runtime.testOverlap(this, instances[x])== false)
                continue;
            
            ctx.save();
            ctx.scale(this.canvas.width/this.width, this.canvas.height/this.height);
            ctx.rotate(-this.angle);
            ctx.translate(-this.bquad.tlx, -this.bquad.tly);
            ctx.globalCompositeOperation = instances[x].compositeOp;//rojo

            if (instances[x].type.pattern !== undefined && instances[x].type.texture_img !== undefined) {
                instances[x].pattern = ctx.createPattern(instances[x].type.texture_img, "repeat");                
            }

            instances[x].draw(ctx);
            ctx.restore();
        }
    };
	
	instanceProto.draw = function(ctx)
	{	
		ctx.save();
		
		ctx.globalAlpha = this.opacity;
		ctx.globalCompositeOperation = this.compositeOp;
		
		var myx = this.x;
		var myy = this.y;
		
		if (this.runtime.pixel_rounding)
		{
			myx = Math.round(myx);
			myy = Math.round(myy);
		}
		
		ctx.translate(myx, myy);
		ctx.rotate(this.angle);
				
		ctx.drawImage(this.canvas,
						  0 - (this.hotspotX * this.width),
						  0 - (this.hotspotY * this.height),
						  this.width,
						  this.height);
		
		ctx.restore();
	};

	instanceProto.drawGL = function(glw)
	{
		glw.setBlend(this.srcBlend, this.destBlend);
        if (this.update_tex)
        {
            if (this.tex)
                glw.deleteTexture(this.tex);
            this.tex=glw.loadTexture(this.canvas, false, this.runtime.linearSampling);
            this.update_tex = false;
        }
		glw.setTexture(this.tex);
		glw.setOpacity(this.opacity);

		var q = this.bquad;
		
		if (this.runtime.pixel_rounding)
		{
			var ox = Math.round(this.x) - this.x;
			var oy = Math.round(this.y) - this.y;
			
			glw.quad(q.tlx + ox, q.tly + oy, q.trx + ox, q.try_ + oy, q.brx + ox, q.bry + oy, q.blx + ox, q.bly + oy);
		}
		else
			glw.quad(q.tlx, q.tly, q.trx, q.try_, q.brx, q.bry, q.blx, q.bly);
	};




	//////////////////////////////////////
	// Conditions
	pluginProto.cnds = {};
	var cnds = pluginProto.cnds;
	
	//////////////////////////////////////
	// Actions
	pluginProto.acts = {};
	var acts = pluginProto.acts;

	acts.SetEffect = function (effect)
	{	
		this.compositeOp = this.effectToCompositeOp(effect);
		this.runtime.redraw = true;
        this.update_tex = true;
	};
		
	acts.SetSpeed = function (spd)
	{
	st_speed=spd;
		
	};
	
	acts.Xcenter = function (xct)
	{
	c_xpos=xct;
		
	};
	
	acts.Ycenter = function (yct)
	{
	c_ypos=yct;
		
	};
	
	
	
	
	//////////////////////////////////////
	// Expressions
	pluginProto.exps = {};
	var exps = pluginProto.exps;
	
	
    
    exps.AsJSON = function(ret)
    {
        ret.set_string( JSON.stringify({
			"c2array": true,
			"size": [1, 1, this.canvas.width * this.canvas.height * 4],
			"data": [[this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data]]
		}));
    };

}());
function starfield3D(dest, nb, speed, w, h, centx, centy, color, ratio, offsetx, offsety){
	this.dest=dest;
	this.test=true;
	this.n=nb;
	this.star=new Array(this.n);
	this.w=w;
	this.h=h;
	this.x=0;
	this.y=0;
	this.z=0;
	this.offsetx=0;
	this.offsety=0;
	if(offsetx) this.offsetx=offsetx;
	if(offsety) this.offsety=offsety;
	this.centx=centx;
	this.centy=centy;
	this.color=color;
	this.star_x_save,this.star_y_save;
	this.star_speed=speed;
	this.star_ratio=ratio;
	this.star_color_ratio=0;
	this.x=Math.round(this.w/2);
	this.y=Math.round(this.h/2);
	this.z=(this.w+this.h)/2;
	this.star_color_ratio=1/this.z;
	this.cursor_x=this.x;
	this.cursor_y=this.y;

	for(var i=0;i<this.n;i++){
		this.star[i]=new Array(5);
		this.star[i][0]=Math.random()*this.w*2-this.x*2;
		this.star[i][1]=Math.random()*this.h*2-this.y*2;
		this.star[i][2]=Math.round(Math.random()*this.z);
		this.star[i][3]=0;
		this.star[i][4]=0;
	}

		
	return this;

}
