/// <reference types="core-js" />
import { OnChanges, ElementRef } from '@angular/core';
export declare class Switch implements OnChanges {
    private element;
    isOn: boolean;
    constructor(element: ElementRef);
    ngOnChanges(changes: Object): void;
}
