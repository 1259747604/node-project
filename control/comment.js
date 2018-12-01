const {db} = require("../Schema/config");
const commentSchema = require("../Schema/commentSchema");
const articleSchema = require("../Schema/articleSchema");

/*操作数据库*/
const Comment = db.model("comments",commentSchema);
const Article = db.model("articles",articleSchema);

/*评论*/
exports.commentList = async (ctx)=>{
    if(ctx.session.isNew){
        return ctx.body = {
            msg:"请登录账号",
            status:0
        }
    }
    let data = ctx.request.body;
    data.from = ctx.session.uid;

    /*保存至数据库*/
    await new Promise((resolve, reject) => {
        new Comment(data)
            .save((err,data)=>{
                if(err) reject(err);
                /*评论成功即评论计数器加1*/
                Article.updateOne({_id:data.CArticle},{$inc:{commentNum:1}})
                    .then(data=>data)
                    .catch(err=>console.log("更新计数失败"));
                resolve(data)
            })
    })
        .then(data=>{
            ctx.body={
                msg:"评论成功",
                status:1
            }
        })
        .catch(err=>{
            ctx.body={
                msg:"评论失败",
                status:0
            }
        })

};