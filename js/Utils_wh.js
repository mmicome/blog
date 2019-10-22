utils = {
  window: {
      self: this,
      //获取浏览器文档可用宽度
      innerWidth: function() {
        return Math.max(getvalue(window.innerWidth), 
                        getvalue(document.documentElement.clientWidth),
                        getvalue(document.body.clientWidth));
      },
      //获取浏览器文档可用高度
      innerHeight: function() {
        return math.max(getvalue(window.innerHeight),
                        getvalue(document.documentElement.clientHeight), 
                        getvalue(document.body.clientHeight));
      },
      //工具栏高/宽度 
      tools: window.outerHeight - window.innerHeight,
      //滚动条高度/宽度 
      scrollWidth: window.innerWidth - document.body.clientWidth,
      //屏幕相关 属性
      screen: {
        //屏幕分辨率
        width: window.screen.width,
        height: window.screen.height,
        //屏幕可用工作区宽高,屏幕高度减去上下任务栏后的宽高度，可表示为软件最大化时的宽高度。
        availHeight: window.screen.availHeight,
        availWidth: window.screen.availWidth,
        //任务栏高/宽度
        taskWidth: window.screen.height - window.screen.availHeight,
      },

      //浏览器缩放比例
      //-----this 趣事----//
      // 当使用self.innerWidth时无需加括号
      // 当使用this.innerWidth() 时要加括号
      //scalePre: function() {
      //  return this.innerWidth() / self.screen.width;
      //},
      scalePre: function() {
        return self.innerWidth / self.screen.width;
      },
  },
  
  document: {
      //网页展示的宽高；表示body在浏览器内显示的区域高度。
      clientWidth: Math.max(document.body.clientWidth,document.documentElement.clientWidth),
      ciientheight: Math.max(document.body.clientHeight,document.documentElement.clientHeight),
      //网页可见区域总宽高
      offsetWidth: Math.max(document.body.offsetWidth,document.documentElement.offsetWidth),
      offsetHeight: Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),
      //网页正文全文宽高
      scrollWidth: document.body.scrollTop,
      scrollHeight: document.body.scrollwidth,
      //网页被卷去的高
      scrollTop: document.body.scrollTop,
      //垂直方向滚动的值
      scrollTop2: document.documentElement.scrollTop,
      //网页被卷去的左
      scrollLeft: document.body.scrollLeft,
  },
  
  //positionType=[scrollHeight,scrollLeft,scrollTop,scrollWidth,offsetHeight,offsetLeft,offsetTop]
  //scrollHeight: 获取对象的滚动高度。 
  //scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离 
  //scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 
  //scrollWidth:获取对象的滚动宽度 
  //offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度 
  //offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置 
  //offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
  //获取高度注意点：
  //offsetHeight = content + border + padding    | element.offsetHeight
  //clientHeight = content + padding             | element.clientHeight
  //style  style属性只能获取元素标签style属性里的值,及嵌入式样式， 否则为空, style可读写 element.style.height
  //getComputedStyle  方法获取的是最终应用在元素上的所有CSS属性对象, getComputedStyle是只读的 window.getComputedStyle(element);
  //getPropertyValue  方法可以获取CSS样式申明对象上的属性值。 |  window.getComputedStyle(element).getPropertyValue('height')
  element: {
    prop: function(el, positionType) {
      return $("el")[0][positionType];
    },
  },
  
  //positionType = [clientX,clientY,offsetX,offsetY]
  //event.clientX 相对文档的水平座标 
  //event.clientY 相对文档的垂直座标 
  //event.offsetX 相对容器的水平坐标 
  //event.offsetY 相对容器的垂直坐标 
  event: {
    prop: function(eventType, positionType) {
      $(document).on(eventType, function(event) {
        //console.log(event[positionType]);
        return event[positionType];
      })
    }
  },
  
  //getvalue
  getvalue: function(data) {
    if(data == null || data == undefined) {
      return 0;
    } else {
      return data;
    }
  }
}
