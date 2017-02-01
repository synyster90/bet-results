/// <reference types="core-js" />
import { PipeTransform } from '@angular/core';
export declare class LazyLoadPipe implements PipeTransform {
    private itemsLoaded;
    constructor();
    transform(list: Object[], limit: number, update: boolean): Object[];
}
