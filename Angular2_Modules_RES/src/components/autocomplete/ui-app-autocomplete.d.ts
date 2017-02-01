/// <reference types="core-js" />
import { EventEmitter, AfterViewInit, OnChanges, ElementRef, ChangeDetectorRef } from '@angular/core';
export declare class AutocompleteHighlight implements OnChanges, AfterViewInit {
    private element;
    text: string;
    fullMatch: boolean;
    private elementValue;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: Object): void;
    private hightlightContent(text);
}
export declare class Autocomplete implements AfterViewInit, OnChanges {
    private element;
    private changeDetectorRef;
    private $this;
    private filterItems;
    private bottomReached;
    private isListOpen;
    customClass: string;
    acInputName: string;
    acNotFound: string;
    acUppercase: boolean;
    acDisabled: boolean;
    acNoCache: boolean;
    acSelectOnMatch: boolean;
    acFullMatch: boolean;
    acItems: Object[];
    acItemSelected: Object;
    acSearchText: string;
    acItemSelectedChange: EventEmitter<Object>;
    acSearchTextChange: EventEmitter<string>;
    acItemsChange: EventEmitter<Object[]>;
    constructor(element: ElementRef, changeDetectorRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: Object): void;
    private showAutocompleteList();
    private hideAutocompleteList();
    private toggleFocus();
    private clear();
    private onChange(search);
    private filter(search?);
    private orderItems();
    private select(index);
}
