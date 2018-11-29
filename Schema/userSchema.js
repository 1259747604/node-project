/*调用*/
const {Schema} = require("./config");

const user = new Schema({
    username:String,
    password:String,
    avatar:{
        type:String,
        default:"/avatar/1.jpg"
    }
},{
    versionKey:false
});

module.exports = user;