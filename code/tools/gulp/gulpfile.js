
//js压缩，合并，重命名任务
let gulp = require('gulp');
let concat = require('gulp-concat');  // 合并
let uglify = require('gulp-uglify');  // 压缩
let rename = require('gulp-rename');  // 重命名

 let eslint = require('gulp-eslint');  //使用 eslint 或 jshint
 let jshint = require('gulp-jshint');  // 注意需要同时安装 jshint
 gulp.task('scripts', function() {  // 这个任务的名称是 scripts
 gulp.src('src/js/*.js')  // 将 src/js/ 目录下的所有 js 文件合并
     .pipe(jshint())
     .pipe(jshint.reporter('default'))
     .pipe(concat('all.js'))  // 指定合并后的文件名为 all.js
     .pipe(gulp.dest('dist/js/'))  // 保存合并后的文件
     .pipe(uglify())  // 压缩
     .pipe(rename('all.min.js'))  // 重命名
     .pipe(rename({suffix: '.min'}))  // 和上一行等效
     .pipe(gulp.dest('dist/js/'));
});

//sass编译
let gulp = require('gulp');
let sass = require('gulp-sass');  // sass -> css
let prefixer = require('gulp-autoprefixer');  // 增加前缀
let minify = require('gulp-minify-css');  // css 压缩
let notify = require('gulp-notify');  // 打印提醒语句
let concat = require('gulp-concat');  // 合并

// 编译Sass
 gulp.task('css', function() {  // 任务名
 gulp.src('sass/*.scss')  // 目标 sass 文件
      .pipe(sass())  // sass -> css
      .pipe(prefixer('last 2 versions'))  // 参数配置参考 <https://github.com/ai/browserslist>
      .pipe(minify())  // 压缩
      .pipe(gulp.dest('css'))  // 目标目录
      .pipe(notify({message: 'done'}))
      .pipe(concat('all.min.css'))  // 合并
      .pipe(gulp.dest('css'));  // 目标目录
});

//图片压缩
let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let cache = require('gulp-cache');  // 减少重复压缩

gulp.task('images', function() {
    gulp.src('src/images/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images/'));
});

//监控文件
gulp.task('watch', function() {  // 指定任务名为 watch
    gulp.watch('src/sass/a.scss', ['sass']);// 监控 a.scss 文件，如果有修改，则执行 sass 任务
});

//删除文件
let gulp = require('gulp');
let clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src(['dist/js/*', 'dist/sass/*', 'dist/images/*'], {read: false})
    .pipe(clean());
});

//ES6->ES5 安装插件 npm install gulp-babel babel-preset-es2015 --save-dev
let gulp = require('gulp');
let babel = require('gulp-babel');

gulp.task('scripts', function() {
    gulp.src('src/js/a.js')
        .pipe(babel({  // es6 -> es5
       presets: ['es2015']
}))
        .pipe(gulp.dest('dist/js/'))
});
