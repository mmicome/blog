# Mixin

Mixin是 Sass 中用来方便地复用代码的方法，你可以简单点理解成函数，可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值，返回的是一组 CSS 属性或代码。

```css
Clearfix
@mixin clearfix() {
    &:before,
    &:after {
        content: "";
        display: table;
    }
    &:after {
        clear: both;
    }
}

.container {
    @include clearfix;
}
```

圆角边框

```css
@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box {
    @include border-radius(10px);
}
```

跨浏览器的透明度设置

这个mixin可以可以制作出兼容 Internet Explorer 5 的跨浏览器透明度效果。

```css
@mixin opacity($opacity) {
    opacity: $opacity;
    $opacity-ie: $opacity * 100;
    filter: alpha(opacity=$opacity-ie); //IE8
}

.faded-text {
    @include opacity(0.8);
}  
```

文本溢出省略显示

```css
@mixin text-ellipsis () {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
text-overflow:ellipsis 
/* <!-- 属性来实现单行文本的溢出显示省略号(…)。当然部分浏览器还需要加宽度width属性。 --> */
```

多行文本溢出省略显示

支持 WebKit浏览器或移动端的页面

```css
@mixin text-ellipsis () {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
```

-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
text-overflow: ellipsis; 可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。
使用rem设置字体尺寸并使用像素进行回退
rem 和 em 类似，都是一种CSS测量单位，但是它不是相对于父元素的尺寸，而是相对于HTML文档的根元素设置元素的尺寸大小。

由于rem在设置元素尺寸的时候是相对于HTML根元素的尺寸，而不是他的父元素的设置，因此在使用上不会发生混乱的情况。但是由于在IE8及以下版本的IE浏览器中不支持rem属性，因此我们必须在这些浏览器中使用像素为单位来创建回退代码。

```css
@function calculateRem($size) {
    $remSize: $size / 16px;
    @return $remSize * 1rem;
}

@mixin font-size($size) {
    font-size: $size;
    font-size: calculateRem($size);
}

p {
    @include font-size(14px)
}
```

输出结果

```css
p {
    font-size: 14px; //如果浏览器不支持rem将使用这个规则进行覆盖
    font-size: 0.8rem;
}
```

Retina 背景图片

```css
@mixin imgRetina($image, $extension, $width, $height, $position: center, $repeat: no-repeat) {
     background: url($image + '.' + $extension) $repeat $position;
     @media 
     screen and (-webkit-min-device-pixel-ratio: 2),
     screen and (   min--moz-device-pixel-ratio: 2),
     screen and (   -moz-min-device-pixel-ratio: 2),
     screen and (     -o-min-device-pixel-ratio: 2/1),
     screen and (        min-device-pixel-ratio: 2),
     screen and (             min-resolution: 192dpi), 
     screen and (             min-resolution: 2dppx) {    
        background: url($image + '@2x' + '.' + $extension) $repeat $position;
        background-size: $width $height;
     }
}

.bg-image {
    @include imgRetina(images/waterlily, jpg, 200px, 200px, no-repeat, center);
    height: 200px;
    width: 200px;
}
```

输出结果

```css
.bg-image {
    background: url(images/waterlily.jpg) center no-repeat;
    height: 200px;
    width: 200px;
}
@media screen and (-webkit-min-device-pixel-ratio: 2), screen and (min--moz-device-pixel-ratio: 2), screen and (-moz-min-device-pixel-ratio: 2), screen and (min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi), screen and (min-resolution: 2dppx) {
    .bg-image {
        background: url(images/waterlily@2x.jpg) center no-repeat;
        background-size: 200px 200px;
    }
}
```

## 如何使用 Mixin

在 Sass 中，@include 代表这调用定义好的 @mixin。在调用的时候如果mixin没有参数，可以省略mixin之后的括号，如下：

```css
@mixin size () {
    width: 100px;
    height: 100px;
}

.foo {
    @include size();
}

.bar {
    @include size;
}
```

输出 

```css
.foo {
    width: 100px;
    height: 100px;
}

.bar {
    width: 100px;
    height: 100px;
}
```