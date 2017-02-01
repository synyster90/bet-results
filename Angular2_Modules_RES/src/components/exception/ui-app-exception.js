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
var Exception = (function () {
    function Exception(elementRef) {
        this.elementRef = elementRef;
        this.exceptionChange = new core_1.EventEmitter();
        this.isRemovable = typeof this.isRemovable == 'boolean' ? this.isRemovable : false;
        this.isHidden = typeof this.isHidden == 'boolean' ? this.isHidden : false;
    }
    Exception.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('exception')) {
            if (changes['exception'].currentValue) {
                this.exceptionMsg = changes['exception'].currentValue.errMsg ? changes['exception'].currentValue.errMsg : null;
            }
            else {
                this.exceptionMsg = null;
            }
        }
    };
    Exception.prototype.toggleTable = function (id) {
        $(id, this.elementRef.nativeElement).collapse('toggle');
    };
    Exception.prototype.removePanel = function (event) {
        event.stopPropagation();
        this.exceptionChange.emit([]);
    };
    __decorate([
        core_1.Input('exception-removable'), 
        __metadata('design:type', Boolean)
    ], Exception.prototype, "isRemovable", void 0);
    __decorate([
        core_1.Input('exception-hidden'), 
        __metadata('design:type', Boolean)
    ], Exception.prototype, "isHidden", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Exception.prototype, "exception", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Exception.prototype, "exceptionChange", void 0);
    Exception = __decorate([
        core_1.Component({
            selector: 'ui-exception',
            template: '<div class="panel panel-danger" *ngIf="exceptionMsg && exceptionMsg != \'\'"><div class="panel-heading" role="tab" (click)="toggleTable(\'#collapseMsg\')">'
                + '<h4 class="panel-title">Dettagli errore</h4><button class="close" type="button" *ngIf="isRemovable" (click)="exceptionMsg = null; removePanel($event)"><span>x</span></button>'
                + '</div><div id="collapseMsg" class="panel-collapse collapse" [ngClass]="{in: !isHidden}" role="tabpanel"><div class="panel-body">'
                + '<table><tr><td>Messaggio</td></tr><tr><td>{{exceptionMsg}}</td></tr></table>'
                + '</div></div></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Exception);
    return Exception;
}());
exports.Exception = Exception;
//# sourceMappingURL=ui-app-exception.js.map