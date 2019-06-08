var base = require("./css-base.js");
var lcg = require("lcg");
var Color = lcg.ICE.Color;

//======白色阴影盒子样式======
base.bind("ui-click-ani",function(color){
	var color = this.rep(color);
	//添加点击事件
	this.domsEvent("click",function(){
		this.classList.add("ui-click-ani-run");
	});
	
	//动画结束事件
	this.domsEvent("animationend",function(){
		this.classList.remove("ui-click-ani-run");
	});

	//颜色
	var color_b = new Color(color).a(-0.4).val();
	var color_o = new Color(color).a(-1).val();
	
	return {
		".ui-click-ani-run":{
			"ani":"ui-click-ani-run 0.6s"
		},
		"$anis":{
			"ui-click-ani-run":{
				"0%":{
					"box-shadow":"0px 0px 0px 0px "+color_b
				},
				"100%":{
					"box-shadow":"0px 0px 0px 6px "+color_o
				}
			}
		}
	};
});