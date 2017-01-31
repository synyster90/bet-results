import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { CseComponentsModule } from '@angular/modules/src/components';
import { CseDialogsModule } from '@angular/modules/src/dialogs';
import { CseHttpClientModule } from '@angular/modules/src/http-client';
import { CsePipesModule } from '@angular/modules/src/pipes';
import { CseTranslateModule } from '@angular/modules/src/translate';
import { CseUtilsModule } from '@angular/modules/src/utils';

import { FilterModalCtrl } from './filter/filterModal';
import { SampleService } from './service/sample.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule,
        CseComponentsModule, CseDialogsModule, CseHttpClientModule, CsePipesModule, CseTranslateModule, CseUtilsModule,
    ],
    declarations: [
        FilterModalCtrl
    ],
    exports: [
        FilterModalCtrl
    ],
    providers: [
        SampleService
    ],
    entryComponents: [
        FilterModalCtrl
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [SampleService]
        };
    }
}