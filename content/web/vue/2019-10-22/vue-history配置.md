# 重要来源： https://www.jianshu.com/p/b08908e6a0cf

> 用vue-cli开发的项目在开发完打包之后想在本地预览要怎么做呢？这里要根据你的路由模式来分两种情况 1. history 模式 2. hash 模式(默认情况下)
我们先来说问题场景和解决方法。

## 如何预览：

- 方法1 ： 项目根目录dist 文件夹下的 index.html 文件直接用浏览器打开。
- 方法2 ： 在本地搭建一个服务器，然后运行该打包后的静态资源。

### 方法1 预览时，如果可能会遇到打开页面为空白的情况。

**如何解决：**

#### 情况 1： 路由模式 mode: hash
其实这跟配置资源的路径有关，打开项目根目录config文件夹下的index.js，定位到build下的assetsPublicPath（dev下也有一个assetsPublicPath，别搞错了），把assetsPublicPath: '/' 修改为相对路径 assetsPublicPath: './'
修改完之后重新打包，然后用方法1来预览

#### 情况 2： 路由模式 mode: history
只能用方法2来预览。

方法2 用node 或 express 打开一个本地服务器端口来预览打包后的静态文件。

当用方法2来预览时 assetsPublicPath 为相对路径或绝对路径都没影响。

因为vue项目为脚手架搭建的已经有 node 和 express 依赖，无需重新安装。我们可以直接在根目录下新建一个 js 文件， 因为是开启服务器的配置，一般会习惯性的命名为server.js，配置如下：

```js
const express = require("express")
const app = express()

const port = 8081

app.use(express.static('./dist'))

app.listen(port, () => {
  console.log('Listening at http://localhost:' + port)
})
```

根目录下用node命令开启一个 8081 的端口来监听该运行：node server.js

### 方法2 预览遇到问题：

如果 路由模式 hash 就万事大吉了，但为 history 时你会发现
此时只要首页能访问,通过首页点进去其他路由也是可以的,但是如果在其他路由刷新就有错误了，必须回到首页重新刷新才能正常访问。

**如何解决：**

上面的server.js 配置需加多加 connect-history-api-fallback 该中间件的作用是当页面访问出现错误时重定向到 index.html 页面，既重新访问index.html。配置如下：

```js
const express = require("express")
const app = express()

const port = 8081

let history = require('connect-history-api-fallback')

//重定向到index.html
history({
  rewrites: [{
      from: /^\/libs\/.*$/,
      to: '/index.html'
    }]
});

app.use(history());

app.use(express.static('./dist'))

app.listen(port, () => {
  console.log('Listening at http://localhost:' + port)
})
```
修改完配置后，重新启动服务器(重新执行node server.js) 命令，然后在浏览器访问，就不会出现上面访问错误的情况了。
此时如果你的路由有设置通配符到404页面的话，如下

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```
当url输入的为错误地址时，就会跳转到 NotFoundComponent 页面，然后输入正确的地址又可以访问。

我们执行的vue 命令 都是 npm run xx 的，那么启动我们的本地预览服务器能不能用这种类型的命令呢？当然是可以的。
先来看看根目录下的 package.json文件 的 scripts 键

```js
 "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js"
}
```
1.在 scripts 下新增 "server": "node build/server.js"
2.把刚才创建在根目录下的 server.js 文件 移动到 build 文件夹下。
3.根目录下运行 npm run server

## history 和 hash 模式有什么区别呢？

history 模式是h5 api 的 history.pushState ,相对于浏览器模拟了一条历史，而真正的服务器上没有这个路径资源，为什么 hash 模式不纯在这个问题？
hash 模式是带# 符号，服务器就不会解析，相对于还是返回html而已， index.html会根据vue路由去解析，而 history 模式则会请求服务器上的此地址，当服务器上没有相关路径就会报错。

对于浏览器的这种机制 vue-router 官方也给出了多种解决方案。
上面方法2使用中间件 connect-history-api-fallback 的方案实质上当找不到路由时重定向回项目首页，既
在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

但是这么做之后所有服务器就不会再返回404错误页面，因为对于所有路径都会返回index.html 文件。为了避免这种情况，我们应该在项目路由中匹配一个访问路由错误时该跳转的路由来给用户提示以优化用户体验。


## history 模式下项目放在服务器子目录下访问为空白页面问题。

经过上面的方法2 基本上是没什么问题了（上面server.js配置中项目是部署在服务器根目录下的），但是在实际开发中，项目可能是部署在子目录下的。
此时若开启了 history 模式，在dev开发阶段是没问题的，但是打包之后部署在服务器根目录下，访问路径为：
xxx.com 此时访问正常。

但如果是部署在服务器子路下呢？例如放在子目录 public下，访问路径为： xxx.com/public/

会发现页面又为空白了，内心是崩溃的。静态文件都能正常引用，但是因为router无法找到路径中的组件，自然就无法渲染了。那么我们可以在项目的每个路由都加上/public 前缀，如果项目中有50个路由也这样给每个路由加吗？

router 对象有个 base 属性，设置为子目录路径即可。

```js
const router = new VueRouter({
  base: '/public/',
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```

引来一篇博客的解说：

> 浏览器url的前缀，默认为 '/'，如果设置为 '/some/',则运行项目，浏览器url都是
'/some/...' 不会对静态文件的引用产生影响。
一般写网站都会有域名，都可以把域名指向某个服务器目录，所以默认 '/' 即可。
如果是写公司内部后台管理，那么不一定会用域名，可能就是某个ip下的某个目录，比如打包后的文件在 111.22.33.44/admin，这个时候路由的配置匹配浏览器路径的时候，会从这个 /admin 开始算，如果 base 还是默认的 /，那么路由配置的 routes 的 path 就要全部加上 /admin/ 前缀，并且router-link 和 push方法也要加上这个 /admin，很麻烦,但是只要设置 base 为 /admin/ ,路由内部配置以及所有相关的方法都可以忽视服务器ip下的目录名。这种情况，同样也要配置 webpack 的 publicPath也为/admin/` 。
