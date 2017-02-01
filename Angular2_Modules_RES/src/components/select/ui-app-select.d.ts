/// <reference types="core-js" />
import { EventEmitter, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
export declare class Select implements AfterViewInit {
    private element;
    private changeDetectorRef;
    selectModel: Object;
    selectOptions: Object[];
    selectNItems: number;
    selectChange: EventEmitter<Object>;
    private isSelectOpen;
    private $selectButton;
    private $selectDropdown;
    constructor(element: ElementRef, changeDetectorRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    select(option: any): void;
    toggleSelect(e: any): void;
}
