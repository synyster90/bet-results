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
var ExceptionTable = (function () {
    function ExceptionTable() {
    }
    ExceptionTable.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('exceptionData'))
            this.exceptionData = changes['exceptionData'].currentValue;
    };
    ExceptionTable.prototype.getDetail = function (baMsg) {
        var altro = '<table>';
        if (baMsg.ca_Angular)
            altro += '<tr><td>programma</td><td>' + baMsg.ca_Angular.prgm_Err + ' - pk: ' + baMsg.ca_Angular.pk + ' trx: ' + baMsg.ca_Angular.trx + '</td></tr>';
        if (baMsg.ambiente)
            altro += '<tr><td>ambiente</td><td>' + baMsg.ambiente.comm + '</td></tr>';
        if (baMsg.sqlca)
            altro += '<tr><td>sqlca</td><td>' + baMsg.sqlca + '</td></tr>';
        altro += '<table>';
        return altro;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ExceptionTable.prototype, "exceptionData", void 0);
    ExceptionTable = __decorate([
        core_1.Component({
            selector: 'ui-exception-table',
            template: '<table *ngIf="exceptionData.length == 1">'
                + '<tr *ngIf="exceptionData[0].codice"><td>errore</td><td>{{exceptionData[0].codice?.value}} - {{exceptionData[0].codice.desWeb ? exceptionData[0].codice.desWeb : exceptionData[0].codice.des}}</td></tr>'
                + '<tr *ngIf="exceptionData[0].msg"><td>messaggio</td><td>{{exceptionData[0].msg?.value}} - {{exceptionData[0].msg?.des}}</td></tr>'
                + '<tr *ngIf="exceptionData[0].tbl"><td>tabella</td><td>{{exceptionData[0].tbl?.value}} - {{exceptionData[0].tbl?.des}}</td></tr>'
                + '<tr *ngIf="exceptionData[0].nome"><td>colonna</td><td>{{exceptionData[0].nome?.value}} - {{exceptionData[0].nome?.des}}</td></tr>'
                + '<tr *ngIf="exceptionData[0].ca_Angular"><td>programma</td><td>{{exceptionData[0].ca_Angular?.prgm_Err}} - pk: {{exceptionData[0].ca_Angular?.pk}} trx: {{exceptionData[0].ca_Angular?.trx}}</td></tr>'
                + '<tr *ngIf="exceptionData[0].ambiente"><td>ambiente</td><td>{{exceptionData[0].ambiente?.comm}}</td></tr>'
                + '<tr *ngIf="exceptionData[0].sqlca"><td>sqlca</td><td>{{exceptionData[0].sqlca?.comm}}</td></tr>'
                + '</table>'
                + '<table *ngIf="exceptionData.length > 1">'
                + '<tbody class="multi">'
                + '<tr><td>messaggio</td><td>tabella</td><td>colonna</td><td>errore</td><td>altro</td></tr>'
                + '<tr *ngFor="let baMsg of exceptionData">'
                + '<td>{{baMsg.msg?.value}} - {{baMsg.msg?.des}}</td>'
                + '<td>{{baMsg.tbl?.value}} - {{baMsg.tbl?.des}}</td>'
                + '<td>{{baMsg.nome?.value}} - {{baMsg.nome?.des}}</td>'
                + '<td>{{baMsg.codice?.value}} - {{baMsg.codice.desWeb ? baMsg.codice.desWeb : baMsg.codice.des}}</td>'
                + '<td><ui-popover [content]="getDetail(baMsg)"><span class="glyphicon glyphicon-option-horizontal"></span></ui-popover></td>'
                + '</tr>'
                + '</table>'
        }), 
        __metadata('design:paramtypes', [])
    ], ExceptionTable);
    return ExceptionTable;
}());
exports.ExceptionTable = ExceptionTable;
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
                this.exceptionErrors = changes['exception'].currentValue.baerrMsgs ? changes['exception'].currentValue.baerrMsgs : [];
                this.exceptionWarnings = changes['exception'].currentValue.bawarMsgs ? changes['exception'].currentValue.bawarMsgs : [];
                this.exceptionMsg = changes['exception'].currentValue.errMsg ? changes['exception'].currentValue.errMsg : null;
            }
            else {
                this.exceptionErrors = [];
                this.exceptionWarnings = [];
                this.exceptionMsg = null;
            }
        }
    };
    Exception.prototype.toggleTable = function (id) {
        $(id, this.elementRef.nativeElement).collapse('toggle');
    };
    Exception.prototype.removePanel = function (event) {
        event.stopPropagation();
        if (this.exceptionErrors.length == 0 && this.exceptionWarnings.length == 0)
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
                + '<div class="panel panel-danger" *ngIf="exceptionErrors && exceptionErrors.length > 0"><div class="panel-heading" role="tab" (click)="toggleTable(\'#collapseBaerr\')">'
                + '<h4 class="panel-title">Dettagli errore</h4><button class="close" type="button" *ngIf="isRemovable" (click)="exceptionErrors = []; removePanel($event)"><span>x</span></button>'
                + '</div><div id="collapseBaerr" class="panel-collapse collapse" [ngClass]="{in: !isHidden}" role="tabpanel"><div class="panel-body">'
                + '<ui-exception-table [exceptionData]="exceptionErrors"></ui-exception-table>'
                + '</div></div></div>'
                + '<div class="panel panel-warning" *ngIf="exceptionWarnings && exceptionWarnings.length > 0"><div class="panel-heading" role="tab" (click)="toggleTable(\'#collapseBawar\')">'
                + '<h4 class="panel-title">Dettagli warning</h4><button class="close" type="button" *ngIf="isRemovable" (click)="exceptionWarnings = []; removePanel($event)"><span>x</span></button>'
                + '</div><div id="collapseBawar" class="panel-collapse collapse" [ngClass]="{in: !isHidden}" role="tabpanel"><div class="panel-body">'
                + '<ui-exception-table [exceptionData]="exceptionWarnings"></ui-exception-table>'
                + '</div></div></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Exception);
    return Exception;
}());
exports.Exception = Exception;
//# sourceMappingURL=ui-app-exception.js.map