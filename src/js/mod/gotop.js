require('less/gotop.less');
 var $ = require('jquery');

var GoTop = (function(){
    function gotop(ct){
        this.ct = ct;
        this.bindEvent();
    }

    gotop.prototype = {

        bindEvent: function(){
            var _this = this;
            $(window).on('scroll',function() {
                if ($(window).scrollTop() > 200)
                    _this.ct.show();
                else
                _this.ct.hide();
            });
            this.ct.on('click',function() {
                $('html,body').animate({scrollTop: 0}, 1000);
            });
        },
        createNode: function(){
            $('body').append(this.ct);
        }
    };

    return {
        init: function(ct){
            new gotop(ct);
        }
    }
})()

module.exports = GoTop;