/* global angular */

function Config() {
	
}

Run.$inject = ['$rootScope'];

function Run($rootScope) {
	$rootScope.vm = new TestController();
}

function TestController() {
	this.date = '2015-12-01';
	this.start = '2015-12-01';
	this.end = '2015-12-04';
	this.highlighted = ['2015-12-10', '2015-12-12', '2015-12-13'];
}

angular.module("demo", ["ngAnimate", "ngDatePicker"])
	.config(Config)
	.run(Run);