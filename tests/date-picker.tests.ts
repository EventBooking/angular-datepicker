describe('Datepicker', function () {

    beforeEach(angular.mock.module('ngDatePicker'));

    describe('dateInternal', function () {

        let $controller,
            $rootScope,
            $scope,
            emptyArray = () => [],
            datePickerService = {
                getWeek: emptyArray,
                getMonths: emptyArray,
                getDaysOfWeek: emptyArray,
                getYears: emptyArray
            };

        beforeEach(inject((_$rootScope_, _$controller_) => {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $scope = $rootScope.$new();
        }));

        it('null date sets dateInternal as today ', function () {
            var $element = angular.element(`<date-picker></date-picker>`);

            var $ctrl = $controller('datePicker', {
                '$scope': $scope,
                '$element': $element,
                '$attrs': {
                    start: null,
                    end: null
                },
                'datePickerService': datePickerService,
                'isMobile': false
            });

            $ctrl.$onInit();
            $ctrl.$postLink();

            var today = moment().format('YYYY-MM-DD');
            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');
            chai.assert.equal(dateInternal, today);
        });

        it('null date with defaultDate sets dateInternal as defaultDate', function () {
            var $element = angular.element(`<date-picker></date-picker>`);

            var $ctrl = $controller('datePicker', {
                '$scope': $scope,
                '$element': $element,
                '$attrs': {
                    start: null,
                    end: null
                },
                'datePickerService': datePickerService,
                'isMobile': false
            });
            
            var today = moment().format('YYYY-MM-DD');
            $ctrl.defaultDate = today;

            $ctrl.$onInit();
            $ctrl.$postLink();
            
            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');

            chai.assert.equal(dateInternal, $ctrl.defaultDate);
        });

        it('null date with defaultDate sets as empty string shows dateInternal as today', function () {
            var $element = angular.element(`<date-picker></date-picker>`);

            var $ctrl = $controller('datePicker', {
                '$scope': $scope,
                '$element': $element,
                '$attrs': {
                    start: null,
                    end: null
                },
                'datePickerService': datePickerService,
                'isMobile': false
            });

            $ctrl.defaultDate = "";
            $ctrl.$onInit();
            $ctrl.$postLink();

            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');
            var today = moment().format('YYYY-MM-DD');

            chai.assert.equal(dateInternal, today);
        });

    });

});