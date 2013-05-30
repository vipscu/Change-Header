console.log('backgroud');
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	if (localStorage['isChange'] == 'true') {
		var url = details.url;
		var headers = details.requestHeaders;
		//console.log("start request url:" + url);
		var blockingResponse = modifyHeader(headers, url);
		return blockingResponse;
	}
}, {
	urls : ["http://*/*", "https://*/*"]
}, ["requestHeaders", "blocking"]);

function modifyHeader(_headers, _url){
	var blockingResponse = {};
	var isxForward = false;
	var isReferer = false;
	var isuserAgent = false;
	var iscookie = false;
	for (var j = 0; j < _headers.length; j++){
		//console.log(_headers[j].name + ':' + _headers[j].value);
		if(_headers[j].name == "X-Forward-For" && (localStorage['xForward'].length > 6 || localStorage['randomip'] == 'true')){
			if(localStorage['xForward'].length > 6){
				_headers[j].value = localStorage['xForward'];
			}
			else if (localStorage['randomip'] == 'true') {
				_headers[j].value = Math.floor(Math.random()*225)+'.'+Math.floor(Math.random()*255)+'.'+Math.floor(Math.random()*255)+'.'+Math.floor(Math.random()*255);
			}
			isxForward = true;
		}
		
		if(_headers[j].name == "Referer" && (localStorage['referer'].length > 6 || localStorage['targeturl'] == 'true')){
			//console.log('referer:'+_headers[j].value);
			if(localStorage['referer'].length > 6){
				_headers[j].value = localStorage['referer'];
			}
			else if(localStorage['targeturl'] == 'true'){
				_headers[j].value = _url;
			}
			isReferer = true;
		}
		
		if(_headers[j].name == "User-Agent" && localStorage['userAgent'].length > 10){
			_headers[j].value = localStorage['userAgent'];
			isuserAgent = true;
		}
		
		if(_headers[j].name == "Cookie" && localStorage['cookie'].length > 0){
			_headers[j].value = localStorage['cookie'];
			iscookie = true;
		}
	}
	if(isxForward == false){
		if(localStorage['xForward'].length > 6){
			_headers['X-Forward-For'] = localStorage['xForward'];
		}
		else if (localStorage['randomip'] == 'true') {
			_headers['X-Forward-For'] = Math.floor(Math.random()*225)+'.'+Math.floor(Math.random()*255)+'.'+Math.floor(Math.random()*255)+'.'+Math.floor(Math.random()*255);
		}
		isxForward = true;
	}
	if(isReferer == false){
		if(localStorage['referer'].length > 6){
			_headers['Referer'] = localStorage['referer'];
		}
		else if(localStorage['targeturl'] == 'true'){
			_headers['Referer'] = _url;
		}
		isReferer = true;
	}
	if(isuserAgent == false){
		if(localStorage['userAgent'].length > 10){
			_headers['User-Agent'] = localStorage['userAgent'];
		}
		isuserAgent = true;
	}
	if(iscookie == false){
		if(localStorage['cookie'].length > 0){
			_headers['Cookie'] = localStorage['cookie'];
		}
		iscookie = true;
	}
	blockingResponse.requestHeaders = _headers;
	return blockingResponse;
}
