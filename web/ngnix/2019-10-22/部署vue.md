https://blog.csdn.net/jeikerxiao/article/details/80885875

https://juejin.im/post/5cf0800b6fb9a07ee85c0f89

# Vue项目nginx部署
项目开发完成，接下来是上线，关于vue项目的部署，我司前端是部署在nginx服务器上，关于nginx的相关文档，请自行查阅；本文只记录部署时碰到的一些问题。

> 打包
vue项目打包后，是生成一系列的静态文件，包括项目的请求IP都打入包内，如果后台服务改动，这时你的前端文件，又要重新编译打包，这里采用的是后台管理项目总结提到的前端自行请求一个配置文件，动态修改你的相关配置。

静态文件
```ja

// config.json
{
  "api": "test.com"
}
```

请求文件

在项目store中请求你的配置文件，写入state中，在调用的时候可以全局访问到你的配置

```js
// api.js
GetConfigApi() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/config.json?v=${new Date().getTime()}`)
      .then(result => {
        const configApi = {
          API: result.data['api'], // 统一接口
        };
        resolve(configApi);
      })
      .catch(error => {
        reject(error);
      });
  });
}
```

> nginx部署
因为vue-router有hash和history不同的两种模式，使用不同的模式，nginx的配置不同，hash模式下，不需要改动，只需要部署你的前端文件就可以了，所以这里只讨论history模式下.conf文件的修改

访问修改nginx配置文件nginx.conf

```text
server {
  listen  80;
  server_name  test.com;

  location / {
    root  /front; // 前端文件路径
    index  index.html; // hash模式只配置访问html就可以了
    try_files $uri $uri/ /index.html; // history模式下
  }
}
```

修改完成，重启服务访问test.com

> 部署到子级目录

当我们需要把项目部署到子级目录下时，则需要修改项目的BASE_URL，生成一个子级目录下的绝对访问路径。修改对应的.conf配置文件
```js
server {
  listen  80;
  server_name  test.com;

  location /demo { // 子级目录
    alias  /front/demo;
    index  index.html;
    try_files $uri $uri/ /demo/index.html; 
  }
}
```
修改完成，重启服务访问test.com/demo

> 缓存处理

前端项目的静态文件常常会被浏览器缓存，而项目编译后，js，css，图片等实际上是已经有hash值来去除了缓存，但是项目更新后，仍然会出现缓存问题，这是由于我们的项目整个入口都是在index.html文件上，浏览器实际是缓存了我们的html页面，所以我们要在nginx中告诉浏览器，html文件不被缓存。

```text
  location /demo {
    add_header Cache-Control 'private, no-store, max-age=0';
    ...
  }
```

> 总结:

这里只讨论了nginx相关的部署，实际上vue-router文档上是有相关的配置例子的。
