

//静态样式处理类
var ice = module.exports = function(dom){
	//如果该组件已渲染过
	if(styles[this.__funcID]){
		this._proxy.classList.add(styles[this.__funcID].class);
		return;
	}
	//开始进行渲染
	var Jax = function(){
		
	}
}


//样式哈希表
var styles = {};