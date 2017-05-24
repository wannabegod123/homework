/**
 * Created by lanou3g on 17/5/23.
 */

// show password
$(".container>div.input2 input").on("click",function(){
   if($(".container>div.input2 input").is(":checked")){
        $(".container>div.input1 input:last-of-type").attr("type","text");
   }else{
       $(".container>div.input1 input:last-of-type").attr("type","password");

   }
});

//cookie


//back
$("header>img").on("click",function(){
    window.location.href = "index.html";
});
$(".container>.register").on("click",function(){
    window.location.href = "register.html";
});

//ajax
$(".container>button.login").on("click",function(){
    var $txt1 = $(".container div.input1 input:first-of-type").val();
    var $txt2 = $(".container div.input1 input:last-of-type").val();
    // console.log($txt1+","+$txt2);

    $.ajax({
        type:"GET",
        url:"http://datainfo.duapp.com/shopdata/userinfo.php",
        data:{status:"login",userId:$txt1,password:$txt2},
        success:function (data) {
            console.log(data);
        }
    });
});




