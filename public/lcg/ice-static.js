

//全局类名
var className = "lcg-ice-class-key-";


//全局静态影像管理器
var Static = module.exports = {};


//已绑定的样式表
var binds = {};

//全局class接收对象
var styleDom = document.createElement("style");
document.head.appendChild(styleDom);

//全局计时
/*var needRender = false;
var step = function(){
	setTimeout(step);
	if(!needRender)
		return;
	needRender = false;
	renderAll();
}
step();*/

//进行一次全局渲染
var renderAll = function(){
	//开始渲染
	var str = "";
	for(var i in binds)
		str += binds[i].str() + "\n";
	styleDom.innerHTML = str;
}

//获取对应的内容处理器
Static.getJax = function(id){
	if(binds[id] == null)
		binds[id] = new Jax(id);
	return binds[id];
}

//内容处理器
var Jax = function(id){
	var self = this;

	this.id = id;

	//样式
	var cls = "";
	var lastJSON = null;
	var num = 0;

	//保存样式
	var hx = {}

	//获取样式文本
	this.str = function(){
		return cls;
	}

	//渲染内容
	this.render = function(style,str){
		if(cls == style)
			return;
		cls = style;
		hx[str || lastJSON] = cls;
		renderAll();
		self.initEnd = true;
		return num > 1;
	}

	//获取类名
	this.className = className + id;

	//初始化过
	this.initEnd = false;

	//是否需要渲染
	this.needRender = function(json){
		var str = "";
		try{
			str = JSON.stringify(json);
		}catch(e){}
		if(hx[str]){
			self.render(hx[str],str);
			return false;
		}
		lastJSON = str;
		return true;
	}

}