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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_client_1 = require('./http-client');
var ui_app_spinner_overlay_1 = require('./ui-app-spinner-overlay');
var AngularHttpClientModule = (function () {
    function AngularHttpClientModule() {
    }
    AngularHttpClientModule.forRoot = function () {
        return {
            ngModule: AngularHttpClientModule,
            providers: [http_client_1.HttpClient, ui_app_spinner_overlay_1.SpinnerOverlayService]
        };
    };
    AngularHttpClientModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule, forms_1.FormsModule
            ],
            declarations: [
                ui_app_spinner_overlay_1.SpinnerOverlay
            ],
            entryComponents: [
                ui_app_spinner_overlay_1.SpinnerOverlay
            ],
            providers: [
                http_client_1.HttpClient, ui_app_spinner_overlay_1.SpinnerOverlayService
            ],
            exports: [
                ui_app_spinner_overlay_1.SpinnerOverlay
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AngularHttpClientModule);
    return AngularHttpClientModule;
}());
exports.AngularHttpClientModule = AngularHttpClientModule;
//# sourceMappingURL=module.js.map