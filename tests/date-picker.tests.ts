/// <reference path="..\typings\main.d.ts" />
/// <reference path="..\dist\angular-datepicker.d.ts" />

describe('Datepicker', function () {

    beforeEach(angular.mock.module('ngDatePicker'));

    describe('dateInternal', function () {

        var $controller,
            $rootScope;

        beforeEach(inject((_$rootScope_, _$controller_) => {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
        }));

        it('null date sets dateInternal as today ', function () {
            var $attrs = {
                start: null,
                end: null
            };
            var datePickerService = {
                getMonths: () => {
                    return [];
                },
                getDaysOfWeek: () => {
                    return [];
                }
            };

            var $ctrl = $controller('datePicker', {
                '$attrs': $attrs
            });
            $ctrl.onInit();

            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');
            var today = moment().format('YYYY-MM-DD');

            chai.assert.equal(dateInternal, today);
        });

        it('null date with defaultDate sets dateInternal as defaultDate', function () {
            var $attrs = {
                start: null,
                end: null
            };

            var emptyArray = () => [];
            var datePickerService = {
                getMonths: emptyArray,
                getDaysOfWeek: emptyArray,
                getWeek: emptyArray,
                getYears: emptyArray
            };

            var $ctrl = $controller('datePicker', {
                '$attrs': $attrs,
                'datePickerService': datePickerService
            });
            $ctrl.defaultDate = '2016-02-10';
            $ctrl.onInit();

            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');

            chai.assert.equal(dateInternal, $ctrl.defaultDate);
        });

        it('null date with defaultDate sets as empty string shows dateInternal as today', function () {
            var $attrs = {
                start: null,
                end: null
            };

            var emptyArray = () => [];
            var datePickerService = {
                getMonths: emptyArray,
                getDaysOfWeek: emptyArray,
                getWeek: emptyArray,
                getYears: emptyArray
            };

            var $ctrl = $controller('datePicker', {
                '$attrs': $attrs,
                'datePickerService': datePickerService
            });
            $ctrl.defaultDate = "";
            $ctrl.onInit();

            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');
            var today = moment().format('YYYY-MM-DD');

            chai.assert.equal(dateInternal, today);
        });

    });

});