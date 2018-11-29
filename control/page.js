const {db} = require("../Schema/config");
const articleSchema = require("../Schema/articleSchema");
const userSchema = require("../Schema/userSchema");

const Article = db.model("articles",articleSchema);
const User = db.model("users",userSchema);
/*主页*/
exports.index = async (ctx)=>{
    /*确定当前第几页*/
    let pageIndex = ctx.params.id || 1;
    pageIndex --;
    /*获取集合内文档总数*/
    let AllArtNum = await Article.estimatedDocumentCount((err,num)=>err?console.log(err):num);

    let pagenum = 8;
    let artData = await Article.find()
        .sort("-created")//事件降序排序
        .skip(pageIndex*pagenum)//跳过多少条
        .limit(pagenum)//显示多少条
        .populate({
            path:"author",
            select:"_id username avatar"
        })//联表查询发布者
        .then(data=>data)//执行并返回数据
        .catch(err=>console.log(err));

    /*渲染首页*/
    await ctx.render("./index",{
        title:"首页",
        session:ctx.session,
        artData,
        AllArtNum,
        pagenum
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