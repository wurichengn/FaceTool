//主动初始化
Function.prototype.new = function(){
	var list = [];
	for(var i = 0;i < arguments.length;i++)
		list.push(arguments[i]);
	//如果有option
	var option = this.__option;
	delete this.__option;
	return new lcg(this,list,option);
}

//初始化前参数
Function.prototype.option = function(option){
	this.__option = option;
	return this;
}

//函数添加钩子
Function.prototype.hook = function(key,cb){
	this.__hook = this.__hook || {};
	this.__hook[key] = this.__hook[key] || [];
	this.__hook[key].push(cb);
}


//为每个组件类型分配唯一ID
var Funcs = [];


//======构建器======
var lcg = function(func,vals,option){
	//保存构建主函数
	this.__func = func;
	//分配ID
	if(Funcs.indexOf(func) < 0){
		Funcs.push(func);
	}
	this.__funcID = Funcs.indexOf(func);
	//保存config
	this._option = option || {};
	//保存参数
	this._vals = vals;
	//如果有固定代理对象
	if(this._option.proxy)
		this.proxy(this._option.proxy,true);

	//======前置继承表======
	this._option.extends = this._option.extends || [];

	//前置继承处理
	var extendVals = [""];
	for(var i in vals)
		extendVals.push(vals[i]);
	for(var i in this._option.extends){
		extendVals[0] = this._option.extends[i];
		this.extend.apply(this,extendVals);
	}



	//======构造模型======
	var re = func.apply(this,vals);



	//======后置继承表======
	this._option.extendsAfter = this._option.extendsAfter || [];

	//加入插件
	for(var i in lcg.Plugins["module"]){
		if(lcg.Plugins["module"][i][0] == func || lcg.Plugins["module"][i][0] == "*")
			this._option.extendsAfter.push(lcg.Plugins["module"][i][1]);
	}

	//后置继承处理
	for(var i in this._option.extendsAfter){
		extendVals[0] = this._option.extendsAfter[i];
		this.extend.apply(this,extendVals);
	}

	//如果依然无代理则代理自身
	if(this._proxy == null)
		this.proxy(this);

	//触发初始化完成事件
	this.sendMessage("module-ready");
	
	//返回对象
	return re || this._proxy;
}

//构造器原型
lcg.prototype = {
	//代理   有cover强制写入
	proxy:function(proxy,cover){
		//判断是否可写入
		if(proxy != null && (this._proxy == null || cover))
		{
			//写入proxy
			this._proxy = proxy;
			//proxy反向标记
			proxy.$ = proxy.module = proxy.lModule = this;
		}
		return this._proxy;
	},
	//继承
	extend:function(func){
		if(func == "dom-module")
			func = lcg.dm;
		if(typeof func != "function")
			return;
		//分配ID
		if(Funcs.indexOf(func) < 0){
			Funcs.push(func);
		}
		var funcID = this.__funcID;
		this.__funcID = Funcs.indexOf(func);
		//截取参数表
		var vals = [];
		for(var i = 1;i < arguments.length;i++)
			vals.push(arguments[i]);
		var re = func.apply(this,vals);
		//恢复id
		this.__funcID = funcID;
        return re;
	},
	//绑定消息
	message:function(key,value){
		if(typeof key != "string"){
			for(var i in key)
				this.message(i,key[i]);
			return;
		}
		if(this._msgs == null)
			this._msgs = {};
		if(this._msgs[key] == null)
			this._msgs[key] = [];
		this._msgs[key].push(value);
	},
	//触发消息
	sendMessage:function(name){
		//截取参数表
		var vals = [];
		for(var i = 1;i < arguments.length;i++)
			vals.push(arguments[i]);
		
		//触发消息
		if(this._msgs == null)
			this._msgs = {};
		for(var i in this._msgs[name]){
			this._msgs[name][i].apply(this,vals);
		}
	},
	//触发钩子
	triggerHook:function(key){
		var hooks = this.__func.__hook || {};
		//截取参数
		var list = [];
		for(var i = 1;i < arguments.length;i++)
			list.push(arguments[i]);
		//循环触发钩子函数
		for(var i in hooks){
			if(key != "*" && key != i && i != "*")
				continue;
			for(var j in hooks[i]){
				if(i == "*")
					hooks[i][j].apply(this,arguments);
				else
					hooks[i][j].apply(this,list);
			}
		}
	},
	//快速继承自dom
	$dom:function(dom){
		this.extend(lcg.dm,dom);
	},
	//快速继承自react语法dom
	$doms:function(func){
		this.extend(lcg.dmReact,func);
	}
}

//兼容初始化
lcg.create = function(func){
	var args = [];
	for(var i = 1;i < arguments.length;i++)
		args.push(arguments[i]);
	return func.new.apply(func,args);
}


//暴露内容
module.exports = lcg;