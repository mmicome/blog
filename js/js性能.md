# 前端性能优化

## 一、js 代码层面
### 1.注意作用域
 
随着作用域中的作用域数量的增加，访问当前作用域以外的变量的时间也在增加。所以，访问全局变量总是比访问局部变量要慢，因为需要遍历作用域链。只要能减少花费在作用域链上的时间，就能增加脚本的整体性能。
 
1). 避免全局查找（因为涉及作用域上的查找）

    function updateUI() {
        var imgs = document.getElementByTagName("img");
        for(var i = 0, len = imgs.length; i < len; i++) {
            imgs[i].title = document.title + " image " + i;
        }
    }

注意，updateUI中包含了二个对于全局变量document对象的引用，特别是循环中的document引用，查到次数是O(n)，每次都要进行作用域链查找。通过创建一个指向document的局部变量，就可以通过限制一次全局查找来改进这个函数的性能。

    function updateUI() {
        var doc = document;
        var imgs = doc.getElementByTagName("img");
        for(var i = 0, len = imgs.length; i < len; i++) {
            imgs[i].title = doc.title + " image " + i;
        }
    }

2). object 对象，其属性访问层级越深，效率越低，比如这里的“myObj”已经访问到了第 3 层，我们可以这样改进一下：

缩小对象访问层级

    var myObj = … .. 
    … .. 
     function process(){ 
     var doc = document; 
        var images = doc.getElementsByTagName("img"), 
     widget = doc.getElementsByTagName("input"), 
     combination = []; 
     for(var i = 0; i < images.length; i++){ 
     combination.push(combine(images[i], widget[2*i])); 
     } 
     var ctn = myObj.container;
     ctn.property1 = combination[0];
     ctn.property2 = combination[combination.length-1];
          }

### 2.优化循环
 
循环是编程中最常见的结构，优化循环是性能优化过程中很重要的一部分。一个循环的基本优化步骤如下：
 
减值迭代——大多数循环使用一个从0开始，增加到某个特定值的迭代器。在很多情况下，从最大值开始，在循环中不断减值的迭代器更加有效。
简化终止条件——由于每次循环过程都会计算终止条件，故必须保证它尽可能快，即避免属性查找或其它O(n)的操作。
简化循环体——循环体是执行最多的，故要确保其被最大限度地优化。确保没有某些可以被很容易移出循环的密集计算。
使用后测试循环——最常用的for和while循环都是前测试循环，而如do-while循环可以避免最初终止条件的计算，因些计算更快。

    for(var i = 0; i < values.length; i++) {
        process(values[i]);
    }

优化1：简化终止条件

    for(var i = 0, len = values.length; i < len; i++) {
        process(values[i]);
    }
    
### 3.展开循环
 
当循环的次数确定时，消除循环并使用多次函数调用往往更快
当循环的次数不确定时，可以使用Duff装置来优化。Duff装置的基本概念是通过计算迭代的次数是否为8的倍数将一个循环展开为一系列语句。如下：

     // Jeff Greenberg for JS implementation of Duff's Device
     // 假设：values.length > 0
     function process(v) {
         alert(v);
     }

     var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
     var iterations = Math.ceil(values.length / 8);
     var startAt = values.length % 8;
     var i = 0;

     do {
         switch(startAt) {
             case 0 : process(values[i++]);
             case 7 : process(values[i++]);
             case 6 : process(values[i++]);
             case 5 : process(values[i++]);
             case 4 : process(values[i++]);
             case 3 : process(values[i++]);
             case 2 : process(values[i++]);
             case 1 : process(values[i++]);
         }
         startAt = 0;
     }while(--iterations > 0);

如上展开循环可以提升大数据集的处理速度。接下来给出更快的Duff装置技术，将do-while循环分成2个单独的循环。（注：这种方法几乎比原始的Duff装置实现快上40%。）
 
    // Speed Up Your Site(New Riders, 2003)
    function process(v) {
        alert(v);
    }

    var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
    var iterations = Math.floor(values.length / 8);
    var leftover = values.length % 8;
    var i = 0;

    if(leftover > 0) {
        do {
            process(values[i++]);
        }while(--leftover > 0);
    }

    do {
        process(values[i++]);
        process(values[i++]);
        process(values[i++]);
        process(values[i++]);
        process(values[i++]);
        process(values[i++]);
        process(values[i++]);
        process(values[i++]);
    }while(--iterations > 0);

针对大数据集使用展开循环可以节省很多时间，但对于小数据集，额外的开销则可能得不偿失。
 
### 4.避免双重解释
 
当JS代码想解析JS代码时就会存在双重解释惩罚，当使用eval()函数或是Function构造函数以及使用setTimeout()传一个字符串时都会发生这种情况。如下
 
    eval("alert('hello world');"); // 避免
    var sayHi = new Function("alert('hello world');"); // 避免
    setTimeout("alert('hello world');", 100);// 避免

以上代码是包含在字符串中的，即在JS代码运行的同时必须新启运一个解析器来解析新的代码。实例化一个新的解析器有不容忽视的开销，故这种代码要比直接解析要慢。以下这几个例子，除了极少情况下eval是必须的，应尽量避免使用上述。对于Function构造函数，直接写成一般的函数即可。对于setTimeout可以传入函数作为第一个参数。如下：
 
    alert('hello world');
    var sayHi = function() {
        alert('hello world');
    };
    setTimeout(function() {
        alert('hello world');
    }, 100);

总之，若要提高代码性能，尽可能避免出现需要按照JS解释的代码。

主要原因是：JavaScript 代码在执行前会进行类似“预编译”的操作：首先会创建一个当前执行环境下的活动对象，并将那些用 var 申明的变量设置为活动对象的属性，但是此时这些变量的赋值都是 undefined，并将那些以 function 定义的函数也添加为活动对象的属性，而且它们的值正是函数的定义。但是，如果你使用了“eval”，则“eval”中的代码（实际上为字符串）无法预先识别其上下文，无法被提前解析和优化，即无法进行预编译的操作。所以，其性能也会大幅度降低。

### 5.性能的其它注意事项
 
原生方法更快——只要有可能，使用原生方法而不是自已用JS重写。原生方法是用诸如C/C++之类的编译型语言写出来的，要比JS的快多了。

switch语句较快——若有一系列复杂的if-else语句，可以转换成单个switch语句则可以得到更快的代码，还可以通过将case语句按照最可能的到最不可能的顺序进行组织，来进一步优化。

位运算较快——当进行数学运算时，位运算操作要比任何布尔运算或算数运算快。选择性地用位运算替换算数运算可以极大提升复杂计算的性能，诸如取模，逻辑与和逻辑或也可以考虑用位运算来替换。

### 6.最小化语句数
 
JS代码中的语句数量也会影响所执行的操作的速度，完成多个操作的单个语句要比完成单个操作的多个语句块快。故要找出可以组合在一起的语句，以减来整体的执行时间。这里列举几种模式
 
1.多个变量声明
 
    // 避免
    var i = 1;
    var j = "hello";
    var arr = [1,2,3];
    var now = new Date();

    // 提倡
    var i = 1,
        j = "hello",
        arr = [1,2,3],
        now = new Date();
        
2.插入迭代值
 
    // 避免
    var name = values[i];
    i++;

    // 提倡
    var name = values[i++];
    
3.使用数组和对象字面量，避免使用构造函数Array(),Object()
 
    // 避免 
    var a = new Array();
    a[0] = 1;
    a[1] = "hello";
    a[2] = 45;

    var o = new Obejct();
    o.name = "bill";
    o.age = 13;

    // 提倡
    var a = [1, "hello", 45];
    var o = {
        name : "bill",
        age : 13
    };
    
4.使用位操作，速度快。

    i%2   
    //可以改写成位运算 &1 ：
    if(i&1){ 
        //奇数
    }else{ 
        //偶数
    }
    //位掩码：后台常用的按位打标，
    var ops=op_a | op_b | op_c;  
    if(ops & op_a){ 
        //op_a存在
    }
5.数组使用时的优化

往数组中插入混合类型很容易降低数组使用的效率，尽量保持数组中元素的类型一致
如果使用稀疏数组，它的元素访问将远慢于满数组的元素访问。因为V8为了节省空间，会将稀疏数组通过字典方式保存在内存中，节约了空间，但增加了访问时间

### 7.提高正则表达式效率的方法

1.关注如何让匹配更快失败

2.正则表达式以简单，必需的字元开始：例如：起始标记是^，特定字符串，[a-z]或者d等，避免以分组或选择字元开头，避免/one|two/顶层分支。

3.减少分支数量，缩小分支范围：例如：将cat|bat 替换为：[cb]at ;将red|read 替换为：rea?d 将red|raw 替换为：r(?:ed|aw) 将（.|r|n）替换为：[sS]。

4.当分支必不可少时，将常用分支放到前面。

5.使用非捕获组，合理使用捕获：如果需要引用匹配的一部分，应用捕获，然后引用那部分

6.暴露必须的字元：用/^(ab|cd)/代替/(^ab|^cd)/

7.使用合适的量词：贪婪和惰性量词的匹配过程不一样，视情况选择使用。

8.将正则表达式赋值给变量（以避免对正则重新编译）并重用它们。

9.将复杂的正则拆分为简单的片段：如果太复杂，可以先用条件判断分割

    //去除字符串首尾空格的方法，推荐写法
    if(!String.prototype.trim){    //防止覆盖原生方法
            String.prototype.trim=function(){
                return this.replace(/^\s+/,'').replace(/\s+$/,'');
            }
       }

### 8.运算结果缓存

由于JavaScript中的函数也是对象（JavaScript中一切都是对象），所以我们可以给函数添加任意的属性。这也就为我们提供符合备忘录模式的缓存运算结果的功能，比如我们有一个需要大量运算才能得出结果的函数如下：

    function calculator(params) {
        //大量的耗时的计算 
        return result;
    }

如果其中不涉及随机，参数一样时所返回的结果一致，我们就可以将运算结果进行缓存从而避免重复的计算：

    function calculator(params) {
        var cacheKey = JSON.stringify(params);
        //这里cache 是对函数属性cache 的引用
        var cache = calculator.cache = calculator.cache || {};
        if(typeof cache[cacheKey] !== 'undefined') {
            return cache[cacheKey];
        }
        //大量耗时的计算
        cache[cacheKey] = result;
        return result;
    }
    
这里将参数转化为JSON字符串作为key，如果这个参数已经被计算过，那么就直接返回，否则进行计算。计算完毕后再添加入cache中，如果需要，可以直接查看cache的内容：calculator.cache

这是一种典型的空间换时间的方式，由于浏览器的页面存活时间一般不会很长，占用的内存会很快被释放（当然也有例外，比如一些WEB应用），所以可以通过这种空间换时间的方式来减少响应时间，提升用户体验。这种方式并不适用于如下场合：
1. 相同参数可能产生不同结果的情况（包含随机数之类的）
2. 运算结果占用特别多内存的情况

### 9.ajax结果缓存

1).函数缓存

我们可以使用前面缓存复杂计算函数结果的方式进行缓存，通过在函数对象上构造cache对象

2).本地缓存

    function(data, url, type, callback){
        var storage = window.sessionStorage;
        var key = JSON.stringify({
            url : url,
            type : type,
            data : data
        });
        var result = storage.getItem(key);
        var xhr;
        if (result) {
            callback.call(null, result);
        } else {
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        storage.setItem(key, xhr.responseText);
                        callback.call(null, xhr.responseText);
                    } else {
                    }
                }
            };
            xhr.open(type, url, async);
            xhr.send(data);
        }
    };

### 10。对象删除
1）.delete

一种方式是通过delete方式来消除对象中的键值对，从而消除引用。但这种方式并不提倡，它会改变对象的结构，可能导致引擎中对对象的存储方式变更，降级为字典方式进行存储（详细请见V8 之旅：对象表示），不利于JavaScript引擎的优化，所以尽量减少使用

2）null

另一种方式是通过将值设为null来消除引用。通过将变量或对象的属性设为null，可以消除引用，使原本引用的对象成为一个“孤岛”，然后在垃圾回收的时候对其进行回收。这种方式不会改变对象的结构，比使用delete要好

## 二、内容加载和执行
### 1.阻塞加载-合并脚本-减少HTTP请求

由于每个<script>标签初始下载时都会阻塞页面渲染，所以减少页面包含的<script>标签数量有助于改善这一情况。这不仅针对外链脚本，内嵌脚本的数量同样也要限制。浏览器在解析 HTML 页面的过程中每遇到一个<script>标签，都会因执行脚本而导致一定的延时，因此最小化延迟时间将会明显改善页面的总体性能。
 
这个问题在处理外链 JavaScript 文件时略有不同。考虑到 HTTP 请求会带来额外的性能开销，因此下载单个 100Kb 的文件将比下载 5 个 20Kb 的文件更快。也就是说，减少页面中外链脚本的数量将会改善性能。

通常一个大型网站或应用需要依赖数个 JavaScript 文件。您可以把多个文件合并成一个，这样只需要引用一个<script>标签，就可以减少性能消耗。文件合并的工作可通过离线的打包工具或者一些实时的在线服务来实现。
 
需要特别提醒的是，把一段内嵌脚本放在引用外链样式表的<link>之后会导致页面阻塞去等待样式表的下载。这样做是为了确保内嵌脚本在执行时能获得最精确的样式信息。因此，建议不要把内嵌脚本紧跟在<link>标签后面。

1>减少请求的方法

尽量避免重定向

### 2.无阻塞加载-延迟加载脚本

HTML 4 为<script>标签定义了一个扩展属性：defer。Defer 属性指明本元素所含的脚本不会修改 DOM，因此代码能安全地延迟执行。defer 属性只被 IE 4 和 Firefox 3.5 更高版本的浏览器所支持，所以它不是一个理想的跨浏览器解决方案。在其他浏览器中，defer 属性会被直接忽略，因此<script>标签会以默认的方式处理，也就是说会造成阻塞。
 
·<script type="text/javascript" src="script1.js" defer></script>·
 
 HTML 5 为<script>标签定义了一个新的扩展属性：async。它的作用和 defer 一样，能够异步地加载和执行脚本，不因为加载脚本而阻塞页面的加载。但是有一点需要注意，在有 async 的情况下，JavaScript 脚本一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的。如果 JavaScript 脚本前后有依赖性，使用 async 就很有可能出现错误。

defer和async属性：都是并行下载，下载过程不阻塞，区别在于执行时机，async是下载完成后立即执行；defer是等页面加载完成后再执行。defer仅当src属性声明时才生效（HTML5的规范）

### 3.无阻塞加载-动态脚本元素
 
 文档对象模型（DOM）允许您使用 JavaScript 动态创建 HTML 的几乎全部文档内容。<script>元素与页面其他元素一样，可以非常容易地通过标准 DOM 函数创建：

    var script = document.createElement ("script");
       script.type = "text/javascript";
       script.src = "script1.js";
       document.getElementsByTagName("head")[0].appendChild(script);
   
新的<script>元素加载 script1.js 源文件。此文件当元素添加到页面之后立刻开始下载。此技术的重点在于：无论在何处启动下载，文件的下载和运行都不会阻塞其他页面处理过程。您甚至可以将这些代码放在<head>部分而不会对其余部分的页面代码造成影响（除了用于下载文件的 HTTP 连接）。
 
当文件使用动态脚本节点下载时，返回的代码通常立即执行（除了 Firefox 和 Opera，他们将等待此前的所有动态脚本节点执行完毕）。当脚本是“自运行”类型时，这一机制运行正常，但是如果脚本只包含供页面其他脚本调用调用的接口，则会带来问题。这种情况下，您需要跟踪脚本下载完成并是否准备妥善。可以使用动态 <script> 节点发出事件得到相关信息。
 
Firefox、Opera, Chorme 和 Safari 3+会在<script>节点接收完成之后发出一个 onload 事件。您可以监听这一事件，以得到脚本准备好的通知：

    var script = document.createElement ("script")
    script.type = "text/javascript";

    //Firefox, Opera, Chrome, Safari 3+
    script.onload = function(){
        alert("Script loaded!");
    };

    script.src = "script1.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    
Internet Explorer 支持另一种实现方式，它发出一个 readystatechange 事件。<script>元素有一个 readyState 属性，它的值随着下载外部文件的过程而改变。readyState 有五种取值：
“uninitialized”：默认状态
“loading”：下载开始
“loaded”：下载完成
“interactive”：下载完成但尚不可用
“complete”：所有数据已经准备好
 
微软文档上说，在<script>元素的生命周期中，readyState 的这些取值不一定全部出现，但并没有指出哪些取值总会被用到。实践中，我们最感兴趣的是“loaded”和“complete”状态。Internet Explorer 对这两个 readyState 值所表示的最终状态并不一致，有时<script>元素会得到“loader”却从不出现“complete”，但另外一些情况下出现“complete”而用不到“loaded”。最安全的办法就是在 readystatechange 事件中检查这两种状态，并且当其中一种状态出现时，删除 readystatechange 事件句柄（保证事件不会被处理两次）：

    var script = document.createElement("script")
    script.type = "text/javascript";

    //Internet Explorer
    script.onreadystatechange = function(){
         if (script.readyState == "loaded" || script.readyState == "complete"){
               script.onreadystatechange = null;
               alert("Script loaded.");
         }
    };

    script.src = "script1.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    
大多数情况下，您希望调用一个函数就可以实现 JavaScript 文件的动态加载。下面的函数封装了标准实现和 IE 实现所需的功能：
清单 9 通过函数进行封装

    function loadScript(url, callback){
        var script = document.createElement ("script")
        script.type = "text/javascript";
        if (script.readyState){ //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function(){
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    
此函数接收两个参数：JavaScript 文件的 URL，和一个当 JavaScript 接收完成时触发的回调函数。属性检查用于决定监视哪种事件。最后一步，设置 src 属性，并将<script>元素添加至页面。此 loadScript() 函数使用方法如下：

    loadScript("script1.js", function(){
        alert("File is loaded!");
    });

您可以在页面中动态加载很多 JavaScript 文件，但要注意，浏览器不保证文件加载的顺序。所有主流浏览器之中，只有 Firefox 和 Opera 保证脚本按照您指定的顺序执行。其他浏览器将按照服务器返回它们的次序下载并运行不同的代码文件。您可以将下载操作串联在一起以保证他们的次序，如下：

    loadScript("script1.js", function(){
        loadScript("script2.js", function(){
            loadScript("script3.js", function(){
                alert("All files are loaded!");
            });
        });
    });
    
此代码等待 script1.js 可用之后才开始加载 script2.js，等 script2.js 可用之后才开始加载 script3.js。虽然此方法可行，但如果要下载和执行的文件很多，还是有些麻烦。如果多个文件的次序十分重要，更好的办法是将这些文件按照正确的次序连接成一个文件。独立文件可以一次性下载所有代码（由于这是异步进行的，使用一个大文件并没有什么损失）。

动态脚本加载是非阻塞 JavaScript 下载中最常用的模式，因为它可以跨浏览器，而且简单易用。
 
### 4.使用 XMLHttpRequest(XHR)对象下载 JavaScript 代码并注入页面中。

    var xhr = new XMLHttpRequest();
    xhr.open("get", "script1.js", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                var script = document.createElement ("script");
                script.type = "text/javascript";
                script.text = xhr.responseText;
                document.body.appendChild(script);
            }
        }
    };

这样做实际上会创建一个带有内联代码的<script>元素。一旦新<script>元素被添加到文档，代码将被执行，并准备使用。
 
这种方法的主要优点是，您可以下载不立即执行的 JavaScript 代码。由于代码返回在<script>标签之外（换句话说不受<script>标签约束），它下载后不会自动执行，这使得您可以推迟执行，直到一切都准备好了。另一个优点是，同样的代码在所有现代浏览器中都不会引发异常。
 
此方法最主要的限制是：JavaScript 文件必须与页面放置在同一个域内，不能从 CDN 下载（CDN 指"内容投递网络（Content Delivery Network）"，所以大型网页通常不采用 XHR 脚本注入技术。xhr.send(null);

ajax缩短页面的加载时间，页面主要内容加载完成后，再用ajax获取那些次要的文件。（首页优化）

### 5.通过正确设置响应头来缓存JavaScript文件。

### 6.使用web worker

### 7.使用CDN

1)当用户点击网站页面上的内容url，经过本地DNS解析，DNS系统会最终将域名解析权交给CNAME（DNS的一种解析方式，即别名解析，比如一个域名www.domain.com，设置一个CNAME指向它，由www.domain.com与一个IP进行绑定，如果设置多个CNAME指向它，以后修改CNAME指向的服务器时，只需要修改一个www.domain.com对应的IP即可）指向的CDN专用DNS服务器

2)CDN的DNS服务器将CDN的全局负载均衡设备的IP地址返回给用户

3)用户向CDN的全局负载均衡设备发起内容url访问请求

4)CDN全局负载均衡设备根据用户IP地址，以及用户请求的内容url，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求

5)区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务

选择的依据：根据用户IP地址，判读那一台服务器据用户最近；根据用户所请求的url中携带的内容名称，判断那一台服务器上有用户所需的内容；查询各个服务器当前的负载情况，判断那一台服务器尚有服务能力。

基于以上这些条件的综合分析之后，区域负载均衡会向全局负载均衡设备返回一台缓存服务器的IP地址

6)全局负载均衡设备把服务器的IP地址返回给用户

7)用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传达到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给用户，那这台服务器就要向它上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉倒本地。

缺点：只能对静态资源加速；它是缓存文件，如果网站更新了内容部分电脑可能不会实时的更新过来，他需要将CDN那台计算机的内容也更新了，客户的显示器上内容才是最新的，这个时间可能需要几小时甚至半天，所以CDN加速不适合经常更新的网站

### 8.使用Application Cache缓存（标准草案准备废弃中）

[Application Cache](https://segmentfault.com/a/1190000000490331)

### 9.service worker

### 10.图片懒加载

加载页面的时候，图片一直都是流量大头，针对图片的性能方法也挺多的比如base64、雪碧图等；懒加载也是其中一种，主要原理是将非首屏的图片src设为一个默认值，然后监听窗口滚动，当图片出现在视窗中时再给他赋予真实的图片地址，这样可以保证首屏的加载速度然后按需加载图片。

首先在渲染时，图片引用默认图片，然后把真实地址放在`data-*`属性上面。
`<image src='./../assets/default.png' :data-src='item.allPics' class='lazyloadimg'>`
 然后是监听滚动，直接用`window.onscroll`就可以了，但是要注意一点的是类似于window的scroll和resize，还有mousemove这类触发很频繁的事件，最好用节流(throttle)或防抖函数(debounce)来控制一下触发频率。underscore和lodash里面都有封装这两个方法

接着要判断图片是否出现在了视窗里面，主要是三个高度：1，当前body从顶部滚动了多少距离。2，视窗的高度。3，当前图片距离顶部的距离。

    window.onscroll =_.throttle(this.watchscroll, 200);
    watchscroll () {
      var bodyScrollHeight =  document.body.scrollTop;// body滚动高度
      var windowHeight = window.innerHeight;// 视窗高度
      var imgs = document.getElementsByClassName('lazyloadimg');
      for (var i =0; i < imgs.length; i++) {
        var imgHeight = imgs[i].offsetTop;// 图片距离顶部高度  
        if (imgHeight  < windowHeight  + bodyScrollHeight) {
           imgs[i].src = imgs[i].getAttribute('data-src');
           img[i].className = img[i].className.replace('lazyloadimg','')
        }
      }
    }
    
### 11.避免重定向

URl写成重定位，当点击整个url时，先发送一个post请求给服务器，服务器处理完后发送一个302响应给浏览器，浏览器再根据响应的url发送get请求

## 三、DOM编程

1.在内存中操作元素

由于DOM操作会导致浏览器的回流，回流需要花费大量的时间进行样式计算和节点重绘与渲染，所以应当尽量减少回流次数。一种可靠的方法就是加入元素时不要修改页面上已经存在的元素，而是在内存中的节点进行大量的操作，最后再一并将修改运用到页面上。:document.createDocumentFragment()，我们可以将其运用于上述代码中：

    var ulNode = document.getElementById("container");
    var liNode, i, m;
    var fragment = document.createDocumentFragment();
    for (i = 0, m = data.length; i < m; i++) {
        liNode = document.createElement("li");
        liNode.innerText = data[i];
        fragment.appendChild(liNode);
    }
    ulNode.appendChild(fragment);

这样就只会触发一次回流，效率会得到很大的提升。如果需要对一个元素进行复杂的操作（删减、添加子节点），那么我们应当先将元素从页面中移除，然后再对其进行操作，或者将其复制一个（cloneNode()），在内存中进行操作后再替换原来的节点

2.动画中使用绝对定位，使用拖放代理。

3.使用事件委托（代理）来减少事件处理器的数量。

原理 事件冒泡：从目标元素出发，向外层元素冒泡，最后到达顶层（window或document），依次执行绑定再其上的事件

ul添加li，如果我们需要给每个li都绑定一个click事件，就可能写出类似如下代码：

    var ulNode = document.getElementById("container");
    var fragment = document.createDocumentFragment();
    var liNode, i, m;
    var liFnCb = function(evt){
        //do something
    };
    for (i = 0, m = data.length; i < m; i++) {
        liNode = document.createElement("li");
        liNode.innerText = data[i];
        liNode.addEventListener("click", liFnCb, false);
        fragment.appendChild(liNode);
    }
    ulNode.appendChild(fragment);
    
这里每个li元素都需要执行一次addEventListener()方法，如果li元素数量一多，就会降低效率。所以我们可以通过事件代理的方式，将事件绑定在ul上，然后通过event.target来确定被点击的元素是否是li元素，同时我们也可以使用innerHTML属性一次性创建节点了，修改代码为：

    var ulNode = document.getElementById("container");
    var fragmentHtml = "", i, m;
    var liFnCb = function(evt){
        //do something
    };
    for (i = 0, m = data.length; i < m; i++) {
        fragmentHtml += "<li>" + data[i] + "</li>";
    }
    ulNode.innerHTML = fragmentHtml;
    ulNode.addEventListener("click", function(evt){
        if(evt.target.tagName.toLowerCase() === 'li') {
            liFnCb.call(evt.target, evt);
        }
    }, false);

把事件绑在了ul上，没有给每个 li 都去绑定事件，看上去也是实现效果了，但是如果 li 里面还有子元素，那么这么去绑定事件就不行了，当点击 li 里面的子元素时，就出现问题了。 

    //点击span 不走if判断
    <ul id=ul>
        <!-- 增加子元素 -->
        <li id='li1'><span>1</span></li>
        <li id='li2'><span>2</span></li>
    </ul>

    <script>
       ul.onclick = function (e){
          console.log('span 被点击了');
          if(e.target.nodeName == 'LI'){
            console.log('li 被点击了');
          }
       }
    </script>
   
需要 `Element.matches( )` 这个方法 作用： 判断当前DOM节点是否能完全匹配对应的css选择器规则；如果匹配成功，返回true，否则返回false。

    <script>
       ul.onclick = function (e){
          //获取事件源
          var target = e.target;

          //如果 事件源 不是 li 就进入循环
          while(!target.matches('li')){
            //如果事件源 是 ul 就把事件源 赋值为null，跳出循环
            //如果事件源 不是 ul 就把事件源 赋值为事件源的父元素
            if(target === ul){
              target = null;
              break;
            }
            target = target.parentNode;
         }
         // 如果 target为 true
         //也就是说 事件源是 li，就执行if语句里的代码
         if(target){
            console.log('li 被点击了');
         }
       }
    </script>
    
事件委托 的好处

    1、减少了事件监听器，原来需要在多个子元素绑定相同的事件处理函数，现在只需要在祖先元素（一般为父元素）上统一定义一次即可。

    2、减少内存消耗，提高了页面性能，这主要还是减少了事件处理函数的数量

    3、动态绑定事件，比如我们需要增加一个元素，那么我们还需要重新给这个元素绑定事件，但是用事件委托就没关系了，因为事件 不是 绑定在目标元素上的，而是绑定在父元素上，冒泡到父元素上时，执行绑定在父元素上的事件处理函数，这样能减少很多不必要的工作。

事件委托 的局限

    focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；
    mousemove、mouseout 这样的事件，虽然有事件冒泡，但是每次都要计算它的位置，对性能消耗高，而且很麻烦，因此也是不适合用事件委托。

jQuery中的事件委托 

    jQuery中事件委托主要是靠on( ) 方法`jQueryObject.on( events [, selector ] [, data ], handler )` || 
                                    `jQueryObject.on( eventsMap [, selector ] [, data ] )`
4.原生选择器API：querySelectorAll()和querySelector() ，IE8及以上支持 querySelectorAll()返回的是个nodelist（也是类数组），不是HTML集合（与getElenmentsByTagName等不同）。

5.减少重绘和重排：
cssText和class

    cssText可以一次设置多个CSS属性。class也可以一次性设置，并且更清晰，更易于维护，但有前提条件，就是不依赖于运行逻辑和计算的情况。

    // cssText
    ele.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px;';
    // class
    ele.className = 'active';


批量修改DOM

    2.1 隐藏元素display:none，应用修改，重新显示display:block。

    2.2 使用文档片段fragment，在片段上操作节点，再拷贝回文档。

    2.3 将原始元素拷贝到一个脱离文档的节点中（例如position:absolute），修改副本，完成后再替换原始元素。

6.减少访问DOM的次数，把运算尽量留在ECMAScript这一端处理。

7.innerHTML在绝大多数浏览器中比原生DOM方法要快（最新版的chrome除外），推荐使用。

8.合并多次对DOM和样式的修改：通过类修改样式

有时候我们需要通过JavaScript给元素增加样式，比如如下代码：

    element.style.fontWeight = 'bold';
    element.style.backgroundImage = 'url(back.gif)';
    element.style.backgroundColor = 'white';
    element.style.color = 'white';
    //...

这样效率很低，每次修改style属性后都会触发元素的重绘，如果修改了的属性涉及大小和位置，将会导致回流。所以我们应当尽量避免多次为一个元素设置style属性，应当通过给其添加新的CSS类，来修改其CSS

    .element {
        background-image: url(back.gif);
        background-color: #fff;
        color: #fff;
        font-weight: 'bold';
        /*...*/
    }
    element.className += " element";
