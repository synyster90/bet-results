import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'ui-select',
    template: '<button class="btn btn-default btn-sm" type="button" (click)="toggleSelect($event)"><span>{{selectModel.name}}</span> <span class="glyphicon glyphicon-menu-down"></span></button>'
    + '<div class="select-dropdown" *ngIf="isSelectOpen"><div class="select-scroll"><span *ngFor="let option of selectOptions" (click)="select(option)" class="select-dropdown-item" '
    + '[ngClass]="{selected: option.id == selectModel.id, disabled : selectNItems >= 1000 && option.id >= 1000}">{{option.name}}</span></div></div>'
})
export class Select implements AfterViewInit {
    @Input('select-model') selectModel: Object
    @Input('select-options') selectOptions: Object[]
    @Input('select-n-items') selectNItems: number

    @Output('select-change') selectChange: EventEmitter<Object> = new EventEmitter<Object>()

    private isSelectOpen: boolean = false
    private $selectButton
    private $selectDropdown

    constructor(private element: ElementRef, private changeDetectorRef: ChangeDetectorRef) { }

    ngAfterViewInit() {
    	this.$selectButton = $('button', this.element.nativeElement)
    	
    	this.$selectButton.on('blur', () => {
            if (this.isSelectOpen && !$.contains(this.$selectDropdown[0], $(':focus')[0])) {
            	this.isSelectOpen = false
                this.changeDetectorRef.markForCheck()
            }
    	})
    }
    
    select(option) {
        if (this.selectNItems >= 1000 && option.id >= 1000 || option.id == this.selectModel['id'])
            return;
        this.isSelectOpen = false
        this.selectChange.emit(option)
        this.changeDetectorRef.markForCheck()
    }

    toggleSelect(e) {
        if (!this.isSelectOpen) {
            this.isSelectOpen = true
            setTimeout(() => {
            	this.$selectDropdown = $('div.select-dropdown', this.element.nativeElement)
            	
                var selectMenuHeight = (this.selectOptions.length < 8) ? this.selectOptions.length * 20 : 161;
                if (e.clientY + selectMenuHeight >= window.innerHeight)
                    // Position Top
                    this.$selectDropdown.css({
                        bottom: '96%',
                        minWidth: this.$selectButton.outerWidth() + 2,
                        boxShadow: '2px -5px 10px rgba(0,0,0,0.2)',
                        display: 'block'
                    });
                else
                    this.$selectDropdown.css({
                        top: '96%',
                        minWidth: this.$selectButton.outerWidth() + 2,
                        boxShadow: '2px 5px 10px rgba(0,0,0,0.2)',
                        display: 'block'
                    });
            })
        } else
            this.isSelectOpen = false
        this.changeDetectorRef.markForCheck()
    }
}