/* global require */
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	dest = 'dist';
	
function exec(cmd, options, fn) {
	var proc = require('child_process').exec,
		child = proc(cmd, options, fn);

	child.stdout.on('data', function (data) {
		console.log(data);
	});

	child.stderr.on('data', function (data) {
		console.log(data);
	});
}

function html() {
	var html2js = require('gulp-ng-html2js');
	
	var options = {
		moduleName: 'ngDatePicker',
		stripPrefix: 'directives'
	};
		
	gulp.src(['src/**/*.html'])
		.pipe(html2js(options))
		.pipe(concat('date-picker.templates.js'))
		.pipe(gulp.dest(dest));
}

gulp.task('html', html);

function styles() {
	var less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer');
	
	gulp.src(['src/assets.less'])
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(concat('date-picker.css'))
		.pipe(gulp.dest(dest));
		
	gulp.src(['src/**/*.less'])
		.pipe(gulp.dest(dest));
}

gulp.task('styles', styles);

function typescript(callback, watch) {
	var watchFlag = watch ? ' -w' : '';
	exec('tsc' + watchFlag + ' -p src', null, callback);
}

gulp.task('typescript', ['tsd:install', 'tsgen'], function (callback) {
	typescript(callback);
});

gulp.task('typescript', typescript);

function watch() {
	gulp.watch(['src/**/*.less'], ['styles']);
	gulp.watch(['src/**/*.html'], ['html']);
	typescript(null, true);
}

gulp.task('watch', watch);

gulp.task('build', ['styles', 'html', 'typescript']);
gulp.task('default', ['build']);