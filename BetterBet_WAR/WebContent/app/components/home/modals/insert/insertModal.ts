import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';
import { SampleService } from '../../../../shared/service/sample.service';
import { HttpClient } from '@angular/modules/src/http-client';

declare var moment: any

@Component({
    selector: 'modal-content',
    template: require('./insertModal.html')
})
export class InsertModalCtrl implements OnInit {
    public locals: Object;
    insertItem: any

    constructor(private utilService: UtilService, private sampleService: SampleService, private modalDialogService: ModalDialogService, private httpClient: HttpClient) { }

    ngOnInit() {
        this.insertItem = { "id": "", "first_name": "", "last_name": "", "email": "", "gender": "", "ip_address": "" }
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