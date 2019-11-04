## 全量配置
```sh
npm install --save @babel/polyfill
```

```js
import "@babel/polyfill";

//webpack.config.js
module.exports = {
  entry: ["@babel/polyfill", "./app/js"],
};
```
## 按需加载
```sh
npm install --save @babel/polyfill
```

## ![参考文档](https://www.babeljs.cn/docs/babel-polyfill)

