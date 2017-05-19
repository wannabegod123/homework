/**
 * 处理逻辑
 */

// 用来解析数据的
var bodyParser = require("body-parser");

var urlencode = bodyParser.urlencoded({extended:false});

//模拟数据库的服务器数组
// var item = [{name:"Dog"},{name:"West"},{name:"East"}];

//引入mongoose模块
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//使用mongoose对象链接数据库
mongoose.connect("mongodb://light:123456@ds111489.mlab.com:11489/tododb");
//创建数据库字段及类型
var todoSchema = new mongoose.Schema({
    name:String,
});

var Todo = mongoose.model("Todo",todoSchema);

module.exports = function(app){
    app.get("/todo",function(req,res){
        // res.render("index",{item:item});

        //找到所有内容 返回当前页面
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render("index",{item:data});
        });
    });

    app.post("/todo",urlencode,function(req,res){
        // item.push(req.body);
        // res.json(req.body);

        Todo(req.body).save(function(e,data){
            if(e) throw e;
            res.json(data);
        });
    });

    app.delete("/todo/:xcItem",function(req,res){
        // item = item.filter(function (x) {
        //     var data = x.name!==req.params.xcItem;
        //     return data;
        // });
        // res.json(item);


        Todo.find({name:req.params.xcItem}).remove(function(e,data){
            if(e) throw e;
            res.json(data);
        });
    });
}