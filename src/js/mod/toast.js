require('less/toast.less');
//var $ = require('jquery');

var Toast =(function(){
    function toast(msg,time){
        this.msg = msg;
        this.dismissTime = time || 1000; //ms
        this.createToast(); //创建toast
        this.showTime(); // 显示多久
    }
    
    toast.prototype = {
        createToast: function(){
            var tpl = `<div class="toast">${this.msg}</div>`;
            this.$toast = $(tpl);
            $('body').append(this.$toast);
        },
    
        showTime: function(){
            var _this = this;
            this.$toast.fadeIn(300,function(){
                setTimeout(function(){
                    _this.$toast.fadeOut(300,function(){
                        _this.$toast.remove();
                    });
                },_this.dismissTime);
            });
        }
    
    };
    
    return {
        init: function(msg,time){
            return new toast(msg,time);
        }
    }
})()

module.exports = Toast;