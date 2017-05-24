$(function(){
	getCarInfo();
//	getNumber();
	jumpCar();
	$("header .left").bind("click",function(){
		history.go(-1);
	})
})
//通过ajax获取购物车里的信息
function getCarInfo(){
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
//		data:{userID:GetQueryString("userID")},
		data:{userID:window.localStorage["userID"]},
		dataType:"jsonp",
		success:function(data){
			var i = 0;
			carStruction(data,i);
			numPrice();
			carDelete();
			getNumber();
			changeNum();
		}
	});
}
//获取购物物品的数量
function getNumber(){
	$goodsCar = $(".goodsCar");
	$goodsCar.html("");
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:window.localStorage["userID"]},
		dataType:"jsonp",
		success:function(data){
			$("#num").text(data.length);
//			console.log(data)
		}
	});
}
//增加减少商品数量
function changeNum(){
	var numReduce;
	var numAdd;
	$(".reduce").bind("click",function(){
		var $next = $(this).next();
		numReduce = $next.val();
		numReduce --;
		$next.val(numReduce)
		updateCar(window.localStorage["userID"],$(this).attr("goodsID"),numReduce);
		numPrice();
	})
	$(".add").bind("click",function(){
		var $prev = $(this).prev();
		numAdd = $prev.val();
		console.log(numAdd)
		numAdd ++;
		$prev.val(numAdd);
		updateCar(window.localStorage["userID"],$(this).attr("goodsID"),numAdd);
		numPrice();
	})
}
//购物车结构
function carStruction(data,i){
	$.each(data,function(i){
		$goodsCar = $(".goodsCar");
		$figure = $("<figure>");
		$figure.html('<div class="goods"><div class="goods_pto"><img src="'+data[i].goodsListImg+'"></div><div class="goods_con"><div class="top"><span class="goodsname">'+data[i].goodsName+'</span><span class="delete" id="delete" goodsID="'+data[i].goodsID+'"><img src="../img/shopCar/delete.jpg"/></span></div><div class="middle"><span>单价：</span><span class="price" id="price">￥'+data[i].price+'</span></div><div class="bottom"><span class="num_title">数量：</span><div class="count"><a href="###" class="reduce" goodID="'+data[i].goodsID+'">-</a><input type="text" class="number" value="1"></input><a href="###" class="add" goodsID="'+data[i].goodsID+'">+</a></div></div></div></div>');
		$goodsCar.append($figure);
	});
}
//求取购物车商品数量和总价
function numPrice(){
	var carPrice;
	var carNum;
	for(var i = 0; i < $(".goodsCar figure").length; i ++){
		carPrice += parseFloat($(".goodsCar figure").eq(i).find(".price").text())*parseFloat($(".goodsCar figure").eq(i).find(".number").val());
		carNum += parseFloat($(".goodsCar figure").eq(i).find(".number").val());
	}
	$("#num").text(carNum);
	$("#money").html('￥'+carPrice);
}
//更新购物车数据
function updateCar(userID,goodsID,number){
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		data:{userID:userID,goodsID:goodsID,number:number},
		success:function(data){
			
		}
	});
}
//删除数据
function carDelete(){
	$(".delete").bind("click",function(){
		$(this).parent().parent().parent().parent().remove();
		updateCar(window.localStorage["userID"],$(this).attr("goodsID"),0);
		var carNum = parseInt($("#num").text());
		carNum--;
		$("#num").text(carNum);
		numPrice();
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









