import { Component, Input, Output, OnChanges, ElementRef, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'ui-exception',
    template: '<div class="panel panel-danger" *ngIf="exceptionMsg && exceptionMsg != \'\'"><div class="panel-heading" role="tab" (click)="toggleTable(\'#collapseMsg\')">'
    + '<h4 class="panel-title">Dettagli errore</h4><button class="close" type="button" *ngIf="isRemovable" (click)="exceptionMsg = null; removePanel($event)"><span>x</span></button>'
    + '</div><div id="collapseMsg" class="panel-collapse collapse" [ngClass]="{in: !isHidden}" role="tabpanel"><div class="panel-body">'
    + '<table><tr><td>Messaggio</td></tr><tr><td>{{exceptionMsg}}</td></tr></table>'
    + '</div></div></div>'
})
export class Exception implements OnChanges {
    @Input('exception-removable') private isRemovable: boolean
    @Input('exception-hidden') private isHidden: boolean
    @Input() private exception: Object
    @Output() private exceptionChange: EventEmitter<Object> = new EventEmitter<Object>()

    private exceptionMsg: string

    constructor(private elementRef: ElementRef) {
        this.isRemovable = typeof this.isRemovable == 'boolean' ? this.isRemovable : false
        this.isHidden = typeof this.isHidden == 'boolean' ? this.isHidden : false
    }

    ngOnChanges(changes: Object) {
        if (changes.hasOwnProperty('exception')) {
            if (changes['exception'].currentValue) {
                this.exceptionMsg = changes['exception'].currentValue.errMsg ? changes['exception'].currentValue.errMsg : null
            } else {
                this.exceptionMsg = null
            }
        }
    }

    private toggleTable(id: string) {
        $(id, this.elementRef.nativeElement).collapse('toggle')
    }

    private removePanel(event) {
        event.stopPropagation()
        this.exceptionChange.emit([])
    }
}