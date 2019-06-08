var base = require("./css-base.js");
var lcg = require("lcg");
var Color = lcg.ICE.Color;

//引入事件类样式
require("./css-event.js");


//======白色阴影盒子样式======
base.bind("ui-box",function(val){
	//基本属性
	var re = {
		"background-color":"#fff",
		"box-shadow":"0px 0px 7px 1px rgba(0,0,0,0.1)"
	};

	//参数属性
	if(val)
		re["border-radius"] = val;

	return re;
});


//======快速居中======
base.bind("ui-center",function(val){
	var re = {
		"text-align":"center",
		":after":{
			"content":"''",
			"display":"inline-block",
			"height":"100%",
			"vertical-align":"middle"
		}
	};
	
	re[val] = {
		"display":"inline-block",
		"vertical-align":"middle"
	}

	return re;
});



//======按钮样式======
base.bind("ui-button",function(vals){
	//参数缺省
	if(typeof vals == "string")
		vals = [vals];
	var color = vals[0];
	var type = vals[1];
	//基本样式
	var re = {
		"background-color":color,
		"color":"#fff",
		"border-radius":"4px",
		"display":"inline-block",
		"text-align":"center",
		"padding":"5px 15px",
		"ui-click-ani":color,
		"cursor":"pointer",
		"opacity":1,
		"transition":"all 0.17s",
		"-webkit-user-select":"none",
		":hover":{
			"opacity":0.85
		}
	};

	//如果是线条风格
	if(type == "line"){
		re["border"] = "1px solid #ccc";
		re["color"] = "#aaa";
		re["background-color"] = null;
		re[":hover"] = {
			"opacity":1,
			"border-color":color,
			"color":color
		};
	}

	return re;
});




//======快速悬浮======
base.bind("ui-float",function(val){
	var re = {
		"position":"absolute"
	};

	//水平悬浮
	if(val == "left" || val == "right"){
		re[val] = "0px";
		re["top"] = "0px";
		re["height"] = "100%";
	}else{
		re[val] = "0px";
		re["left"] = "0px";
		re["width"] = "100%";
	}

	return re;
});



//======悬浮居中======
base.bind("ui-float-center",function(val){
	var re = {
		"position":"absolute",
		"left":"50%",
		"top":"50%",
		"margin-left":"-"+val,
		"margin-top":"-"+val
	};

	return re;
});



//======自动省略号======
base.bind("ui-text-overflow",function(type){
	var re = {
		"overflow":"hidden",
		"white-space":"nowrap",
		"text-overflow":"ellipsis"
	};

	return re;
});



//======简单全屏======
base.bind("ui-full",function(val){
	var re = {
		"position":"fixed",
		"left":"0px",
		"top":"0px",
		"width":"100%",
		"height":"100%",
		"z-index":val
	};

	return re;
});




//======简单单选按钮======
base.bind("sel-button",function(val){
	var re = {
		"display":"inline-block",
		"padding":"3px 14px",
		"border":"1px solid " + val,
		"color":val,
		"border-radius":"20px",
		"transition":"all 0.2s",
		">i":{
			"display":"inline-block",
			"margin-right":"10px"
		},
		":hover":{
			"box-shadow":"0px 2px 5px " + val
		},
		".sel":{
			"color":"#fff",
			"background-color":val
		}
	};

	return re;
});



//======简单流式布局======
base.bind("ui-layout",function(vals){
	var type = "h";
	//参数缺省
	if(vals[0] == "v" || vals[0] == "h"){
		type = vals[0];
		vals.splice(0,1);
	}

	//基本样式
	var re = {
		"display":"flex"
	};

	//纵向
	if(type == "v"){
		re["flex-direction"] = "column";
	}

	//加入子内容样式
	for(var i in vals){
		var key;
		if(vals[i] == null)
			continue;
		//比例
		if(Number(vals[i])+"" != "NaN"){
			key = "flex";
		}else{
			if(type == "h")
				key = "width";
			else
				key = "height";
		}
		
		var dom = {};
		dom[key] = vals[i];
		re[">*:nth-child("+(Number(i) + 1)+")"] = dom;
	}

	return re;
});