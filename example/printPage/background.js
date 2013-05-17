chrome.browserAction.onClicked.addListener(function(tab){
	var action_url = "javascript:window.print();";
	console.log('run')
	chrome.tabs.update(tab.id, {url: action_url})
})
