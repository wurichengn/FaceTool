var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');


//所有编译的文件
var filess = {
    //主文件
    "main":{
        file:"build.js",
        src:"./alpha-new/main.js"
    }
};

//目标文件
var files = {};

//目前开启的文件
var opens = [
    "main"
];

//去掉未开启的内容
for(var i in opens){
    files[opens[i]] = filess[opens[i]];
}

//入口文件映射表
var inFiles = {
    //框架文件载入
    //vendor: ["react", "react-dom","antd"]
};
//测试文件映射表
var testFiles = {};
for(var i in files){
    inFiles[i] = files[i].src;
    testFiles["/" + files[i].file] = true;
}

//filename映射函数
var func = function(chunkData){
    if(chunkData.chunk.name == "vendor")
        return "vendor.js";
    return files[chunkData.chunk.name].file;
}

//filename测试函数
func.test = function(path){
    if(path.indexOf(".html") > 0)
        return true;
}



//======默认配置文件======
var cfg = {
    //环境模式
    mode:"development",
    mode:"production",
    //入口文件
    entry: async function(){
        return inFiles;
    },
    //第三方库打包
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            name:"vendor",
            filename:"[name].js"
            //reuseExistingChunk:true
          }
        }
      }
    },
    //文件输出路径
    output: {
        path: path.join(__dirname, "build"),
        filename:func
    },
    //载入模块
    module: {
        rules: [
            { test: /\.css$/, use: "css-loader" },
            //lcg模块文件载入
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        cacheDirectory:true,
                        presets: ["react","es2015","es2017"],
                        plugins:[
                            "transform-runtime",
                            "transform-remove-strict-mode"
                        ]
                    }
                }
            }
        ]
    },
    //服务器设置
    devServer: {
        hot:false,
        contentBase: path.join(__dirname, "build"),
        port:13803,
        lazy:true
    },
    //开发环境
    devtool:"eval",
    //插件
    plugins:[
        //生成主html文件
        new HtmlWebpackPlugin({
            template:"module.html",
            inject:false,
            filename:"index.html"
        })
    ],
    //解析
    resolve:{
        modules:["./public","node_modules"]
    }
    //生产测试环境
    //devtool:"source-map"
};


//开放给外部
module.exports = {
    init:function(vals){
        for(var i in vals)
            cfg[i] = vals[i];
        return cfg;
    }
};

























//===================其他配置==========================
//Debug页面配置文件
var cfg_debug = {
    entry: "./alpha-debug/main.js",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: __dirname+"/debug",
        filename: "build.js"
    },
    module: {
        rules: [
            { test: /\.css$/, use: "css-loader" },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        cacheDirectory:true
                    }
                }
            }
        ]
    },
    devServer: {
       hot:false,
       inline:false,
       lazy:true,
       filename: "build.js"
    },
    //devtool:"source-map"
};



//官网配置文件
var cfg_home = {
    entry: "./www-home/main.js",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: __dirname+"/debug",
        filename: "home-build.js"
    },
    module: {
        rules: [
            { test: /\.css$/, use: "css-loader" },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        cacheDirectory:true
                    }
                }
            }
        ]
    },
    devServer: {
       hot:true,
       inline:true,
       lazy:true,
       filename: "build.js"
    },
    //devtool:"source-map"
};



