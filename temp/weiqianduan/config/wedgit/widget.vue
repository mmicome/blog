<template>
  <div>
    <component :is='app' :context-path='path' @widget-active='widgetActive'></component>
  </div>
</template>

<script>
  // import Vue from 'vue';
  // import router from 'src/router';
  import $ from 'jquery'
  // let _ = Vue.util;

  let _cachedApp = {};

  let _loadScript = (url, callback) => {
    $.ajax(url).done((data) => {
      try {
        let host = url.match(/https{0,1}:\/\/[\d\w.:]+(\/#)*/);
        host = host ? host[0] + '/' : '';
        window['remotetest_domainscope'] = host
        // data = data.replace(/{/, "{__webpack_require__.scope='"+ host +"';");
        eval(data); // eslint-disable-line
        let compNames = data.match(/SVue\.component\(\\"(\w+)\\"/);
        if (!compNames || compNames.length !== 2) {
          console.error('无法获取 widget 注册名称！');
          callback(false);
        } else {
          // 成功注册组件，返回组件名称
          callback(true, compNames[1]);
        }
      } catch (e) {
        console.error('加载远程 widget 失败', e);
        callback(false);
      }
    }).fail(() => {
      console.error('请求远程 widget 失败');
      callback(false);
    });
  };

  let _loadWidget = (vm) => {
    let dfd = $.Deferred();

    let widgetUrl = vm.url;

    // 已经加载过的app，可以直接使用
    if (_cachedApp[widgetUrl]) {
      vm.app = _cachedApp[widgetUrl];
      dfd.resolve();
      return dfd.promise();
    }

    _loadScript(widgetUrl, (success, compName) => {
      if (!success) {
        return;
      }

      vm.app = compName;
      _cachedApp[widgetUrl] = compName;
      dfd.resolve();
    });

    return dfd.promise();
  };

  export default {
    /**
     * @property {String} url 远程组件加载地址
     */
    props: {
      url: String
    },
    data() {
      return {
        fullPath: '',
        path: '',
        app: null
      };
    },
    methods: {
      widgetActive(routes) {
        let router = this.$router;
        // console.log(this.$router);
        // debugger
        let matched = router._currentTransition.to.matched;

        let len = matched.length;
        let segments = [];
        for (let i = 0; i < len; i++) {
          segments.push({
            path: matched[i].handler.path,
            handler: matched[i].handler
          });
        }

        for (let path in routes) {
          let handler = routes[path];
          router._addRoute(path, handler, $.extend([], segments));
        }
      }
    },
    created() {
      // this.path = this.$route.path;
      this.path = this.url
      // console.log(this.$router);
    },
    mounted() {
      _loadWidget(this).done(() => {
        // done();
      });
    }
    // route: {
    //     activate (transition) {
    //         let matched = transition.to.matched;
    //         this.fullPath = matched[matched.length - 1].handler.fullPath;
    //         transition.next();
    //     },
    //     data (transition) {
    //         let appId = transition.to.params.id;
    //         // let name = appId;
    //         this.path = this.fullPath.replace(':id', appId);
    //     }
    // }
  };
</script>
