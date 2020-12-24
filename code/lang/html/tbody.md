如何用纯CSS固定thead实现表格滚动？tbody设置overflow之密

<table>
  <thead>
    <tr>
      <td>THEAD-TD1</td><td>THEAD-TD2</td>
    </tr>
  </thead>
  <tbody style="height:100px;overflow:auto;">
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
  </tbody>
</table>
然后发现，不论怎么调，期待中的滚动条并没有出现？有木有？



其实，只要再加一条属性display:block，就OK了：

<table>
  <thead>
    <tr>
      <td>THEAD-TD1</td><td>THEAD-TD2</td>
    </tr>
  </thead>
  <tbody style="height:100px;overflow:auto;display:block;">
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
  </tbody>
</table>
现在试试，期待已久的滚动条出现了，有木有？ 原来，这是因为tbody默认是display:table-row-group。



可是，似乎哪里不对……

对的，列之间不再对齐了。因为thead的display默认属性是：table-header-group，跟tbody的table-row-group是配套使用的。现在你把他们其中一个改了，自然就不再对齐了。

那么，该怎么解决呢？我把国内国外的网站都翻了个遍，也没有人有好的办法，唯一的办法就是：给thead也设置display:block，同时thead和tbody对应的td设置同样的width。这也算是纯CSS方案的一点牺牲吧。

<table>
  <thead style="display:block;">
    <tr>
      <td style="width:100px;">THEAD-TD1</td><td style="width:100px;">THEAD-TD2</td>
    </tr>
  </thead>
  <tbody style="height:100px;overflow:auto;display:block;">
    <tr>
      <td style="width:100px;">TBODY-TD1</td><td style="width:100px;">TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
    <tr>
      <td>TBODY-TD1</td><td>TBODY-TD2</td>
    </tr>
  </tbody>
</table>
当然，如果不愿意做这样的牺牲，那至少目前还是只能配合我们强大的JS来实现了。

下面提供一段配合这个方案的自动适配td宽度的JS，基于JQuery的：

$(function(){
    $("table").children("thead").find("td,th").each(function(){
	    var idx = $(this).index();
		var td = $(this).closest("table").children("tbody")
		                .children("tr:first").children("td,th").eq(idx);
		$(this).width() > td.width() ? td.width($(this).width()) : $(this).width(td.width());
	});
});
浏览器支持情况：

firefox、chrome、safari均支持，IE10在声明html5（<!DOCTYPE HTML>）之后可以支持，IE9及以下均不支持。
