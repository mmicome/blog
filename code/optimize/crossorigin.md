# script 标签的 crossorigin 属性

```js
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    integrity="shdsfaafa/342/42342/werfadf/GpGFF93hXpG5KkN"
    crossorigin="anonymous"></script>
```

> integrity 属性，用来验证文件完整性的

> crossorigin 属性

- anonymous：如果使用这个值的话就会在请求中的header中的带上Origin属性，但请求不会带上cookie和其他的一些认证信息。

- use-credentials：这个就同时会在跨域请求中带上cookie和其他的一些认证信息。

在使用这两个值时都需要server端在response的header中带上
Access-Control-Allow-Credentials属性。

另外除了 script，所有能引入跨域资源的标签包括 link 和 img 之类，都有一样的属性。

    目前比较一致的说法是，引入跨域的脚本（比如用了 apis.google.com 上的库文件），如果这个脚本有错误，因为浏览器的限制（根本原因是协议的规定），是拿不到错误信息的。当本地尝试使用 window.onerror 去记录脚本的错误时，跨域脚本的错误只会返回 Script error。

    但 HTML5 新的规定，是可以允许本地获取到跨域脚本的错误信息，但有两个条件：一是跨域脚本的服务器必须通过 Access-Controll-Allow-Origin 头信息允许当前域名可以获取错误信息，二是当前域名的 script 标签也必须指明 src 属性指定的地址是支持跨域的地址，也就是 crossorigin 属性。

    这其中浏览器或者说协议crossorigin 属性涉及到网络安全问题；加入允许本地获取到跨域脚本的错误信息那么我们通过报错信息的不一致，可能可以推断出当前访问的用户的使用痕迹；进而『精准』推送相关的钓鱼网站给他。

**safari浏览器的bug**

在safari浏览器中发现一个bug，即用户选择本地的图片文件时，如果使用了crossorigin话也会报错，解决办法是判断图片的地址是否是以http开头的

![react 建议](../imgs/h5/crossorigin.png)