> 监听键盘ctrl+c ctrl+v
```js
area.onkeydown = (event) => { 
        if (event.ctrlKey) {
          if (event.keyCode == 67) {
            alert('ctrl+c复制')
          }
          if (event.keyCode == 86) {
            alert('ctrl+v粘贴')
          }
        }
      }; 
```
> 监听浏览器右键复制粘贴(area 是获取的文本域的节点，必须是dom的真实节点)
```js
     let isRight = false;
      area.onmousedown = (event) => { // 右键
        event = window.event || event;
        if (event.button == 2) {
          isRight = true;
        }
      };
      area.oncopy = () => { // 监听浏览器复制事件
        if (isRight == true) {
          alert('右键复制')
          isRight=false
        }
      };
      area.onpaste = () => { // 监听浏览器粘贴事件
        if (isRight == true) {
          alert('右键粘贴')
          isRight=false
        }
      }
```

> 手写一个复制到剪切板的方法
```js
export default function copyToClipboard(text) {
  let textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful
      ? "成功复制到剪贴板"
      : "该浏览器不支持点击复制到剪贴板";
    alert(msg);
  } catch (err) {
    alert("该浏览器不支持点击复制到剪贴板");
  }
  document.body.removeChild(textArea);
}
```
