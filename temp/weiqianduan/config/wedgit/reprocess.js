var fs = require('fs');
var resolve = require('path').resolve;
var basename = require('path').basename;

var widgetsConf = require('./widgets.conf.js');
var widgets = widgetsConf.paths;
var out = widgetsConf.out;
var js = widgetsConf.js;
var localePath = resolve(__dirname, out);
var fileList = fs.readdirSync(localePath);
var includes = [];

widgets.forEach(item => {
  if (item) {
    var m = item.match(/(\w+)\.vue$/);
    if (!m || m.length !== 2) {
      console.log('widget 路径定义格式不正确，请以.vue结尾！');
    } else {
      var entryName = m[1] + '.js';
      includes.push(entryName);
    }
  } else {
    console.error('widget 路径定义不可为空！');
  }
});
fileList.filter(function(file) {
  return includes.indexOf(file) > -1;
}).forEach(function(file) {
  let filepath = resolve(localePath, file);
  var name = basename(file, '.js');
  fs.readFile(filepath, {encoding: "utf-8"}, function(err, fr) {
    if (err) {
      console.log(err);
     }else {
      var buffer = fr.replace(/{/, "{__webpack_require__.scope=window['" + name +"_domainscope'];")
      .replace(/return __webpack_require__\.p/, "return __webpack_require__.scope + '" + js + "' + __webpack_require__.p");
      fs.writeFile(filepath, buffer, 'utf8', (err) => {
          if (err) throw err;
          console.log('success done');
      });
     }
  })
})
