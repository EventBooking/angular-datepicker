/* global require */
var gulp = require('gulp'),
	exec = require('child_process').exec,
	concat = require('gulp-concat'),
	dest = 'dist';
	
function execResults(error, stdout, stderr) {
	if (stdout != null && stdout.length > 0)
		console.log(stdout);
	if (stderr != null && stderr.length > 0)
		console.log(stderr);
	if (error != null) {
		console.log('exec error: ' + error);
	}
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

function typescript(callback) {
	exec('tsc -p src', function(error, stdout, stderr) {
		execResults(error, stdout, stderr);
		callback(error);
	});
}

gulp.task('typescript', typescript);

function watch(callback) {
	exec('tsc -p src -w', function(error, stdout, stderr) {
		execResults(error, stdout, stderr);
		callback(error);
	});
}

gulp.task('watch', watch);

gulp.task('build', ['styles', 'html', 'typescript']);
gulp.task('default', ['build']);