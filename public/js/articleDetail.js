layui.use(['layedit','layer','element','code'], function(){
    const $ = layui.$;
    const layer = layui.layer;
    layui.code({
        elem: 'pre',
        about:false
    });
    const layedit = layui.layedit;
    const index = layedit.build('comment',{
        tool:[],
        hideTool:[],
        height:100
    });
    $(".combtn").eq(0).on("click",function () {
        let comment = layedit.getText(index);
        if(!comment)return layer.msg("还没有进行评论");
        let data = {
            comment,
            CArticle:$("h1").eq(0).data("id")
        };
        /*发送数据*/
        $.post("/comment",data,function (data) {
            if(data.status){
                layer.msg(data.msg,{
                    time:300,
                    end:function () {
                        window.location.reload();
                    }
                });
            }else{
                layer.msg(data.msg);
            }
        })
    });
});