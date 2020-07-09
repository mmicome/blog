```js
router: {
  path: 'busness/:id/:uid'
}
```
> 匹配路由： `**/busness/232/223`

> 获取参数： `this.$route.params.uid / this.$route.params.uid`

> use

`<router-link to='/tr/15/122'>查看</router-link>`

或通过 
```
router: {
  path: 'busness'
}
this.$router.push({path:"/cbimToolsBack/toolsDetail",query:{id:id,uid:uid}})
```
