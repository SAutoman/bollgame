// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");
cr.plugins_.Splaash = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.Splaash.prototype;
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;
	typeProto.onCreate = function()
	{
		if(this.runtime.isBlackberry10 || this.runtime.isWindows8App || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81){
			var scripts=document.getElementsByTagName("script");
			var scriptExist=false;
			for(var i=0;i<scripts.length;i++){
				if(scripts[i].src.indexOf("cordova.js")!=-1||scripts[i].src.indexOf("phonegap.js")!=-1){
					scriptExist=true;
					break;
				}
			}
			if(!scriptExist){
				var newScriptTag=document.createElement("script");
				newScriptTag.setAttribute("type","text/javascript");
				newScriptTag.setAttribute("src", "cordova.js");
				document.getElementsByTagName("head")[0].appendChild(newScriptTag);
			}
		}	
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	function decimalColorToHTMLcolor(number) {
    //converts to a integer
    var intnumber = number - 0;
 
    // isolate the colors - really not necessary
    var red, green, blue;
 
    // needed since toString does not zero fill on left
    var template = "#000000";
 
    // in the MS Windows world RGB colors
    // are 0xBBGGRR because of the way Intel chips store bytes
    red = (intnumber&0x0000ff) << 16;
    green = intnumber&0x00ff00;
    blue = (intnumber&0xff0000) >>> 16;
 
    // mask out each color and reverse the order
    intnumber = red|green|blue;
 
    // toString converts a number to a hexstring
    var HTMLcolor = intnumber.toString(16);
 
    //template adds # for standard HTML #RRGGBB
    HTMLcolor = template.substring(0,7 - HTMLcolor.length) + HTMLcolor;
 
    return HTMLcolor;
} 
	var instanceProto = pluginProto.Instance.prototype;
	instanceProto.onCreate = function()
	{
		//center = position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
		// top center = position:fixed;top:0px;left:50%;transform:translate(-50%,0%);
		// bottom center = position:fixed;bottom:0px;left:50%;transform:translate(-50%,0%);
		// frame = width: 90%; height:90%; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
		// center = max-width:480px;width:100%;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
	this.autoHideSplash = this.properties[0];
	this.autoHideSeconds = this.properties[1];
	this.Background = decimalColorToHTMLcolor(this.properties[2]);
	this.SplashImagePosition = this.properties[3];
	this.SplashImage = this.properties[4];
	this.SplashCSS = this.properties[5];
	this.Ads = this.properties[6];
	this.AdsMobile = this.properties[7];
	document.getElementById('c2canvasdiv').style.display = 'none';
	$("head").append("<style>html, body {background-color:" + this.Background + ";}</style>");
	
	var self=this;
	if ((this.runtime.isAndroid || this.runtime.isiOS || this.runtime.isWindowsPhone8 || this.runtime.isWindowsPhone81)){
	if (self.SplashImage != "") {
	jQuery('body').prepend("<div id='splashdiv' style='background:url("+ this.SplashImage +") no-repeat center center;min-height:100%;min-width: 100%;/* height: 100%; */position: fixed;background-size: contain;'></div>");
	}else{
	jQuery('body').prepend("<div id='splashdiv' style='max-width:100%;width: 100%; height:100%; position: fixed;'>" + self.AdsMobile + "</div>");	
	}
	}else{
	if (self.SplashImage != "") {
	if (self.SplashImagePosition == 0) {
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ this.SplashCSS +"'></div>");
	}else if(self.SplashImagePosition == 1){
	var position = "max-width:100%;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}else if(self.SplashImagePosition == 2){
	var position = "max-width:100;%position:fixed;top:0px;left:50%;transform:translate(-50%,0%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}else if(self.SplashImagePosition == 3){
	var position = "max-width:100;%position:fixed;bottom:0px;left:50%;transform:translate(-50%,0%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}else if(self.SplashImagePosition == 4){
	var position = "max-width:100;%position:fixed;top:50%;left:0%;transform:translate(0%,-50%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}else if(self.SplashImagePosition == 5){
	var position = "max-width:100;%position:fixed;top:0%;left:0%;transform:translate(0%,0%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}else if(self.SplashImagePosition == 6){
	var position = "max-width:100;%position:fixed;bottom:0%;left:0%;transform:translate(0%,0%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}else if(self.SplashImagePosition == 7){
	var position = "max-width:100;%position:fixed;top:50%;right:0%;transform:translate(0%,-50%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}else if(self.SplashImagePosition == 8){
	var position = "max-width:100;%position:fixed;top:0%;right:0%;transform:translate(0%,-0%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}else if(self.SplashImagePosition == 9){
	var position = "max-width:100;%position:fixed;bottom:0%;right:0%;transform:translate(0%,-0%);";
	jQuery('body').prepend("<div id='splashdiv'><img id='splashimage' src='" + this.SplashImage + "' style='"+ position +"'></div>");
	}
	}else{
	jQuery('body').prepend("<div id='splashdiv' style='max-width:100%;width: 100%; height:100%; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);'>" + self.Ads + "</div>");
	}
	}
	if (self.autoHideSplash == 1) {
				setTimeout(function() {
						$( "#splashdiv" ).remove();
						document.getElementById('c2canvasdiv').style.display = 'block';
						//document.getElementById('splashdiv').style.display = 'none';
						//$( "#splashdiv" ).remove();
						self.runtime.trigger(cr.plugins_.Splaash.prototype.cnds.OnSplashHide, self); 
					}, self.autoHideSeconds * 1000);			
				}
	};
	instanceProto.draw = function(ctx)
	{
	};
	instanceProto.drawGL = function (glw)
	{
	};
	function Cnds() {};
	Cnds.prototype.OnSplashHide = function ()
	{	
		return true;
	};	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};
	Acts.prototype.HideSplash = function ()
	{
		$( "#splashdiv" ).remove();
		document.getElementById('c2canvasdiv').style.display = 'block';
		//document.getElementById('splashdiv').style.display = 'none';
		var self=this;
		self.runtime.trigger(cr.plugins_.Splaash.prototype.cnds.OnSplashHide, self); 
	};	
	pluginProto.acts = new Acts();
	function Exps() {};
	pluginProto.exps = new Exps();
}());