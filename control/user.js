const {db} = require("../Schema/config");
const userSchema = require("../Schema/userSchema");
const encrypt = require("../util/encrypt");/*加密模块*/

/*获得操作集合*/
const User = db.model("users",userSchema);

/*注册逻辑*/
exports.reg = async (ctx)=>{
    /*拿取用户提交的数据*/
    const info = ctx.request.body;
    const username = info.username;
    const password = info.password;
    /*查询数据库*/
    await new Promise((resolve, reject) => {
        User.find({username},(err,data)=>{
            if(err)return reject(err);
            /*用户名存在*/
            if(data.length !== 0){
                return resolve("")
            }
            /*用户名不存在保存至数据库*/
            let _user = new User({
                username,
                password:encrypt(password)
            });
            _user.save((err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data)
                }
            });
        })
    })
        .then(async data=>{
            if(data){
                /*用户名注册成功*/
                await ctx.render("./transfer",{
                    status:"注册成功"
                })
            }else{
                /*用户名已存在*/
                await ctx.render("./transfer",{
                    status:"用户名已存在"
                })
            }
        })
        .catch(async err=>{
            /*注册失败*/
            await ctx.render("./transfer",{
                status:"注册失败 请重新注册"
            })
        })
};

/*登录逻辑*/
exports.login = async (ctx)=>{
    /*获取用户登录信息*/
    const info = ctx.request.body;
    const username = info.username;
    const password = info.password;

    await new Promise((resolve, reject) => {
        User.find({username},(err,data)=>{
            if(err)return reject(err);
            /*没有该用户*/
            if(data.length === 0)return reject("用户不存在");

            /*比较密码*/
            if(data[0].password === encrypt(password)){
                return resolve(data);
            }
            resolve("");

        })
    })
        .then(async data=>{
            if(data){
                /*数据正确*/
                await ctx.render("./transfer",{
                    status:"登录成功"
                })
            }
            else{
                /*密码错误*/
                await ctx.render("./transfer",{
                    status:"用户名或密码不正确"
                })
            }
        })
        .catch(async err=>{
            /*登录失败*/
            await ctx.render("./transfer",{
                status:"登录失败"
            })
        });
};