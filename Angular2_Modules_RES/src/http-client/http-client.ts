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

    constructor( isError: boolean, fault: Object ) {
        this.isError = isError
        this.fault = fault
    }
}

@Injectable()
export class HttpClient {
    private headers: Headers
    private count = 0;

    constructor( private http: Http, private spinnerOverlayService: SpinnerOverlayService ) {
        this.headers = new Headers();
        this.headers.set( 'Content-Type', 'application/json; charset=utf-8' )
    }

    // Exception
    public exception: Object
    public exceptionEvent: EventEmitter<ExceptionT> = new EventEmitter<ExceptionT>()
    public exceptionPropagationEvent: EventEmitter<Object> = new EventEmitter<Object>()

    public propagateException() {
        this.exceptionPropagationEvent.emit( this.exception )
        this.exception = null
    }

    // Http
    private interceptors: any[] = [];
    public addInterceptor( func: any ) {
        this.interceptors.push( func );
    }

    public get( url: string, noLoadingWheel?: boolean ): Observable<Object> {
        if ( !noLoadingWheel )
            this.showSpinnerOverlay()
        return this.http.get( url, {
            headers: this.headers
        }).map(( res: Response ) => {
            if ( !noLoadingWheel )
                this.hideSpinnerOverlay()
            var data = res.json()
            /* Interceptors */
            for ( var i = 0; i < this.interceptors.length; i++ )
                data = this.interceptors[i]( data )
            return data
        })._catch( err => {
            if ( !noLoadingWheel )
                this.hideSpinnerOverlay()
            var returnItem = null
            var data = null
            try {
                data = JSON.parse( err._body )
                if ( data.hasOwnProperty( 'errResponse' ) )
                    returnItem = JSON.parse( data.errResponse )
            } catch ( ex ) {
                data = err._body
                returnItem = err
            }
            this.exception = data
            this.exceptionEvent.emit( new ExceptionT( true, data ) )
            return Observable.throw( {
                exception: data,
                item: returnItem
            })
        });
    }

    public post( url: string, data, noLoadingWheel?: boolean ): Observable<Object> {
        if ( !noLoadingWheel )
            this.showSpinnerOverlay()
        return this.http.post( url, JSON.stringify( data ), {
            headers: this.headers
        }).map(( res: Response ) => {
            if ( !noLoadingWheel )
                this.hideSpinnerOverlay()
            var data = res.json()
            /* Interceptors */
            for ( var i = 0; i < this.interceptors.length; i++ )
                data = this.interceptors[i]( data )
            return data
        })._catch( err => {
            if ( !noLoadingWheel )
                this.hideSpinnerOverlay()
            var returnItem = null
            var data = null
            try {
                data = JSON.parse( err._body )
                if ( data.hasOwnProperty( 'errResponse' ) )
                    returnItem = JSON.parse( data.errResponse )
            } catch ( ex ) {
                data = err._body
                returnItem = err
            }
            this.exception = data
            this.exceptionEvent.emit( new ExceptionT( true, data ) )
            return Observable.throw( {
                exception: data,
                item: returnItem
            })
        });
    }

    private showSpinnerOverlay() {
        this.count++
        this.spinnerOverlayService.showSpinnerOverlay()
    }

    private hideSpinnerOverlay() {
        this.count--;
        if ( this.count == 0 )
            this.spinnerOverlayService.hideSpinnerOverlay()
    }
}