var lcg = require("lcg");
var mod = require("../index.js");
var React = lcg.react;
var react = require("react");
var RD = require("react-dom");
import { Empty , Button } from 'antd';


//======表格组件======
var Table = mod.Table = function(d){
	d = d || {};
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<div lid="menu" class="menu"></div>
		<div lid="title"></div>
		<div lid="panle"></div>
		<Floor lid="floor"></Floor>
		<div class="loading">
			<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>
		</div>
	</div>);

	//样式
	this.css({
		"ui-layout":["v",null,null,1,null],
		">[lid='panle']":{
			"overflow-y":"auto"
		},
		"position":"relative",
		">.loading":{
			"ui-full":1,
			"position":"absolute",
			"ui-center":">*",
			"background-color":"rgba(255,255,255,0.7)",
			"display":"none"
		},
		".show-loading":{
			">.loading":{
				"display":"block"
			}
		}
	});

	//继承自参数工具
	this.extend(mod.ConfigModule,{
		//表格
		table:self,
		//列集合
		cols:[],
		//使用的组件
		modules:{
			//标题组件
			title:Table.Title,
			//单项组件
			item:Table.Item
		},
		//工具
		tools:{
			//开启单选
			radius:false,
			//单选默认值
			select:null,
			//开启多选
			check:false,
			//多选默认值
			checks:null
		},
		//空内容提示
		noneTip:"没有找到内容",
		//菜单面板参数
		menu:null,
		//菜单面板module
		menuModule:TableQuery,
		//查询回调   必须是异步函数
		queryFunction:null,
		//页脚
		page:{
			//是否开启翻页
			open:false,
			//翻页回调
			onchange:null
		},
		//排序回调
		onorder:null
	});

	var cfg = null;

	//参数改变事件
	this.message("mod-config-module-change",function(dt){
		cfg = lcg.cloneJSON(dt.config);
		cfg.table = self;

		//清空内容
		self.ids["menu"].innerText = "";
		self.ids["title"].innerText = "";
		self.ids["panle"].innerText = "";

		//======工具选项======
		//单选工具
		if(cfg.tools.radius)
			cfg.cols.splice(0,0,{
				title:"",
				module:Radio,
				width:"40px"
			});

		//复选工具
		if(cfg.tools.check){
			self._proxy.checks = cfg.tools.checks || {};
			//默认以id作为值
			if(typeof cfg.tools.check != "string")
				cfg.tools.check = "id";
			//加入工具
			cfg.cols.splice(0,0,{
				title:"",
				module:Check,
				moduleTitle:Check,
				width:"40px",
				key:cfg.tools.check
			});
		}

		//======加入标题======
		self.ids["title"].appendChild(cfg.modules.title.new(cfg));

		//======加入菜单======
		if(cfg.menu)
			self.ids["menu"].appendChild(cfg.menuModule.new(self,cfg,cfg.menu));

		//======是否显示页脚======
		if(cfg.page.open)
			self.ids["floor"].style["display"] = "";
		else
			self.ids["floor"].style["display"] = "none";
		self.ids["floor"].setCfg(cfg);
		



		//载入最后一次的数据
		if(lastData)
			self.loadData(lastData);
	});

	//排序变化事件
	this.message("module-table-order",function(d){
		if(cfg.onorder)
			cfg.onorder(d);
	});

	//最后载入的数据
	var lastData = null;
	//载入数据
	this.loadData = function(datas){
		lastData = datas;
		datas = datas || [];

		//清除单选
		self._proxy.select = null;

		//清空内容
		self.ids["panle"].innerText = "";

		//如果内容为空
		if(datas.length == 0){
			//加入空图标
			self.ids["panle"].appendChild(
				<div style="text-align:center;">
					<i class="if icon-kong" style="font-size:100px;margin-top:30px;margin-left:20px;color:#999;"></i>
					<p style="color:#777;">{cfg.noneTip}</p>
				</div>);
		}else{
			//循环载入数据
			for(var i = 0;i < datas.length;i++){
				self.ids["panle"].appendChild(cfg.modules.item.new(cfg,datas[i]));
			}
		}
	}

	//首次配置
	if(d)
		this.config(d);

	//获取列表
	this._proxy.getChecks = function(){
		var cs = self._proxy.checks;
		var list = [];
		for(var i in cs)
			if(cs[i])
				list.push(i);
		return list;
	}

	//分页映射
	this.setPage = this._proxy.setPage = self.ids["floor"].setPage;
}




//======基本单项组件======
var BaseItem = Table.BaseItem = function(cfg){
	var self = this;
	var React = lcg.$react;
	//初始化dom
	this.$doms(
	<div>

	</div>);

	//样式
	this.scss({
		"display":"flex",
		"padding":"10px 0px",
		">*":{
			"display":"inline-block",
			"text-align":"left",
			"padding-left":"10px"
		}
	});

	//解析列
	var cols = cfg.cols;

	//cols单项案例
	var demo = {
		//标题
		title:"项目名称",
		//取值下标
		key:"name",
		//使用其他module初始化内容
		module:null,
		//使用其他module初始化title
		moduleTitle:null,
		//使用其他module初始化菜单
		moduleMenu:null,
		//宽度  数字  或者  px，数字的话就是flex
		width:"10px",
		//数据转换函数或哈希表
		trans:null,
		//是否可以排序
		order:false
	};


	//通过dom和key获取值
	var getKeyValue = function(dom,key){
		if(key == null)
			return;
		var keys = key.split(".");
		while(keys.length > 0){
			//遇到空中断
			if(dom[keys[0]] == null)
				return null;
			//循环赋值
			dom = dom[keys[0]];
			keys.splice(0,1);
		}
		return dom;
	}

	//写入内容
	this.createDom = function(cb,dts){
		dts = dts || {};
		//循环创建节点
		for(var i in cols){
			var dom = cb(cols[i],getKeyValue(dts,cols[i].key));
			//设定宽度
			var w = cols[i].width || 1;
			if(Number(w).toString() == "NaN")
				dom.style["width"] = w;
			else
				dom.style["flex"] = w;
			self._proxy.appendChild(dom);
		}
	}
}


//======标题======
var Title = Table.Title = function(cfg){
	var self = this;
	//继承自基本单项
	this.extend(BaseItem,cfg);

	//样式
	this.scss({
		"background-color":"#fafafa",
		"border-bottom":"1px solid #e8e8e8",
		">z":{
			"font-weight":800,
			"word-wrap":"break-word",
			"word-break":"break-all",
			"ui-center":">*",
			"text-align":"left",
			">div":{
				"display":"inline-block",
				"margin-left":"4px",
				"cursor":"pointer",
				">i":{
					"display":"block",
					"color":"#ccc",
					"text-align":"center",
					"font-size":"10px",
					"line-height":"10px"
				},
				".asc":{
					">i:nth-child(1)":{
						"color":"@color"
					}
				},
				".desc":{
					">i:nth-child(2)":{
						"color":"@color"
					}
				}
			}
		}
	});

	//构造内容
	this.createDom(function(col){
		if(col.moduleTitle){
			var info = {
				col:col,
				cfg:cfg,
				type:"title",
				par:self
			};
			//如果是组件
			if(typeof col.moduleTitle == "function"){
				//其他组件
				return col.moduleTitle.new(info);
			}else{
				//组件形式返回
				return <div info={info}>{col.moduleTitle}</div>
			}
		}
		var re = <z>
			<z>{col.title}</z>
			<div onclick={function(){
				//切换排序模式
				if(this.className == "desc")
					this.className = "asc";
				else
					this.className = "desc";
				lcg.triggerDom("module-table-order",{target:self,col:col,val:this.className},cfg.table._proxy);
			}} style={(col.order)?"":"display:none"}>
				<i class="if icon-caret-up"></i>
				<i class="if icon-caret-down"></i>
			</div>
		</z>;

		//侦听排序事件
		self.message("module-table-order",function(e){
			if(e.target == self)
				return;
			re.querySelector("div").className = "";
		});

		return re;
	});
}



//======单项======
var Item = Table.Item = function(cfg,data){
	var self = this;
	//继承自基本单项
	this.extend(BaseItem,cfg);

	//样式
	this.scss({
		"background-color":"#fff",
		"border-bottom":"1px solid #e8e8e8",
		"transition":"all 0.2s",
		":hover":{
			"background-color":"#e6f7ff"
		},
		">z":{
			"ui-center":">z",
			"text-align":"left",
			"word-wrap":"break-word",
			"word-break":"break-all"
		}
	});

	//构造内容
	this.createDom(function(col,dt){
		if(col.module){
			var info = {
				col:col,
				dt:dt,
				cfg:cfg,
				data:data,
				type:"item",
				par:self
			};
			if(typeof col.module == "function"){
				//其他组件
				return col.module.new(info);
			}else{
				return <div info={info}>{col.module}</div>;
			}
		}
		//普通对象
		var value = dt;
		if(value == null)
			value = "";
		//数据转换
		if(col.trans){
			//函数型转换
			if(typeof col.trans == "function")
				value = col.trans(dt);
			else{
				//哈希表型转换
				value = col.trans[dt];
				if(value == null)
					value = col.trans["*"];
				if(value == null)
					value = dt;
			}
			//如果有通配符
			value = value || "";
			if(typeof value == "string")
				value = value.replace(/\{\{text\}\}/g,dt || "");
		}
		//颜色读取
		if(typeof value == "string"){
			var value = value.split("::");
			var color = value[1];
			var value = value[0];
		}
		var dom = <z><z>{value}</z></z>;
		dom.style["color"] = color || col.color;
		return dom;
	},data);
}




























//========================查询面板组件============================
//简单表格查询面板
var TableQuery = function(table,cfg,cfgs){
	var self = this;
	cfgs = cfgs || {};
	if(typeof cfgs != "object")
		cfgs = {};

	//构造
	var cols = [];

	//默认加入非组件式查询列
	for(var i in cfg.cols){
		//不加入无标题
		if(cfg.cols[i].title == null || cfg.cols[i].title == "")
			continue;
		//不加入含组件
		if(cfg.cols[i].module != null || cfg.cols[i].moduleTitle != null)
			continue;
		//不加入无key列
		if(cfg.cols[i].key == null)
			continue;
		cols.push(cfg.cols[i]);
	}

	//初始化参数
	var info = {
		//要查询的列
		cols:cols,
		//筛选器   哈希表或者key列表  用于筛选哪些列需要用来查询
		filter:null
	};
	//参数覆盖
	for(var i in cfgs)
		info[i] = cfgs[i];

	//筛选器列表转哈希表
	if(Object.prototype.toString.call(info.filter) == "[object Array]"){
		var filter = {};
		for(var i in info.filter)
			filter[info.filter[i]] = true;
		info.filter = filter;
	}

	//初始化dom
	this.$dom(
	<div onkeydown={function(e){
		if(e.keyCode == 13){
			self._proxy.query();
		}
	}}>

	</div>);

	//样式
	this.css({
		"background-color":"#fff",
		"padding":"8px",
		"text-align":"left",
		"display":"flex",
		"flex-wrap":"wrap",
		"border-bottom":"1px solid #ccc"
	});

	//字段表
	var doms = {};

	//加入查询列
	for(var i in info.cols){
		var col = info.cols[i];
		//进行筛选
		if(info.filter && col.key != null && info.filter[col.key] != true)
			continue;
		//构造dom
		var dom;
		if(col.moduleMenu){
			//如果是其他组件
			dom = col.moduleMenu.new({
				cfg:cfg,
				table:table,
				col:col
			});
		}else{
			//普通初始化
			dom = QueryItem.new(info.cols[i],table);
		}
		//加入节点
		doms[col.key] = dom;
		self._proxy.appendChild(dom);
	}

	//加入查询按钮
	self._proxy.appendChild(<QueryButton></QueryButton>);

	//查询
	self._proxy.query = async function(){
		var re = {};
		//加入结果集
		for(var i in doms){
			if(doms[i].val && typeof doms[i].val == "function"){
				var val = doms[i].val();
				if(val != null)
					re[i] = val;
			}
		}
		//如果有回调
		if(cfg.queryFunction){
			var datas = await cfg.queryFunction(re);
			if(datas != null)
				table.loadData(datas);
		}
	}
}

//搜索单项
var QueryItem = function(d,table){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<z>{d.title}:</z>
		<input lid="text" class="ant-input" />
	</div>);

	//样式
	this.css({
		"display":"inline-block",
		"width":"240px",
		"text-align":"center",
		"height":"45px",
		"ui-center":">*",
		">z":{
			"display":"inline-block",
			"width":"80px",
			"margin-right":"10px",
			"text-align":"right"
		},
		">input":{
			"width":"140px",
			"height":"26px"
		}
	});

	//写入值
	this._proxy.val = function(){
		if(self.ids["text"].value == "")
			return null;
		return self.ids["text"].value;
	}
}


//搜索按钮
var QueryButton = function(){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<a onclick={function(){
			self._proxy.parentNode.query();
		}}>查询</a>
	</div>);

	//样式
	this.css({
		"flex":"1",
		"min-width":"90px",
		"height":"45px",
		"ui-center":">*",
		"text-align":"right",
		"padding-right":"15px",
		">a":{
			"ui-button":"@color"
		}
	});
}




























//===========================底部分页组件================================
var Floor = function(){
	var self = this;
	var cfg;
	//初始化dom
	this.$dom(
	<div>
		<z onclick={function(){off(-999999)}}><i class="if icon-doubleleft"></i></z>
		<z onclick={function(){off(-1)}}><i class="if icon-left"></i></z>
		<input onkeydown={function(e){if(e.keyCode == 13)off(0);}} lid="page" class="ant-input"/> / <t lid="max-page"></t>
		<z onclick={function(){off(1)}}><i class="if icon-right"></i></z>
		<z onclick={function(){off(999999)}}><i class="if icon-doubleright"></i></z>
	</div>);

	//样式
	this.css({
		"height":"50px",
		"overflow":"hidden",
		"background-color":"#fafafa",
		"border-top":"1px solid #ccc",
		"ui-center":">*",
		"text-align":"right",
		"position":"relative",
		">z":{
			"ui-button":["@color","line"],
			"padding":"2px 10px",
			"margin":"0px 5px"
		},
		">input":{
			"height":"26px",
			"width":"65px",
			"margin-left":"10px"
		},
		">t":{
			"margin-right":"10px"
		}
	});

	//设置cfg
	this._proxy.setCfg = function(c){
		cfg = c;
	}

	//设置页数
	this.setPage = this._proxy.setPage = function(page,size){
		self.ids["page"].value = page;
		self.ids["max-page"].innerText = size;
	}

	//跳转页面
	var off = function(offset){
		var now = Number(self.ids["page"].value);
		if(now.toString() == "NaN")
			now = 0;
		var max = Number(self.ids["max-page"].innerText);
		if(max.toString() == "NaN")
			max = 1;
		now += offset;
		if(now < 1)
			now = 1;
		if(now > max)
			now = max;
		if(cfg.page && cfg.page.onchange)
			cfg.page.onchange(now);
	}
}











































//==========================工具组件===============================

//单选
var Radio = function(d){
	var cfg = d.cfg;
	var data = d.data;
	var self = this;
	var React = lcg.$react;
	//初始化dom
	this.$doms(
	<div>
		<mod.Radio lid="radio" onselect={function(){
			sel();
		}}></mod.Radio>
	</div>);

	//样式
	this.scss({
		"ui-center":">*"
	});

	//选择
	var sel = function(){
		cfg.table._proxy.select = data;
		lcg.triggerDom("module-table-radio",{data:data,target:self},cfg.table._proxy);
	}

	//单选切换事件
	this.message("module-table-radio",function(e){
		if(e.target == self)
			return;
		self.ids["radio"].change(false);
	});

	//点击父体同样触发选择
	d.par.on("click",function(){
		self.ids["radio"].change(true);
		sel();
	});
}





//复选
var Check = function(d){
	var cfg = d.cfg;
	var data = d.data;
	var self = this;
	var React = lcg.$react;
	//初始化dom
	this.$doms(
	<div>
		<mod.Check lid="check" onselect={function(val){
			sel(val);
		}}></mod.Check>
	</div>);

	//样式
	this.scss({
		"ui-center":">*"
	});

	//选择
	var sel = function(val){
		//如果是局部
		if(d.type == "item"){
			var hx = cfg.table._proxy.checks;
			hx[d.dt] = val;
			self.ids["check"].change(val);
		}else{
			//全局
			lcg.triggerDom("module-table-check",{val:val},cfg.table._proxy);
		}
	}

	//全局事件
	this.message("module-table-check",function(dt){
		if(d.type != "item")
			return;
		sel(dt.val);
	});

	//默认选中值
	if(cfg.table._proxy.checks && cfg.table._proxy.checks[d.dt])
		self.ids["check"].change(true);
}