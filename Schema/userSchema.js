/*调用*/
const {Schema} = require("./config");

const user = new Schema({
    username:String,
    password:String
},{
    versionKey:false
});

module.exports = user;