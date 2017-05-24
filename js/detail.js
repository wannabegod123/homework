/**
 * Created by lanou3g on 17/5/24.
 */
$(function(){
    GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
   $.ajax({
       type:"GET",
       url:"http://datainfo.duapp.com/shopdata/getGoods.php",
       dataType:"jsonp",
       data:{goodsID:GetQueryString("goodsID")},
       success:function(data){
           $num = data[0].discount == 0 ? data[0].price : parseInt(data[0].price / (data[0].discount / 10));
           $div = $("<div></div>");
           $div.html("<ul><li><img src='"+data[0].goodsListImg+"' goodsID='"+data[0].goodsID+"'></li><li>"+data[0].goodsName+"</li><li><span>"+data[0].price+"</span><span>"+$num+"</span></li><li>尺码:160/84A 165/88A</li><li>数量:"+data[0].buynumber+"</li></ul>");
           $(".content ul").append($div);

           $(".content ul li img").on("click",function(){
               window.location.href = "catodetail.html?goodsID="+$(this).attr("goodsID");
           });
       }
   });

//    back
    $("header>img:first-of-type").on("click",function(){
        window.location.href = "index.html";
    });

});