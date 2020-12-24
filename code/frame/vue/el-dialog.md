## 每次显示的时候做一次初始化

- 在dialog上面添加v-if='dialogVisible'

```js
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
在dialog上面添加v-if='dialogVisible'

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  v-if='dialogVisible'
```
