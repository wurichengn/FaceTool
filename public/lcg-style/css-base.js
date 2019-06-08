var lcg = require("lcg");

var re = {};


var copyJSON = function(form,to,fg){
	//循环处理json部分
	for(var i in form){
		if(to[i] != null && typeof to[i] == "object" && typeof form[i] == "object")
			copyJSON(form[i],to[i],fg);
		else if(to[i] == null || fg){
			if(typeof form[i] != "object")
				to[i] = form[i];
			else
				to[i] = lcg.cloneJSON(form[i]);
		}
	}
}



//======简单绑定样式======
re.bind = function(key,cb){
	lcg.ICE.key(key,function(dt){
		//创建fac
		var obj = new Fac(dt);
		//执行功能
		var re = cb.apply(obj,[dt.val]);
		//覆盖参数
		try{
			copyJSON(re,dt.dom);
		}catch(e){}
	});
}

//功能对象
var Fac = function(dt){
	var self = this;
	//写入内容
	for(var i in dt)
		this[i] = dt[i];

	//获取全部dom
	this.getDoms = function(){
		if(dt.module.option == null)
			return;
		if(dt.module.option.dom == null)
			return;
		var list = [];
		//如果是自身
		if(dt.cssKey.indexOf("]") == dt.cssKey.length - 1)
			list = [dt.module.option.dom];
		else{
			//查询子节点
			var doms = dt.module.option.dom.querySelectorAll(dt.cssKey);
			for(var i = 0;i < doms.length;i++)
				list.push(doms[i]);
		}
		return list;
	}

	//对所有dom进行操作
	this.domsFor = function(cb){
		var doms = self.getDoms();
		for(var i in doms)
			cb(doms[i]);
	}

	//对所有dom添加事件
	this.domsEvent = function(key,cb){
		self.domsFor(function(dom){
			lcg.domEvent(dom,key,cb);
		});
	}
}

module.exports = re;