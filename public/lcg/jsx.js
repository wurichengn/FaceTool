module.exports = function(lcg){

	var idoms = {};


	var create = lcg.createRectElement = function(tagName,attr){		//SVG节点
		var svgns = "http://www.w3.org/2000/svg";
		var svgNodes = {
			"svg":true,
			"rect":true,
			"circle":true,
			"ellipse":true,
			"line":true,
			"polyline":true,
			"polygon":true,
			"path":true,
			"defs":true,
			"filter":true,
			"lineargradient":true,
			"stop":true,
			"g":true
		};

		//属性缺省
		attr = attr || {};
		if(attr.attrs != null && Object.prototype.toString.call(attr.attrs) == '[object Object]')
			for(var i in attr.attrs)
				attr[i] = attr.attrs[i];

		//创建节点
		var tag = "div";
		if(typeof tagName == "string")
			tag = tagName;
		//是否是svg节点
		if(svgNodes[tag] || tag.substr(0,2) == "fe")
			var dom = document.createElementNS(svgns,tag);
		else
			var dom = document.createElement(tag);
		

		//插入属性
		for(var i in attr){
			if(typeof attr[i] == "function"){
				//dom[i] = attr[i];
			}else{
				if(attr[i] == null || (typeof attr[i] != "function" && typeof attr[i] != "object") )
					dom.setAttribute(i,attr[i]);
			}
			dom[i] = attr[i];
		}

		var vueData = {};

		//加入一个内容
		var addOne = function(tag){
			if(typeof tag == "string" || typeof tag == "number" || tag == null){
				if(tag == null)
					tag = "";
				var text = document.createTextNode(tag);
				dom.appendChild(text);
			}else if(Object.prototype.toString.call(tag) == '[object Object]'){
				for(var i in tag){
					var text = document.createTextNode("{{"+i+"}}");
					dom.appendChild(text);
					vueData[i] = tag[i];
				}
			}else if(Object.prototype.toString.call(tag) == '[object Array]'){
				for(var i in tag)
					addOne(tag[i]);
			}else{
				dom.appendChild(tag);
				for(var i in tag._vueData)
					vueData[i] = tag._vueData[i];
			}
		}

		//内容加入
		for(var i = 2;i < arguments.length;i++){
			var tag = arguments[i];
			addOne(tag);
		}

		dom._vueData = vueData;

		//如果是组件
		if(typeof tagName != "string"){
			var domz = dom;
			dom = tagName.option({prefabDom:dom,prefabAttr:attr}).new(attr);
			dom._prefab = domz;
		}

		//ids赋值
		dom.ids = {};
		for(var i in idoms)
			dom.ids[i] = idoms[i];

		return dom;
	}

	lcg.react = {createElement:create};

	//设置react模式
	lcg.setReactMode = function(val){
		lcg.reactMode = val;
		if(val == "self"){
			window.React = lcg.react;
		}
	}

};