/// <reference types="core-js" />
import { ElementRef, EventEmitter, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { PopoverFilterService } from '../popover-filter/ui-app-popover-filter';
import { UtilService } from '../../utils/utils';
export declare class TableHead implements AfterViewInit, OnChanges {
    private element;
    private utilService;
    private popoverFilterService;
    private changeDetectorRef;
    hdName: string;
    hdType: string;
    hdcurrentpage: number;
    hdcurrentpageChange: EventEmitter<number>;
    hdsorttype: string;
    hdsorttypeChange: EventEmitter<string>;
    hdsortreverse: boolean;
    hdsortreverseChange: EventEmitter<boolean>;
    hdFilterTitle: string;
    hdfiltersearch: Object;
    hdfiltersearchChange: EventEmitter<Object>;
    hdFilterUppercase: boolean;
    hdFilterAutocomplete: boolean;
    hdFilterAutocompleteList: Object[];
    hdFilterAutocompleteListChange: EventEmitter<Object[]>;
    private showFilter;
    constructor(element: ElementRef, utilService: UtilService, popoverFilterService: PopoverFilterService, changeDetectorRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: Object): void;
    private setHdFilterSearch(value);
    private setHdFilterSearchValue(value, filterKeyPath, tempFilter);
    private getHdFilterSearch();
    private getHdFilterSearchValue(filterKeyPath, tempFilter);
    sortClick(): void;
    togglePopover(event: any): void;
}
