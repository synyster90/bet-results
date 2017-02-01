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
var Popover = (function () {
    function Popover(elementRef) {
        this.elementRef = elementRef;
    }
    Popover.prototype.ngAfterViewInit = function () {
        $('button', this.elementRef.nativeElement).popover({
            title: this.title,
            content: this.content,
            placement: 'left',
            trigger: 'manual',
            html: true
        });
        var $this = this;
        $('button', this.elementRef.nativeElement).on('click', function () {
            $(this).popover('toggle');
        });
        $('button', this.elementRef.nativeElement).on('blur', function () {
            try {
                if (!$.contains($('div.popover', $this.elementRef.nativeElement)[0], $(':focus')[0]) && !$(':focus').is($('div.popover', $this.elementRef.nativeElement)))
                    $(this).popover('hide');
                else
                    $(this).focus();
            }
            catch (e) {
                $(this).popover('hide');
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Popover.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Popover.prototype, "content", void 0);
    Popover = __decorate([
        core_1.Component({
            selector: 'ui-popover',
            template: '<button type="button" class="btn btn-default" data-toggle="popover"><ng-content></ng-content></button>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Popover);
    return Popover;
}());
exports.Popover = Popover;
//# sourceMappingURL=ui-app-popover.js.map