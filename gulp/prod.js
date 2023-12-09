import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import sassGlob from 'gulp-sass-glob';
import server from 'gulp-server-livereload';
import clean from 'gulp-clean';
import fs from 'fs';
import groupMedia from 'gulp-group-css-media-queries';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';
import webpackConfig from './../webpack.config.js';
import babel from 'gulp-babel';
import imageMin from 'gulp-imagemin';
import changed from 'gulp-changed';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import htmlclean from 'gulp-htmlclean';
import webp from 'gulp-webp';
import webpHTML from 'gulp-webp-html';
import webpCSS from 'gulp-webp-css';

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


gulp.task('clean:prod', function (done) {
    if (fs.existsSync('./prod/')) {
        return gulp.src('./prod/', {read: false})
            .pipe(clean());
    }
    done();
})

gulp.task('html:prod', function () {
    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./prod/'))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(webpHTML())
        .pipe(htmlclean())
        .pipe(gulp.dest('./prod/'));
});

gulp.task('scss:prod', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(changed('./prod/css/'))
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(autoprefixer())
        .pipe(sassGlob())
        .pipe(webpCSS())
        .pipe(groupMedia())
        .pipe(scss())
        .pipe(csso())
        .pipe(gulp.dest('./prod/css/'));
});

gulp.task('js:prod', function () {
    return gulp.src('./src/js/*.js')
        .pipe(changed('./prod/js/'))
        .pipe(plumber(plumberNotify('JS')))
        .pipe(babel())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./prod/js'));
})

gulp.task('images:prod', function () {
    return gulp.src('./src/img/**/*')
        .pipe(changed('./prod/img/'))
        .pipe(webp())
        .pipe(gulp.dest('./prod/img/'))

        .pipe(gulp.src('./src/img/**/*'))
        .pipe(changed('./prod/img/'))
        .pipe(imageMin({ verbose: true }))
        .pipe(gulp.dest('./prod/img/'));
});

gulp.task('fonts:prod', function () {
    return gulp.src('./src/fonts/**/*')
        .pipe(changed('./prod/fonts/'))
        .pipe(gulp.dest('./prod/fonts/'));
});

gulp.task('files:prod', function () {
    return gulp.src('./src/files/**/*')
        .pipe(changed('./prod/files/'))
        .pipe(gulp.dest('./prod/files/'));
});

gulp.task('server:prod', function () {
    return gulp.src('./prod/')
        .pipe(server(serverSettings));
})