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

	this.showTime4 = function() {
		this.time4Submit = this.time4;
	}
}

angular.module("demo", ["ngAnimate", "ngDatePicker"])
	.config(Config)
	.run(Run);