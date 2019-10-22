## 一、注意作用域 

> attention: 本文旨在整理，取长，补短，扩充个人知识库， 原文请移步 **文章参考如下:**

- [Daredevil](https://www.jianshu.com/p/1a122b4449a1) 

**1. 避免全局查找**

```js
function updateUI(){
    var imgs = document.getElementByTagName("img");
    for(var i=0, len=imgs.length; i<len; i++){
        imgs[i].title = document.title + " image " + i;
    }
    var msg = document.getElementById("msg");
    msg.innnerHTML = "Update complete.";
}
```

该函数可能看上去完全正常，但是它包含了三个对于全局document对象的引用。如果在页面上有多个图片，那么for循环中的document引用就会被执行多次甚至上百次，每次都会要进行作用域链查找。通过创建一个指向document对象的局部变量，就可以通过限制一次全局查找来改进这个函数的性能：

```js
function updateUI(){
    //首先将document对象存在本地的doc变量中
    var doc = document;
    var imgs = doc.getElementByTagName("img");
    for(var i=0, len=imgs.length; i<len; i++){
        imgs[i].title = doc.title + " image " + i;
    }
    var msg = doc.getElementById("msg");
    msg.innnerHTML = "Update complete.";
}
```

**3. Duff装置的技术**

Duff装置的基本概念是通过计算迭代的次数是否为8的倍数将一个循环展开为一系列语句。Andrew B.King提出了一个更快的Duff装置技术，将do-while循环分成2个单独的循环

```js
var iterations = Math.floor(values.length / 8);
var leftover = values.length % 8;
var i = 0;

if(leftover>0){
    do{
        process(values[i++]);
    }while(--leftover > 0);
}
do{
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
}while(--iterations > 0);
```

针对大数据集使用展开循环可以节省很多时间，但对于小数据集，额外的开销则可能得不偿失。它是要花更多的代码来完成同样的任务，如果处理的不是大数据集，一般来说不值得。

**4. 插入迭代值**

```js
var name = values[i];
i++;
```
```js
var name = values[i++];
```

**5. 值类型转化**

```js
// From anything to a number

var foo = "42";
var myNumber = +foo; // shortcut for Number(foo)
// → 42

// Tip: you can convert it directly into a negative number
var negativeFoo = -foo; // or -Number(foo)
// → -42

// From object to array
// Tip: `arguments` is an object and in general you want to use it as array
var args = { 0: "foo", 1: "bar", length: 2 };
Array.prototype.slice.call(args)
// → [ 'foo', 'bar' ]

// Anything to boolean
/// Non non p is a boolean p
var t = 1;
var f = 0;
!!t
// → true
!!f
// → false

/// And non-p is a boolean non-p
!t
// → false
!f
// → true

// Anything to string
var foo = 42;
"" + foo // shortcut for String(foo)
// → "42"

foo = { hello: "world" };
JSON.stringify(foo);
// → '{ "hello":"world" }'

JSON.stringify(foo, null, 4); // beautify the things
// →
// '{
//    "hello": "world"
// }'

// Note you cannot JSON.stringify circular structures
JSON.stringify(window);
// ⚠ TypeError: JSON.stringify cannot serialize cyclic structures.
```

## 二、优化DOM交互

**1. 最小化现场更新**

一旦你需要访问的DOM部分是已经显示的页面的一部分，那么你就是在进行一个现场更新。现场更新进行得越多，代码完成执行所花的事件就越长。

```js
var list = document.getElementById('myList'),
    item,
    i;
for (var i = 0; i < 10; i++) {
    item = document.createElement("li");
    list.appendChild(item);
    item.appendChild(document.createTextNode("Item" + i));
}
```

这段代码为列表添加了10个项目。添加每个项目时，都有2个现场更新：一个添加li元素，另一个给它添加文本节点。这样添加10个项目，这个操作总共要完成20个现场更新。

```js
var list = document.getElementById('myList'),
    fragment = document.createDocumentFragment(),
    item,
    i;
for (var i = 0; i < 10; i++) {
    item = document.createElement("li");
    fragment.appendChild(item);
    item.appendChild(document.createTextNode("Item" + i));
}
list.appendChild(fragment);
```

使用文档片段来构建DOM结构，然后再将其添加到现存的文档中，只有一次现场更新

**2. 使用innerHTML**

有两种在页面上创建DOM节点的方法：使用诸如createElement()和appendChild()之类的DOM方法，以及使用innerHTML。对于小的DOM更改而言，两种方法效率都差不多。然而，对于大的DOM更改，使用innerHTML要比使用标准DOM方法创建同样的DOM结构快得多。

当把innerHTML设置为某个值时，后台会创建一个HTML解析器，然后使用内部的DOM调用来创建DOM结构，而非基于JavaScript的DOM调用。由于内部方法是编译好的而非解释执行的，所以执行快得多。

```js
var list = document.getElementById("myList");
    html = "";
    i;

for (i=0; i < 10; i++){
    html += "<li>Item " + i +"</li>";
}
list.innerHTML = html;
```

**3. 使用事件代理**

**4. 注意HTMLCollection**

```js
var images = document.getElementsByTagName("img"),
    image,
    i,len;

for (i=0, len=images.length; i < len; i++){
    image = images[i];
    //处理
}
```

将length和当前引用的images[i]存入变量，这样就可以最小化对他们的访问。发生以下情况时会返回HTMLCollection对象：

- 进行了对getElementsByTagName()的调用；
- 获取了元素的childNodes属性；
- 获取了元素的attributes属性；
- 访问了特殊的集合，如document.forms、document.images等。
