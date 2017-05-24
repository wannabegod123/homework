$(function(){
	//getAjaxCars();
	
	$("button").bind("click",function(){
		updataAjaxCar({
			userID:"xufan",
			goodsID:$(this).attr("goodsID"),
			number:1
		},function(data){
			$(".shopNb").text(data.length);
		});
	})
	
	getAjaxCars(function(data){
		var $box=$("#mianbox");
		$.each(data,function(i){
			$box.append("<div><img src='"+data[i].goodsListImg+"'><span class='numberBox'>"+data[i].number+"</span></div>");
//			console.log(data[i]);
		})
	})
})

/*去后台获取购物车信息，回调函数为获取数据成功后的处理方法，参数为购物车商品列表数组*/
function getAjaxCars(fn){
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		/*用户ID*/
		data:{userID:"xufan"},
		dataType:"jsonp",
		success:function(data){
			/*调用更新函数，直接将回调函数引用*/
			updataLoC(data,fn);
			
		}
	})
}
/*AJAX更新购物车，参数为，接口所需参数对象
		{userID:,
		goodsID:,
		number:}
		和回调函数	
*/
function updataAjaxCar(carOpt,fn){
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",carOpt,function(data){
		console.log(data);
		/*调用获取购物车函数*/
		getAjaxCars(fn);
	})
}

/*更新本地存储购物车内商品数量，参数为，购物车商品数据对象及回调函数*/
function updataLoC(data,fn){
	if(window.localStorage){
			window.localStorage["cars"]=data.length;
			if(typeof(fn)=="function"){
				fn(data);
			}
	}
}
/*在不需要更新购物车的页面，调用此方法，获取购物车数量*/
function getLoC(fn){
	if(window.localStorage){
			//return  window.localStorage["cars"];
			if(typeof(fn)=="function"){
				fn(window.localStorage["cars"]);
			}
	}
	
}

