const Koa = require("koa");
const router = require("./routers/routers");
const views = require("koa-views");
const static = require("koa-static");
const log = require("koa-log");
const koaBody = require("koa-body");
const koaSession =require("koa-session");
const compress = require("koa-compress");
const {join} = require("path");

const app = new Koa;

/*日志*/
app.use(log());
/*资源压缩*/
app.use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}));
/*koa-body*/
app.use(koaBody({
    strict  : false,
}));
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

/*需要一个超级管理员*/
{
    const {db} = require("./Schema/config");
    const userSchema = require("./Schema/userSchema");
    const encrypt = require("./util/encrypt");/*加密模块*/

    /*获得操作集合*/
    const User = db.model("users",userSchema);

    User.find({username:"admin"})
        .then(data => {
            /*存在超级用户*/
            if(data.length !== 0) return data;
            /*不存在超级用户
            * 创建超级用户
            * */
            let pwd = "111111";
            new User({
                username:"admin",
                password:encrypt(pwd),
                role:"666"
            })
                .save((err)=>{
                    if(err)
                        console.log(err);
                })
        })
        .catch(err => console.log(err));
}