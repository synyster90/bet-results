import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { LangSelect, TranslateDirective } from './ui-app-translations';

@NgModule({
    imports: [
        TranslateModule, BrowserModule, FormsModule
    ],
    declarations: [
        LangSelect, TranslateDirective
    ],
    providers: [],
    exports: [
        LangSelect, TranslateDirective
    ]
})
export class AngularTranslateModule { }