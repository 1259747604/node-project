const {Schema} = require("./config");
const ObjectId = Schema.Types.ObjectId;

const article = new Schema(
    {
        author:{
            type:ObjectId,
            ref:"users"
        },
        tips:String,
        title:String,
        content:String
    },
    {
        versionKey:false,
        timestamps:{
            createdAt:"created"
        }
    });

module.exports = article;