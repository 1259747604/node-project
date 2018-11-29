layui.use(['element',"laypage"], function(){
    const laypage = layui.laypage;
    const $ = layui.$;
    laypage.render({
        elem: 'pageCon',
        count:$("#pageCon").data("all"),
        limit:$("#pageCon").data("num"),
        groups:5,
        curr: location.pathname.replace("/page/", ""),
        jump:function (obj,f) {
            $("#pageCon a").each((i, v) => {
                let pageValue = `/page/${$(v).data("page")}`;
                if($(v).data("page") && $(v).data("page") <= Math.ceil(this.count/this.limit)){
                    v.href = pageValue
                }
            })
        }
    });
});