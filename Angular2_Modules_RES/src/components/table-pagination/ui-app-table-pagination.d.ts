/// <reference types="core-js" />
import { OnChanges, EventEmitter } from '@angular/core';
export declare class TablePagination implements OnChanges {
    currentpage: number;
    currentpageChange: EventEmitter<number>;
    totalItems: number;
    itemsPerPage: number;
    maxSize: number;
    customClass: string;
    private totalPages;
    private pages;
    constructor();
    ngOnChanges(changes: Object): void;
    selectPage(pageNum: any, event: any): void;
    setPages(): void;
}
