import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';
import { ScommesseService } from '../../../../shared/service/scommesse.service';
import { HttpClient } from '@angular/modules/src/http-client';

declare var moment: any

@Component( {
    selector: 'modal-content',
    template: require( './editModal.html' )
})
export class EditModalCtrl implements OnInit {
    public locals: Object;
    origItem: any
    editItem: any
    filterMatches: any = []

    constructor( private utilService: UtilService, private scommesseService: ScommesseService, private modalDialogService: ModalDialogService, private httpClient: HttpClient ) { }

    ngOnInit() {
        this.origItem = {
            id: this.locals['item'].id,
            competition: this.scommesseService.getCompetition(this.locals['item'].competition_id),
            match: this.scommesseService.getMatch(this.locals['item'].match_id),
            bet: {
                value: this.locals['item'].bet.text,
                des: this.locals['item'].bet.id
            }
        }
        this.editItem = JSON.parse( JSON.stringify( this.origItem ) )
    }

    onCompetitionChange( competitionSelect ) {
        if ( competitionSelect ) {
            this.editItem.competition = competitionSelect
            for ( var i = 0; i < this.scommesseService.matches.length; i++ ) {
                if ( this.scommesseService.matches[i]['competition_id'] == competitionSelect.des )
                    this.filterMatches.push( {
                        value: this.scommesseService.matches[i]['team_A_title'] + ' - ' + this.scommesseService.matches[i]['team_B_title'],
                        des: this.scommesseService.matches[i]['match_id']
                    })
            }
        } else {
            this.filterMatches = []
            this.editItem.competition = null
            this.editItem.match = null
        }
    }

    close() {
        if ( this.checkClose() ) {
            var $this = this
            this.modalDialogService.confirm( '<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_EDIT"></div>', function( result ) {
                if ( result == true )
                    $this.modalDialogService.cancel();
            });
        } else
            this.modalDialogService.cancel();
    };

    checkClose() {
        if ( ( this.editItem.competition && this.editItem.competition.des && this.editItem.competition.des != this.origItem.competition.des )
            || ( this.editItem.match && this.editItem.match.des && this.editItem.match.des != this.origItem.match.des )
            || ( this.editItem.scommessa && this.editItem.scommessa.des && this.editItem.scommessa.des != this.origItem.scommessa.des ) )
            return true;
        return false;
    }

    save() {
        var changeNotify = this.checkEdit();
        var $this = this
        if ( changeNotify != '' ) {
            $this.modalDialogService.confirm( '<div class="panel-body-custom">Riepilogo Modifiche<ul>' + changeNotify + '</ul></div><div class="confirm-message">'
                + '<div class="row"><div class="col-sm-12"><span translate="MODAL_TEXT.MESSAGE_EDIT_CONFIRM"></span></div></div></div>', function( result ) {
                    if ( result == true )
                        $this.modalDialogService.hide( $this.editItem );
                })
        }
    }

    checkEdit() {
        var changeNotify = '';

        if ( this.editItem.competition && this.editItem.competition != '' ) {
            if ( this.editItem.competition.des != this.origItem.competition.des )
                changeNotify += '<li><strong>Competizione</strong>: ' + this.origItem.competition_id + ' --> ' + this.editItem.competition.value + '</li>';
        } else
            changeNotify += '<li><strong>Competizione</strong>: ' + this.origItem.competition_id + ' --> null</li>';

        if ( this.editItem.match && this.editItem.match != '' ) {
            if ( this.editItem.match.des != this.origItem.match.des )
                changeNotify += '<li><strong>Partita</strong>: ' + this.origItem.match.value + ' --> ' + this.editItem.match.value + '</li>';
        } else
            changeNotify += '<li><strong>Partita</strong>: ' + this.origItem.match.value + ' --> null</li>';

        if ( this.editItem.scommessa && this.editItem.scommessa != '' ) {
            if ( this.editItem.scommessa.des != this.origItem.scommessa.des )
                changeNotify += '<li><strong>Scommessa</strong>: ' + this.origItem.scommessa.value + ' --> ' + this.editItem.scommessa.value + '</li>';
        } else
            changeNotify += '<li><strong>Scommessa</strong>: ' + this.origItem.scommessa.value + ' --> null</li>';

        return changeNotify;
    }
}