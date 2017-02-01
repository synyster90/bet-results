import { NgModule, ModuleWithProviders } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { ModalDialog, ModalDialogService } from './ui-app-modal-dialog';

import { AngularComponentsModule } from '../components/index';
import { AngularHttpClientModule } from '../http-client/index';
import { AngularTranslateModule } from '../translate/index';

@NgModule({
    imports: [
        BrowserModule, FormsModule,
        AngularComponentsModule,
        AngularHttpClientModule,
        AngularTranslateModule,
        TranslateModule
    ],
    declarations: [
        ModalDialog
    ],
    entryComponents: [
        ModalDialog
    ],
    providers: [
        ModalDialogService, COMPILER_PROVIDERS
    ],
    exports: [
        ModalDialog
    ]
})
export class AngularDialogsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularDialogsModule,
            providers: [ModalDialogService]
        };
    }
}