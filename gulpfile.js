const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require("gulp-concat");
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const livereload = require('gulp-livereload');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('scripts', () => {
    gulp.src(['src/js/*.js'])
    .pipe(concat('app.js'))
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('template', () => {
    return gulp.src('src/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dist/html'));
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/jade/*.jade', ['template']);
});
