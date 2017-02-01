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
var OverlayService = (function () {
    function OverlayService(cmpResolver, applicationRef) {
        this.cmpResolver = cmpResolver;
        this.applicationRef = applicationRef;
    }
    OverlayService.prototype.showPopoverOverlay = function (clickCallback) {
        var _this = this;
        if ($('overlay').length == 0) {
            setTimeout(function () {
                var viewContainerRef = _this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
                _this.overlayComp = viewContainerRef.createComponent(_this.cmpResolver.resolveComponentFactory(Overlay), 0);
                $(_this.overlayComp.location.nativeElement).on('click', function (event) {
                    clickCallback();
                    _this.hidePopoverOverlay();
                });
            });
        }
    };
    OverlayService.prototype.hidePopoverOverlay = function () {
        this.overlayComp.destroy();
    };
    OverlayService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ApplicationRef])
    ], OverlayService);
    return OverlayService;
}());
exports.OverlayService = OverlayService;
var Overlay = (function () {
    function Overlay(element) {
        this.element = element;
    }
    Overlay.prototype.ngAfterViewInit = function () {
        $(this.element.nativeElement).css({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '90',
            opacity: '0'
        });
    };
    Overlay = __decorate([
        core_1.Component({
            selector: 'overlay',
            template: ''
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Overlay);
    return Overlay;
}());
exports.Overlay = Overlay;
//# sourceMappingURL=ui-app-overlay.js.map