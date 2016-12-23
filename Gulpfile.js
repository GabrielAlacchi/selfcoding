/*eslint-env node */

// declarations, dependencies
// ----------------------------------------------------------------------------
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');

const isProduction = process.env.NODE_ENV == 'production';

const SOURCE = {
  js: './src/js/**/*.js',
  css: './src/css/**/*.css',
  html: './src/*.html',
  images: './images/**/*'
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

// Compiles javascript using webpack stream.
gulp.task('bundle', function () {
  return gulp.src(SOURCE.js)
    .pipe(webpack( require('./webpack.config.js') ))
    .on('error', onError)
    .pipe(gulp.dest('./build/src'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

// Pipes html to build folder.
gulp.task('html', function () {
  return gulp.src(SOURCE.html)
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

// Uses image min to pipe and minify images to the build folder.
gulp.task('images', function () {
  return gulp.src(SOURCE.images)
    .pipe(imagemin())
    .on('error', onError)
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

// Pipes CSS to build folder.
gulp.task('style', function() {
  return gulp.src(SOURCE.css)
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
    .on('error', onError);
});

gulp.task('lint', function() {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(SOURCE.js)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

// Watch task.
gulp.task('watch', function () {

  if (isProduction)
    return null;

  browserSync.init({
    proxy: 'localhost:3000'
  });

  gulp.watch([SOURCE.js], ['lint', 'bundle']);
  gulp.watch([SOURCE.images], ['images']);
  gulp.watch([SOURCE.css], ['style']);
  gulp.watch([SOURCE.html], ['html']);

});

gulp.task('build', ['lint', 'bundle', 'html', 'images', 'style']);

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['build', 'watch']);