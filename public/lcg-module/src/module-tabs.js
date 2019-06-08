var mod = require("../index.js");
var lcg = require("lcg");
var React = lcg.react;


/**
 * 多标签页组件
 */

mod.Tabs = function(){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<div class="menu" lid="menu"></div>
		<div class="panle" lid="panle"></div>
	</div>);

	//保留的面板节点
	var doms = self._proxy.doms = {};
	var titles = self._proxy.titles = {};

	//样式
	this.css({
		"ui-layout":["v",null,1],
		">.menu":{
			"text-align":"left",
			"-webkit-user-select":"none",
			"height":"35px",
			"position":"relative",
			"z-index":0,
			"border-bottom":"1px solid #ddd",
			"background-color":"#f8f8f8",
			">z":{
				"display":"inline-block",
				"height":"30px",
				"position":"relative",
				"top":"5px",
				"line-height":"30px",
				"border":"1px solid #ddd",
				"border-bottom":"none",
				"padding":"0px 10px",
				"border-radius":"5px 5px 0px 0px",
				"cursor":"pointer",
				"margin":"0px 3px",
				//"transition":"all 0.4s",
				".sel":{
					"background-color":"#fff",
					"color":"@color",
					"border-color":"@color"
				},
				">i":{
				    "position": "relative",
				    "font-size": "12px",
				    "display": "inline-block",
				    "margin-left": "2px",
				    "color": "#000",
				    "opacity": 0.4,
				    ":hover":{
				    	"opacity":1
				    }
				}
			}
		},
		">.panle":{
			"overflow":"hidden"
		}
	});

	//切换到对应的面板
	this.change = this._proxy.change = function(key){
		//切换标题样式
		for(var i in titles)
			titles[i].classList.remove("sel");
		titles[key].classList.add("sel");
		//切换面板
		for(var i in doms)
			doms[i].style["display"] = "none";
		doms[key].style["display"] = "";
	}

	//关闭对应的面板
	this.close = this._proxy.close = function(key){
		//移除面板和标题
		if(titles[key]){
			self.ids["menu"].removeChild(titles[key]);
			delete titles[key];
		}
		if(doms[key]){
			self.ids["panle"].removeChild(doms[key]);
			delete doms[key];
		}
	}

	//添加标签页
	this.add = this._proxy.add = function(dt){
		var key = dt.key;
		//初始化对象
		var a = <z>{dt.title}</z>;
		a.onclick = function(){
			if(doms[key])
				self.change(key);
			if(dt.onclick)
				dt.onclick();
		}
		self.ids["menu"].appendChild(a);
		//如果是插入
		if(dt.insert && titles[dt.insert])
			self.ids["menu"].insertBefore(a,titles[dt.insert]);
		titles[key] = a;
		//加入面板
		if(dt.panle){
			doms[key] = dt.panle;
			dt.panle.style["display"] = "none";
			self.ids["panle"].appendChild(dt.panle);
		}
		//如果可关闭
		if(dt.close){
			a.appendChild(<i class="if icon-close" onclick={function(e){
				e.stopPropagation();
				self.close(key);
			}}></i>);
		}
	}

	/*this.add({title:"测试1",key:"t1",panle:<w>t1</w>});
	this.add({title:"测试2",key:"t2",close:true,panle:<w>t2</w>});
	this.add({title:"测试3",key:"t3",onclick:function(){console.log("t3")}});
	this.add({title:"测试4",key:"t4",panle:<w>t4</w>,insert:"t3"});*/
};