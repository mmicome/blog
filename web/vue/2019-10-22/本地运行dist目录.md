## 1. 使用 express , 运行打包文件

- npm install -g express-generator

- express myapp

- 将vue打包生成的dist目录下的文件复制粘贴到myapp/public/目录

- npm i

- npm start

注： vue.config.js 内 assetsPublicPath 路径配置， '/' to './'

## 2. 安装 http-server 

    npm install http-server -g 全局
    dist/: ./http-server

## 3. 使用 nginx 本地部署运行， 和线上发布同理

## webpack-dev-server
 
详细参考: https://github.com/vuejs-templates/webpack  build/
