module DatePickerModule {

    // DatePickerRange
    export interface IDatePickerRange {
        start: string;
        end: string;
    }

    class DatePickerRange implements IDatePickerRange {
        constructor(start: any, end: any) {
            var mStart = moment(start);
            var mEnd = moment(end);

            if (mEnd.isBefore(mStart)) {
                var temp = mStart;
                mStart = mEnd;
                mEnd = temp;
            }

            this.start = mStart.format('YYYY-MM-DD');
            this.end = mEnd.format('YYYY-MM-DD');
        }

        start: string;
        end: string;
    }

    // DatePickerMonth
    export interface IDatePickerMonth {
        value: number;
        name: string;
        isCurrentMonth: boolean;
    }

    class DatePickerMonth implements IDatePickerMonth {
        constructor(public value: number) {
            var m = moment();
            var thisMonth = m.month();
            this.name = m.month(value).format('MMM');
            this.isCurrentMonth = value === thisMonth;
        }

        name: string;
        isCurrentMonth: boolean;
    }

    // DatePickerMonth
    export interface IDatePickerYear {
        value: number;
        isCurrentYear: boolean;
    }

    class DatePickerYear implements IDatePickerYear {
        constructor(public value: number) {
            this.isCurrentYear = value === moment().year();
        }

        isCurrentYear: boolean;
    }

    // IDatePickerDay
    export interface IDatePickerDay {
        date: number;
        value: any;
        isToday: boolean;
        isNotInMonth: boolean;
        isSelecting: boolean;
        isBefore(day: IDatePickerDay): boolean;
        isSame(day: IDatePickerDay): boolean;
    }

    class DatePickerDay implements IDatePickerDay {
        constructor(fromDate: any, dayOfWeek: any) {
            this.value = moment(dayOfWeek);
            this.date = this.value.date();
            this.isToday = dayOfWeek.isSame(moment(), 'day');
            this.isNotInMonth = !this.value.isSame(fromDate, 'month');
        }

        date: number;
        value: any;
        isToday: boolean;
        isNotInMonth: boolean;
        isSelecting: boolean;

        isBefore(day: IDatePickerDay): boolean {
            var isBefore = this.value.isBefore(day.value, 'day');
            return isBefore;
        }

        isSame(day: IDatePickerDay): boolean {
            var isSame = this.value.isSame(day.value, 'day');
            return isSame;
        }
    }

    // DatePickerService
    export interface IDatePickerService {
        getMonths(): IDatePickerMonth[];
        getDaysOfWeek(): string[];
        getYears(fromDate): IDatePickerYear[];
        getWeek(fromDate, startOfWeek): IDatePickerDay[];
        getRangeDays(start: IDatePickerDay, end: IDatePickerDay, weeks: IDatePickerDay[][]): IDatePickerDay[];
        deselectAll(weeks: IDatePickerDay[][]);
        selectDays(days: IDatePickerDay[]);
        inputToMoment(value: string): any;
        inputToRange(value: string): IDatePickerRange;
    }

    class DatePickerService implements IDatePickerService {
        getMonths(): IDatePickerMonth[] {
            var months = new Array<IDatePickerMonth>();

            for (var i = 0; i < 12; i++) {
                months.push(new DatePickerMonth(i));
            }

            return months;
        }

        getYears(fromDate): IDatePickerYear[] {
            var fromYear = moment(fromDate).year(),
                years = new Array<IDatePickerYear>();

            for (var i = fromYear; i <= (fromYear + 8); i++)
                years.push(new DatePickerYear(i));

            return years;
        }

        getWeek(fromDate, startOfWeek): IDatePickerDay[] {
            var endOfWeek = moment(startOfWeek).endOf('week');

            var days = new Array<IDatePickerDay>();
            for (var dayOfWeek = moment(startOfWeek); dayOfWeek.isBefore(endOfWeek); dayOfWeek.add(1, 'days')) {
                days.push(new DatePickerDay(fromDate, dayOfWeek));
            }

            return days;
        }

        getDaysOfWeek(): string[] {
            return moment.localeData()._weekdaysShort;
        }

        getRangeDays(start: IDatePickerDay, end: IDatePickerDay, weeks: IDatePickerDay[][]): IDatePickerDay[] {

            if (end.isBefore(start)) {
                var temp = start;
                start = end;
                end = temp;
            }

            var allDays = new Array<IDatePickerDay>(),
                isAdding = false;

            weeks.forEach(week => {
                week.forEach(day => {
                    if (day.isSame(start))
                        isAdding = true;

                    if (isAdding) {
                        allDays.push(day);
                    }

                    if (day.isSame(end))
                        isAdding = false;
                });
            });

            return allDays;
        }

        deselectAll(weeks: IDatePickerDay[][]) {
            weeks.forEach(week => {
                week.forEach(day => {
                    day.isSelecting = false;
                });
            });
        }

        selectDays(days: IDatePickerDay[]) {
            days.forEach(day => day.isSelecting = true);
        }

        inputToMoment(value: string): any {
            var lang = moment.localeData();
            var formats = [
                lang.longDateFormat("l")
                    .replace(/-/g, ' ')
                    .replace(/\//g, ' ')
                    .replace(/  /g, ' '),
                lang.longDateFormat("L")
                    .replace(/-/g, ' ')
                    .replace(/\//g, ' ')
                    .replace(/  /g, ' ')
            ];

            var date = moment(value, formats);
            return date;
        }

        inputToRange(value: string): IDatePickerRange {
            if (value == null || !value.trim().length)
                return null;
            var trimmed = value
                .replace(/-/g, ' ')
                .replace(/\//g, ' ')
                .replace(/  /g, ' ')
                .trim();
            var expStart = new RegExp("^(([0-9]{1,4}[ ]*){3})");
            var expEnd = new RegExp("(([0-9]{1,4}[ ]*){3})$");
            var startResult = expStart.exec(trimmed);
            var endResult = expEnd.exec(trimmed);
            var start = this.inputToMoment(startResult[0].trim());
            var end = this.inputToMoment((endResult[0] || startResult[0]).trim());
            var range = new DatePickerRange(start, end);
            return range;
        }
    }

    app.service('datePickerService', DatePickerService);
}