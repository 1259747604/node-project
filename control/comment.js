const {db} = require("../Schema/config");
const commentSchema = require("../Schema/commentSchema");

/*操作数据库*/
const Comment = db.model("comments",commentSchema);

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