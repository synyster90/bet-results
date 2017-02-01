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
var ui_app_popover_filter_1 = require('../popover-filter/ui-app-popover-filter');
var utils_1 = require('../../utils/utils');
var TableHead = (function () {
    function TableHead(element, utilService, popoverFilterService, changeDetectorRef) {
        this.element = element;
        this.utilService = utilService;
        this.popoverFilterService = popoverFilterService;
        this.changeDetectorRef = changeDetectorRef;
        this.hdcurrentpageChange = new core_1.EventEmitter();
        this.hdsorttypeChange = new core_1.EventEmitter();
        this.hdsortreverseChange = new core_1.EventEmitter();
        this.hdfiltersearchChange = new core_1.EventEmitter();
        this.hdFilterAutocompleteList = [];
        this.hdFilterAutocompleteListChange = new core_1.EventEmitter();
        this.showFilter = true;
        this.hdFilterUppercase = typeof this.hdFilterUppercase == 'boolean' ? this.hdFilterUppercase : false;
        this.hdFilterAutocomplete = typeof this.hdFilterAutocomplete == 'boolean' ? this.hdFilterAutocomplete : false;
    }
    TableHead.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.showFilter = typeof _this.hdfiltersearch == 'undefined' ? false : true;
        });
    };
    TableHead.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('hdFilterAutocompleteList'))
            this.hdFilterAutocompleteListChange.emit(changes['hdFilterAutocompleteList']['currentValue']);
    };
    TableHead.prototype.setHdFilterSearch = function (value) {
        var filterKeyPath = this.hdType.indexOf('.') === -1 ? [this.hdType] : this.hdType.split('.');
        this.setHdFilterSearchValue(value, filterKeyPath, this.hdfiltersearch);
        this.changeDetectorRef.markForCheck();
    };
    TableHead.prototype.setHdFilterSearchValue = function (value, filterKeyPath, tempFilter) {
        var key = filterKeyPath[0];
        if (tempFilter.hasOwnProperty(key))
            if (typeof tempFilter[key] == 'string') {
                tempFilter[key] = value;
            }
            else {
                filterKeyPath.splice(0, 1);
                this.setHdFilterSearchValue(value, filterKeyPath, tempFilter[key]);
            }
        else {
            filterKeyPath.splice(0, 1);
            if (filterKeyPath.length == 0)
                tempFilter[key] = value;
            else {
                tempFilter[key] = {};
                this.setHdFilterSearchValue(value, filterKeyPath, tempFilter[key]);
            }
        }
    };
    TableHead.prototype.getHdFilterSearch = function () {
        var filterKeyPath = this.hdType.indexOf('.') === -1 ? [this.hdType] : this.hdType.split('.');
        return this.getHdFilterSearchValue(filterKeyPath, this.hdfiltersearch);
    };
    TableHead.prototype.getHdFilterSearchValue = function (filterKeyPath, tempFilter) {
        var key = filterKeyPath[0];
        if (tempFilter.hasOwnProperty(key))
            if (typeof tempFilter[key] == 'string')
                return tempFilter[key];
            else {
                filterKeyPath.splice(0, 1);
                return this.getHdFilterSearchValue(filterKeyPath, tempFilter[key]);
            }
        else
            return '';
    };
    TableHead.prototype.sortClick = function () {
        if (this.hdsorttype == this.hdType)
            this.hdsortreverse = !this.hdsortreverse;
        else
            this.hdsortreverse = false;
        this.hdsortreverseChange.emit(this.hdsortreverse);
        if (this.hdsorttype != this.hdType) {
            this.hdsorttype = this.hdType;
            this.hdsorttypeChange.emit(this.hdType);
        }
        this.changeDetectorRef.markForCheck();
    };
    TableHead.prototype.togglePopover = function (event) {
        var _this = this;
        if (event)
            $(event.target).blur();
        if (this.showFilter && $(event.target).is($('button.filter-btn', this.element.nativeElement))) {
            event.stopPropagation();
            var $this = this;
            setTimeout(function () {
                _this.popoverFilterService.showPopoverFilter({
                    top: $(event.target).offset().top + 10,
                    left: $(event.target).offset().left + ($(event.target).height() / 2),
                    title: _this.hdFilterTitle,
                    autocomplete: _this.hdFilterAutocomplete,
                    autocompleteList: _this.hdFilterAutocompleteList ? _this.hdFilterAutocompleteList : [],
                    autocompleteListChange: _this.hdFilterAutocompleteListChange,
                    uppercase: _this.hdFilterUppercase,
                    searchText: _this.getHdFilterSearch()
                }).subscribe(function (searchText) {
                    if (searchText && searchText != '') {
                        _this.hdcurrentpage = 1;
                        _this.hdcurrentpageChange.emit(1);
                        $('button.filter-btn', _this.element.nativeElement).addClass('filter-btn-active');
                    }
                    else
                        $('button.filter-btn', _this.element.nativeElement).removeClass('filter-btn-active');
                    _this.setHdFilterSearch(searchText);
                    _this.hdfiltersearchChange.emit(_this.hdfiltersearch);
                });
            });
        }
    };
    __decorate([
        core_1.Input('hd-name'), 
        __metadata('design:type', String)
    ], TableHead.prototype, "hdName", void 0);
    __decorate([
        core_1.Input('hd-type'), 
        __metadata('design:type', String)
    ], TableHead.prototype, "hdType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TableHead.prototype, "hdcurrentpage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableHead.prototype, "hdcurrentpageChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TableHead.prototype, "hdsorttype", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableHead.prototype, "hdsorttypeChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TableHead.prototype, "hdsortreverse", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableHead.prototype, "hdsortreverseChange", void 0);
    __decorate([
        core_1.Input('hd-filter-title'), 
        __metadata('design:type', String)
    ], TableHead.prototype, "hdFilterTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableHead.prototype, "hdfiltersearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableHead.prototype, "hdfiltersearchChange", void 0);
    __decorate([
        core_1.Input('hd-filter-uppercase'), 
        __metadata('design:type', Boolean)
    ], TableHead.prototype, "hdFilterUppercase", void 0);
    __decorate([
        core_1.Input('hd-filter-autocomplete'), 
        __metadata('design:type', Boolean)
    ], TableHead.prototype, "hdFilterAutocomplete", void 0);
    __decorate([
        core_1.Input('hd-filter-autocomplete-list'), 
        __metadata('design:type', Array)
    ], TableHead.prototype, "hdFilterAutocompleteList", void 0);
    TableHead = __decorate([
        core_1.Component({
            selector: 'table-head',
            template: '<div class="sort" (click)="sortClick()">'
                + '<span translate [model]="hdName"></span> <span *ngIf="hdsorttype == hdType" [ngClass]="utilService.sortClass(hdsortreverse)"></span>'
                + '<button type="button" class="filter-btn btn btn-default btn-xs" (click)="togglePopover($event)" *ngIf="showFilter">'
                + '<span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, utils_1.UtilService, ui_app_popover_filter_1.PopoverFilterService, core_1.ChangeDetectorRef])
    ], TableHead);
    return TableHead;
}());
exports.TableHead = TableHead;
//# sourceMappingURL=ui-app-table-head.js.map