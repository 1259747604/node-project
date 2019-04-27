const Router = require('koa-router');
/*登录注册中间件*/
const user = require('../control/user');
/*主页及登录注册页中间件*/
const page = require("../control/page");
/*文章中间件*/
const article = require("../control/article");
/*评论*/
const comment = require("../control/comment");
/*个人中心*/
const personal = require("../control/personal");
/*用于头像上传*/
const upavatar = require("../util/uploadavatar");

const router = new Router;

/*测试*/
router.get('/test',async (ctx) =>{
    ctx.body = '测试数据'
});
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

/*文章详情*/
router.get("/article/:id",user.keepLogin,article.details);

/*文章评论*/
router.post("/comment",user.keepLogin,comment.commentList);

/*个人中心*/
router.get('/personal/:id',user.keepLogin,personal.personal);

/*后台修改头像*/
router.post("/personal/avatar",user.keepLogin,upavatar,personal.updateAvatar);

/*后台获取用户评论*/
router.get("/user/comlist",user.keepLogin,personal.getcomlist);

/*后台删除评论*/
router.delete("/comment/:id",user.keepLogin,personal.delComment);

/*后台获取用户文章列表*/
router.get("/user/artList",user.keepLogin,personal.getartList);

/*后台删除文章*/
router.delete("/article/:id",user.keepLogin,personal.delArticle);

/*文章更新页面*/
router.get("/updateArticle/:id",user.keepLogin,personal.updateArticlePage);

/*文章更新*/
router.put("/updateArticle",user.keepLogin,personal.updateArticle);

/*获取用户列表*/
router.get("/user/userList",user.keepLogin,personal.getUserList);

/*删除用户*/
router.delete("/user/:id",user.keepLogin,personal.delUser);

/*查询用户页面*/
router.get("/user/username",user.keepLogin,personal.searchUserPage);

/*查询用户*/
router.get("/user/s",user.keepLogin,personal.searchUser);

module.exports = router;