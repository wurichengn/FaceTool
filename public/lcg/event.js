module.exports = function(lcg){
	//======事件系统======
	//事件表
	var events = lcg._events = lcg._events || {
		"bind":[]
	};
	
	//帧听事件
	lcg.on = function(name,cb){
		if(events[name] == null)
			events[name] = [];
		events[name].push(cb);

		//初始化
		if(name == "ready" && isReady == true)
			cb();
	}

	//触发事件
	var trigger = function(name,vals){
		if(events[name] == null)
			events[name] = [];
		var isEnd = false;
		vals = vals || {};
		vals.$stop = function(){
			isEnd = true;
		}
		vals.$type = name;
		//循环触发回调
		var es = events[name];
		for(var i in events[name])
		{
			//去除空回调
			if(!es[i])
				es.splice(i,1);
			//触发回调
			var re = es[i](vals);
			if(isEnd)
				return re;
		}
	}
	lcg.trigger = trigger;

	//triggerDom额外触发dom
	var otherDoms = [
		document
	];

	//触发dom事件
	lcg.triggerDom = function(name,vals,doms){
		doms = doms || otherDoms;
		if(Object.prototype.toString.call(doms)!='[object Array]')
			doms = [doms];
		vals = vals || {};
		
		for(var k in doms){
			var dom = doms[k];
			if(dom.module)
				dom.module.sendMessage(name,vals);

			var list = dom.querySelectorAll("*[lcg-dom-message]");

			for(var j = 0;j < list.length;j++){
				var ds = list[j];
				//如果存在组件
				if(ds.module)
					ds.module.sendMessage(name,vals);
			}
		}

		return;

		//如果存在组件
		if(dom.getModule && dom.getModule.modules){
			for(var i in dom.getModule.modules){
				dom.getModule.modules[i].sendMessage(name,vals);
				break;
			}
		}
		//如果没有子节点
		if(dom.childNodes == null)
			return;
		for(var i = 0;i < dom.childNodes.length;i++){
			lcg.triggerDom(name,vals,dom.childNodes[i]);
		}
	}

	lcg.triggerDom.add = function(dom){
		otherDoms.push(dom);
	}

	//文档载入完毕事件
	var ready = function(fn){
        if(document.addEventListener){//兼容非IE  
            document.addEventListener("DOMContentLoaded",function(){  
                //注销事件，避免反复触发  
                document.removeEventListener("DOMContentLoaded",arguments.callee,false);  
                fn();//调用参数函数  
            },false);  
        }else if(document.attachEvent){//兼容IE
            document.attachEvent("onreadystatechange",function(){  
                if(document.readyState==="complete"){  
                    document.detachEvent("onreadystatechange",arguments.callee);  
                    fn();  
                }  
            }); 
        }
        //if(document.readyState == "complete" || document.readyState == "interactive")
        //	fn();
    }

    var isReady = false;

    //帧听文档事件触发ready
    lcg._ready = function(){
    	if(isReady)
    		return;
    	//触发插件准备事件
    	trigger("plugin-ready");
    	//触发准备完毕事件
    	trigger("ready");
    	isReady = true;
    }
    ready(lcg._ready);

    //全局时钟间隔
    lcg.delayTime = 20;

    //全局时钟
    var step = function(){
    	setTimeout(step,lcg.delayTime);
    	trigger("dt");
    	lcg.triggerDom("dt");
    }
    step();

    //Dom节点事件
    lcg.domEvent = function(dom,name,cb){
    	if(typeof name == "string")
    		name = [name];
    	for(var i in name){
	    	if(dom.addEventListener)
	    		dom.addEventListener(name[i],cb,false);
	    	else
	    		dom.attachEvent("on"+name[i],cb);
    	}
    }
};