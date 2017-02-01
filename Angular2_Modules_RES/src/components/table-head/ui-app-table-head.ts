import { Component, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';

import { PopoverFilterService } from '../popover-filter/ui-app-popover-filter'

import { UtilService } from '../../utils/utils';

declare var $: any;

@Component({
    selector: 'table-head',
    template: '<div class="sort" (click)="sortClick()">'
    + '<span translate [model]="hdName"></span> <span *ngIf="hdsorttype == hdType" [ngClass]="utilService.sortClass(hdsortreverse)"></span>'
    + '<button type="button" class="filter-btn btn btn-default btn-xs" (click)="togglePopover($event)" *ngIf="showFilter">'
    + '<span class="glyphicon glyphicon-filter" aria-hidden="true"></span></button>'
})
export class TableHead implements AfterViewInit, OnChanges {
    @Input('hd-name') hdName: string
    @Input('hd-type') hdType: string
    @Input() hdcurrentpage: number
    @Output() hdcurrentpageChange: EventEmitter<number> = new EventEmitter<number>()
    @Input() hdsorttype: string
    @Output() hdsorttypeChange: EventEmitter<string> = new EventEmitter<string>()
    @Input() hdsortreverse: boolean
    @Output() hdsortreverseChange: EventEmitter<boolean> = new EventEmitter<boolean>()
    @Input('hd-filter-title') hdFilterTitle: string
    @Input() hdfiltersearch: Object
    @Output() hdfiltersearchChange: EventEmitter<Object> = new EventEmitter<Object>()
    @Input('hd-filter-uppercase') hdFilterUppercase: boolean
    @Input('hd-filter-autocomplete') hdFilterAutocomplete: boolean
    @Input('hd-filter-autocomplete-list') hdFilterAutocompleteList: Object[] = []

    hdFilterAutocompleteListChange: EventEmitter<Object[]> = new EventEmitter<Object[]>()

    private showFilter: boolean = true

    constructor(private element: ElementRef, private utilService: UtilService, private popoverFilterService: PopoverFilterService, private changeDetectorRef: ChangeDetectorRef) {
        this.hdFilterUppercase = typeof this.hdFilterUppercase == 'boolean' ? this.hdFilterUppercase : false;
        this.hdFilterAutocomplete = typeof this.hdFilterAutocomplete == 'boolean' ? this.hdFilterAutocomplete : false;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.showFilter = typeof this.hdfiltersearch == 'undefined' ? false : true;
        })
    }

    ngOnChanges(changes: Object) {
        if (changes.hasOwnProperty('hdFilterAutocompleteList'))
            this.hdFilterAutocompleteListChange.emit(changes['hdFilterAutocompleteList']['currentValue'])
    }

    private setHdFilterSearch(value: string) {
        var filterKeyPath: string[] = this.hdType.indexOf('.') === -1 ? [this.hdType] : this.hdType.split('.')
        this.setHdFilterSearchValue(value, filterKeyPath, this.hdfiltersearch)
        this.changeDetectorRef.markForCheck()
    }

    private setHdFilterSearchValue(value: string, filterKeyPath: string[], tempFilter: any) {
        var key: string = filterKeyPath[0]
        if (tempFilter.hasOwnProperty(key))
            if (typeof tempFilter[key] == 'string') {
                tempFilter[key] = value
            } else {
                filterKeyPath.splice(0, 1)
                this.setHdFilterSearchValue(value, filterKeyPath, tempFilter[key])
            }
        else {
            filterKeyPath.splice(0, 1)
            if (filterKeyPath.length == 0)
                tempFilter[key] = value
            else {
                tempFilter[key] = {}
                this.setHdFilterSearchValue(value, filterKeyPath, tempFilter[key])
            }
        }
    }

    private getHdFilterSearch(): string {
        var filterKeyPath: string[] = this.hdType.indexOf('.') === -1 ? [this.hdType] : this.hdType.split('.')
        return this.getHdFilterSearchValue(filterKeyPath, this.hdfiltersearch)

    }

    private getHdFilterSearchValue(filterKeyPath: string[], tempFilter: any): string {
        var key: string = filterKeyPath[0]
        if (tempFilter.hasOwnProperty(key))
            if (typeof tempFilter[key] == 'string')
                return tempFilter[key]
            else {
                filterKeyPath.splice(0, 1)
                return this.getHdFilterSearchValue(filterKeyPath, tempFilter[key])
            }
        else
            return ''
    }

    sortClick() {
        if (this.hdsorttype == this.hdType)
            this.hdsortreverse = !this.hdsortreverse
        else
            this.hdsortreverse = false
        this.hdsortreverseChange.emit(this.hdsortreverse)

        if (this.hdsorttype != this.hdType) {
            this.hdsorttype = this.hdType
            this.hdsorttypeChange.emit(this.hdType)
        }
        this.changeDetectorRef.markForCheck()
    }

    togglePopover(event) {
        if (event)
            $(event.target).blur();
        if (this.showFilter && $(event.target).is($('button.filter-btn', this.element.nativeElement))) {
            event.stopPropagation()
            var $this = this
            setTimeout(() => {
                this.popoverFilterService.showPopoverFilter({
                    top: $(event.target).offset().top + 10,
                    left: $(event.target).offset().left + ($(event.target).height() / 2),
                    title: this.hdFilterTitle,
                    autocomplete: this.hdFilterAutocomplete,
                    autocompleteList: this.hdFilterAutocompleteList ? this.hdFilterAutocompleteList : [],
                    autocompleteListChange: this.hdFilterAutocompleteListChange,
                    uppercase: this.hdFilterUppercase,
                    searchText: this.getHdFilterSearch()
                }).subscribe(searchText => {
                    if (searchText && searchText != '') {
                        this.hdcurrentpage = 1;
                        this.hdcurrentpageChange.emit(1)
                        $('button.filter-btn', this.element.nativeElement).addClass('filter-btn-active');
                    } else
                        $('button.filter-btn', this.element.nativeElement).removeClass('filter-btn-active');
                    this.setHdFilterSearch(searchText)
                    this.hdfiltersearchChange.emit(this.hdfiltersearch)
                })
            })
        }
    }
}