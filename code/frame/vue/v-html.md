## Vue v-html不能触发点击事件

解决方案：组件替代

点击事件
```vue
<template>
    <div>
        <div class='parent' id='parent'></div>
    </div>
</template>
<script>
    import Vue from 'vue'
    var MyComponent = Vue.extend({
         template: '<span @click='add()'>点击</span>',
          methods: {     
            add() {
                console.log('触发点击事件');
            }
        }
    })
    let component=new MyComponent().$mount()
    export default {
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {
            document.getElementById('parent').appendChild(component.$el);
        }
    }
</script>
```

```vue
<template>
    <div>
        <div class='parent' id='parent'><my-component></component></div>
    </div>
</template>
<script>
    import Vue from 'vue'
    var MyComponent = Vue.extend({
         template: '<span @click='add()'>点击</span>',
          methods: {     
            add() {
                console.log('触发点击事件');
            }
        }
    })
    export default {
        components: {MyComponent}
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {
            document.getElementById('parent').appendChild(component.$el);
        }
    }
</script>
```

传递props
```vue
<h1>Vue.extend的propsData 用得很少，仅用于开发环境</h1>
<div id="head2"></div>

<script>
    var CommonHeader = Vue.extend({
        template:"<header>我是网站头部 {{ message }}  -by {{ username }}</header>",
        data:function () {
            return{
                message:"I am message!"
            }
        },
        props:['username']
    });
    var header = new CommonHeader({
        propsData:{
            username:"wss"
        }
    }).$mount("#head2");
 
</script>
```
