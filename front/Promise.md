promise出现的目的一为处理JavaScript里的异步，再就是避免回调地狱。

## 如何让同步函数同步执行，异步函数异步执行，并且让他们具有统一的api呢？

(1) 使用async函数

await 操作符用于等待一个 Promise 对象, 它只能在异步函数 async function 内部使用.
```js
componentDidMount() {
        const funSync1 = () => console.log('我是同步函数1111111')
        const funSync2 = () => console.log('我是同步函数2222222')

        const funAsync = async () => {     // async关键字，定义的函数是异步函数，返回promise对象
            await funSync1()
        }
        funAsync().then(funSync2())
        console.log('bbbb')
}

// 先把两个同步函数变成了异步，在异步函数中，先执行funSync1，后执行funSync2
// 使用async关键字后，会把同步包装成的异步函数，按同步方式执行
// 所以最后得到的输出顺序是：


// 我是同步函数1111111
// 我是同步函数2222222
// bbbb
```

(2) 使用 new Promise()

```js
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');

// now
// next
```

(3) Promise.try() 提案

```js
const f = () => console.log('now');
Promise.try(f);
console.log('next');

// now
// next
```

## 参考：

[Promise 真的懂了吗？](https://www.jianshu.com/p/4a937870511d)
