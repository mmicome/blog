### 相关博客

- [js对iframe内外父子页面进行操作](http://caibaojian.com/js-get-iframe.html)


```js
//内容宽度变化的iframe高度自适应
<iframe src="backtop.html" frameborder="0" scrolling="no" id="test" onload="this.height=100"></iframe>
<script type="text/javascript">
  function reinitIframe(){
  var iframe = document.getElementById("test");
  try{
  var bHeight = iframe.contentWindow.document.body.scrollHeight;
  var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
  var height = Math.max(bHeight, dHeight);
  iframe.height = height;
  console.log(height);
  }catch (ex){}
  }
  window.setInterval("reinitIframe()", 200);
</script>
```

