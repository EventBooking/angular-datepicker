declare module DatePickerModule {
}
declare module DatePickerModule {
}
declare module DatePickerModule {
    interface IDatePickerRange {
        start: string;
        end: string;
    }
    interface IDatePickerMonth {
        value: number;
        name: string;
        isCurrentMonth: boolean;
    }
    interface IDatePickerYear {
        value: number;
        isCurrentYear: boolean;
    }
    interface IDatePickerDay {
        date: number;
        value: moment.Moment;
        isoDate: string;
        isToday: boolean;
        isNotInMonth: boolean;
        isSelecting: boolean;
        isSelected: boolean;
        isBefore(day: IDatePickerDay): boolean;
        isSame(day: IDatePickerDay): boolean;
        isHighlighted: boolean;
    }
    interface IDatePickerService {
        getMonths(): IDatePickerMonth[];
        getDaysOfWeek(): string[];
        getYears(fromDate: moment.Moment): IDatePickerYear[];
        getWeek(fromDate: moment.Moment, startOfWeek: moment.Moment, today: moment.Moment): IDatePickerDay[];
        getRangeDays(start: IDatePickerDay, end: IDatePickerDay, weeks: IDatePickerDay[][]): IDatePickerDay[];
        deselectAll(weeks: IDatePickerDay[][]): any;
        selectDays(days: IDatePickerDay[]): any;
        inputToMoment(value: string): any;
        inputToRange(value: string): IDatePickerRange;
    }
}
declare module DatePickerModule {
}
declare module DatePickerModule {
    interface ITimePickerService {
        parse(text: string): any;
        format(text: string, value?: string): string;
        formatIso(text: string, value?: string): string;
    }
}
