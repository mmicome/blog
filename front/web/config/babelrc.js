// 转换 JSX 语法
npm install --save-dev @babel/preset-react
//https://www.babeljs.cn/docs/babel-polyfill
//o include the polyfill you need to require it at the top of the entry point to your application.
//Make sure it is called before all other code/require statements!
npm install --save @babel/polyfill
npm install --save-dev @babel/preset-env

//If useBuiltIns: 'usage' is specified in .babelrc then do not include @babel/polyfill in either 
// webpack.config.js entry array nor source. Note, @babel/polyfill still needs to be installed.
presets: ["@babel/preset-react"，["@babel/preset-env", {
    "useBuiltIns": "usage",
    "corejs": 3
  }]],
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
