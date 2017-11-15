/// <reference path="..\typings\main.d.ts" />
/// <reference path="..\dist\angular-datepicker.d.ts" />
describe('Datepicker', function () {
    beforeEach(angular.mock.module('ngDatePicker'));
    describe('dateInternal', function () {
        var $controller, $rootScope;
        beforeEach(inject(function (_$rootScope_, _$controller_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
        }));
        it('null date sets dateInternal as today ', function () {
            var $attrs = {
                start: null,
                end: null
            };
            var datePickerService = {
                getMonths: function () {
                    return [];
                },
                getDaysOfWeek: function () {
                    return [];
                }
            };
            var $ctrl = $controller('datePicker', {
                '$attrs': $attrs
            });
            $ctrl.$onInit();
            $ctrl.$postLink();
            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');
            var today = moment().format('YYYY-MM-DD');
            chai.assert.equal(dateInternal, today);
        });
        it('null date with defaultDate sets dateInternal as defaultDate', function () {
            var $attrs = {
                start: null,
                end: null
            };
            var emptyArray = function () { return []; };
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
            $ctrl.$onInit();
            $ctrl.$postLink();
            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');
            chai.assert.equal(dateInternal, $ctrl.defaultDate);
        });
        it('null date with defaultDate sets as empty string shows dateInternal as today', function () {
            var $attrs = {
                start: null,
                end: null
            };
            var emptyArray = function () { return []; };
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
            $ctrl.$onInit();
            $ctrl.$postLink();
            var dateInternal = $ctrl.dateInternal.format('YYYY-MM-DD');
            var today = moment().format('YYYY-MM-DD');
            chai.assert.equal(dateInternal, today);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIudGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlLXBpY2tlci50ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2Q0FBNkM7QUFDN0Msd0RBQXdEO0FBRXhELFFBQVEsQ0FBQyxZQUFZLEVBQUU7SUFFbkIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFFaEQsUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUVyQixJQUFJLFdBQVcsRUFDWCxVQUFVLENBQUM7UUFFZixVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsWUFBWSxFQUFFLGFBQWE7WUFDMUMsVUFBVSxHQUFHLFlBQVksQ0FBQztZQUMxQixXQUFXLEdBQUcsYUFBYSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFSixFQUFFLENBQUMsdUNBQXVDLEVBQUU7WUFDeEMsSUFBSSxNQUFNLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDO1lBQ0YsSUFBSSxpQkFBaUIsR0FBRztnQkFDcEIsU0FBUyxFQUFFO29CQUNQLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCxhQUFhLEVBQUU7b0JBQ1gsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDZCxDQUFDO2FBQ0osQ0FBQztZQUVGLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xDLFFBQVEsRUFBRSxNQUFNO2FBQ25CLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFbEIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0QsSUFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2REFBNkQsRUFBRTtZQUM5RCxJQUFJLE1BQU0sR0FBRztnQkFDVCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxHQUFHLEVBQUUsSUFBSTthQUNaLENBQUM7WUFFRixJQUFJLFVBQVUsR0FBRyxjQUFNLE9BQUEsRUFBRSxFQUFGLENBQUUsQ0FBQztZQUMxQixJQUFJLGlCQUFpQixHQUFHO2dCQUNwQixTQUFTLEVBQUUsVUFBVTtnQkFDckIsYUFBYSxFQUFFLFVBQVU7Z0JBQ3pCLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixRQUFRLEVBQUUsVUFBVTthQUN2QixDQUFDO1lBRUYsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksRUFBRTtnQkFDbEMsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLG1CQUFtQixFQUFFLGlCQUFpQjthQUN6QyxDQUFDLENBQUM7WUFDSCxLQUFLLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQztZQUNqQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRWxCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNkVBQTZFLEVBQUU7WUFDOUUsSUFBSSxNQUFNLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDO1lBRUYsSUFBSSxVQUFVLEdBQUcsY0FBTSxPQUFBLEVBQUUsRUFBRixDQUFFLENBQUM7WUFDMUIsSUFBSSxpQkFBaUIsR0FBRztnQkFDcEIsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLGFBQWEsRUFBRSxVQUFVO2dCQUN6QixPQUFPLEVBQUUsVUFBVTtnQkFDbkIsUUFBUSxFQUFFLFVBQVU7YUFDdkIsQ0FBQztZQUVGLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xDLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixtQkFBbUIsRUFBRSxpQkFBaUI7YUFDekMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUVsQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxJQUFJLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLlxcdHlwaW5nc1xcbWFpbi5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uXFxkaXN0XFxhbmd1bGFyLWRhdGVwaWNrZXIuZC50c1wiIC8+XHJcblxyXG5kZXNjcmliZSgnRGF0ZXBpY2tlcicsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGFuZ3VsYXIubW9jay5tb2R1bGUoJ25nRGF0ZVBpY2tlcicpKTtcclxuXHJcbiAgICBkZXNjcmliZSgnZGF0ZUludGVybmFsJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgJGNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICRyb290U2NvcGU7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJHJvb3RTY29wZV8sIF8kY29udHJvbGxlcl8pID0+IHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ251bGwgZGF0ZSBzZXRzIGRhdGVJbnRlcm5hbCBhcyB0b2RheSAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkYXR0cnMgPSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGVuZDogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgZGF0ZVBpY2tlclNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXRNb250aHM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF5c09mV2VlazogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkY3RybCA9ICRjb250cm9sbGVyKCdkYXRlUGlja2VyJywge1xyXG4gICAgICAgICAgICAgICAgJyRhdHRycyc6ICRhdHRyc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgICAgICAkY3RybC4kcG9zdExpbmsoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlSW50ZXJuYWwgPSAkY3RybC5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHZhciB0b2RheSA9IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG5cclxuICAgICAgICAgICAgY2hhaS5hc3NlcnQuZXF1YWwoZGF0ZUludGVybmFsLCB0b2RheSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdudWxsIGRhdGUgd2l0aCBkZWZhdWx0RGF0ZSBzZXRzIGRhdGVJbnRlcm5hbCBhcyBkZWZhdWx0RGF0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRhdHRycyA9IHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgZW1wdHlBcnJheSA9ICgpID0+IFtdO1xyXG4gICAgICAgICAgICB2YXIgZGF0ZVBpY2tlclNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXRNb250aHM6IGVtcHR5QXJyYXksXHJcbiAgICAgICAgICAgICAgICBnZXREYXlzT2ZXZWVrOiBlbXB0eUFycmF5LFxyXG4gICAgICAgICAgICAgICAgZ2V0V2VlazogZW1wdHlBcnJheSxcclxuICAgICAgICAgICAgICAgIGdldFllYXJzOiBlbXB0eUFycmF5XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgJGN0cmwgPSAkY29udHJvbGxlcignZGF0ZVBpY2tlcicsIHtcclxuICAgICAgICAgICAgICAgICckYXR0cnMnOiAkYXR0cnMsXHJcbiAgICAgICAgICAgICAgICAnZGF0ZVBpY2tlclNlcnZpY2UnOiBkYXRlUGlja2VyU2VydmljZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGN0cmwuZGVmYXVsdERhdGUgPSAnMjAxNi0wMi0xMCc7XHJcbiAgICAgICAgICAgICRjdHJsLiRvbkluaXQoKTtcclxuICAgICAgICAgICAgJGN0cmwuJHBvc3RMaW5rKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZUludGVybmFsID0gJGN0cmwuZGF0ZUludGVybmFsLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG5cclxuICAgICAgICAgICAgY2hhaS5hc3NlcnQuZXF1YWwoZGF0ZUludGVybmFsLCAkY3RybC5kZWZhdWx0RGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdudWxsIGRhdGUgd2l0aCBkZWZhdWx0RGF0ZSBzZXRzIGFzIGVtcHR5IHN0cmluZyBzaG93cyBkYXRlSW50ZXJuYWwgYXMgdG9kYXknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkYXR0cnMgPSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGVuZDogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGVtcHR5QXJyYXkgPSAoKSA9PiBbXTtcclxuICAgICAgICAgICAgdmFyIGRhdGVQaWNrZXJTZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICAgICAgZ2V0TW9udGhzOiBlbXB0eUFycmF5LFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF5c09mV2VlazogZW1wdHlBcnJheSxcclxuICAgICAgICAgICAgICAgIGdldFdlZWs6IGVtcHR5QXJyYXksXHJcbiAgICAgICAgICAgICAgICBnZXRZZWFyczogZW1wdHlBcnJheVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyICRjdHJsID0gJGNvbnRyb2xsZXIoJ2RhdGVQaWNrZXInLCB7XHJcbiAgICAgICAgICAgICAgICAnJGF0dHJzJzogJGF0dHJzLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGVQaWNrZXJTZXJ2aWNlJzogZGF0ZVBpY2tlclNlcnZpY2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRjdHJsLmRlZmF1bHREYXRlID0gXCJcIjtcclxuICAgICAgICAgICAgJGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgICAgICAkY3RybC4kcG9zdExpbmsoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlSW50ZXJuYWwgPSAkY3RybC5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHZhciB0b2RheSA9IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG5cclxuICAgICAgICAgICAgY2hhaS5hc3NlcnQuZXF1YWwoZGF0ZUludGVybmFsLCB0b2RheSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59KTsiXX0=