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
        this.headers.set('srtoken', '');
    }
    HttpClient.prototype.srValidation = function (callback) {
        if (sessionStorage.getItem('srData'))
            callback(this.srInit(JSON.parse(sessionStorage.getItem('srData'))));
        else if ($('sr-data').attr('token') != "" && $('sr-data').attr('abi') != "" && $('sr-data').attr('topurl') != "") {
            var srData = {
                token: $('sr-data').attr('token'),
                abi: $('sr-data').attr('abi').trim().replace(/^0+/, ''),
                topUrl: $('sr-data').attr('topurl')
            };
            sessionStorage.setItem('srData', JSON.stringify(srData));
            callback(this.srInit(srData));
        }
        else
            window.location.href = 'error.jsp?error=Token+Not+Found';
    };
    HttpClient.prototype.srInit = function (srData) {
        $('sr-data').remove();
        this.headers.set('srtoken', srData['token']);
        this.srData = srData;
        return srData;
    };
    HttpClient.prototype.propagateException = function () {
        this.exceptionPropagationEvent.emit(this.exception);
        this.exception = null;
    };
    HttpClient.prototype.addInterceptor = function (func) {
        this.interceptors.push(func);
    };
    HttpClient.prototype.get = function (url) {
        return this.doPost(url, '{"dummy":"dummy"}');
    };
    HttpClient.prototype.post = function (url, data) {
        return this.doPost(url, JSON.stringify(data));
    };
    HttpClient.prototype.doPost = function (url, data) {
        var _this = this;
        this.count++;
        this.spinnerOverlayService.showSpinnerOverlay();
        return this.http.post(url, data, {
            headers: this.headers
        }).map(function (res) {
            _this.hideSpinnerOverlay();
            var data = res.json();
            /* Interceptors */
            for (var i = 0; i < _this.interceptors.length; i++)
                data = _this.interceptors[i](data);
            if (data.hasOwnProperty('bawarMsgs'))
                if (data.bawarMsgs.length > 0) {
                    _this.exception = data;
                    _this.exceptionEvent.emit(new ExceptionT(false, data));
                }
                else
                    _this.exception = null;
            return data;
        }).catch(function (err) {
            _this.hideSpinnerOverlay();
            var data = JSON.parse(err._body);
            var returnItem = null;
            if (err.status == 403) {
                var errorMsg = 'Token non valido';
                try {
                    errorMsg = data.esito.value + ' ' + data.esito.des + ': ' + data.errMsg;
                }
                catch (e) { }
                window.location.href = 'error.jsp?error=' + errorMsg;
            }
            else {
                if (data.hasOwnProperty('errResponse'))
                    returnItem = JSON.parse(data.errResponse);
                _this.exception = data;
                _this.exceptionEvent.emit(new ExceptionT(true, data));
            }
            return Observable_1.Observable.throw({
                exception: data,
                item: returnItem
            });
        });
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