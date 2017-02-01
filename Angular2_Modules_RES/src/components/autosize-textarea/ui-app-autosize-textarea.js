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
var AutosizeTextarea = (function () {
    function AutosizeTextarea(element) {
        this.element = element;
    }
    AutosizeTextarea.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutosizeTextarea.prototype.ngOnInit = function () {
        this.maxHeight = $(this.element.nativeElement).css('max-height').replace('px', '');
        this.adjust();
    };
    AutosizeTextarea.prototype.adjust = function () {
        this.element.nativeElement.style.height = 'auto';
        var newHeight = (this.element.nativeElement.scrollHeight + 1);
        this.element.nativeElement.style.height = newHeight + "px";
        this.element.nativeElement.style.overflowY = (newHeight > this.maxHeight) ? 'scroll' : 'hidden';
    };
    __decorate([
        core_1.HostListener('input', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AutosizeTextarea.prototype, "onInput", null);
    AutosizeTextarea = __decorate([
        core_1.Directive({
            selector: 'textarea[autosize-textarea]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AutosizeTextarea);
    return AutosizeTextarea;
}());
exports.AutosizeTextarea = AutosizeTextarea;
//# sourceMappingURL=ui-app-autosize-textarea.js.map