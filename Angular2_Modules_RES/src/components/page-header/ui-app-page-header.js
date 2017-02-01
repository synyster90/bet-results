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
var ui_app_side_menu_1 = require('../../components/side-menu/ui-app-side-menu');
var utils_1 = require('../../utils/utils');
var PageHeader = (function () {
    function PageHeader(sideMenuService, utilService) {
        this.sideMenuService = sideMenuService;
        this.utilService = utilService;
    }
    PageHeader = __decorate([
        core_1.Component({
            selector: 'page-header',
            template: '<h3><button class="btn btn-default btn-sm ng-scope" onclick="window.close()" type="button"><span class="icon icon-close" aria-hidden="true" title="chiudi"></span></button>'
                + '<button type="button" class="btn btn-default btn-sm" (click)="sideMenuService.showMenu()"><span class="icon icon-menu" aria-hidden="true" title="menu"></span></button>'
                + '<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> <span>{{utilService.pageTitle.getTitle()}}</span></h3>'
        }), 
        __metadata('design:paramtypes', [ui_app_side_menu_1.SideMenuService, utils_1.UtilService])
    ], PageHeader);
    return PageHeader;
}());
exports.PageHeader = PageHeader;
//# sourceMappingURL=ui-app-page-header.js.map