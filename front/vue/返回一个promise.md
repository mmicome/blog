## 自定义返回promise

```js
this.$store.dispatch('xxxApi', datas).then(res => {
    if(res.isShow){ //业务上判断正确
        return new Promise(function(resolve, reject){
            resolve(res) //第三方调用，then里面可以获取到 res 信息，对不？
        })
    }else{
        return Promise.reject(err) //返回自定义（业务）错误信息
    }
}).catch(err +> {
    return Promise.reject(err) //返回未知错误信息
})
```

```js
new Promise((resolve, reject) => {
    if(success) {
        //busness
        resolve()   
    } else {
        //busness
        reject()
    }
}).then(() => {
    //同步代码
)
```

```js
// 当存在两个同步处理：
// a处理 不可控， 需要先触发
// b处理  可控， 需要后触发
a()//不可控，通常在数据驱动的代码中 a由于数据改变自动触发
setTimeout(() => {
    //b()
}, 0)

//实例（解决el-table 内建loadding 组件，根据数据变动，自动变更状态，无需再业务代码里写功能代码， 解耦功能）
this.x = 123
this.$nextTick(() => {
    //a（）使用nexttick 会在x变更后dom更新时自动触发
    settimeout(() => {
        this.b = 'b改变，b对应的dom会在a 的dom渲染完成后再触发'  //设立设置为0, 将任务放在队列循环最前端
    }， 0)
})
```
