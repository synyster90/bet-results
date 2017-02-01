import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';
import { ScommesseService } from '../../../../shared/service/scommesse.service';
import { HttpClient } from '@angular/modules/src/http-client';

declare var moment: any

@Component({
    selector: 'modal-content',
    template: require('./editModal.html')
})
export class EditModalCtrl implements OnInit {
    public locals: Object;
    editItem: any

    constructor(private utilService: UtilService, private scommesseService: ScommesseService, private modalDialogService: ModalDialogService, private httpClient: HttpClient) { }

    ngOnInit() {
        this.editItem = JSON.parse(JSON.stringify(this.locals['item']))
    }

    close() {
        if (this.checkClose()) {
            var $this = this
            this.modalDialogService.confirm('<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_EDIT"></div>', function(result) {
                if (result == true)
                    $this.modalDialogService.cancel();
            });
        } else
            this.modalDialogService.cancel();
    };

    checkClose() {
        if (this.editItem.partita && this.editItem.partita != this.locals['item'].partita
            || this.editItem.scommessa && this.editItem.scommessa != this.locals['item'].scommessa)
            return true;
        return false;
    }

    save() {
        var changeNotify = this.checkEdit();
        var $this = this
        if (changeNotify != '') {
            $this.modalDialogService.confirm('<div class="panel-body-custom">Riepilogo Modifiche<ul>' + changeNotify + '</ul></div><div class="confirm-message">'
                + '<div class="row"><div class="col-sm-12"><span translate="MODAL_TEXT.MESSAGE_EDIT_CONFIRM"></span></div></div></div>', function(result) {
                    if (result == true)
                        $this.modalDialogService.hide($this.editItem);
                })
        }
    }

    checkEdit() {
        var changeNotify = '';

        if (this.editItem.partita && this.editItem.partita != '') {
            if (this.editItem.partita != this.locals['item'].partita)
                changeNotify += '<li><strong>Partita</strong>: ' + this.locals['item'].partita + ' --> ' + this.editItem.partita + '</li>';
        } else
            changeNotify += '<li><strong>Partita</strong>: ' + this.locals['item'].partita + ' --> null</li>';

        if (this.editItem.scommessa && this.editItem.scommessa != '') {
            if (this.editItem.scommessa != this.locals['item'].scommessa)
                changeNotify += '<li><strong>Scommessa</strong>: ' + this.locals['item'].scommessa + ' --> ' + this.editItem.scommessa + '</li>';
        } else
            changeNotify += '<li><strong>Scommessa</strong>: ' + this.locals['item'].scommessa + ' --> null</li>';

        return changeNotify;
    }
}