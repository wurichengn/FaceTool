var lcg = require("lcg");
var mod = require("../index.js");
var React = lcg.react;


//触发事件
lcg.domEvent(document,"click",function(){
	lcg.triggerDom("document-click");
});


//======悬浮菜单======
mod.FloatMenu = function(d,funcs){
	var self = this;
	funcs = funcs || d.funcs;

	//初始化dom
	this.$dom(
	<div></div>);

	//样式
	this.css({
		"position":"fixed",
		"z-index":9999,
		"left":d.x+"px",
		"top":d.y+"px",
		"background-color":"#fff",
		"overflow":"hidden",
		"border-radius":"4px",
		"border":"1px solid #ddd",
		"box-shadow":"0px 2px 8px rgba(0,0,0,0.1)",
		"width":"200px",
		"ani":"allin 0.2s",
		">z":{
			"display":"block",
			"line-height":"26px",
			"padding-left":"6px",
			"cursor":"pointer",
			":hover":{
				"background-color":"#e8f6ff"
			}
		},
		"$anis":{
			"allin":{
				"0%":{
					"opacity":0,
					"transform":"translate3d(0px,5px,0px)"
				}
			}
		}
	});

	//全局点击
	this.message("document-click",function(){
		self.remove();
	});

	//加入按钮
	for(var i in funcs){
		var z = <z>{i}</z>;
		self._proxy.appendChild(z);
		z.onclick = function(e){
			e.stopPropagation();
			self.remove();
			this();
		}.bind(funcs[i]);
	}

	//加入到body中
	document.body.appendChild(self._proxy);
}