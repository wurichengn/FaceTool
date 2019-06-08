var lcg = require("lcg");
var React = lcg.react;
var mod = require("lcg-module");

//资源库弹窗
var Ress = module.exports = function(){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<div>
			<p>您可以在这里配置您自己的素材图片表，一行一个资源，填写网络地址，如：http://demo.com/logo.jpg</p>
			<p>您需要填写完整的图片网络地址，并且需要服务器允许CORS跨域</p>
			<p>如果服务器无法跨域，您也可以让您的浏览器支持跨域，chrome教程点击<a href="https://www.cnblogs.com/laden666666/p/5544572.html" target="_blank">这里</a></p>
			<p>修改完成后您需要刷新页面才会生效，如果您清空所有内容并刷新后，会恢复默认配置</p>
			<p>如果想要使用本地文件，关闭该窗口，将您的本地图像拖到资源面板即可</p>
		</div>
		<div>
			<textarea lid="ress" onchange={function(){
				localStorage["ress"] = this.value;
			}}></textarea>
		</div>
	</div>);

	//样式
	this.css({
		"height":"100%",
		"width":"100%",
		"ui-layout":["v",null,1],
		"text-align":"left",
		" p":{
			"margin":"0px",
			"padding":"5px 15px",
			"color":"#888"
		},
		" textarea":{
			"margin":"15px",
			"width":"calc(100% - 30px)",
			"height":"calc(100% - 30px)",
			"resize":"none"
		}
	});

	//创建窗口
	var frame = this.extend(mod.Frame,{
		title:"配置你自己的资源包",
		width:"calc(100% - 60px)",
		height:"calc(100% - 60px)"
	});

	//写入值
	self.ids["ress"].value = localStorage["ress"];
}