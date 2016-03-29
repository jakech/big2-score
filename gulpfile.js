var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// Clean
gulp.task('clean', function() {
  del.sync(['./public/**/*.*', '!./public/index.html']);
});

// HTML
function html() {
  return gulp.src('app/pages/*.html')
    .pipe(gulp.dest('public/pages'));
}

gulp.task('html', ['clean'], html);
gulp.task('html-watch', html);

// JS
function scripts() {
  return gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/scripts'));
}
gulp.task('js', ['clean'], scripts);
gulp.task('js-watch', ['js'], scripts);


// Vendors
gulp.task('bootstrap', ['clean'], function() {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('public/styles'));

  gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('tachyons', ['clean'], function() {
  gulp.src('node_modules/tachyons/css/tachyons.min.css')
    .pipe(gulp.dest('public/styles'));
});


gulp.task('vendors', ['bootstrap', 'tachyons'], function() {
  gulp.src([
    'node_modules/underscore/underscore-min.js',
    'node_modules/chance/dist/chance.min.js',
    'node_modules/angular/angular.js',
    'node_modules/ui-router/release/angular-ui-router.js',
  ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest('public/scripts'));
});

// Build
gulp.task('build', ['vendors', 'js', 'html']);

// Main
gulp.task('default', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  gulp.watch('app/pages/*.html', ['html-watch']);
  gulp.watch('app/**/*.js', ['js-watch']);
  gulp.watch(['public'], browserSync.reload);
});

// Deploy
gulp.task('deploy', ['build'], shell.task([
  'git checkout -b dist',
  'git add -f ./public',
  'git commit -m "Adding dist files"',
  'git push heroku dist:master --force',
  'git checkout master',
  'git branch -D dist'
]));