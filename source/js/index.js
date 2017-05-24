$(function(){
	banner();
	getData();
})

//获取数据
function getData(){
	var $indexGoodsBox = $(".goodsList");
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		dataType:"jsonp",
		success:function(data){
			$.each(data,function(i){
				var $figure = $("<figure>");
				var discount = (data[i].discount == 0) ? 1 : data[i].discount*0.1;
				$figure.html('<div class="goodsTip" goodsID = "'+data[i].goodsID+'"><div class="tipPto"><img src = "'+data[i].goodsListImg+'"></div><div class="tipCon"><p class="tipName">'+data[i].goodsName+'</p><div class="tipBottom"><div class="tipLeft"><p><span class="price1">￥'+parseInt(data[i].price)+'</span><span class="price2">￥'+parseInt(data[i].price/discount)+'</span></p><p>'+data[i].discount+'折</p></div><div class="tipRight"><a href="###"><img src="../img/index/bg_car.png"/></a></div></div></div></div>');
				$indexGoodsBox.append($figure);
				jump($(".goodsTip"));
			});
		}
	})
}

//点击购物车
//function getCar(){
//	$(".tipRight").bind("click",function(){
//		
//	})
//}

//图片轮播
function banner(){
	auto();
	//$index是当前的下标
	//$qiandex是当前的前一个下标
	var $qiandex = 0;
	var $index = 0;
	var timer;
	//图片自动切换
	function auto(){
		timer = setInterval(function(){
			$index ++;
			if($index > 3){
				$index = 0;
				$qiandex = 3;
			}
			moveplay();
			$qiandex = $index;
		},2000)
	};
	function moveplay(){
		$(".icon a").eq($index).addClass("hover").siblings().removeClass("hover");
		if($index == 0 && $qiandex == 3){
			$(".pto li").eq($qiandex).stop(true,true).animate({"left":"-100%"});
			$(".pto li").eq($index).stop(true,true).css("left","100%").animate({"left":"0"});
		}else if($index == 3 && $qiandex == 0){
			$(".pto li").eq($qiandex).stop(true,true).animate({"left":"100%"});
			$(".pto li").eq($index).stop(true,true).css("left","-100%").animate({"left":"0"});
		}else if($index > $qiandex ){
			//左移
			$(".pto li").eq($qiandex).stop(true,true).animate({"left":"-100%"});
			$(".pto li").eq($index).stop(true,true).css("left","100%").animate({"left":"0"});
		}else if($index < $qiandex){
			//右移
			$(".pto li").eq($qiandex).stop(true,true).animate({"left":"100%"});
			$(".pto li").eq($index).stop(true,true).css("left","-100%").animate({"left":"0"});
		}
		$qiandex = $index;//将当前的index值赋给前一个
	}			
}