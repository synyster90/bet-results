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
var common_1 = require('@angular/common');
var SideMenuService = (function () {
    function SideMenuService() {
        this.sideMenuAction = new core_1.EventEmitter();
    }
    SideMenuService.prototype.showMenu = function () {
        this.sideMenuAction.emit(true);
    };
    SideMenuService.prototype.hideMenu = function () {
        this.sideMenuAction.emit(false);
    };
    SideMenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SideMenuService);
    return SideMenuService;
}());
exports.SideMenuService = SideMenuService;
var SideMenu = (function () {
    function SideMenu(elementRef, sideMenuService, location, changeDetectorRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.sideMenuService = sideMenuService;
        this.location = location;
        this.changeDetectorRef = changeDetectorRef;
        this.showMenu = false;
        this.showMenuOverlay = true;
        this.showMenuClose = true;
        this.smFullHeight = typeof this.smFullHeight != 'undefined' ? this.smFullHeight : true;
        this.smToggleVisibility = typeof this.smToggleVisibility != 'undefined' ? this.smToggleVisibility : true;
        this.smHomeUrl = typeof this.smHomeUrl != 'undefined' ? this.smHomeUrl : '/';
        if (this.smFullHeight)
            $(elementRef.nativeElement).addClass('side-menu-full-height');
        if (!this.smToggleVisibility)
            $(elementRef.nativeElement).addClass('side-menu-no-hide');
        this.sideMenuService.sideMenuAction.subscribe(function (action) {
            if (action) {
                _this.showMenu = true;
                if (_this.location.path() == '') {
                    _this.showMenuOverlay = false;
                    _this.showMenuClose = false;
                }
                else {
                    _this.showMenuOverlay = true;
                    _this.showMenuClose = true;
                }
            }
            else {
                _this.showMenu = false;
                _this.showMenuOverlay = false;
                _this.showMenuClose = true;
            }
            _this.changeDetectorRef.markForCheck();
        });
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SideMenu.prototype, "smFullHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SideMenu.prototype, "smToggleVisibility", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SideMenu.prototype, "smHomeUrl", void 0);
    SideMenu = __decorate([
        core_1.Component({
            selector: 'side-menu',
            template: '<div class="side-menu-overlay" (click)="showMenu = false" *ngIf="showMenu && showMenuOverlay">&nbsp;</div>'
                + '<div class="side-menu animated fadeInLeft" *ngIf="showMenu"><button type="button" class="side-menu-close" *ngIf="showMenuClose" (click)="showMenu = false"><span>x</span></button>'
                + '<ng-content></ng-content></div>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, SideMenuService, common_1.Location, core_1.ChangeDetectorRef])
    ], SideMenu);
    return SideMenu;
}());
exports.SideMenu = SideMenu;
//# sourceMappingURL=ui-app-side-menu.js.map