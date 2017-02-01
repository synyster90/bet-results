import { Directive, Input, Output, EventEmitter, OnChanges } from '@angular/core';

declare var $: any;

@Directive({
    selector: '[pipe-cicle]'
})
export class PipeCicle implements OnChanges {
    @Input('pc-last') pcLast: boolean
    @Output('pc-finish') pcFinish: EventEmitter<boolean> = new EventEmitter<boolean>()

    constructor() { }

    ngOnChanges(changes: Object) {
        if (changes.hasOwnProperty('pcLast'))
            if (changes['pcLast']['currentValue'] === true)
                this.pcFinish.emit(changes['pcLast']['currentValue'])
    }
}