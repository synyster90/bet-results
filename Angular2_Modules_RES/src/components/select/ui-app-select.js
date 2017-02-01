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
var Select = (function () {
    function Select(element, changeDetectorRef) {
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        this.selectChange = new core_1.EventEmitter();
        this.isSelectOpen = false;
    }
    Select.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.$selectButton = $('button', this.element.nativeElement);
        this.$selectButton.on('blur', function () {
            if (_this.isSelectOpen && !$.contains(_this.$selectDropdown[0], $(':focus')[0])) {
                _this.isSelectOpen = false;
                _this.changeDetectorRef.markForCheck();
            }
        });
    };
    Select.prototype.select = function (option) {
        if (this.selectNItems >= 1000 && option.id >= 1000 || option.id == this.selectModel['id'])
            return;
        this.isSelectOpen = false;
        this.selectChange.emit(option);
        this.changeDetectorRef.markForCheck();
    };
    Select.prototype.toggleSelect = function (e) {
        var _this = this;
        if (!this.isSelectOpen) {
            this.isSelectOpen = true;
            setTimeout(function () {
                _this.$selectDropdown = $('div.select-dropdown', _this.element.nativeElement);
                var selectMenuHeight = (_this.selectOptions.length < 8) ? _this.selectOptions.length * 20 : 161;
                if (e.clientY + selectMenuHeight >= window.innerHeight)
                    // Position Top
                    _this.$selectDropdown.css({
                        bottom: '96%',
                        minWidth: _this.$selectButton.outerWidth() + 2,
                        boxShadow: '2px -5px 10px rgba(0,0,0,0.2)',
                        display: 'block'
                    });
                else
                    _this.$selectDropdown.css({
                        top: '96%',
                        minWidth: _this.$selectButton.outerWidth() + 2,
                        boxShadow: '2px 5px 10px rgba(0,0,0,0.2)',
                        display: 'block'
                    });
            });
        }
        else
            this.isSelectOpen = false;
        this.changeDetectorRef.markForCheck();
    };
    __decorate([
        core_1.Input('select-model'), 
        __metadata('design:type', Object)
    ], Select.prototype, "selectModel", void 0);
    __decorate([
        core_1.Input('select-options'), 
        __metadata('design:type', Array)
    ], Select.prototype, "selectOptions", void 0);
    __decorate([
        core_1.Input('select-n-items'), 
        __metadata('design:type', Number)
    ], Select.prototype, "selectNItems", void 0);
    __decorate([
        core_1.Output('select-change'), 
        __metadata('design:type', core_1.EventEmitter)
    ], Select.prototype, "selectChange", void 0);
    Select = __decorate([
        core_1.Component({
            selector: 'ui-select',
            template: '<button class="btn btn-default btn-sm" type="button" (click)="toggleSelect($event)"><span>{{selectModel.name}}</span> <span class="glyphicon glyphicon-menu-down"></span></button>'
                + '<div class="select-dropdown" *ngIf="isSelectOpen"><div class="select-scroll"><span *ngFor="let option of selectOptions" (click)="select(option)" class="select-dropdown-item" '
                + '[ngClass]="{selected: option.id == selectModel.id, disabled : selectNItems >= 1000 && option.id >= 1000}">{{option.name}}</span></div></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef])
    ], Select);
    return Select;
}());
exports.Select = Select;
//# sourceMappingURL=ui-app-select.js.map