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
var lazy_load_1 = require('./lazy-load');
var table_pipes_1 = require('./table-pipes');
var index_1 = require('../utils/index');
var AngularPipesModule = (function () {
    function AngularPipesModule() {
    }
    AngularPipesModule = __decorate([
        core_1.NgModule({
            imports: [
                index_1.AngularUtilsModule
            ],
            declarations: [
                lazy_load_1.LazyLoadPipe, table_pipes_1.OrderByPipe, table_pipes_1.FilterSearchPipe, table_pipes_1.FilterPaginatePipe
            ],
            providers: [],
            exports: [
                lazy_load_1.LazyLoadPipe, table_pipes_1.OrderByPipe, table_pipes_1.FilterSearchPipe, table_pipes_1.FilterPaginatePipe
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AngularPipesModule);
    return AngularPipesModule;
}());
exports.AngularPipesModule = AngularPipesModule;
//# sourceMappingURL=module.js.map