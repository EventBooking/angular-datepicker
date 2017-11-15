/* global angular */

function Config() {
	
}

Run.$inject = ['$rootScope'];

function Run($rootScope) {
	$rootScope.vm = new TestController();
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

	this.setDate = function() {
		this.date = '2015-12-01';
	}

	this.setDate1 = function() {
		this.date1 = '2015-12-01';
	}

	this.onDateSelect = function(date, ctrl) {
		console.log('onDate', ctrl, date);
	}

	this.onStartEndSelect = function(start,end) {
		console.log('onStartEnd', start, end);
	}

	this.showTime4 = function() {
		this.time4Submit = this.time4;
	}

	this.time5Submit = function() {
		console.log('time5', this.time5);
	}
	
	this.ngChange5 = function() {
		console.log('ngChange5Result', this.time5);
		this.ngChange5Result = this.time5;
	}

	this.onChange5 = function(time) {
		this.onChange5Result = time;
	}
}

angular.module("demo", ["ngAnimate", "ngDatePicker"])
	.config(Config)
	.run(Run);