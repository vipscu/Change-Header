function getPageLinks() {
	//获取页面中全部的url
	var urls = [];
	for (var i = document.links.length; i-- > 0; ) {
		console.log(document.links[i].href);
		try {
			urls.push(document.links[i].href);
		} catch(err) {
			console.log(err);
		}
	}
	return urls;
}

function dealLinks(_urls) {
	//将页面中的重复URL去掉
	console.log("deal Links");
	var array = new Array();
	var host = $.url().attr('host');
	for (var i in _urls) {
		try {
			var temp = $.url(_urls[i]);
			//去除非本站的url
			if (temp.attr('host') != host) {
				continue;
			}
			//end去除非本站的url
			tempParam = getParam(temp.param());
			if (tempParam.length < 1) {
				continue;
			}
			tempKey = temp.attr('path') + tempParam
			array[tempKey] = temp.attr('source');
		} catch(err) {
			console.log(err);
		}
	}
	console.log(array);
	return array;
	//返回去重后的结果

	//將參數部分以字符串的形式返回
	function getParam(_param) {
		var paramStr = '';
		for (var i in _param) {
			paramStr += i;
		}
		return paramStr;
	}

}

function checkPage(_url) {
	var html = getPage(_url).toLowerCase();
	var isInjection = false;
	var InjectType = '';
	if (html.indexOf('You have an error in your SQL syntax'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'MySQL Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('supplied argument is not a valid MySQL'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'MySQL Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('mysql_fetch_array() expects parameter'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'MySQL Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('Microsoft SQL Native Client'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'Access Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('Microsoft JET Database Engine'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'Access Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('Microsoft OLE DB Provider for SQL Server'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'MSSQL Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('[Microsoft][ODBC Microsoft Access Driver]'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'Access-Based SQL Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('[Microsoft][ODBC SQL Server Driver]'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'MSSQL-Based Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('Microsoft OLE DB Provider for ODBC Drivers'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'MSSQL-Based Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('java.sql.SQLException: Syntax error or access violation'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'Java.SQL Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('PostgreSQL query failed: ERROR: parser:'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'PostgreSQL Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('XPathException'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'XPath Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('supplied argument is not a valid ldap'.toLowerCase()) >= 0 ||	html.indexOf('javax.naming.NameNotFoundException'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'LDAP Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('DB2 SQL error:'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'DB2 Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('Dynamic SQL Error'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'Interbase Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	if (html.indexOf('Sybase message:'.toLowerCase()) >= 0) {
		isInjection = true;
		InjectType = 'Sybase Injection';
		return 'Injection: '+_url+' 　　　TYPE: '+InjectType; 
	}
	return isInjection;
}

function getPage(_url) {
	//获取_url页面内容
	var html = $.ajax({
		url : _url,
		async : false
	}).responseText;
	return html;
}

function checkInjection(_url) {
	var playloadStr = "'\\;-\"";
	//检测_url是否存在注入
	console.log("check injection: " + _url);
	var purl = $.url(_url);
	var url = "http://" + purl.attr('host') + purl.attr('path') + '?';
	for (var key in purl.param()) {
		var query = "";
		for (var key2 in purl.param()) {
			if (key == key2) {
				query += "&" + key + "=" + purl.param(key) + playloadStr;
				continue;
			}
			query += "&" + key + "=" + purl.param(key2);
		}
		if(query[0]=='&'){
			query = query.substring(1,query.length);
		}
		urltoCheck = url + query;
		console.log("URL to Check: " + urltoCheck);
		//URL检测，返回检测结果
		var isInject = checkPage(urltoCheck);
		if(isInject != false){
			showResult(isInject);
		}
	}
}

function isCheck() {
	//排除一些不需要检测的网站，比如百度、谷歌以及一些现有开源程序也不需要检测
	var _url = window.location.href;
	var host = $.url().attr('host');
	var exceptHost = ['qq.com', 'google.com', 'baidu.com', 'bing.com']
	var exceptKeywords = ['discuz', 'wordpress', 'joomla']
	for(var oneHost in exceptHost){
		if(host.indexOf(exceptHost[oneHost])>=0){
			console.log('Host except: ' + exceptHost[oneHost])
			return false;
		}
	}
	var html = $.ajax({
		url : _url,
		async : false
	}).responseText;
	for (var keyword in exceptKeywords) {
		var count = 0;
		var count = html.toLowerCase().split(exceptKeywords[keyword]).length - 1;
		if (count > 5) {
			console.log("Famous site: " + exceptKeywords[keyword]);
			return false;
		}
	}
	return true;
}


$(document).ready(function() {
	if(isCheck() == false){
		return;
	}
	var urls = getPageLinks();
	//获取页面中所有的url
	var links = dealLinks(urls);
	//得到需要進行检测的url
	for (var link in links) {
		checkInjection(links[link]);
	}
	//showResult('very OK');
});

function showResult(_str) {
	//将检测出来的结果显示在当前页面的顶端
	console.log('show Results');
	if ($('.divInject').length == 0) {
		var divInjectStr = '<div class="divInject"></div>'
		$('body').prepend(divInjectStr);
		$('.divInject').css({
			"margin" : "0 auto",
			"width" : "980px",
			"margin-top" : "10px",
			"margin-bottom" : "15px",
			"font-size" : "20px",
			"font-family" : "Arial",
			"background-color" : "#98bf21",
			"text-align" : "left",
			"padding" : "10px"
		});
		$('.divInject').append('<div class="divInjectTitle">This Site Injection Lines</div>');
		$('.divInjectTitle').css({
			"text-align": "center",
			"font-size": "30px",
			"margin": "5px 0 5px 0"
		});
		$('.divInjectOne').css({
			"margin-top" : "3px",
			"margin-bottom" : "2px",
		});
	}
	$('.divInject').append('<div class="divInjectOne">' + _str + '</div>');
}

//demo site
//http://www.hffanyi.net/
//http://testasp.vulnweb.com/
//http://testphp.vulnweb.com/
//http://www.fngjng.com/
//http://www.tangshanef.com/