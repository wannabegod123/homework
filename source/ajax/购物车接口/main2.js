$(function(){
	getnumber();
	showCar();
	
	$("button").bind("click",function(){
		updataCar({userID:"xufan",goodsID:$(this).attr("goodsID"),number:1});
	})
})

function getnumber(){
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:"xufan"},
		dataType:"jsonp",
		success:function(data){
			if(data.length){
				var number=data.length;
			}
			$(".shopNb").text(number);
		}
	})
} 

function showCar(){
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:{userID:"xufan"},
		dataType:"jsonp",
		success:function(data){
			var $box=$("#mianbox");
			if(data.length){
				$.each(data,function(i){
					var $boxmin=$("<div><img src='"+data[i].goodsListImg+"' /><span class='numberBox'>"+data[i].number+"</span></div>");
					var $btnC=$("<button goodsID='"+data[i].goodsID+"' number='"+data[i].number+"'>-</button>");
					var $btnA=$("<button goodsID='"+data[i].goodsID+"' number='"+data[i].number+"'>+</button>");
					$boxmin.append($btnC);
					$boxmin.append($btnA);
					$box.append($boxmin);
					$btnC.bind("click",function(){
						var numb=parseInt($(this).attr("number"))-1;
						if(numb<0){
							numb=0;
						}
						updataCar({userID:"xufan",goodsID:$(this).attr("goodsID"),number:numb});
					})
					$btnA.bind("click",function(){
						var numb=parseInt($(this).attr("number"))+1;
						updataCar({userID:"xufan",goodsID:$(this).attr("goodsID"),number:numb});
					})
				})
			}
			
		}
	})
}

function updataCar(opt){
	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",opt,function(data){
		console.log(data);
	})
}

