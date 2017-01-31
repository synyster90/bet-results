import { Component, OnInit } from '@angular/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';

declare var moment: any

@Component({
    selector: 'modal-content',
    template: require('./viewModal.html')
})
export class ViewModalCtrl implements OnInit {
    public locals: Object;
    itemInfo: any
    showDropdown: boolean = false

    toggleDropdown() {
        var $this = this
        if (this.showDropdown)
            setTimeout(() => {
                $this.showDropdown = !$this.showDropdown
            }, 100)
        else
            this.showDropdown = !this.showDropdown
    }

    constructor(private utilService: UtilService, private modalDialogService: ModalDialogService) { }

    ngOnInit() {
        this.itemInfo = this.locals['item']
    }

    close() {
        this.modalDialogService.cancel();
    };

    editItemPopup() {
        this.modalDialogService.hide({
            'action': 'edit'
        });
    }
};