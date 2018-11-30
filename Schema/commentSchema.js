const {Schema} = require("./config");
const ObjectId = Schema.Types.ObjectId;
/*评论内容 评论人 评论文章*/
const commentSchema = new Schema({
    /*评论内容*/
    comment:String,
    /*评论人*/
    from:{
        type:ObjectId,
        ref:"users"
    },
    /*评论文章*/
    CArticle:{
        type:ObjectId,
        ref:"articles"
    }
},{
    versionKey:false,
    timestamps:{
        createdAt:"created"
    }
});
module.exports = commentSchema;