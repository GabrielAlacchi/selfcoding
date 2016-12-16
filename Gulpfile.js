// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var webpack = require('webpack-stream');

const isProduction = process.env.NODE_ENV == 'production';

const SOURCE = {
  js: "./src/js/**/*.js",
  css: "./src/css/**/*.css",
  html: "./src/*.html",
  images: "./images/**/*"
};

//Plumber function to end a pipe if an error is caught
function onError(err) {
  console.error(err);

  //End the stream
  this.emit('end');
}

// keep a count of the times a task refires
// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('bundle', function () {
  return gulp.src(SOURCE.js)
    .pipe(webpack( require('./webpack.config.js') ))
    .on('error', onError)
    .pipe(gulp.dest('./build/src'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

gulp.task('html', function () {
  return gulp.src(SOURCE.html)
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

gulp.task('images', function () {
  return gulp.src(SOURCE.images)
    .pipe(imagemin())
    .on('error', onError)
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

//To use sass switch to using gulp-sass
gulp.task('style', function() {
  return gulp.src(SOURCE.css)
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

gulp.task('watch', function () {

  if (isProduction)
    return null;

  browserSync.init({
    proxy: 'localhost:3000'
  });

  gulp.watch([SOURCE.js], ['bundle']);
  gulp.watch([SOURCE.images], ['images']);
  gulp.watch([SOURCE.css], ['style']);
  gulp.watch([SOURCE.html], ['html']);

});

gulp.task('build', ['bundle', 'html', 'images', 'style']);

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['build', 'watch']);