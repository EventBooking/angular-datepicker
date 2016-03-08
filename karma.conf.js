// Karma configuration
// Generated on Thu Sep 03 2015 16:32:17 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon'],

		client: {
			mocha: {
				reporter: 'html'
			}
		},

		// list of files / patterns to load in the browser
		files: [
            'bower_components/tether/dist/css/tether.css',
            'dist/date-picker.css',
            'demo/stylesheet.css',
            
            'bower_components/jquery/dist/jquery.js',
            'bower_components/moment/moment.js',
            'bower_components/tether/dist/js/tether.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-typescript-module/dist/angular-typescript-module.js',
			'node_modules/angular-mocks/angular-mocks.js',
            'dist/date-picker.debug.js',
            'dist/date-picker.templates.js',
            'demo/app.js',
			'tests/**/*.js'
		],


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'/*, 'Firefox', 'IE', 'PhantomJS'*/],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false
	});
}