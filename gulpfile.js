var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var concat = require('gulp-concat');
var browserify = require('browserify');
var react = require('gulp-react');
var source = require('vinyl-source-stream');
var connect = require('connect');
var livereload = require('gulp-livereload');
// var es6ify = require('es6ify');
// var coffeeify = require('coffeeify');
// var reactify = require('reactify');
// var webpack = require('webpack');
// var webpackDevServer = require('webpack-dev-server');
var path = require('path');

// var webpackConfig = require('./webpack.config.js');

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./dist/'))
  .pipe(livereload());
});

gulp.task('browserify', function() {
  return browserify({
    entries: ['./src/scripts/app.coffee'],
    extensions: ['', '.js', '.coffee', 'jsx'],
    paths: [
      './src/scripts/',
      './src/',
      './vendor/',
      './bower_components/',
      './node_modules/',
    ],
  })
  .bundle({debug: true})
  .pipe(source('app.js'))
  .pipe(gulp.dest('./dist/js/'))
  .pipe(livereload());
});

gulp.task('less', function() {
  return gulp.src('./src/styles/**/*.less')
  .pipe(less())
  .pipe(concat('app.css'))
  .pipe(gulp.dest('./dist/css/'))
  .pipe(livereload());
});

gulp.task('scripts', ['browserify']);

gulp.task('styles', ['less']);

gulp.task('build', ['html', 'scripts', 'styles']);

gulp.task('server', function() {
  var server = connect();
  server.use(connect.static('./dist/'));
  server.listen(8080);
  // var compiler = webpack(webpackConfig);
  // var server = new webpackDevServer(compiler, {});
  // server.listen(8080, 'localhost');
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/scripts/**', ['scripts']);
  gulp.watch('./src/styles/**', ['styles']);
});

// gulp.task('default', ['server']);
gulp.task('default', ['build', 'server', 'watch']);
