## v-model 用在 input 元素上时

v-model虽然很像使用了双向数据绑定的 Angular 的 ng-model，但是 Vue 是单项数据流，v-model 只是语法糖而已：↓

    <input v-model="sth" />
    <input v-bind:value="sth" v-on:input="sth = $event.target.value" />
    
第一行的代码其实只是第二行的语法糖。然后第二行代码还能简写成这样：↓

    <input :value="sth" @input="sth = $event.target.value" />
    
input 元素本身有个 oninput 事件，这是 HTML5 新增加的，类似 onchange ，每当输入框内容发生变化，就会触发 oninput ，把最新的value赋值给 sth变量。


我们仔细观察语法糖和原始语法那两行代码，可以得出一个结论：

在给 <input /> 元素添加 v-model 属性时，默认会把 value 作为元素的属性，把 input 事件作为实时传递 value 的触发事件

## 当 v-model 用在组件上时

v-model 不仅仅能在 inputHTML 原生标签上用，在 vue 组件上也能使用；下面是一个和 Vue 官网教程类似的例子：

父组件 price 的初始值是 100，子组件是一个输入框；输入框的值改变时，能实时更新父组件的 price

```vue
// 父组件
<template>
<div id="demo">
  <currency-input v-model="price"></currentcy-input>
  <span>{{price}}</span>
</div>
</template>

<script>
export default {
  data() {
    return {
      price: 100,
    }
  }
}
</script>
// 子组件 currency-input
<template>
  <input
    ref="input"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
   <!--为什么这里把 'input' 作为触发事件的事件名？`input` 在哪定义的？-->
</template>

<script>
export default {
  props: {
    value: String,  // 为什么这里要定义 value 属性，父组件貌似没有给子组件传递 value 啊？
  }
}
</script>
```

我们对比下下面两行代码

    <currency-input v-model="price"></currentcy-input>
    <currency-input :value="price" @input="price = $event.target.value"></currency-input>
    
这两行代码实际上没有任何区别，只不过第一行是第二行的语法糖而已！与上面总结的类似：

给组件添加 v-model 属性时，默认会把value 作为组件的属性，把 input作为给组件绑定事件时的事件名

##v-model 的缺点和解决办法

v-model 应用到组件上，会有一些体验不好的场景。因为它默认会把 value 作为组件的属性，把 input作为给组件绑定事件时的事件名。

```vue
// 父组件
<my-button v-model="number"></my-button>
<script>
data() {
  return {
    number: 1,
  }
}
</script>

// 子组件
<template>
  <button @click="add">点击按钮自增 1</button>
</template>

<script>
export default {
  props: {
    value: Number, //  属性名必须是 value
  },

  methods: {
    add() {
      this.$emit('input', this.value + 1) // 事件名必须是 input
    },
  }
}
</script>
```

有时间我们不想用 value 当做默认的属性名，也不想把 input 当做事件名。能不能自定义呢？

在 Vue 2.2 及以上版本，你可以在定义组件时通过 model 选项的方式来定制 prop/event：↓

```vue
// 父组件
<my-button v-model="number"></my-button>
<script>
data() {
  return {
    number: 1,
  }
}
</script>

// 子组件
<template>
  <button @click="add">点击按钮自增 1</button>
</template>

<script>
export default {
  model: {
    prop: 'num', // 自定义属性名
    event: 'addNum' // 自定义事件名
  },
  props: {
    num: Number,
  },

  methods: {
    add() {
      this.$emit('addNum', this.num + 1)
    },
  }
}
</script>
```
