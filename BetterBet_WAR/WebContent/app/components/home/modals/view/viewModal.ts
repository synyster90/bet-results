import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';
import { ScommesseService } from '../../../../shared/service/scommesse.service';

declare var moment: any

@Component( {
    selector: 'modal-content',
    template: require( './viewModal.html' )
})
export class ViewModalCtrl implements OnInit {
    public locals: Object;
    itemInfo: any
    showDropdown: boolean = false

    toggleDropdown() {
        var $this = this
        if ( this.showDropdown )
            setTimeout(() => {
                $this.showDropdown = !$this.showDropdown
            }, 100 )
        else
            this.showDropdown = !this.showDropdown
    }

    constructor( private utilService: UtilService, private scommesseService: ScommesseService, private modalDialogService: ModalDialogService ) { }

    ngOnInit() {
        this.itemInfo = {
            id: this.locals['item'].id,
            competition: this.scommesseService.getCompetition( this.locals['item'].competition_id ),
            match: this.scommesseService.getMatch( this.locals['item'].match_id ),
            bet: {
                value: this.locals['item'].bet.text,
                des: this.locals['item'].bet.id
            }
        }
    }

    close() {
        this.modalDialogService.cancel();
    };

    editItemPopup() {
        this.modalDialogService.hide( {
            'action': 'edit'
        });
    }
};