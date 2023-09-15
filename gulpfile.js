import gulp from 'gulp';
import fileInclude from 'gulp-file-include'

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file',
};

gulp.task('includeFiles', function () {
    return gulp.src('./src/*.html')
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'));
});