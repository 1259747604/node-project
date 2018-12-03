/*调用*/
const {Schema} = require("./config");

/*
用户名
密码
头像
权限
文章数量
评论数量
* */
const user = new Schema({
    username:String,
    password:String,
    avatar:{
        type:String,
        default:"/avatar/1.jpeg"
    },
    role:{
        type:String,
        default:"1"
    },
    articleNum:{
        type:Number,
        default:0
    },
    commentNum:{
        type:Number,
        default:0
    }
},{
    versionKey:false
});

module.exports = user;