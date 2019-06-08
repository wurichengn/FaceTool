var lcg = require("lcg");
var React = lcg.react;
var mod = require("lcg-module");
var Draw = require("../draw/draw-main.js");
import {message} from 'antd';

//资源库弹窗
var Ress = module.exports = function(){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<div class="imgs" lid="imgs">

		</div>
		<div class="group">
			<div class="menu">
				<Group name="生成GIF">
					<z onclick={function(){
						render("gif");
					}}>开始渲染</z>
					<span>
						每帧间隔(ms)
						<input lid="gif-delay" type="number" min="10" value="1000" style="width:100px;"/>
					</span>
				</Group>
				<Group name="组合图像">
					<z onclick={function(){
						render("join",{"join-fx":"x"});
					}}>水平拼接</z>
					<z onclick={function(){
						render("join",{"join-fx":"y"});
					}}>竖直拼接</z>
				</Group>
			</div>
			<div class="panle" lid="panle" style="border-left:1px solid #ddd"></div>
		</div>
	</div>);

	//样式
	this.css({
		"height":"100%",
		"width":"100%",
		"ui-layout":["v","120px",1],
		"text-align":"left",
		">.imgs":{
			"background-color":"#ddd",
			">img":{
				"border":"1px solid #888",
				"height":"100px",
				"margin":"10px",
				"border-radius":"3px"
			}
		},
		">.group":{
			"ui-layout":[1,1],
			">.menu":{
				"overflow-y":"auto"
			},
			">.panle":{
				"overflow":"auto",
				"ui-center":">*"
			}
		}
	});

	//创建窗口
	var frame = this.extend(mod.Frame,{
		title:"加工您的结果",
		width:"calc(100% - 60px)",
		height:"calc(100% - 60px)"
	});

	//加入影像
	for(var i in saveImages)
		self.ids["imgs"].appendChild(saveImages[i]);

	//开始渲染
	var render = async function(type,cfgs){
		if(saveImages.length <= 0)
			return message.error("预存表里没有任何素材!");
		self.ids["panle"].innerText = "";
		var hx = {
			"gif":Draw.renderGIF,
			"join":Draw.joinImages
		};
		if(hx[type] == null)
			return;
		//处理参数
		var cfg = {};
		//输入框参数
		for(var i in self.ids)
			cfg[i] = self.ids[i].value;
		//强制参数
		for(var i in cfgs)
			cfg[i] = cfgs[i];
		//执行处理
		var url = await hx[type](saveImages,cfg);
		var img = new Image();
		img.src = url;
		self.ids["panle"].innerText = "";
		self.ids["panle"].appendChild(img);
	}
}




var Group = function(d){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<p>{d.name}</p>
		<div dom-slot></div>
	</div>);

	//样式
	this.css({
		"padding":"8px",
		">p":{
			"margin":"none",
			"padding":"8px 15px",
			"border-bottom":"1px solid #aaa",
			"font-size":"16px",
			"font-weight":700
		},
		">div":{
			">z":{
				"ui-button":"#438bf5",
				"margin":"0px 5px"
			},
			">span":{
				"margin":"0px 8px",
				"font-size":"16px",
				">input":{
					"border":"1px solid #ccc",
					"border-radius":"4px"
				}
			}
		}
	});
}