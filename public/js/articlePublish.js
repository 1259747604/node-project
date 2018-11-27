layui.use(['form','layer', 'layedit', 'element'], function () {
    const $ = layui.$;
    const form = layui.form;
    const layedit = layui.layedit;
    const layer = layui.layer;
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