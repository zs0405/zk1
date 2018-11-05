var btn = document.querySelectorAll(".btn");
//点击事件
for (var i = 0; i < btn.length; i++) {

    btn[i].onclick = function() {
        //创建xml
        var xml = new XMLHttpRequest();
        //接收后台返回的数据
        xml.onreadystatechange = function() {
            if (xml.readyState === 4) {
                if (xml.status === 200) {
                    console.log(JSON.parse(xml.responseText));
                    window.location.href = "search.html"
                }
            }
        };
        //连接服务器
        xml.open("get", "/api/data", true);
        //发送请求
        xml.send();
    }
}