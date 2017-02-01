"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var TablePagination = (function () {
    function TablePagination() {
        this.currentpageChange = new core_1.EventEmitter();
        this.pages = [];
        this.maxSize = typeof this.maxSize != 'undefined' ? this.maxSize : 5;
        this.itemsPerPage = typeof this.itemsPerPage != 'undefined' ? this.itemsPerPage : 20;
    }
    TablePagination.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('currentpage'))
            this.currentpage = changes['currentpage']['currentValue'];
        if (changes.hasOwnProperty('totalItems'))
            this.totalItems = changes['totalItems']['currentValue'];
        if (changes.hasOwnProperty('itemsPerPage'))
            this.itemsPerPage = changes['itemsPerPage']['currentValue'];
        this.setPages();
    };
    TablePagination.prototype.selectPage = function (pageNum, event) {
        if (event)
            event.preventDefault();
        if (this.currentpage !== pageNum && pageNum > 0 && pageNum <= this.totalPages) {
            if (event && event.target)
                event.target.blur();
            this.currentpage = pageNum;
            this.currentpageChange.emit(pageNum);
        }
    };
    TablePagination.prototype.setPages = function () {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.pages = [];
        // Default page limits
        var startPage = 1;
        var endPage = this.totalPages;
        var isMaxSized = this.maxSize && this.maxSize < this.totalPages;
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
                }
                else if (startPage === 3) {
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
                }
                else if (endPage === this.totalPages - 2) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TablePagination.prototype, "currentpage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TablePagination.prototype, "currentpageChange", void 0);
    __decorate([
        core_1.Input('total-items'), 
        __metadata('design:type', Number)
    ], TablePagination.prototype, "totalItems", void 0);
    __decorate([
        core_1.Input('items-per-page'), 
        __metadata('design:type', Number)
    ], TablePagination.prototype, "itemsPerPage", void 0);
    __decorate([
        core_1.Input('max-size'), 
        __metadata('design:type', Number)
    ], TablePagination.prototype, "maxSize", void 0);
    __decorate([
        core_1.Input('class'), 
        __metadata('design:type', String)
    ], TablePagination.prototype, "customClass", void 0);
    TablePagination = __decorate([
        core_1.Component({
            selector: 'table-pagination',
            template: '<ul [ngClass]="customClass + \' pagination\'" *ngIf="pages.length > 0 && itemsPerPage != 999999">'
                + '<li class="pagination-first" [ngClass]="{disabled: currentpage === 1}"><a (click)="selectPage(1, $event)" translate="BUTTON_TEXT.FIRST"></a></li>'
                + '<li class="pagination-prev" [ngClass]="{disabled: currentpage === 1}"><a (click)="selectPage(currentpage - 1, $event)" translate="BUTTON_TEXT.PREV"></a></li>'
                + '<li class="pagination-page" *ngFor="let page of pages; let $index = index" [ngClass]="{active: page.active, disabled: page.number == -1}">'
                + '<a (click)="selectPage(page.number, $event)">{{page.name}}</a></li>'
                + '<li class="pagination-next" [ngClass]="{disabled: currentpage === totalPages}"><a (click)="selectPage(currentpage + 1, $event)" translate="BUTTON_TEXT.NEXT"></a></li>'
                + '<li class="pagination-last" [ngClass]="{disabled: currentpage === totalPages}"><a (click)="selectPage(totalPages, $event)" translate="BUTTON_TEXT.LAST"></a></li></ul>'
        }), 
        __metadata('design:paramtypes', [])
    ], TablePagination);
    return TablePagination;
}());
exports.TablePagination = TablePagination;
//# sourceMappingURL=ui-app-table-pagination.js.map