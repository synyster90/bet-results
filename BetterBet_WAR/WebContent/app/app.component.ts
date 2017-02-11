import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { SideMenuService } from '@angular/modules/src/components';
import { UtilService } from '@angular/modules/src/utils';
import { HttpClient } from '@angular/modules/src/http-client';

import { ScommesseService } from './shared/service/scommesse.service';

declare var $: any;

@Component( {
    selector: 'app-main',
    template: require( './main.html' ),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    constructor( private router: Router, private httpClient: HttpClient, private location: Location, private utilService: UtilService,
        private sideMenuService: SideMenuService, private changeDetectorRef: ChangeDetectorRef, private viewContainerRef: ViewContainerRef, translate: TranslateService,
        private scommesseService: ScommesseService ) {
        /* App Settings */
        utilService.APP_TITLE = 'Bet Results'

        translate.setDefaultLang( 'en' );
        translate.use( 'it' );
    }

    ngOnInit() {
        this.httpClient.get( 'rest/init' ).subscribe( (data: any) => {
            console.log( data )
            this.scommesseService.competitions = data.competitions;
            this.scommesseService.matches = data.Matches;
            
            this.scommesseService.competitionsMap = this.scommesseService.competitionsToMap(data.competitions);
            this.scommesseService.matchesMap = this.scommesseService.matchesToMap(data.Matches);
            
            this.changeDetectorRef.markForCheck()
        }, err => {
            console.log( err )
        })
    }
}