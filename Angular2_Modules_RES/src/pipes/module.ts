import { NgModule } from '@angular/core';

import { LazyLoadPipe } from './lazy-load';
import { OrderByPipe, FilterSearchPipe, FilterPaginatePipe } from './table-pipes';

import { AngularUtilsModule } from '../utils/index';

@NgModule({
    imports: [
        AngularUtilsModule
    ],
    declarations: [
        LazyLoadPipe, OrderByPipe, FilterSearchPipe, FilterPaginatePipe
    ],
    providers: [],
    exports: [
        LazyLoadPipe, OrderByPipe, FilterSearchPipe, FilterPaginatePipe
    ]
})
export class AngularPipesModule { }