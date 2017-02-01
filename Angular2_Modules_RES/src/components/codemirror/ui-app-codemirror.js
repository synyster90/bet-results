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
require('codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/xml/xml');
var Codemirror = (function () {
    function Codemirror(element) {
        this.element = element;
        this.ngModelChange = new core_1.EventEmitter();
    }
    Codemirror.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.codeMirror = CodeMirror.fromTextArea($(this.element.nativeElement)[0], this.cmOptions);
        this.codeMirror.setValue(this.ngModel);
        if (!this.cmOptions.hasOwnProperty('readOnly')) {
            // Keep the ngModel in sync with changes from CodeMirror
            var $this = this;
            this.codeMirror.on('change', function (instance) {
                var newValue = instance.getValue();
                if (newValue !== $this.ngModel)
                    $this.ngModel = newValue;
            });
            this.codeMirror.on('focus', function (event) {
                $(document).off('keydown');
            });
            this.codeMirror.on('blur', function (event) {
                _this.ngModelChange.emit(_this.ngModel);
            });
        }
    };
    Codemirror.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('ngModel'))
            if (this.codeMirror && changes['ngModel']['currentValue'])
                this.codeMirror.setValue(changes['ngModel']['currentValue']);
    };
    __decorate([
        core_1.Input('cm-options'), 
        __metadata('design:type', Object)
    ], Codemirror.prototype, "cmOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Codemirror.prototype, "ngModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Codemirror.prototype, "ngModelChange", void 0);
    Codemirror = __decorate([
        core_1.Directive({
            selector: '[ui-codemirror]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Codemirror);
    return Codemirror;
}());
exports.Codemirror = Codemirror;
//# sourceMappingURL=ui-app-codemirror.js.map