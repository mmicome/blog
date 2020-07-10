# babel

## **@babel/core**

> babel-core中的api

```js
 var babel = require('babel-core');

 // 字符串转码
 babel.transform('code();', options);
 // => { code, map, ast }

 // 文件转码（异步）
 babel.transformFile('filename.js', options, function(err, result) {
   result; // => { code, map, ast }
 });

 // 文件转码（同步）
 babel.transformFileSync('filename.js', options);
 // => { code, map, ast }

 // Babel AST转码
 babel.transformFromAst(ast, code, options);
 // => { code, map, ast }
```

> transform example

```js
/*
 * @param {string} code 要转译的代码字符串
 * @param {object} options 可选，配置项
 * @return {object} 
*/
babel.transform(code: string, options?: Object)

//返回一个对象(主要包括三个部分)：
{
    generated code, //生成码
    sources map, //源映射
    AST  //即abstract syntax tree，抽象语法树
}
```

## **babel-polyfill 和 babel-runtime 及 babel-plugin-transform-runtime**

    babel默认只转换新的javascript语法，而不转换新的API，比如 Iterator, Generator, Set, Maps, Proxy, Reflect,Symbol,Promise 等全局对象。以及一些在全局对象上的方法(比如 Object.assign)都不会转码。

babel-polyfill和babel-runtime就是为了解决新的API与这种全局对象或全局对象方法不足的问题

> 那么他们两者的区别是什么？

babel-polyfill 的原理是当运行环境中并没有实现的一些方法，babel-polyfill会做兼容。

babel-runtime 它是将es6编译成es5去执行。我们使用es6的语法来编写，最终会通过babel-runtime编译成es5.也就是说，不管浏览器是否支持ES6，只要是ES6的语法，它都会进行转码成ES5.所以就有很多冗余的代码。

babel-polyfill 它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。

babel-runtime: 它不会污染全局对象和内置对象的原型，比如说我们需要Promise，我们只需要import Promise from 'babel-runtime/core-js/promise'即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。

虽然 babel-runtime 可以解决 babel-polyfill中的避免污染全局对象，但是它自己也有缺点的，比如上，如果我现在有100个文件甚至更多的话，难道我们需要一个个文件加import Promise from 'babel-runtime/core-js/promise' 吗？那这样肯定是不行的，因此这个时候出来一个 叫 babel-plugin-transform-runtime，
它就可以帮助我们去避免手动引入 import的痛苦，并且它还做了公用方法的抽离。比如说我们有100个模块都使用promise，但是promise的polyfill仅仅存在1份。
这就是 babel-plugin-transform-runtime 插件的作用。

## **@babel/register**

`@babel/register` 是放在 `node` 里使用的。它的作用是替代 `node` 的 `require`命令，与 `node` 自身的 `require`不同，`@babel/register` 模块改写`require`命令，为它加上一个钩子。它可以加载 `es2015`、`jsx` 等类型文件。有了它，我们就可以在`require`引入的文件中也可以写`es6`、`jsx`，此后，每当使用`require`加载.`js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用`Babel`进行转码。

```js
//index.js
const name = 'shenfq';
module.exports = () => {
    const json = {name};
    return json;
};
//main.js
require('@babel/register');
var test = require('./index.js');  //test.js中的es6语法将被转译成es5

console.log(test.toString()); //通过toString方法，看看控制台输出的函数是否被转译

// function() {
//     var json = {name: name};
//     return name;
// }
```

**attention:** babel-register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

默认@babel/register 会忽略对node_modules目录下模块的转译，如果要开启可以进行如下配置。

```js
require("@babel/register")({
  ignore: false
});
```

## 参考文章链接

> 感谢各位大佬的文章，小弟无才，没有经历过什么风浪， `《史记》`谈不上，就打算提笔写本`《百家杂谈》`, 稍加修饰， 取百家之长， 仅此而已

- [babel到底该如何配置？](https://juejin.im/post/59ec657ef265da431b6c5b03)

## 配置browsers

`"browsers": ["last 2 versions", "safari >= 7"]`

[参考](https://github.com/browserslist/browserslist)