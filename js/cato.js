$(document).ready(function(){
    $.ajax({
        type:"GET",
        url:"http://datainfo.duapp.com/shopdata/getclass.php",
        dataType:"json",
        success:function(data){
            for(var i=0;i<data.length;i++){
                var $goods = "<li classID='"+data[i].classID+"'>"+data[i].className+"</li>";
                $(".container").append($goods);
                $(".container li").on("click",function(){
                    window.location.href = "catolist.html?classID="+$(this).attr("classID");
                });
            }
        }
    });


    //    tab qiehuan
    $(".footer_li1").click(function(){
        window.location.href = "index.html";
    });
    $(".footer_li2").click(function(){
        window.location.href = "cato.html";
    });
    $(".footer_li3").click(function(){
        window.location.href = "search.html";
    });
    $(".footer_li4").click(function(){
        window.location.href = "more.html";
    });
});