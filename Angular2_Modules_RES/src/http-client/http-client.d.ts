/// <reference types="core-js" />
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http } from '@angular/http';
import { SpinnerOverlayService } from './ui-app-spinner-overlay';
export declare class ExceptionT {
    isError: boolean;
    fault: Object;
    constructor(isError: boolean, fault: Object);
}
export declare class HttpClient {
    private http;
    private spinnerOverlayService;
    private headers;
    private count;
    constructor(http: Http, spinnerOverlayService: SpinnerOverlayService);
    srData: Object;
    srValidation(callback: any): void;
    private srInit(srData);
    exception: Object;
    exceptionEvent: EventEmitter<ExceptionT>;
    exceptionPropagationEvent: EventEmitter<Object>;
    propagateException(): void;
    private interceptors;
    addInterceptor(func: any): void;
    get(url: string): Observable<any>;
    post(url: string, data: any): Observable<any>;
    private doPost(url, data);
    private hideSpinnerOverlay();
}
