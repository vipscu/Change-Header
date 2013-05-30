$(document).ready(function() {
	$('#xForward').val(localStorage['xForward']);
	$('#referer').val(localStorage['referer']);
	$('#userAgent').val(localStorage['userAgent']);
	$('#cookieArea').val(localStorage['cookie']);
	
	if(localStorage['isChange'] == 'true'){
		$('#enter').attr({'disabled': true});
	}
	
	$('#randomip').change(function() {
		//alert($('#randomip').is(':checked'));
		$('#xForward').attr({'disabled':$('#randomip').is(':checked')});
		$('#xForward').val('');
	});
	$('#targeturl').change(function() {
		//alert($('#randomip').is(':checked'));
		$('#referer').attr({'disabled':$('#targeturl').is(':checked')});
		$('#referer').val('');
	});
	$('#exceptUrl').change(function() {
		$('#includeUrl').attr({'checked': !$('#exceptUrl').is(':checked')});
		$('#includeUrltext').attr({'disabled':$('#exceptUrl').is(':checked')});
		$('#exceptUrltext').attr({'disabled':!$('#exceptUrl').is(':checked')});
	});
	$('#includeUrl').change(function() {
		$('#exceptUrl').attr({'checked': !$('#includeUrl').is(':checked')});
		$('#exceptUrltext').attr({'disabled':$('#includeUrl').is(':checked')});
		$('#includeUrltext').attr({'disabled':!$('#includeUrl').is(':checked')});
	});
	
	$('#enter').click(function() {
		var xForward = $('#xForward').val();
		var referer = $('#referer').val();
		var userAgent = $('#userAgent').val();
		var cookie = $('#cookieArea').val();
		var randomip = $('#randomip').is(':checked');
		var targeturl = $('#targeturl').is(':checked');
		var exceptUrl = $('#exceptUrl').is(':checked');
		var includeUrl = $('#includeUrl').is(':checked');
		var exceptUrltext = $('#exceptUrltext').val();
		var includeUrltext = $('#includeUrltext').val();
		localStorage['xForward'] = xForward;
		localStorage['referer'] = referer;
		localStorage['userAgent'] = userAgent;
		localStorage['cookie'] = cookie;
		localStorage['randomip'] = randomip;
		localStorage['targeturl'] = targeturl;	
		localStorage['exceptUrl'] = exceptUrl;
		localStorage['includeUrl'] = includeUrl;
		localStorage['exceptUrltext'] = exceptUrltext;
		localStorage['includeUrltext'] = includeUrltext;
		localStorage['isChange'] = true;
		
		$('#enter').attr({'disabled': true});
		$('#reset').attr({'disabled': false});
	})
	
	$('#reset').click(function() {
		$('#xForward').val('');
		$('#referer').val('');
		$('#userAgent').val('');
		$('#cookieArea').val('');
		
		localStorage['xForward'] = '';
		localStorage['referer'] = '';
		localStorage['userAgent'] = '';
		localStorage['cookie'] = '';
		localStorage['randomip'] = false;
		localStorage['targeturl'] = false;
		localStorage['isChange'] = false;
		
		$('#enter').attr({'disabled': false});
	})
});
