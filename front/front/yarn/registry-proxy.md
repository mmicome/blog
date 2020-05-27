## yarn 代理

vi ~/.yarnrc

```sh
## add these lines to .yarnrc
env:
    proxy 'http://localhost:8118'
    https_proxy 'https://localhost:8118'
    http_proxy 'http://localhost:8118'
    strict-ssl false
```

## yarn设置镜像

- 设置为淘宝镜像

    yarn config set registry https://registry.npm.taobao.org

- 设置为官方镜像

    yarn config set registry https://registry.yarnpkg.com
    yarn config list

## npm 代理

vi ~/.npmrc

```sh
## add these lines to .npmrc
## privoxy and shadowsocks [如何配置 privoxy 详见另一篇博文](https://blog.csdn.net/yuisyu/article/details/81587980)
proxy=http://localhost:8118
https_proxy=https://localhost:8118
strict-ssl=false
```

## npm 镜像

//淘宝镜像
npm config set registry https://registry.npm.taobao.org
//官方镜像
npm config set registry https://registry.npmjs.org/

