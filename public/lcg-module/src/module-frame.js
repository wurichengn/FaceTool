var mod = require("../index.js");
var lcg = require("lcg");
var React = lcg.react;


//窗口组件
var Frame = mod.Frame = function(cfg){
	//创建窗口
	var frame = Frame.new(this._proxy,cfg);
	//加入body
	document.body.appendChild(frame);
	return frame;
}

//窗口
var Frame = function(node,d){
	var self = this;

	//参数
	var cfg = {
		title:"窗口标题",
		btns:[],
		noClose:false
	}
	for(var i in d)
		cfg[i] = d[i];

	//初始化dom
	this.$dom(
	<div>
		<div>
			<div>
				<div class="title line">
					<b>{cfg.title}</b>
					<i lid="close" class="if icon-close" onclick={function(){
						self.close();
					}}/>
				</div>
				<div class="panle" lid="panle"></div>
				<div class="btns line" lid="btns">{cfg.btns}</div>
			</div>
		</div>
	</div>);

	//样式
	var css = this.css({
		"ui-center":">div",
		"ui-full":100,
		"background-color":"rgba(0,0,0,0.2)",
		"ani":"all 0.5s",
		">div":{
			"width":d.width || "none",
			"height":d.height || "none",
			">div":{
				"width":"100%",
				"height":"100%",
				"ani":"panle 0.5s",
				"ui-box":"4px",
				"ui-layout":["v",null,1,null],
				">.line":{
					"height":"55px"
				},
				">.title":{
					"border-bottom":"1px solid #eee",
					"ui-center":">*",
					"text-align":"left",
					"position":"relative",
					">b":{
						"margin-left":"15px",
						"font-size":"16px"
					},
					">i":{
						"ui-float":"right",
						"height":"100%",
						"width":"55px",
						"line-height":"55px",
						"font-size":"20px",
						"cursor":"pointer",
						"text-align":"center",
						"transition":"all 0.2s",
						"font-weight":900,
						"opacity":0.6,
						":hover":{
							"opacity":1
						}
					}
				},
				">.panle":{
					"min-width":"500px",
					"min-height":"100px"
				},
				">.btns":{
					"border-top":"1px solid #eee",
					"ui-center":">*",
					"text-align":"right",
					"padding-right":"15px",
					">*":{
						"margin":"0px 10px"
					},
					">a":{
						"ui-button":"@color"
					}
				}
			}
		},
		"$anis":{
			"all":{
				"0%":{
					"opacity":0
				}
			},
			"panle":{
				"0%":{
					"transform":"translateY(-25px)"
				}
			}
		},
		"$anis:out":{
			"all":{
				"100%":{
					"opacity":0
				}
			},
			"panle":{
				"100%":{
					"transform":"translateY(25px)"
				}
			}
		}
	});

	//如果无法关闭
	if(cfg.noClose)
		self.ids["close"].style["display"] = "none";

	//加入内容
	self.ids["panle"].appendChild(node);

	//如果没有按钮
	if(cfg.btns == null || cfg.btns.length == 0)
		self.ids["btns"].style["display"] = "none";

	//关闭窗口
	self.close = self._proxy.close = function(){
		css.play("out");
		setTimeout(function(){
			self.remove();
		},400);
	}

}