// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.gamemonetize = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	var pluginProto = cr.plugins_.gamemonetize.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		window["gamemonetize"]={};
		window["SDK_OPTIONS"]={};
	};

	var instanceProto = pluginProto.Instance.prototype;
	
	var isSupported = false;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{		
		if (!window["gamemonetize"] && !window["SDK_OPTIONS"])
		{
			cr.logexport("[Construct 2] GameMonetize.com SDK is required to show advertisements within Cordova; other platforms are not supported.");
			return;
		}		
		
		isSupported = true;
		
		this.gamemonetize = window["gamemonetize"];

		// Attach events
		var self = this;
		
		this.gamemonetize["onInit"] = function ()
		{
            cr.logexport("GameMonetize.com SDK: onInit");
			self.isShowingBannerAd = false;
			self.runtime.trigger(cr.plugins_.gamemonetize.prototype.cnds.onInit, self);
		};
		
		this.gamemonetize["onError"] = function ()
		{
			cr.logexport("GameMonetize.com SDK: onError");
			self.isShowingBannerAd = true;
			self.runtime.trigger(cr.plugins_.gamemonetize.prototype.cnds.onError, self);
		};
		
		this.gamemonetize["onResumeGame"] = function ()
		{
			cr.logexport("GameMonetize.com SDK: onResume");
			self.isShowingBannerAd = false;
			self.runtime.trigger(cr.plugins_.gamemonetize.prototype.cnds.onResumeGame, self);
		};
		
		this.gamemonetize["onPauseGame"] = function ()
		{
			cr.logexport("GameMonetize.com SDK: onPauseGame");
			self.isShowingBannerAd = true;
			self.runtime.trigger(cr.plugins_.gamemonetize.prototype.cnds.onPauseGame, self);
		};

		// Init sdk
		this.gamemonetize["InitAds"] = function ()
		{
            window["SDK_OPTIONS"] = {
                "gameId": self.properties[0],
                "advertisementSettings": {
                    "autoplay": false
                },
                "onEvent": function(event) {
                    switch (event.name) {
                        case "SDK_GAME_START":
                            self.gamemonetize["onResumeGame"]();
                            break;
                        case "SDK_GAME_PAUSE":
                            self.gamemonetize["onPauseGame"]();
                            break;
                        case "SDK_READY":
                            self.gamemonetize["onInit"]();
                            break;
                        case "SDK_ERROR":
                            self.gamemonetize["onError"]();
                            break;
                    }
                }
            };
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://api.gamemonetize.com/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'gamemonetize-sdk'));
		}

	};
	
	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.IsShowingBanner = function()
	{
		return this.isShowingBannerAd;
	};
	
	Cnds.prototype.onInit = function()
	{
		return true;
	};
	
	Cnds.prototype.onError = function(data)
	{
		return true;
	};
	
	Cnds.prototype.onResumeGame = function(data)
	{
		return true;
	};
	
	Cnds.prototype.onPauseGame = function(data)
	{
		return true;
	};

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.ShowBanner = function ()
	{
		if (!isSupported) return;
		
		if (typeof (window["sdk"]["showBanner"]) === "undefined")
		{
			cr.logexport("GameMonetize.com SDK is not loaded or an ad blocker is present.");
			this.gamemonetize["onResumeGame"]();
			return;
		}

        window["sdk"]["showBanner"]();
		cr.logexport("ShowBanner");
		
		this.isShowingBannerAd = true;
	};

	Acts.prototype.PlayLog = function ()
	{
		if (!isSupported) return;

		if (typeof (window["sdk"]["play"]) === "undefined")
		{
			cr.logexport("GameMonetize.com SDK is not loaded.");
			this.gamemonetize["onResumeGame"]();
			return;
		}

        window['sdk']["play"]();
	};

	Acts.prototype.CustomLog = function ()
	{
		if (!isSupported) return;

		if (typeof (window['sdk']["customLog"]) === "undefined")
		{
			cr.logexport("GameMonetize.com SDK is not loaded.");
			this.gamemonetize["onResumeGame"]();
			return;
		}

        window['sdk']["customLog"]();
	};

	Acts.prototype.InitAds = function ()
	{
		if (!isSupported) return;

		this.gamemonetize["InitAds"]();
	};
	
	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	pluginProto.exps = new Exps();

}());