/* Copyright (c) 2015 Appodeal Inc. All rights reserved.*/
function GetPluginSettings()
{
	return {
		"name":			"Appodeal Plugin",	
		"id":			"appodeal",	
		"version":		"1.15.2",
		"description":	"Appodeal Plugin Scirra Consruct 2",
		"author":		"Appodeal",
		"help url":		"http://appodeal.com/sdk",
		"category":		"Monetisation",
		"type":			"object",
		"rotatable":	false,
		"cordova-plugins":	"https://github.com/appodeal/Appodeal-PhoneGap-plugin.git",
		"flags":		pf_singleglobal
	};
};

AddCondition(0, cf_trigger, "On interstitial received", "Ads", "On interstitial received", "Triggered when interstitial loaded", "onInterstitialLoaded");
AddCondition(1, cf_trigger, "On interstitial shown", "Ads", "On interstitial shown", "Triggered when an interstitial is displayed on the screen", "onInterstitialShown");
AddCondition(2, cf_trigger, "On interstitial failed to load", "Ads", "On interstitial failed to load", "Triggered when an interstitial failed to load", "onInterstitialFailedToLoad");
AddCondition(3, cf_trigger, "On interstitial clicked", "Ads", "On interstitial clicked", "Triggered when an interstitial clicked", "onInterstitialClicked");
AddCondition(4, cf_trigger, "On interstitial closed", "Ads", "On interstitial closed", "Triggered when an interstitial closed", "onInterstitialClosed");

AddCondition(5, cf_trigger, "On banner received", "Ads", "On banner received", "Triggered when banner loaded", "onBannerLoaded");
AddCondition(6, cf_trigger, "On banner shown", "Ads", "On banner shown", "Triggered when an banner is displayed on the screen", "onBannerShown");
AddCondition(7, cf_trigger, "On banner failed to load", "Ads", "On banner failed to load", "Triggered when an banner failed to load", "onBannerFailedToLoad");
AddCondition(8, cf_trigger, "On banner clicked", "Ads", "On banner clicked", "Triggered when an banner clicked", "onBannerClicked");

AddCondition(9, cf_trigger, "On skippable video received", "Ads", "On video received", "Triggered when video loaded", "onSkippableVideoLoaded");
AddCondition(10, cf_trigger, "On skippable video shown", "Ads", "On video shown", "Triggered when an video is displayed on the screen", "onSkippableVideoShown");
AddCondition(11, cf_trigger, "On skippable video failed to load", "Ads", "On video failed to load", "Triggered when an video failed to load", "onSkippableVideoFailedToLoad");
AddCondition(12, cf_trigger, "On skippable video finished", "Ads", "On video finished", "Triggered when an video finished", "onSkippableVideoFinished");
AddCondition(13, cf_trigger, "On skippable video closed", "Ads", "On video closed", "Triggered when an video closed", "onSkippableVideoClosed");

AddCondition(14, cf_trigger, "On non skippable video received", "Ads", "On video received", "Triggered when video loaded", "onNonSkippableVideoLoaded");
AddCondition(15, cf_trigger, "On non skippable video shown", "Ads", "On video shown", "Triggered when an video is displayed on the screen", "onNonSkippableVideoShown");
AddCondition(16, cf_trigger, "On non skippable video failed to load", "Ads", "On video failed to load", "Triggered when an video failed to load", "onNonSkippableVideoFailedToLoad");
AddCondition(17, cf_trigger, "On non skippable video finished", "Ads", "On video finished", "Triggered when an video finished", "onNonSkippableVideoFinished");
AddCondition(18, cf_trigger, "On non skippable video closed", "Ads", "On video closed", "Triggered when an video closed", "onNonSkippableVideoClosed");

AddCondition(19, cf_trigger, "On rewarded video received", "Ads", "On rewarded video received", "Triggered when rewarded video loaded", "onRewardedVideoLoaded");
AddCondition(20, cf_trigger, "On rewarded video shown", "Ads", "On rewarded video shown", "Triggered when an rewarded video is displayed on the screen", "onRewardedVideoShown");
AddCondition(21, cf_trigger, "On rewarded video failed to load", "Ads", "On rewarded video failed to load", "Triggered when an rewarded video failed to load", "onRewardedVideoFailedToLoad");
AddCondition(22, cf_trigger, "On rewarded video finished", "Ads", "On rewarded video finished", "Triggered when an rewarded video finished", "onRewardedVideoFinished");
AddCondition(23, cf_trigger, "On rewarded video closed", "Ads", "On rewarded video closed", "Triggered when an rewarded video closed", "onRewardedVideoClosed");

AddComboParamOption("INTERSTITIAL");
AddComboParamOption("SKIPPABLE_VIDEO");
AddComboParamOption("INTERSTITIAL or SKIPPABLE_VIDEO");
AddComboParamOption("BANNER");
AddComboParamOption("BANNER_BOTTOM");
AddComboParamOption("BANNER_TOP");
AddComboParamOption("BANNER_CENTER");
AddComboParamOption("REWARDED_VIDEO");
AddComboParamOption("NON_SKIPPABLE_VIDEO");
AddComboParam("Ad Type", "");
AddAction(0, 0, "Show Ad", "Ads", "Show <i>{0}</i> ad", "Show Ad", "Show");

AddComboParamOption("INTERSTITIAL");
AddComboParamOption("SKIPPABLE_VIDEO");
AddComboParamOption("INTERSTITIAL or SKIPPABLE_VIDEO");
AddComboParamOption("REWARDED_VIDEO");
AddComboParamOption("NON_SKIPPABLE_VIDEO");
AddComboParam("Ad Type", "");
AddAction(1, 0, "Show Ad if loaded", "Ads", "Show <i>{0}</i> ad if loaded", "Show Ad if Loaded", "ShowIfLoaded");

AddComboParamOption("INTERSTITIAL");
AddComboParamOption("SKIPPABLE_VIDEO");
AddComboParamOption("BANNER");
AddComboParamOption("REWARDED_VIDEO");
AddComboParamOption("NON_SKIPPABLE_VIDEO");
AddComboParam("Ad Type", "");
AddAction(2, 0, "Initialize", "Ads", "Initialize <i>{0}</i> Ad Type", "Initialize", "Initialize");

AddComboParamOption("INTERSTITIAL");
AddComboParamOption("SKIPPABLE_VIDEO");
AddComboParamOption("INTERSTITIAL or SKIPPABLE_VIDEO");
AddComboParamOption("BANNER");
AddComboParamOption("REWARDED_VIDEO");
AddComboParamOption("NON_SKIPPABLE_VIDEO");
AddComboParam("Ad Type", "");
AddComboParamOption("Enabled");
AddComboParamOption("Disabled");
AddComboParam("Auto Cache", "");
AddAction(3, 0, "Auto cache", "Ads", "Set <i>{0}</i> Auto Cache <i>{1}</i>", "Auto cache", "setAutoCache");

AddComboParamOption("INTERSTITIAL");
AddComboParamOption("SKIPPABLE_VIDEO");
AddComboParamOption("INTERSTITIAL or SKIPPABLE_VIDEO");
AddComboParamOption("BANNER");
AddComboParamOption("REWARDED_VIDEO");
AddComboParamOption("NON_SKIPPABLE_VIDEO");
AddComboParam("Ad Type", "");
AddAction(4, 0, "Cache ad", "Ads", "Cache <i>{0}</i> ad", "Cache ad", "Cache");

AddAction(5, 0, "Hide Banner", "Ads", "Hide Banner", "Hide Banner", "Hide");

AddStringParam("Network to disable", "Disable ad network");
AddAction(6, 0, "Disable Network", "Ads", "Disable <i>{0}</i> Network", "Disable <i>{0}</i> ad ntwork", "DisableNetwork");

AddAction(7, 0, "Confirm usage", "Ads", "Confirm <i>SKIPPABLE_VIDEO</i> usage", "Confirm SKIPPABLE_VIDEO usage", "Confirm");

AddComboParamOption("Enabled");
AddComboParamOption("Disabled");
AddComboParam("Testing", "");
AddAction(8, 0, "Set Testing", "Ads", "Set Testing", "Set Testing", "setTesting");

AddComboParamOption("Enabled");
AddComboParamOption("Disabled");
AddComboParam("Logging", "");
AddAction(9, 0, "Set Logging", "Ads", "Set Logging", "Set Logging", "setLogging");

AddComboParamOption("Enabled");
AddComboParamOption("Disabled");
AddComboParam("Smart Banner", "");
AddAction(10, 0, "Set Smart Banners", "Ads", "Set Smart Banners", "Set Smart Banners", "setSmartBanners");

ACESDone();

var property_list = [

	new cr.Property(ept_text, "appKey", "", "Application Key"),

];
	
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	this.instance = instance;
	this.type = type;
	
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;

}

IDEInstance.prototype.OnCreate = function()
{
};

IDEInstance.prototype.OnInserted = function()
{
}

IDEInstance.prototype.OnDoubleClicked = function()
{
}

IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

IDEInstance.prototype.Draw = function(renderer)
{
}

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}