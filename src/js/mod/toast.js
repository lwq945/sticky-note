require('less/toast.less');
var $ = require('jquery');

function toast(msg,time){
    this.msg = msg;
    this.dismissTime = time || 1000; //ms
    this.createToast();
    this.showTime();
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
            setTimeout(()=>{
                _this.$toast.fadeOut(300,function(){
                    _this.$toast.remove();
                });
            },_this.dismissTime);
        })
    }

};

function Toast(msg,time){
    return new toast(msg,time);
}

window.Toast = Toast;
module.exports.Toast = Toast;