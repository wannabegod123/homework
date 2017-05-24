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
        type: "POST",
        url: "http://datainfo.duapp.com/shopdata/getGoods.php",
        dataType: "jsonp",
        data: {classID: GetQueryString("classID")},
        success: function (data) {
            for(var i=0;i<data.length;i++){
                $(".container").append("<li goodsID='"+data[i].goodsID+"'><img src='"+data[i].goodsListImg+"'><p>"+data[i].goodsName+"</p><p>"+data[i].price+"</p></li>");
            }
            $(".container li").on("click",function(){
                window.location.href = "detail.html?goodsID="+$(this).attr("goodsID");
            });
        }
    });

    $("header img:first-child").on("click",function(){
        window.location.href = "cato.html";
    });
});
