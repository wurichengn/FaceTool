var g = require("global");
//引入lcg
var lcg = require("lcg");
//初始化自定义样式
require("lcg-style");

//主题色设置
lcg.ICE.args({
	color:"#1890ff",
	red:"#dd4f42"
});

//载入主页面
require("./js/ui/ui-main.js");