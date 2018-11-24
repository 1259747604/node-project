const Koa = require("koa");
const router = require("./routers/routers");
const views = require("koa-views");
const static = require("koa-static");
const log = require("koa-log");
const {join} = require("path");
const app = new Koa;

/*日志*/
app.use(log());
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