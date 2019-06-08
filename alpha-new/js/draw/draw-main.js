var PIXI = require("pixi.js");
var axios = require("axios");
var omggif = require("omggif");
import GIF from 'gif.js';



//绘制一个影像方法
var Draw = module.exports = async function(img,str,cfgs){

	//基本配置
	var cfg = {};
	for(var i in cfgs)
		cfg[i] = cfgs[i];

	var imgs;
	//如果是画gif
	if(img.isGif || img.src.indexOf(".gif") > 0)
		imgs = await loadGIF(img);
	else
		imgs = await loadImg(img);

	//Gif额外操作
	if(imgs.length > 1){
		//如果来回播放
		if(cfg["gif-back"]){
			for(var i = imgs.length - 1;i >= 0;i--)
				imgs.push(imgs[i]);
		}

		//如果倒放
		if(cfg["gif-reverse"]){
			var list = [];
			for(var i = imgs.length - 1;i >= 0;i--)
				list.push(imgs[i]);
			imgs = list;
		}
	}

	//初始化画布
	let app = new PIXI.Application({width: 256, height: 256,transparent:true,autoStart:false});
	app.cfg = cfg;

	var image = new Image();
	//如果是静态影像
	if(imgs.length == 1){
		var url = RenderImage(app,imgs[0],str);
		image.src = url;
	}else{
		var url = await renderGIF(app,imgs,str);
		image.src = url;
		image.isGif = true;
	}

	return image;
}



//直接渲染gif
Draw.renderGIF = function(imgs,cfg){
	var cb;

	//多帧影像
	let gif = new GIF({
	  workers:2,
	  workerScript:'./gif.worker.js',
	  quality: 10,
	  width: imgs[0].naturalWidth,
	  height: imgs[0].naturalHeight
	});

	//完成侦听
	gif.on('finished',function(blob){
		var url = URL.createObjectURL(blob);
		cb(url);
	});

	//循环处理
	for(var i in imgs){
		gif.addFrame(imgs[i],{
			copy:true,
			delay:cfg["gif-delay"] || 200
		});
	}
	gif.render();

	//异步
	return new Promise(function(next){
		cb = function(val){
			next(val);
		}
	});
}



//拼接图片
Draw.joinImages = function(surs,cfg){
	//初始化画布
	let app = new PIXI.Application({width: 256, height: 256,transparent:true,autoStart:false});
	app.cfg = cfg;

	var imgs = [];
	var top = 0;
	var left = 0;
	var w = surs[0].naturalWidth;
	var h = surs[0].naturalHeight;

	//处理影像
	for(var i in surs){
		var img = PIXI.Sprite.from(surs[i]);
		app.stage.addChild(img);
		if(cfg["join-fx"] == "y"){
			img.y = top;
			img.height = w * img.height / img.width;
			img.width = w;
		}else{
			img.x = left;
			img.width = h * img.width / img.height;
			img.height = h;
		}
		top += img.height;
		left += img.width;
		imgs.push(img);
	}

	//设置尺寸
	if(cfg["join-fx"] == "y")
		app.renderer.resize(w,top);
	else
		app.renderer.resize(left,h);

	//渲染
	app.render();

	return app.renderer.view.toDataURL('image/jpeg');
}



//黑白隐藏图



//异步渲染一个gif
var renderGIF = function(app,imgs,str){
	var cb;

	//渲染
	var render = function(){
		//多帧影像
		let gif = new GIF({
		  workers:2,
		  workerScript:'./gif.worker.js',
		  quality: 10,
		  width: list[0].naturalWidth,
		  height: list[0].naturalHeight
		});

		//完成侦听
		gif.on('finished',function(blob){
			var url = URL.createObjectURL(blob);
			cb(url);
		});

		//循环处理
		for(var i in list){
			gif.addFrame(list[i],{
				copy:true,
				delay:imgs[0].info.delay * 10 || 80
			});
		}
		gif.render();
	}

	//开始加入内容
	var list = {};
	for(var i in imgs){
		var url = RenderImage(app,imgs[i],str);
		var img = new Image();
		img.src = url;
		img.src = url;
		img.onload = function(){
			list[this.index] = this.img;
			var num = 0;
			for(var i in list)
				num++;
			if(num == imgs.length)
				render();
		}.bind({img:img,index:i});
	}

	return new Promise(function(next){
		cb = function(val){
			next(val);
		}
	});
}




//载入单张影像
var loadImg = function(url){
	var cb;

	//载入图片
	/*var img = new Image();
	img.src = url;
	img.onload = function(){
		if(cb)
			cb([img]);
	}*/

	//异步
	return new Promise(function(next){
		return next([url]);
		cb = function(val){
			next(val);
		}
	});
}




//绘制动图
var loadGIF = async function(mainImg){
	//如果已经载入过
	//if(mainImg.list)
	//	return mainImg.list;

	//请求内容
	if(mainImg.buffer){
		var res = {data:mainImg.buffer};
	}else{
		var res = await axios.get(mainImg.src,{responseType:'arraybuffer'});
	}
	mainImg.buffer = res.data;
	gifReader = new omggif.GifReader(new Uint8Array(res.data));
	var count = gifReader.numFrames();

	//首张影像
	//let info = gifReader.frameInfo(0);

	//用于处理影像的canvas
	var canvas = document.createElement("canvas");
	var w = mainImg.naturalWidth,h = mainImg.naturalHeight;
	var ctx = canvas.getContext("2d");
	canvas.width = w;
	canvas.height = h;

	//用于存储数据的缓冲区
	var imgData = ctx.createImageData(w,h);

	//存储精灵的列表
	var list = [];

	//循环处理影像
	for(var i = 0;i < count;i++){
		let info = gifReader.frameInfo(i);
		gifReader.decodeAndBlitFrameRGBA(i, imgData.data);
		ctx.putImageData(imgData,0,0);
		var img = new Image();
		img.info = info;
		img.src = canvas.toDataURL('image/jpeg');
		list.push(img);
	}

	return list;
}












//渲染单张影像
var RenderImage = function(app,img,str){
	var cfg = app.cfg;
	//背景图
	var bg = PIXI.Sprite.from(img);

	//加入背景
  	app.stage.addChild(bg);

  	//设置尺寸
  	var w = img.naturalWidth,h = img.naturalHeight;
  	
  	//===修改主图尺寸===
  	var change = h;
  	if(change < (cfg["min-size"] || 100))
  		change = (cfg["min-size"] || 100);
  	if(change > (cfg["max-size"] || 350))
  		change = (cfg["max-size"] || 350);
  	//强制清晰
  	if(change != h){
  		w = Math.floor(change * w / h);
  		h = change;
  	}

  	//设置主图尺寸
  	bg.width = w;
  	bg.height = h;
  	bg.anchor.x = bg.anchor.y = 0.5;
  	bg.x = w/2;
  	bg.y = h/2;
  	//是否翻转
  	if(cfg["fz-x"])
  		bg.width = -bg.width;
  	if(cfg["fz-y"])
  		bg.height = -bg.height;

  	//滤镜表
  	var filters = [];

  	//是否模糊
  	if(cfg["blur"] > 0){
  		try{
  			filters.push(new PIXI.filters.BlurFilter(cfg["blur"]));
  		}catch(e){}
  	}

  	//颜色处理
	try{
		var filter = new PIXI.filters.ColorMatrixFilter();
		//色相
		if(cfg["offset"] > 0)
			filter.hue(cfg["offset"]);
		//黑白
		if(cfg["heibai"])
			filter.blackAndWhite();
		//复古
		if(cfg["vintage"])
			filter.sepia();
		filters.push(filter);
	}catch(e){}

  	//写入滤镜
  	bg.filters = filters;

  	//文字大小
  	var size = (cfg["font-size"] || 16) * h / 120;

  	//文字样式
  	var style = {
  		fontFamily : cfg["font-name"], 
  		fontSize: size, 
  		fill : "#000",
  		stroke: "#fff",
		strokeThickness: size / 5.5, 
  		align : 'center',
  		breakWords: true,
	    wordWrap: true,
	    lineHeight: size,
	    wordWrapWidth: w,
	    lineJoin: "round"
  	}

  	//样式表
  	var styles = {
  		//白字黑边
  		"2":{
  			stroke:"#000",
  			fill:"#fff"
  		},
  		//纯黑
  		"3":{
  			strokeThickness:0,
  			fill:"#000"
  		},
  		//纯白
  		"4":{
  			strokeThickness:0,
  			fill:"#fff"
  		},
  		//深色白边
  		"5":{
  			stroke:"#fff",
  			fill:"#771d10"
  		},
  		//浅色黑边
  		"6":{
  			stroke:"#000",
  			fill:"#e2968b"
  		},
  		//渐变描边
  		"7":{
  			stroke:"#771d10",
  			fill:["#fff","#e2968b"]
  		}
  	};

  	//写入样式
  	if(styles[cfg["font-style"]]){
  		var mitStyle = styles[cfg["font-style"]];
  		for(var i in mitStyle)
  			style[i] = mitStyle[i];
  	}

  	//斜体
  	if(cfg["font-italic"])
  		style["fontStyle"] = "italic";

  	//加粗
  	if(cfg["font-bolder"])
  		style["fontWeight"] = "bolder";

  	//加入文字
  	let text = new PIXI.Text("\n"+str,style);

  	//文字色相
  	if(cfg["font-offset"] > 0){
		try{
			var filter = new PIXI.filters.ColorMatrixFilter();
			//色相
			filter.hue(cfg["font-offset"]);
			text.filters = [filter];
		}catch(e){console.error(e);}
	}

  	//是否加白
  	if(cfg.add){
  		var addC = text.height - size;
  		h = Number(h) + addC;
  	}
  	app.renderer.resize(w,h);

  	//文字居中
  	text.anchor.x = 0.5;
  	text.anchor.y = 1;
  	text.x = w / 2;
  	text.y = h;

  	//加入白色背景
  	if(cfg.add){
	  	var graphics = new PIXI.Graphics();
	  	graphics.lineStyle(2, 0xffffff);
		graphics.beginFill(0xffffff, 1);
		graphics.drawRect(0,0,w,addC);
		graphics.endFill();
		graphics.y = h - addC;
		app.stage.addChild(graphics);
	}

  	//加入文字
  	app.stage.addChild(text);

  	//渲染
  	app.render();

  	var url = app.renderer.view.toDataURL('image/jpeg');

  	return url;
}