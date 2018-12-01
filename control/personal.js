const fs = require("fs");
const {join} = require("path");
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