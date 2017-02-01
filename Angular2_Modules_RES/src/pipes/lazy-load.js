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
var LazyLoadPipe = (function () {
    function LazyLoadPipe() {
        this.itemsLoaded = 0;
    }
    LazyLoadPipe.prototype.transform = function (list, limit, update) {
        if (list && list.length > 0 && limit > 0 && list.length > limit && this.itemsLoaded < list.length && update) {
            list = list.slice(0, (this.itemsLoaded + limit > list.length) ? list.length : (this.itemsLoaded + limit));
            this.itemsLoaded = list.length;
            update = false;
        }
        return list;
    };
    LazyLoadPipe = __decorate([
        core_1.Pipe({ name: 'lazyLoadFilter', pure: false }), 
        __metadata('design:paramtypes', [])
    ], LazyLoadPipe);
    return LazyLoadPipe;
}());
exports.LazyLoadPipe = LazyLoadPipe;
//# sourceMappingURL=lazy-load.js.map