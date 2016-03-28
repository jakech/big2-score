var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('js', function () {
  return gulp.src('app/**/*.js')
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('bootstrap', function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('public/styles'));

  gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('angular', function() {
  gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/ui-router/release/angular-ui-router.js'
  ])
  .pipe(gulp.dest('public/scripts'));
});

gulp.task('default', function() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  gulp.watch('app/**/*.js', ['js-watch']);
});