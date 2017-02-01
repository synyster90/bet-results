import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'table-pagination',
    template: '<ul [ngClass]="customClass + \' pagination\'" *ngIf="pages.length > 0 && itemsPerPage != 999999">'
    + '<li class="pagination-first" [ngClass]="{disabled: currentpage === 1}"><a (click)="selectPage(1, $event)" translate="BUTTON_TEXT.FIRST"></a></li>'
    + '<li class="pagination-prev" [ngClass]="{disabled: currentpage === 1}"><a (click)="selectPage(currentpage - 1, $event)" translate="BUTTON_TEXT.PREV"></a></li>'
    + '<li class="pagination-page" *ngFor="let page of pages; let $index = index" [ngClass]="{active: page.active, disabled: page.number == -1}">'
    + '<a (click)="selectPage(page.number, $event)">{{page.name}}</a></li>'
    + '<li class="pagination-next" [ngClass]="{disabled: currentpage === totalPages}"><a (click)="selectPage(currentpage + 1, $event)" translate="BUTTON_TEXT.NEXT"></a></li>'
    + '<li class="pagination-last" [ngClass]="{disabled: currentpage === totalPages}"><a (click)="selectPage(totalPages, $event)" translate="BUTTON_TEXT.LAST"></a></li></ul>'
})
export class TablePagination implements OnChanges {
    @Input() currentpage: number
    @Output() currentpageChange: EventEmitter<number> = new EventEmitter<number>();
    @Input('total-items') totalItems: number
    @Input('items-per-page') itemsPerPage: number
    @Input('max-size') maxSize: number
    @Input('class') customClass: string

    private totalPages: number
    private pages: Object[] = []

    constructor() {
        this.maxSize = typeof this.maxSize != 'undefined' ? this.maxSize : 5
        this.itemsPerPage = typeof this.itemsPerPage != 'undefined' ? this.itemsPerPage : 20
    }

    ngOnChanges(changes: Object) {
        if (changes.hasOwnProperty('currentpage'))
            this.currentpage = changes['currentpage']['currentValue']
        if (changes.hasOwnProperty('totalItems'))
            this.totalItems = changes['totalItems']['currentValue']
        if (changes.hasOwnProperty('itemsPerPage'))
            this.itemsPerPage = changes['itemsPerPage']['currentValue']
        this.setPages()
    }

    selectPage(pageNum, event) {
        if (event)
            event.preventDefault();

        if (this.currentpage !== pageNum && pageNum > 0 && pageNum <= this.totalPages) {
            if (event && event.target)
                event.target.blur();
            this.currentpage = pageNum;
            this.currentpageChange.emit(pageNum)
        }
    }

    setPages() {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.pages = [];

        // Default page limits
        var startPage: number = 1
        var endPage: number = this.totalPages;
        var isMaxSized: boolean = this.maxSize && this.maxSize < this.totalPages;

        // recompute if maxSize
        if (isMaxSized) {
            // Visible pages are paginated with maxSize
            startPage = (Math.ceil(this.currentpage / this.maxSize) - 1) * this.maxSize + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min((startPage * 1 + this.maxSize * 1 - 1), this.totalPages);
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
            this.pages.push({
                number: number,
                name: number,
                active: number === this.currentpage
            });
        }

        // Add links to move between page sets
        if (isMaxSized && this.maxSize > 0) {
            if (startPage > 1) {
                if (startPage > 3) {
                    this.pages.unshift({
                        number: -1,
                        name: '...',
                        active: false
                    });
                } else if (startPage === 3) {
                    this.pages.unshift({
                        number: 2,
                        name: '2',
                        active: false
                    });
                }
                // add the first page
                this.pages.unshift({
                    number: 1,
                    name: '1',
                    active: false
                });
            }

            if (endPage < this.totalPages) {
                if (endPage < this.totalPages - 2) {
                    this.pages.push({
                        number: -1,
                        name: '...',
                        active: false
                    });
                } else if (endPage === this.totalPages - 2) {
                    this.pages.push({
                        number: this.totalPages - 1,
                        name: this.totalPages - 1,
                        active: false
                    });
                }
                // add the last page
                this.pages.push({
                    number: this.totalPages,
                    name: this.totalPages,
                    active: false
                });
            }
        }
    }
}