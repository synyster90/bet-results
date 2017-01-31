import { Component, Injectable, ElementRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ModalDialogService } from '@angular/modules/src/dialogs';
import { UtilService } from '@angular/modules/src/utils';

@Component({
    selector: 'modal-content',
    template: require('./filterModal.html')
})
export class FilterModalCtrl implements OnInit {
    public locals: Object;
    private filtersArray: Object[];

    constructor(private utilService: UtilService, private modalDialogService: ModalDialogService) {
    }

    ngOnInit() {
        this.filtersArray = this.locals['filtersArray']
    }

    close() {
        this.modalDialogService.cancel();
    };

    confirm() {
        this.modalDialogService.hide(this.filtersArray);
    };
};