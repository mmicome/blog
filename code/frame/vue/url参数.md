eg: `http://192.168.1.12:8080/#/detail/?id=1232343+dfsd&dfs=234`

> vue
```js
let id = this.$route.query.id
```
> js
```js
//utils
export default{
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    }
}
import utils from '../../assets/scripts/utils'
// Vue.prototype.$utils = utils // main.js中全局引入
let id = utils.getUrlKey('id')
```
