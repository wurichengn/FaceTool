
//引入核心功能
var lcg = require("./lcg.js");

//======引入辅助功能======
//常用函数
require("./base.js")(lcg);
//事件系统
require("./event.js")(lcg);
//lcg.ice
require("./ice.js")(lcg);
//dom模块系统
require("./dm.js")(lcg);
//插件系统
require("./plugin.js")(lcg);
//react兼容插件
require("./jsx.react.js")(lcg);
//jsx插件
require("./jsx.js")(lcg);

//======新框架测试======
//dom模块系统
require("./dm-react/dm-react.js")(lcg);



//暴露核心对象
module.exports = lcg;