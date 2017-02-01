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
var compiler_1 = require('@angular/compiler');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var ng2_translate_1 = require('ng2-translate/ng2-translate');
var ui_app_modal_dialog_1 = require('./ui-app-modal-dialog');
var index_1 = require('../components/index');
var index_2 = require('../http-client/index');
var index_3 = require('../translate/index');
var AngularDialogsModule = (function () {
    function AngularDialogsModule() {
    }
    AngularDialogsModule.forRoot = function () {
        return {
            ngModule: AngularDialogsModule,
            providers: [ui_app_modal_dialog_1.ModalDialogService]
        };
    };
    AngularDialogsModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule, forms_1.FormsModule,
                index_1.AngularComponentsModule,
                index_2.AngularHttpClientModule,
                index_3.AngularTranslateModule,
                ng2_translate_1.TranslateModule
            ],
            declarations: [
                ui_app_modal_dialog_1.ModalDialog
            ],
            entryComponents: [
                ui_app_modal_dialog_1.ModalDialog
            ],
            providers: [
                ui_app_modal_dialog_1.ModalDialogService, compiler_1.COMPILER_PROVIDERS
            ],
            exports: [
                ui_app_modal_dialog_1.ModalDialog
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AngularDialogsModule);
    return AngularDialogsModule;
}());
exports.AngularDialogsModule = AngularDialogsModule;
//# sourceMappingURL=module.js.map