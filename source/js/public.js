$(function(){
	$("header .left").bind("click",function(){
		history.go(-1);
	})
})

/*获取URL参数方法*/
function GetQueryString(name){
	/*定义正则，用于获取相应参数*/
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 /*字符串截取，获取匹配参数值*/
     var r = window.location.search.substr(1).match(reg);
	 /*但会参数值*/
     if(r!=null)return  decodeURI(r[2]); return null;
}
//跳转到商品介绍页面函数
function jump(obj){
	obj.bind("click",function(){
		window.location = "introduce.html?goodsID=" + $(this).attr("goodsID");
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