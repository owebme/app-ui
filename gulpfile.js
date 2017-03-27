var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var base64 = require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var riot = require('gulp-riot');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var px2vw = require('gulp-px2vw');
var gs = require('gulp-selectors');
var combiner = require('stream-combiner2').obj;
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('css', function() {
	return combiner(
		gulp.src('assets/css/style.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        // base64({
        //     baseDir: './',
        //     extensions: ['svg', 'png', 'jpg'],
        //     maxImageSize: 16*1024, // bytes
        //     debug: false
        // }),
		gulp.dest('assets/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('styleguide', function() {
	return combiner(
		gulp.src('assets/css/styleguide.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: './',
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		gulp.dest('assets/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('serve', function() {
	browserSync.init({
		open: false,
		notify: false,
		watchOptions: {
	        usePolling: true
	    },
		proxy: "http://localhost:8090/"
		// server: {
		// 	baseDir: "./"
		// }
	});
});

gulp.task('watch', function() {
	browserSync.watch([
		'assets/js/*.js',
		'assets/js/**/*.js',
		'assets/templates/*.html',
		'assets/templates/**/*.html',
		'views/*.html'
	]).on('change', reload);

	gulp.watch([
		'assets/css/style.scss',
		'assets/css/**/*.scss'
	], gulp.parallel('css'));
});

gulp.task('watchStyleguide', function() {
	browserSync.watch([
		'assets/styleguide/**/*.html',
		'assets/styleguide/root.html',
		'styleguide.html'
	]).on('change', reload);

	gulp.watch([
		'assets/css/styleguide.scss',
		'assets/css/**/*.scss'
	], gulp.parallel('styleguide'));
});

gulp.task('styleguide', gulp.series(
	gulp.parallel('styleguide'),
	gulp.parallel('serve', 'watchStyleguide')
));

gulp.task('dev', gulp.series(
	gulp.parallel('css'),
	gulp.parallel('serve', 'watch')
));
