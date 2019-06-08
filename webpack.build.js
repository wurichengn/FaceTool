var cfgs = require("./webpack.config.js");

//构造参数
var data = cfgs.init({
	//\\mode:"development"
});

data["devtool"] = "none";
//生成调试包
//data["devtool"] = "source-map";

module.exports = data;