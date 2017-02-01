import { ElementRef, AfterViewInit } from '@angular/core';
export declare class Draggable implements AfterViewInit {
    element: ElementRef;
    dragTarget: string;
    private startPos;
    private isDragging;
    private hasTopFixed;
    private TOP_BOUND;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
}
