var mod = require("../index.js");
var lcg = require("lcg");

/*===============
	常用功能集
===============*/

//快速config
var Config = function(d,cfg){
	for(var i in d)
		cfg[i] = d[i];
	return cfg;
}

//======内容单选功能======
mod.oneSel = function(d){
	var self = this;
	//默认参数
	var cfg = Config(d,{
		//类名
		class:"sel",
		//对象集合
		target:this._proxy.childNodes,
		//事件名
		event:"mod-onesel-change",
		//回调
		cb:null,
		//取值下标
		key:"key"
	});

	//对象集合
	var list = [];
	var hx = {};

	//如果是query
	if(typeof cfg.target == "string")
		cfg.target = this._proxy.querySelectorAll(cfg.target);

	//写入集合
	for(var i = 0;i < cfg.target.length;i++){
		var dom = cfg.target[i];
		//加入列表
		list.push(dom);
		//加入哈希表
		hx[dom.getAttribute(cfg.key)] = dom;
		//加入事件
		lcg.domEvent(dom,"click",function(){
			var dom = this.dom;
			//改变样式
			for(var i in list)
				list[i].classList.remove(cfg.class);
			dom.classList.add(cfg.class);
			//触发事件
			self.sendMessage(cfg.event,this);
			if(cfg.cb)
				cfg.cb(this);
		}.bind({id:i,key:dom.getAttribute(cfg.key),dom:dom}));
	}
	
	//操作处理对象
	var fac = {};
	fac["sel"] = function(key){
		if(hx[key])
			return hx[key].click();
		if(list[key])
			return list[key].click();
	}

	return fac;
}





//======动态全局更新参数组件======
mod.ConfigModule = function(base){
	var self = this;
	//参数
	var cfg = {

	};

	//内容是否相同
	var eq = function(a,b){
		//普通类型
		if(typeof a != typeof b)
			return false
		if(typeof a != "object" || a == null || b == null)
			return a == b;
		if(Object.prototype.toString.call(a) != Object.prototype.toString.call(b))
			return false;
		//数组类型
		if(Object.prototype.toString.call(a)=='[object Array]'){
			if(a.length != b.length)
				return false;
			for(var i = 0;i < a.length;i++)
				if(!eq(a[i],b[i]))
					return false;
			return true;
		}
		//对象类型
		if(Object.prototype.toString.call(a)=='[object Object]'){
			var pds = {};
			//判断a->b
			for(var i in a){
				pds[i] = true;
				if(!eq(a[i],b[i]))
					return false;
			}
			//判断b->a
			for(var i in b){
				if(!pds[i])
					if(!eq(a[i],b[i]))
						return false;
			}
			return true;
		}
		//其他类型
		return a == b;
	}

	//改变次数
	var num = -1;

	//写入参数
	this.config = function(dt){
		num++;
		var change = {};
		//循环写入数据
		for(var i in dt)
			if(!eq(cfg[i],eq(dt[i]))){
				cfg[i] = dt[i];
				change[i] = dt[i];
			}
		//触发消息
		lcg.triggerDom("mod-config-module-change",{
			config:cfg,
			value:dt,
			change:change,
			num:num
		},self._proxy);
	}

	//写入默认参数
	this.config(base);

}





//======拖动组件======
mod.Drag = function(d){
	var self = this;
	//基本配置
	var cfg = {
		//绑定鼠标事件的对象
		event:self._proxy,
		//拖动后移动left和top的对象
		target:self._proxy,
		//事件名
		message:"module-drag-move"
	};
	for(var i in d){
		cfg[i] = d[i];
	}

	var isd = false;
	var sx = 0,sy = 0;
	var stx = 0,sty = 0;

	//鼠标按下事件
	lcg.domEvent(cfg.event,"mousedown",function(e){
		sx = e.x;
		sy = e.y;
		stx = cfg.target.style["left"];
		if(stx == null || stx.length < 3)
			stx = "0px";
		stx = Number(stx.substr(0,stx.length - 2));
		sty = cfg.target.style["top"];
		if(sty == null || sty.length < 3)
			sty = "0px";
		sty = Number(sty.substr(0,sty.length - 2));
		isd = true;
	});
	
	//鼠标移动事件
	lcg.domEvent(document,"mousemove",function(e){
		if(!isd)
			return;
		var cx = e.x - sx;
		var cy = e.y - sy;
		cfg.target.style["left"] = stx + cx + "px";
		cfg.target.style["top"] = sty + cy + "px";
		//触发移动事件
		if(self.sendMessage)
			self.sendMessage(cfg.message);
	});

	//鼠标放开事件
	lcg.domEvent(document,"mouseup",function(e){
		isd = false;
	});
}