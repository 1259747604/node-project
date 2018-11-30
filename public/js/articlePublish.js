layui.use(['form','layer', 'layedit', 'element'], function () {
    const $ = layui.$;
    const form = layui.form;
    const layedit = layui.layedit;
    const layer = layui.layer;
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
    form.on("submit(submitArt)",function (data) {
        const {tips,title} = data.field;

        if(layedit.getText(index).trim().length === 0){
            layer.alert("请编写文章");
            return false
        }

        const sendData = {
            tips,
            title,
            content:layedit.getContent(index)
        };
        $.post("/article",sendData,function (msg) {
            if(msg.status){
                layer.alert("发表成功",{
                    time:2000,
                    end: function () {
                        location.href = "/";
                    }
                })
            }else{
                layer.alert("发表失败，"+msg.msg);
            }
        });
        return false
    })
});