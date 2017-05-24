$(function(){
	search();
})

//商品搜索部分
function search(){
	$(".ser_btn").bind("click",function(){
		var result = $(".input_con").val();
		if(result!=""){
			window.location = "subject.html?result="+decodeURI(result);
		}
	});
	var ser = document.getElementById("search");
	ser.onkeydown = function(ev){
		var oEvent = ev || event;
		if(oEvent.keyCode == '13'){
			window.location = "subject.html?result="+decodeURI(this.value);
		}
	}
}

//颜色随机
function randomColor(){
	var color=Math.floor(Math.random()*16777215).toString(16)
	if(color.length==5){
		return "#0"+color;
	}
	else if(color.length==4){
		return "#00"+color;
	}else if(color.length==2){
		return "#0000"+color;
	}else if(color.length==1){
		return "#00000"+color;
	}else{
		return "#"+color;
	}
}

//$("#main .radio .zoom p").last().animate({"left":-$txt_width},randomTime(),function(){
//	$(this).remove();
//})
//$("#main .radio .zoom p").last().css({"top":$top+"px","font-size":randomSize()+"px","color":randomColor()})






