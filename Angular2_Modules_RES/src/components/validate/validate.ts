import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

declare var $: any;

@Directive({
    selector: '[validate]'
})
export class Validate implements OnChanges {
    @Input() model: Object[]

    constructor(private elementRef: ElementRef) {
        this.invalidateField(this.isInvalid(this.model))
    }

    ngOnChanges(changes: Object) {
        if (changes.hasOwnProperty('model'))
            this.invalidateField(this.isInvalid(changes['model'].currentValue))
    }

    private isInvalid(checkList: Object[]) {
        if (checkList)
            for (var i = 0; i < checkList.length; i++)
                if (checkList[i])
                    if (checkList[i]['errAngular'] || checkList[i]['errCode'])
                        return true
        return false
    }

    private invalidateField(invalidate: boolean) {
        if (invalidate)
            $(this.elementRef.nativeElement).addClass('gl-invalid')
        else
            $(this.elementRef.nativeElement).removeClass('gl-invalid')
    }
}