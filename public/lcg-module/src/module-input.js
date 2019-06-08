var lcg = require("lcg");
var mod = require("../index.js");
var React = lcg.react;

//======单选按钮======
var Radio = mod.Radio = function(d){
	var self = this;
	var React = lcg.$react;
	//初始化dom
	this.$doms(
	<div onclick={function(){
		if(self._proxy.value == true)
			return;
		self._proxy.value = true;
		render();
		//触发事件
		if(d.onselect)
			d.onselect(true);
	}}>
		<div lid="bar"></div>
	</div>);

	//样式
	this.scss({
		"display":"inline-block",
		"width":"16px",
		"height":"16px",
		"border":"1px solid #ddd",
		"border-radius":"100%",
		"background-color":"#fff",
		"cursor":"pointer",
		"position":"relative",
		"ui-click-ani":"@color",
		"transition":"all 0.3s",
		">div":{
			"ui-float-center":"4px",
			"width":"8px",
			"height":"8px",
			"background-color":"@color",
			"border-radius":"100%",
			"transform":"scale3d(0,0,1)",
			"transition":"all 0.3s"
		},
		".sel":{
			"border-color":"@color",
			">div":{
				"transform":"scale3d(1,1,1)"
			}
		},
		":hover":{
			"border-color":"@color"
		}
	});

	//状态
	self._proxy.value = false;

	//渲染
	var render = function(){
		if(self._proxy.value)
			self._proxy.classList.add("sel");
		else
			self._proxy.classList.remove("sel");
	}

	//改变状态
	self._proxy.change = function(val){
		self._proxy.value = val;
		render();
	}
}




//======复选按钮======
mod.Check = function(d){
	var self = this;
	var React = lcg.$react;
	//初始化dom
	this.$doms(
	<div onclick={function(){
		self._proxy.value = !self._proxy.value;
		render();
		//触发事件
		if(d.onselect)
			d.onselect(self._proxy.value);
	}}>
		<i class="if icon-check"></i>
	</div>);

	//样式
	this.scss({
		"display":"inline-block",
		"width":"18px",
		"height":"18px",
		"position":"relative",
		"background-color":"#fff",
		"border-radius":"4px",
		"border":"1px solid #eee",
		"cursor":"pointer",
		"ui-click-ani":"@color",
		"transition":"all 0.3s",
		">i":{
			"transition":"all 0.15s",
			"display":"inline-block",
			"width":"100%",
			"height":"100%",
			"ui-float-center":"9px",
			"color":"#fff",
			"margin-top":"-11px",
			"margin-left":"-8px",
			"transform":"scale3d(1.2,1.2,1)",
			"transition-delay":"0.2s",
			"opacity":0,
		},
		".sel":{
			"background-color":"@color",
			">i":{
				"transform":"scale3d(1,1,1)",
				"opacity":1
			}
		}
	});

	self._proxy.value = false;

	//渲染
	var render = function(){
		if(self._proxy.value == true)
			self._proxy.classList.add("sel");
		else
			self._proxy.classList.remove("sel");
	}

	//改变状态
	self._proxy.change = function(val){
		self._proxy.value = val;
		render();
	}
}