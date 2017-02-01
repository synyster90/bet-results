import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClient } from './http-client';
import { SpinnerOverlay, SpinnerOverlayService } from './ui-app-spinner-overlay';

@NgModule({
    imports: [
        BrowserModule, FormsModule
    ],
    declarations: [
        SpinnerOverlay
    ],
    entryComponents: [
        SpinnerOverlay
    ],
    providers: [
        HttpClient, SpinnerOverlayService
    ],
    exports: [
        SpinnerOverlay
    ]
})
export class AngularHttpClientModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularHttpClientModule,
            providers: [HttpClient, SpinnerOverlayService]
        };
    }
}