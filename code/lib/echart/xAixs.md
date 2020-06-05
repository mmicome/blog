- echarts x轴标签文字过多导致显示不全

```js
//解决办法1：xAxis.axisLabel 属性
axisLabel: {
   interval:0,  //强制显示
   rotate:40  
}
//标签倾斜的角度，在类目轴的类目标签显示不全时可以通过旋转防止标签重叠（官方这样说的）旋转的角度是-90到90度
//问题又来了，这个名称x轴的文字如果太长会受到遮挡，还是显示不全，这个时候可以用grid属性解决
grid: {
left: '10%',
bottom:'35%'
}
```

```js
//解决办法2：调用formatter文字竖直显示
axisLabel中使用formatter回调，formatter有两个参数，使用方法是这样的formatter:function(value,index){} ，value是类目（测试医院A，人民医院）,index 是类目索引。

axisLabel: {
     interval: 0,
     formatter:function(value) {
         return value.split("").join("\n");
     }
}
```
