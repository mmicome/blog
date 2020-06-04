## javacript 有三种类型的属性

- 命名数据属性：拥有一个确定的值的属性。这也是最常见的属性

- 命名访问器属性：通过getter和setter进行读取和赋值的属性

- 内部属性：由JavaScript引擎内部使用的属性，不能通过JavaScript代码直接访问到，不过可以通过一些方法间接的读取和设置。

## 通过Object.defineProperty()为对象定义属性，有两种形式，且不能混合使用

- 数据描述符 --特有的两个属性（value,writable）

- 存取描述符 --是由一对 getter、setter 函数功能来描述的属性:
  - get：一个给属性提供getter的方法，如果没有getter则为undefined。该方法返回值被用作属性值。默认为undefined。
  - set：一个给属性提供setter的方法，如果没有setter则为undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认值为undefined。

数据描述符和存取描述均具有以下描述符

- configrable 描述属性是否配置，以及可否删除
- enumerable 描述属性是否会出现在for in 或者 Object.keys()的遍历中

## 不变性

1. 对象常量

对象常量结合writable: false 和 configurable: false 就可以创建一个真正的常量属性（不可修改，不可重新定义或者删除）
```js
Object.defineProperty(obj, 'key', {
  value: "value",
  writable: false,
  configurable: false 
})

//configurable: false 时，不能删除当前属性，且不能重新配置当前属性的描述符(有一个小小的意外：
//可以把writable的状态由true改为false,但是无法由false改为true),但是在writable: true的情况下，可以改变value的值
//configurable: true时，可以删除当前属性，可以配置当前属性所有描述符。
```
2. 禁止扩展

如果你想禁止一个对象添加新属性并且保留已有属性，就可以使用Object.preventExtensions(...)
```js
Person = {
  name: 'jack',
  age: 20
}

Object.preventExtensions(Persion)
```

3. 密封

Object.seal()会创建一个密封的对象，这个方法实际上会在一个现有对象上调用object.preventExtensions(...)
并把所有现有属性标记为configurable:false。密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以改属性的值）
```js
Person = {
  name: 'jack',
  age: 20
}

Object.seal(Persion)
```

4. 冻结
Object.freeze()会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(),并把所有现有属性标记为writable: false,
这样就无法修改它们的值。
```js
Person = {
  name: 'jack',
  age: 20
}

Object.freeze(Persion)
```

## 对象属性操作

1. 属性赋值,通过obj.prop = ''prop"形式
- 如果在原型链上存在一个名为P的只读属性（只读的数据属性或者没有setter的访问器属性），则拒绝
- 如果在原型链上存在一个名为P的且拥有setter的访问器属性，则调用这个setter，赋值运算符不会改变原型链上的属性不能通过为obj.foo赋值来改变proto.foo的值。这种操作只会在obj上新建一个自身属性
- 如果没有名为P的自身属性，则如果这个对象是可扩展的，就创建一个新属性，否则，如果这个对象是不可扩展的，则拒绝
- 如果已经存在一个可写的名为P的自身属性，则调用Object.defineProperty(),该操作只会更改P属性的值，其他的特性（比如可枚举性）都不会改变，对象字面量中的属性是通过定义操作添加的。
```js
let obj = {
  name = "jack"
}
//或
let obj
obj.name = "jack"
//等价于：

let obj = new Object();
Object.defineProperty(obj, "name" {
  value: "jack",
  confingurable: true,
  writable: true,
  enumerable: true
})
```
2. 属性定义,通过Object.defineProperty()形式
- 如果Obj没有名为Prop的自身属性的话：如果Obj是可扩展的话，则创建Prop这个自身属性，否则拒绝
- 如果Obj已经有了名为Prop的自身属性：如果这个已有的属性是不可配置的，则进行下面的操作会被拒绝，否则这个已有的属性可以被重新配置

    1: 将一个数据属性转换成访问器属性，反之变然
    2: 改变`[[Configurable]]`或`[[Enumerable]]`
    3: 改变[[Writable]]由false变为true
    4: 在`[[Writable]]`为`false`时改变`[[Value]]`
    5: 改变[[Get]]或[[Set]]

## 参考

- [深入浅出Object.defineProperty()](https://www.jianshu.com/p/8fe1382ba135)
