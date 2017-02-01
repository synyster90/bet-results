"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var utils_1 = require('../utils/utils');
var todoSort = false;
var FilterSearchPipe = (function () {
    function FilterSearchPipe(utilService) {
        this.utilService = utilService;
        this.prevFilterSearch = {};
    }
    FilterSearchPipe.prototype.transform = function (list, component) {
        var filtered = JSON.parse(JSON.stringify(list));
        if (list && list.length > 0) {
            if (Object.keys(component.filterSearch).length > 0)
                component.filterSearch = this.cleanJsonFilter(component.filterSearch);
            if (this.filterChanged(this.prevFilterSearch, component.filterSearch) || component.listChanged) {
                this.prevFilterSearch = JSON.parse(JSON.stringify(component.filterSearch));
                filtered = [];
                for (var i = 0; i < list.length; i++)
                    if (this.utilService.compareObject(list[i], component.filterSearch) == true)
                        filtered.push(list[i]);
                this.prevFilteredArray = filtered;
                todoSort = true;
                component.listChanged = false;
            }
            else if (this.prevFilteredArray)
                filtered = this.prevFilteredArray;
        }
        component.filtered = JSON.parse(JSON.stringify(filtered));
        return filtered;
    };
    FilterSearchPipe.prototype.filterChanged = function (prevFilter, newFilter) {
        if (Object.keys(prevFilter).length == 0 && Object.keys(newFilter).length == 0)
            return false;
        else
            return !this.equalObject(prevFilter, newFilter);
    };
    FilterSearchPipe.prototype.equalObject = function (prevObj, newObj) {
        if (typeof prevObj == 'string' && typeof newObj == 'string') {
            if (prevObj.toString().toUpperCase() == newObj.toString().toUpperCase())
                return true;
            else
                return false;
        }
        else {
            if (Object.keys(prevObj).length != Object.keys(newObj).length)
                return false;
            for (var prop in newObj)
                if (prevObj.hasOwnProperty(prop)) {
                    if (!this.equalObject(prevObj[prop], newObj[prop]))
                        return false;
                }
                else
                    return false;
            return true;
        }
    };
    FilterSearchPipe.prototype.cleanJsonFilter = function (filterObj) {
        for (var prop in filterObj)
            if (typeof filterObj[prop] == 'string') {
                if (filterObj[prop] == '')
                    delete filterObj[prop];
            }
            else if (typeof filterObj[prop] == 'undefined')
                delete filterObj[prop];
            else {
                filterObj[prop] = this.cleanJsonFilter(filterObj[prop]);
                if (Object.keys(filterObj[prop]).length == 0)
                    delete filterObj[prop];
            }
        return filterObj;
    };
    FilterSearchPipe = __decorate([
        core_1.Pipe({ name: 'filterSearch', pure: false }), 
        __metadata('design:paramtypes', [utils_1.UtilService])
    ], FilterSearchPipe);
    return FilterSearchPipe;
}());
exports.FilterSearchPipe = FilterSearchPipe;
var OrderByPipe = (function () {
    function OrderByPipe() {
        this.prevSortType = '';
        this.prevSortReverse = false;
    }
    OrderByPipe.prototype.transform = function (list, sortType, sortReverse) {
        var _this = this;
        if (list && list.length > 0 && sortType != '') {
            if ((this.prevSortType != sortType || this.prevSortReverse != sortReverse) || todoSort) {
                this.prevSortType = sortType;
                this.prevSortReverse = sortReverse;
                list.sort(function (a, b) {
                    var sortTypeKeys = sortType.indexOf('.') === -1 ? [sortType] : sortType.split('.');
                    return _this.sortObjects(a, b, sortTypeKeys, typeof sortReverse == 'undefined' ? false : sortReverse);
                });
                this.prevFilteredArray = list;
            }
            else if (this.prevFilteredArray)
                list = this.prevFilteredArray;
            todoSort = false;
        }
        return list;
    };
    OrderByPipe.prototype.sortObjects = function (a, b, sortTypeKeys, sortReverse) {
        var key = sortTypeKeys[0];
        if (!a[key] || !b[key]) {
            if (!a[key] && b[key])
                return sortReverse ? -1 : 1;
            else if (a[key] && !b[key])
                return sortReverse ? 1 : -1;
        }
        else if (!isNaN(a[key]) && !isNaN(b[key])) {
            if (parseInt(a[key]) == parseInt(b[key]))
                return 0;
            else if (parseInt(a[key]) > parseInt(b[key]))
                return sortReverse ? -1 : 1;
            else if (parseInt(a[key]) < parseInt(b[key]))
                return sortReverse ? 1 : -1;
        }
        else if (typeof a[key] == 'string' && typeof b[key] == 'string') {
            if (a[key].toString().toUpperCase() == b[key].toString().toUpperCase())
                return 0;
            else if (a[key].toString().toUpperCase() > b[key].toString().toUpperCase())
                return sortReverse ? -1 : 1;
            else if (a[key].toString().toUpperCase() < b[key].toString().toUpperCase())
                return sortReverse ? 1 : -1;
        }
        else {
            if (a.hasOwnProperty(key) && b.hasOwnProperty(key)) {
                sortTypeKeys.splice(0, 1);
                return this.sortObjects(a[key], b[key], sortTypeKeys, sortReverse);
            }
            else if (a.hasOwnProperty(key))
                return sortReverse ? -1 : 1;
            else if (b.hasOwnProperty(key))
                return sortReverse ? 1 : -1;
        }
    };
    OrderByPipe = __decorate([
        core_1.Pipe({ name: 'orderBy', pure: false }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
}());
exports.OrderByPipe = OrderByPipe;
var FilterPaginatePipe = (function () {
    function FilterPaginatePipe(utilService) {
        this.utilService = utilService;
    }
    FilterPaginatePipe.prototype.transform = function (list, component) {
        var paginated = JSON.parse(JSON.stringify(list));
        if (list && list.length > 0) {
            paginated = [];
            var begin = (parseInt(component.currentPage) - 1) * this.utilService.numPerPage.selected.id;
            var end = begin + this.utilService.numPerPage.selected.id;
            for (var i = begin; i < (list.length < end ? list.length : end); i++)
                paginated.push(list[i]);
        }
        component.filtered_result = JSON.parse(JSON.stringify(paginated));
        return paginated;
    };
    FilterPaginatePipe = __decorate([
        core_1.Pipe({ name: 'filterPaginate', pure: false }), 
        __metadata('design:paramtypes', [utils_1.UtilService])
    ], FilterPaginatePipe);
    return FilterPaginatePipe;
}());
exports.FilterPaginatePipe = FilterPaginatePipe;
//# sourceMappingURL=table-pipes.js.map