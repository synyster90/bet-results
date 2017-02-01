import { Pipe, PipeTransform } from '@angular/core';

import { UtilService } from '../utils/utils';

var todoSort: boolean = false

@Pipe({ name: 'filterSearch', pure: false })
export class FilterSearchPipe implements PipeTransform {
    private prevFilterSearch: any = {}
    private prevFilteredArray: any[]

    constructor(private utilService: UtilService) { }

    transform(list: Object[], component: any) {
        var filtered = JSON.parse(JSON.stringify(list));
        if (list && list.length > 0) {
            if (Object.keys(component.filterSearch).length > 0)
                component.filterSearch = this.cleanJsonFilter(component.filterSearch);
            if (this.filterChanged(this.prevFilterSearch, component.filterSearch) || component.listChanged) {
                this.prevFilterSearch = JSON.parse(JSON.stringify(component.filterSearch))

                filtered = [];
                for (var i = 0; i < list.length; i++)
                    if (this.utilService.compareObject(list[i], component.filterSearch) == true)
                        filtered.push(list[i]);
                this.prevFilteredArray = filtered

                todoSort = true
                component.listChanged = false
            } else if (this.prevFilteredArray)
                filtered = this.prevFilteredArray
        }
        component.filtered = JSON.parse(JSON.stringify(filtered))
        return filtered
    }

    private filterChanged(prevFilter, newFilter) {
        if (Object.keys(prevFilter).length == 0 && Object.keys(newFilter).length == 0)
            return false
        else
            return !this.equalObject(prevFilter, newFilter)
    }

    private equalObject(prevObj, newObj) {
        if (typeof prevObj == 'string' && typeof newObj == 'string') {
            if (prevObj.toString().toUpperCase() == newObj.toString().toUpperCase())
                return true
            else
                return false
        } else {
            if (Object.keys(prevObj).length != Object.keys(newObj).length)
                return false
            for (var prop in newObj)
                if (prevObj.hasOwnProperty(prop)) {
                    if (!this.equalObject(prevObj[prop], newObj[prop]))
                        return false
                } else
                    return false
            return true
        }
    }

    public cleanJsonFilter(filterObj) {
        for (var prop in filterObj)
            if (typeof filterObj[prop] == 'string') {
                if (filterObj[prop] == '')
                    delete filterObj[prop];
            } else if (typeof filterObj[prop] == 'undefined')
                delete filterObj[prop];
            else {
                filterObj[prop] = this.cleanJsonFilter(filterObj[prop]);
                if (Object.keys(filterObj[prop]).length == 0)
                    delete filterObj[prop];
            }
        return filterObj;
    }
}

@Pipe({ name: 'orderBy', pure: false })
export class OrderByPipe implements PipeTransform {
    private prevSortType: string = ''
    private prevSortReverse: boolean = false
    private prevFilteredArray: any[]

    transform(list: Object[], sortType: string, sortReverse: boolean) {
        if (list && list.length > 0 && sortType != '') {
            if ((this.prevSortType != sortType || this.prevSortReverse != sortReverse) || todoSort) {
                this.prevSortType = sortType
                this.prevSortReverse = sortReverse
                
                list.sort((a: Object, b: Object) => {
                    var sortTypeKeys: string[] = sortType.indexOf('.') === -1 ? [sortType] : sortType.split('.')
                    return this.sortObjects(a, b, sortTypeKeys, typeof sortReverse == 'undefined' ? false : sortReverse)
                })

                this.prevFilteredArray = list
            } else if (this.prevFilteredArray)
                list = this.prevFilteredArray
            todoSort = false
        }
        return list
    }

    private sortObjects(a: any, b: any, sortTypeKeys: string[], sortReverse: boolean): number {
        var key: string = sortTypeKeys[0]
        if (!a[key] || !b[key]) {
            if (!a[key] && b[key])
                return sortReverse ? -1 : 1
            else if (a[key] && !b[key])
                return sortReverse ? 1 : -1
        } else if (!isNaN(a[key]) && !isNaN(b[key])) {
            if (parseInt(a[key]) == parseInt(b[key]))
                return 0
            else if (parseInt(a[key]) > parseInt(b[key]))
                return sortReverse ? -1 : 1
            else if (parseInt(a[key]) < parseInt(b[key]))
                return sortReverse ? 1 : -1
        } else if (typeof a[key] == 'string' && typeof b[key] == 'string') {
            if (a[key].toString().toUpperCase() == b[key].toString().toUpperCase())
                return 0
            else if (a[key].toString().toUpperCase() > b[key].toString().toUpperCase())
                return sortReverse ? -1 : 1
            else if (a[key].toString().toUpperCase() < b[key].toString().toUpperCase())
                return sortReverse ? 1 : -1
        } else {
            if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
                sortTypeKeys.splice(0, 1)
                return this.sortObjects(a[key], b[key], sortTypeKeys, sortReverse)
            } else if (a.hasOwnProperty(key))
                return sortReverse ? -1 : 1
            else if (b.hasOwnProperty(key))
                return sortReverse ? 1 : -1
        }
    }
}

@Pipe({ name: 'filterPaginate', pure: false })
export class FilterPaginatePipe implements PipeTransform {
    constructor(private utilService: UtilService) { }

    transform(list: Object[], component: any) {
        var paginated = JSON.parse(JSON.stringify(list))
        if (list && list.length > 0) {
            paginated = [];
            var begin = (parseInt(component.currentPage) - 1) * this.utilService.numPerPage.selected.id
            var end = begin + this.utilService.numPerPage.selected.id
            for (var i = begin; i < (list.length < end ? list.length : end); i++)
                paginated.push(list[i]);
        }
        component.filtered_result = JSON.parse(JSON.stringify(paginated))
        return paginated
    }
}