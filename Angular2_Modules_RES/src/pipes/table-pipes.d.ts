/// <reference types="core-js" />
import { PipeTransform } from '@angular/core';
import { UtilService } from '../utils/utils';
export declare class FilterSearchPipe implements PipeTransform {
    private utilService;
    private prevFilterSearch;
    private prevFilteredArray;
    constructor(utilService: UtilService);
    transform(list: Object[], component: any): any;
    private filterChanged(prevFilter, newFilter);
    private equalObject(prevObj, newObj);
    cleanJsonFilter(filterObj: any): any;
}
export declare class OrderByPipe implements PipeTransform {
    private prevSortType;
    private prevSortReverse;
    private prevFilteredArray;
    transform(list: Object[], sortType: string, sortReverse: boolean): Object[];
    private sortObjects(a, b, sortTypeKeys, sortReverse);
}
export declare class FilterPaginatePipe implements PipeTransform {
    private utilService;
    constructor(utilService: UtilService);
    transform(list: Object[], component: any): any;
}
