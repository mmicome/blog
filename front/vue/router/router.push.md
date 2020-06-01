## vue-router 2.0 常用基础知识点之router.push()

除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。

- 声明式：<router-link :to="...">
- 编程式：router.push(...)

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。

```js
// 字符串
router.push('home')

// 对象
this.$router.push({path: '/login?url=' + this.$route.path});

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成/backend/order?selected=2
this.$router.push({path: '/backend/order', query: {selected: "2"}});

// 设置查询参数
this.$http.post('v1/user/select-stage', {stage: stage})
      .then(({data: {code, content}}) => {
            if (code === 0) {
                // 对象
                this.$router.push({path: '/home'});
            }else if(code === 10){
                // 带查询参数，变成/login?stage=stage
                this.$router.push({path: '/login', query:{stage: stage}});
           }
});

// 设计查询参数对象
let queryData = {};
if (this.$route.query.stage) {
    queryData.stage = this.$route.query.stage;
}
if (this.$route.query.url) {
    queryData.url = this.$route.query.url;
}
this.$router.push({path: '/my/profile', query: queryData});
```

> replace

类型: boolean
默认值: false
设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。即使点击返回按钮也不会回到这个页面。
```js
//加上replace: true后，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
this.$router.push({path: '/home', replace: true})
//如果是声明式就是像下面这样写：
<router-link :to="..." replace></router-link>
// 编程式:
router.replace(...)
```
> 综合案例

```js
this.$router.push({path: '/coach/' + this.$route.params.id, query: queryData});
```
