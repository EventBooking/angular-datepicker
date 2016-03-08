/// <reference path="..\typings\main.d.ts" />
/// <reference path="..\dist\date-picker.debug.d.ts" />

describe('Time picker service', function() {

    beforeEach(angular.mock.module('ngDatePicker'));

    describe('format', function() {

        var timePickerService: DatePickerModule.ITimePickerService;

        beforeEach(inject((_timePickerService_) => {
            timePickerService = _timePickerService_;
        }));

        it('allows nullable', function() {
            var result = timePickerService.format(null);
            chai.assert.equal(result, "");
        });

        it('11:00:00 -> 11:00 AM', function() {
            var result = timePickerService.format("11:00:00");
            chai.assert.equal(result, "11:00 AM");
        });

        it('13:00:00 -> 1:00 PM', function() {
            var result = timePickerService.format("13:00:00");
            chai.assert.equal(result, "1:00 PM");
        });

        it('11:00 AM -> 11:00 AM', function() {
            var result = timePickerService.format("11:00 AM");
            chai.assert.equal(result, "11:00 AM");
        });

        it('11:00 am -> 11:00 AM', function() {
            var result = timePickerService.format("11:00 am");
            chai.assert.equal(result, "11:00 AM");
        });

        it('11:00 PM -> 11:00 PM', function() {
            var result = timePickerService.format("11:00 PM");
            chai.assert.equal(result, "11:00 PM");
        });

        it('11:00 pm -> 11:00 PM', function() {
            var result = timePickerService.format("11:00 pm");
            chai.assert.equal(result, "11:00 PM");
        });

        it('2 am -> 2:00 AM', function() {
            var result = timePickerService.format("2 am");
            chai.assert.equal(result, "2:00 AM");
        });

        it('2am -> 2:00 AM', function() {
            var result = timePickerService.format("2am");
            chai.assert.equal(result, "2:00 AM");
        });

        it('2 pm -> 2:00 PM', function() {
            var result = timePickerService.format("2 pm");
            chai.assert.equal(result, "2:00 PM");
        });

        it('2pm -> 2:00 PM', function() {
            var result = timePickerService.format("2pm");
            chai.assert.equal(result, "2:00 PM");
        });

    });

});