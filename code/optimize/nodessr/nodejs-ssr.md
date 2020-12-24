# Node中间层实践

Node中间层允许前端来做网站路由、页面渲染、SEO优化

- 前后端分离

从职责上划分，node中间层实现了前后端分离:

前端：负责View和Controller层
后端：只负责Model层，业务处理/数据等

- 模板引擎

jade，pug作为服务器端模板引擎。

- 中间层与后端的异步通信

axios，vue2官方推荐的ajax库，内置的axios.all()，可以在中间层代理多个后端请求一并返回，轻松实现Bigpipe。

## 为什么选择node中间层

现有开发模式的适用场景:后端为主的MVC, Ajax为主SPA型开发模式

前后端职责不清:在业务逻辑复杂的系统里，维护没有约束，M-V-C每一层都可能出现别的层的代码,代码冗余、前后端耦合

对前端发挥的局限:由于后端框架限制，我们很难使用Comet、Bigpipe等技术方案来优化性能

开发效率问题: 电商网站Web基本上都是基于MVC框架webx，架构决定了前端只能依赖后端。

node  事件驱动， 非阻塞模型， 支持高并发, js编程， 不改变现有前端

## spa 

各层职责重叠

    Client-side Model 是 Server-side Model 的加工
    Client-side View 跟 Server-side是 不同层次的东西
    Client-side的Controller 跟 Sever-side的Controller 各搞各的
    Client-side的Route 但是 Server-side 可能没有

性能问题

    渲染，取值都在客户端进行，有性能的问题
    需要等待资源到齐才能进行，会有短暂白屏与闪动
    在移动设备低速网路的体验奇差无比

重用问题

    模版无法重用，造成维护上的麻烦与不一致
    逻辑无法重用，前端的校验后端仍须在做一次
    路由无法重用，前端的路由在后端未必存在

跨终端问题

    业务太靠前，导致不同端重复实现
    逻辑太靠前，造成维护上的不易

渲染都在客户端，SEO

## NodeJS作为中间层的全栈开发方案

![node](./20151214140614959.png)

    转发数据，串接服务
    路由设计，控制逻辑
    渲染页面，体验优化

node中间层可以承担更多的责任。

    代理：在开发环境下，我们可以利用代理来，解决最常见的跨域问题；在线上环境下，我们可以利用代理，转发请求到多个服务端。
    
    缓存：缓存其实是更靠近前端的需求，用户的动作触发数据的更新，node中间层可以直接处理一部分缓存需求。

    限流：node中间层，可以针对接口或者路由做响应的限流。

    日志：相比其他服务端语言，node中间层的日志记录，能更方便快捷的定位问题（是在浏览器端还是服务端）。
    
    监控：擅长高并发的请求处理，做监控也是合适的选项。

    鉴权：有一个中间层去鉴权，也是一种单一职责的实现。
    
    路由：前端更需要掌握页面路由的权限和逻辑。
    
    服务端渲染：node中间层的解决方案更灵活，比如SSR、模板直出、利用一些JS库做预渲染等等。

## Tech

- awilix实现依赖注入
- koa or express
- pm2 manage进程
- log4js

## framework

- vapper
[Vapperjs - 一个基于 Vue 的 SSR 框架](https://zhuanlan.zhihu.com/p/86246776)
- Quasar Framework
[github](https://github.com/quasarframework/quasar)
- nuxt.js
[github](https://github.com/nuxt/nuxt.js)
- egg-vue
[egg-vue](https://easyjs.cn/egg-vue/)

## resource

[淘宝](https://2014.jsconfchina.com/slides/herman-taobaoweb/index.html#/99)