//var $ = require('jquery');

var WaterFall = (function(){

	function _waterfall(wrap){
		this.wrap = wrap;
		this.items = this.wrap.children();
		this.render();
		this.resize();
    }
    
    _waterfall.prototype = {

        render: function(){
            var nodeWidth = this.items.outerWidth(true),
                colNum = parseInt($(window).width() / nodeWidth),
                colHeight = [];
            for (var i = 0; i < colNum; i++) {
                colHeight.push(0);
            }
            this.items.each(function() {
                var cur = $(this),
                    index = 0,
                    minHeight = colHeight[0];
                for (var i = 0; i < colHeight.length; i++) {
                    if(colHeight[i] < minHeight){
                        index = i;
                        minHeight = colHeight[i];
                    }
                }
                cur.css({
                    left: nodeWidth * index,
                    top: minHeight
                });
                colHeight[index] = cur.outerHeight(true) + colHeight[index];
            });
        },

        resize: function(){
            var _this = this;
            $(window).on('resize', function(){
                _this.render()
            })
        }
    }
	
	return {
		init: function(wrap){
			return new _waterfall($(wrap));
		}
	}

})();

module.exports = WaterFall;

