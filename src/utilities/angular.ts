module Angular {

    export class Module {
        private module;

        constructor(name, modules) {
            this.module = angular.module(name, modules);
        }

        static get(name): Module {
            return angular.module(name);
        }

        config(appConfig) {
            this.module.config(appConfig);
            return this;
        }

        run(appRun) {
            this.module.run(appRun);
            return this;
        }

        directive(name: string, directive) {
            this.module.directive(name, DirectiveFactory.create(directive));
            return this;
        }

        filter(name: string, filter) {
            this.module.filter(name, FilterFactory.create(filter));
            return this;
        }

        service(name: string, service) {
            this.module.service(name, service);
            return this;
        }

        provider(name: string, provider) {
            this.module.provider(name, provider);
            return this;
        }

        factory(name: string, factory) {
            this.module.factory(name, factory);
            return this;
        }

        constant(name: string, value) {
            this.module.constant(name, value);
            return this;
        }
    }

    // filters
    class FilterFactory {
        static create(type: IActivatorClass): any {
            var filter = (...inject: any[]) => {
                var instance = Activator.create(type, inject);
                return (...options: any[]) => {
                    return instance.filter.apply(instance, options);
                };
            };
            filter["$inject"] = type["$inject"];
            return filter;
        }
    }

    // directives
    class DirectiveFactory {
        static create(type: IActivatorClass): any {
            var directive = (...inject: any[]) => {
                return Activator.create(type, inject);
            };
            directive["$inject"] = type["$inject"];
            return directive;
        }
    }

    // activator
    export interface IActivatorClass {
        new (...params: any[]);
    }

    export class Activator {
        static create(type: IActivatorClass, params: any[]) {
            var instance = Object.create(type.prototype);
            instance.constructor.apply(instance, params);
            return instance;

            //var args = [null].concat(params);
            //var factory = type.bind.apply(type, args);
            //return new factory();
        }
    }

    // promise
    export interface IPromise<T> {
        then(success: IPromiseCallback<T>, error?: IPromiseCallback<any>, notify?: IPromiseCallback<any>): IPromise<T>;
        catch(error: IPromiseCallback<any>): IPromise<T>;
        finally(callback: IPromiseCallback<T>, notify?: IPromiseCallback<any>): IPromise<T>;
    }

    export interface IPromiseCallback<T> {
        (result: T): any;
    }

    // $q
    export interface IDeferrable {
        <T>(resolve: any, reject: any): IPromise<T>;
        defer(): IDeferred<void>;
        defer<T>(): IDeferred<T>;
        when<T>(value: any): IPromise<T>;
        resolve<T>(value: T): IPromise<T>;
        all(...promises: IPromise<any>[]): IPromise<any>;
    }

    export interface IDeferred<T> {
        notify(value: any);
        resolve();
        resolve(value: T);
        reject(reason: any);
        promise: IPromise<T>;
    }

    // $http
    export interface IHttpRequest {
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

    export interface IHttpConfig {
        method?: string;
        url?: string;
        params?: any;
        data?: any;
        header?: any;
        xsrfHeaderName?: string;
        xsrfCookieName?: string;
        transformRequest?: (data: any, headersGetter: any) => void;
        transformResponse?: (data: any, headersGetter: any, status: any) => void;
        paramSerializer?: (param: { key: string; value: string }) => string;
        cache?: any;
        timeout?: any;
        withCredentials?: boolean;
        responseType?: string;
        headers?: any;
    }

    export interface IHttpPromise<T> extends IHttpPromiseCallback<T> {
        success(callback: IHttpPromiseResult<T>): IPromise<T>;
        error(callback: IHttpPromiseResult<any>): IPromise<T>;
    }

    export interface IHttpPromiseCallback<T> extends IPromise<IHttpPromiseResult<T>> {
        // An interface for returning from an http then    
    }

    export interface IHttpPromiseResult<T> {
        data: T;
        status?: number;
        headers?: (headerName: string) => void;
        config?: IHttpConfig;
        statusText?: string;
    }
}