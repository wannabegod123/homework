$(function(){
	getClass();
	getGoodsList();
	$(".left").bind("click",function(){
		history.go(-1);
	})
})
//获取分类函数
function getClass(){
	$listBox = $(".getList");
	if($listBox.length){
		getdata();
	}
	//ajax获取分类数据
	function getdata(){
		$.getJSON("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
			if(data.length){
				for(var i = 0; i < data.length; i ++){
					var $thisList = $("<li>"+data[i].className+"</li>")
					$thisList[0].classID = data[i].classID;
					$listBox.append($thisList);
					$thisList.bind("click",function(){
						//页面跳转，并且拼接商品类ID参数，以便下一个页面获取商品列表使用
						window.location = "goodsList.html?classID="+encodeURI(this.classID);
					})
				}
			}
		})
	}
}
//获取商品分类列表
function getGoodsList(){
	var $goodsBox = $(".goodsBox");
	//获取地址栏参数
	var classID = GetQueryString("classID");
	//判断当前页面
	if($goodsBox.length){
		getdata();
		}
	//获取商品数据
	function getdata(){
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			data:{classID:classID},
			dataType:"jsonp",
			success:function(data){
				if(data){
					$.each(data, function(i) {
						var $goods = $("<li class='carList' goodsID='"+data[i].goodsID+"'><p><img src='"+data[i].goodsListImg+"'/><p><div>"+data[i].goodsName+"</div><span>"+data[i].price+"</span></li>");
						$goodsBox.append($goods);
						jump($(".carList"));
					});
				}
			}
		})
	}
}

/*获取URL参数方法*/
function GetQueryString(name){
	/*定义正则，用于获取相应参数*/
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 /*字符串截取，获取匹配参数值*/
     var r = window.location.search.substr(1).match(reg);
	 /*但会参数值*/
     if(r!=null)return  decodeURI(r[2]); return null;
}







