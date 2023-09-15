import gulp from 'gulp';

import * as dev from './gulp/dev.js';

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'scss', 'images', 'fonts', 'files', 'js'),
    gulp.parallel('server', 'watch'),
))