import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'lazyLoadFilter', pure: false })
export class LazyLoadPipe implements PipeTransform {
    private itemsLoaded: number = 0

    constructor() { }

    transform(list: Object[], limit: number, update: boolean) {
        if (list && list.length > 0 && limit > 0 && list.length > limit && this.itemsLoaded < list.length && update) {
            list = list.slice(0, (this.itemsLoaded + limit > list.length) ? list.length : (this.itemsLoaded + limit))
            this.itemsLoaded = list.length
            update = false
        }
        return list;
    }
}