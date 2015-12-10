/* global require */
var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	html2js = require('gulp-ng-html2js'),
	shell = require('gulp-shell'),
	dest = 'dist';

function html() {
	gulp.src(['src/**/*.html'])
		.pipe(html2js({
			moduleName: 'ngDatePicker',
			stripPrefix: 'directives'
		}))
		.pipe(concat('date-picker.templates.js'))
		.pipe(gulp.dest(dest));
}

gulp.task('html', html);

function styles() {
	gulp.src(['src/assets.less'])
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(concat('date-picker.css'))
		.pipe(gulp.dest(dest));
}

gulp.task('styles', styles);

function typescript() {
	gulp.src(".").pipe(shell("npm build"));
}

gulp.task('typescript', typescript);

function watch() {
	gulp.src('').pipe(shell("tsc"));
}

gulp.task('watch', watch);

gulp.task('build', ['styles', 'html', 'typescript']);
gulp.task('default', ['build']);