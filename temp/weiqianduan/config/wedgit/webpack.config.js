var path = require('path');
var fs = require('fs');
const {
  VueLoaderPlugin
} = require('vue-loader')
var widgetsConf = require('./widgets.conf.js');
const CompressionPlugin = require('compression-webpack-plugin');
var prefix = widgetsConf.prefix || '';
var widgets = widgetsConf.paths;
var outPath = widgetsConf.out;
var js = widgetsConf.js;
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

fs.mkdirSync(tmpDir);

// 创建临时入口文件
var makeEntry = function (pre, entryName, filePath) {
  var compName = pre + entryName;
  var tmpPath = path.resolve(tmpDir, entryName + '.js');
  var content = '(function(SVue){SVue.component("' + compName + '", require("../' + filePath + '").default)})(Vue);';
  fs.writeFileSync(tmpPath, content, 'utf-8');
  return tmpPath;
};

// 构造webpack打包需要的entry文件（临时）和include数组
if (!widgets || widgets.length === 0) {
  console.warn('未指定需要导出的 widget 路径 ！');
} else {
  widgets.forEach(item => {
    if (item) {
      var m = item.match(/(\w+)\.vue$/);
      if (!m || m.length !== 2) {
        console.log('widget 路径定义格式不正确，请以.vue结尾！');
      } else {
        var entryName = m[1];
        var entryFile = makeEntry(prefix, entryName, item);
        // var realPath = path.resolve(__dirname, item);
        includes.push(entryFile);
        entries[entryName] = entryFile;
      }
    } else {
      console.error('widget 路径定义不可为空！');
    }
  });
}

module.exports = {
  // 'devtool': 'source-map',
  'mode': "development",
  'entry': entries,
  'output': {
    'path': path.resolve(__dirname, outPath),
    'filename': '[name].js',
    'publicPath': ''
  },
  'resolve': {
    'extensions': ['.js', '.vue'],
    // alias: alias
  },
  'module': {
    'rules': [
      {
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
        'loader': ['style-loader','css-loader']
      }, 
      {
        'test': /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        'loader': 'file-loader',
        'options': {
          // 'limit': 10000,
          'outputPath': img,
          'publicPath': js + img,
          'name': '[name].[ext]',
          'esModule': false,
          postTransformPublicPath: (p) => `__webpack_require__.scope + ${p}`
        }
      }
    ]
  },
  'plugins': [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new CompressionPlugin()
  ]
};
