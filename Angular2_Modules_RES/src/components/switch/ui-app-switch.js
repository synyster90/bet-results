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
var Switch = (function () {
    function Switch(element) {
        this.element = element;
    }
    Switch.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('isOn'))
            this.isOn = changes['isOn'].currentValue;
    };
    __decorate([
        core_1.Input('model'), 
        __metadata('design:type', Boolean)
    ], Switch.prototype, "isOn", void 0);
    Switch = __decorate([
        core_1.Component({
            selector: 'ui-switch',
            template: '<div class="switch-container" [ngClass]="{\'ui-checked\': isOn}"><div class="switch-bar"></div><div class="switch-thumb-container">'
                + '<div class="switch-thumb"></div></div></div><ng-content></ng-content>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Switch);
    return Switch;
}());
exports.Switch = Switch;
//# sourceMappingURL=ui-app-switch.js.map