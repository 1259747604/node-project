const Router = require('koa-router');
/*登录注册中间件*/
const user = require('../control/user');
/*主页及登录注册页中间件*/
const page = require("../control/page");

const router = new Router;
/*
主页路由
*/
router.get('/',user.keepLogin,page.index);

/*登录注册页面*/
router.get(/^\/user\/(?=login|reg)/,page.lreg);

/*登录用户*/
router.post("/user/login",user.login);

/*注册用户*/
router.post("/user/reg",user.reg);

/*退出用户*/
router.get("/user/logout",user.logout);

module.exports = router;