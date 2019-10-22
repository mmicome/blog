### 在html中操作SVG对象

对于嵌入式 `<embed name="id1" id='svgId' type='image/svg+xml' src="./test.svg" height="200" width="500"></embed>`
可以通过document.getElementById('svgId').getSVGDocument();的方法得到SVG Doc对象，

但此方法存在两个问题：

- 是opera不支持getSVGDocument方法，
- 是对于动态创建的embed对象并不会马上被呈现，从而无法立刻得到SVGDocument对象，

    ```js
    //原生封装 1(动态添加svg 核心方法) dom中现有svg节点
    var parseSVG = function (s) {
        var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
        var frag = document.createDocumentFragment();
        while (div.firstChild.firstChild)
            frag.appendChild(div.firstChild.firstChild);
        return $(frag);
    }
    $svg.append(parseSVG("<g>test</g>"))

    //原生封装 2(动态添加svg 核心方法) dom中不含svg节点
    function createTag(tag, tagAttr) {
        var oTag = document.createElementNS(svgNS, tag);
        for (var attr in tagAttr) {
            oTag.setAttribute(attr, tagAttr[attr]);
        };
        return oTag;
    };
    var oSvg = createTag('svg', {
        "width": "100%",
        "height": "100%",
        'xmlns': svgNS
    });
    ```

- $svg.empty() 清空svg节点， ie下， 使用html() 无法清空
- 使用jquery 动态操作svg文档，无法直接通过元素获取， 通过class 或 id 获取， 
- style 属性指定 svg 元素的各种外观特性。SVG 与 HTML 一样，可以应用 CSS 定义外观，并且有一些专门的特性：

### ViewBox

半径200px的圆
`<circle cx="200" cy="200" r="200" fill="#fdd" stroke="none"></circle>`
如果是在一个400*400的画布上，圆正好撑满整个画布，挺好的。
好了，然后我要把这个圆嵌入到自己的页面里的svg标签里去，页面的svg标签尺寸是由实际业务需要来定的，不一定正好是，可能大可能小，还可能不是正方形。
```svg
<svg style="width:150px; height:300px">
    <circle cx="200" cy="200" r="200" fill="#fdd" stroke="none"></circle>
</svg>

<text>设置viewBox<text>
<svg style="width:150px; height:300px" viewBox="0 0 400 400">
    <circle cx="200" cy="200" r="200" fill="#fdd" stroke="none"></circle>
</svg>
```
viewBox的四个参数分别代表：最小X轴数值；最小y轴数值；宽度；高度。

前两个暂时用不到，个人理解除非要对内部svg做整体位移，否则一般都是0 0

viewBox是个400*400的正方形，但是单位不是px，也不是任何一个css单位，就当是一个假的单位吧。在viewBox放了一个圆，这个圆的半径是200，单位也不是px，而是变成了和viewBox的单位一模一样的那个假的单位。为啥说是假的呢？因为这个单位代表的长度是会变的，接着看。
svg有个特点，在默认情况下，会调整这个viewBox的大小，让这个viewBox正好能被放进svg里去。拿上面例子来说，viewBox是个正方形，而svg的宽度比高度小，所以就把viewBox的大小缩小到和svg宽度一样，就能正好将viewBox放进svg里来了。所以现在viewBox的实际大小是个150px*150px的正方形。
所以现在可以确定的是，viewBox的一个单位代表的长度 = 150px/400 = 0.375px。
而viewBox内部的所有数值*0.375px才是真正的长度。那个circle的圆心实际上是在坐标75px, 75px的位置上，半径为75px。

### 隐藏属性preserveAspectRatio

这是个属性和viewBox的关系特别密切。即使不显示声明这个preserveAspectRatio属性，viewBox也是会有这个属性的默认设置的，即preserveAspectRatio="xMidYMid meet"
显示声明方式如下：

`<svg style="width:150px; height:300px" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">`
    
第一个参数有9个不同值可选

    xMinYMin,
    xMinYMid,
    xMinYMax,
    xMidYMin,
    xMidYMid,
    xMidYMax,
    xMaxYMin,
    xMaxYMid,
    xMaxYMax

x和y表示对齐的轴线，min,mid,max表示对齐的方式。min是往坐标小的方向对齐；mid居中对齐；max是往坐标大的方向对齐（顺带一提svg的坐标0刻度在左上角）。

第二个参数有两个值可选：meet和slice

meet就是前面那种自动调整viewBox到可以在svg画布中完全展示。非常类似css里background-size:contain 而slice是自动调整viewBox到撑满整个svg画布。非常类似background-size:cover

其实说是preserveAspectRatio的第一个参数有9种值，在确定svg画布宽大于高，或者高大于宽的情况下，可以缩减到就3种值，其他值都是重复的，但在不确定画布尺寸时，还是要明确需求选择合适的参数值。

preserveAspectRatio还有个单独使用的参数："none"。这种时候viewBox会被拉伸到和svg画布相同尺寸，而内部的所有svg元素也会被等比拉伸，而不是维持原有比例。






























