/* global require */
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	dest = 'dist';
    
    
gulp.task('watch', watch);
gulp.task('build', ['styles', 'html', 'typescript']);
gulp.task('default', ['build']);
gulp.task('html', html);
gulp.task('styles', styles);
gulp.task('typescript', ['tsd:install', 'tsgen'], function (callback) {
	typescript(callback);
});
gulp.task('typescript', typescript);
gulp.task('postTsc', postTsc);
gulp.task('clean', clean);

function clean() {
    var del = require('del');
    return del(dest);
}

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

function typescript(callback, watch) {
    var watchFlag = watch ? ':w' : '';
    exec('npm run tsc' + watchFlag, null, callback);
}

function watch() {
	gulp.watch(['src/**/*.less'], ['styles']);
	gulp.watch(['src/**/*.html'], ['html']);
	typescript(null, true);
}

function stripRefs(src, dest, name) {
    var strip = require("gulp-strip-comments");

    return gulp.src(src)
        .pipe(strip())
        .pipe(concat(name))
        .pipe(gulp.dest(dest));
}

function postTsc() {
    stripRefs(dest + '/date-picker.debug.d.ts', dest, '/date-picker.d.ts');
    stripRefs(dest + '/date-picker.debug.js', dest, '/date-picker.js');
}