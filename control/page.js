/*主页*/
/*
* 需要参数
* title
*/
exports.index = async (ctx)=>{
    await ctx.render("./index",{
        title:"首页",
        session:ctx.session
    })
};

/*登录注册页*/
exports.lreg = async (ctx)=>{
    const show = /login$/.test(ctx.path);
    await ctx.render("./login",{
        title:"登录注册",
        show
    })
};