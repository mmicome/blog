## Vuex是什么

状态管理模式，将所有组件需要共享的变量全部存储在一个对象里，然后将这个对象放在顶层组件中供其他组件使用。

## Vuex内容

    state：存储状态。也就是变量;
    getters：派生状态。也就是set、get中的get，有两个可选参数：state、getters分别可以获取state中的变量和其他的getters。外部调用方式：store.getters.personInfo()。就和vue的computed差不多;
    mutations：提交状态修改。也就是set、get中的set，这是vuex中唯一修改state的方式，但不支持异步操作。第一个参数默认是state。外部调用方式：store.commit('SET_TOKEN', 2187)。和vue中的methods类似;
    actions: 和mutations类似。不过actions支持异步操作。第一个参数默认是和store具有相同参数属性的对象。外部调用方式：store.dispatch('nameAsyn');
    modules：store的子模块，内容就相当于是store的一个实例。调用方式和前面介绍的相似，只是要加上当前子模块名，如：store.a.getters.xxx()。

## Vuex使用

    ├── index.html
    ├── main.js
    ├── components
    └── store
        ├── index.js          # 我们组装模块并导出 store 的地方
        ├── state.js          # 跟级别的 state
        ├── getters.js        # 跟级别的 getter
        ├── mutation-types.js # 根级别的mutations名称（官方推荐mutions方法名使用大写）
        ├── mutations.js      # 根级别的 mutation
        ├── actions.js        # 根级别的 action
        └── modules
            ├── m1.js         # 模块1
            └── m2.js         # 模块2

## 实例

> state.js示例
```js
/*
 * 全局存储状态
 */
const state = {
    token: '',
    expTime: '',
    availableQutoa: 0,
    creditQutoa: 0, 
}

export default state;
```
> getters.js示例（我们一般使用getters来获取state的状态，而不是直接使用state）：
```js
/*
 * 派生状态，即set、get中的get; 使用getters来获取state的状态
 */

export const token = (state) => {
    return state.token;
}

export const expTime = (state) => {
    return state.expTime;
}

export const availableQutoa = (state) => {
    return state.availableQutoa;
}

export const creditQutoa = (state) => {
    return state.creditQutoa;
}
```
> mutation-type.js示例（我们会将所有mutations的函数名放在这个文件里）
```js
/*
 * 将所有mutations的函数名放在这个文件里（官方推荐mutions方法名使用大写）
 */

export const SET_TOKEN = 'SET_TOKEN';

export const SET_EXPTIME = 'SET_EXPTIME';

export const SET_AVAILABLEQUTOA = 'SET_AVAILABLEQUTOA';

export const SET_CREDITQUTOA = 'SET_CREDITQUTOA'
```
> mutations.js示例：
```js
/*
 * 提交状态修改，即set、get中的set; 是Vuex中唯一修改state的方式 不支持异步操作
 */

import * as types from './mutation-types';

export default {

    [types.SET_TOKEN](state,token) {
        state.token = token;
    },

    [types.SET_EXPTIME](state,expTime) {
        state.expTime = expTime;
    },

    [types.SET_AVAILABLEQUTOA](state,availableQutoa) {
        state.availableQutoa = availableQutoa;
    },

    [types.SET_CREDITQUTOA](state,creditQutoa) {
        state.creditQutoa = creditQutoa;
    }
}
```
> actions.js示例（异步操作）
```js
import * as types from './mutation-types.js'

export default {
    tokenAsyn({commit}, {token}) {
        commit(types.SET_TOKEN, token); //修改token
    },
    expTimeAsyn({commit}, {expTime}) {
        commit(types.SET_EXPTIME, expTime); //修改token过期时间
    },
    availableQutoaAsyn({commit},{availableQutoa}) {
        commit(types.SET_AVAILABLEQUTOA,availableQutoa) //修改可借额度
    },
    creditQutoaAsyn({commit},{creditQutoa}) {
        commit(types.SET_CREDITQUTOA,creditQutoa) //修改授信额度
    },
};
```
> 模块的使用modules--m1.js示例
```js
const m1 = {
                namespaced: true, //指定命名空间，模块化
                state: {
                    token：''
                },
                getters: {
                    token: (state) => {
                        return state.token;
                    }
                },
                mutations: {
                    SET_TOKEN(state,token) {
                        state.token = token;
                    },
                },
                actions: {
                    tokenAsyn({commit}, {token}) {
                        commit('SET_TOKEN', token); //修改token
                    },
                }
            };
export default m1;
```
> index.js示例（组装vuex）：
```js
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import * as getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
import m1 from './modules/m1.js';
import m2 from './modules/m2.js';
import createLogger from 'vuex/dist/logger' //修改日志

Vue.use(Vuex);

const debug = process.env.NODE_ENV === 'development'  // 开发环境中为true，否则为false

export default new Vuex.Store({
    //strict: true, 
    strict: process.env.NODE_ENV !== 'production'  //严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
    state,
    getters,
    mutations,
    actions,
    module: {
        m1: m1,
        m2: m2,
    }
    plugins: debug ? [createLogger()] : [] //开发环境下显示vuex的状态修改
})
```
> store实例挂载到main.js里面的vue上
```js
import store from './store/index.js'
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
```
在vue组件中使用时，我们通常会使用mapGetters、mapActions、mapMutations，然后就可以按照vue调用methods和computed的方式去调用这些变量或函数，示例如下：
```js
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
            ...mapGetters([
                'token', //包银项目token
                'expTime', //token过期时间
                'token': 'm1/token'  //m1 模块 token
            ])
    },
    methods: {
        ...mapActions([
                'tokenAsyn',
                'expTimeAsyn',
        ]),
        //获取包银项目token
        _requestBsbToken() {
            let config = {
                contentType : 'application/x-www-form-urlencoded',
                showWait: false,
            }
            requestBsbToken({},config).then(res => {
                let {code,msg,result} = res;
                if(200 !== code) {
                    Toast(msg);
                    return;
                }
                let token = result['access_token'],
                    saveToen = token.split('.').slice(1,2).join(''),
                    userInfo = JSON.parse(Base64.decode(saveToen)),
                    expTime = userInfo['exp'];
                this.tokenAsyn({token}); //修改token
                this.expTimeAsyn({expTime})  //修改token过期时间
                this._queryCredit();
            }).catch(error => {
                console.log(error)
            })
        },
    }
}
```
在外部JS文件中使用
```js
import store from '../store/index.js'

let token = store.state.token || ''; //获取
store.dispatch('expTimeAsyn',{expTime}) //改变
```

## 引文：
- `https://www.jianshu.com/p/3be7f9bace3d`
