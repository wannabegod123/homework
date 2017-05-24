$(function(){
	/*var $prompt=$("#prompt");
	var $btn=$("#btn");
	$("#ipt1,#ipt2").blur(function(){
		
		var ipt1value=$(this).val();
		var reg=/^[a-zA-Z_]\w{5,14}$/;
		
		if(!reg.test(ipt1value)){
			$prompt.text("只能使用数字字母下划线，且数字不能开头，长度在6-15之间")
			$prompt.animate({"opacity":"1"},1000).animate({"opacity":"0"},1000);
		}
	})
	
	$("#ipt3").blur(function(){
		
		var ipt1value=$(this).val();
		var ipt2value=$("#ipt2").val();
		
		if(ipt1value!=ipt2value){
			$prompt.text("两次密码输入不一致")
			$prompt.animate({"opacity":"1"},1000).animate({"opacity":"0"},1000);
		}
	})
	var $user=$("#ipt1");
	var $pwd1=$("#ipt2");
	var $pwd2=$("#ipt3");
	var $duoxuan=$("#duoxuan");
	$btn.click(function(){
		
		if($("#duoxuan").is(":checked")){
			$.ajax({
				type:"get",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{status:"register",userID:$user.val(),password:$pwd1.val()},
				//dataType:'jsonp',
				success:function(data){
					if(data==1){
						alert("注册成功");
					}else if(data==0){
						alert("用户重名");
					}else{
						alert("数据库报错");
					}
				}
			});
		}
	})
	
*/
$("#btn").bind("click",function(){
	submitUser(getUser("register"),function(data){
			if(data){
			window.location="enter.html";
		}else if(data==0){
			alert("用户名重复！");
		}else{
			console.log("数据错误！");
		}
	});
})
$("#btn1").bind("click",function(){
	submitUser(getUser("login"),function(data){
		//console.log(data);
		if(data=="0"){
		
		}else if(data=="2"){
		
		}else{
			if(window.localStorage){
				window.localStorage["user"]=data.userID;
			}
		}
	});
})

/*获取用户信息函数*/
function getUser(status){
	var user={
			status:status,
			userID:$("#ipt1").val(),
			password:$("#ipt2").val()
		}
		
	return user;
}
/*ajax提交用户信息函数*/
function submitUser(userData,collBack){
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",userData,function(data){
		//console.log(typeof(collBack));
		if(typeof(collBack)=="function"){
			collBack(data);
		}else{
			console.log("回调函数不是一个方法！！！");
		}
		
		
	})
}
})
