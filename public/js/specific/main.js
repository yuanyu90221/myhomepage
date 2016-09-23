// specific/main.js
$(document).ready(function(){
	console.log("main page loaded");
	$("#logout_nav").click(function(){
		doLogout();
	});
	$("#sendData").click(function(){
		doTest();
	});
});

function doLogout(){
	console.log("doLogout");
	var userName = $("#userEdit_nav").text();
    var mUserName = userName.trim();
    console.log(mUserName);
	$.ajax({
		url:'/logout',
		type:'post',
		data:{'username':mUserName},
		success: function(data){

			console.log($.parseHTML(data));
			// 把整頁更換掉
			$('html').html($.parseHTML(data));
			// reload js
			location.reload();
			console.log("logout success");
			alert('logout success');
		},
		error: function(xhr, ajaxOptions, thrownError){
			 //$('#myPleaseWait').modal('hide');
			console.log(xhr.status);
			console.log(thrownError);
		}
	});
}

function doTest(){
	var inputDt = $("#myinput").val();
	$.ajax({
		url:'/test',
		type: 'post',
		data: {'try':inputDt},
		success: function(data){
			alert(data);
			console.log(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			 //$('#myPleaseWait').modal('hide');
			console.log(xhr.status);
			console.log(thrownError);
		}
	});
}
