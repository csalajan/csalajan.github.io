var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');

gulp.task('Default', ['Scripts']);

gulp.task('Scripts', function() {
    gulp.src([
        './src/system/*.js',
        './src/Objects/*.js',
        './src/Scenes/*.js',
        './src/Game.js'
        ])
        .pipe(concat('production.js'))
        .pipe(gulp.dest('./js/'))
        .pipe(rename('production.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});

gulp.task('Watch', function() {
    gulp.watch('./src/**/*.js', ['Scripts']);
});