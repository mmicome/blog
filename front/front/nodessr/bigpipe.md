# Bigpipe

        是一种不局限于语言的前后端整合技术方案
        由Facebook首创
        适合比较大型的，需要大量服务器运算的站点
        有效减少HTTP请求
        兼容多浏览器

BigPipe的主要思想是实现浏览器和服务器的并发执行，实现页面的异步加载，从而提高页面的访问速度。 为了达到这个目的，它首先根据页面的功能或者位置，将页面分成若干个模块，这些模块的名字也被称为PageLet，并对这些分解的模块进行唯一的标识。然后通过Web服务器和浏览器之间建立管道，进行分段输出 （减少请求数）

## BigPipe适用的场合(SNS类网站 社会性网络服务)

首先,网页第一个请求时间较长( >500ms? ),在整个网页展现过程中不再是前端性能优化常说的可以忽略的10-20%.其次页面上的动态内容可以划分在多个区块内显示,且各个区块之间的关系不大,因为只是客户端和服务端并发是不够的,服务端各个数据中心也要能够并发才能最好的发挥bigpipe,各个区块的动态数据在服务端也能够通过url或cookie中的key并发获得(在facebook,整个key为userid).

## 主要用来解决http请求的两大问题

1.HTTP协议的底层是TCP/IP，而TCP/IP规定三次握手才建立一次连接。每一个新增的请求都要重新建立TCP/IP连接，从而消耗服务器的资源

2.现有的阻塞模型中，服务器生成页面需要时间（page generation），网络传输需要时间（network latency），页面在浏览器中渲染需要时间（page rendering），三者是阻塞式的，整个页面作为一个大块，需要完整地经历三个阶段，才能出现在浏览器中

Bigpipe允许客户端跟服务器建立一条管道，内容可以源源不断地输送过来。首先输送的是html+css，接下来会传输很多js对象，然后有专门的js代码来把对象所代表的内容渲染到页面上。

## BigPipe，一个用户请求的生命周期

在浏览器发送一个HTTP请求到Web服务器。在收到的HTTP请求，并在上面进行一些全面的检查，网站服务器立即发回一个未关闭的HTML文件，其中包括一个HTML 标签和标签的开始标签。标签包括BigPipe的JavaScript库来解析Pagelet以后收到的答复。在标签，有一个模板，它指定了页面的逻辑结构和Pagelets占位符。

在客户端在收到Pagelet通过“onPageletArrive”发出的指令，BigPipe的JavaScript库将首先下载它的CSS资源；在CSS资源被下载完成后，BigPipe将在Pagelet的标记HTML显示它的innerHTML。多个Pagelets的CSS可在同一时间下载，它们可以根据其各自CSS的下载完成情况来确认显示顺序。在BigPipe中，JavaScript资源的优先级低于CSS和页面内容。因此，BigPipe不会在所有Pagelets显示出来之前下载任何Pagelet中的JavaScript。然后，所有Pagelets的JavaScript异步下载。最后Pagelet的JavaScript初始化代码根据其各自的下载完成情况来确定执行顺序。

这种高度并行系统的最终结果是，多个Pageletsr的不同执行阶段同时进行。例如，浏览器可以正在下载三个Pagelets CSS的资源，同时已经显示另一Pagelet内容，与此同时，服务器也在生成新的Pagelet。从用户的角度来看，页面是逐步呈现的。最开始的网页内容会更快的显示，这大大减少了用户的对页面延时的感知。

**attention**
Bigpipe技术的应用是与具体服务器无关的，它是一种基于HTTP 1.1的架构性优化。HTTP 1.1引入分块传输编码，HTTP分块传输编码允许服务器为动态生成的内容维持HTTP持久链接。如果一个HTTP消息（请求消息或应答消息）的Transfer-Encoding消息头的值为chunked，那么，消息体由数量不确定的块组成——也就是说想发送多少块就发送多少块——并以最后一个大小为0的块为结束。

## BigPipe 比AJAX 有三个好处：

1. AJAX 的核心是XMLHttpRequest，客户端需要异步的向服务器端发送请求，然后将传送过来的内容动态添加到网页上。如此实现存在一些缺陷，即发送往返请求需要耗费时间，而BigPipe 技术使浏览器并不需要发送XMLHttpRequest 请求，这样就节省时间损耗。

2. 使用AJAX时，浏览器和服务器的工作顺序执行。服务器必须等待浏览器的请求，这样就会造成服务器的空闲。浏览器工作时，服务器在等待，而服务器工作时，浏览器在等待，这也是一种性能的浪费。使用BigPipe，浏览器和服务器可以并行同时工作，服务器不需要等待浏览器的请求，而是一直处于加载页面内容的工作阶段，这就会使效率得到更大的提高。

3. 减少浏览器发送到请求。对一个5亿用户的网站来说，减少了使用AJAX额外带来的请求，会减少服务器的负载，同样会带来很大的性能提升。

## SEO

- set sitemap
- if user agent , spider reboot to other router to static page

## other

你要讨好搜索引擎还是讨好用户？想清楚这个问题再考虑要不要采用 BigPipe。如果你想同时兼顾，服务器端维护代价大是不可避免的。

脚本阻滞:

## about refer

[Bigpipe的速度提升](https://yuguo.us/weblog/bigpipe-in-nodejs/)
[BigPipe学习研究](https://blog.csdn.net/yongxiaokang1/article/details/49794479)
[Facebook让网站速度提升一倍的BigPipe技术分析](http://caibaojian.com/bigpipe.html)
[java ver](https://www.cnblogs.com/jaylon/p/4924703.html)