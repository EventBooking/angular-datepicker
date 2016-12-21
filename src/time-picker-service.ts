module DatePickerModule {

    export interface ITimePickerService {
        parse(text: string): any;
        format(text: string, value?: string): string;
        formatIso(text: string, value?: string): string;
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

        format(text: string, value: string = ''): string {
            var m = this.parse(text);
            return m.isValid() ? m.format('LT') : value;
        }

        formatIso(text: string, value: string = ''): string {
            var m = this.parse(text);
            return m.isValid() ? m.format("HH:mm:ss") : value;
        }
    }

    Angular.module("ngDatePicker").service('timePickerService', TimePickerService);
}