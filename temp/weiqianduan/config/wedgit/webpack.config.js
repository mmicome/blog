var path = require('path');
var fs = require('fs');
const {
  VueLoaderPlugin
} = require('vue-loader')
var widgetsConf = require('./widgets.conf.js');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var prefix = widgetsConf.prefix || '';
var widgets = widgetsConf.paths;
var outPath = path.resolve(__dirname, widgetsConf.out);
console.log(outPath)
var js = widgetsConf.out + widgetsConf.js;
// var css = path.resolve(__dirname,  widgetsConf.out + widgetsConf.css);
css = widgetsConf.domain + widgetsConf.remote
console.log(css)
var img = widgetsConf.img;
var alias = widgetsConf.alias;

var entries = {};
var includes = [];

var tmpDir = path.resolve(__dirname, 'tmp');
process.env.NODE_ENV = 'production'
// 删除目录
var deleteFolderRecursive = function (fpath) {
  var files = [];
  if (fs.existsSync(fpath)) {
    files = fs.readdirSync(fpath);
    files.forEach(function (file, index) {
      var curPath = fpath + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(fpath);
  }
};

if (fs.existsSync(tmpDir)) { // 重建临时目录
  deleteFolderRecursive(tmpDir);
}
if (fs.existsSync(outPath)) { // 重建临时目录
  deleteFolderRecursive(outPath);
}
fs.mkdirSync(tmpDir);

// 创建临时入口文件
var makeEntryVue = function (pre, entryName, filePath) {
  var compName = pre + entryName;
  var tmpPath = path.resolve(tmpDir, entryName + '.js');
  var content = '(function(SVue){SVue.component("' + compName + '", require("../' + filePath + '").default)})(Vue);';
  fs.writeFileSync(tmpPath, content, 'utf-8');
  return tmpPath;
};
// 创建临时入口文件
var makeEntryJs = function (filePath) {
  return path.resolve(__dirname, filePath);
};

// 构造webpack打包需要的entry文件（临时）和include数组
if (!widgets || widgets.length === 0) {
  console.warn('未指定需要导出的 widget 路径 ！');
} else {
  widgets.forEach(item => {
    if (item) {
      var cmp = item.match(/(\w+)\.vue$/);
      var app = item.match(/(\w+)\.js$/);
      if (cmp && cmp.length === 2) {
        var entryName = cmp[1];
        var entryFile = makeEntryVue(prefix, entryName, item);
        includes.push(entryFile);
        entries[entryName] = entryFile;
      } else if (app && app.length === 2) {
        var entryName = app[1];
        var entryFile = makeEntryJs(item);
        includes.push(entryFile);
        entries[entryName] = entryFile;
      } else {
        console.log('widget 路径定义格式不正确');
      }
    } else {
      console.error('widget 路径定义不可为空！');
    }
  });
}
// let entries1 = {};
// entries['app'] = path.resolve(__dirname, '../src/main.js');
module.exports = {
  // 'devtool': 'source-map',
  'mode': "development",
  'entry': entries,
  'output': {
    'path': outPath,
    'filename': '[name].js',
    'chunkFilename': 'chunk/[name].[chunkhash:6].js',
    'publicPath': ''
  },
  'resolve': {
    'extensions': ['.js', '.vue'],
    'alias': alias
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 20000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `/npm/npm.${packageName.replace('@', '')}`
          }
        },
        style: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        }
      }
    },
  },
  'module': {
    'rules': [{
        'test': /\.vue$/,
        'loader': 'vue-loader',
      },
      {
        'test': /\.js$/,
        'loader': 'babel-loader',
        'include': includes
      },
      {
        'test': /\.css$/,
        'use': [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: css,
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader']
      },
      {
        'test': /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        'loader': 'file-loader',
        'options': {
          'outputPath': img,
          'publicPath': widgetsConf.domain + widgetsConf.remote + img,
          'name': '[name].[ext]',
          'esModule': false,
          // postTransformPublicPath: (p) => `__webpack_require__.scope + ${p}`
        }
      }
    ]
  },
  'plugins': [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/chunk/[name].css'
    }),
    new CompressionPlugin()
  ]
};
