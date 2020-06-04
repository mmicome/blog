 函数：indexOf()
功能：返回字符串中匹配子串的第一个字符的下标

var myString=”JavaScript”;
var w=myString.indexOf(”v”);w will be 2
var x=myString.indexOf(”S”);x will be 4
var y=myString.indexOf(”Script”);y will also be 4

var z=myString.indexOf(”key”);z will be -1

在网上看到另一种非常简单的方法，代码如下：

　　function func(s, n) {
　　　　return s.replace(/([^x00-xff])/g, “$1a”).slice(0, n).replace(/([^x00-xff])a/g, “$1″);
　　}

这个方法非常巧妙，而且基本上是正确的。说“基本上”是因为它在取“123汉字测试”左边长度为 6 的子串时，它返回的是“123汉字”，而不是“123汉”。当然，这也并不一定就是问题，某些情况下需求可能就是这样。这个方法还可以再改进一下，如下：

　function func(s, n) {
　　　　return s.slice(0, n).replace(/([^x00-xff])/g, “$1a”).slice(0, n).replace(/([^x00-xff])a/g, “$1″);
　　}
  
  
    <body>
        <h2>embed</h2>
        <embed src="me.svg" type="image/svg+xml" width="108" height="108" /> 优势：所有主要浏览器都支持，并允许使用脚本 缺点：不推荐在HTML4和XHTML中使用（但在HTML5允许）
        <h2>object</h2>
        <object data="me.svg" type="image/svg+xml" width="108" height="108"></object> 优势：所有主要浏览器都支持，并支持HTML4，XHTML和HTML5标准 缺点：不允许使用脚本。
        <h2>iframe</h2>
        <iframe src="me.svg" frameborder="0" width="108" height="108"></iframe> 优势：所有主要浏览器都支持，并允许使用脚本 缺点：不推荐在HTML4和XHTML中使用（但在HTML5允许）
        <h2>直接嵌入</h2>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="108" height="108">
            <circle cx="54" cy="54" r="50" stroke="blue" stroke-width="2" fill="blue" />
        </svg>
        在Firefox、Internet Explorer9、谷歌Chrome和Safari中，你可以直接在HTML嵌入SVG代码。 注意：SVG不能直接嵌入到Opera。
        <h2>image</h2>
        <img src="me.svg" width="108" height="108" />
    </body>


当您将标记字符串传递给$它时，它会使用浏览器的innerHTML属性<div>（或其他适合特殊情况的容器<tr>）解析为HTML 。innerHTML无法解析SVG或其他非HTML内容，即使它可能无法分辨出<circle>应该在SVG名称空间中。

innerHTML在SVGElement上不可用 - 它仅属于HTMLElement属性。目前也没有innerSVG属性或其他方式（*）将内容解析为SVGElement。因此，您应该使用DOM样式的方法。jQuery不允许您轻松访问创建SVG元素所需的命名空间方法。实际上jQuery根本不适合与SVG一起使用，许多操作可能会失败。

HTML5承诺将来允许您在<svg>没有xmlns内部的纯HTML（text/html）文档的情况下使用。但这只是一个解析器hack（**），SVG内容仍然是SVG名称空间中的SVGElements，而不是HTMLElements，所以innerHTML即使它们看起来像HTML文档的一部分，你也无法使用。

但是，对于今天的浏览器，您必须使用X HTML（正确地作为application/xhtml+xml;使用.xhtml文件扩展名保存以进行本地测试）以使SVG完全正常工作。（无论如何它都是有意义的; SVG是一个基于XML的正确标准。）这意味着您必须转义<脚本块内的符号（或包含在CDATA部分中），并包含XHTML xmlns声明。例：

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"><head>
</head><body>
    <svg id="s" xmlns="http://www.w3.org/2000/svg"/>
    <script type="text/javascript">
        function makeSVG(tag, attrs) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
        }

        var circle= makeSVG('circle', {cx: 100, cy: 50, r:40, stroke: 'black', 'stroke-width': 2, fill: 'red'});
        document.getElementById('s').appendChild(circle);
        circle.onmousedown= function() {
            alert('hello');
        };
    </script>
</body></html>
*：嗯，有DOM Level 3 LS的parseWithContext，但浏览器支持很差。编辑添加：但是，虽然您无法将标记注入SVGElement，但您可以使用新的SVGElement注入HTMLElement innerHTML，然后将其传输到所需的目标。它可能会慢一点：

<script type="text/javascript"><![CDATA[
    function parseSVG(s) {
        var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
        var frag= document.createDocumentFragment();
        while (div.firstChild.firstChild)
            frag.appendChild(div.firstChild.firstChild);
        return frag;
    }

    document.getElementById('s').appendChild(parseSVG(
        '<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" onmousedown="alert(\'hello\');"/>'
    ));
]]></script>

这个答案仍然有用！我只是有一个奇怪的错误，其中添加的元素显示在Chrome元素检查器中，但不会呈现。如果我RMB> edit as html的HTML标签并回车一切显示（但是所有的事件监听器消失）。看完这个答案后，我将createElement调用改为createElementNS，现在一切正常！ -  kitsu.eb 2013年 7月12日21:01 
五
使用DOM方法createElementNS创建SVG元素后，可以使用jquery操作它们。您可以将makeSVG函数更改为'return $（el）'，现在您有一个可以使用jquery方法的svg元素。 -  霍夫曼 于2013年11月28日14:56 
五
啊! 所以这就是为什么它不起作用。我用两个不同的库尝试了完全相同的东西，一个在jQuery中，另一个在D3.js中。我在HTML中使用两者完全相同的源输出，但是当生成D3的元素时，jQuery生成的元素不会呈现！我建议使用D3：d3.select('body').append('svg').attr('width','100%'); -  chharvey 2014年 12月15日21:36
3
@MadsSkjern：DOM Level 3 LS从未进入过浏览器。最初只支持Mozilla的DOMParser现在得到了更广泛的支持，jQuery也有$.parseXML]


使用JavaScript/JQuery 操作SVG元素的几个关键技巧
不得已的原因填了一下js操作svg这个坑，从网上看到的技巧主要还是js的，使用jquery的原因主要还是筛选方便。

1、使用img、iframe载入svg的情况请查看http://blog.iderzheng.com/something-about-svg-with-javascript/介绍的更全面，获取SVG对象主要采用getSVGDocument()方法，语法如下：

1 var svgDoc = document.getElementById("svgembed").getSVGDocument();
2、要获取<g>(个人理解是画布)的宽高，注意将JS和JQuery对象切换使用，再通过getBBox()方法获取，语法：

1 var svgGWidth = $(svgObj).children("g")[0].getBBox().width;
2 var svgGHeight = $(svgObj).children("g")[0].getBBox().height;
3、获取<g>的位移量transform，可以通过attr("transform")方法获取，语法：

1 var transformStr = textObjs.eq(i).parent('g').attr("transform");
得到的是transform(100.123,200.321)这种形式的字符串，可以通过截取字符串的方式获得x，y。

