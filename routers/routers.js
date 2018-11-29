const Router = require('koa-router');
/*登录注册中间件*/
const user = require('../control/user');
/*主页及登录注册页中间件*/
const page = require("../control/page");
/*文章中间件*/
const article = require("../control/article");

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

/*跳转至发表页面*/
router.get("/article",user.keepLogin,article.publishPage);

/*发表文章*/
router.post("/article",user.keepLogin,article.publishArt);

/*文章列表*/
router.get("/page/:id",user.keepLogin,page.index);

module.exports = router;