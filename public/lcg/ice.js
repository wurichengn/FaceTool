var easycolor = require("./easycolor.js");
var Static = require("./ice-static.js");

//构造对象
module.exports = function(lcg){
	//全局参数
	var globalArgs = {};

	//一些配置
	var gConfig = {
		//使用变量
		ver:false
	};
	
	//判断是否支持css变量
	if(window.CSS && window.CSS.supports && window.CSS.supports('--a', 0)){
		gConfig.ver = false;//true;
	}else{
		gConfig.ver = false;
	}
	
	//ICE主体
	lcg.ICE = function(dom,key,option){
		option = option || {};
		var self = this;
		this.option = option;
		this.key = key;
		var keyClass;
		//构建静态对象
		var stas;
		if(option.dom && option.static != null){
			stas = Static.getJax(option.static);
			option.dom.classList.add(stas.className);
			if(stas.initEnd)
				return;
			var saveKey = key;
			key = "static-" + stas.id;
			keyClass = stas.className;
			option.dom.setAttribute("ice-key",key);
		}else{
			if(option.dom)
				option.dom.setAttribute("ice-key",key);
		}
		//构造缺省
		dom = dom || {};
		dom = lcg.cloneJSON(dom);
		var defDom = lcg.cloneJSON(dom);
		
		//变量参数
		var args = {};
		//创建的动画列表
		var anis = {};
		var aniList = {};
		//动画键
		var aniKey = 0;

		//渲染用style标签
		this.styleDom = document.createElement("style");
		this.styleDom.style["display"] = "none";

		//子id下标
		var subID = 0;

		//渲染为css代码
		this.render = function(){
			//静态处理判断
			if(stas){
				//是否需要更新
				if(!stas.needRender(dom))
					return;
			}

			//最终解释出的css
			var str = "";
			//收集所有解释结果
			var re = {};
			var _args = {};
			writeArgs(args,_args);
			writeArgs(globalArgs,_args);
			subID = 0;
			if(keyClass){
				Jax(dom,re,"."+keyClass,_args);
			}else{
				if(key)
					Jax(dom,re,"[ice-key='"+key+"']",_args);
				else
					Jax(dom,re,"",_args);
			}

			//加入所有动画
			for(var i in anis){
				if(key)
					str += "@keyframes "+key+"-"+i+"-"+aniKey+"{" + anis[i] + "}\n";
				else
					str += "@keyframes "+i+"{" + anis[i] + "}\n";
			}
			
			//循环构造所有的样式
			for(var i in re){
				str += i+"{"+re[i]+"}\n";
			}

			//写入到标签中
			this.styleDom.innerHTML = str;

			//渲染
			if(stas)
				stas.render(str);

			//返回渲染的结果
			return str;
		}

		//写入一组参数
		var writeArgs = function(args,to){
			for(var i in args){
				if(to[i.length] == null)
					to[i.length] = {};
				if(to[i.length][i] == null)
					to[i.length][i] = args[i];
			}
		}

		//设置参数
		this.args = function(dom){
			for(var i in dom)
				args[i] = dom[i];
			//如果是变量模式
			if(gConfig.ver && option.dom){
				for(var i in args)
					option.dom.style.setProperty("--"+i,args[i]);
			}
			return this;
		}

		//清除构造
		this.clear = function(){
			dom = {};
			anis = {};
			aniList = {};
			return this;
		}

		//恢复为默认
		this.refDef = function(){
			dom = lcg.cloneJSON(defDom);
			aniList = {};
			return this;
		}

		//继承内容
		this.extend = function(d,fg){
			extendJSON({"$":d},dom,fg);
		}

		//设置默认样式
		this.setDef = function(d){
			defDom = d;
			return this;
		}

		//设置key
		this.setKey = function(k){
			key = k;
			return this;
		}

		//重新播放动画
		this.rePlay = function(){
			aniKey++;
			this.render();
			return this;
		}

		//播放动画
		this.play = function(k){
			k = k || "_def";
			if(k != null && aniList != null){
				anis = {};
				for(var i in aniList[k])
					this.ani(i,aniList[k][i]);
			}
			this.rePlay();
			return this;
		}

		//构造动画
		this.ani = function(name,d){
			//var str = "@keyframes "+key+"-"+name+"{";
			var str = "";
			//创建动画
			for(var i in d){
				str += i+" {";
				for(var j in d[i]){
					str += j+":"+d[i][j]+";";
				}
				str += "}";
			}
			anis[name] = str;
			return this;
		}

		//初始化动画
		var initAni = function(dom){
			//======处理动画======
			if(dom["$anis"]){
				aniList["_def"] = aniList["_def"] || {};
				copyJSON(dom["$anis"],aniList["_def"],true);
				delete dom["$anis"];
			}
			for(var i in dom){
				if(i.substr(0,5) == "$anis"){
					var ke = i.substr(6);
					aniList[ke] = dom[i];
					aniList[ke] = aniList[ke] || {};
					copyJSON(dom[i],aniList[ke],true);
					delete dom[i];
				}
			}
		}

		//样式解释器
		var Jax = function(dom,re,k,_args){
			var str = "";

			//当前解释组的唯一子ID
			var sid = subID;
			subID++;

			var domy = dom;
			var dom = lcg.cloneJSON(dom);

			//保留函数
			var funcs = {};
			for(var i in dom){
				if(typeof dom[i] == "function"){
					funcs[i] = dom[i];
					dom[i] = dom[i]();
				}
			}

			//处理继承
			if(dom["$"])
				extendJSON(dom);

			//参数覆盖
			var __args = lcg.cloneJSON(_args);
			if(dom["$args"]){
				for(var i in dom["$args"])
					__args[i] = dom["$args"][i];
			}

			//参数写入
			var writeArgs = function(str){
				str = str.toString();
				if(str.indexOf("@") >= 0){
					for(var i = 30;i >= 0;i--){
						for(var j in __args[i]){
							//如果是变量逻辑
							/*if(gConfig.ver)
								str = str.replace(new RegExp("@"+j,"g"),"var(--"+j+")");
							else*/
							//长度排序
							str = str.replace(new RegExp("@"+j,"g"),__args[i][j]);
						}
					}
				}
				//函数计算
				if(str.indexOf("[") > 0){
					//循环判断函数
					for(var i in Functions){
						while(true){
							var reg = new RegExp("("+i+")"+"\\[(.*?)\\]");
							var v = str.match(reg);
							if(v == null || v == "" || v.length == 0)
								break;
							str = str.replace(reg,Functions[v[1]].apply(Functions,v[2].split(",")));
						}
					}
				}
				return str;
			}

			//处理特殊字段(功能同继承)可循环复用
			while(true){
				var isend = true;
				for(var i in dom){
					if(Keys[i]){
						isend = false;
						Keys[i]({
							//原始值
							val:dom[i],
							//原始下标
							key:i,
							//样式名
							cssKey:k,
							//结构化对象
							dom:dom,
							//返回的真实对象
							re:re,
							//替换参数函数
							rep:writeArgs,
							//对象本体
							module:self,
							//唯一子ID
							sid:sid,
							//当前域参数组
							args:__args
							
						});
						delete dom[i];
					}
				}
				if(isend)
					break;
			}

			//初始化动画
			initAni(dom);

			//循环解释所有属性
			for(var i in dom){
				//如果$开头则跳过
				if(i[0] == "$")
					continue;
				//如果值是对象
				if(dom[i] != null && typeof dom[i] == "object"){
					var ikey = k+i;
					if(i.indexOf(",") >= 0){
						ikey = k + i.replace(/,/g,","+k);
					}
					Jax(dom[i],re,ikey,lcg.cloneJSON(__args));
					continue;
				}
				//如果是动画
				if(i == "ani"){
					if(key){
						var a = dom[i].split(" ");
						a[0] = a[0]+"-"+aniKey;
						str += "animation:"+key+"-"+a.join(" ")+";";
					}else{
						str += "animation:"+dom[i]+";";
					}
					continue;
				}
				//加入普通属性
				str += i+":"+dom[i]+";";
			}

			//参数写入
			if(str.indexOf("@") >= 0){
				for(var i = 30;i >= 0;i--){
					for(var j in __args[i]){
						//如果是变量逻辑
						if(gConfig.ver)
							str = str.replace(new RegExp("@"+j,"g"),"var(--"+j+")");
						else
							//长度排序
							str = str.replace(new RegExp("@"+j,"g"),__args[i][j]);
					}
				}
			}

			//函数计算
			if(str.indexOf("[") > 0){
				//循环判断函数
				for(var i in Functions){
					while(true){
						var reg = new RegExp("("+i+")"+"\\[(.*?)\\]");
						var v = str.match(reg);
						if(v == null || v == "" || v.length == 0)
							break;
						str = str.replace(reg,Functions[v[1]].apply(Functions,v[2].split(",")));
					}
				}
			}


			//函数恢复
			for(var i in funcs)
				dom[i] = funcs[i];

			re[k] = str;
		}
	}

	//json继承
	var extendJSON = lcg.extendJSON = function(dom,to,fg){
		to = to || dom;
		var d = dom["$"];
		if(Object.prototype.toString.call(dom["$"]) != '[object Array]')
			d = [d];
		for(var i in d){
			copyJSON(d[i],to,fg);
		}
		if(to["$"])
			delete to["$"];
	}

	//复制JSON
	var copyJSON = lcg.copyJSON = function(form,to,fg){
		//循环处理json部分
		for(var i in form){
			if(i == "$")
				continue;
			if(to[i] != null && typeof to[i] == "object" && typeof form[i] == "object")
				copyJSON(form[i],to[i],fg);
			else if(to[i] == null || fg){
				if(typeof form[i] != "object")
					to[i] = form[i];
				else
					to[i] = lcg.cloneJSON(form[i]);
			}
		}
		//如果需要继承
		if(form["$"])
			extendJSON(form,to,fg);
	}


	//======颜色处理器封装======
	var C = lcg.ICE.Color = function(c){
		var re = {};
		var color = easycolor(c);

		re.val = function(){
			return color.toString();
		}

		re.l = function(val){
			color.l += Number(val);
			return re;
		}

		re.a = function(val){
			color.a += Number(val);
			return re;
		}

		return re;
	}



	//处理函数
	var Functions = {
		//透明度
		"o":function(v,o){
			return new C(v).a(o).val();
		},
		//亮度
		"l":function(v,l){
			return new C(v).l(l).val();
		},
		//色相改变
		"h":function(v,l){
			var c = easycolor(v);
			c.v += Number(l);
			return c.toString();
		}
	}


	//全局参数设置
	lcg.ICE.args = function(d){
		if(d == -1)
			return globalArgs = {};
		for(var i in d){
			globalArgs[i] = d[i];
		}
		//如果是变量模式
		if(gConfig.ver){
			for(var i in globalArgs)
				document.documentElement.style.setProperty("--"+i,globalArgs[i]);
		}
		return globalArgs;
	}


	//外处理字段集
	var Keys = {

	};


	//全局外处理字段
	lcg.ICE.key = function(k,v){
		if(typeof k == "string"){
			var dom = {};
			dom[k] = v;
			k = dom;
		}
		for(var i in k){
			Keys[i] = k[i];
		}
	}


	//easycolor
	lcg.ICE.easycolor = easycolor;


};