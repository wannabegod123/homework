$(function(){
	getIntroduce();
	jumpCar();
})
//
//function getIntroduce(){
//	$(".infoBox").html("");
//	$.ajax({
//		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
//		data:{goodsID:GetQueryString("goodsID")},
//		dataType:"jsonp",
//		success:function(data){
//			$.each(data,function(i){
//				var discount=(data[i].discount==0)?1:data[i].discount*0.1;
//				$(".infoBox").html('<div class="infoPto" goodsID="'+data[i].goodsID+'"><img src = "'+data[i].goodsListImg+'"></div><div class="infoCon" goodsID="'+data[i].goodsID+'"><p class="infoName">'+data[i].goodsName+'</p><p><span class="price1">￥'+parseInt(data[i].price)+'</span><span class="price2">￥'+parseInt(data[i].price/discount)+'</span></p><p class="infoSize">尺码：160/84A  165/88A</p><p class="infoNum">数量：1</p></div>')
//				jumpDetails($(".infoPto"));
//			})
//		}
//	})
//}
function getIntroduce(){
	$(".infoBox").html("");
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{goodsID:GetQueryString("goodsID")},
		dataType:"jsonp",
		success:function(data){
			$.each(data,function(i){
				var discount=(data[i].discount==0)?1:data[i].discount*0.1;
				var $infoBoxList = $('<div class="infoPto" goodsID="'+data[i].goodsID+'"><img src = "'+data[i].goodsListImg+'"></div><div class="infoCon" goodsID="'+data[i].goodsID+'"><p class="infoName">'+data[i].goodsName+'</p><p><span class="price1">￥'+parseInt(data[i].price)+'</span><span class="price2">￥'+parseInt(data[i].price/discount)+'</span></p><p class="infoSize">尺码：160/84A  165/88A</p><p class="infoNum">数量：1</p></div>')
				$infoBoxList[0].goodsID = data[i].goodsID;
				$(".infoBox").append($infoBoxList);
				var $infoDetails =  $(".infoBox").siblings().eq(0);
				$infoDetails.goodsID = data[i].goodsID;
//				jumpDetails($infoDetails);
				jumpDetails($(".infoPto"));
			})
		}
	})
}
//跳转到详情页面
function jumpDetails(obj){
	obj.bind("click",function(){
		window.location = "goodsDetails.html?goodsID="+encodeURI(this.goodsID);
	})
}
/*跳转到购物车页面*/
function jumpCar(){
	$(".addshopCar").bind("click",function(){
//		alert($("#num"))
		if($("#num").text()==0){
			window.location="shopcar.html?userID="+window.localStorage["userID"];
		}
		else{
			window.location="goodCar.html?userID="+window.localStorage["userID"];
		}
		
	})
}
/*跳转到购物车页面*/
function jumpCar(){
	$(".addshopCar").bind("click",function(){
		if($("#num").text()==0){
			window.location="shopcar.html?userID="+window.localStorage["userID"];
		}
		else{
			window.location="goodCar.html?userID="+window.localStorage["userID"];
		}
	})
}


