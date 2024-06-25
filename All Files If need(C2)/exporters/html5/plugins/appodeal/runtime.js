"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

cr.plugins_.appodeal = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{

	var pluginProto = cr.plugins_.appodeal.prototype;

	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	var appKey;
	
	typeProto.onCreate = function()
	{
	};

	var appodealRuntime = null;

	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
		appodealRuntime = this.runtime;

		if (!(this.runtime.isAndroid))
			return;
					
		if (this.runtime.isAndroid){
			appKey = this.properties[0];
		}

		if (typeof window["Appodeal"] == "undefined") {
			return;
		}

	};
	
	instanceProto.draw = function(ctx)
	{
	};
	
	instanceProto.drawGL = function (glw)
	{
	};
	
	function indexShow(i)
	{
		switch (i) {
			case 0:		return 1;
			case 1:		return 2;
			case 2:		return 3;
			case 3:		return 4;
			case 4:		return 8;
			case 5:		return 16;
			case 6:		return 32;
			case 7:		return 128;
			case 8:		return 128;
		}
		return 0;
	};
	
	function indexShowIfLoaded(i)
	{
		switch (i) {
			case 0:		return 1;
			case 1:		return 2;
			case 2:		return 3;
			case 3:		return 128;
			case 4:		return 128;
		}
		return 0;
	};
	
	function indexInitialize(i)
	{
		switch (i) {
			case 0:		return 1;
			case 1:		return 2;
			case 2:		return 4;
			case 3:		return 128;
			case 4:		return 128;
		}
		return 0;
	};

	function indexCache(i)
	{
		switch (i) {
			case 0:		return 1;
			case 1:		return 2;
			case 2:		return 3;
			case 3:		return 4;
			case 4:		return 128;
			case 5:		return 128;
		}
		return 0;
	};
	
	function Cnds() {};
	
	Cnds.prototype.onInterstitialShown = function() { return true; };
	Cnds.prototype.onInterstitialFailedToLoad = function() { return true; };
	Cnds.prototype.onInterstitialLoaded = function() { return true; };
	Cnds.prototype.onInterstitialClosed = function() { return true; };
	Cnds.prototype.onInterstitialClicked = function() { return true; };
	
	Cnds.prototype.onBannerClicked = function() { return true; };
	Cnds.prototype.onBannerFailedToLoad = function() { return true; };
	Cnds.prototype.onBannerLoaded = function() { return true; };
	Cnds.prototype.onBannerShown = function() { return true; };
	
	Cnds.prototype.onSkippableVideoClosed = function() { return true; };
	Cnds.prototype.onSkippableVideoFailedToLoad = function() { return true; };
	Cnds.prototype.onSkippableVideoFinished = function() { return true; };
	Cnds.prototype.onSkippableVideoLoaded = function() { return true; };
	Cnds.prototype.onSkippableVideoShown = function() { return true; };
	
	Cnds.prototype.onNonSkippableVideoClosed = function() { return true; };
	Cnds.prototype.onNonSkippableVideoFailedToLoad = function() { return true; };
	Cnds.prototype.onNonSkippableVideoFinished = function() { return true; };
	Cnds.prototype.onNonSkippableVideoLoaded = function() { return true; };
	Cnds.prototype.onNonSkippableVideoShown = function() { return true; };
	
	Cnds.prototype.onRewardedVideoClosed = function() { return true; };
	Cnds.prototype.onRewardedVideoFailedToLoad = function() { return true; };
	Cnds.prototype.onRewardedVideoFinished = function() { return true; };
	Cnds.prototype.onRewardedVideoLoaded = function() { return true; };
	Cnds.prototype.onRewardedVideoShown = function() { return true; };
	
	pluginProto.cnds = new Cnds();

	function Acts() {};

	Acts.prototype.Initialize = function (adType)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
			
		window["Appodeal"]["initialize"](appKey, indexInitialize(adType));
		var self = this;

		if(indexInitialize(adType) == 1) {
			window["Appodeal"]["enableInterstitialCallbacks"](true);
			document.addEventListener("onInterstitialShown", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onInterstitialShown, self);
		    });
			document.addEventListener("onInterstitialFailedToLoad", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onInterstitialFailedToLoad, self);
		    });
		    document.addEventListener("onInterstitialLoaded", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onInterstitialLoaded, self);
		    });
		    document.addEventListener("onInterstitialClosed", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onInterstitialClosed, self);
		    });
		    document.addEventListener("onInterstitialClicked", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onInterstitialClicked, self);
		    });
		}

		if(indexInitialize(adType) == 2) {
			window["Appodeal"]["enableSkippableVideoCallbacks"](true);	
			document.addEventListener("onSkippableVideoClosed", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onSkippableVideoClosed, self);
		    });
		    document.addEventListener("onSkippableVideoFailedToLoad", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onSkippableVideoFailedToLoad, self);
		    });
		    document.addEventListener("onSkippableVideoFinished", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onSkippableVideoFinished, self);
		    });
		    document.addEventListener("onSkippableVideoLoaded", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onSkippableVideoLoaded, self);
		    });
		    document.addEventListener("onSkippableVideoShown", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onSkippableVideoShown, self);
		    });
		}

		if(indexInitialize(adType) == 128) {
			window["Appodeal"]["enableNonSkippableVideoCallbacks"](true);
			window["Appodeal"]["enableRewardedVideoCallbacks"](true);
			document.addEventListener("onNonSkippableVideoClosed", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onNonSkippableVideoClosed, self);
		    });
		    document.addEventListener("onNonSkippableVideoFailedToLoad", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onNonSkippableVideoFailedToLoad, self);
		    });
		    document.addEventListener("onNonSkippableVideoFinished", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onNonSkippableVideoFinished, self);
		    });
		    document.addEventListener("onNonSkippableVideoLoaded", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onNonSkippableVideoLoaded, self);
		    });
		    document.addEventListener("onNonSkippableVideoShown", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onNonSkippableVideoShown, self);
		    });

		    document.addEventListener("onRewardedVideoClosed", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onRewardedVideoClosed, self);
		    });
		    document.addEventListener("onRewardedVideoFailedToLoad", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onRewardedVideoFailedToLoad, self);
		    });
		    document.addEventListener("onRewardedVideoFinished", function(data) {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onRewardedVideoFinished, self);
		    });
		    document.addEventListener("onRewardedVideoLoaded", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onRewardedVideoLoaded, self);
		    });
			document.addEventListener("onRewardedVideoShown", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onRewardedVideoShown, self);
		    });
		}

		if(indexInitialize(adType) == 4) {
			window["Appodeal"]["enableBannerCallbacks"](true);
			document.addEventListener("onBannerClicked", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onBannerClicked, self);
		    });
		    document.addEventListener("onBannerFailedToLoad", function(data) {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onBannerFailedToLoad, self);
		    });
		    document.addEventListener("onBannerLoaded", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onBannerLoaded, self);
		    });
			document.addEventListener("onBannerShown", function() {
		        appodealRuntime.trigger(cr.plugins_.appodeal.prototype.cnds.onBannerShown, self);
		    });
		}
	    
	};
	
	Acts.prototype.Show = function (adType)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
			
		window["Appodeal"]["show"](indexShow(adType));		
	};
	
	Acts.prototype.Hide = function ()
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
			
		window["Appodeal"]["hide"](4);	
	};
	
	Acts.prototype.ShowIfLoaded = function (adType)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
			
		window["Appodeal"]["isLoaded"](indexShowIfLoaded(adType), function(result){
			if(result) {
				window["Appodeal"]["show"](indexShowIfLoaded(adType));
			}
		});	
	};
	
	Acts.prototype.setAutoCache = function (adType, condition)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
		
		var autoCache = true;
		if (condition == 0) {
			autoCache = true;
		} else if (condition == 1) {
			autoCache = false;
		}
			
		window["Appodeal"]["setAutoCache"](indexInitialize(adType), autoCache);	
	};
	
	Acts.prototype.Cache = function (adType)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
			
		window["Appodeal"]["cache"](indexCache(adType));	
	};
	
	Acts.prototype.DisableNetwork = function (network)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
			
		window["Appodeal"]["disableNetwork"](network);	
	};
	
	Acts.prototype.Confirm = function ()
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
			
		window["Appodeal"]["confirm"](2);	
	};
	
	Acts.prototype.setTesting = function (condition)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
		
		var testing = false;
		if (condition == 0) {
			testing = true;
		} else if (condition == 1) {
			testing = false;
		}
			
		window["Appodeal"]["setTesting"](testing);	
	};
	
	Acts.prototype.setLogging = function (condition)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
		
		var testing = false;
		if (condition == 0) {
			testing = true;
		} else if (condition == 1) {
			testing = false;
		}
			
		window["Appodeal"]["setLogging"](testing);	
	};

	Acts.prototype.setSmartBanners = function (condition)
	{
		if (!(this.runtime.isAndroid))
			return;
        if (typeof window["Appodeal"] == "undefined")
            return;
		
		var value = false;
		if (condition == 0) {
			value = true;
		} else if (condition == 1) {
			value = false;
		}
			
		window["Appodeal"]["setSmartBanners"](value);	
	};
	
	pluginProto.acts = new Acts();
	
	function Exps() {};
	
	pluginProto.exps = new Exps();

}());