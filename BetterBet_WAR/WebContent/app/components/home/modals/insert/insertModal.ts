import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';
import { ScommesseService } from '../../../../shared/service/scommesse.service';
import { HttpClient } from '@angular/modules/src/http-client';

declare var moment: any

@Component({
    selector: 'modal-content',
    template: require('./insertModal.html')
})
export class InsertModalCtrl implements OnInit {
    public locals: Object;
    insertItem: any
    filterMatches: any = []

    constructor(private utilService: UtilService, private scommesseService: ScommesseService, private modalDialogService: ModalDialogService, private httpClient: HttpClient) { }

    ngOnInit() {
        this.insertItem = { "id": "", "competition": "", "match": "", "scommessa": "" }
    }
    
    onCompetitionChange(competitionSelect) {
        if(competitionSelect) {
            this.insertItem.competition = competitionSelect
            for(var i = 0; i < this.scommesseService.matches.length; i++) {
                if(this.scommesseService.matches[i]['competition_id'] == competitionSelect.des)
                    this.filterMatches.push({
                        value: this.scommesseService.matches[i]['match_id'],
                        des: this.scommesseService.matches[i]['team_A_title'] + ' - ' + this.scommesseService.matches[i]['team_B_title']
                    })
            }
        } else {
            this.filterMatches = []
            this.insertItem.competition = null
            this.insertItem.match = null
        }
        
    }

    close() {
        var $this = this
        this.modalDialogService.confirm('<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_EDIT"></div>', function(result) {
            if (result == true)
                $this.modalDialogService.cancel();
        });
    };

    save() {
        var $this = this
        $this.modalDialogService.confirm('<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_INSERT_CONFIRM"></div>', function(result) {
            if (result == true)
                $this.modalDialogService.hide($this.insertItem);
        })
    }
}