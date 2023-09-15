import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import server from 'gulp-server-livereload';
import clean from 'gulp-clean';
import fs from 'fs';
import sourceMaps from 'gulp-sourcemaps';
// import groupMedia from 'gulp-group-css-media-queries';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import babel from 'gulp-babel';

const scss = gulpSass(sass);

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file',
};

const serverSettings = {
    livereload: true,
    open: true,
}

const plumberNotify = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%= error.message %>',
            sound: false,
        }),
    };
}


gulp.task('clean', function (done) {
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/', {read: false})
            .pipe(clean());
    }
    done();
})

gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scss', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(scss())
        // .pipe(groupMedia())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(plumber(plumberNotify('JS')))
        .pipe(babel())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/js'));
})

gulp.task('images', function () {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('files', function () {
    return gulp.src('./src/files/**/*')
        .pipe(gulp.dest('./dist/files/'));
});

gulp.task('server', function () {
    return gulp.src('./dist/')
        .pipe(server(serverSettings));
})

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('images'))
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'))
    gulp.watch('./src/files/**/*', gulp.parallel('files'))
    gulp.watch('./src/js/**/*.js', gulp.parallel('js'))
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'scss', 'images', 'fonts', 'files', 'js'),
    gulp.parallel('server', 'watch'),
))