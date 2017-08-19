'use strict';

import gulp from 'gulp';
import watch from 'gulp-watch';
import scp from 'gulp-scp2';
import notify from 'gulp-notify';

/******************************
 * Default task
 ******************************/
gulp.task('default', [
	'copy',
	'watch'
]);

/******************************
 * Watch
 ******************************/
gulp.task('watch', () => {
	gulp.watch(['**/*.js'], ['copy']);
});

gulp.task('copy', function () {
	return gulp.src(['app/**/*.js', 'package.json'])
	.pipe(scp({
		host: '192.168.0.104',
		username: 'pi',
		password: '0000',
		dest: '/home/pi/www/smart-led'
	}))
	.on('error', notify.onError(function (error) {
		return error.message;
	}));
})