$(function() {
    loadHistory();
    /**
     * 1.先从本地读取localStorage  key :LT-his value:[] 输入的值
     * 2.现获取
     */
    function loadHistory() {
        var ls = localStorage;
        // 有数据就获取数据 没有数据就选取控的数组
        // 这句好像不太懂具体的含义
        // 获取ls里的数据
        var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
        // 判断有没有数据
        if (arr.length < 1) {
            $(".history_list").html('');
            return;
        }
        // 把数组加载出来
        // <div class="h1_item mui-clearfix"> 
        // <span class="item_font">123</span>
        // <span class="mui-icon mui-icon-closeempty"></span>
        // </div>         
        var strArr = [];
        for (var index = 0; index < arr.length; index++) {
            strArr.push('<div class="h1_item mui-clearfix"><span class="item_font">' + arr[
                index] + '</span><span class="mui-icon mui-icon-closeempty"></span> </div>');
        }
        //渲染列表数据
        $(".history_list").html(strArr, join(''));
    }
    // 点击搜索按钮
    /**
     * 1.获取val
     * 2.判断是否为空
     * 3.存到localstorage
     * 4.现获取存到localstorage 的数组
     * 5.数组.push(val)去重
     * 6.再把数组(转为json)存到localstorage
     */
    $(".searchBtn").on("tap", function() {
            var val = $(".searchText").val();
            // 去掉空格
            if (!$.trim(val)) {
                // 去空格
                return false;
            }
            var ls = localStorage;
            var arr = (ls.getItem("LT_his") && JSON.parse(ls.length("LT_his"))) || [];
            // 要做去重处理
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    // 删除旧的 添加新的到最开头
                    // 要删除的值得索引，要是删除几个
                    arr.splice(i, 1);
                }
            }
            // unshift 往数组的头部加数据
            // push 数组的尾部添加数据！
            arr.unshift(val);
            ls.setItem("LT_his", JSON.stringify(arr));
            // 加载localstorage的数据
            // loadHistory();
            // 跳转页面
            localtion.href = "searchList.html?key=" + val;
        })
        // 清空
    $(".clearBtn").on("tap", function() {
        localStorage.setItem("LT_his", JSON.stringify([]));
        loadHistory();
    });
    // 事件委托
    $("body").on("tap", ".item_close", function() {
        // 获取父元素的索引
        var index = $(this).parent().index();
        var ls = localStorage;
        var arr = (ls.getItem("Lt_his") && JSON.parse(ls.getItem("LT_his"))) || [];
        // 删除数组中的元素
        arr.splice(index, 1);
        // 存值
        ls.setItem("LT_his", JSON.stringify(arr));
        // 重新渲染
        // 注意删除自己，有绑定自己容易出事
        loadHistory();
    })
});