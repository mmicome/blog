# plugin

like [electron-vue](https://github.com/SimulatedGREG/vue-electron/blob/master/index.js)

```js
const electron = require('electron');

moudle.exports = {
    install: function(Vue) {
        Object.defineProperties(Vue.prototype, {
            $electron: {
                get() {
                    return electron;
                }
            }
        })
    }
}
```
use it

```js
//main.js
import Vue from 'vue'
import VueElectron from 'vue-electron'

Vue.use(VueElectron)
```

## why

[Use Any JavaScript Library With Vue.js](https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/)