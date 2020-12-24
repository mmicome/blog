```
div   //none
  div.input  //#ccc
    p.2p  //#ccc
  p.1p  //none
```
css变量，和css属性作用域原理相同，具备继承
```css
:root {
  --main-text-color: #ccc;
}

.input {
  color: var(--main-text-color)
}
```

js 操作css变量
```js
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);
```
