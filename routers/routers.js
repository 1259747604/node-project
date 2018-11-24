const Router = require('koa-router');

const router = new Router;
/*需要参数
title
* */
router.get('/',async (ctx)=>{
    await ctx.render("./index",{
        title:"首页",
    })
});
/*登录注册*/
router.get(/^\/user\/(?=login|reg)/,async (ctx)=>{
    const show = /login$/.test(ctx.path);
    await ctx.render("./login",{
        title:"登录注册",
        show
    })
});
module.exports = router;