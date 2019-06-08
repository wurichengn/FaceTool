var lcg = require("lcg");
var React = lcg.react;
var Draw = require("../draw/draw-main.js");
import {message} from 'antd';


var defRes = `img/1.jpg
img/2.jpg
img/3.jpg
img/4.jpg
img/5.jpg
img/6.jpg
img/7.jpg
img/8.jpg
img/9.jpg
img/10.jpg
img/11.jpg
img/12.jpg
img/13.jpg
img/14.jpg
img/15.jpg
img/16.jpg
img/17.jpg
img/18.jpg
img/19.jpg
img/20.jpg
img/21.jpg
img/22.jpg
img/23.jpg
img/24.jpg
img/25.jpg
img/26.jpg
img/27.jpg
img/28.jpg
img/29.jpg
img/30.jpg
img/31.jpg
img/32.jpg
img/33.jpg
img/34.jpg
img/35.jpg
img/36.jpg
img/37.jpg
img/38.jpg
img/39.jpg
img/40.jpg
img/41.jpg
img/42.jpg
img/43.jpg
img/44.jpg
img/45.jpg
img/46.jpg
img/47.jpg
img/48.jpg
img/49.jpg
img/50.jpg
img/51.jpg
img/52.jpg
img/53.jpg
img/54.jpg
img/55.jpg
img/56.jpg
img/57.jpg
img/58.jpg
img/59.jpg
img/60.jpg
img/61.jpg
img/g1.gif
img/g2.gif
img/g3.gif
img/g4.gif
img/g5.gif
img/g6.gif
img/g7.gif
img/g8.gif
img/g9.gif
img/g10.gif
img/g11.gif
img/g12.gif
img/g13.gif`;

//读取配置
var ress = localStorage["ress"];
if(ress == null || !(ress.length > 5)){
	ress = defRes;
	localStorage["ress"] = defRes;
}
configs = ress.split("\n");
for(var i = configs.length - 1;i >= 0;i--){
	configs[i] = configs[i].replace(/\s/g,"");
	if(configs[i].length < 5)
		configs.splice(i,1);
}


//全局预存图片表
window.saveImages = [];

/*for(var i in configs)
	configs[i] = {img:configs[i]};*/


//结果展示面板
var End = module.exports = function(){
	var self = this;
	//初始化dom
	this.$dom(
	<div>
		<div class="header">
			<div class="group">
				<p>内容管理</p>
				<div>
					<z onclick={function(){
						var Ress = require("./ui-ress.js");
						Ress.new();
					}}>图像资源管理</z>
				</div>
			</div>
			<div class="group">
				<p>配字信息</p>
				<div class="show">
					<span>
						<t>配字文本（可多行）</t>
						<textarea lid="ip" type="text" style="width:calc(100% - 10px);resize:none;height:100px;"/>
					</span>
				</div>
			</div>
			<div class="group">
				<p>文字样式</p>
				<div>
					<span>
						<t>字体名</t>
						<input title="需要本机拥有该字体" lid="font-name" type="text" style="width:100px;" value="SimHei"/>
					</span>
					<span>
						<t>字体大小</t>
						<input lid="font-size" type="number" value="16" min="8" style="width:80px;"/>
					</span>
					<span>
						<t>文字风格</t>
						<select lid="font-style" value="1">
							<option value="1">黑字白边</option>
							<option value="2">白字黑边</option>
							<option value="3">纯黑</option>
							<option value="4">纯白</option>
							<option value="5">深色白边</option>
							<option value="6">浅色黑边</option>
							<option value="7">渐变描边</option>
						</select>
					</span>
					<span>
						<t>斜体文字</t>
						<input lid="font-italic" type="checkbox" />
					</span>
					<span>
						<t>文字加粗</t>
						<input lid="font-bolder" type="checkbox" />
					</span>
					<span>
						<t>图外加字</t>
						<input lid="add" type="checkbox" />
					</span>
					<span>
						<t>文字色相</t>
						<input lid="font-offset" type="range" min="0" max="360" step="0.1" value="0"/>
					</span>
				</div>
			</div>
			<div class="group">
				<p>主图修改</p>
				<div>
					<span>
						<t>水平翻转</t>
						<input lid="fz-x" type="checkbox" />
					</span>
					<span>
						<t>竖直翻转</t>
						<input lid="fz-y" type="checkbox" />
					</span>
					<span>
						<t>黑白</t>
						<input lid="heibai" type="checkbox" />
					</span>
					<span>
						<t>复古</t>
						<input lid="vintage" type="checkbox" />
					</span>
					<span>
						<t>Gif来回</t>
						<input lid="gif-back" type="checkbox" />
					</span>
					<span>
						<t>Gif倒放</t>
						<input lid="gif-reverse" type="checkbox" />
					</span>
					<span>
						<t>模糊程度</t>
						<input lid="blur" type="range" min="0" max="20" step="0.1" value="0"/>
					</span>
					<span>
						<t>色相偏移</t>
						<input lid="offset" type="range" min="0" max="360" step="0.1" value="0"/>
					</span>
					<span>
						<t>最小尺寸</t>
						<input lid="min-size" type="number" step="10" value="100" min="8" style="width:80px;"/>
					</span>
					<span>
						<t>最大尺寸</t>
						<input lid="max-size" type="number" step="10" value="350" min="8" style="width:80px;"/>
					</span>
				</div>
			</div>
		</div>
		<div class="panle">
			<div lid="imgs" class="imgs"></div>
			<div class="end">
				<div class="end" lid="end"></div>
				<div class="menu">
					<z onclick={function(){
						if(lastEnd == null || lastEnd.isGif){
							return message.error("没有成品结果或者结果是Gif!");
						}
						var img = new Image();
						img.src = lastEnd.src;
						message.info("加入成功!");
						saveImages.push(img);
						self.ids["gif-number"].innerText = saveImages.length;
					}}><i class="if icon-plus-circle"></i>加入预存表(<t lid="gif-number">0</t>)</z>
					<z onclick={function(){
						var EndFac = require('./ui-end-fac.js');
						EndFac.new();
					}}><i class="if icon-yingxiangku"></i>预存处理器</z>
					<z onclick={function(){
						message.info("预存表已清空!");
						saveImages = [];
						self.ids["gif-number"].innerText = saveImages.length;
					}}><i class="if icon-sync"></i>清空预存表</z>
				</div>
			</div>
		</div>
	</div>);

	//样式
	this.css({
		"height":"100%",
		"ui-layout":["220px",1],
		">.header":{
			"line-height":"40px",
			"background-color":"#fff",
			">*":{
				"vertical-align":"middle"
			},
			" input[type='text'], input[type='number'], select":{
				"padding":"0px 8px",
				"height":"25px",
				"margin":"0px 8px",
				"border":"1px solid #ccc",
				"border-radius":"4px"
			},
			">div":{
				">p":{
					"margin":"0px",
					"line-height":"30px",
					"padding-left":"10px",
					"cursor":"pointer",
					"background-color":"#ca2d17",
					"color":"#fff",
					"font-size":"16px",
					"font-weight":700,
					"-webkit-user-select":"none",
					":hover":{
						"opacity":0.8
					}
				},
				">div":{
					"display":"none",
					"padding-bottom":"10px",
					".show":{
						"display":"block"
					},
					">z":{
						"ui-button":"#ca2d17",
						"margin":"5px",
						"line-height":"20px"
					}
				}
			},
			" span":{
				"display":"inline-block",
				"padding":"0px 8px",
				">*":{
					"vertical-align":"middle"
				}
			}
		},
		">.panle":{
			"ui-layout":[1,1],
			"overflow-y":"hidden",
			">.imgs":{
				"display":"flex",
				"flex-wrap":"wrap",
				"justify-content":"space-between",
				"overflow-y":"auto",
				">img":{
					"flex":"auto",
					"flex-grow":0,
					"height":"100px",
					"margin":"2px 8px",
					"border-radius":"4px",
					"border":"2px solid #888",
					"cursor":"pointer",
					".sel":{
						"box-shadow":"0px 0px 5px 2px #fff"
					}
				}
			},
			">.end":{
				"ui-center":">div",
				"background-color":"#555",
				"position":"relative",
				">.end":{
					"display":"inline-block",
					"color":"#fff",
					"position":"relative",
					":after":{
						"content":"attr(state)",
						"position":"absolute",
						"bottom":"-30px",
						"left":"0px",
						"display":"inline-block",
						"width":"100%",
						"text-align":"center"
					}
				},
				">.menu":{
					"position":"absolute",
					"width":"100%",
					"text-align":"center",
					"bottom":"10px",
					"left":"0px",
					">z":{
						"ui-button":"#ca2d17",
						"margin":"0px 5px"
					}
				}
			}
		}
	});



	//菜单栏展开
	var groups = this._proxy.querySelectorAll(".group");
	for(var i = 0;i < groups.length;i++){
		var p = groups[i].querySelector("p");
		var div = groups[i].querySelector("div");
		p.onclick = function(){
			if(this.className == "show")
				this.className = "";
			else
				this.className = "show";
		}.bind(div);
	}


	//如果有已存在的配置
	if(localStorage["save"]){
		try{
			var cfgs = JSON.parse(localStorage["save"]);
			for(var i in cfgs)
				if(cfgs[i] != null && self.ids[i]){
					if(self.ids[i].type == "checkbox")
						self.ids[i].checked = cfgs[i];
					else
						self.ids[i].value = cfgs[i];
				}
		}catch(e){}
	}




	var selImg,lastEnd;

	//添加一个素材
	var addImg = function(img){
		self.ids["imgs"].appendChild(img);
		img.onclick = function(){
			if(selImg)
				selImg.className = "";
			selImg = this;
			this.className = "sel";
		}
	}

	//素材库显示
	for(var i in configs){
		var img = new Image();
		img.src = configs[i];
		addImg(img);
	}

	//获取配置
	var getConfig = function(){
		var re = {};
		//循环构造配置
		for(var i in self.ids){
			if(self.ids[i].type == "checkbox")
				re[i] = self.ids[i].checked;
			else if(self.ids[i].value != null)
				re[i] = self.ids[i].value;
		}
		return re;
	}

	//循环判断是否切换
	var lastImg,lastStr,lastConfig;
	this.message("dt",function(){
		//影像是否存在
		if(selImg == null)
			return;
		var cfg = getConfig();
		//内容是否改变
		if(selImg == lastImg && self.ids["ip"].value == lastStr && JSON.stringify(lastConfig) == JSON.stringify(cfg))
			return;
		lastConfig = cfg;

		//保存配置
		var configStr = JSON.stringify(lastConfig);
		localStorage["save"] = configStr;

		lastImg = selImg;
		lastStr = self.ids["ip"].value;
		render(lastImg,lastStr,cfg);
	});

	var rendering = false;
	var idelRender;
	//生成图片
	var render = async function(url,str,cfg){
		//只保留一次渲染
		if(rendering){
			idelRender = {url:url,str:str,cfg:cfg};
			return;
		}
		rendering = true;
		try{
			//开始渲染
			self.ids["end"].setAttribute("state","渲染中...");
			var img = await Draw(url,str,cfg);
			lastEnd = img;
			self.ids["end"].setAttribute("state","");
			self.ids["end"].innerText = "";
			self.ids["end"].appendChild(img);
		}catch(e){
			console.error(e);
		}

		//结束渲染
		rendering = false;
		if(idelRender){
			var idel = idelRender;
			idelRender = null;
			render(idel.url,idel.str,idel.cfg);
		}
	}



	document.ondrag = document.ondragenter = document.ondragover = document.ondrop = function(e){
		e.preventDefault();
	}

	//接受文件的拖入
	document.ondrag = document.ondragenter = function(e){
		e.preventDefault();
	}
	document.ondrop = function(e){
		e.preventDefault();
		var files = e.dataTransfer.files;
		for(var i = 0;i < files.length;i++){
			if(files[i].type.substr(0,5) != "image")
				continue;
			loadOne(files[i]);
		}
	}

	//载入一个文件
	var loadOne = function(file){
		var img = new Image();
		if(file.type.indexOf("/gif") > 0)
			img.isGif = true;
		var state = 0;
		//结束载入
		var end = function(){
			if(state < 2)
				return;
			addImg(img);
		}
		//载入为图片
		var reader = new FileReader();
		reader.onload = function(e){
			img.src = e.target.result;
			state++;
			end();
		}
		reader.readAsDataURL(file);
		//载入为buffer
		var reader = new FileReader();
		reader.onload = function(e){
			img.buffer = e.target.result;
			state++;
			end();
		}
		reader.readAsArrayBuffer(file);
		window.reader = reader;
	}
}