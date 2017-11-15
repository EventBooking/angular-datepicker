/* global angular */

function Config() {

}

Run.$inject = ['$rootScope', 'isIOS'];

function Run($rootScope, isIOS) {
	$rootScope.vm = new TestController();

	if (isIOS)
		overrideConsole($rootScope);
}

function overrideConsole($rootScope) {
	var $element = angular.element(`<div></div>`)
		.addClass("debugConsole");
	var element = $element.get(0);
	angular.element('body').append($element);

	var _log = console.log;
	function log(...arguments) {
		var values = arguments.map(x => {
			if (typeof (x) == "undefined")
				return "undefined";
			if (typeof (x) == "object")
				return JSON.stringify(x);
			return x;
		}).join(", ");
		var $log = angular.element(`<div></div>`)
			.addClass("debugConsole-log")
			.text(values);
		$element.append($log);
		element.scrollTop = element.scrollHeight;
		_log(...arguments);
	};

	console.log = log;	
}

function TestController() {
	this.date = '2015-12-01';
	this.date3 = '2017-02-10';
	this.start = '2015-12-01';
	this.end = '2015-12-04';
	this.highlighted = ['2015-12-10', '2015-12-12', '2015-12-13'];
	this.time1 = '14:05:00';
	this.time2 = '14:05:00';
	this.time3 = '14:05:00';

	this.setDate = function () {
		this.date = '2015-12-01';
	}

	this.setDate1 = function () {
		this.date1 = '2015-12-01';
	}

	this.onDateSelect = function (date, ctrl) {
		console.log('onDate', ctrl, date);
	}

	this.onStartEndSelect = function (start, end) {
		console.log('onStartEnd', start, end);
	}

	this.showTime4 = function () {
		this.time4Submit = this.time4;
	}

	this.time5Submit = function () {
		console.log('time5', this.time5);
	}

	this.ngChange5 = function () {
		console.log('ngChange5Result', this.time5);
		this.ngChange5Result = this.time5;
	}

	this.onChange5 = function (time) {
		this.onChange5Result = time;
	}
}

angular.module("demo", ["ngAnimate", "ngDatePicker"])
	.config(Config)
	.run(Run);

