module.exports = function(lcg){

	//lcg.js插件系统
	lcg.Plugins = {
		//组件后置逻辑
		module:[]
	};

	//添加插件
	lcg.plugin = function(key){
		//保留参数
		var list = [];
		for(var i = 1;i < arguments.length;i++)
			list.push(arguments[i]);
		//插入到插件系统中
		if(lcg.Plugins[key] == null)
			lcg.Plugins[key] = [];
		lcg.Plugins[key].push(list);
	}

};