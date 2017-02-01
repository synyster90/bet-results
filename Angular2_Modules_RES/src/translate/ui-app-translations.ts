import { Component, Directive, Injectable, Input, ElementRef, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { TranslateService, TranslatePipe, LangChangeEvent } from 'ng2-translate/ng2-translate';

import 'moment';

import './flags/de.png';
import './flags/es.png';
import './flags/fr.png';
import './flags/gb.png';
import './flags/it.png';

declare var $: any;
declare var moment: any

@Directive( {
    selector: '[translate]'
})
export class TranslateDirective implements AfterViewInit, OnChanges {
    @Input( 'translate' ) translateKey: string
    @Input() model: string
    @Input( 'translate-values' ) translateValues: string

    private origInnerHtml: string

    constructor( private el: ElementRef, private translate: TranslateService ) {
        translate.onLangChange.subscribe(( event: LangChangeEvent ) => {
            this.setContent( this.translateKey )
        })
    }

    ngAfterViewInit() {
        if ( this.translateKey && this.translateKey != '' )
            this.setContent( this.translateKey )
        else if ( this.model && this.model != '' )
            this.setContent( this.model )
    }

    ngOnChanges( changes: Object ) {
        setTimeout(() => {
            if ( changes.hasOwnProperty( 'model' ) )
                if ( changes['model']['currentValue'] )
                    this.setContent( changes['model']['currentValue'] )
        })
    }

    private setContent( key: string ) {
        if ( typeof this.origInnerHtml == 'undefined' )
            this.origInnerHtml = $( this.el.nativeElement ).html()
        this.translateKey = key
        var param = {}
        if ( this.translateValues )
            try {
                param = JSON.parse( this.translateValues )
            } catch ( e ) {
            }
        this.translate.get( key, param ).subscribe( value => {
            $( this.el.nativeElement ).html(( this.origInnerHtml ? this.origInnerHtml : '' ) + value )
        })
    }
}

@Component( {
    selector: 'lang-select',
    template: '<div class="dropdown" [ngClass]="{open: showDropdown}"><button class="btn btn-default btn-sm dropdown-toggle" type="button" (click)="toggleDropdown()" (blur)="toggleDropdown()">'
    + '<img src="{{selectedLang.flagImg}}" class="lang-flag"/><span translate [model]="selectedLang.name"></span> <span class="glyphicon glyphicon-menu-down"></span></button>'
    + '<ul class="dropdown-menu"><li [ngClass]="{\'disabled\':lang.id == selectedLang.id}" *ngFor="let lang of languages; let $index = index" class="lang-option">'
    + '<a (click)="langChange(lang.id, $index)" translate [model]="lang.name"><img src="{{lang.flagImg}}" class="lang-flag"/></a></li></ul></div><hr>'
})
export class LangSelect {
    selectedLang = null
    showDropdown: boolean = false

    languages = [{
        id: 'it',
        name: 'LANG_SELECT.IT',
        flagImg: 'dist/assets/@angular/modules/src/translate/flags/it.png',
    }, {
        id: 'en',
        name: 'LANG_SELECT.EN',
        flagImg: 'dist/assets/@angular/modules/src/translate/flags/gb.png',
    }, {
        id: 'de',
        name: 'LANG_SELECT.DE',
        flagImg: 'dist/assets/@angular/modules/src/translate/flags/de.png',
    }, {
        id: 'fr',
        name: 'LANG_SELECT.FR',
        flagImg: 'dist/assets/@angular/modules/src/translate/flags/fr.png',
    }, {
        id: 'es',
        name: 'LANG_SELECT.ES',
        flagImg: 'dist/assets/@angular/modules/src/translate/flags/es.png',
    }];

    langChange( langKey, index ) {
        if ( this.translate.currentLang != langKey ) {
            this.selectedLang = this.languages[index];
            moment.locale( langKey );
            this.translate.use( langKey );
            this.changeDetectorRef.markForCheck()
        }
    }

    toggleDropdown() {
        var $this = this
        if ( this.showDropdown )
            setTimeout(() => {
                $this.showDropdown = !$this.showDropdown
                $this.changeDetectorRef.markForCheck();
            }, 100 )
        else
            this.showDropdown = !this.showDropdown
    }

    constructor( private translate: TranslateService, private changeDetectorRef: ChangeDetectorRef ) {
        var langToSelect: string = 'it';
        for ( var index = 0; index < this.languages.length; index++ )
            if ( this.languages[index].id == langToSelect ) {
                this.selectedLang = this.languages[index];
                moment.locale( langToSelect );
                break;
            }
    }
}