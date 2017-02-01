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
var http_client_1 = require('../../http-client/http-client');
var TopFixed = (function () {
    function TopFixed(httpClient, domSanitizer) {
        this.httpClient = httpClient;
        this.domSanitizer = domSanitizer;
    }
    TopFixed.prototype.ngAfterViewInit = function () {
        if (this.httpClient.srData)
            this.topUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.httpClient.srData['topUrl']);
    };
    TopFixed = __decorate([
        core_1.Component({
            selector: 'top-fixed',
            template: '<iframe id="iframe-top" width="100%" height="100%" [src]="topUrl" frameborder="0"></iframe>',
        }), 
        __metadata('design:paramtypes', [http_client_1.HttpClient, platform_browser_1.DomSanitizer])
    ], TopFixed);
    return TopFixed;
}());
exports.TopFixed = TopFixed;
//# sourceMappingURL=ui-app-top-fixed.js.map