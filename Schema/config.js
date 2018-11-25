const mongoose = require("mongoose");
/*创建数据库连接*/
const db = mongoose.createConnection("mongodb://localhost:27017/ttblog",{ useNewUrlParser: true });
/*使用js的Promise*/
mongoose.Promise = global.Promise;

/*监听数据库连接*/
db.on("err",()=>{
    console.log('数据库连接失败');
});
db.on("open",()=>{
    console.log('数据库连接成功');
});
/*Schema*/
const Schema = mongoose.Schema;

module.exports = {
    Schema,
    db
};