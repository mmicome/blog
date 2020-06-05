https://juejin.im/post/5d5924a0e51d4561fc620a46

1.引入xss包并挂载到vue原型上

```js
import xss from 'xss';
Vue.prototype.xss = xss
```

2.在vue.config.js中覆写html指令

```js
chainWebpack: config => {
    config.module
        .rule("vue")
        .use("vue-loader")
        .loader("vue-loader")
        .tap(options => {
            options.compilerOptions.directives = {
                html(node, directiveMeta) {
                    (node.props || (node.props = [])).push({
                        name: "innerHTML",
                        value: `xss(_s(${directiveMeta.value}))`
                    });
                }
            };
            return options;
        });
}
```
