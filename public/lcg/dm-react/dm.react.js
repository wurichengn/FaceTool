var DM = require("./dm-react.js");
var lcg = DM.lcg;


//渲染函数
lcg.$react = {
	//创建节点
	createElement:function(type,attrs){
		attrs = attrs || {};
		//基本dom
		var dom = {type:type,attrs:attrs,__ele:true};
		//子节点获取
		var childs = [];
		for(var i = 2;i < arguments.length;i++)
			childs.push(arguments[i]);
		attrs._childs = childs;
		return dom;
	}
}


//渲染内容
lcg.$render = function(dom,target,info){
	//是否是根节点
	var isRoot = false;
	//初始化info
	if(info == null){
		isRoot = true;
		//基本参数
		info = {
			//此次渲染主dom
			main:dom
		};
		//记录ids
		dom.ids = dom.ids || {};
	}

	//变量装换
	var attrs = dom.attrs;

	var re;
	//不同类型dom初始化
	if(typeof dom.type == "string")
		re = document.createElement(dom.type);
	else{
		for(var i in attrs._childs)
			attrs._childs[i]._info = info;
		re = dom.type.option({childDom:attrs._childs}).new(attrs);
	}

	//如果有lid
	if(attrs["lid"]){
		(dom._info?dom._info.main:info.main).ids[attrs["lid"]] = re;
	}

	//添加子节点
	var addNode = function(tag){
		tag = tag || "";
		//根据内容渲染
		if(typeof tag != "object"){
			var text = document.createTextNode(tag);
			re.appendChild(text);
		}else{
			//渲染组件
			if(tag.__ele)
				re.appendChild(lcg.$render(tag,null,info));
			//渲染列表
			else if(Object.prototype.toString.call(tag) == "[object Array]"){
				for(var i in tag)
					addNode(tag[i]);
			}else
				//渲染dom
				re.appendChild(tag);
		}
	}

	//如果有子节点
	if(attrs["_childs"]){
		var cds = attrs["_childs"];
		delete attrs["_childs"];
		//组件类型dom不增加子节点
		if(typeof dom.type == "string"){
			for(var i in cds)
				addNode(cds[i]);
		}
	}

	//如果是dom-slot
	if(attrs["dom-slot"] && info.main._option){
		delete attrs["dom-slot"];
		var cds = info.main._option.childDom;
		for(var i in cds)
			addNode(cds[i]);
	}

	//写入属性
	for(var i in attrs){
		if(typeof attrs[i] == "function" || typeof attrs[i] == "object")
			re[i] = attrs[i];
		else
			re.setAttribute(i,attrs[i]);
	}

	//根节点操作
	if(isRoot){
		re.ids = info.main.ids;
	}

	return re;
}