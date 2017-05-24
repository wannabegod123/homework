$(function(){
	getResult();
	getTitleInfo()
	$("header .left").bind("click",function(){
		history.go(-1);
	})
})
//将搜索信息插入头部
function getTitleInfo(){
	$(".subjectName").innerText = 'GetQueryString("result")';
//	if(GetQueryString("classID")){
//		$(".subjectName").text(GetQueryString("className"));
//		getAjax_list();
//	}else if(GetQueryString("result")){
//		$(".subjectName").text(GetQueryString("result")+"搜索结果");
//		getResult();
//	}	
}
//获取搜索信息
function getResult(){
	var $mainBox = $(".main");
	$mainBox.html("");
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
		data:{selectText:GetQueryString("result")},
		dataType:"jsonp",
		success:function(data){
			if(data == 0){
				$mainBox.html("抱歉，没有搜索到相关商品");
			}else{
				var i = 0;
				struction(data,i);
			}
		}
	});
}
//创建结构
function struction(data,i){
	var $mainBox = $(".main");
	$.each(data,function(i){
		var discount = (data[i].discount == 0) ? 1 : data[i].discount*0.1;
		var $div = $("<div>")
		$div.html('<section class="serGoodsList" goodsID="'+data[i].goodsID+'"><img src="'+data[i].goodsListImg+'"></section><span>'+data[i].goodsName+'</span><div class="price"><p>￥'+parseInt(data[i].price)+'</p><p>￥'+parseInt((data[i].price*data[i].discount))+'</p></div>');
		$mainBox.append($div);
		jump($(".serGoodsList"));
	});
}


																														//<article class="main">
																														//			<!--<div class="box">
																														//				<section></section>
																														//				<span>美特斯邦威</span>
																														//				<div class="price">
																														//					<p>95</p>
																														//					<p>119</p>
																														//				</div>
																														//			</div>-->
																														//		</article>