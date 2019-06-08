import {message} from 'antd';

//HQL查询函数
var HQL = module.exports = async function(key,vals){
	var dom = {};
	dom[key] = vals;
	try{
		var res = await axios.post("index/hql",dom);
		var dt = res.data;
		return dt[key];
	}catch(e){}
}


//请求后台函数封装
HQL.post = async function(url,vals){
	if(url.indexOf("/") < 0)
		url = "study/" + url;
	try{
		var re = await axios.post(url,vals);
	}catch(e){
		message.error("请求 ["+url+"] 错误! 状态码:["+e.response.status+"]");
		return {code:404,msg:"请求失败!"};
	}
	var re = re.data;
	//内容出现异常
	if(re != null && re.code != null && re.code != 0){
		message.warning(re.msg);
	}
	return re;
}



//数据模型定义
HQL.Model = require("./hql-model.js");

require("./define-model.js");