$(function(){
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:{goodsID:GetQueryString("goodsID")},
		dataType:"jsonp",
		success:function(data){
			$.each(data, function(i){
				$(".goodsDetails").html('<div class="goodsDetailsPto"></div><div class="goodsDetailsCon">'+data[i].detail+'</div>');
				for(var j = 0; j < eval(data[i].goodsBenUrl).length; j ++){
					var img = new Image();
					img.src = eval(data[i].goodsBenUrl)[j];
					$(".goodsDetailsPto").append(img);
				}
			});
		}
	});
})










