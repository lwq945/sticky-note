 require('less/note.less');

 var $ = require('jquery');
 var Toast = require('./toast.js');
 var Event = require('./event.js');

 var Note = (function(){
     function _note(opts){
        this.initOpts(opts);
        // this.bindEvent();
     }

     _note.prototype = {
        //headerColor containerColor
        colors:[
            ['#ea9b35','#efb04e'],
            ['#dd598b','#e672a2'],
            ['#eee34b','#f2eb67'],
            ['#c24226','#d15a39'],
            ['#c1c341','#d0d25c'],
            ['#3f78c3','#5591d2']
        ],

        //每个note默认的属性
        defaultOpts: {
            id: '', //note的id
            $ct: $('#content').length > 0 ? $('#content') : $('body'), //存放note的容器
            context: '点击这里开始编辑',
            time:new Date().toLocaleString('chinese',{hour12:false})
        },

        initOpts: function(opts){
            //将两个或更多对象的内容合并到第一个对象。
            this.opts = $.extend({},this.defaultOpts,opts||{});
            if(this.opts.id){
                this.id = this.opts.id;
            }
            this.createNote();
            this.setStyle();
            Event.fire('waterfall');
        },

        createNote: function(){
            var tpl = '<div class="note">'
                    + '<div class="note-header"><span class="delete">&times;</span></div>'
                    + '<div class="note-content" contenteditable="true"></div>'
                    + '<p class="time">'+new Date().toLocaleString('chinese',{hour12:false})+'</p>'
                    + '</div>';
            this.$note = $(tpl);
            this.$note.find('.note-content').html(this.opts.context);
            this.$note.find('.time').html(this.opts.time);
            this.opts.$ct.append(this.$note);
            if(!this.id){
                this.$note.css({left: '10px', top: '100px'});
            }    
        },

        setStyle: function(){
            var color = this.colors[Math.floor(Math.random()*6)];
            this.$note.find('.note-header').css('background-color',color[0]);
            this.$note.find('.note-content').css('background-color',color[1]);
            this.$note.find('.time').css('background-color',color[1]);
            this.bindEvent();
        },

        setLayout: function(){
            var _this = this;
            if(_this.clk){
                clearTimeout(_this.clk);
            }
            _this.clk = setTimeout(function(){
                Event.fire('waterfall')
            },100)
        },

        bindEvent: function(){
            var _this = this,
                $note = this.$note,
                $noteHeader = $note.find('.note-header'),
                $noteContent = $note.find('.note-content'),
                $noteTime = $note.find('.time'),
                $delete = $note.find('.delete');

            //获得焦点清空内容，把元素html内容存给before;修改内容后失去焦点，粘贴内容后
            $noteContent.on('focus',function(){
                if($noteContent.html() == '点击这里开始编辑'){
                    $noteContent.html('');
                }
                $noteContent.data('before',$noteContent.html());
            }).on('blur paste',function(){
                if($noteContent.data('before') != $noteContent.html()){
                    $noteContent.data('before',$noteContent.html());
                    _this.setLayout();
                    if(_this.id){
                        _this.edit($noteContent.html());
                    }else{
                        _this.add($noteContent.html());
                    }
                }
            });

            //删除
            $delete.on('click',function(){
                _this.delete();
            });

            //点击头部移动
            $noteHeader.on('mousedown',function(e){
                var evtX = e.pageX - $note.offset().left,
                    evtY = e.pageY - $note.offset().top;
                $note.addClass('draggable').data('evtPos',{x:evtX,y:evtY});
            }).on('mouseup',function(){
                $note.removeClass('draggable').removeData('evtPos');
            });

            $('body').on('mousemove',function(e){
                $('.draggable').length && $('.draggable').offset({
                    top: e.pageY - $('.draggable').data('evtPos').y,
                    left: e.pageX - $('.draggable').data('evtPos').x
                });
            });

        },

        edit: function(msg){
            var _this = this;
            $.post('/api/notes/edit',{
                id: this.id,
                note: msg
            }).done(function(ret){
                if(ret.status === 0){
                    Toast.init("编辑成功");
                }else{
                    Toast.init(ret.errorMsg);
                }
            })
        },

        add: function(msg){
            var _this = this;
            $.post('/api/notes/add',{
                note: msg
            }).done(function(ret){
                if(ret.status === 0){
                    _this.id = ret.data.id;
                    Toast.init("添加成功");
                }else{
                    Toast.init(ret.errorMsg);
                }
            })
        },

        delete: function(){
            var _this = this;
            $.post('/api/notes/dalete',{
                id: this.id
            }).done(function(ret){
                if(ret.status === 0){
                    Toast.init("删除成功");
                    _this.$note.remove();
                    Event.fire('waterfall');
                }else{
                    Toast.init(ret.errorMsg);
                }
            });
        }

     }

     return {
         init: function(opts){
             new _note(opts);
         }
     }
 })()

 module.exports = Note;