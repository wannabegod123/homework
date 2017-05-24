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
       type:"POST",
       url:"http://datainfo.duapp.com/shopdata/getGoods.php",
       dataType:"jsonp",
       data:{goodsID:GetQueryString("goodsID")},
       success:function (data) {
           for(var i=0;i<data.length;i++){
               // var arr = (data[0].goodsBenUrl).split(",");
               // console.log(typeof data[0].goodsBenUrl);
               // for(var j=0;j<arr.length;j++){
               //     $(".container").append("<img src='"+arr[j]+"'><img/><p>"+data[0].detail+"</p>");
               // }
               $(".container").append("<p>"+data[0].detail+"</p>");
               for(var j=0;j<data[0].goodsBenUrl.length;j++){
                   console.log(eval(data[0].goodsBenUrl));
               }
           }
       }
   });

});