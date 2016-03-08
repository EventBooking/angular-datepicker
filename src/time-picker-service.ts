module DatePickerModule {

    export interface ITimePickerService {
        parse(text: string): any;
        format(text: string): string;
    }

    class TimePickerService implements ITimePickerService {
        parse(text: string): any {
            var patterns = [
                'LT',
                'LTS',
                'HH:mm:ss',
                'HH:mm A'
            ];
            return moment(text, patterns);
        }

        format(text: string): string {
            var m = this.parse(text);
            return m.isValid() ? m.format('LT') : '';
        }
    }

    Angular.module("ngDatePicker").service('timePickerService', TimePickerService);
}