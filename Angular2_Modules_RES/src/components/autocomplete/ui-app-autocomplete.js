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
var AutocompleteHighlight = (function () {
    function AutocompleteHighlight(element) {
        this.element = element;
        this.fullMatch = typeof this.fullMatch == 'boolean' ? this.fullMatch : false;
    }
    AutocompleteHighlight.prototype.ngAfterViewInit = function () {
        this.elementValue = $(this.element.nativeElement).text();
    };
    AutocompleteHighlight.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('text'))
            this.hightlightContent(changes['text'].currentValue);
    };
    AutocompleteHighlight.prototype.hightlightContent = function (text) {
        var _this = this;
        var $element = $(this.element.nativeElement);
        if (text)
            setTimeout(function () {
                var index = _this.fullMatch ? _this.elementValue.indexOf(text) : _this.elementValue.toUpperCase().indexOf(text.toUpperCase());
                $element.html(_this.elementValue.slice(0, index) + '<font color="#4ad840">' + _this.elementValue.slice(index, index + text.length) + '</font>'
                    + _this.elementValue.slice(index + text.length));
            });
        else
            $element.html(this.elementValue);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutocompleteHighlight.prototype, "text", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutocompleteHighlight.prototype, "fullMatch", void 0);
    AutocompleteHighlight = __decorate([
        core_1.Directive({
            selector: '[highlight]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AutocompleteHighlight);
    return AutocompleteHighlight;
}());
exports.AutocompleteHighlight = AutocompleteHighlight;
var Autocomplete = (function () {
    function Autocomplete(element, changeDetectorRef) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.$this = this;
        this.filterItems = [];
        this.bottomReached = true;
        this.isListOpen = false;
        this.acItemSelectedChange = new core_1.EventEmitter();
        this.acSearchTextChange = new core_1.EventEmitter();
        this.acItemsChange = new core_1.EventEmitter();
        this.acDisabled = typeof this.acDisabled == 'boolean' ? this.acDisabled : false;
        this.acNoCache = typeof this.acNoCache == 'boolean' ? this.acNoCache : true;
        this.acUppercase = typeof this.acUppercase == 'boolean' ? this.acUppercase : false;
        this.acSelectOnMatch = typeof this.acSelectOnMatch == 'boolean' ? this.acSelectOnMatch : false;
        this.acHideDes = typeof this.acHideDes == 'boolean' ? this.acHideDes : true;
        this.acFullMatch = typeof this.acFullMatch == 'boolean' ? this.acFullMatch : false;
    }
    Autocomplete.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.acItemSelected) {
                _this.acSearchText = _this.acItemSelected['value'];
                _this.changeDetectorRef.markForCheck();
            }
            if (_this.acItems)
                _this.orderItems();
            $('input', _this.element.nativeElement).on('focus', function (event) {
                if (typeof _this.acSearchText == 'undefined' || _this.acSearchText == '' && !_this.isListOpen)
                    _this.showAutocompleteList();
            });
            _this.acItemSelectedChange.subscribe(function (newItem) {
                if (newItem) {
                    _this.hideAutocompleteList();
                    _this.acSearchText = newItem.value;
                }
            });
        });
    };
    Autocomplete.prototype.ngOnChanges = function (changes) {
        var _this = this;
        setTimeout(function () {
            if (changes.hasOwnProperty('acItems'))
                _this.acItemsChange.emit(changes['acItems']['currentValue']);
            if (changes.hasOwnProperty('acDisabled'))
                _this.acDisabled = changes['acDisabled']['currentValue'];
            if (changes.hasOwnProperty('acItemSelected'))
                _this.acItemSelected = changes['acItemSelected']['currentValue'];
            _this.changeDetectorRef.markForCheck();
        });
    };
    Autocomplete.prototype.showAutocompleteList = function () {
        var _this = this;
        this.isListOpen = true;
        this.changeDetectorRef.markForCheck();
        setTimeout(function () {
            var $this = _this;
            $('div.ui-autocomplete-list-container', _this.element.nativeElement).scroll(function (event) {
                if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                    $this.bottomReached = true;
                    $this.changeDetectorRef.markForCheck();
                }
            });
            _this.filter(_this.acSearchText);
            _this.acItemsChange.subscribe(function (newItems) {
                _this.acItems = newItems ? newItems : [];
                _this.orderItems();
                _this.filter();
            });
            _this.acSearchTextChange.subscribe(function (newSearchText) {
                _this.filter(newSearchText);
            });
            setTimeout(function () {
                $(document).on('click', function (event) {
                    if (!$(event.target).is($(_this.element.nativeElement))) {
                        $(document).off('click');
                        if (_this.isListOpen)
                            if (!$.contains($('div.ui-autocomplete-list', _this.element.nativeElement)[0], $(event.target)[0]) && !$(event.target).hasClass('autocomplete-toggle'))
                                _this.hideAutocompleteList();
                            else
                                $('input', _this.element.nativeElement).focus();
                    }
                });
            }, 300);
        });
    };
    Autocomplete.prototype.hideAutocompleteList = function () {
        this.isListOpen = false;
        if (!this.acItemSelected)
            this.acSearchText = '';
        this.changeDetectorRef.markForCheck();
    };
    Autocomplete.prototype.toggleFocus = function () {
        if (!this.isListOpen)
            $('input', this.element.nativeElement).focus();
    };
    Autocomplete.prototype.clear = function () {
        var _this = this;
        this.acSearchText = '';
        this.acSearchTextChange.emit('');
        this.acItemSelected = null;
        this.acItemSelectedChange.emit(null);
        setTimeout(function () {
            $('input', _this.element.nativeElement).focus();
        });
    };
    Autocomplete.prototype.onChange = function (search) {
        if (!this.isListOpen)
            this.showAutocompleteList();
        this.acSearchTextChange.emit(search);
    };
    Autocomplete.prototype.filter = function (search) {
        if (!search || search == '')
            this.filterItems = this.acItems;
        else {
            var filtered = [];
            for (var i = 0; i < this.acItems.length; i++) {
                var match;
                var MATCH_PATTERN = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                if (this.acFullMatch)
                    match = new RegExp('^' + MATCH_PATTERN).test(this.acItems[i]['value']);
                else
                    match = new RegExp(MATCH_PATTERN.toUpperCase()).test(this.acItems[i]['value'].toUpperCase());
                if (match)
                    filtered.push(this.acItems[i]);
            }
            this.filterItems = filtered;
            // Select on Match
            if (this.acSelectOnMatch && search != '')
                if (this.filterItems.length == 1 && search.toUpperCase() == this.filterItems[0].value.toUpperCase())
                    this.acItemSelectedChange.emit(this.filterItems[0]);
        }
        this.changeDetectorRef.markForCheck();
    };
    Autocomplete.prototype.orderItems = function () {
        var key = 'value';
        if (this.acItems.length > 1)
            this.acItems.sort(function (a, b) {
                if (!isNaN(a[key]) && !isNaN(b[key])) {
                    if (parseInt(a[key]) == parseInt(b[key]))
                        return 0;
                    else if (parseInt(a[key]) > parseInt(b[key]))
                        return 1;
                    else if (parseInt(a[key]) < parseInt(b[key]))
                        return -1;
                }
                else if (typeof a[key] == 'string' && typeof b[key] == 'string') {
                    if (a[key].toString().toUpperCase() == b[key].toString().toUpperCase())
                        return 0;
                    else if (a[key].toString().toUpperCase() > b[key].toString().toUpperCase())
                        return 1;
                    else if (a[key].toString().toUpperCase() < b[key].toString().toUpperCase())
                        return -1;
                }
            });
    };
    Autocomplete.prototype.select = function (index) {
        this.acItemSelectedChange.emit(this.filterItems[index]);
    };
    __decorate([
        core_1.Input('class'), 
        __metadata('design:type', String)
    ], Autocomplete.prototype, "customClass", void 0);
    __decorate([
        core_1.Input('ac-input-name'), 
        __metadata('design:type', String)
    ], Autocomplete.prototype, "acInputName", void 0);
    __decorate([
        core_1.Input('ac-not-found'), 
        __metadata('design:type', String)
    ], Autocomplete.prototype, "acNotFound", void 0);
    __decorate([
        core_1.Input('ac-uppercase'), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "acUppercase", void 0);
    __decorate([
        core_1.Input('ac-disabled'), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "acDisabled", void 0);
    __decorate([
        core_1.Input('ac-no-cache'), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "acNoCache", void 0);
    __decorate([
        core_1.Input('ac-select-on-match'), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "acSelectOnMatch", void 0);
    __decorate([
        core_1.Input('ac-full-match'), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "acFullMatch", void 0);
    __decorate([
        core_1.Input('ac-items'), 
        __metadata('design:type', Array)
    ], Autocomplete.prototype, "acItems", void 0);
    __decorate([
        core_1.Input('ac-item-selected'), 
        __metadata('design:type', Object)
    ], Autocomplete.prototype, "acItemSelected", void 0);
    __decorate([
        core_1.Input('ac-search-text'), 
        __metadata('design:type', String)
    ], Autocomplete.prototype, "acSearchText", void 0);
    __decorate([
        core_1.Input('ac-hide-des'), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "acHideDes", void 0);
    __decorate([
        core_1.Output('ac-item-selected-change'), 
        __metadata('design:type', core_1.EventEmitter)
    ], Autocomplete.prototype, "acItemSelectedChange", void 0);
    __decorate([
        core_1.Output('ac-search-text-change'), 
        __metadata('design:type', core_1.EventEmitter)
    ], Autocomplete.prototype, "acSearchTextChange", void 0);
    Autocomplete = __decorate([
        core_1.Component({
            selector: 'ui-autocomplete',
            template: '<div class="ui-autocomplete-container">'
                + '<input type="text" name="{{acInputName}}" [(ngModel)]="acSearchText" (ngModelChange)="onChange($event)" class="form-control autocomplete {{customClass}}"'
                + ' [disabled]="acDisabled" [ngClass]="{uppercase : acUppercase}"/>'
                + '<button tabindex="-1" type="button" class="ui-autocomplete-clear-btn" (click)="clear()" *ngIf="acSearchText && !acDisabled"><span>x</span></button>'
                + '<span tabindex="0" class="autocomplete-toggle glyphicon glyphicon-chevron-down" role="button" (click)="toggleFocus()"></span>'
                + '</div>'
                + '<div class="ui-autocomplete-list" *ngIf="isListOpen"><div class="ui-autocomplete-list-container"><div class="ui-autocomplete-list-scroller">'
                + '<span *ngFor="let item of filterItems | lazyLoadFilter:20:bottomReached; let $index = index; let $last = last" (click)="select($index)"'
                + ' class="ui-autocomplete-list-item" title="{{item.des}}"><font color="#000" highlight [text]="acSearchText" full-match="acFullMatch">{{item.value}}</font>'
                + '<font *ngIf="!acHideDes && item.des && item.des != \'null\'"> - {{item.des}}</font></span>'
                + '<span *ngIf="filterItems.length == 0" class="ui-autocomplete-list-item-not-found">{{acNotFound}}</span>'
                + '</div></div></div>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef])
    ], Autocomplete);
    return Autocomplete;
}());
exports.Autocomplete = Autocomplete;
//# sourceMappingURL=ui-app-autocomplete.js.map