Javascript异步编程

```js
//Event Loop Code:
while (true) {
    var event = eventQueue.pop();
    if (event && event.handler) {
        event.handler.execute(); // execute the callback in Javascript thread
    } else {
        sleep(); //sleep some time to release the CPU do other stuff
    }
}
```

### Promise

    Promise 对象曾经以多种形式存在于很多语言中。这个词最先由C++工程师用在Xanadu 项目中，
    Xanadu 项目是Web 应用项目的先驱。随后Promise 被用在E编程语言中，这又激发了Python 开发人员的灵感，
    将它实现成了Twisted 框架的Deferred 对象。2007年，Promise 赶上了JavaScript 大潮，那时Dojo 框架刚从Twisted框架汲取灵感，新增了一个叫做dojo.Deferred 的对象。也就在那个时候，相对成熟的Dojo 框架与初出茅庐的jQuery 框架激烈地争夺着人气和名望。2009年，Kris Zyp 有感于dojo.Deferred 的影响力提出了CommonJS 之Promises/A 规范。同年，Node.js 首次亮相。

### setTimeout

延时处理当然少不了 setTimeout 这个神器，很多人对 setTimeout 函数的理解就是：延时为 n 的话，函数会在 n 毫秒之后执行。事实上并非如此，这里存在三个问题，一个是 setTimeout 函数的及时性问题，可以测试下面这串代码：

```js
var d = new Date, count = 0, f, timer;
timer = setInterval(f = function (){
    if(new Date - d > 1000){
        clearInterval(timer);console.log(count);
    }
    count++;
}, 0);
```

可以看出 1s 中运行的次数大概在 200次 左右，有人会说那是因为 new Date 和 函数作用域的转换消耗了时间，其实不然，你可以再试试这段代码：

```js
var d = new Date, count = 0;
while(true) {
    if(new Date - d > 1000) {
        console.log(count);
        break;
    }
    count++;
}
```

我这里显示的是 351813，也就是说 count 累加了 35W+ 次，这说明了什么呢？setInterval 和 setTimeout 函数运转的最短周期是 5ms 左右，这个数值在 HTML规范 中也是有提到的:

    5. Let timeout be the second method argument, or zero if the argument was omitted.
    如果 timeout 参数没有写，默认为 0
    7. If nesting level is greater than 5, and timeout is less than 4, then increase timeout to 4.
    如果嵌套的层次大于 5 ，并且 timeout 设置的数值小于 4 则直接取 4.

为了让函数可以更快速的相应，部分浏览器提供了更加高级的接口（当 timeout 为 0 的时候，可以使用下面的方式替代，速度更快）：

    requestAnimationFrame 它允许 JavaScript 以 60+帧/s 的速度处理动画，他的运行时间间隔比 setTimeout 是要短很多的。 @司徒正美，他适合动画，使用他可以在 tab 失去焦点或者最小化的时候减缓运动，从而节省 CPU 资源，他的运行间隔确实比 setTimeout 要长。
    process.nextTick 这个是 NodeJS 中的一个函数，利用他可以几乎达到上面看到的 while 循环的效率
    ajax 或者 插入节点 的 readyState 变化
    MutationObserver 大约 2-3ms
    setImmediate  
    postMessage 这个相当快

这些东西下次有空再细谈。之前研究司徒正美的 avalon 源码的时候，看到了相关的内容，有兴趣的可以看看：

```js
//视浏览器情况采用最快的异步回调
var BrowserMutationObserver = window.MutationObserver || window.WebKitMutationObserver
if (BrowserMutationObserver) { //chrome18+, safari6+, firefox14+,ie11+,opera15
    avalon.nextTick = function(callback) { //2-3ms
        var input = DOC.createElement("input")
        var observer = new BrowserMutationObserver(function(mutations) {
            mutations.forEach(function() {
                callback()
            })
        })
        observer.observe(input, {
            attributes: true
        })
        input.setAttribute("value", Math.random())
    }
} else if (window.VBArray) { 
//IE下这个通常只要1ms,而且没有副作用，不会发现请求，
//setImmediate如果只执行一次，与setTimeout一样要140ms上下
    avalon.nextTick = function(callback) {
        var node = DOC.createElement("script")
        node.onreadystatechange = function() {
            callback() //在interactive阶段就触发
            node.onreadystatechange = null
            root.removeChild(node)
            node = null
        }
        root.appendChild(node)
    }
} else {
    avalon.nextTick = function(callback) {
        setTimeout(callback, 0)
    }
}
```

上面说了一堆，目的是想说明， setTimeout 是存在一定时间间隔的，并不是设定 n 毫秒执行，他就是 n 毫秒执行，可能会有一点时间的延迟（2ms左右）。然后说说他的第二个缺点，先看代码：

```js
var d = new Date;
setTimeout(function(){
    console.log("show me after 1s, but you konw:" + (new Date - d));
}, 1000);
while(1) if(new Date - d > 2000) break;
```

我们期望 console 在 1s 之后出结果，可事实上他却是在 2075ms 之后运行的，这就是 JavaScript 单线程给我们带来的烦恼，while循环阻塞了 setTimeout 函数的执行。接着是他的第三个毛病，try..catch捕捉不到他的错误：

```js
try{
    setTimeout(function(){
        throw new Error("我不希望这个错误出现！")
    }, 1000);
} catch(e){
    console.log(e.message);
}
```

可以说 setTimeout 是异步编程不可缺少的角色，但是它本身就存在这么多的问题，这就要求我们用更加恰当的方式去规避！

### JavaScript 多线程

Worker 

SharedWorker

[技术分享](http://v.youku.com/v_show/id_XNjQ5NzgxODAw.html)

然后要说的是 SharedWorker，这是 web 通信领域未来的一个趋势，有些人觉得 WebSocket 已经十分不错了，但是一些基于 WebSocket 的架构，服务器要为每一个页面维护一个 WebSocket 代码，而 SharedWorker 十分给力，他是多页面通用的。
