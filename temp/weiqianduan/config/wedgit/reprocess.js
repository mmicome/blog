var fs = require('fs');
var resolve = require('path').resolve;
var basename = require('path').basename;

var widgetsConf = require('./widgets.conf.js');
var widgets = widgetsConf.paths;
var out = resolve(__dirname, widgetsConf.out);
var npm = resolve(__dirname, widgetsConf.out + widgetsConf.npm);
var css = resolve(__dirname, widgetsConf.out + widgetsConf.css);
var js = widgetsConf.remote;
var fileList = fs.readdirSync(out);
var npmList = fs.readdirSync(npm);
var cssList = fs.readdirSync(css);
var includes = [];

widgets.forEach(item => {
  var m = item.match(/(\w+)\.(vue|js)$/);
  var entryName = m[1] + '.js';
  includes.push(entryName);
});
fileList.filter(function(file) {
  return includes.indexOf(file) > -1;
}).forEach(function(file) {
  let filepath = resolve(out, file);
  var name = basename(file, '.js');
  fs.readFile(filepath, {encoding: "utf-8"}, function(err, fr) {
    if (err) {
      console.log(err);
     }else {
      var buffer = fr.replace(/{/, "{__webpack_require__.scope='" + widgetsConf.domain +"';")
      .replace(/return __webpack_require__\.p/, "return __webpack_require__.scope + '" + js + "' + __webpack_require__.p")
      .replace(/fullhref = __webpack_require__.p/, "fullhref =  __webpack_require__.scope + '" + js + "' + __webpack_require__.p");//
      fs.writeFile(filepath, buffer, 'utf8', (err) => {
          if (err) throw err;
          console.log('success done');
      });
     }
  })
})
let common = []
npmList.forEach(function(file) {
  // if (cssList.indexOf)
  // var m = (file).match(/(\w+)\.(css|js)$/);
  common.push(widgetsConf.domain + widgetsConf.remote + widgetsConf.npm + file)
})
cssList.forEach(function(file) {
  // if (cssList.indexOf)
  // var m = (file).match(/(\w+)\.(css|js)$/);
  common.push(widgetsConf.domain + widgetsConf.remote + widgetsConf.css + file)
})
common.push(widgetsConf.domain + widgetsConf.remote + 'chunk/styles.b13981.js')
fs.writeFileSync(resolve(out, 'common.json'), JSON.stringify(common), 'utf-8');
