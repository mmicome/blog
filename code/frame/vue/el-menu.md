## el-menu-item

@click 事件可能会被阻止触发，使用原生方法 @click.native 绑定事件

@click = click($event, args)  //$event 此时实际为 this（vm）, 不可获取$event, 可通过$event.$el 获取当前元素

@click.native = click($event, args)   //$event 可获取
