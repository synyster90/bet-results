import { ElementRef, AfterViewInit } from '@angular/core';
export declare class Popover implements AfterViewInit {
    private elementRef;
    private title;
    private content;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
}
