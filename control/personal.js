const fs = require("fs");
const {join} = require("path");

const {db} = require("../Schema/config");
const userSchema = require("../Schema/userSchema");
const commentSchema = require("../Schema/commentSchema");
const articleSchema = require("../Schema/articleSchema");

const User = db.model("users",userSchema);
const Comment = db.model("comments",commentSchema);
const Article = db.model("articles",articleSchema);

/*进入个人中心*/
exports.personal = async (ctx)=>{
    /*如果用户没有登录*/
    if(ctx.session.isNew){
        return await ctx.render("./404");
    }
    /*如果用户登录*/
    const id = ctx.params.id;

    const data = fs.readdirSync(join(__dirname,"../views/personal"));

    let flag = false;
    data.forEach(item=>{
        let str = item.replace(/(personal-)|(.pug)/g, "");
        if(str === id){
            flag = true;
        }
    });
    /*判断是否存在路由的对应页面*/
    if(flag){
        await ctx.render(`./personal/personal-${id}`,{
            title:"个人中心",
            session:ctx.session,
            id
        })
    }
    else{
        ctx.status = 404;
        await ctx.render(`./404`,{
            title:"404"
        })
    }

};

/*修改头像更新数据库*/
exports.updateAvatar = async (ctx)=>{
    if(ctx.request.files){
        let file = ctx.request.files;
        await User.updateOne({_id:ctx.session.uid},{$set:{avatar:`/avatar/${file.file.name}`}})
            .then(data=>{
                ctx.session.avatar = `/avatar/${file.file.name}`;
                ctx.body = {
                    status:1,
                }
            })
            .catch(err=>{
                ctx.body = {
                    status:0,
                }
            })
    }
};

/*获取用户评论列表*/
/*被评论文章 评论内容 评论时间*/
exports.getcomlist = async (ctx)=>{
    let data = await Comment.find({from:ctx.session.uid})
        .sort("-created")
        .populate("CArticle","title")
        .then(data=>data);
    // console.log(data);
    if(data.length !==0){
        ctx.body={
            status:1,
            data
        }
    }
};

/*评论删除*/
exports.delComment = async (ctx)=>{
    const commentid = ctx.params.id;
    /*删除评论*/
    await Comment.findOneAndDelete({_id:commentid})
        .then(data=>{
            ctx.body = {
                status:1,
                msg:"删除成功"
            }
        })
        .catch(err=>{
            ctx.body = {
                status:0,
                msg:"删除失败"
            }
        });
    /*删除用户计数*/
    const uid = ctx.session.uid;
    await User.updateOne({_id:uid},{$inc:{commentNum:-1}})
        .exec((err,data)=>{
            if(err)return console.log(err);
        });
    /*删除文章计数*/
    const aid = ctx.request.body.articleId;
    await Article.updateOne({_id:aid},{$inc:{commentNum:-1}})
        .exec((err,data)=>{
            if(err)return console.log(err);
        });
};

/*获取用户文章列表*/
exports.getartList = async (ctx)=>{
    /*获取当前用户id*/
    const uid = ctx.session.uid;
    /*查询*/
    let data = await Article.find({author:uid})
        .sort("-created")
        .then(data => data)
        .catch(err=>err);
    if(data.length === 0){
        ctx.body = {
            status : 0,
            msg:"无数据"
        }
    }else{
        ctx.body = {
            status : 1,
            data
        }
    }
};

/*删除文章*/
exports.delArticle = async (ctx)=>{
    /*获取文章id*/
    const id = ctx.params.id;
    /*删除文章评论*/
    await Comment.deleteMany({CArticle : id})
        .exec(err=>err);
    /*减少用户文章计数*/
    const uid = ctx.session.uid;
    await User.updateOne({_id : uid},{$inc:{articleNum : -1}})
        .exec(err=>err);
    /*删除文章*/
    await Article.findOneAndDelete({_id : id})
        .then(data=>{
            ctx.body = {
                status:1,
                msg:"删除成功"
            }
        })
        .catch(err=>{
            ctx.body = {
                status:1,
                msg:"删除失败"
            }
        })
};

/*更新文章页面*/
exports.updateArticlePage = async (ctx)=>{
    /*查询文章*/
    const _id = ctx.params.id;
    let data = await Article.find({_id})
        .then(data=>data);

    await ctx.render('updateArticle',{
        session:ctx.session,
        data:data[0]
    })
};

/*更新文章*/
exports.updateArticle = async (ctx)=>{
    const data = ctx.request.body;
    const _id = data.artid;
    /*更新数据库*/
    await Article.updateOne({_id},{$set:{
        tips:data.tips,
        title:data.title,
        content:data.content
        }})
        .then(data=>{
            ctx.body = {
                status:1,
                msg:"更新成功"
            }
        })
        .catch(err=>{
            ctx.body = {
                status:0,
                msg:"更新失败"
            }
        });
};

/*获取用户列表*/
exports.getUserList = async (ctx)=>{
    /*查用户*/
    await User.find()
        .then(data=>{
            ctx.body = {
                status:1,
                data,
                session:ctx.session
            }
        })
        .catch(err=>console.log(err))
};

/*删除用户*/
exports.delUser = async (ctx)=>{
    const id = ctx.params.id;
    /*删除用户评论*/
    await Comment.deleteMany({from:id})
        .exec(err=>err);
    /*删除用户文章*/
    await Article.deleteMany({author:id})
        .exec(err=>err);
    /*删除用户*/
    await User.findOneAndDelete({_id:id})
        .then(data=>{
            ctx.body = {
                status:1,
                msg:"删除成功"
            }
        })
        .catch(err=>{
            ctx.body = {
                status:0,
                msg:"删除失败"
            }
        })
};

/*查询用户页面*/
exports.searchUserPage = async (ctx)=>{
    /*获取查询字符串*/
    let searchText = ctx.request.query.search;

    /*渲染页面*/
      await ctx.render("searchUsername",{
          session:ctx.session,
          searchText,
      })
};

/*查询用户*/
exports.searchUser = async (ctx)=>{
    /*获取查询字符串*/
    let searchText = ctx.request.query.search;

    /*查询数据库*/
     await User.find({username:{$regex:searchText,$options:"$i"}})
        .then(data=>{
            ctx.body = {
                data,
                status:1
            }
        })
         .catch(err=>console.log(err));
};