## 双坐标均分， 动态计算使两边刻度线对齐
```js
yAxis:[
            {
              min: min,
              max: max,        // 计算最大值
              interval: Math.ceil(max / 5),   //  平均分为5份
            },
            {
              min: min,
              max: max,        // 计算最大值
              interval: Math.ceil(max / 5),   //  平均分为5份
            }
]
```
左右坐标设置 min, max 动态计算间隔， 设置 interval 
