// specific/main.js
$(document).ready(function(){
	$("#logout_nav").click(function(){
		doLogout();
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