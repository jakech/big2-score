var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();


// HTML
gulp.task('html', function() {
  return gulp.src('app/pages/*.html')
    .pipe(gulp.dest('public/pages'));
});
gulp.task('html-watch', ['html'], function(){
  browserSync.reload();
});

// JS
gulp.task('js', function () {
  return gulp.src('app/**/*.js')
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/scripts'));
});
gulp.task('js-watch', ['js'], function(){
  browserSync.reload();
});


// Vendors
gulp.task('bootstrap', function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('public/styles'));

  gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('vendors', function() {
  gulp.src([
    'node_modules/underscore/underscore-min.js',
    'node_modules/chance/dist/chance.min.js',
    'node_modules/angular/angular.js',
    'node_modules/ui-router/release/angular-ui-router.js',
  ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest('public/scripts'));
});

// Main
gulp.task('default', function() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  gulp.watch('app/pages/*.html', ['html-watch']);
  gulp.watch('app/**/*.js', ['js-watch']);
});