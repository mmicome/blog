### CssSprites与Base64编码

- 使用CssSprites合并为一张大图：

      页面具有多种风格，需要换肤功能，可使用CssSprites
      网站已经趋于完美，不会再三天两头的改动（例如button大小、颜色等）
      使用时无需重复图形内容
      没有 Base64 编码成本，降低图片更新的维护难度。（但注意 Sprites 同时修改 css 和图片某些时候可能造成负担）
      不会增加 CSS 文件体积

- 使用base64直接把图片编码成字符串写入CSS文件：

      无额外请求
      对于极小或者极简单图片
      可像单独图片一样使用，比如背景图片重复使用等
      没有跨域问题，无需考虑缓存、文件头或者cookies问题  

```css
//在html代码img标签里的写法
<img src="data:image/gif;base64,R0lGODlhHAAmAKIHAKqqqsvLy0hISObm5vf394uLiwAAAP///yH5BEoqQqJKAIBaQOVKHAXr3t7txgBjboSvB8EpLoFZywOAo3LFE5lYs/QW9LT1TRk1V7S2xYJADs=">

//在css里的写法
#fkbx-spch, #fkbx-hspch {
  background:url(data:image/gif;base64,R0lGODlhHAAmAKIHAKqqqsvLy0hISObm5vf394uLiwAAAP///yH5BEoqQqJKAIBaQOVKHAXr3t7txgBjboSvB8EpLoFZywOAo3LFE5lYs/QW9LT1TRk1V7S2xYJADs=) no-repeat center;
}
```

### Base64 不足

CSSOM 阻止任何东西渲染，（意味着在CSS没处理好之前所有东西都不会展示），而如果CSS文件中混入了Base64，那么（因为文件体积的大幅增长）解析时间会增长到十倍以上。而且，最重要的是，增加的解析时间全部都在关键渲染路径上。

***base64tool : 在 chrome 下新建一个窗口，然后把要转化的图片直接拖入浏览器，打开控制台，点 Source，如下图所示，点击图片，右侧就会显示该图片的 base64 编码***
