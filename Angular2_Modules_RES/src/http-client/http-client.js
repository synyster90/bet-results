"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var http_1 = require('@angular/http');
var ui_app_spinner_overlay_1 = require('./ui-app-spinner-overlay');
var ExceptionT = (function () {
    function ExceptionT(isError, fault) {
        this.isError = isError;
        this.fault = fault;
    }
    return ExceptionT;
}());
exports.ExceptionT = ExceptionT;
var HttpClient = (function () {
    function HttpClient(http, spinnerOverlayService) {
        this.http = http;
        this.spinnerOverlayService = spinnerOverlayService;
        this.count = 0;
        this.exceptionEvent = new core_1.EventEmitter();
        this.exceptionPropagationEvent = new core_1.EventEmitter();
        // Http
        this.interceptors = [];
        this.headers = new http_1.Headers();
        this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }
    HttpClient.prototype.propagateException = function () {
        this.exceptionPropagationEvent.emit(this.exception);
        this.exception = null;
    };
    HttpClient.prototype.addInterceptor = function (func) {
        this.interceptors.push(func);
    };
    HttpClient.prototype.get = function (url, noLoadingWheel) {
        var _this = this;
        if (!noLoadingWheel)
            this.showSpinnerOverlay();
        return this.http.get(url, {
            headers: this.headers
        }).map(function (res) {
            if (!noLoadingWheel)
                _this.hideSpinnerOverlay();
            var data = res.json();
            /* Interceptors */
            for (var i = 0; i < _this.interceptors.length; i++)
                data = _this.interceptors[i](data);
            return data;
        })._catch(function (err) {
            if (!noLoadingWheel)
                _this.hideSpinnerOverlay();
            var returnItem = null;
            var data = null;
            try {
                data = JSON.parse(err._body);
                if (data.hasOwnProperty('errResponse'))
                    returnItem = JSON.parse(data.errResponse);
            }
            catch (ex) {
                data = err._body;
                returnItem = err;
            }
            _this.exception = data;
            _this.exceptionEvent.emit(new ExceptionT(true, data));
            return Observable_1.Observable.throw({
                exception: data,
                item: returnItem
            });
        });
    };
    HttpClient.prototype.post = function (url, data, noLoadingWheel) {
        var _this = this;
        if (!noLoadingWheel)
            this.showSpinnerOverlay();
        return this.http.post(url, JSON.stringify(data), {
            headers: this.headers
        }).map(function (res) {
            if (!noLoadingWheel)
                _this.hideSpinnerOverlay();
            var data = res.json();
            /* Interceptors */
            for (var i = 0; i < _this.interceptors.length; i++)
                data = _this.interceptors[i](data);
            return data;
        })._catch(function (err) {
            if (!noLoadingWheel)
                _this.hideSpinnerOverlay();
            var returnItem = null;
            var data = null;
            try {
                data = JSON.parse(err._body);
                if (data.hasOwnProperty('errResponse'))
                    returnItem = JSON.parse(data.errResponse);
            }
            catch (ex) {
                data = err._body;
                returnItem = err;
            }
            _this.exception = data;
            _this.exceptionEvent.emit(new ExceptionT(true, data));
            return Observable_1.Observable.throw({
                exception: data,
                item: returnItem
            });
        });
    };
    HttpClient.prototype.showSpinnerOverlay = function () {
        this.count++;
        this.spinnerOverlayService.showSpinnerOverlay();
    };
    HttpClient.prototype.hideSpinnerOverlay = function () {
        this.count--;
        if (this.count == 0)
            this.spinnerOverlayService.hideSpinnerOverlay();
    };
    HttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ui_app_spinner_overlay_1.SpinnerOverlayService])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-client.js.map