const {Schema} = require("./config");

const article = new Schema(
    {
        author:String,
        tips:String,
        title:String,
        content:String
    },
    {
        versionKey:false,
    });

module.exports = article;