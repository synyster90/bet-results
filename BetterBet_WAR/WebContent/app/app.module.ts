import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

/* Directives, Components & Providers */
import { Title } from '@angular/platform-browser';
import { CseComponentsModule } from '@angular/modules/src/components';
import { CseDialogsModule } from '@angular/modules/src/dialogs';
import { CseHttpClientModule } from '@angular/modules/src/http-client';
import { CsePipesModule } from '@angular/modules/src/pipes';
import { CseTranslateModule } from '@angular/modules/src/translate';
import { CseUtilsModule } from '@angular/modules/src/utils';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routes';

import { SharedModule } from './shared/shared.module';

import { Home } from './components/home/home.component';

import { ViewModalCtrl } from './components/home/modals/view/viewModal';
import { EditModalCtrl } from './components/home/modals/edit/editModal';
import { InsertModalCtrl } from './components/home/modals/insert/insertModal';

export function createTranslateLoader( http: Http ) {
    return new TranslateStaticLoader( http, './dist/assets/i18n', '.json' );
}

@NgModule( {
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot( {
            provide: TranslateLoader,
            useFactory: ( createTranslateLoader ),
            deps: [Http]
        }),
        routing,
        CseComponentsModule.forRoot(), CseDialogsModule.forRoot(), CseHttpClientModule.forRoot(), CsePipesModule, CseTranslateModule, CseUtilsModule.forRoot(),
        SharedModule.forRoot()
    ],
    declarations: [
        AppComponent, Home, ViewModalCtrl, EditModalCtrl, InsertModalCtrl
    ],
    entryComponents: [
        ViewModalCtrl, EditModalCtrl, InsertModalCtrl
    ],
    providers: [
        appRoutingProviders,
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }