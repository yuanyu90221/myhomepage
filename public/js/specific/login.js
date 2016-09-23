//specific/login.js
$(document).ready(function(){
	$(":submit[id=submitbtn]").click(function(check){
		check.preventDefault();
		doPostForm();
	});

});

function doPostForm(){
	console.log("doPostForm");
	$.ajax({
		url:'/greeting',
		type:'post',
		data: $("#login-form").serialize(),
		success: function(data){

			console.log($.parseHTML(data));
			// 把整頁更換掉
			 $('html').html($.parseHTML(data));
			 // reload js
			 location.reload();
			console.log("login success");
			alert('login success');
		},
		error: function(xhr, ajaxOptions, thrownError){
			 //$('#myPleaseWait').modal('hide');
			console.log(xhr.status);
			console.log(thrownError);
		}
	});
}

