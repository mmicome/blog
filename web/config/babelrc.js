// 转换 JSX 语法
npm install --save-dev @babel/preset-react
//o include the polyfill you need to require it at the top of the entry point to your application.
//Make sure it is called before all other code/require statements!
npm install --save @babel/polyfill
npm install --save-dev @babel/preset-env


presets: ["@babel/preset-react"]
eslint: {
    options: {
        quiet: false,
        //  configFile: 'eslint.json',
        //  可以将Eslint的规则配置内容放置在此文件中
        //  但测试发现，eslintrc完全可以配置所有内容
        outputFile: 'eslint.log',   //  eslint检查结果的输出日志
        useEslintrc: true   //  启用eslintrc文件，非常重要
    },
    all: {
        files: {
            src: ['src/es6/**/*.js']  // 需要校验的文件
        }
    },
    //  target: ['Gruntfile.js']
}

//相关： https://www.babeljs.cn/docs/config-files
