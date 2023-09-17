import gulp from 'gulp';

import * as dev from './gulp/dev.js';
import * as prod from './gulp/prod.js';

gulp.task('default', gulp.series(
    'clean:dev',
    gulp.parallel('html:dev', 'scss:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
    gulp.parallel('server:dev', 'watch:dev'),
))

gulp.task('prod', gulp.series(
    'clean:prod',
    gulp.parallel('html:prod', 'scss:prod', 'images:prod', 'fonts:prod', 'files:prod', 'js:prod'),
    gulp.parallel('server:prod'),
))