//简单模式
function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

//复杂模式
function randomString(len) {
    //随机串长度
    len = len || 32;

    // 时间戳
    var timestamp = new Date().getTime() + "";
    var timelen = timestamp.length;

    //插入断点
    var breakPoint = [8, 13, 18, 23];

    // 默认去掉了容易混淆的字符 oOLl,9gq,Vv,Uu,I1
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;

    var randomStr = '';
    for (var i = 0; i < len - timelen; i++) {
        randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    randomStr += timestamp;

    for(var j = 0, alen = breakPoint.length; j< alen; j++) {
        var regexp = new RegExp('^([\\S]{'+ breakPoint[j] +'})');
        randomStr = randomStr.replace(regexp, "$1-");
    }

    return randomStr;
}
