const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-minify-css');
gulp.task('build', async() => {
  gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'));
});