//发布订阅模式给组件间解耦
var eventCenter = (function(){
    var events = {}; //存储所有的key:value
    function on(evt,handler){
        //一开始events[evt]=[]空数组
        events[evt] = events[evt] || [];
        //把回调函数handler添加到events[evt]=[{handler:handler}]
        events[evt].push({
            handler: handler
        });
    }

    function fire(evt,args){
        if(!events[evt]){
            return;
        }
        for(var i=0;i<events[evt].length;i++){
            events[evt][i].handler(args);
        }
    }

    function off(name){
        delete events[name];
    }

    return {
        on: on,
        fire: fire,
        off: off
    }
})()

module.exports = eventCenter;