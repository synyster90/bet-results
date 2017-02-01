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
var PopoverFilterService = (function () {
    function PopoverFilterService(cmpResolver, applicationRef) {
        this.cmpResolver = cmpResolver;
        this.applicationRef = applicationRef;
    }
    PopoverFilterService.prototype.showPopoverFilter = function (options) {
        var _this = this;
        var searchTextChange = new core_1.EventEmitter();
        if ($('popover-filter').length == 0) {
            setTimeout(function () {
                var viewContainerRef = _this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
                _this.filterPopover = viewContainerRef.createComponent(_this.cmpResolver.resolveComponentFactory(PopoverFilter), 0);
                _this.filterPopover.instance.init(options, searchTextChange);
            });
        }
        return searchTextChange;
    };
    PopoverFilterService.prototype.hidePopoverFilter = function () {
        this.filterPopover.destroy();
    };
    PopoverFilterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ApplicationRef])
    ], PopoverFilterService);
    return PopoverFilterService;
}());
exports.PopoverFilterService = PopoverFilterService;
var PopoverFilter = (function () {
    function PopoverFilter(element, changeDetectorRef, popoverFilterService) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.popoverFilterService = popoverFilterService;
        this.autocompleteList = [];
    }
    PopoverFilter.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var $popover = $('div.popover', _this.element.nativeElement);
            var $popoverInput = $('input', _this.element.nativeElement);
            _this.autocompleteListChange.subscribe(function (newAutocompleteList) {
                _this.autocompleteList = newAutocompleteList;
                _this.changeDetectorRef.markForCheck();
            });
            $popover.css({
                top: (_this.top - $popover.outerHeight() - 11) + 'px',
                left: (_this.left - ($popover.outerWidth() / 2)) + 'px',
                display: 'block'
            });
            if (!_this.autocomplete)
                $popoverInput.on('keydown keypress', function (event) {
                    if (event.which === 13) {
                        _this.popoverFilterService.hidePopoverFilter();
                        event.preventDefault();
                    }
                });
            $popover.on('blur', function (event) {
                if (!$.contains($(_this.element.nativeElement)[0], $(':focus')[0]))
                    _this.popoverFilterService.hidePopoverFilter();
                else if (!$(':focus').is($popoverInput))
                    $popover.focus();
            });
            $popoverInput.on('blur', function (event) {
                if (!$.contains($(_this.element.nativeElement)[0], $(':focus')[0]))
                    _this.popoverFilterService.hidePopoverFilter();
            });
            $popoverInput.focus();
        });
    };
    PopoverFilter.prototype.init = function (options, searchTextChange) {
        this.title = options.title;
        this.autocomplete = options.autocomplete;
        this.autocompleteList = options.autocompleteList;
        this.autocompleteListChange = options.autocompleteListChange;
        this.uppercase = options.uppercase;
        this.top = options.top;
        this.left = options.left;
        this.searchText = options.searchText;
        this.searchTextChange = searchTextChange;
    };
    PopoverFilter.prototype.onChange = function (search) {
        this.searchTextChange.emit(search);
    };
    PopoverFilter.prototype.onAutocompleteChange = function (selected) {
        if (selected) {
            this.searchTextChange.emit(selected.value);
            this.popoverFilterService.hidePopoverFilter();
        }
        else
            this.searchTextChange.emit('');
    };
    PopoverFilter = __decorate([
        core_1.Component({
            selector: 'popover-filter',
            template: '<div class="popover fade top in" role="tooltip"><div class="arrow" style="left: 50%;"></div>'
                + '<h3 class="popover-title" translate [model]="title"></h3><div class="popover-content">'
                + '<input type="text" [ngModel]="searchText" (ngModelChange)="onChange($event)" class="form-control autocomplete" [ngClass]="{uppercase : uppercase}" *ngIf="!autocomplete"/>'
                + '<ui-autocomplete [ac-items]="autocompleteList" [ac-search-text]="searchText" (ac-item-selected-change)="onAutocompleteChange($event)" '
                + '[ac-uppercase]="uppercase" ac-not-found="no match." ac-no-cache="true" class="form-gl" *ngIf="autocomplete"></ui-autocomplete>'
                + '</div></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef, PopoverFilterService])
    ], PopoverFilter);
    return PopoverFilter;
}());
exports.PopoverFilter = PopoverFilter;
//# sourceMappingURL=ui-app-popover-filter.js.map