import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';
import { SampleService } from '../../../../shared/service/sample.service';
import { HttpClient } from '@angular/modules/src/http-client';

declare var moment: any

@Component({
    selector: 'modal-content',
    template: require('./editModal.html')
})
export class EditModalCtrl implements OnInit {
    public locals: Object;
    editItem: any

    constructor(private utilService: UtilService, private sampleService: SampleService, private modalDialogService: ModalDialogService, private httpClient: HttpClient) { }

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
        if (this.editItem.first_name && this.editItem.first_name != this.locals['item'].first_name
            || this.editItem.last_name && this.editItem.last_name != this.locals['item'].last_name
            || this.editItem.email && this.editItem.email != this.locals['item'].email
            || this.editItem.gender && this.editItem.gender != this.locals['item'].gender
            || this.editItem.ip_address && this.editItem.ip_address != this.locals['item'].ip_address)
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

        if (this.editItem.first_name && this.editItem.first_name != '') {
            if (this.editItem.first_name != this.locals['item'].first_name)
                changeNotify += '<li><strong>Nome</strong>: ' + this.locals['item'].first_name + ' --> ' + this.editItem.first_name + '</li>';
        } else
            changeNotify += '<li><strong>Nome</strong>: ' + this.locals['item'].first_name + ' --> null</li>';

        if (this.editItem.last_name && this.editItem.last_name != '') {
            if (this.editItem.last_name != this.locals['item'].last_name)
                changeNotify += '<li><strong>Cognome</strong>: ' + this.locals['item'].last_name + ' --> ' + this.editItem.last_name + '</li>';
        } else
            changeNotify += '<li><strong>Cognome</strong>: ' + this.locals['item'].last_name + ' --> null</li>';

        if (this.editItem.email && this.editItem.email != '') {
            if (this.editItem.email != this.locals['item'].email)
                changeNotify += '<li><strong>Email</strong>: ' + this.locals['item'].email + ' --> ' + this.editItem.email + '</li>';
        } else
            changeNotify += '<li><strong>Email</strong>: ' + this.locals['item'].email + ' --> null</li>';

        if (this.editItem.gender && this.editItem.gender != '') {
            if (this.editItem.gender != this.locals['item'].gender)
                changeNotify += '<li><strong>Sesso</strong>: ' + this.locals['item'].gender + ' --> ' + this.editItem.gender + '</li>';
        } else
            changeNotify += '<li><strong>Sesso</strong>: ' + this.locals['item'].gender + ' --> null</li>';

        if (this.editItem.ip_address && this.editItem.ip_address != '') {
            if (this.editItem.ip_address != this.locals['item'].ip_address)
                changeNotify += '<li><strong>Indirizzo IP</strong>: ' + this.locals['item'].ip_address + ' --> ' + this.editItem.ip_address + '</li>';
        } else
            changeNotify += '<li><strong>Indirizzo IP</strong>: ' + this.locals['item'].ip_address + ' --> null</li>';

        return changeNotify;
    }
}