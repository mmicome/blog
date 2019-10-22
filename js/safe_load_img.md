```js
//安全加载并处理
function getImage(url) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() {
      resolve(url)
    }
    img.onerror = function() {
      reject(url)
    }
    img.src = url;
  })
}

getImage("imgURL").then(function(successURL){
  //do
}).catch(function(errorURL) {
  //do
})
```

```js
//判断是否加载完成
function imgLoaded(imgElement) {
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.
  return imgElement.complete && imgElement.naturalHeight !== 0;
}
//这只是第一次可靠地工作。如果您随后更改了图像的src，至少safari mobile将继续报告naturalWidth和complete的第一个值
```

```js
//实例
var safeLoadImg = function(imgs) {
  $.each(imgs, function (i, imgi) {
    var target = $(imgi),
        even = target[0].complete ? "load" : "error";
    target.on(even, function (even) {
        var img,
            times = 0,
            name = target.attr("data-name"),
            path = target.attr("data-path");

        this.src = '/Images/load.gif'; //加载失败是的load动画
        target.attr("data-time", setInterval(function () {
            img = new Image();
            img.onload = function () {
                target.attr("src", img.src);
                clearInterval(target.attr("data-time"));
            }
            if (times > 20) {
                clearInterval(target.attr("data-time"))
            };
            img.src = 'http://XXX/Images/' + path + '/' + target.attr("data-name") + '.jpg'
            times++;
        }, 3000))
    })
})
}
```

```js
// 更新：
// 05.27: 1、保证回调执行顺序：error > ready > load；2、回调函数this指向img本身
// 04-02: 1、增加图片完全加载后的回调 2、提高性能

/**
 * 图片头数据加载就绪事件 - 更快获取图片尺寸
 * @version    2011.05.27
 * @author    TangBin
 * @see        http://www.planeart.cn/?p=1121
 * @param    {String}    图片路径
 * @param    {Function}    尺寸就绪
 * @param    {Function}    加载完毕 (可选)
 * @param    {Function}    加载错误 (可选)
 * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
        alert('size ready: width=' + this.width + '; height=' + this.height);
    });
 */
var imgReady = (function () {
    var list = [], intervalId = null,

    // 用来执行队列
    tick = function () {
        var i = 0;
        for (; i < list.length; i++) {
            list[i].end ? list.splice(i--, 1) : list[i]();
        };
        !list.length && stop();
    },

    // 停止所有定时器队列
    stop = function () {
        clearInterval(intervalId);
        intervalId = null;
    };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();
        
        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };
        
        width = img.width;
        height = img.height;
        
        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };
        
        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();
        
        // 完全加载完毕的事件
        img.onload = function () {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();
        
            load && load.call(img);
            
            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();
```
