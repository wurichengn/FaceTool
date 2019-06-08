module.exports = function(lcg){

	//ReactDOM缺省
	var ReactDOM;
	var React;
	try{
		React = require("react");
		ReactDOM = require("react-dom");
	}catch(e){}


	//创建内容
	var create = lcg.render = lcg.$r = function(d,par){
		//如果是数组数据
		if(Object.prototype.toString.call(d) == '[object Array]'){
			var re = [];
			for(var i = 0;i < d.length;i++)
				re.push(lcg.render(d[i]));
			return re;
		}

		//数据转换
		var tagName = d.type;
		//属性
		var attr = {};
		for(var i in d.props)
			if(i != "children")
				attr[i] = d.props[i];
		//子节点
		var children = d.props.children;
		if(Object.prototype.toString.call(children) != '[object Array]')
			children = [children];

		//SVG节点
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
			}else
				dom.setAttribute(i,attr[i]);
			dom[i] = attr[i];
		}

		var vueData = {};

		//加入一个内容
		var addOne = function(tag){
			//普通文本内容
			if(typeof tag == "string" || typeof tag == "number" || tag == null){
				if(tag == null)
					tag = "";
				tag = tag + "";
				if(tag.length > 0){
					var text = document.createTextNode(tag);
					dom.appendChild(text);
				}
			}else if(Object.prototype.toString.call(tag) == '[object Object]'){
				if(tag.$$typeof){
					var dt = lcg.render(tag,dom);
					//React数据
					dom.appendChild(dt);
				}else{
					//数据绑定对象
					for(var i in tag){
						var text = document.createTextNode("{{"+i+"}}");
						dom.appendChild(text);
						vueData[i] = tag[i];
					}
				}
			}else if(Object.prototype.toString.call(tag) == '[object Array]'){
				for(var i in tag)
					addOne(tag[i]);
			}else{
				/*dom.appendChild(tag);
				for(var i in tag._vueData)
					vueData[i] = tag._vueData[i];*/
			}
		}

		//内容加入
		for(var i = 0;i < children.length;i++){
			var tag = children[i];
			addOne(tag);
		}

		dom._vueData = vueData;

		//如果是组件
		if(typeof tagName != "string"){
			//对React组件进行测试
			var isr = false;
			var ise = false;
			if(tagName.prototype && tagName.prototype.isReactComponent){
				try{
					//react组件
					var div = document.createElement("div");
					dom = ReactDOM.render(d,div);
					dom = div.childNodes[0];
					ise = true;
				}catch(e){}
			}
			
			if(!ise){
				if(isr == false){
					//lcg组件
					var domz = dom;
					dom = tagName.option({prefabDom:dom,prefabAttr:attr}).new(attr);
					dom._prefab = domz;
					var div = document.createElement("div");
					div.appendChild(dom);
				}else{
					//react组件
					var div = document.createElement("div");
					dom = ReactDOM.render(d,div);
					dom = div.childNodes[0];
				}
			}
		}

		return dom;
	};



	//渲染内容
	lcg.createElement = function(){
		if(lcg.reactMode == "self")
			return lcg.createRectElement.apply(lcg,arguments);
		return React.createElement.apply(React,arguments);
	}

	//主渲染
	lcg.createElementMain = function(){
		if(lcg.reactMode == "self")
			return lcg.createRectElement.apply(lcg,arguments);
		var data = lcg.createElement.apply(lcg,arguments);
		var re = create(data);
		re.$v = data;
		return re;
	}



	/*var append = Node.prototype.appendChild;
	Node.prototype.appendChild = function(dom){
		try{
			append.call(this,dom);
		}catch(e){
			dom = lcg.render(dom);
			append.call(this,dom);
		}
	};*/

};