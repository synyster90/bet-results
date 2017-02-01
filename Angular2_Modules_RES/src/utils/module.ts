import { NgModule, ModuleWithProviders } from '@angular/core';

import { UtilService } from './utils';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        UtilService
    ]
})
export class AngularUtilsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularUtilsModule,
            providers: [UtilService]
        };
    }
}