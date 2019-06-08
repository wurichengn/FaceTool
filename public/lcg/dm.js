var Eng = require("./eng.js")

module.exports = function(lcg){

	//全局DM组件编号
	var DMID = 1926;

	//dom-module基本组件
	lcg.dm = function(dom){
		//兼容新版本
		if(dom.$$typeof)
			dom = lcg.render(dom);

		var self = this;
		//是否继承过domModule
		if(this.__hasDomModule)
			return;
		this.__hasDomModule = true;
		
		//全局编号
		var id = self._dmid = DMID;
		DMID++;
		
		//代理dom
		this.proxy(dom);

		//domFac
		this.extend(domFac);

		//设置
		self.attr(this._option.prefabAttr);
		this.attr({"lcg-dom-message":true});

		//设置数据集
		for(var i in this._proxy._vueData){
			var data = {data:this._proxy._vueData || {}};
			//设置dom对象
			data.el = data.el || this._proxy;
			this._vue = new Eng(data);
			break;
		}

		//ids映射 及 dom-slot处理
		this._proxy.ids = this.ids = {};

		//获取dom-slot
		self.for(function(d){
			//如果是dom-slot
			if(d.getAttribute("dom-slot")){
				var cds = self._option.prefabDom.childNodes;
				var list = [];
				self._option.prefabDom._childNodes = list;
				while(cds.length > 0){
					list.push(cds[0]);
					d.appendChild(cds[0]);
				}
			}
			//如果是组件
			if(d._prefab){
				var lid = d.getAttribute("lid");
				if(lid && self.ids[lid] == null)
					self.ids[lid] = d;
				return d._prefab;
			}
			//记录ids
			var attr = $(d).attr("lid");
			if(attr)
				if(self.ids[attr] == null)
					self.ids[attr] = d;
		});

		//定义样式
        this.css = function(dom,args,isStatic){
            if(dom == null)
                return this._css;
            //设置属性
            //this._proxy.setAttribute("ice-key","dm-"+id);
            //初始化对象
            if(!this._css || isStatic){
                //初始化css
                this._css = new lcg.ICE(dom,"dm-"+id,{dom:self._proxy,static:(isStatic)?this.__funcID:null});
                if(!this._css || !this._css.render)
                	return;
                this._css.args(args);
                if(!isStatic){
                	this._proxy.appendChild(this._css.styleDom);
                	this._css.render();
                	this._css.play();
                	//侦听全局刷新
	                this.message("lcg-css-render",function(){
	                    self._css.render();
	                });
                }else{
                	//全局结束后刷新
                	this._css.render();
                	this._css.play();
                }
            }else{
                //继承新的属性进入css
                this._css.extend(dom,true);
                this._css.args(args);
                this._css.render();
                this._css.play();
            }
            return this._css;
        }

        //静态样式
        this.scss = function(dom,args){
        	return this.css(dom,args,true);
        }

        return this._vue;
	}









	//dom基本功能
	var $ = lcg.$ = function(dom){
		return domFac.new(dom);
	}



	//============================dom常用功能工厂=================================
	var domFac = lcg.dm.domFac = function(dom){
		dom = dom || this._proxy;

		//======节点全循环======
		this.for = function(cb){
			forDom(cb,dom);
		}
		//循环节点
		var forDom = function(cb,dom){
			if(dom.nodeName == "#text")
				return;
			var re = cb(dom)
			if(re == false)
				return;
			if(re != null)
				return forDom(cb,re);
			var cs = dom._childNodes || dom.childNodes;
			for(var i = 0;i < cs.length;i++)
				forDom(cb,cs[i]);
		}

		//======获取全部属性======
		this.attr = function(key,val){
			var ats = attr();
			if(key == null && val == null)
				return ats;
			if(typeof key == "string" && String(val) == "undefined")
				return ats[key];
			if(typeof key == "string"){
				if(typeof val != "function")
					return dom.setAttribute(key,val);
				else
					return dom[key] = val;
			}
			for(var i in key)
				if(key[i] == null || (typeof key[i] != "function" && typeof key[i] != "object"))
					dom.setAttribute(i,key[i]);
				else
					dom[i] = key[i];
		}
		var attr = function(){
			var re = {};
			var ats = dom.attributes;
			for(var i = 0;i < ats.length;i++){
				re[ats[i].name] = ats[i].value;
			}
			return re;
		}


		//======class控制======
		this.addClass = function(val){
			dom.classList.add(val);
		}

		this.removeClass = function(val){
			dom.classList.remove(val);
		}

		//======样式设置读取======
		this.style = function(key,val){
			var ats = style();
			if(key == null && val == null)
				return ats;
			if(typeof key == "string" && String(val) == "undefined")
				return ats[key];
			if(typeof key == "string")
				return dom.style[key] = val;
			for(var i in key)
				dom.style[i] = key[i];
		}

		var style = function(){
			return window.getComputedStyle(dom,null);
		}

		//======dom事件侦听======
        this.on = function(key,cb){
            lcg.domEvent(this._proxy,key,cb.bind(this));
        }

        //======从父节点删除======
        this.remove = function(){
            try{
                this._proxy.parentNode.removeChild(this._proxy);
            }catch(e){}
        }

	}

};