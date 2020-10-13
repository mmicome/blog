var path = require('path');

module.exports = {
    prefix: '', // 可以指定特定的前缀，防止注册的组件名称发生冲突
    paths: [ // 指定需要发布的组件路径
        // '../src/components/remotetest.vue',
        '../src/main.js',
        // '../src/App.vue',
        // '../src/views/Home.vue',
        // '../src/views/About.vue',
        // '../src/views/Self.vue'
        // '../apps/hello/a.vue'
    ],
    out: '../public/apps/', // 指定放置发布文件(.js)的目录，即远程访问的目录
    js: 'js/',
    css: 'css/',
    img: 'imgs/',
    remote: 'apps/',
    npm: 'chunk/npm/',
    domain: 'http://10.188.196.156:3000/',
    alias: { // 如果组件中使用了alias，需要在此处指定
        '@': path.resolve(__dirname, '../src')
    }
};
