$(document).ready(function(){
    //获取主页数据
    $.ajax({
        type:"POST",
        url:"http://datainfo.duapp.com/shopdata/getGoods.php",
        dataType:"jsonp",
        success:function(data){
            $ul = $("<ul class='container'></ul>");
            $(".bodyc").append($ul);
            for(var i=0;i<data.length;i++){
                // var price = parseInt(data[i].price);
                var discount = data[i].discount==0?parseInt(data[i].price):parseInt((data[i].price)/(data[i].discount/10));
                var $goods = $("<li class='item' goodsID='"+data[i].goodsID+"'><img src='"+data[i].goodsListImg+"' class='item_img'><div class='item_msg'><h2>"+data[i].goodsName+"</h2><div class='item_price'><div class='item_price_left'><p>"+data[i].price+"<span>"+discount+"</span></p><p>"+data[i].discount+"折"+"</p></div><div class='item_price_right'><img src='img/home/index.png'/></div></div></div></li>");
                $(".container").append($goods);
            }
            //    detail
            $(".container>.item").on("click",function (){
                window.location = "detail.html?goodsID="+$(this).attr("goodsID");
            });
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

//    jump to  login
    $("header>div>img:last-of-type").on("click",function(){
        window.location.href  ='login.html';
    });

});