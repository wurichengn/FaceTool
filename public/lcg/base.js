
//======常用函数======

module.exports = function(lcg){

    //克隆一个对象
    var clone = lcg.cloneJSON = function(item) {
        if (!item) { return item; } // null, undefined values check

        var types = [ Number, String, Boolean ], 
            result;

        // normalizing primitives if someone did new String('aaa'), or new Number('444');
        types.forEach(function(type) {
            if (item instanceof type) {
                result = type( item );
            }
        });

        if (typeof result == "undefined") {
            if (Object.prototype.toString.call( item ) === "[object Array]") {
                result = [];
                item.forEach(function(child, index, array) { 
                    result[index] = clone( child );
                });
            } else if (typeof item == "object") {
                // testing that this is DOM
                if (item.nodeType && typeof item.cloneNode == "function") {
                    var result = item.cloneNode( true );    
                } else if (!item.prototype) { // check that this is a literal
                    if (item instanceof Date) {
                        result = new Date(item);
                    } else {
                        // it is an object literal
                        result = {};
                        for (var i in item) {
                            result[i] = clone( item[i] );
                        }
                    }
                } else {
                    // depending what you would like here,
                    // just keep the reference, or create new object
                    if (false && item.constructor) {
                        // would not advice to do that, reason? Read below
                        result = new item.constructor();
                    } else {
                        result = item;
                    }
                }
            } else {
                result = item;
            }
        }

        return result;
    }






    //获取两个对象的相对坐标
    var getDomOffset = lcg.getDomOffset = function(domc,domp){
        if(domc == null)
            return {x:0,y:0};
        if(domc.parentNode == domp || domc.parentNode == document)
            return {x:domc.offsetLeft,y:domc.offsetTop};
        var loc = getDomOffset(domc.parentNode,domp);
        return {x:loc.x + domc.offsetLeft,y:loc.y + domc.offsetTop};
    }
    
    //获取鼠标相对dom位置
    var getMouseOffset = lcg.getMouseOffset = function(domc,e){
        var loc = domc.getBoundingClientRect();
        return {x:e.x - loc.left,y:e.y - loc.top};
    }


};