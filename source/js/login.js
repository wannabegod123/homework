$(function(){
	register();
	$("header .left").bind("click",function(){
		history.go(-1);
	})
})

function register(){
	$("#log_btn").bind("click",function(){
		var username = $("#username").val();
		var pwd1 = $("#pwd1").val();
		var pwd2 = $("#pwd2").val();
		if(username=="" || pwd1=="" || pwd2==""){
			$(".tip1").css("display","none");
			$(".tip2").css("display","none");
			$(".tip3").css("display","none");
			$(".null").css("display","block");
		}else{
			var setdata = {
				status:"register",
				userID:username,
				password:pwd1
			};
			if(pwdTest(setdata.password,pwd2)){
				getData(setdata);
			}else{
				$(".tip1").css("display","none");
				$(".tip2").css("display","none");
				$(".tip3").css("display","block");
				$(".null").css("display","none");
			}
		}
	})
}
//验证密码是否一致
function pwdTest(pwd1,pwd2){
	var rel = false;
	if(pwd1===pwd2){
		rel=true;
	};
	return rel;
}
//获取数据
function getData(setdata){
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",setdata,function(data){
		if(data==0){
			$(".tip1").css("display","block");
			$(".tip2").css("display","none");
			$(".tip3").css("display","none");
			$(".null").css("display","none");
		}else if(data==2){
			$(".tip1").css("display","none");
			$(".tip2").css("display","block");
			$(".tip3").css("display","none");
			$(".null").css("display","none");
		}else{
			window.location.href="landing.html";
		}
	})
}




