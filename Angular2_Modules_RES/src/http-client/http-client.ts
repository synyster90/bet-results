import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Http, Headers, Response } from '@angular/http';

import { SpinnerOverlayService } from './ui-app-spinner-overlay';

declare var $: any;

export class ExceptionT {
    isError: boolean
    fault: Object

    constructor(isError: boolean, fault: Object) {
        this.isError = isError
        this.fault = fault
    }
}

@Injectable()
export class HttpClient {
    private headers: Headers
    private count = 0;

    constructor(private http: Http, private spinnerOverlayService: SpinnerOverlayService) {
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json; charset=utf-8')
        this.headers.set('srtoken', '')
    }

    // Session
    public srData: Object

    public srValidation(callback) {
        if (sessionStorage.getItem('srData'))
            callback(this.srInit(JSON.parse(sessionStorage.getItem('srData'))))
        else if ($('sr-data').attr('token') != "" && $('sr-data').attr('abi') != "" && $('sr-data').attr('topurl') != "") {
            var srData = {
                token: $('sr-data').attr('token'),
                abi: $('sr-data').attr('abi').trim().replace(/^0+/, ''),
                topUrl: $('sr-data').attr('topurl')
            }
            sessionStorage.setItem('srData', JSON.stringify(srData))
            callback(this.srInit(srData))
        } else
            window.location.href = 'error.jsp?error=Token+Not+Found';
    }

    private srInit(srData: Object): Object {
        $('sr-data').remove()
        this.headers.set('srtoken', srData['token'])
        this.srData = srData
        return srData
    }

    // Exception
    public exception: Object
    public exceptionEvent: EventEmitter<ExceptionT> = new EventEmitter<ExceptionT>()
    public exceptionPropagationEvent: EventEmitter<Object> = new EventEmitter<Object>()

    public propagateException() {
        this.exceptionPropagationEvent.emit(this.exception)
        this.exception = null
    }

    // Http
    private interceptors: any[] = [];
    public addInterceptor(func: any) {
        this.interceptors.push(func);
    }

    public get(url: string) {
        return this.doPost(url, '{"dummy":"dummy"}')
    }

    public post(url: string, data) {
        return this.doPost(url, JSON.stringify(data))
    }

    private doPost(url: string, data: string) {
        this.count++
        this.spinnerOverlayService.showSpinnerOverlay()
        return this.http.post(url, data, {
            headers: this.headers
        }).map((res: Response) => {
            this.hideSpinnerOverlay()
            var data = res.json()
            /* Interceptors */
            for (var i = 0; i < this.interceptors.length; i++)
                data = this.interceptors[i](data)
            if (data.hasOwnProperty('bawarMsgs'))
                if (data.bawarMsgs.length > 0) {
                    this.exception = data
                    this.exceptionEvent.emit(new ExceptionT(false, data))
                } else
                    this.exception = null
            return data
        }).catch(err => {
            this.hideSpinnerOverlay()
            var data = JSON.parse(err._body)
            var returnItem = null
            if (err.status == 403) {
                var errorMsg = 'Token non valido';
                try {
                    errorMsg = data.esito.value + ' ' + data.esito.des + ': ' + data.errMsg;
                } catch (e) { }
                window.location.href = 'error.jsp?error=' + errorMsg;
            } else {
                if (data.hasOwnProperty('errResponse'))
                    returnItem = JSON.parse(data.errResponse)
                this.exception = data
                this.exceptionEvent.emit(new ExceptionT(true, data))
            }
            return Observable.throw({
                exception: data,
                item: returnItem
            })
        });
    }

    private hideSpinnerOverlay() {
        this.count--;
        if (this.count == 0)
            this.spinnerOverlayService.hideSpinnerOverlay()
    }
}