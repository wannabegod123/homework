//首先要在terminal里配置环境，
// npm -init --yes
// npm -install mongoose express ejs body-parser --save-dev

/**
 * 主入口文件 这里只负责搭建服务器 并且配置文件信息
 */

var express = require("express");

//引入todoController文件
var todoController = require("./controller/todoController");

var app = express();

//配置ejs试图引擎
app.set("view engine","ejs");

//配置服务器识别静态文件 css
app.use(express.static("./public"));

//调用方法
todoController(app);

app.listen("9527");