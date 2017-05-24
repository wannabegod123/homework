/**
 * Created by lanou3g on 17/5/23.
 */

//back
$("header>img").on("click",function(){
    window.location.href = "login.html";
});


// /请求数据
$("#submit").on("click",function(){
    var $txt1 = $("#account").val();
    var $txt2 = $("#password").val();
    var $txt3 = $("#repassword").val();
    if($txt1 ==""){
        $("#output").text("用户名不能为空！");
    }else{
        if($txt2 != $txt3){
            $("#output").text("两次输入的密码不一致！");
        }else{
            $.ajax({
                type:"GET",
                url:"http://datainfo.duapp.com/shopdata/userinfo.php",
                data:{status:"register",userID:$txt1,password:$txt2},
                success:function (data) {
                    if(data==2){
                        $("#output").text("用户名密码不符");
                    }else if(data == 0){
                        $("#output").text("用户名不存在");
                    }else{
                        alert("登录成功");
                    }
                }
            });
        }
    }

});