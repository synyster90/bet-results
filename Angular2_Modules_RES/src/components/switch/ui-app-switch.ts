import { Component, Input, OnChanges, ElementRef } from '@angular/core';

declare var $: any;

@Component({
    selector: 'ui-switch',
    template: '<div class="switch-container" [ngClass]="{\'ui-checked\': isOn}"><div class="switch-bar"></div><div class="switch-thumb-container">'
    + '<div class="switch-thumb"></div></div></div><ng-content></ng-content>'
})
export class Switch implements OnChanges {
    @Input('model') isOn: boolean

    constructor(private element: ElementRef) { }

    ngOnChanges(changes: Object) {
        if (changes.hasOwnProperty('isOn'))
            this.isOn = changes['isOn'].currentValue
    }
}