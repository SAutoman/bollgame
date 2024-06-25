
// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

// global var please !!!	
var lapcounter=0;
var x_speed=0;
var y_speed=0;

var t_speed=0;

var score=0;
var out_run_state=false;
var now,last,dt,gdt,oldsegment,index;
// road draw vars 
var start_seg,bseg1,bseg2,bseg3,bseg4,bseg5,bseg6,bseg7,bseg8,bseg9,bseg10,end_seg;
// seg_stracker 
var start_seglen,bseg1len,bseg2len,bseg3len,bseg4len,bseg5len,bseg6len,bseg7len,bseg8len,bseg9len,bseg10len,end_seglen=0;
// sprites for left/right side of general segment;
var start_seg_side,start_seg_bb,start_seg_plts,start_seg_misc;
var bseg1_side,bseg1_bb,bseg1_plts,bseg1_misc;
var bseg2_side,bseg2_bb,bseg2_plts,bseg2_misc;

var bseg3_side,bseg3_bb,bseg3_plts,bseg3_misc;
var bseg4_side,bseg4_bb,bseg4_plts,bseg4_misc;
var bseg5_side,bseg5_bb,bseg5_plts,bseg5_misc;
var bseg6_side,bseg6_bb,bseg6_plts,bseg6_misc;
var bseg7_side,bseg7_bb,bseg7_plts,bseg7_misc;
var bseg8_side,bseg8_bb,bseg8_plts,bseg8_misc;
var bseg9_side,bseg9_bb,bseg9_plts,bseg9_misc;

var bseg10_side,bseg10_bb,bseg10_plts,bseg10_misc;

var end_seg_side,end_seg_bb,end_seg_plts,end_seg_misc;

if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
                                 window.mozRequestAnimationFrame    || 
                                 window.oRequestAnimationFrame      || 
                                 window.msRequestAnimationFrame     || 
                                 function(callback, element) {
                                   window.setTimeout(callback, 1000 / 60);
                                 }
}
//=========================================================================
// general purpose helpers (mostly math)
//=========================================================================
var Dom = {

  get:  function(id)                     { return ((id instanceof HTMLElement) || (id === document)) ? id : document.getElementById(id); },
  set:  function(id, html)               { Dom.get(id).innerHTML = html;                        },
  on:   function(ele, type, fn, capture) { Dom.get(ele).addEventListener(type, fn, capture);    },
  un:   function(ele, type, fn, capture) { Dom.get(ele).removeEventListener(type, fn, capture); },
  show: function(ele, type)              { Dom.get(ele).style.display = (type || 'block');      },
  blur: function(ev)                     { ev.target.blur();                                    },

  addClassName:    function(ele, name)     { Dom.toggleClassName(ele, name, true);  },
  removeClassName: function(ele, name)     { Dom.toggleClassName(ele, name, false); },
  toggleClassName: function(ele, name, on) {
    var ele = Dom.get(ele);
    var classes = ele.className.split(' ');
    var n = classes.indexOf(name);
    on = (typeof on == 'undefined') ? (n < 0) : on;
    if (on && (n < 0))
      classes.push(name);
    else if (!on && (n >= 0))
      classes.splice(n, 1);
    ele.className = classes.join(' ');
  },

  storage: window.localStorage || {}

}

//=============================================================================
// RACING GAME CONSTANTS
//=============================================================================

var KEY = {
  LEFT:  37,
  UP:    38,
  RIGHT: 39,
  DOWN:  40,
  A:     65,
  D:     68,
  S:     83,
  W:     87
};

var COLORS = {
  SKY:  '#72D7EE',
  TREE: '#005108',
  FOG:  '#005108',
  LIGHT:  { road: '#6B6B6B', grass: '#10AA10', rumble: '#555555', lane: '#CCCCCC'  },
  DARK:   { road: '#696969', grass: '#009A00', rumble: '#BBBBBB'                   },
  START:  { road: 'white',   grass: 'white',   rumble: 'white'                     },
  FINISH: { road: 'black',   grass: 'black',   rumble: 'black'                     }
};

 

var BACKGROUND = {
  HILLS: { x:   5, y:   5, w: 1280, h: 480 },
  SKY:   { x:   5, y: 500, w: 1280, h: 480 },// sky x = 495
  TREES: { x:   5, y: 985, w: 1280, h: 480 }
};

var SPRITES = {
  //					     posição X e Y      tamanho W e H
  NONE:                   { x:    0, y:    0, w:  1, h:  1 },	
  PALM_TREE:              { x: 1623, y:  704, w:  256, h:  558 },		//ok
  BILLBOARD08:            { x:  715, y:  1660, w:  375, h:  262 },		//ok
  TREE1:                  { x:  711, y:  886, w:  397, h:  376 },		//ok
  DEAD_TREE1:             { x:   80, y:  913, w:  155, h:  351 },		//ok
  BILLBOARD09:            { x:  1158, y:  1666, w:  322, h:  280 },		//ok
  BOULDER3:               { x:  775, y:  342, w:  320, h:  220 },		//ok
  COLUMN:                 { x:  1649, y: 232, w:  223, h:  330 },		//ok
  COLUMN2:                { x:  1649, y: 1682, w:  223, h:  330 },		//ok new
  BILLBOARD01:            { x:  70, y:  1395, w:  300, h:  170 },		//ok
  BILLBOARD06:            { x:  73, y:  1707, w:  283, h:  190 },		//ok
  BILLBOARD05:            { x:  1597, y: 1404, w:  298, h: 190 },		//ok
  BILLBOARD07:            { x:  397, y:  1707, w:  283, h:  190 },		//ok
  BOULDER2:               { x:  375, y:  342, w:  320, h:  220 },		//ok
  TREE2:                  { x: 1181, y:   954, w:  316, h:  308 },		//ok
  BILLBOARD04:            { x: 1180, y:  1408, w:  268, h:  170 },		//ok
  DEAD_TREE2:             { x: 431, y:  988, w:  155, h:  276 },		//ok
  BOULDER1:               { x: 52, y:  290, w:  220, h:  273 }, 		//ok
  BUSH1:                  { x:  41, y: 666, w:  240, h:  155 }, 		//ok
  CACTUS:                 { x:  815, y:  667, w:  235, h:  152 },		//ok
  BUSH2:                  { x:  401, y: 667, w:  232, h:  152 },		//ok
  BILLBOARD03:            { x:  796, y: 1380, w:  230, h:  220 },		//ok
  BILLBOARD02:            { x:  470, y: 1378, w:  215, h:  220 },		//ok
  STUMP:                  { x: 1276, y:  410, w:  208, h:  152 },		//ok
  SEMI:                   { x: 728, y:  128, w:  125, h:  149 },		//ok
  TRUCK:                  { x: 574, y:  130, w:  100, h:   80 },		//ok
  CAR03:                  { x: 294, y:  130, w:   100, h:   80 },		//ok
  CAR02:                  { x: 156, y:  130, w:   100, h:   80 },		//ok
  CAR04:                  { x: 434, y:  130, w:   100, h:   80 },		//ok
  CAR01:                  { x: 19, y: 130, w:   100, h:   80 },			//ok
  PLAYER_UPHILL_LEFT:     { x: 357, y:  30, w:   85, h:   55 },			//ok
  PLAYER_UPHILL_STRAIGHT: { x: 467, y: 30, w:   85, h:   55 },			//ok
  PLAYER_UPHILL_RIGHT:    { x: 577, y: 30, w:   85, h:   55 },			//ok
  PLAYER_LEFT:            { x:  26, y:  30, w:   85, h:   55 },			//ok
  PLAYER_STRAIGHT:        { x: 136, y:  30, w:   85, h:   55 },			//ok
  PLAYER_RIGHT:           { x:  246, y:  30, w:   85, h:   55 },		//ok
  BILLBOARD10:            { x:  819, y:  2006, w:  114, h:  112 },		//ok extra cone - diferente posição
  BILLBOARD11:            { x:  135, y:  2004, w:  114, h:  112 },		//ok extra cone
  BILLBOARD12:            { x:  465, y:  2004, w:  114, h:  112 },		//ok extra cone
  CROPS:                  { x:  1185, y: 761, w:  295, h:  58 },		//ok flores
 };

SPRITES.SCALE = 0.3 * (1/SPRITES.PLAYER_STRAIGHT.w) // the reference sprite width should be 1/3rd the (half-)roadWidth



SPRITES.BILLBOARDS = [SPRITES.BILLBOARD01, SPRITES.BILLBOARD02, SPRITES.BILLBOARD03, SPRITES.BILLBOARD04, SPRITES.BILLBOARD05, SPRITES.BILLBOARD06,
                      SPRITES.BILLBOARD07, SPRITES.BILLBOARD08, SPRITES.BILLBOARD09,SPRITES.BILLBOARD10,SPRITES.BILLBOARD11,SPRITES.BILLBOARD12];
SPRITES.PLANTS     = [SPRITES.NONE,SPRITES.TREE1, SPRITES.TREE2, SPRITES.DEAD_TREE1, SPRITES.DEAD_TREE2, SPRITES.PALM_TREE, SPRITES.BUSH1, SPRITES.BUSH2, SPRITES.CACTUS, SPRITES.STUMP, SPRITES.BOULDER1, SPRITES.BOULDER2, SPRITES.BOULDER3];
SPRITES.CARS       = [SPRITES.CAR01, SPRITES.CAR02, SPRITES.CAR03, SPRITES.CAR04, SPRITES.SEMI, SPRITES.TRUCK];

//SPRITES.GO         =[SPRITES.START];


var Util = {

  timestamp:        function()                  { return new Date().getTime();                                    },
  toInt:            function(obj, def)          { if (obj !== null) { var x = parseInt(obj, 10); if (!isNaN(x)) return x; } return Util.toInt(def, 0); },
  toFloat:          function(obj, def)          { if (obj !== null) { var x = parseFloat(obj);   if (!isNaN(x)) return x; } return Util.toFloat(def, 0.0); },
  limit:            function(value, min, max)   { return Math.max(min, Math.min(value, max));                     },
  randomInt:        function(min, max)          { return Math.round(Util.interpolate(min, max, Math.random()));   },
  randomChoice:     function(options)           { return options[Util.randomInt(0, options.length-1)];            },
  percentRemaining: function(n, total)          { return (n%total)/total;                                         },
  accelerate:       function(v, accel, dt)      { return v + (accel * dt);                                        },
  interpolate:      function(a,b,percent)       { return a + (b-a)*percent                                        },
  easeIn:           function(a,b,percent)       { return a + (b-a)*Math.pow(percent,2);                           },
  easeOut:          function(a,b,percent)       { return a + (b-a)*(1-Math.pow(1-percent,2));                     },
  easeInOut:        function(a,b,percent)       { return a + (b-a)*((-Math.cos(percent*Math.PI)/2) + 0.5);        },
  exponentialFog:   function(distance, density) { return 1 / (Math.pow(Math.E, (distance * distance * density))); },

  increase:  function(start, increment, max) { // with looping
    var result = start + increment;
    while (result >= max)
      result -= max;
    while (result < 0)
      result += max;
    return result;
  },

  project: function(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
    p.camera.x     = (p.world.x || 0) - cameraX;
    p.camera.y     = (p.world.y || 0) - cameraY;
    p.camera.z     = (p.world.z || 0) - cameraZ;
    p.screen.scale = cameraDepth/p.camera.z;
    p.screen.x     = Math.round((width/2)  + (p.screen.scale * p.camera.x  * width/2));
    p.screen.y     = Math.round((height/2) - (p.screen.scale * p.camera.y  * height/2));
    p.screen.w     = Math.round(             (p.screen.scale * roadWidth   * width/2));
  },

  overlap: function(x1, w1, x2, w2, percent) {
    var half = (percent || 1)/2;
    var min1 = x1 - (w1*half);
    var max1 = x1 + (w1*half);
    var min2 = x2 - (w2*half);
    var max2 = x2 + (w2*half);
    return ! ((max1 < min2) || (min1 > max2));
  }

}

//=========================================================================
// GAME LOOP helpers
//=========================================================================

var Game = {  // a modified version of the game loop from my previous boulderdash game - see http://codeincomplete.com/posts/2011/10/25/javascript_boulderdash/#gameloop
 
  run: function(options) {

    Game.loadImages(options.images, function(images) {

      options.ready(images); // tell caller to initialize itself because images are loaded and we're ready to rumble

      Game.setKeyListener(options.keys);

          gcanvas = gcanvas,    // canvas render target is provided by caller
          update = options.update,    // method to update game logic is provided by caller
          render = options.render,    // method to render the game is provided by caller
          step   = options.step,      // fixed frame step (1/fps) is specified by caller
     
          now    = null,
          last   = Util.timestamp(),
          dt     = 0,
          gdt    = 0;

      function frame() {
        now = Util.timestamp();
        dt  = Math.min(1, (now - last) / 800); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
        gdt = gdt + dt;
        while (gdt > step) {
          gdt = gdt - step;
          update(step);
        }
        render();
       
        last = now;
         requestAnimationFrame(frame,options. gcanvas);
      }
      frame(); // lets get this party started
    
    });
  },

  //---------------------------------------------------------------------------

  loadImages: function(names, callback) { // load multiple images and callback when ALL images have loaded
    var result = [];
    var count  = names.length;

    var onload = function() {
      if (--count == 0)
        callback(result);
    };

    for(var n = 0 ; n < names.length ; n++) {
      var name = names[n];
      result[n] = document.createElement('img');
      Dom.on(result[n], 'load', onload);
      result[n].src = "" + name + ".png";
    }
  },

  //---------------------------------------------------------------------------

  setKeyListener: function(keys) {
    var onkey = function(keyCode, mode) {
      var n, k;
      for(n = 0 ; n < keys.length ; n++) {
        k = keys[n];
        k.mode = k.mode || 'up';
        if ((k.key == keyCode) || (k.keys && (k.keys.indexOf(keyCode) >= 0))) {
          if (k.mode == mode) {
            k.action.call();
          }
        }
      }
    };
    Dom.on(document, 'keydown', function(ev) { onkey(ev.keyCode, 'down'); } );
    Dom.on(document, 'keyup',   function(ev) { onkey(ev.keyCode, 'up');   } );
  },

  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------
}

//=========================================================================
// canvas rendering helpers
//=========================================================================

var Render = {

  polygon: function(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  },

  //---------------------------------------------------------------------------

  segment: function(ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {

    var r1 = Render.rumbleWidth(w1, lanes),
        r2 = Render.rumbleWidth(w2, lanes),
        l1 = Render.laneMarkerWidth(w1, lanes),
        l2 = Render.laneMarkerWidth(w2, lanes),
        lanew1, lanew2, lanex1, lanex2, lane;
    
    ctx.fillStyle = color.grass;
    ctx.fillRect(0, y2, width, y1 - y2);
    
    Render.polygon(ctx, x1-w1-r1, y1, x1-w1, y1, x2-w2, y2, x2-w2-r2, y2, color.rumble);
    Render.polygon(ctx, x1+w1+r1, y1, x1+w1, y1, x2+w2, y2, x2+w2+r2, y2, color.rumble);
    Render.polygon(ctx, x1-w1,    y1, x1+w1, y1, x2+w2, y2, x2-w2,    y2, color.road);
    
    if (color.lane) {
      lanew1 = w1*2/lanes;
      lanew2 = w2*2/lanes;
      lanex1 = x1 - w1 + lanew1;
      lanex2 = x2 - w2 + lanew2;
      for(lane = 1 ; lane < lanes ; lanex1 += lanew1, lanex2 += lanew2, lane++)
        Render.polygon(ctx, lanex1 - l1/2, y1, lanex1 + l1/2, y1, lanex2 + l2/2, y2, lanex2 - l2/2, y2, color.lane);
    }
    
    Render.fog(ctx, 0, y1, width, y2-y1, fog);
  },

  //---------------------------------------------------------------------------

  background: function(ctx, background, width, height, layer, rotation, offset) {

    rotation = rotation || 0;
    offset   = offset   || 0;
	
    var imageW = layer.w/2;
    var imageH = layer.h;

    var sourceX = layer.x + Math.floor(layer.w * rotation);
    var sourceY = layer.y
    var sourceW = Math.min(imageW, layer.x+layer.w-sourceX);
    var sourceH = imageH;
    
    var destX = 0;
    var destY = offset;
    var destW = Math.floor(width * (sourceW/imageW));
    var destH = height;
	
   if(sourceX<1284)
	 ctx.drawImage(background, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
     ctx.drawImage(background, layer.x, sourceY, imageW-sourceW, sourceH, destW-1, destY, width-destW, destH);
  
  },

  //---------------------------------------------------------------------------

  sprite: function(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, offsetX, offsetY, clipY) {

                    //  scale for projection AND relative to roadWidth (for tweakUI)
    var destW  = (sprite.w * scale * width/2) * (SPRITES.SCALE * roadWidth);
    var destH  = (sprite.h * scale * width/2) * (SPRITES.SCALE * roadWidth);

    destX = destX + (destW * (offsetX || 0));
    destY = destY + (destH * (offsetY || 0));

    var clipH = clipY ? Math.max(0, destY+destH-clipY) : 0;
    if (clipH < destH)
      ctx.drawImage(sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h*clipH/destH), destX, destY, destW, destH - clipH);

  },
  
  //---------------------------------------------------------------------------

  player: function(ctx, width, height, resolution, roadWidth, sprites, speedPercent, scale, destX, destY, steer, updown) {

    var bounce = (1.5 * Math.random() * speedPercent * resolution) * Util.randomChoice([-1,1]);
    var sprite;
    if (steer < 0)
      sprite = (updown > 0) ? SPRITES.PLAYER_UPHILL_LEFT : SPRITES.PLAYER_LEFT;
    else if (steer > 0)
      sprite = (updown > 0) ? SPRITES.PLAYER_UPHILL_RIGHT : SPRITES.PLAYER_RIGHT;
    else
      sprite = (updown > 0) ? SPRITES.PLAYER_UPHILL_STRAIGHT : SPRITES.PLAYER_STRAIGHT;

    Render.sprite(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY + bounce*bouncefactor, -0.5, -1);
  },

  //---------------------------------------------------------------------------

  fog: function(ctx, x, y, width, height, fog) {
    if (fog < 1) {
      ctx.globalAlpha = (1-fog)
      ctx.fillStyle = COLORS.FOG;
      ctx.fillRect(x, y, width, height);
      ctx.globalAlpha = 1;
    }
  },

  rumbleWidth:     function(projectedRoadWidth, lanes) { return projectedRoadWidth/Math.max(6,  2*lanes); },
  laneMarkerWidth: function(projectedRoadWidth, lanes) { return projectedRoadWidth/Math.max(32, 8*lanes); }

}



function update(dt) {

      var n, car, carW, sprite, spriteW;
      var playerSegment = findSegment(position+playerZ);
      var playerW       = SPRITES.PLAYER_STRAIGHT.w * SPRITES.SCALE;
      var speedPercent  = speed/maxSpeed;
      var dx            = dt * 2 * speedPercent; // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
      var startPosition = position;
      
	  
      updateCars(dt, playerSegment, playerW);
	
      position = Util.increase(position, dt * speed, trackLength);
		
      //if (keyLeft)
      //  playerX = playerX - dx;
      //else if (keyRight)
      //playerX = playerX + dx;

      //playerX = playerX - (dx * speedPercent * playerSegment.curve * centrifugal);
	  
	  // mtouch speed

      if (keyFaster)    speed = Util.accelerate(speed, accel, dt);

      else if (keySlower)   speed = Util.accelerate(speed, breaking, dt);
      
	  else
        speed = Util.accelerate(speed, decel, dt);
 
      if ((playerX < -1) || (playerX > 1)) {
			
        if (speed > offRoadLimit)
          speed = Util.accelerate(speed, offRoadDecel, dt);

	   for(n = 0 ; n < playerSegment.sprites.length ; n++) {
          sprite  = playerSegment.sprites[n];
          spriteW = sprite.source.w * SPRITES.SCALE;
          if (Util.overlap(playerX, playerW, sprite.offset + spriteW/2 * (sprite.offset > 0 ? 1 : -1), spriteW)) {
           speed = maxSpeed/10;
			 
            position = Util.increase(playerSegment.p1.world.z, -playerZ, trackLength); // stop in front of sprite (at front of segment)
            break;
          }
        }
		 
      }

      for(n = 0 ; n < playerSegment.cars.length ; n++) {
        car  = playerSegment.cars[n];
        carW = car.sprite.w * SPRITES.SCALE;
        if (speed > car.speed) {
          if (Util.overlap(playerX, playerW, car.offset, carW, 0.8)) {
            speed    = 0  ;//(car.speed/speed)
            position = Util.increase(car.z, -playerZ, trackLength);
            break;
          }
        }
      }

      playerX = Util.limit(playerX, -3, 3);     // dont ever let it go too far out of bounds
	 
	  if((playerX>1) || (playerX<-1))          // if car offroad bounce more ! 
		bouncefactor=6;
		else
		bouncefactor=1;
 
      speed   = Util.limit(speed, 0, maxSpeed); // or exceed maxSpeed

      skyOffset  = Util.increase(skyOffset,  skySpeed  * playerSegment.curve * (position-startPosition)/segmentLength, 1);
      hillOffset = Util.increase(hillOffset, hillSpeed * playerSegment.curve * (position-startPosition)/segmentLength, 1);
      treeOffset = Util.increase(treeOffset, treeSpeed * playerSegment.curve * (position-startPosition)/segmentLength, 1);
		 
      if (position > playerZ) {
        if (currentLapTime && (startPosition < playerZ)) {
          lastLapTime    = currentLapTime;
          currentLapTime = 0;
          if (lastLapTime <= Util.toFloat(Dom.storage.fast_lap_time)) {
           
			// Dom.storage.fast_lap_time = lastLapTime;
            // updateHud('fast_lap_time', formatTime(lastLapTime));
            // Dom.addClassName('fast_lap_time', 'fastest');
            // Dom.addClassName('last_lap_time', 'fastest');
			
          }
          else {
            // Dom.removeClassName('fast_lap_time', 'fastest');
            // Dom.removeClassName('last_lap_time', 'fastest');
          }
          // updateHud('last_lap_time', formatTime(lastLapTime));
          // Dom.show('last_lap_time');
		  score +=lastLapTime;
		 lapcounter+=1;
		// maxSpeed=10;
        }
        else {
          currentLapTime += dt;
        }
      }

      // updateHud('speed',            5 * Math.round(speed/500));
      // updateHud('current_lap_time', formatTime(currentLapTime));
    }

    //-------------------------------------------------------------------------

    function updateCars(dt, playerSegment, playerW) {
      var n, car, oldSegment, newSegment;
      for(n = 0 ; n < cars.length ; n++) {
        car         = cars[n];
        oldSegment  = findSegment(car.z);
        car.offset  = car.offset + updateCarOffset(car, oldSegment, playerSegment, playerW);
        car.z       = Util.increase(car.z, dt * car.speed, trackLength);
        car.percent = Util.percentRemaining(car.z, segmentLength); // useful for interpolation during rendering phase
        newSegment  = findSegment(car.z);
        if (oldSegment != newSegment) {
          index = oldSegment.cars.indexOf(car);
          oldSegment.cars.splice(index, 1);
          newSegment.cars.push(car);
        }
      }
    }

    function updateCarOffset(car, carSegment, playerSegment, playerW) {

      var i, j, dir, segment, otherCar, otherCarW, lookahead = 20, carW = car.sprite.w * SPRITES.SCALE;

      // optimization, dont bother steering around other cars when 'out of sight' of the player
      if ((carSegment.index - playerSegment.index) > drawDistance)
        return 0;

      for(i = 1 ; i < lookahead ; i++) {
        segment = segments[(carSegment.index+i)%segments.length];

        if ((segment === playerSegment) && (car.speed > speed) && (Util.overlap(playerX, playerW, car.offset, carW, 1.2))) {
          if (playerX > 0.5)
            dir = -1;
          else if (playerX < -0.5)
            dir = 1;
          else
            dir = (car.offset > playerX) ? 1 : -1;
          return dir * 1/i * (car.speed-speed)/maxSpeed; // the closer the cars (smaller i) and the greated the speed ratio, the larger the offset
        }

        for(j = 0 ; j < segment.cars.length ; j++) {
          otherCar  = segment.cars[j];
          otherCarW = otherCar.sprite.w * SPRITES.SCALE;
          if ((car.speed > otherCar.speed) && Util.overlap(car.offset, carW, otherCar.offset, otherCarW, 1.2)) {
            if (otherCar.offset > 0.5)
              dir = -1;
            else if (otherCar.offset < -0.5)
              dir = 1;
            else
              dir = (car.offset > otherCar.offset) ? 1 : -1;
            return dir * 1/i * (car.speed-otherCar.speed)/maxSpeed;
          }
        }
      }

      // if no cars ahead, but I have somehow ended up off road, then steer back on
      if (car.offset < -0.9)
        return 0.1;
      else if (car.offset > 0.9)
        return -0.1;
      else
        return 0;
    }

    //-------------------------------------------------------------------------

    // function updateHud(key, value) { // accessing DOM can be slow, so only do it if value has changed
      // if (hud[key].value !== value) {
        // hud[key].value = value;
        // Dom.set(hud[key].dom, value);
      // }
    // }

    function formatTime(dt) {
      var minutes = Math.floor(dt/60);
      var seconds = Math.floor(dt - (minutes * 60));
      var tenths  = Math.floor(10 * (dt - Math.floor(dt)));
      if (minutes > 0)
        return minutes + "." + (seconds < 10 ? "0" : "") + seconds + "." + tenths;
      else
        return seconds + "." + tenths;
    }

    //=========================================================================
    // RENDER THE GAME WORLD
    //=========================================================================

    function render() {

      var baseSegment   = findSegment(position);
      var basePercent   = Util.percentRemaining(position, segmentLength);
      var playerSegment = findSegment(position+playerZ);
      var playerPercent = Util.percentRemaining(position+playerZ, segmentLength);
      var playerY       = Util.interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);
      var maxy          = height;

      var x  = 0;
      var dx = - (baseSegment.curve * basePercent);

      ctx.clearRect(0, 0, width, height);

      Render.background(ctx, background, width, height, BACKGROUND.SKY,   skyOffset,  resolution * skySpeed  );
      Render.background(ctx, background, width, height, BACKGROUND.HILLS, hillOffset, resolution * hillSpeed * playerY);
      Render.background(ctx, background, width, height, BACKGROUND.TREES, treeOffset, resolution * treeSpeed * playerY);

      var n, i, segment, car, sprite, spriteScale, spriteX, spriteY;

      for(n = 0 ; n < drawDistance ; n++) {

        segment        = segments[(baseSegment.index + n) % segments.length];
        segment.looped = segment.index < baseSegment.index;
        segment.fog    = Util.exponentialFog(n/drawDistance, fogDensity);
        segment.clip   = maxy;

        Util.project(segment.p1, (playerX * roadWidth) - x,      playerY + cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);
        Util.project(segment.p2, (playerX * roadWidth) - x - dx, playerY + cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);

        x  = x + dx;
        dx = dx + segment.curve;

        if ((segment.p1.camera.z <= cameraDepth)         || // behind us
            (segment.p2.screen.y >= segment.p1.screen.y) || // back face cull
            (segment.p2.screen.y >= maxy))                  // clip by (already rendered) hill
          continue;

        Render.segment(ctx, width, lanes,
                       segment.p1.screen.x,
                       segment.p1.screen.y,
                       segment.p1.screen.w,
                       segment.p2.screen.x,
                       segment.p2.screen.y,
                       segment.p2.screen.w,
                       segment.fog,
                       segment.color);

        maxy = segment.p1.screen.y;
      }

      for(n = (drawDistance-1) ; n > 0 ; n--) {
        segment = segments[(baseSegment.index + n) % segments.length];

        for(i = 0 ; i < segment.cars.length ; i++) {
          car         = segment.cars[i];
          sprite      = car.sprite;
          spriteScale = Util.interpolate(segment.p1.screen.scale, segment.p2.screen.scale, car.percent);
          spriteX     = Util.interpolate(segment.p1.screen.x,     segment.p2.screen.x,     car.percent) + (spriteScale * car.offset * roadWidth * width/2);
          spriteY     = Util.interpolate(segment.p1.screen.y,     segment.p2.screen.y,     car.percent);
          Render.sprite(ctx, width, height, resolution, roadWidth, sprites, car.sprite, spriteScale, spriteX, spriteY, -0.5, -1, segment.clip);
        }

        for(i = 0 ; i < segment.sprites.length ; i++) {
          sprite      = segment.sprites[i];
          spriteScale = segment.p1.screen.scale;
          spriteX     = segment.p1.screen.x + (spriteScale * sprite.offset * roadWidth * width/2);
          spriteY     = segment.p1.screen.y;
          Render.sprite(ctx, width, height, resolution, roadWidth, sprites, sprite.source, spriteScale, spriteX, spriteY, (sprite.offset < 0 ? -1 : 0), -1, segment.clip);
        }

        if (segment == playerSegment) {
          Render.player(ctx, width, height, resolution, roadWidth, sprites, speed/maxSpeed,
                        cameraDepth/playerZ,
                        width/2,
                        (height/2) - (cameraDepth/playerZ * Util.interpolate(playerSegment.p1.camera.y, playerSegment.p2.camera.y, playerPercent) * height/2),
                        speed * (keyLeft ? -1 : keyRight ? 1 : 0),
                        playerSegment.p2.world.y - playerSegment.p1.world.y);
        }
      }
    }
    function findSegment(z) {
      return segments[Math.floor(z/segmentLength) % segments.length]; 
    }

    //=========================================================================
    // BUILD ROAD GEOMETRY
    //=========================================================================

    function lastY() { return (segments.length == 0) ? 0 : segments[segments.length-1].p2.world.y; }

    function addSegment(curve, y) {
      var n = segments.length;
      segments.push({
          index: n,
             p1: { world: { y: lastY(), z:  n   *segmentLength }, camera: {}, screen: {} },
             p2: { world: { y: y,       z: (n+1)*segmentLength }, camera: {}, screen: {} },
          curve: curve,
        sprites: [],
           cars: [],
	  
          color: Math.floor(n/rumbleLength)%2 ? COLORS.DARK : COLORS.LIGHT
      });
    }

    function addSprite(n, sprite, offset) {
		
      segments[n].sprites.push({ source: sprite, offset: offset });
	}

    function addRoad(enter, hold, leave, curve, y) {
      var startY   = lastY();
      var endY     = startY + (Util.toInt(y, 0) * segmentLength);
      var n, total = enter + hold + leave;
      for(n = 0 ; n < enter ; n++)
        addSegment(Util.easeIn(0, curve, n/enter), Util.easeInOut(startY, endY, n/total));
      for(n = 0 ; n < hold  ; n++)
        addSegment(curve, Util.easeInOut(startY, endY, (enter+n)/total));
      for(n = 0 ; n < leave ; n++)
        addSegment(Util.easeInOut(curve, 0, n/leave), Util.easeInOut(startY, endY, (enter+hold+n)/total));
 
	}

    // var ROAD = {
      // LENGTH: { NONE: 0, SHORT:  25, MEDIUM:   50, LONG:  100 },//25
      // HILL:   { NONE: 0, LOW:    20, MEDIUM:   40, HIGH:   60 },
      // CURVE:  { NONE: 0, EASY:    2, MEDIUM:    4, HARD:    6 }
    // };
//x 2
var ROAD = {
      LENGTH: { NONE: 0, SHORT:  50, MEDIUM: 100, LONG:   200 },
      HILL:   { NONE: 0, LOW:    40, MEDIUM: 80 , HIGH:   120 },
      CURVE:  { NONE: 0, EASY:    2, MEDIUM:    4, HARD:    6 }
    };	
	
    function addStraight(num) {
      num = num || ROAD.LENGTH.MEDIUM;
      addRoad(num, num, num, 0, 0);
	 // console.log('Num '+num);
		return num;
	}

    function addHill(num, height) {
      num    = num    || ROAD.LENGTH.MEDIUM;
      height = height || ROAD.HILL.MEDIUM;
      addRoad(num, num, num, 0, height);
    }

    function addCurve(num, curve, height) {
      num    = num    || ROAD.LENGTH.MEDIUM;
      curve  = curve  || ROAD.CURVE.MEDIUM;
      height = height || ROAD.HILL.NONE;
      addRoad(num, num, num, curve, height);
    }
        
    function addLowRollingHills(num, height) {
      num    = num    || ROAD.LENGTH.SHORT;
      height = height || ROAD.HILL.LOW;
      addRoad(num, num, num,  0,                height/2);
      addRoad(num, num, num,  0,               -height);
      addRoad(num, num, num,  ROAD.CURVE.EASY,  height);
      addRoad(num, num, num,  0,                0);
      addRoad(num, num, num, -ROAD.CURVE.EASY,  height/2);
      addRoad(num, num, num,  0,                0);
    }

    function addSCurves() {
      addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.NONE);
      addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.MEDIUM,  ROAD.HILL.MEDIUM);
      addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,   ROAD.CURVE.EASY,   -ROAD.HILL.LOW);
      addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.EASY,    ROAD.HILL.MEDIUM);
      addRoad(ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM, ROAD.LENGTH.MEDIUM,  -ROAD.CURVE.MEDIUM, -ROAD.HILL.MEDIUM);
    }
	
    function addBumps() {
      addRoad(10, 10, 10, 0,  5);
      addRoad(10, 10, 10, 0, -2);
      addRoad(10, 10, 10, 0, -5);
      addRoad(10, 10, 10, 0,  8);
      addRoad(10, 10, 10, 0,  5);
      addRoad(10, 10, 10, 0, -7);
      addRoad(10, 10, 10, 0,  5);
      addRoad(10, 10, 10, 0, -2);
    }

    function addDownhill(num) {
      num = num || 400;
      addRoad(num, num, num, ROAD.CURVE.NONE,-lastY()/segmentLength-1);
    }
	
	
	function addDownhillLeft(num) {
      num = num || 400;
      addRoad(num, num, num, -ROAD.CURVE.EASY, -lastY()/segmentLength-1);
    }
	function addDownhillRight(num) {
      num = num || 400;
      addRoad(num, num, num, ROAD.CURVE.EASY, -lastY()/segmentLength-1);
    }
    function resetRoad() {
      segments = [];
	 
	  if(start_seg==0) addStraight(ROAD.LENGTH.SHORT);
      if(start_seg==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(start_seg==2) addStraight(ROAD.LENGTH.LONG);
	  if(start_seg==3) addLowRollingHills();
	  if(start_seg==4) addSCurves();
	  if(start_seg==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(start_seg==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(start_seg==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(start_seg==8) addBumps();
	  if(start_seg==9) addHill(ROAD.LENGTH.MEDIUM,  ROAD.HILL.LOW);
	  if(start_seg==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(start_seg==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(start_seg==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(start_seg==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(start_seg==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(start_seg==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(start_seg==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(start_seg==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(start_seg==18) addDownhill();
	  if(start_seg==19) addDownhillLeft();
	  if(start_seg==20) addDownhillRight();
	 
	  start_seglen=segments.length;
	  console.log("Start seg "+start_seglen);
	 
	  if(bseg1==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg1==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg1==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg1==3) addLowRollingHills();
	  if(bseg1==4) addSCurves();
	  if(bseg1==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg1==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg1==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg1==8) addBumps();
	  if(bseg1==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg1==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg1==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg1==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg1==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg1==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg1==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg1==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg1==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg1==18) addDownhill();
	  if(bseg1==19) addDownhillLeft();
	  if(bseg1==20) addDownhillRight();
	  bseg1len=segments.length;
	  console.log("bs 1 "+bseg1len);
	  if(bseg2==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg2==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg2==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg2==3) addLowRollingHills();
	  if(bseg2==4) addSCurves();
	  if(bseg2==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg2==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg2==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg2==8) addBumps();
	  if(bseg2==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg2==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg2==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg2==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg2==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg2==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg2==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg2==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg2==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg2==18) addDownhill();
	  if(bseg2==19) addDownhillLeft();
	  if(bseg2==20) addDownhillRight();
	  bseg2len=segments.length;
	  console.log("bs 2 "+bseg2len);	  
	  if(bseg3==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg3==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg3==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg3==3) addLowRollingHills();
	  if(bseg3==4) addSCurves();
	  if(bseg3==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg3==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg3==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg3==8) addBumps();
	  if(bseg3==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg3==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg3==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg3==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg3==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg3==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg3==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg3==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg3==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg3==18) addDownhill();
	  if(bseg3==19) addDownhillLeft();
	  if(bseg3==20) addDownhillRight();
	  bseg3len=segments.length;
	  console.log("bs 3 "+bseg3len);
	  if(bseg4==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg4==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg4==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg4==3) addLowRollingHills();
	  if(bseg4==4) addSCurves();
	  if(bseg4==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg4==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg4==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg4==8) addBumps();
	  if(bseg4==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg4==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg4==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg4==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg4==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg4==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg4==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg4==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg4==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg4==18) addDownhill();
	  if(bseg4==19) addDownhillLeft();
	  if(bseg4==20) addDownhillRight();
	  bseg4len=segments.length;
	  console.log("bs 4 "+bseg4len);
	  
	  if(bseg5==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg5==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg5==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg5==3) addLowRollingHills();
	  if(bseg5==4) addSCurves();
	  if(bseg5==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg5==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg5==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg5==8) addBumps();
	  if(bseg5==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg5==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg5==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg5==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg5==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg5==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg5==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg5==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg5==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg5==18) addDownhill();
	  if(bseg5==19) addDownhillLeft();
	  if(bseg5==20) addDownhillRight();
	  bseg5len=segments.length;
	  console.log("bs 5 "+bseg5len);
	  
	  if(bseg6==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg6==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg6==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg6==3) addLowRollingHills();
	  if(bseg6==4) addSCurves();
	  if(bseg6==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg6==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg6==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg6==8) addBumps();
	  if(bseg6==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg6==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg6==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg6==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg6==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg6==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg6==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg6==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg6==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg6==18) addDownhill();
	  if(bseg6==19) addDownhillLeft();
	  if(bseg6==20) addDownhillRight();
	  bseg6len=segments.length;
	  console.log("bs 6 "+bseg6len);
	  
	  if(bseg7==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg7==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg7==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg7==3) addLowRollingHills();
	  if(bseg7==4) addSCurves();
	  if(bseg7==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg7==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg7==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg7==8) addBumps();
	  if(bseg7==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg7==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg7==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg7==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg7==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg7==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg7==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg7==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg7==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg7==18) addDownhill();
	  if(bseg7==19) addDownhillLeft();
	  if(bseg7==20) addDownhillRight();
	  bseg7len=segments.length;
	  console.log("bs 7 "+bseg7len);
	  
	  if(bseg8==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg8==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg8==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg8==3) addLowRollingHills();
	  if(bseg8==4) addSCurves();
	  if(bseg8==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg8==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg8==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg8==8) addBumps();
	  if(bseg8==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg8==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg8==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg8==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg8==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg8==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg8==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg8==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg8==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg8==18) addDownhill();
	  if(bseg8==19) addDownhillLeft();
	  if(bseg8==20) addDownhillRight();
	  bseg8len=segments.length;
	  console.log("bs 8 "+bseg8len);
	  
	  if(bseg9==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg9==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg9==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg9==3) addLowRollingHills();
	  if(bseg9==4) addSCurves();
	  if(bseg9==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg9==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg9==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg9==8) addBumps();
	  if(bseg9==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg9==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg9==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg9==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg9==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg9==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg9==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg9==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg9==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg9==18) addDownhill();
	  if(bseg9==19) addDownhillLeft();
	  if(bseg9==20) addDownhillRight();
	  bseg9len=segments.length;
	  console.log("bs 9 "+bseg9len);
	  
	  if(bseg10==0) addStraight(ROAD.LENGTH.SHORT);
      if(bseg10==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(bseg10==2) addStraight(ROAD.LENGTH.LONG);
	  if(bseg10==3) addLowRollingHills();
	  if(bseg10==4) addSCurves();
	  if(bseg10==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg10==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg10==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg10==8) addBumps();
	  if(bseg10==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(bseg10==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(bseg10==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(bseg10==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg10==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg10==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg10==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(bseg10==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(bseg10==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(bseg10==18) addDownhill();
	  if(bseg10==19) addDownhillLeft();
	  if(bseg10==20) addDownhillRight();
	  bseg10len=segments.length;
	  console.log("bs 10 "+bseg10len);
	  
	  if(end_seg==0) addStraight(ROAD.LENGTH.SHORT);
      if(end_seg==1) addStraight(ROAD.LENGTH.MEDIUM);
	  if(end_seg==2) addStraight(ROAD.LENGTH.LONG);
	  if(end_seg==3) addLowRollingHills();
	  if(end_seg==4) addSCurves();
	  if(end_seg==5) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(end_seg==6) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(end_seg==7) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(end_seg==8) addBumps();
	  if(end_seg==9) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.LOW);
	  if(end_seg==10) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.MEDIUM);
	  if(end_seg==11) addHill(ROAD.LENGTH.MEDIUM, ROAD.HILL.HIGH);
	  if(end_seg==12) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(end_seg==13) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(end_seg==14) addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(end_seg==15) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.EASY, ROAD.HILL.NONE);
	  if(end_seg==16) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
	  if(end_seg==17) addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
	  if(end_seg==18) addDownhill();
	  if(end_seg==19) addDownhillLeft();
	  if(end_seg==20) addDownhillRight();
	  end_seglen=segments.length;
	  console.log("End seg "+end_seglen);
	
	  console.log('End Road Height : '+ -lastY()/segmentLength);
	
      resetSprites();
      resetCars();  
	  
      segments[findSegment(playerZ).index + 2].color = COLORS.START;
     segments[findSegment(playerZ).index + 3].color = COLORS.START;
      for(var n = 0 ; n < rumbleLength ; n++)
        segments[segments.length-1-n].color = COLORS.FINISH;

      trackLength = segments.length * segmentLength;
	 
    }

     function resetSprites() {
       var n, i;
	   var side, sprite, offset;
	   
	
	  // addSprite(20,  SPRITES.START, -0.2);
	  
	  for(n = 50 ; n<(start_seglen-50); n += 4 + Math.floor(n/100)) {
        addSprite(n, SPRITES.PALM_TREE, 1.0 + Math.random()*2);
        addSprite(n, SPRITES.PALM_TREE,   -1 - Math.random()*2);
      }
		// bb 
     if(start_seg_side==0 && start_seg_bb!=0) {
		 for(n=10;n<(start_seglen-50);n+=50){addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);}//l
	 }
	 if(start_seg_side==1 && start_seg_bb!=0){
		 
		 for(n=10;n<(start_seglen-50);n+=50){addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);}//l			 
	 }
	  if(start_seg_side==2 && start_seg_bb!=0){
	 for(n=10;n<(start_seglen-50);n+=50){addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), 1);addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -1);}
	 }
	  
	  
	  if(start_seg_side==0 && start_seg_plts!=0){
	      var side, sprite, offset;
      for(n = 20 ; n < (start_seglen-50) ; n += 100) {
        side      = Util.randomChoice([-1, -1]);
        
        for(i = 0 ; i < 20 ; i++) {
          sprite = Util.randomChoice(SPRITES.PLANTS);
          offset = side * (1.5 + Math.random());
          addSprite(n + Util.randomInt(0, 50), sprite, offset);
        }
          
      }
	 } 
	if(start_seg_side==1 && start_seg_plts!=0){
	      var side, sprite, offset;
      for(n = 20 ; n < (start_seglen-50) ; n += 100) {
        side      = Util.randomChoice([1, 1]);
        
        for(i = 0 ; i < 20 ; i++) {
          sprite = Util.randomChoice(SPRITES.PLANTS);
          offset = side * (1.5 + Math.random());
          addSprite(n + Util.randomInt(0, 50), sprite, offset);
        }
          
      }
	 } 
	 if(start_seg_side==2 && start_seg_plts!=0){
	      var sprite;
      for(n = 20 ; n < (start_seglen-50) ; n += 100) {
             
        for(i = 0 ; i < 20 ; i++) {
          sprite = Util.randomChoice(SPRITES.PLANTS);
          addSprite(n + Util.randomInt(0, 50), sprite, -1);
		  addSprite(n + Util.randomInt(0, 50), sprite, 1);
        }
          
      }
	 } 
//--------------- crops	
	 if(start_seg_side==0 && start_seg_misc==1){
	     
      for(n = 20 ; n < (start_seglen-50) ; n += 3) {
          
          sprite = SPRITES.CROPS;
          addSprite(n , sprite, -1.1);
		
      }
	 }
	
	 if(start_seg_side==1 && start_seg_misc==1){
	     for(n = 20 ; n < (start_seglen-50) ; n += 3) {
             
        for(i = 0 ; i < 50 ; i++) {
          sprite = SPRITES.CROPS;
          addSprite(n + Util.randomInt(0, 50), sprite, 1.1);
		}
       
      }
	 }

	if(start_seg_side==2 && start_seg_misc==1){
	     
      for(n = 20 ; n < (start_seglen-50) ; n += 3) {
                
          sprite = SPRITES.CROPS;
          addSprite(n , sprite, -1.1);
		  addSprite(n , sprite, 1.1);
		      
      }
	 }
// c1 	 
	 if(start_seg_side==0 && start_seg_misc==2){
	    for(n = 20 ; n < (start_seglen) ; n += 5) {
         addSprite(n,     SPRITES.COLUMN, -1.1);
          
      }
	 } 
		 
	if(start_seg_side==1 && start_seg_misc==2){
	    for(n = 20 ; n < (start_seglen) ; n += 5) {
             
         addSprite(n,     SPRITES.COLUMN, 1.1);
         
      }
	 } 
	if(start_seg_side==2 && start_seg_misc==2){
	    for(n = 20 ; n < (start_seglen) ; n += 5) {
             
         addSprite(n,     SPRITES.COLUMN, 1.1);
		 addSprite(n,     SPRITES.COLUMN, -1.1);
         
      }
	 } 

	 if(start_seg_side==0 && start_seg_misc==3){
	       
      for(n = 20 ; n < (start_seglen) ; n += 5) {
             
         addSprite(n,     SPRITES.COLUMN2, -1.1);//g
       }
	 } 
	 if(start_seg_side==1 && start_seg_misc==3){
	       
      for(n = 20 ; n < (start_seglen) ; n += 5) {
             
         addSprite(n,     SPRITES.COLUMN2, 1.1);//d
       
       
      }
	 } 

	if(start_seg_side==2 && start_seg_misc==3){
	       
      for(n = 20 ; n < (start_seglen) ; n += 5) {
             
         addSprite(n,     SPRITES.COLUMN2, 1.1);// des deux côtés !
         addSprite(n,     SPRITES.COLUMN2, -1.1);
       
      }
	 } 
//cortado aqui 
  
	  // for(n = 600 ; n < 1200 ; n += 5) {
       // addSprite(n,     SPRITES.COLUMN2, 1.1);
       // addSprite(n + Util.randomInt(0,5), SPRITES.TREE1, -1 - (Math.random() * 2));
       // addSprite(n + Util.randomInt(0,5), SPRITES.TREE2, -1 - (Math.random() * 2));
      // }
	  
	// var side, sprite, offset;
      // for(n = 1260 ; n < (segments.length-50) ; n += 100) {
        // side      = Util.randomChoice([1, -1]);
        // addSprite(n + Util.randomInt(0, 50), Util.randomChoice(SPRITES.BILLBOARDS), -side);
        // for(i = 0 ; i < 20 ; i++) {
          // sprite = Util.randomChoice(SPRITES.PLANTS);
          // offset = side * (1.5 + Math.random());
          // addSprite(n + Util.randomInt(0, 50), sprite, offset);
        // }
          
      // }
	 
	 console.log("fin sprite segment "+n);
	 
	}
    function resetCars() {
      cars = [];
      var n, car, segment, offset, z, sprite, speed;
      for (var n = 0 ; n < totalCars ; n++) {
        offset = Math.random() * Util.randomChoice([-0.8, 0.8]);
        z      = Math.floor(Math.random() * segments.length) * segmentLength;
        
		sprite = Util.randomChoice(SPRITES.CARS);
        speed  = maxSpeed/4 + Math.random() * maxSpeed/(sprite == SPRITES.SEMI ? 4 : 2);
        car = { offset: offset, z: z, sprite: sprite, speed: speed };
        segment = findSegment(car.z);
        segment.cars.push(car);
        cars.push(car);
      }
    }

	    //=========================================================================
    // THE GAME LOOP
    //=========================================================================


    function reset(options) {
      options       = options || {};
      gcanvas.width  = width  = Util.toInt(options.width,          width);
      gcanvas.height = height = Util.toInt(options.height,         height);
      lanes                  = Util.toInt(options.lanes,          lanes);
      roadWidth              = Util.toInt(options.roadWidth,      roadWidth);
      cameraHeight           = Util.toInt(options.cameraHeight,   cameraHeight);
      drawDistance           = Util.toInt(options.drawDistance,   drawDistance);
      fogDensity             = Util.toInt(options.fogDensity,     fogDensity);
      fieldOfView            = Util.toInt(options.fieldOfView,    fieldOfView);
      segmentLength          = Util.toInt(options.segmentLength,  segmentLength);
      rumbleLength           = Util.toInt(options.rumbleLength,   rumbleLength);
      cameraDepth            = 1 / Math.tan((fieldOfView/2) * Math.PI/180);
      playerZ                = (cameraHeight * cameraDepth);
      resolution             = height/480;// 480
//      refreshTweakUI();

      if ((segments.length==0) || (options.segmentLength) || (options.rumbleLength))
        resetRoad(); // only rebuild road when necessary
    }			

function refreshTweakUI() {
     //  Dom.get('lanes').selectedIndex = lanes-1;
      // Dom.get('currentRoadWidth').innerHTML      = Dom.get('roadWidth').value      = roadWidth;
      // Dom.get('currentCameraHeight').innerHTML   = Dom.get('cameraHeight').value   = cameraHeight;
      // Dom.get('currentDrawDistance').innerHTML   = Dom.get('drawDistance').value   = drawDistance;
      // Dom.get('currentFieldOfView').innerHTML    = Dom.get('fieldOfView').value    = fieldOfView;
      // Dom.get('currentFogDensity').innerHTML     = Dom.get('fogDensity').value     = fogDensity;
    }

    var fps            = 60;                      // how many 'update' frames per second
    var step           = 1/fps;                   // how long is each frame (in seconds)
    var width          =1024;                    // logical gcanvas width
    var height         =768;                    // logical canvas height
    var centrifugal    = 0.3;                     // centrifugal force multiplier when going around curves
    var offRoadDecel   = 0.99;                    // speed multiplier when off road (e.g. you lose 2% speed each update frame)
    var skySpeed       = 0.001;                   // background sky layer scroll speed when going around curve (or up hill)
    var hillSpeed      = 0.002;                   // background hill layer scroll speed when going around curve (or up hill)
    var treeSpeed      = 0.003;                   // background tree layer scroll speed when going around curve (or up hill)
    var skyOffset      = 0;                       // current sky scroll offset
    var hillOffset     = 0;                       // current hill scroll offset
    var treeOffset     = 0;                       // current tree scroll offset
    var segments       = [];                      // array of road segments
    var cars           = [];                      // array of cars on the road
    
	var gcanvas= Dom.get('c2canvas');
    var ctx; // ...and its drawing context
    var background     = null;                    // our background image (loaded below)
    var sprites        = null;                    // our spritesheet (loaded below)
    var resolution     = null;                    // scaling factor to provide resolution independence (computed)
    var roadWidth      = 2000;                    // actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
    var segmentLength  = 200;                     // length of a single segment
    var rumbleLength   = 3;                       // number of segments per red/white rumble strip
    var trackLength    = null;                    // z length of entire track (computed)
    var lanes          = 4;                       // number of lanes
    var fieldOfView    = 100;                     // angle (degrees) for field of view
    var cameraHeight   = 1000;                    // z height of camera
    var cameraDepth    = null;                    // z distance camera is from screen (computed)
    var drawDistance   = 300;                     // number of segments to draw
    var playerX        = 0;                       // player x offset from center of road (-1 to 1 to stay independent of roadWidth)
    var playerZ        = null;                    // player relative z distance from camera (computed)
    var fogDensity     = 1;                       // exponential fog density
    var position       = 0;                       // current camera Z position (add playerZ to get player's absolute Z position)
    var speed          = 0;                       // current speed
    var maxSpeed       = segmentLength/step;      // top speed (ensure we can't move more than 1 segment in a single frame to make collision detection easier)
    var accel          =  maxSpeed/5;             // acceleration rate - tuned until it 'felt' right
    var breaking       = -maxSpeed;               // deceleration rate when braking
    var decel          = -maxSpeed/5;             // 'natural' deceleration rate when neither accelerating, nor braking
    var offRoadDecel   = -maxSpeed/2;             // off road deceleration is somewhere in between
    var offRoadLimit   =  maxSpeed/4;             // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
    var totalCars      = 100;  //200                   // total number of cars on the road
    var currentLapTime = 0;                       // current lap time
    var lastLapTime    = null;                    // last lap time
	var bouncefactor = 1;
	
    var keyLeft        = false;
    var keyRight       = false;
    var keyFaster      = false;
    var keySlower      = false;

    // var hud = {
      // speed:            { value: null, dom: Dom.get('speed_value')            },
      // current_lap_time: { value: null, dom: Dom.get('current_lap_time_value') },
      // last_lap_time:    { value: null, dom: Dom.get('last_lap_time_value')    },
      // fast_lap_time:    { value: null, dom: Dom.get('fast_lap_time_value')    }
    // }


/////////////////////////////////////
// Plugin class
cr.plugins_.outrunmt = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.outrunmt.prototype;
		
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
		this.visible = (this.properties[78] === 0);		// last + 1--- 0=visible, 1=invisible
		//this.compositeOp = this.effectToCompositeOp(this.properties[0]);
		this.updateBlend(this.properties[0]);
		this.canvas = document.createElement('canvas');
		ctx = this.canvas.getContext('2d');
		lanes=(this.properties[1]);
		roadWidth=(this.properties[2]);
		cameraHeight=(this.properties[3]);
		drawDistance=(this.properties[4]);
		fieldOfView=(this.properties[5]);
		fogDensity=(this.properties[6]);
		totalCars=(this.properties[7]);
		// start r/g/r 
		COLORS.START.road=(this.properties[8]);
		COLORS.START.grass=(this.properties[8]);
		COLORS.START.rumble=(this.properties[8]);
		//  finish r/g/r 	
		COLORS.FINISH.road=(this.properties[9]);
		COLORS.FINISH.grass=(this.properties[9]);
		COLORS.FINISH.rumble=(this.properties[9]);		
		// fog
		COLORS.FOG=(this.properties[10]);
		
		// road colors 
		COLORS.LIGHT.road=(this.properties[11]);
		COLORS.DARK.road=(this.properties[12]);
		// grass colors
		COLORS.LIGHT.grass=(this.properties[13]);
		COLORS.DARK.grass=(this.properties[14]);
		
		COLORS.LIGHT.rumble=(this.properties[15]);
		COLORS.DARK.rumble=(this.properties[16]);
		
		COLORS.LIGHT.lane=(this.properties[17]);
		
		// build road segments
	    start_seg=(this.properties[18]);
		bseg1=(this.properties[19]);
		bseg2=(this.properties[20]);
		bseg3=(this.properties[21]);
		bseg4=(this.properties[22]);
		bseg5=(this.properties[23]);
		bseg6=(this.properties[24]);
		bseg7=(this.properties[25]);
		bseg8=(this.properties[26]);
		bseg9=(this.properties[27]);
		bseg10=(this.properties[28]);
		end_seg=(this.properties[29]);
		// add sprites to game l/r
		start_seg_side=(this.properties[30]);
		start_seg_bb=(this.properties[31]);
		start_seg_plts=(this.properties[32]);
		start_seg_misc=(this.properties[33]);
		
		bseg1_side=(this.properties[34]);
		bseg1_bb=(this.properties[35]);
		bseg1_plts=(this.properties[36]);
		bseg1_misc=(this.properties[37]);
		
		bseg2_side=(this.properties[38]);
		bseg2_bb=(this.properties[39]);
		bseg2_plts=(this.properties[40]);
		bseg2_misc=(this.properties[41]);
		
		bseg3_side=(this.properties[42]);
		bseg3_bb=(this.properties[43]);
		bseg3_plts=(this.properties[44]);
		bseg3_misc=(this.properties[45]);
		
		bseg4_side=(this.properties[46]);
		bseg4_bb=(this.properties[47]);
		bseg4_plts=(this.properties[48]);
		bseg4_misc=(this.properties[49]);
		
		bseg5_side=(this.properties[50]);
		bseg5_bb=(this.properties[51]);
		bseg5_plts=(this.properties[52]);
		bseg5_misc=(this.properties[53]);
		
		bseg6_side=(this.properties[54]);
		bseg6_bb=(this.properties[55]);
		bseg6_plts=(this.properties[56]);
		bseg6_misc=(this.properties[57]);
		
		bseg7_side=(this.properties[58]);
		bseg7_bb=(this.properties[59]);
		bseg7_plts=(this.properties[60]);
		bseg7_misc=(this.properties[61]);
		
		bseg8_side=(this.properties[62]);
		bseg8_bb=(this.properties[63]);
		bseg8_plts=(this.properties[64]);
		bseg8_misc=(this.properties[65]);
		
		bseg9_side=(this.properties[66]);
		bseg9_bb=(this.properties[67]);
		bseg9_plts=(this.properties[68]);
		bseg9_misc=(this.properties[69]);
		
		bseg10_side=(this.properties[70]);
		bseg10_bb=(this.properties[71]);
		bseg10_plts=(this.properties[72]);
		bseg10_misc=(this.properties[73]);
		
		end_seg_side=(this.properties[74]);
		end_seg_bb=(this.properties[75]);
		end_seg_plts=(this.properties[76]);
		end_seg_misc=(this.properties[77]);
		
	 Game.run({
      render: render, update: update, step:step, 
      images: ["background", "sprites"],
      keys: [
        { keys: [KEY.LEFT,  KEY.A], mode: 'down', action: function() { keyLeft   = true;  } },
        { keys: [KEY.RIGHT, KEY.D], mode: 'down', action: function() { keyRight  = true;  } },
        { keys: [KEY.UP,    KEY.W], mode: 'down', action: function() { keyFaster = true;  } },
        { keys: [KEY.DOWN,  KEY.S], mode: 'down', action: function() { keySlower = true;  } },
        { keys: [KEY.LEFT,  KEY.A], mode: 'up',   action: function() { keyLeft   = false; } },
        { keys: [KEY.RIGHT, KEY.D], mode: 'up',   action: function() { keyRight  = false; } },
        { keys: [KEY.UP,    KEY.W], mode: 'up',   action: function() { keyFaster = false; } },
        { keys: [KEY.DOWN,  KEY.S], mode: 'up',   action: function() { keySlower = false; } }
      ],
      ready: function(images) {
         background = images[0];
		 sprites    = images[1];
         reset();
		
      }
    });
		 
		gcanvas=this.canvas;
		 
	    
	 	this.runtime.tickMe(this);
	
	};

instanceProto.tick = function (){
			var dt = this.runtime.getDt(this);
			this.ctx=this.ctx;
			var w =this.canvas.width;
			var h=this.canvas.height;
			var xsp;
		   
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
	 
	};
		
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
	function Acts() {};
	pluginProto.acts = new Acts();
	 Acts.prototype.SetEffect = function (effect)
	 {	
		 this.compositeOp = this.effectToCompositeOp(effect);
		 this.runtime.redraw = true;
         this.update_tex = true;
	 };
		
	 
	Acts.prototype.finish_track = function ()
	{
		
		speed = Util.accelerate(speed, -maxSpeed, 0);
		keyFaster=false;
		currentLapTime=0;
	};
	
	Acts.prototype.GoLeft = function ()
	{
	     if(speed>10) playerX = playerX -0.05;
		 
		 
		
	};
	
	Acts.prototype.GoRight = function ()
	{
	     if(speed>10) playerX = playerX +0.05;
		 		
	};
	
	Acts.prototype.NotMove = function ()
	{
	     if(speed>10) playerX = playerX +0.00;
		 		
	};
	
	
	
	Acts.prototype.SetAcc = function ()
	{
		keyFaster=true;
	     speed = Util.accelerate(speed, accel, dt);
		 
		
	};
	Acts.prototype.SetDec = function ()
	{
		 
		//speed = Util.accelerate(speed, -maxSpeed, 0);
		speed = Util.accelerate(speed, decel, dt);
		keyFaster=false;
		 
		
	};
  
    // speed = Util.accelerate(speed, decel, dt);
	
	
	//////////////////////////////////////
	// Expressions
	pluginProto.exps = {};
	var exps = pluginProto.exps;
	
	
	exps.car_spd = function (ret)
	{
		 
		ret.set_int(5 * Math.round(speed/500));
	};
	
	exps.car_pos = function (ret)
	{
	   	ret.set_int(position/segmentLength);
			
	};
	
		
	exps.seg_length = function (ret)
	{
	  ret.set_int(segments.length);
		
	};
	
	exps.cur_lt = function (ret)
	{
		 
		ret.set_any(formatTime(currentLapTime));
	};
	// score ret
	exps.cur_lt_sec = function (ret)
	{
		 
		ret.set_int(score);
	};
	
	
	exps.last_lt = function (ret)
	{
		 
		ret.set_any(formatTime(lastLapTime));
	};
	
	exps.player_x = function (ret)
	{
		 
		ret.set_float(playerX);
	};
	
	exps.lap_counter = function (ret)
	{
	  ret.set_int(lapcounter);
		
	};
	exps.max_speed = function (ret)
	{
	  ret.set_int(speed/100);
		
	};

exps.endseg_height = function (ret)
	{
	  ret.set_any(lastY()/segmentLength);
		
	};	
    
    exps.AsJSON = function(ret)
    {
        ret.set_string( JSON.stringify({
			"c2array": true,
			"size": [1, 1, this.canvas.width * this.canvas.height * 4],
			"data": [[this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data]]
		}));
    };

}());