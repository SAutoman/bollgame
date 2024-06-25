// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
//           vvvvvvvvvv
cr.behaviors.RezRogue = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
	//                               vvvvvvvvvv
	var behaviorProto = cr.behaviors.RezRogue.prototype;
		
	/**
	* A* (A-Star) Pathfinding Algorithm in JavaScript
	* @author  Matthew Trost
	* @license Creative Commons Attribution-ShareAlike 3.0 Unported License
	* @datepublished December 2010
	*/
	
	function aStar (map, heuristic, cutCorners, start, goal) {
		var listOpen = [];
		var listClosed = [];
		var listPath = [];
		var nodeGoal = createTerminalNode(map, heuristic, "g", null, goal);
		var nodeStart = createTerminalNode(map, heuristic, "s", nodeGoal, start);
		addNodeToList(nodeStart, listOpen);
		
		var n;
		while (!isListEmpty(listOpen)) {
			n = returnNodeWithLowestFScore(listOpen);
			addNodeToList(n, listClosed);
			removeNodeFromList(n, listOpen);
			if (areNodesEqual(n, nodeGoal)) {
				pathTo(n, listPath);
				listPath.reverse();
				return listPath;
			}
			n.makeChildNodes(map, heuristic, cutCorners, nodeGoal);
			cullUnwantedNodes(n.childNodes, listOpen);
			cullUnwantedNodes(n.childNodes, listClosed);
			removeMatchingNodes(n.childNodes, listOpen);
			removeMatchingNodes(n.childNodes, listClosed);
			addListToList(n.childNodes, listOpen);
		}
		return null;
	}
	
	function pathTo (n, listPath) {
		listPath.push(new NodeCoordinate(n.row, n.col));
		if (n.parentNode == null)
			return;
		pathTo(n.parentNode, listPath);
	}
	
	function addListToList(listA, listB) {
		var x;
		for (x in listA)
			listB.push(listA[x]);
	}
	
	function removeMatchingNodes (listToCheck, listToClean) {
		var listToCheckLength = listToCheck.length;
		for (var i = 0; i < listToCheckLength; i++) {
			for (var j = 0; j < listToClean.length; j++) {
				if (listToClean[j].row == listToCheck[i].row && listToClean[j].col == listToCheck[i].col)
					listToClean.splice(j, 1);
			}
		}
	}
	
	function cullUnwantedNodes (listToCull, listToCompare) {
		var listToCompareLength = listToCompare.length;
		for (var i = 0; i < listToCompareLength; i++) {
			for (var j = 0; j < listToCull.length; j++) {
				if (listToCull[j].row == listToCompare[i].row && listToCull[j].col == listToCompare[i].col) {
					if (listToCull[j].f >= listToCompare[i].f)
						listToCull.splice(j, 1);
				}
			}
		}
	}
	
	function areNodesEqual (nodeA, nodeB) {
		if (nodeA.row == nodeB.row && nodeA.col == nodeB.col)
			return true;
		else
			return false;
	}
	
	function returnNodeWithLowestFScore (list) {
		var lowestNode = list[0];
		var x;
		for (x in list)
			lowestNode = (list[x].f < lowestNode.f) ? list[x] : lowestNode;
		return lowestNode;
	}
		
	function isListEmpty (list) {
		return (list.length < 1) ? true : false;
	}
	
	function removeNodeFromList (node, list) {
		var listLength = list.length;
		for (var i = 0; i < listLength; i++) {
			if (node.row == list[i].row && node.col == list[i].col) {
				list.splice(i, 1);
				break;
			}
		}
	}
	
	function addNodeToList (node, list) {
		list.push(node);
	}
	
	function createTerminalNode (map, heuristic, nodeType, nodeGoal, target) {
		if (nodeType == "s") {return new Node(target.row, target.col, map, heuristic, null, nodeGoal);};
		if (nodeType == "g") {return new Node(target.row, target.col, map, heuristic, null, nodeGoal);};
		return null;
	}
	
	function returnHScore (node, heuristic, nodeGoal) {
		var y = Math.abs(node.row - nodeGoal.row);
		var x = Math.abs(node.col - nodeGoal.col);
		switch (heuristic) {
			case "manhattan":
				return (y + x) * 10;
			case "diagonal":
				return (x > y) ? (y * 14) + 10 * (x - y) : (x * 14) + 10 * (y - x);
			case "euclidean":
				return Math.sqrt((x * x) + (y * y));
			default:
				return null;
		}
	}
	
	function NodeCoordinate (row, col) {
		this.row = row;
		this.col = col;
	}
	
	function Node (row, col, map, heuristic, parentNode, nodeGoal) {
		var mapLength = map.length;
		var mapRowLength = map[0].length;
		this.row = row;
		this.col = col;
		this.northAmbit = (row == 0) ? 0 : row - 1;
		this.southAmbit = (row == mapLength - 1) ? mapLength - 1 : row + 1;
		this.westAmbit = (col == 0) ? 0 : col - 1;
		this.eastAmbit = (col == mapRowLength - 1) ? mapRowLength - 1 : col + 1;
		this.parentNode = parentNode;
		this.childNodes = [];
	
		if (parentNode != null) {
			if (row == parentNode.row || col == parentNode.col)
				this.g = parentNode.g + 10;
			else
				this.g = parentNode.g + 14;
			this.h = returnHScore(this, heuristic, nodeGoal);
		}
		else {
			this.g = 0;
			if (map[row][col].node_type == "s")
				this.h = returnHScore(this, heuristic, nodeGoal);
			else
				this.h = 0;
		}
		this.f = this.g + this.h;
		
		this.makeChildNodes = function (map, heuristic, cutCorners, nodeGoal) {
			for (var i = this.northAmbit; i <= this.southAmbit; i++) {
				for (var j = this.westAmbit; j <= this.eastAmbit; j++) {
					if (i != this.row || j != this.col) {
						if (map[j][i].node_type != "u") {
							if (cutCorners == true) 
								this.childNodes.push(new Node(i, j, map, heuristic, this, nodeGoal));
							else {
								if (i == this.row || j == this.col)
									this.childNodes.push(new Node(i, j, map, heuristic, this, nodeGoal));	
							}
						}
					}
				}
			}
		}
	}
	
	function createMap(w,h)
	{
		if (!w) {return false};
		if (!h) {return false};
	
		var map = [];
		map.length = h;
	
		for (var i = 0; i < w; i++)
		{
			map[i] = [];
			for (var j = 0; j < h; j++)
			{
				// Push a seeable and walkable not seen tile onto the map:
				var tile = {
					node_type: "w",
					block_sight: false,
					walkable: true,
					sight: true,
					already_seen: false
				};
				
				map[i].push(tile);
			};
		};
		
		return map;
	};
	
	function clearMap(map, walkable, block_sight, seen)
	{
		var w, h;
		
		h = map.length;
		w = map[0].length;
		
		for (var i = 0; i < w; i++)
		{
			for (var j = 0; j < h; j++)
			{
				if (walkable) {map.node_type = "w"};
				if (!walkable) {map.node_type = "u"};
				map.block_sight = block_sight;
				map.walkable = walkable;
				map.already_seen = seen;
			};
		};

		return true;
	};
	
	function grid(i, tile)
	{
		return Math.round(i/tile);
	};
	
	function snap(i, tile)
	{
		return Math.round(i/tile) * tile;
	};
	
	function nextStep(x1, y1, x2, y2, ts, runtime, inst)
	{
		// this finds the difference between two coords in grid and returns a pixel step for each x and y
		var count, step, dt;
		count = 0;
		
		dt = runtime.getDt(inst);
		step = [0, true];
		
		x1 = grid(x1, ts); // Gridize.
		y1 = grid(y1, ts);
		x2 = grid(x2, ts);
		y2 = grid(y2, ts);
		
		// 1 = up, 2 = down, 4 = left, 8 = right: bitwise operation here:
		if (x1 - x2 > 0) {step[0] = -ts; step[1] = true}; // right
		if (x1 - x2 < 0) {step[0] = ts; step[1] = true}; // left
		if (y1 - y2 > 0) {step[0] = -ts; step[1] = false}; // down
		if (y1 - y2 < 0) {step[0] = ts; step[1] = false}; // up
		//if ((x1 == x2) && (y1 == y2)) {step[0] = 0};
		
		// returns a step increment and true if x else false if y e.g. [0.8,true]
		return step;
	};
	
	// Bresenheim:
	function line(x1,y1,x2,y2)
	{
		var coordinatesArray = new Array();

		// Define differences and error check
		var dx = Math.abs(x2 - x1);
		var dy = Math.abs(y2 - y1);
		var sx = (x1 < x2) ? 1 : -1;
		var sy = (y1 < y2) ? 1 : -1;
		var err = dx - dy;
		// Set first coordinates
		coordinatesArray.push([x1, y1]);
		// Main loop
		while (!((x1 == x2) && (y1 == y2))) {
			var e2 = err << 1;
			if (e2 > -dy)
			{
				err -= dy;
				x1 += sx;
			}
			if (e2 < dx)
			{
				err += dx;
				y1 += sy;
			}
		// Set coordinates
		coordinatesArray.push([x1, y1]);
		}
		// Return the result
		return coordinatesArray;
	};
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
	
	behinstProto.calculatePath = function(diag, h)
	{
		// this.map, this.start, this.goal, 
		var path, start_x, start_y, goal_x, goal_y;
		
		this.start.col = Math.max(0, Math.min(this.gw, this.start.col));
		this.start.row = Math.max(0, Math.min(this.gh, this.start.row));
		this.goal.col = Math.max(0, Math.min(this.gw, this.goal.col));
		this.goal.row = Math.max(0, Math.min(this.gh, this.goal.row));
		
		start_x = this.start.col;
		start_y = this.start.row;
		goal_x = this.goal.col;
		goal_y = this.goal.row;
		
		if (this.map[start_x][start_y].node_type == "u") {return null};
		if (this.map[goal_x][goal_y].node_type == "u") {return null};
	
		this.map[start_x][start_y].node_type = "s";
		this.map[goal_x][goal_y].node_type = "g";
		
		path = aStar(this.map, h, diag, this.start, this.goal);
		
		this.map[start_x][start_y].node_type = "w";
		this.map[goal_x][goal_y].node_type = "w";
		
		return path;
	};
	
	behinstProto.calculateSight = function(px, py, pixels)
	{
		
		// map, px, py, grid, gWidth, gHeight, ts, offset, radius
		var end, lineCoord, rr, i, j, lx, ly, r, up = new Array(), down = new Array(), left = new Array(), right = new Array();
		var tx, ty, rx, ry, dx, dy, mx, my, x, y;
		
		if (pixels)
		{
			x = grid(px, this.ts);
			y = grid(py, this.ts);
		}
		else
		{
			x = px;
			y = py;
		}
		
		if (x < 0) {x = 0};
		if (x > this.gw - 1) {x = this.gw - 1};
		if (y < 0) {y = 0};
		if (y > this.gh - 1) {y = this.gh - 1};
		
		tx = x - this.radius;
		ty = y - this.radius;
		rx = x + this.radius + 1;
		ry = y + this.radius + 1;
		
		if (tx < 0) {tx = 0};
		if (tx > this.gw) {tx = this.gw - 1};
		if (ty < 0) {ty = 0};
		if (ty > this.gh) {ty = this.gh - 1};
		if (rx > this.gw) {rx = this.gw - 1};
		if (ry > this.gh) {ry = this.gh - 1};
		
		lx = 0;
		ly = 0;
		
		for (mx = 0; mx < this.gw; mx++)
		{
			for (my = 0; my < this.gh; my++)
			{
				this.map[mx][my].sight = false; // clear map so no cells are seen yet
			}
		}
			
			// calculate fov and store in the main sight grid:
			for (i = tx; i < rx+1; i++)
			{
					up = line(x,y,i,ty);
				
					for (lineCoord = 0; lineCoord < up.length; lineCoord++)
					{
						lx = up[lineCoord][0];
						ly = up[lineCoord][1];
						
						dx = Math.abs(x - lx); // work out the length of x
						dy = Math.abs(y - ly); // work out the length of y
						
						r = this.radius;
						
						rr = Math.sqrt((dx*dx) + (dy*dy));
						
						if (rr <= r)
						{
							if (this.map[lx][ly].block_sight == true) // if cell blocks sight:
							{
								this.map[lx][ly].sight = true;
								this.map[lx][ly].already_seen = true;
								break;
							}
							else
							{
								this.map[lx][ly].sight = true; // set the sight array coord to true because it can be seen!
								this.map[lx][ly].already_seen = true;
							}
						};
					}
					
					down = line(x,y,i,ry);
					
					for (lineCoord = 0; lineCoord < down.length; lineCoord++)
					{
						lx = down[lineCoord][0];
						ly = down[lineCoord][1];
						
						dx = Math.abs(x - lx); // work out the length of x
						dy = Math.abs(y - ly); // work out the length of y
						
						r = this.radius;
						
						rr = Math.sqrt((dx*dx) + (dy*dy));
						
						if (rr <= r)
						{
							if (this.map[lx][ly].block_sight == true) // if cell blocks sight:
							{
								this.map[lx][ly].sight = true;
								this.map[lx][ly].already_seen = true;
								break;
							}
							else
							{
								this.map[lx][ly].sight = true; // set the sight array coord to true because it can be seen!
								this.map[lx][ly].already_seen = true;
							}
						};
					}
			}
			
			for (j = ty; j < ry; j++) // work out the left and right:
			{
					left = line(x,y,tx,j);
					
					for (lineCoord = 0; lineCoord < left.length; lineCoord++)
					{
						lx = left[lineCoord][0];
						ly = left[lineCoord][1];
						
						dx = Math.abs(x - lx); // work out the length of x
						dy = Math.abs(y - ly); // work out the length of y
						
						r = this.radius;
						
						rr = Math.sqrt((dx*dx) + (dy*dy));
						
						if (rr <= r)
						{
							if (this.map[lx][ly].block_sight == true) // if cell blocks sight:
							{
								this.map[lx][ly].sight = true;
								this.map[lx][ly].already_seen = true;
								break;
							}
							else
							{
								this.map[lx][ly].sight = true; // set the sight array coord to true because it can be seen!
								this.map[lx][ly].already_seen = true;
							}
						};
					}
					
					right = line(x,y,rx,j);
					
					for (lineCoord = 0; lineCoord < right.length; lineCoord++)
					{
						lx = right[lineCoord][0];
						ly = right[lineCoord][1];
						
						dx = Math.abs(x - lx); // work out the length of x
						dy = Math.abs(y - ly); // work out the length of y
						
						r = this.radius;
						
						rr = Math.sqrt((dx*dx) + (dy*dy));
						
						if (rr <= r)
						{
							if (this.map[lx][ly].block_sight == true) // if cell blocks sight:
							{
								this.map[lx][ly].sight = true;
								this.map[lx][ly].already_seen = true;
								break;
							}
							else
							{
								this.map[lx][ly].sight = true; // set the sight array coord to true because it can be seen!
								this.map[lx][ly].already_seen = true;
							}
						};
					}
			}
			
		return true;
	};
	
	behinstProto.setCells = function(obj, walkable, block_sight)
	{
		var sol, length, i, x, y;
		
		sol = obj.instances;
		length = sol.length;
		
		for (i = 0; i < length; i++)
		{
			x = grid(sol[i].x, this.ts);
			y = grid(sol[i].y, this.ts);
			
			if ((x > -1 && x < this.gw) && (y > -1 && y < this.gh))
			{
				if (walkable != null)
				{
					if (walkable) {this.map[x][y].node_type = 'w';} else {this.map[x][y].node_type = 'u'};
					this.map[x][y].walkable = walkable;
				}
				
				if (block_sight != null)
				{
					this.map[x][y].block_sight = block_sight;
				}
			}
		}
	};

	behinstProto.nextPosition = function(last)
	{
		if (!this.path) {return};
		
		if (this.position > this.path.length - 2 - last) {this.position = 0; this.path = null}
		else {this.position += 1};
	};
	
	behinstProto.nextDirection = function(last)
	{
		var c, n, cx, cy, nx, ny, l;
		
		this.stepX = (this.maxDistance * this.difference) / this.speed;
		this.stepY = this.stepX;
		
		if (this.path != null)
		{
			l = this.path.length;
			c = this.position;
	
			n = c + 1;
			
			cx = this.path[c].row;
			cy = this.path[c].col;
				
			if (this.path[n].row || this.path[n].col)
			{
				nx = this.path[n].row;
				ny = this.path[n].col;
			}
			else
			{
				nx = cx;
				ny = cy;
			};
			
			if ((cx - nx < 0) && (cy - ny < 0)) {return "down-right"};
			if ((cx - nx > 0) && (cy - ny > 0)) {this.stepY *= -1; this.stepX *= -1; return "up-left"};
			if ((cx - nx < 0) && (cy - ny > 0)) {this.stepX *= -1; return "down-left"};
			if ((cx - nx > 0) && (cy - ny < 0)) {this.stepY *= -1; return "up-right"};
			if ((cx - nx == 0) && (cy - ny == 0)) {this.stepX = 0; this.stepY = 0; return "finished"};
			if ((cx - nx == 0) && (cy - ny < 0)) {this.stepY = 0; return "right"};
			if ((cx - nx == 0) && (cy - ny > 0)) {this.stepX *= -1; this.stepY = 0; return "left"};
			if ((cx - nx < 0) && (cy - ny == 0)) {this.stepX = 0; return "down"};
			if ((cx - nx > 0) && (cy - ny == 0)) {this.stepX = 0; this.stepY *= -1; return "up"};
		}
		else {return "none"; this.stepX = 0; this.stepY = 0};
	};
	
	behinstProto.onCreate = function()
	{
		var tx, ty, layout, lw, lh;
	
		// Load properties
		this.ts = this.properties[0]; // Designated tile size.
		this.radius = this.properties[1];
		
		// object is sealed after this call, so make sure any properties you'll ever need are created, e.g.
		// this.myValue = 0;
		
		// Auto movement:
		this.distance = this.ts;
		this.maxDistance = this.distance;
		this.last = 1;
		this.kahan = this.runtime.kahanTime.sum;
		this.speed = 0.2;
		this.autoMove = false;
		this.difference = 0;
		
		layout = this.runtime.running_layout;
		
		this.gw = grid(layout.width, this.ts);
		this.gh = grid(layout.height, this.ts);
		
		this.map = createMap(this.gw, this.gh);
		
		this.start = new NodeCoordinate(grid(this.inst.x, this.ts), grid(this.inst.x, this.ts));
		this.goal = new NodeCoordinate(this.gw, this.gh);
		
		this.path = null;
		this.position = 0;
		
		this.stepX = 0;
		this.stepY = 0;
		
		this.forX = 0;
		this.forY = 0;
	};

	behinstProto.tick = function ()
	{
		var dt = this.runtime.getDt(this.inst);
		
		// called every tick for you to update this.inst as necessary
		// dt is the amount of time passed since the last tick, in case it's a movement
		
		// WIP code here could uncover but not finished!!!
		
		//this.difference = this.runtime.kahanTime.sum - this.kahan;
		
		if (this.automove)
		{
		if (this.path != null)
		{
			if (this.path.length > 0)
			{
				if (this.distance > 0) // If distance is greater than zero:
				{
					this.nextDirection();
					this.inst.x += this.stepX;
					this.inst.y += this.stepY;
					this.distance -= (this.maxDistance * this.difference) / this.speed;
					this.inst.set_bbox_changed();
				}
				else
				{
					this.inst.x = grid(this.inst.x, this.ts) * this.ts; // Gridise x coord.
					this.inst.y = grid(this.inst.y, this.ts) * this.ts; // Gridise y coord.
					this.inst.set_bbox_changed();
					this.nextPosition(this.last);
					this.nextDirection();
					this.distance += this.maxDistance;
				};
			};
		};
		
		this.kahan = this.runtime.kahanTime.sum;
		
		};
	};

	//////////////////////////////////////
	// Conditions
	behaviorProto.cnds = {};
	var cnds = behaviorProto.cnds;

	cnds.ArrayForEach = function (px, py, measure)
	{
        var current_event = this.runtime.getCurrentEventStack().current_event;
        
		var fx, fy, frx, fry, x, y;
		
		if (measure == 0)
		{
			x = grid(px, this.ts);
			y = grid(py, this.ts);
		}
		else
		{
			x = px;
			y = py;
		}
		
		fx = x - this.radius;
		fy = y - this.radius;
		frx = x + this.radius + 1;
		fry = y + this.radius + 1;
		
		this.forX = fx;
		this.forY = fy;
		
		if (fx < 0) {fx = 0};
		if (fx > this.gw) {fx = this.gw};
		if (fy < 0) {fy = 0};
		if (fy > this.gh) {fy = this.gh};
		if (frx > this.gw) {frx = this.gw};
		if (fry > this.gh) {fry = this.gh};

		for (this.forX = fx; this.forX < frx; this.forX++)
		{
			for (this.forY = fy; this.forY < fry; this.forY++)
			{
				this.runtime.pushCopySol(current_event.solModifiers);
				current_event.retrigger();
				this.runtime.popSol(current_event.solModifiers);
			}			
		}
		this.forX = fx;
		this.forY = fy;
		
		return true;
	};
	
	cnds.ArrayForEachSelf = function ()
	{
        var current_event = this.runtime.getCurrentEventStack().current_event;
        
		var fx, fy, frx, fry, x, y, i, j;
		
		x = grid(this.inst.x, this.ts);
		y = grid(this.inst.y, this.ts);
		
		fx = x - this.radius;
		fy = y - this.radius;
		frx = x + this.radius + 1;
		fry = y + this.radius + 1;
		
		this.forX = fx;
		this.forY = fy;
		
		if (fx < 0) {fx = 0};
		if (fx > this.gw) {fx = this.gw};
		if (fy < 0) {fy = 0};
		if (fy > this.gh) {fy = this.gh};
		if (frx > this.gw) {frx = this.gw};
		if (fry > this.gh) {fry = this.gh};

		for (this.forX = fx; this.forX < frx; this.forX++)
		{
			for (this.forY = fy; this.forY < fry; this.forY++)
			{
				if (!this.map[this.forX][this.forY].block_sight)
				{
					this.runtime.pushCopySol(current_event.solModifiers);
					current_event.retrigger();
					this.runtime.popSol(current_event.solModifiers);
				};
			}			
		}
		
		this.forX = fx;
		this.forY = fy;
		
		return false;
	};
	
	cnds.CheckSightTile = function (px, py, measure, cmp)
	{
		var x, y;
		
		if (measure == 0)
		{
			x = grid(px, this.ts);
			y = grid(py, this.ts);
		}
		else
		{
			x = px;
			y = py;
		}
		
		if (x < 0) {x = 0};
		if (x > this.gw-1) {x = this.gw-1};
		if (y < 0) {y = 0};
		if (y > this.gh-1) {y = this.gh-1};
		
		switch (cmp)
		{
			case 0:
				return this.map[x][y].sight;
				break;
			case 1:
				return !this.map[x][y].sight;
				break;
			case 2:
				return this.map[x][y].already_seen;
				break;
			case 3:
				return !this.map[x][y].already_seen;
				break;
			case 4:
				return this.map[x][y].sight && this.map[x][y].already_seen;
				break;
			case 5:
				return this.map[x][y].sight && !this.map[x][y].already_seen;
				break;
			case 6:
				return !this.map[x][y].sight && this.map[x][y].already_seen;
				break;
			case 7:
				return !this.map[x][y].sight && !this.map[x][y].already_seen;
				break;
			default:
				return false;
		};
	};
	
	// the example condition
	cnds.IsMoving = function ()
	{
		// ... see other behaviors for example implementations ...
		return false;
	};

	//////////////////////////////////////
	// Actions
	behaviorProto.acts = {};
	var acts = behaviorProto.acts;

	acts.CreateSightTiles = function (obj, layer, opacity)
	{
		var fx, fy, frx, fry, x, y, i, j, temp, top, dist, maxdist;
		
		x = grid(this.inst.x, this.ts);
		y = grid(this.inst.y, this.ts);
		
		fx = x - this.radius;
		fy = y - this.radius;
		frx = x + this.radius + 1;
		fry = y + this.radius + 1;
		
		if (fx < 0) {fx = 0};
		if (fx > this.gw) {fx = this.gw};
		if (fy < 0) {fy = 0};
		if (fy > this.gh) {fy = this.gh};
		if (frx > this.gw) {frx = this.gw};
		if (fry > this.gh) {fry = this.gh};

		for (i = fx; i < frx; i++)
		{
			for (j = fy; j < fry; j++)
			{
				if (this.map[i][j].sight)
				{
					// create obj
					temp = this.runtime.createInstance(obj, layer);
					temp.x = i * this.ts;
					temp.y = j * this.ts;
					dist = Math.sqrt(((this.inst.x - temp.x) * (this.inst.x - temp.x)) + ((this.inst.y - temp.y) * (this.inst.y - temp.y)));
					maxdist = this.ts * (this.radius + 1);
					top = opacity - ( opacity / ( maxdist / dist ) );
					temp.opacity = top;
					// cr.clamp(x, a, b)
					this.runtime.redraw = true;
				};
			}			
		}
		
		//this.runtime.redraw = true;
		this.runtime.tickMe(this);
	};
	
	acts.FindPath = function (sx, sy, gx, gy, measure, h, diag)
	{
		var heuristic, tx, ty;
		
		if (diag == 0) {diag = true} else {diag = false};
		
		if (measure == 0) // if parameters are sent in pixels:
		{
			sx = grid(sx, this.ts);
			sy = grid(sy, this.ts);
			gx = grid(gx, this.ts);
			gy = grid(gy, this.ts);
		} // if not leave them as grid coords.
		
		switch (h)
		{
			case 0:
				heuristic = "manhattan";
				break;
			case 1:
				heuristic = "diagonal";
				break;
			case 2:
				heuristic = "euclidean";
				break;
		}
		
		this.start.row = sy;
		this.start.col = sx;
		this.goal.row = gy;
		this.goal.col = gx;
		
		this.position = 0;
		this.path = null;
		
		this.path = this.calculatePath(diag, heuristic);
	};
	
	acts.FindPathFromSelf = function (gx, gy, measure, h, diag)
	{
		var heuristic, tx, ty, sx, sy;
		
		if (diag == 0) {diag = true} else {diag = false};
		
		if (measure == 0) // if parameters are sent in pixels:
		{
			sx = grid(this.inst.x, this.ts);
			sy = grid(this.inst.y, this.ts);
			gx = grid(gx, this.ts);
			gy = grid(gy, this.ts);
		} // if not leave them as grid coords.
		
		switch (h)
		{
			case 0:
				heuristic = "manhattan";
				break;
			case 1:
				heuristic = "diagonal";
				break;
			case 2:
				heuristic = "euclidean";
				break;
		}
		
		this.start.row = sy;
		this.start.col = sx;
		this.goal.row = gy;
		this.goal.col = gx;
		
		this.path = this.calculatePath(diag, heuristic);
	};
	
	acts.BlockPathUsingObject = function (obj)
	{
		this.setCells(obj, false, null)
	};
	
	acts.UnblockPathUsingObject = function (obj)
	{
		this.setCells(obj, true, null)
	};
	
	acts.BlockSightUsingObject = function (obj)
	{
		this.setCells(obj, null, true)
	};
	
	acts.UnblockSightUsingObject = function (obj)
	{
		this.setCells(obj, null, false)
	};
	
	acts.UnblockBothUsingObject = function (obj)
	{
		this.setCells(obj, true, false)
	};
	
	acts.BlockBothUsingObject = function (obj)
	{
		this.setCells(obj, false, true)
	};
	
	acts.NextPathPosition = function (last)
	{
		this.last = last;
		this.nextPosition(last);
	};
	
	acts.PreviousPathPosition = function ()
	{
		if (!this.path) {return};
		
		this.position -= 1;
		if (this.position < 0) {this.position = 0};
	};
	
	// the example action
	acts.Stop = function ()
	{
		// ... see other behaviors for example implementations ...
	};
		
	acts.CalculateSight = function ()
	{
		this.calculateSight(this.inst.x, this.inst.y, true);
	};	
	
	//////////////////////////////////////
	// Expressions
	behaviorProto.exps = {};
	var exps = behaviorProto.exps;

	// the example expression
	exps.MyExpression = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.stepY);				// return our value
		// ret.set_float(0.5);			// for returning floats
		//ret.set_string(this.test2.toString());		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};
	
	exps.PathX = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		// Need to compensate layout movement with layout.viewLeft,  layout.viewTop and layout.scale!!
		var length;
		
		length = 0;
		
		if (this.path != null) {length = this.path.length};
		
		if (this.path != null && length >= this.position)
		{
			var layer = this.inst.layer;
			var tx = this.path[this.position].col * this.ts;
			tx += layer.viewLeft;
			tx *= layer.scale;
			ret.set_int(tx);
		} 
		else
		{
			ret.set_int(this.inst.x)
		}
	};
	
	exps.PathY = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		// Need to compensate layout movement with layout.viewLeft,  layout.viewTop and layout.scale!!
		var length;
		
		length = 0;
		
		if (this.path != null) {length = this.path.length};
		
		if (this.path != null && length >= this.position)
		{
			var layer = this.inst.layer;
			var ty = this.path[this.position].row * this.ts;
			ty += layer.viewLeft;
			ty *= layer.scale;
			ret.set_int(ty);
		}
		else
		{
			ret.set_int(this.inst.y)
		}
	};
	
	exps.StepX = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_float(this.stepX);				// return our value
	};
	
	exps.StepY = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_float(this.stepY);				// return our value
	};
	
	exps.CurrentSightX = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.forX * this.ts);				// return our value
	};
	
	exps.CurrentSightY = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.forY * this.ts);				// return our value
	};
	
}());