'use strict';

var gulp = require('gulp'),
      concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        rename =  require('gulp-rename'),
        sass = require('gulp-sass'),
        maps = require('gulp-sourcemaps'),
        del = require('del');

gulp.task("concatScripts", function() {
  return gulp.src(['js/jquery.js', 'js/sticky/jquery.sticky.js', 'js/main.js'])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write('./'))
    .pipe(gulp.dest("js")
  );
});

gulp.task("minifyScripts", ['concatScripts'], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe( gulp.dest('js'));
}); // add return to concatScripts as a 'promise' (for dependencies)

gulp.task('compileSass', function() {
  return gulp.src('scss/application.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css')); // write pat relative to output dir

});

// don't need return statement if no dependencies
gulp.task('watchFiles', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
  // globbing pattern
  
  gulp.watch('js/main.js', ['concatScripts']);
});

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

// 'same' syn unless dependencies, can exclude them
gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src(["css/application.css", "js/app.min.js", "index.html",
                      "img/**", "fonts/**"], { base: './'})
          .pipe(gulp.dest('dist'));
}); // is the base folder dependent on how the files are included or the folders

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {

  gulp.start('build'); // change in gulp 4 ? hi

});