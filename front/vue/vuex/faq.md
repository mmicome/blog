## 表单绑定 store 处理（严格模式）

使用带有 setter 的双向绑定计算属性：

<input v-model="message">
```js
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```
