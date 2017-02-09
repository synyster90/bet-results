import { Component, OnInit } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';
import { ScommesseService } from '../../../../shared/service/scommesse.service';
import { HttpClient } from '@angular/modules/src/http-client';

declare var moment: any

@Component( {
    selector: 'modal-content',
    template: require( './insertModal.html' )
})
export class InsertModalCtrl implements OnInit {
    public locals: Object;
    insertItem: any
    filterMatches: any = []

    constructor( private utilService: UtilService, private scommesseService: ScommesseService, private modalDialogService: ModalDialogService, private httpClient: HttpClient,
        private cookieService: CookieService ) { }

    ngOnInit() {
        this.insertItem = { "id": "", "competition": "", "match": "", "scommessa": "" }
        if ( this.cookieService.get( 'scommessePartiteTableData' ) ) {
            var scommesse: any[] = JSON.parse( this.cookieService.get( 'scommessePartiteTableData' ) );
            this.insertItem.id = scommesse[scommesse.length - 1].id + 1
        } else
            this.insertItem.id = 0
    }

    onCompetitionChange( competitionSelect ) {
        if ( competitionSelect ) {
            this.insertItem.competition = competitionSelect
            for ( var i = 0; i < this.scommesseService.matches.length; i++ ) {
                if ( this.scommesseService.matches[i]['competition_id'] == competitionSelect.des )
                    this.filterMatches.push( {
                        value: this.scommesseService.matches[i]['team_A_title'] + ' - ' + this.scommesseService.matches[i]['team_B_title'],
                        des: this.scommesseService.matches[i]['match_id']
                    })
            }
            console.log(this.filterMatches)
        } else {
            this.filterMatches = []
            this.insertItem.competition = null
            this.insertItem.match = null
        }
    }

    close() {
        var $this = this
        this.modalDialogService.confirm( '<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_EDIT"></div>', function( result ) {
            if ( result == true )
                $this.modalDialogService.cancel();
        });
    };

    save() {
        if ( this.insertItem.match && this.insertItem.match != '' && this.insertItem.competition && this.insertItem.competition != '' && this.insertItem.scommessa && this.insertItem.scommessa != '' ) {
            var $this = this
            $this.modalDialogService.confirm( '<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_INSERT_CONFIRM"></div>', function( result ) {
                if ( result == true )
                    $this.modalDialogService.hide( $this.insertItem );
            })
        } else {
            this.modalDialogService.alert( "Compilare tutti i campi" );
        }
    }
}