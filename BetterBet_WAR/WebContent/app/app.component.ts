import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { SideMenuService } from '@angular/modules/src/components';
import { UtilService } from '@angular/modules/src/utils';
import { HttpClient } from '@angular/modules/src/http-client';

declare var $: any;

@Component( {
    selector: 'app-main',
    template: require( './main.html' ),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    constructor( private router: Router, private httpClient: HttpClient, private location: Location, private utilService: UtilService,
        private sideMenuService: SideMenuService, private changeDetectorRef: ChangeDetectorRef, private viewContainerRef: ViewContainerRef, translate: TranslateService ) {
        /* App Settings */
        utilService.APP_TITLE = 'Bet Results'

        translate.setDefaultLang('en');
        translate.use('it');
    }

    ngOnInit() {
//        this.httpClient.get( 'jsonService/menu?m=menu' ).subscribe( data => {
//            this.utilService.setMenu( data.xxMenu );
//            this.changeDetectorRef.markForCheck()
//        }, err => { })
    }
}