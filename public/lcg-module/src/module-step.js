var mod = require("../index.js");
var lcg = require("lcg");
var React = lcg.react;



//======动态加入步骤条功能======
mod.Step = module.exports = function(){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
	</div>);

	//设置内容
	self._proxy.setVals = function(list){
		var cds = self._proxy.childNodes;
		//加入新的内容
		var c = list.length - cds.length;
		//新增
		if(c > 0){
			for(var i = 0;i < c;i++)
				self._proxy.appendChild(<Item></Item>);
		}
		//删除
		while(cds.length > list.length){
			self._proxy.removeChild(cds[list.length]);
		}

		//更新内容
		for(var i in list){
			cds[i].update({
				text:list[i],
				state:(i == (list.length - 1))?1:0
			});
		}
	}
}







//======单项======
var Item = function(){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<div class="bar b1"></div>
		<div class="bar b2"></div>
		<z lid="text"></z>
	</div>);

	//样式
	this.css({
		"position":"relative",
		"height":"30px",
		"line-height":"30px",
		"padding":"0px 20px",
		"padding-right":"20px",
		"display":"inline-block",
		"margin-right":"10px",
		"z-index":0,
		"ani":"in 0.4s",
		"-webkit-user-select":"none",
		">.bar":{
			"height":"51%",
			"position":"absolute",
			"background-color":"#e5e5e5",
			"left":"0px",
			"width":"100%",
			"z-index":-1,
			"transition":"all 0.3s",
			".b1":{
				"top":"0px",
				"transform":"skewX(45deg)"
			},
			".b2":{
				"bottom":"0px",
				"transform":"skewX(-45deg)"
			},
		},
		">z":{
			"transition":"all 0.3s"
		},
		".light":{
			">.bar":{
				"background-color":"@color"
			},
			">z":{
				"color":"#fff"
			}
		},
		"$anis":{
			"in":{
				"0%":{
					"opacity":0,
					"transform":"translateX(20px)"
				}
			}
		}
	});


	//更新内容
	self._proxy.update = function(dt){
		self.ids["text"].innerText = dt.text;
		if(dt.state == 1)
			self._proxy.className = "light";
		else
			self._proxy.className = "";
	}
}