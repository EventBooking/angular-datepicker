/// <reference path="..\typings\main.d.ts" />
/// <reference path="..\dist\angular-datepicker.d.ts" />

describe('Date picker service', function() {
    
        beforeEach(angular.mock.module('ngDatePicker'));
    
        describe('format', function() {
    
            var service: DatePickerModule.IDatePickerService;
            var isoDate = 'YYYY-MM-DD';
    
            beforeEach(inject((_datePickerService_) => {
                service = _datePickerService_;
            }));
    
            it('can format', function() {
                var result = service.inputToMoment('10/30/2017').format(isoDate);
                chai.assert.equal(result, "2017-10-30");
            });
            
            it('issue #9', function() {
                var result = service.inputToMoment('10/30/7').format(isoDate);
                chai.assert.equal(result, "2017-10-30");
            });

            it('issue #9 ish', function() {
                var result = service.inputToMoment('10/30/07').format(isoDate);
                chai.assert.equal(result, "2007-10-30");
            });
    
        });
    
    });