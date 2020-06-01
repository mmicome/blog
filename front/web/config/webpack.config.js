// 按官方文档可以用useBuiltIns的方法实现按需加载，只需在.babelrc中增加环境配置如下
module.exports = {
    entry:["babel-polyfill","./app/js"]
}
