

var DM = module.exports = function(lcg){
	DM.lcg = lcg;

	//引入其他功能
	//渲染相关功能
	require("./dm.react.js");

	DMID = 1825;

	//ReactDom模块
	lcg.dmReact = function(func){
		var self = this;

		//全局编号
		var id = self._dmid = DMID;
		DMID++;

		//渲染
		this.$render = function(){
			var dom = func;
			if(typeof func == "function")
				var dom = func.call(self);
			dom._option = self._option || {};
			//渲染
			self.proxy(lcg.$render(dom));
            self._proxy.setAttribute("lcg-dom-message",true);
			self.ids = self._proxy.ids;
		}

		//首次渲染
		this.$render();

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
	}

}