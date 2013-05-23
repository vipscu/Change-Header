window.onload = function() {
	/*
	var flag = true;
	while (flag) {
		$("#Image1").load(function() {
			console.log("加载完成！");
			flag = false;
		});
	}*/
	
	var CheckCode = $.cookie("CheckCode");
	console.log("CheckCode:" + CheckCode);
	console.log("document.cookie:" + document.cookie);
	var isfindcount = 1;
	while (isfindcount < 5) {
		for (var i = 0; i <= 9999; i++) {
			tmp = "";
			if(i<10){
				tmp = '000'+i.toString();
			}
			if(9<i && i<100){
				tmp = '00'+i.toString();
			}
			if(99<i && i<1000){
				tmp = '0'+i.toString();
			}
			if(999<i && i<10000){
				tmp = i.toString();
			}
			var md5 = calcMD5(tmp);
			//console.log(md5);
			if (md5.toUpperCase() == CheckCode) {
				console.log("OK:" + tmp);
				while ($("#TextBox1").val() != tmp) {
					$("#TextBox1").val(tmp);
				}
				isfindcount++;
				$("#form1").submit();
				return 0;
			}
		}
	}
}
