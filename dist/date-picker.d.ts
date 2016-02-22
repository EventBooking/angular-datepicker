declare var angular: any;
declare var moment: any;
declare var Tether: any;
declare module DatePickerModule {
    class Module {
        private module;
        constructor(name: any, modules: any);
        config(appConfig: any): this;
        run(appRun: any): this;
        directive(name: string, directive: any): this;
        filter(name: string, filter: any): this;
        service(name: string, service: any): this;
        provider(name: string, provider: any): this;
        factory(name: string, factory: any): this;
        constant(name: string, value: any): this;
    }
    interface IActivatorClass {
        new (...params: any[]): any;
    }
    class Activator {
        static create(type: IActivatorClass, params: any[]): any;
    }
    interface IPromise<T> {
        then(success: IPromiseCallback<T>, error?: IPromiseCallback<any>, notify?: IPromiseCallback<any>): IPromise<T>;
        catch(error: IPromiseCallback<any>): IPromise<T>;
        finally(callback: IPromiseCallback<T>, notify?: IPromiseCallback<any>): IPromise<T>;
    }
    interface IPromiseCallback<T> {
        (result: T): any;
    }
    interface IDeferrable {
        <T>(resolve: any, reject: any): IPromise<T>;
        defer(): IDeferred<void>;
        defer<T>(): IDeferred<T>;
        when<T>(value: any): IPromise<T>;
        resolve<T>(value: T): IPromise<T>;
        all(...promises: IPromise<any>[]): IPromise<any>;
    }
    interface IDeferred<T> {
        notify(value: any): any;
        resolve(): any;
        resolve(value: T): any;
        reject(reason: any): any;
        promise: IPromise<T>;
    }
    interface IHttpRequest {
        post(url: string, data?: any, config?: IHttpConfig): IHttpPromise<void>;
        put(url: string, data: any, config?: IHttpConfig): IHttpPromise<void>;
        delete(url: string, config?: IHttpConfig): IHttpPromise<void>;
        jsonp(url: string, config?: IHttpConfig): IHttpPromise<void>;
        patch(url: string, data: any, config?: IHttpConfig): IHttpPromise<void>;
        get<T>(url: string, config?: IHttpConfig): IHttpPromise<T>;
        head<T>(url: string, config?: IHttpConfig): IHttpPromise<T>;
        post<T>(url: string, data?: any, config?: IHttpConfig): IHttpPromise<T>;
        put<T>(url: string, data: any, config?: IHttpConfig): IHttpPromise<T>;
        delete<T>(url: string, config?: IHttpConfig): IHttpPromise<T>;
        jsonp<T>(url: string, config?: IHttpConfig): IHttpPromise<T>;
        patch<T>(url: string, data: any, config?: IHttpConfig): IHttpPromise<T>;
    }
    interface IHttpConfig {
        method?: string;
        url?: string;
        params?: any;
        data?: any;
        header?: any;
        xsrfHeaderName?: string;
        xsrfCookieName?: string;
        transformRequest?: (data: any, headersGetter: any) => void;
        transformResponse?: (data: any, headersGetter: any, status: any) => void;
        paramSerializer?: (param: {
            key: string;
            value: string;
        }) => string;
        cache?: any;
        timeout?: any;
        withCredentials?: boolean;
        responseType?: string;
        headers?: any;
    }
    interface IHttpPromise<T> extends IHttpPromiseCallback<T> {
        success(callback: IHttpPromiseResult<T>): IPromise<T>;
        error(callback: IHttpPromiseResult<any>): IPromise<T>;
    }
    interface IHttpPromiseCallback<T> extends IPromise<IHttpPromiseResult<T>> {
    }
    interface IHttpPromiseResult<T> {
        data: T;
        status?: number;
        headers?: (headerName: string) => void;
        config?: IHttpConfig;
        statusText?: string;
    }
}
declare var app: DatePickerModule.Module;
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
        value: any;
        isToday: boolean;
        isNotInMonth: boolean;
        isSelecting: boolean;
        isBefore(day: IDatePickerDay): boolean;
        isSame(day: IDatePickerDay): boolean;
    }
    interface IDatePickerService {
        getMonths(): IDatePickerMonth[];
        getDaysOfWeek(): string[];
        getYears(fromDate: any): IDatePickerYear[];
        getWeek(fromDate: any, startOfWeek: any): IDatePickerDay[];
        getRangeDays(start: IDatePickerDay, end: IDatePickerDay, weeks: IDatePickerDay[][]): IDatePickerDay[];
        deselectAll(weeks: IDatePickerDay[][]): any;
        selectDays(days: IDatePickerDay[]): any;
        inputToMoment(value: string): any;
        inputToRange(value: string): IDatePickerRange;
    }
}
