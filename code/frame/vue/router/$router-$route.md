## $router

router为VueRouter实例，相当于一个全局的路由器对象，里面含有很多属性和子对象，例如history对象, 主要是实现路由跳转使用。想要导航到不同URL，则使用router.push方法，push方法其实和<router-link :to="...">是等同的。

```js
// 字符串
this.router.push('home') // 对象 this.router.push({ path: 'home' })
// 命名的路由
this.router.push({ name: 'user', params: { userId: 123 }}) // 带查询参数，变成 /detail?did=123 this.router.push({ path: 'detail', query: { did: '123' }})
```

## route 

route object ，路由信息对象，表示当前激活的路由的状态信息，包含了完整路径、当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）
route object 是 immutable（不可变） 的，每次成功的导航后都会产生一个新的对象$route

路由信息对象：即router会被注入每个组件中，可以利用它进行一些信息的获取

    1.route.path

    字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。

    2.route.params** 

    一个 key/value 对象，包含了 动态片段 和 全匹配片段， 如果没有路由参数，就是一个空对象。 

    3.route.query

    一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 route.query.user == 1， 如果没有查询参数，则是个空对象。 

    *4.route.hash**

    当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。

    5.route.fullPath

    完成解析后的 URL，包含查询参数和 hash 的完整路径。 

    6.route.matched

    数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。

    7.$route.name

    当前路径名字
    
## $route.param

```js
//router
const routes = [
    {path: '/user/:username/post/:post_id', component: Detail, name: 'detail', meta: {title: ''}},
    {path: '/activity', component: Activity, name: 'activity', meta: {isNeedAuth: false, title: '活动现场'}},
];

//模式： /user/:username/post/:post_id
//匹配路径：/user/evan/post/123
//$route.params：{ username: 'evan', post_id: 123 }
```
## $route.query

```js
// 动态数据的查询参数
  export default {
        data() {
            return {
                queryData: {}
            }
        },
        created() {
           this.$http.get(url)
              .then(function (response) {
                   // ...
                   if (data.code == 0) {
                       this.queryData.order_id = data.content.order_id;
                       this.queryData.business_id = data.content.business_id;
                       this.queryData.coupon_id = data.content.coupons.coupon_id;
                    }
                   // ...
              }, function (response) {
                   // ...
              })
        },
    }

// 使用
<router-link :to="{ path: '/backend/verify_coupon', query:this.queryData }">验证抵扣券</router-link>
```
## this.$route.params和this.$route.query的区别

1.相同点 都可以用来传参数，获取参数
```js
eg：传参
    this.$router.push({
        path: '/monitor',
        query: {
            id: id,
         }
    }
    this.$router.push({
        path: '/monitor',
        params: {
            id: id,
         }
    }

取参
    this.$route.query.id
    this.$route.params.id
```
2.不同点：

使用query传参url中显示参数，刷新路由跳转页面参数不消失
使用params传参url中不显示参数，刷新路由跳转页面参数消失
```js
eg：
  query:  http://172.19.186.224:8080/#/monitor?id=1
  params: http://172.19.186.224:8080/#/monitor
```
## 监测路由

```js
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'doSomeThing'
  },
```

## 路由跳转
```js
// 当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。

// 可以通过this.$route.params.id来取上动态的id
<router-link :to="{path: '/detail/' + this.$route.params.id}" >详情</router-link>

// 还可以用命名路由的方式：
<router-link :to="{ name: 'detail', params:{ id: this.$route.params.id }}" >详情</router-link>

// 还可以用router.push()的方式
router.push({name:'detail', params: { id: this.$route.params.id}})

// 以上三种方式都可以实现跳转，都可以通过this.$route.params来取到参数
```
## meta 配置

```js
const routes = [
    {path: '/activity', component: Activity, name: 'activity', meta: {isNeedAuth: false, title: '活动现场'}},
    {path: '/start', component: Start, name: 'start', meta: {isNeedAuth: false, title: '活动现场'}},
];
const router = new VueRouter({...});
router.beforeEach((to, from, next) => {
    // 动态修改页面的title
    setTitleHack(to.meta.title);
     // 根据自定义的路由元信息来做判断：
    if (to.meta.isNeedAuth !== false) {
        // do something
    } else {
        // do something
    }
    next();
});
```
## append

设置 append 属性后，则在当前（相对）路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b

    <router-link :to="{path:'/coupon/detail/'+item.order_id, append:'true'}"></router-link>
    
如果上面这个路由是从home页面跳转过来，得到的结果就是/home/coupon/detail/id

## active-class

默认值: "router-link-active",设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。

<router-link tag="li" :to="{path:'/home', activeClass: 'bottom-nav-active'}"></router-link>

## `<routrt-link>`

```js
// 命名路由，append 属性，查询参数，router-link渲染成<li>标签
<router-link tag="li" :to="{name:'demandindex', append:true,  query: {isFormBackend: 1}, activeClass: 'bottom-nav-active'}">
</router-link>

// to的值：字符串形式
<router-link to="banner.image_url" ></router-link>

// to的值：对象形式，拼接多个动态参数
<router-link :to="{path: '/my/modify?modify=fullname&val=' + profile.nickname}" ></router-link>

// to的值：对象形式
<router-link :to="{path: '/home'}">返回首页</router-link>

// to的值：对象形式，拼接动态参数
<router-link to="{path: '/backend/coupon_order_detail/' + product.order_id+'?order_status='+product.order_status}"></router-link>

// to的值：对象形式，带一个路径参数
<router-link :to="{path: '/detail/' + this.$route.params.id}" ></router-link>
```
