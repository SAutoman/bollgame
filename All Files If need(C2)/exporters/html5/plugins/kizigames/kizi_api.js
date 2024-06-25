
	try {
	document.domain = "kizi.com";
	} catch (err) {
	console.log('error trying to document.domain = "kizi.com": ' + err);
	}
	2
	function HTML5API_levelStarted() {
	window.HTML5API && HTML5API.levelStarted && HTML5API.levelStarted();
	}
	function HTML5API_levelEnded() {
	window.HTML5API && HTML5API.levelEnded && HTML5API.levelEnded();
	}
	function HTML5API_preloaderStarted() {
	window.HTML5API && HTML5API.preloaderStarted && HTML5API.preloaderStarted();
	}
	function HTML5API_preloaderEnded() {
	window.HTML5API && HTML5API.preloaderEnded && HTML5API.preloaderEnded();
	}
	function HTML5API_onAdStart(func) { return window.HTML5API && HTML5API.onAdStart && HTML5API.onAdStart(func); }
	function HTML5API_onAdComplete(func) { return window.HTML5API && HTML5API.onAdComplete && HTML5API.onAdComplete(func); }
	function HTML5API_displayMidroll() { window.HTML5API && HTML5API.displayMidroll && HTML5API.displayMidroll(); }
	function HTML5API_isMidrollPending() { return window.HTML5API && HTML5API.isMidrollPending && HTML5API.isMidrollPending(); }
	// returns notification id which can be used for canceling
	function HTML5API_sendLocalNotification(delayMS, iconUrl, title, text, bigContentTitle, bigContentText, gameExtras) {
	return window.HTML5API && HTML5API.sendLocalNotification && HTML5API.sendLocalNotification(delayMS, iconUrl, title, text, bigContentTitle, bigContentText, gameExtras);
	}
	function HTML5API_cancelLocalNotification(id) {
	return window.HTML5API && HTML5API.cancelLocalNotification && HTML5API.cancelLocalNotification(id);
	}