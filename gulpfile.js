'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    pngquant = require('imagemin-pngquant'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/styles/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    static: 'build/static/'
  },
  src: {
    html: 'src/templates/index.html',
    js: 'src/js/*.js',
    style: 'src/styles/**/*.*',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    static: 'build/static/**/*.*'
  },
  watch: {
    html: 'src/templates/*.html',
    js: 'src/js/*.js',
    style: 'src/styles/**/*.*',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    static: 'build/static/**/*.*'
  },
  clean: './build'
};
var config = {
  server: {
    baseDir: "./build/"
  },
  tunnel: true,
  host: 'localhost',
  port: 7700,
  logPrefix: "newProject"
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});
gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});
gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(concatCss("style.css"))
    //.pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});
gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});
gulp.task('static:build', function() {
  gulp.src(path.src.static)
    .pipe(gulp.dest(path.build.static))
});
gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build',
  'static:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
  watch([path.watch.static], function(event, cb) {
    gulp.start('static:build');
  });
});
gulp.task('webserver', function () {
  browserSync(config);
});
gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
  
  
  