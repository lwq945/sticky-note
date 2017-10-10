//model操作数据库的数据

/* 连接数据库*/
const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',

    // 存储位置
    storage: path.join(__dirname,'../database/database.sqlite')
  });

  
  /*
  //测试是否连接成功
  sequelize
  .authenticate()
  .then((err)=> {
    console.log('Connection has been established successfully.');
  })
  .catch((err)=> {
    console.error('Unable to connect to the database:', err);
  });

  //node ./model/note.js 连接成功在database目录下会出现database.sqlite
  */

  //添加表数据字段
  const Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING
    },
    uid: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    }
  });

  //创建表
 Note.sync()
  //删除表
//Note.sync({force: true})
  
  /*
  //创建数据
  Note.sync().then(() => {
    // Table created
      Note.create({text: 'hello world'})
    }).then(()=>{
      Note.findAll({raw: true}).then((notes)=>{
        console.log(notes)
      })
  });
*/

  /*
// 查询数据
Note.findAll({raw: true, where: {id:2}}).then(notes => {
  console.log(notes)
})
*/

module.exports = Note;