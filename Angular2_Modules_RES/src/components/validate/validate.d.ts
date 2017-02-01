/// <reference types="core-js" />
import { ElementRef, OnChanges } from '@angular/core';
export declare class Validate implements OnChanges {
    private elementRef;
    model: Object[];
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: Object): void;
    private isInvalid(checkList);
    private invalidateField(invalidate);
}
