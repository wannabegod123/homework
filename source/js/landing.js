$(function(){
	landing();
	$("header .left").bind("click",function(){
		history.go(-1);
	})
})

//提交表单
function landing(){
	$("#landBtn").bind("click",function(){
		var username = $("#username").val();
		var pwd1 = $("#pwd1").val();
		if(username==""||pwd1==""){
			$(".landTip1").css("display","none");
			$(".landTip2").css("display","none");
			$(".null").css("display","block");
		}else{
			var setdata = {
				status:"login",
				userID:username,
				password:pwd1
			};
			subAjax(setdata);	
		}
	})
}
function subAjax(setdata){
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",setdata,function(data){
		if(data==0){
			$(".landTip1").css("display","none");
			$(".landTip2").css("display","block");
			$(".null").css("display","none");
		}else if(data==2){
			$(".landTip1").css("display","block");
			$(".landTip2").css("display","none");
			$(".null").css("display","none");
		}else{
			window.localStorage["userID"]=setdata.userID;
			window.location.href = "index.html";
		}
	});
}
