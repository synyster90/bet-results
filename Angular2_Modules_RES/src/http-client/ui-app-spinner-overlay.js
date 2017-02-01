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
require('./img/gears.gif');
var SpinnerOverlayService = (function () {
    function SpinnerOverlayService(cmpResolver, applicationRef) {
        this.cmpResolver = cmpResolver;
        this.applicationRef = applicationRef;
    }
    SpinnerOverlayService.prototype.showSpinnerOverlay = function () {
        var _this = this;
        setTimeout(function () {
            if ($('spinner-overlay').length == 0) {
                var viewContainerRef = _this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
                _this.overlay = viewContainerRef.createComponent(_this.cmpResolver.resolveComponentFactory(SpinnerOverlay), 0);
            }
        });
    };
    SpinnerOverlayService.prototype.hideSpinnerOverlay = function () {
        var _this = this;
        setTimeout(function () {
            _this.overlay.destroy();
        });
    };
    SpinnerOverlayService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ApplicationRef])
    ], SpinnerOverlayService);
    return SpinnerOverlayService;
}());
exports.SpinnerOverlayService = SpinnerOverlayService;
var SpinnerOverlay = (function () {
    function SpinnerOverlay(element) {
        this.element = element;
    }
    SpinnerOverlay.prototype.ngAfterViewInit = function () {
        $(this.element.nativeElement).find('div.overlay').css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            backgroundColor: 'grey',
            opacity: 0.6,
            '-webkit-filter': 'blur(1.5px)',
            '-moz-filter': 'blur(1.5px)',
            '-ms-filter': 'blur(1.5px)',
            '-o-filter': 'blur(1.5px)',
            filter: 'blur(1.5px)'
        });
        $(this.element.nativeElement).find('div.spinner-container').css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '90px',
            height: '90px',
            marginTop: '-45px',
            marginLeft: '-45px',
            padding: '10px',
            zIndex: 1001,
            backgroundColor: '#fff',
            borderRadius: '15px',
            opacity: 0.7,
            '-webkit-filter': 'blur(1.5px)',
            '-moz-filter': 'blur(1.5px)',
            '-ms-filter': 'blur(1.5px)',
            '-o-filter': 'blur(1.5px)',
            filter: 'blur(1.5px)'
        });
    };
    SpinnerOverlay = __decorate([
        core_1.Component({
            selector: 'spinner-overlay',
            template: '<div class="overlay"></div><div class="spinner-container"><img src="dist/assets/@angular/modules/src/http-client/img/gears.gif"/></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SpinnerOverlay);
    return SpinnerOverlay;
}());
exports.SpinnerOverlay = SpinnerOverlay;
//# sourceMappingURL=ui-app-spinner-overlay.js.map