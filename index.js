const Koa = require("koa");
const router = require("./routers/routers");
const views = require("koa-views");
const static = require("koa-static");
const log = require("koa-log");
const koaBody = require("koa-body");
const koaSession =require("koa-session");
const {join} = require("path");

const app = new Koa;

/*日志*/
// app.use(log());
app.use(koaBody());
/*session*/
app.keys = ["tt is a good boy"];
/*配置项*/
const CONFIG = {
    key : "tt is a bad boy",//密匙
    maxAge : 3600000,//过期时间 1小时
    autoCommit : true,//自动提交头文件
    overwrite : true,//是否覆盖
    httpOnly : true,//不允许客户端读取
    signed : true,//是否签名
    rolling : true//是否刷新
};
app.use(koaSession(CONFIG,app));
/*静态资源*/
app.use(static(join(__dirname,"public")));
/*pug文件*/
app.use(views(join(__dirname,"views"),{extension:"pug"}));
/*路由*/
app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000,()=>{
    console.log('服务监听在localhost:3000');
});