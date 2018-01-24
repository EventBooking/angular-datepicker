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
            'node_modules/tether/dist/css/tether.css',
            'dist/angular-datepicker.css',
            'demo/stylesheet.css',
            
            'node_modules/jquery/dist/jquery.js',
            'node_modules/moment/moment.js',
            'node_modules/tether/dist/js/tether.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-typescript-module/dist/angular-typescript-module.js',
			'node_modules/angular-mocks/angular-mocks.js',
            'dist/angular-datepicker.js',
            'dist/angular-datepicker.templates.js',
            'demo/app.js',
			'tests/output/**/*.js'
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