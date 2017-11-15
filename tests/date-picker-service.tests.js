/// <reference path="..\typings\main.d.ts" />
/// <reference path="..\dist\angular-datepicker.d.ts" />
describe('Date picker service', function () {
    beforeEach(angular.mock.module('ngDatePicker'));
    describe('format', function () {
        var service;
        var isoDate = 'YYYY-MM-DD';
        beforeEach(inject(function (_datePickerService_) {
            service = _datePickerService_;
        }));
        it('can format', function () {
            var result = service.inputToMoment('10/30/2017').format(isoDate);
            chai.assert.equal(result, "2017-10-30");
        });
        it('issue #9', function () {
            var result = service.inputToMoment('10/30/7').format(isoDate);
            chai.assert.equal(result, "2017-10-30");
        });
        it('issue #9 ish', function () {
            var result = service.inputToMoment('10/30/07').format(isoDate);
            chai.assert.equal(result, "2007-10-30");
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXItc2VydmljZS50ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyLXNlcnZpY2UudGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkNBQTZDO0FBQzdDLHdEQUF3RDtBQUV4RCxRQUFRLENBQUMscUJBQXFCLEVBQUU7SUFFeEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFFaEQsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUVmLElBQUksT0FBNEMsQ0FBQztRQUNqRCxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFFM0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLG1CQUFtQjtZQUNsQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVKLEVBQUUsQ0FBQyxZQUFZLEVBQUU7WUFDYixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsVUFBVSxFQUFFO1lBQ1gsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNmLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi5cXHR5cGluZ3NcXG1haW4uZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLlxcZGlzdFxcYW5ndWxhci1kYXRlcGlja2VyLmQudHNcIiAvPlxyXG5cclxuZGVzY3JpYmUoJ0RhdGUgcGlja2VyIHNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgICAgIGJlZm9yZUVhY2goYW5ndWxhci5tb2NrLm1vZHVsZSgnbmdEYXRlUGlja2VyJykpO1xyXG4gICAgXHJcbiAgICAgICAgZGVzY3JpYmUoJ2Zvcm1hdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlOiBEYXRlUGlja2VyTW9kdWxlLklEYXRlUGlja2VyU2VydmljZTtcclxuICAgICAgICAgICAgdmFyIGlzb0RhdGUgPSAnWVlZWS1NTS1ERCc7XHJcbiAgICBcclxuICAgICAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9kYXRlUGlja2VyU2VydmljZV8pID0+IHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UgPSBfZGF0ZVBpY2tlclNlcnZpY2VfO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICBcclxuICAgICAgICAgICAgaXQoJ2NhbiBmb3JtYXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZXJ2aWNlLmlucHV0VG9Nb21lbnQoJzEwLzMwLzIwMTcnKS5mb3JtYXQoaXNvRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBjaGFpLmFzc2VydC5lcXVhbChyZXN1bHQsIFwiMjAxNy0xMC0zMFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpdCgnaXNzdWUgIzknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZXJ2aWNlLmlucHV0VG9Nb21lbnQoJzEwLzMwLzcnKS5mb3JtYXQoaXNvRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBjaGFpLmFzc2VydC5lcXVhbChyZXN1bHQsIFwiMjAxNy0xMC0zMFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaXNzdWUgIzkgaXNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gc2VydmljZS5pbnB1dFRvTW9tZW50KCcxMC8zMC8wNycpLmZvcm1hdChpc29EYXRlKTtcclxuICAgICAgICAgICAgICAgIGNoYWkuYXNzZXJ0LmVxdWFsKHJlc3VsdCwgXCIyMDA3LTEwLTMwXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICB9KTsiXX0=