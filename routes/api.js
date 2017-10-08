

var Note = require('../model/note.js');

var express = require('express');
var router = express.Router();


/*处理所有以/api开头的路由
1.获取所有的note: GET  /api/notes      req:{}  res:{status:0,data:[{},{}} {status:1,errorMsg:错误原因}
2.创建一个note: POST /api/notes/add     req:{note:''} res:{status:0} {status:1,errorMsg:错误原因}
3.修改一个note: POST /api/notes/edit    req:{note:'new note', id: xxx}
4.删除一个note: POST /api/notes/delete  req:{id:XXX}
*/

/*获取所有数据 */
router.get('/notes', function(req, res, next) {
  var query = {raw: true}
  if(req.session.user){
    query.where = {
      uid: req.session.user.id
    }
  }
  
  Note.findAll(query).then(function(notes){
    console.log(notes)
    res.send({status: 0,data: notes});
  }).catch(()=>{
    res.send({status:1,errorMsg:'数据库出错!'})
  })
});

/*添加note */
router.post('/notes/add', function(req, res, next) {
  if(!req.session.user){
    return res.send({status:1 ,errorMsg:'请先登录'})
  }

  var note = req.body.note;
  var uid = req.session.user.id;


  Note.create({text: note,uid:uid}).then(()=>{
    res.send({status: 0})
  }).catch(()=>{
    res.send({status:1,errorMsg:'数据库出错!'})
  })
 
});

/*修改note */
router.post('/notes/edit', function(req, res, next) {
  if(!req.session.user){
    return res.send({status:1 ,errorMsg:'请先登录'})
  }

  var uid = req.session.user.id;
  Note.update({text: req.body.note},{where:{id: req.body.id, uid: uid}} ).then(()=>{
    console.log(arguments)
    res.send({status:0})
  }).catch(()=>{
    res.send({status:1,errorMsg:'数据库出错!'})
  })
});

/*删除 */
router.post('/notes/delete', function(req, res, next) {
  if(!req.session.user){
    return res.send({status:1 ,errorMsg:'请先登录'})
  }
  
  var uid = req.session.user.id;
  Note.destroy({where: {id: req.body.id, uid:uid}}).then(()=>{
    res.send({status:0})
  }).catch(()=>{
    res.send({status:1,errorMsg:'数据库出错!'})
  })
});

module.exports = router;
