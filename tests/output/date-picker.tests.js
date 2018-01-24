describe('Datepicker', function () {
    beforeEach(angular.mock.module('ngDatePicker'));
    describe('dateInternal', function () {
        var $controller, $rootScope, $scope, emptyArray = function () { return []; }, datePickerService = {
            getWeek: emptyArray,
            getMonths: emptyArray,
            getDaysOfWeek: emptyArray,
            getYears: emptyArray
        };
        beforeEach(inject(function (_$rootScope_, _$controller_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            $scope = $rootScope.$new();
        }));
        it('null date sets dateInternal as today ', function () {
            var $element = angular.element("<date-picker></date-picker>");
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
            var $element = angular.element("<date-picker></date-picker>");
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
            var $element = angular.element("<date-picker></date-picker>");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIudGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9kYXRlLXBpY2tlci50ZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxRQUFRLENBQUMsWUFBWSxFQUFFO0lBRW5CLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBRWhELFFBQVEsQ0FBQyxjQUFjLEVBQUU7UUFFckIsSUFBSSxXQUFXLEVBQ1gsVUFBVSxFQUNWLE1BQU0sRUFDTixVQUFVLEdBQUcsY0FBTSxPQUFBLEVBQUUsRUFBRixDQUFFLEVBQ3JCLGlCQUFpQixHQUFHO1lBQ2hCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLGFBQWEsRUFBRSxVQUFVO1lBQ3pCLFFBQVEsRUFBRSxVQUFVO1NBQ3ZCLENBQUM7UUFFTixVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsWUFBWSxFQUFFLGFBQWE7WUFDMUMsVUFBVSxHQUFHLFlBQVksQ0FBQztZQUMxQixXQUFXLEdBQUcsYUFBYSxDQUFDO1lBQzVCLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVKLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRTtZQUN4QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFFOUQsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksRUFBRTtnQkFDbEMsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixRQUFRLEVBQUU7b0JBQ04sS0FBSyxFQUFFLElBQUk7b0JBQ1gsR0FBRyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0QsbUJBQW1CLEVBQUUsaUJBQWlCO2dCQUN0QyxVQUFVLEVBQUUsS0FBSzthQUNwQixDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRWxCLElBQUksS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNkRBQTZELEVBQUU7WUFDOUQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRTlELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xDLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsUUFBUSxFQUFFO29CQUNOLEtBQUssRUFBRSxJQUFJO29CQUNYLEdBQUcsRUFBRSxJQUFJO2lCQUNaO2dCQUNELG1CQUFtQixFQUFFLGlCQUFpQjtnQkFDdEMsVUFBVSxFQUFFLEtBQUs7YUFDcEIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBRTFCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFbEIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2RUFBNkUsRUFBRTtZQUM5RSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFFOUQsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksRUFBRTtnQkFDbEMsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixRQUFRLEVBQUU7b0JBQ04sS0FBSyxFQUFFLElBQUk7b0JBQ1gsR0FBRyxFQUFFLElBQUk7aUJBQ1o7Z0JBQ0QsbUJBQW1CLEVBQUUsaUJBQWlCO2dCQUN0QyxVQUFVLEVBQUUsS0FBSzthQUNwQixDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRWxCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNELElBQUksS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZGVzY3JpYmUoJ0RhdGVwaWNrZXInLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgYmVmb3JlRWFjaChhbmd1bGFyLm1vY2subW9kdWxlKCduZ0RhdGVQaWNrZXInKSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2RhdGVJbnRlcm5hbCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0ICRjb250cm9sbGVyLFxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLFxyXG4gICAgICAgICAgICAkc2NvcGUsXHJcbiAgICAgICAgICAgIGVtcHR5QXJyYXkgPSAoKSA9PiBbXSxcclxuICAgICAgICAgICAgZGF0ZVBpY2tlclNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXRXZWVrOiBlbXB0eUFycmF5LFxyXG4gICAgICAgICAgICAgICAgZ2V0TW9udGhzOiBlbXB0eUFycmF5LFxyXG4gICAgICAgICAgICAgICAgZ2V0RGF5c09mV2VlazogZW1wdHlBcnJheSxcclxuICAgICAgICAgICAgICAgIGdldFllYXJzOiBlbXB0eUFycmF5XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJHJvb3RTY29wZV8sIF8kY29udHJvbGxlcl8pID0+IHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdudWxsIGRhdGUgc2V0cyBkYXRlSW50ZXJuYWwgYXMgdG9kYXkgJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoYDxkYXRlLXBpY2tlcj48L2RhdGUtcGlja2VyPmApO1xyXG5cclxuICAgICAgICAgICAgdmFyICRjdHJsID0gJGNvbnRyb2xsZXIoJ2RhdGVQaWNrZXInLCB7XHJcbiAgICAgICAgICAgICAgICAnJHNjb3BlJzogJHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgJyRlbGVtZW50JzogJGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAnJGF0dHJzJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdkYXRlUGlja2VyU2VydmljZSc6IGRhdGVQaWNrZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgJ2lzTW9iaWxlJzogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgICAgICRjdHJsLiRwb3N0TGluaygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvZGF5ID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHZhciBkYXRlSW50ZXJuYWwgPSAkY3RybC5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIGNoYWkuYXNzZXJ0LmVxdWFsKGRhdGVJbnRlcm5hbCwgdG9kYXkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbnVsbCBkYXRlIHdpdGggZGVmYXVsdERhdGUgc2V0cyBkYXRlSW50ZXJuYWwgYXMgZGVmYXVsdERhdGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChgPGRhdGUtcGlja2VyPjwvZGF0ZS1waWNrZXI+YCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGN0cmwgPSAkY29udHJvbGxlcignZGF0ZVBpY2tlcicsIHtcclxuICAgICAgICAgICAgICAgICckc2NvcGUnOiAkc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAnJGVsZW1lbnQnOiAkZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICckYXR0cnMnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2RhdGVQaWNrZXJTZXJ2aWNlJzogZGF0ZVBpY2tlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAnaXNNb2JpbGUnOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0b2RheSA9IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICAkY3RybC5kZWZhdWx0RGF0ZSA9IHRvZGF5O1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgICAgICAkY3RybC4kcG9zdExpbmsoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkYXRlSW50ZXJuYWwgPSAkY3RybC5kYXRlSW50ZXJuYWwuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcblxyXG4gICAgICAgICAgICBjaGFpLmFzc2VydC5lcXVhbChkYXRlSW50ZXJuYWwsICRjdHJsLmRlZmF1bHREYXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ251bGwgZGF0ZSB3aXRoIGRlZmF1bHREYXRlIHNldHMgYXMgZW1wdHkgc3RyaW5nIHNob3dzIGRhdGVJbnRlcm5hbCBhcyB0b2RheScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGA8ZGF0ZS1waWNrZXI+PC9kYXRlLXBpY2tlcj5gKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkY3RybCA9ICRjb250cm9sbGVyKCdkYXRlUGlja2VyJywge1xyXG4gICAgICAgICAgICAgICAgJyRzY29wZSc6ICRzY29wZSxcclxuICAgICAgICAgICAgICAgICckZWxlbWVudCc6ICRlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgJyRhdHRycyc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnZGF0ZVBpY2tlclNlcnZpY2UnOiBkYXRlUGlja2VyU2VydmljZSxcclxuICAgICAgICAgICAgICAgICdpc01vYmlsZSc6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJGN0cmwuZGVmYXVsdERhdGUgPSBcIlwiO1xyXG4gICAgICAgICAgICAkY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgICAgICRjdHJsLiRwb3N0TGluaygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGVJbnRlcm5hbCA9ICRjdHJsLmRhdGVJbnRlcm5hbC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgdmFyIHRvZGF5ID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcblxyXG4gICAgICAgICAgICBjaGFpLmFzc2VydC5lcXVhbChkYXRlSW50ZXJuYWwsIHRvZGF5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pOyJdfQ==