const fs = require("fs");
const {join} = require("path");

const {db} = require("../Schema/config");
const userSchema = require("../Schema/userSchema");

const User = db.model("users",userSchema);
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