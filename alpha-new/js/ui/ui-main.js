var lcg = require("lcg");
var React = lcg.react;
var End = require("./ui-end.js");


//主面板
var Panle = function(){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<End></End>
	</div>);

	//样式
	this.css({
		"height":"100%"
	});
}


//加入主面板
document.body.appendChild(<Panle></Panle>);