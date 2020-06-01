## axios 创建同步请求:
```js
methods: {
    async funA(){
        var res =  await axios.post('') //这里的res就是axios请求回来的结果
    }
}
```

## vue 全局变量：
```js
new Vue({
  el:"#app",
  router,
  store,
  i18n,
  methods: {
    async funA(){
        var res =  await axios.post('') //这里的res就是axios请求回来的结果
    }
  }
  created:function(){
    var _this=this;
    axios.get(url).then(function(d){
      _this.$i18n.locale=d;
    })
    
    this.funA()
 }
})
```
