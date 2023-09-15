import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import gulpSass from 'gulp-sass';
import * as sass from 'sass'

const scss = gulpSass(sass);

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file',
};

gulp.task('includeFiles', function () {
    return gulp.src('./src/*.html')
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scss', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./dist/css/'))
});