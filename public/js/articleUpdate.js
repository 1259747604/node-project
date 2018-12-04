layui.use(['form','layer', 'layedit', 'element'], function () {
    const $ = layui.$;
    const form = layui.form;
    const layedit = layui.layedit;
    const layer = layui.layer;

    /*获取 原内容*/
    const lastcontent = $("#content").data("content");
    const artid = $("#content").data("artid");
    /*插件设置*/
    layedit.set({
        uploadImage: {
            url: '',
            accept: 'image',
            acceptMime: 'image/*',
            exts: 'jpg|png|gif|bmp|jpeg',
            size: '10240'
        }
        , uploadVideo: {
            url: '',
            accept: 'video',
            acceptMime: 'video/*',
            exts: 'mp4|flv|avi|rm|rmvb',
            size: '20480'
        }
        , calldel: {
            url: '',
            done: function (data) {
                console.log(data);
            }
        }
        , devmode: true
        , codeConfig: {
            hide: false,
            default: 'javascript'
        }
        , tool: [
            'html','undo','redo' ,'code', 'strong', 'italic', 'underline', 'del', 'addhr', '|', 'fontFomatt', 'fontBackColor', 'colorpicker', 'face'
            , '|', 'left', 'center', 'right', '|', 'link', 'unlink'
            , '|'
            , 'table'
            , 'fullScreen'
        ],
        /*, height: '90%'*/
        height: 500
    });
    const index = layedit.build('content', {
        height: 500
    });
    layedit.setContent(index,lastcontent,false);
    form.on("submit(submitArt)",function (data) {
        const {tips,title} = data.field;

        if(layedit.getText(index).trim().length === 0){
            layer.alert("请编写文章");
            return false
        }

        const sendData = {
            artid,
            tips,
            title,
            content:layedit.getContent(index)
        };
        // console.log(sendData);
        $.ajax({
            method:"put",
            url:"/updateArticle",
            data:sendData,
            success(res){
                if(res.status){
                    layer.msg(res.msg,{
                        time:300,
                        end(){
                            location.href = "/";
                        }
                    })
                }else{
                    layer.msg(res.msg,{
                        time:3000,
                    })
                }
            }
        });
        return false
    })
});