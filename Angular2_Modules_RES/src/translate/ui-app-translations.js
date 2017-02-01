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
var ng2_translate_1 = require('ng2-translate/ng2-translate');
require('moment');
require('./flags/de.png');
require('./flags/es.png');
require('./flags/fr.png');
require('./flags/gb.png');
require('./flags/it.png');
var TranslateDirective = (function () {
    function TranslateDirective(el, translate) {
        var _this = this;
        this.el = el;
        this.translate = translate;
        translate.onLangChange.subscribe(function (event) {
            _this.setContent(_this.translateKey);
        });
    }
    TranslateDirective.prototype.ngAfterViewInit = function () {
        if (this.translateKey && this.translateKey != '')
            this.setContent(this.translateKey);
        else if (this.model && this.model != '')
            this.setContent(this.model);
    };
    TranslateDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        setTimeout(function () {
            if (changes.hasOwnProperty('model'))
                if (changes['model']['currentValue'])
                    _this.setContent(changes['model']['currentValue']);
        });
    };
    TranslateDirective.prototype.setContent = function (key) {
        var _this = this;
        if (typeof this.origInnerHtml == 'undefined')
            this.origInnerHtml = $(this.el.nativeElement).html();
        this.translateKey = key;
        var param = {};
        if (this.translateValues)
            try {
                param = JSON.parse(this.translateValues);
            }
            catch (e) {
            }
        this.translate.get(key, param).subscribe(function (value) {
            $(_this.el.nativeElement).html((_this.origInnerHtml ? _this.origInnerHtml : '') + value);
        });
    };
    __decorate([
        core_1.Input('translate'), 
        __metadata('design:type', String)
    ], TranslateDirective.prototype, "translateKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TranslateDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input('translate-values'), 
        __metadata('design:type', String)
    ], TranslateDirective.prototype, "translateValues", void 0);
    TranslateDirective = __decorate([
        core_1.Directive({
            selector: '[translate]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, ng2_translate_1.TranslateService])
    ], TranslateDirective);
    return TranslateDirective;
}());
exports.TranslateDirective = TranslateDirective;
var LangSelect = (function () {
    function LangSelect(translate, changeDetectorRef) {
        this.translate = translate;
        this.changeDetectorRef = changeDetectorRef;
        this.selectedLang = null;
        this.showDropdown = false;
        this.languages = [{
                id: 'it',
                name: 'LANG_SELECT.IT',
                flagImg: 'dist/assets/@angular/modules/src/translate/flags/it.png',
            }, {
                id: 'en',
                name: 'LANG_SELECT.EN',
                flagImg: 'dist/assets/@angular/modules/src/translate/flags/gb.png',
            }, {
                id: 'de',
                name: 'LANG_SELECT.DE',
                flagImg: 'dist/assets/@angular/modules/src/translate/flags/de.png',
            }, {
                id: 'fr',
                name: 'LANG_SELECT.FR',
                flagImg: 'dist/assets/@angular/modules/src/translate/flags/fr.png',
            }, {
                id: 'es',
                name: 'LANG_SELECT.ES',
                flagImg: 'dist/assets/@angular/modules/src/translate/flags/es.png',
            }];
        var langToSelect = 'it';
        for (var index = 0; index < this.languages.length; index++)
            if (this.languages[index].id == langToSelect) {
                this.selectedLang = this.languages[index];
                moment.locale(langToSelect);
                break;
            }
    }
    LangSelect.prototype.langChange = function (langKey, index) {
        if (this.translate.currentLang != langKey) {
            this.selectedLang = this.languages[index];
            moment.locale(langKey);
            this.translate.use(langKey);
            this.changeDetectorRef.markForCheck();
        }
    };
    LangSelect.prototype.toggleDropdown = function () {
        var $this = this;
        if (this.showDropdown)
            setTimeout(function () {
                $this.showDropdown = !$this.showDropdown;
                $this.changeDetectorRef.markForCheck();
            }, 100);
        else
            this.showDropdown = !this.showDropdown;
    };
    LangSelect = __decorate([
        core_1.Component({
            selector: 'lang-select',
            template: '<div class="dropdown" [ngClass]="{open: showDropdown}"><button class="btn btn-default btn-sm dropdown-toggle" type="button" (click)="toggleDropdown()" (blur)="toggleDropdown()">'
                + '<img src="{{selectedLang.flagImg}}" class="lang-flag"/><span translate [model]="selectedLang.name"></span> <span class="glyphicon glyphicon-menu-down"></span></button>'
                + '<ul class="dropdown-menu"><li [ngClass]="{\'disabled\':lang.id == selectedLang.id}" *ngFor="let lang of languages; let $index = index" class="lang-option">'
                + '<a (click)="langChange(lang.id, $index)" translate [model]="lang.name"><img src="{{lang.flagImg}}" class="lang-flag"/></a></li></ul></div><hr>'
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService, core_1.ChangeDetectorRef])
    ], LangSelect);
    return LangSelect;
}());
exports.LangSelect = LangSelect;
//# sourceMappingURL=ui-app-translations.js.map