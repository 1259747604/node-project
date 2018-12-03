const koaBody = require("koa-body");
const {join} = require("path");
module.exports = koaBody({
    multipart:true,
    formidable: {
        // 上传存放的路径
        uploadDir: join(__dirname, `../public/avatar`),
        // 保持后缀不变
        keepExtensions: true,
        // 文件大小
        maxFileSize: 102400000,
        onFileBegin: (name, file) => {
            // 取后缀  如：.js  .txt
            const reg = /\.[A-Za-z]+$/g;
            const ext = file.name.match(reg)[0];

            // 修改上传文件名
            file.path = join(__dirname, "../public/avatar/") + Date.now() + ext;
            file.name = Date.now() + ext;
        },
        onError(err){
            ctx.err = err;
        }
    }
});