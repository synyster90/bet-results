import { ElementRef, OnInit } from '@angular/core';
export declare class AutosizeTextarea implements OnInit {
    element: ElementRef;
    onInput(textArea: any): void;
    private maxHeight;
    constructor(element: ElementRef);
    ngOnInit(): void;
    private adjust();
}
