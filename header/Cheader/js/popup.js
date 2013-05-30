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
	
	$('#enter').click(function() {
		var xForward = $('#xForward').val();
		var referer = $('#referer').val();
		var userAgent = $('#userAgent').val();
		var cookie = $('#cookieArea').val();
		var randomip = $('#randomip').is(':checked');
		var targeturl = $('#targeturl').is(':checked');
		localStorage['xForward'] = xForward;
		localStorage['referer'] = referer;
		localStorage['userAgent'] = userAgent;
		localStorage['cookie'] = cookie;
		localStorage['randomip'] = randomip;
		localStorage['targeturl'] = targeturl;		
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
