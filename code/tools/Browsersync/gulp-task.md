## 基本用法
```js
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync.init({
        files: "**",
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', gulp.series("browser-sync"));
```
