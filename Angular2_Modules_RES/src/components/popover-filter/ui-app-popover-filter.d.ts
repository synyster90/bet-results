/// <reference types="core-js" />
import { EventEmitter, AfterViewInit, ComponentFactoryResolver, ApplicationRef, ElementRef, ChangeDetectorRef } from '@angular/core';
export declare class PopoverFilterService {
    private cmpResolver;
    private applicationRef;
    private filterPopover;
    constructor(cmpResolver: ComponentFactoryResolver, applicationRef: ApplicationRef);
    showPopoverFilter(options: Object): EventEmitter<string>;
    hidePopoverFilter(): void;
}
export declare class PopoverFilter implements AfterViewInit {
    private element;
    private changeDetectorRef;
    private popoverFilterService;
    top: number;
    left: number;
    title: string;
    autocomplete: boolean;
    autocompleteList: Object[];
    autocompleteListChange: EventEmitter<Object[]>;
    uppercase: boolean;
    searchText: string;
    searchTextChange: EventEmitter<string>;
    constructor(element: ElementRef, changeDetectorRef: ChangeDetectorRef, popoverFilterService: PopoverFilterService);
    ngAfterViewInit(): void;
    init(options: any, searchTextChange: EventEmitter<string>): void;
    private onChange(search);
    private onAutocompleteChange(selected);
}
