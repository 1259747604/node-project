const Router = require('koa-router');
/*登录注册逻辑*/
const user = require('../control/user');

const router = new Router;
/*
主页路由
需要参数
title
* */
router.get('/',async (ctx)=>{
    await ctx.render("./index",{
        title:"首页",
    })
});

/*登录注册页面*/
router.get(/^\/user\/(?=login|reg)/,async (ctx)=>{
    const show = /login$/.test(ctx.path);
    await ctx.render("./login",{
        title:"登录注册",
        show
    })
});

/*登录用户*/
router.post("/user/login",user.login);

/*注册用户*/
router.post("/user/reg",user.reg);

module.exports = router;