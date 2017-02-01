import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { AngularComponentsModule } from '@angular/modules/src/components';
import { AngularDialogsModule } from '@angular/modules/src/dialogs';
import { AngularHttpClientModule } from '@angular/modules/src/http-client';
import { AngularPipesModule } from '@angular/modules/src/pipes';
import { AngularTranslateModule } from '@angular/modules/src/translate';
import { AngularUtilsModule } from '@angular/modules/src/utils';

import { FilterModalCtrl } from './filter/filterModal';
import { ScommesseService } from './service/scommesse.service';

@NgModule( {
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule,
        AngularComponentsModule, AngularDialogsModule, AngularHttpClientModule, AngularPipesModule, AngularTranslateModule, AngularUtilsModule,
    ],
    declarations: [
        FilterModalCtrl
    ],
    exports: [
        FilterModalCtrl
    ],
    providers: [
        ScommesseService
    ],
    entryComponents: [
        FilterModalCtrl
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ScommesseService]
        };
    }
}