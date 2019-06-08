
var hql = require("./index.js");
var mod = require("lcg-module");
var lcg = require("lcg");




//======模型基类======
var Model = module.exports = function(key,info,infos){
	//参数
	var cfg = this.cfg = {
		//表名
		table:key,
		//真实名
		name:"内容",
		//列名
		cols:{},
		//查询参数
		queryInfo:{
			//默认查询列表
			list:true,
			//每次关联表
			link:null,
			//查询分页数
			pageSize:30
		}
	};

	//循环加入参数
	for(var i in info){
		if(typeof cfg[i] != "object" || cfg[i] == null)
			cfg[i] = info[i];
		else
			for(var j in info[i])
				cfg[i][j] = info[i][j];
	}

	//提示缺省
	if(cfg["noneTip"] == null)
		cfg["noneTip"] = "没有找到相关\""+cfg.name+"\"";

	//======初始化列数据======
	var cols = {
		id:{
			title:"编号",
			width:"100px",
			order:true
		}
	};
	for(var i in cfg.cols)
		cols[i] = cfg.cols[i];

	//循环处理列数据
	var list = [];
	for(var i in cols){
		var val = cols[i];
		//字符串缺省
		if(typeof val == "string")
			val = {title:val};
		//数组缺省
		if(Object.prototype.toString.call(val)=='[object Array]'){
			val = {
				title:val[0],
				width:val[1],
				trans:val[2]
			};
		}
		//写入key
		val["key"] = i;
		list.push(val);
	}
	cfg.cols = list;


	//查询参数
	this.query = async function(vals){
		var info = cfg.queryInfo;

		//初始化参数
		if(Object.prototype.toString.call(vals)=='[object Array]')
			vals = vals[0];
		vals = vals || {};

		//处理分页
		vals.limit = cfg.queryInfo.pageSize;

		//是否包含关联键
		if(info.link)
			vals[info.link] = vals[info.link] || {};

		//是否查询列表
		if(info.list)
			vals = [vals];

		//开始查询
		return await hql(cfg.table,vals);
	}

	//获取配置  只传递部分信息
	this.getInfo = function(){
		//克隆json
		var info = lcg.cloneJSON(cfg);

		//筛选参数
		var hx = {
			cols:true,
			noneTip:true,
			queryInfo:true
		}
		for(var i in info){
			if(!hx[i])
				delete info[i];
		}

		//附加额外参数
		for(var i in infos){
			if(i == "cols"){
				for(var j in infos[i])
					info.cols.push(infos[i][j]);
			}else{
				info[i] = infos[i];
			}
		}

		return info;
	}
}





//模型列表
var models = {};


//封装数据模型
Model.bind = function(key,info){
	models[key] = info;
}







//简单数据绑定表格
hql.Table = function(key,info){
	var self = this;
	if(typeof key == "object"){
		info = key;
		key = info.keys;
		delete info["key"];
	}

	//query缺省
	info.query = info.query || {};

	//获取model
	var model = new Model(key,models[key],info);

	//获取config
	var cfg = model.getInfo();

	//排序key
	var orderKey = null;

	//如果有翻页
	if(cfg.page)
		cfg.page.onchange = function(page){
			pageInfo.page = page - 1;
			self.query();
		}

	//排序
	cfg.onorder = function(dt){
		orderKey = [dt.col.key,dt.val] || ["id","ASC"];
		self.query();
	}

	//构造查询参数
	var buildInfo = function(query,base){
		base = base || "";
		var re = {where:{}};
		//循环处理参数
		for(var i in query){
			//如果是关联
			if(typeof query[i] == "object")
				re[i] = buildInfo(query[i],i+".");
			else{
				//检查查询类型
				var type = "";
				if(models[key].cols && models[key].cols[base + i] && models[key].cols[base + i].queryType)
					type = models[key].cols[base + i].queryType;
				//如果查询类型是模糊
				if(type == "like")
					re.where[i] = {"$like":"%"+query[i]+"%"};
				else
					re.where[i] = query[i];
			}
		}
		return re;
	}

	//加入查询回调
	cfg.queryFunction = async function(re){
		//覆盖查询条件
		for(var i in info.where)
			re[i] = info.where[i];
		//构造查询结构
		var query = {};
		//处理关联关系为树形结构
		for(var i in re){
			var key = i;
			var dom = query;
			//树形结构循环
			while(key.indexOf(".") > 0){
				var off = key.indexOf(".");
				var link = key.substr(0,off);
				key = key.substr(off + 1);
				if(dom[link] == null)
					dom[link] = {};
				dom = dom[link];
			}
			dom[key] = re[i];
		}
		//构造查询参数
		queryInfo = buildInfo(query);
		//开始查询
		self.query();
	}

	//继承自table
	this.extend(mod.Table,cfg);

	//将配置加入到共有
	self._proxy.table_config = cfg;

	//查询参数
	var queryInfo = {};
	//分页参数
	var pageInfo = {
		page:0,
		pageSize:100
	};

	//查询功能
	this.query = this._proxy.query = async function(data){
		//查询保留
		data = data || queryInfo;
		//加入分页查询
		data.$page = true;
		//计算分页
		data.$limit = pageInfo.pageSize;
		data.offset = pageInfo.page * pageInfo.pageSize;
		var orderKey = orderKey || info.query.order;
		if(orderKey){
			var key = orderKey[0];
			var dom = data;
			while(key.indexOf(".") > 0){
				if(dom[key.substr(0,key.indexOf("."))])
					dom[key.substr(0,key.indexOf("."))] = {};
				dom = dom[key.substr(0,key.indexOf("."))];
				key = key.substr(key.indexOf(".") + 1);
			}
			dom.order = [[key,orderKey[1]]];
		}
		
		self._proxy.classList.add("show-loading");
		//开始查询
		var data = await model.query(data);
		//写入列表
		self.loadData(data.rows);
		self._proxy.classList.remove("show-loading");
		//计算分页
		var count = data.count;
		//分页大小
		count = Math.ceil(count / pageInfo.pageSize);
		self.setPage(pageInfo.page + 1,count);
		return data;
	}
	
	//默认先查询一次
	cfg.queryFunction({});
}
