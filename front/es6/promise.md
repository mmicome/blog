## 在旧式回调 API 中创建 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

可以通过 Promise 的构造器从零开始创建 Promise。 这种方式（通过构造器的方式）应当只在包裹旧 API 的时候用到。

理想状态下，所有的异步函数都已经返回 Promise 了。但有一些 API 仍然使用旧方式来传入的成功（或者失败）的回调。典型的例子就是 setTimeout() 函数：

`setTimeout(() => saySomething("10 seconds passed"), 10000);`

混用旧式回调和 Promise 可能会造成运行时序问题。如果 saySomething 函数失败了，或者包含了编程错误，那就没有办法捕获它了。
我们可以用 Promise 来包裹它。最好的做法是，将这些有问题的函数包装起来，留在底层，并且永远不要再直接调用它们：

`const wait = ms => new Promise(resolve => setTimeout(resolve, ms));`

`wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);`

通常，Promise 的构造器接收一个执行函数(executor)，我们可以在这个执行函数里手动地 resolve 和 reject 一个 Promise。既然 
setTimeout 并不会真的执行失败，那么我们可以在这种情况下忽略 reject。

## 垫片实现

```js
//定义状态
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

//判断是否函数
const isFunction = variable => typeof variable === 'function'

class _Promise {
  constructor(handle) {
    if(!isFunction(handle)) {
      throw new Error('only accept a function as params')
    }
    this._status = PENDING;
    this._value = undefined;
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch(err) {
      this._reject(err)
    }
  }
    // 添加resovle时执行的函数
  _resolve (val) {
    if (this._status !== PENDING) return
    this._status = FULFILLED
    this._value = val
  }
  // 添加reject时执行的函数
  _reject (err) { 
    if (this._status !== PENDING) return
    this._status = REJECTED
    this._value = err
  },
  // 添加then方法
  then (onFulfilled, onRejected) {
    const { _value, _status } = this
    switch (_status) {
      // 当状态为pending时，将then方法回调函数加入执行队列等待执行
      case PENDING:
        this._fulfilledQueues.push(onFulfilled)
        this._rejectedQueues.push(onRejected)
        break
      // 当状态已经改变时，立即执行对应的回调函数
      case FULFILLED:
        onFulfilled(_value)
        break
      case REJECTED:
        onRejected(_value)
        break
    }
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {})
  }
}
```
