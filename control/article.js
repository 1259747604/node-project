const {db} = require("../Schema/config");
const articleSchema = require("../Schema/articleSchema");

const Article = db.model("articles",articleSchema);

const commentSchema = require("../Schema/commentSchema");
const Comment = db.model("comments",commentSchema);
/*跳转至文章编写页面*/
exports.publishPage = async (ctx)=>{
    await ctx.render("./articlePublish",{
        title:"文章发表页",
        session:ctx.session
    });
};

/*发表文章*/
exports.publishArt = async (ctx)=>{
    if(ctx.session.isNew){
        return ctx.body = {
            msg:"请登录用户",
            status:0
        }
    }
    let data = ctx.request.body;
    data.author = ctx.session.uid;
    await new Promise((resolve, reject) => {
        new Article(data)
            .save((err,data)=>{
                if(err)return reject(err);
                resolve(data)
            })
    })
        .then(data=>{
            ctx.body = {
                msg:"发表成功",
                status:1
            }
        })
        .catch(err=>{
            ctx.body = {
                msg:"请重新发表",
                status:0
            }
        })
};

/*文章详情*/
exports.details = async (ctx)=>{
    const _id = ctx.params.id;

    /*查询对应数据库*/
    let details = await Article.find({_id})
        .populate("author","username _id avatar")
        .then(data => data)
        .catch(err => console.log(err));

    /*查询对应评论数据库*/
    let commentList = await Comment.find({CArticle:_id})
        .sort("-created")
        .populate("from","username _id avatar")
        .then(data => data)
        .catch(err => console.log(err));;

    /*渲染模板*/
    await ctx.render("./articledetail",{
        title:details[0].title,
        session:ctx.session,
        details:details[0],
        commentList
    });
};