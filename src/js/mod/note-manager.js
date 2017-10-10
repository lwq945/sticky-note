var Toast = require('./toast.js');
var Note = require('./note.js');
var Event = require('./event.js');
//var $ = require('jquery');

var NoteManager = (function(){
    function load(){
        $.get('/api/notes').done(function(ret){
            if(ret.status == 0){
                $.each(ret.data,function(idx,article){
                    new Note.init({
                        id: article.id,
                        context: article.text,
                        username: article.username
                        //update: new Date(parseInt(article.updatedAt)).toLocaleString('chinese',{hour12:false})
                    });
                });

                Event.fire('waterfall');
            }else{
                Toast.init(ret.errorMsg);
            }
        }).fail(function(){
            Toast.init('网络异常');
        })
    }

    function add(){
        new Note.init();
    }

    return {
        load: load,
        add: add
    }
})()

module.exports = NoteManager;