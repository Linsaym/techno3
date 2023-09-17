import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import sassGlob from 'gulp-sass-glob';
import server from 'gulp-server-livereload';
import clean from 'gulp-clean';
import fs from 'fs';
import sourceMaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';
import webpackConfig from './../webpack.config.js';
// import babel from 'gulp-babel';
// import imageMin from 'gulp-imagemin';
import changed from 'gulp-changed';

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


gulp.task('clean:dev', function (done) {
    if (fs.existsSync('./build/')) {
        return gulp.src('./build/', {read: false})
            .pipe(clean());
    }
    done();
})

gulp.task('html:dev', function () {
    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./build/', { hasChanged: changed.compareContents }))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./build/'));
});

gulp.task('scss:dev', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(changed('./build/css/'))
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(scss())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('js:dev', function () {
    return gulp.src('./src/js/*.js')
        .pipe(changed('./build/js/'))
        .pipe(plumber(plumberNotify('JS')))
        // .pipe(babel())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./build/js'));
})

gulp.task('images:dev', function () {
    return gulp.src('./src/img/**/*')
        .pipe(changed('./build/img/'))
        // .pipe(imageMin({ verbose: true }))
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts:dev', function () {
    return gulp.src('./src/fonts/**/*')
        .pipe(changed('./build/fonts/'))
        .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('files:dev', function () {
    return gulp.src('./src/files/**/*')
        .pipe(changed('./build/files/'))
        .pipe(gulp.dest('./build/files/'));
});

gulp.task('server:dev', function () {
    return gulp.src('./build/')
        .pipe(server(serverSettings));
})

gulp.task('watch:dev', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss:dev'));
    gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('./src/img/**/*', gulp.parallel('images:dev'))
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'))
    gulp.watch('./src/files/**/*', gulp.parallel('files:dev'))
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'))
})