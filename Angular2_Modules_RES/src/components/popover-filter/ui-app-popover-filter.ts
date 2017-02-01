import { Component, Injectable, Input, EventEmitter, AfterViewInit, ComponentFactoryResolver, ApplicationRef, ViewContainerRef, ElementRef, ComponentRef, ChangeDetectorRef } from '@angular/core';

declare var $: any;

@Injectable()
export class PopoverFilterService {
    private filterPopover: ComponentRef<PopoverFilter>

    constructor(private cmpResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef) { }

    showPopoverFilter(options: Object): EventEmitter<string> {
        var searchTextChange: EventEmitter<string> = new EventEmitter<string>()
        if ($('popover-filter').length == 0) {
            setTimeout(() => {
                var viewContainerRef: ViewContainerRef = this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
                this.filterPopover = viewContainerRef.createComponent(this.cmpResolver.resolveComponentFactory(PopoverFilter), 0)
                this.filterPopover.instance.init(options, searchTextChange)
            })
        }
        return searchTextChange;
    }

    hidePopoverFilter() {
        this.filterPopover.destroy()
    }
}

@Component({
    selector: 'popover-filter',
    template: '<div class="popover fade top in" role="tooltip"><div class="arrow" style="left: 50%;"></div>'
    + '<h3 class="popover-title" translate [model]="title"></h3><div class="popover-content">'
    + '<input type="text" [ngModel]="searchText" (ngModelChange)="onChange($event)" class="form-control autocomplete" [ngClass]="{uppercase : uppercase}" *ngIf="!autocomplete"/>'
    + '<ui-autocomplete [ac-items]="autocompleteList" [ac-search-text]="searchText" (ac-item-selected-change)="onAutocompleteChange($event)" '
    + '[ac-uppercase]="uppercase" ac-not-found="no match." ac-no-cache="true" class="form-gl" *ngIf="autocomplete"></ui-autocomplete>'
    + '</div></div>'
})
export class PopoverFilter implements AfterViewInit {
    top: number
    left: number
    title: string
    autocomplete: boolean
    autocompleteList: Object[] = []
    autocompleteListChange: EventEmitter<Object[]>
    uppercase: boolean

    searchText: string
    searchTextChange: EventEmitter<string>

    constructor(private element: ElementRef, private changeDetectorRef: ChangeDetectorRef, private popoverFilterService: PopoverFilterService) { }

    ngAfterViewInit() {
        setTimeout(() => {
            var $popover = $('div.popover', this.element.nativeElement)
            var $popoverInput = $('input', this.element.nativeElement)

            this.autocompleteListChange.subscribe(newAutocompleteList => {
                this.autocompleteList = newAutocompleteList
                this.changeDetectorRef.markForCheck()
            })
            $popover.css({
                top: (this.top - $popover.outerHeight() - 11) + 'px',
                left: (this.left - ($popover.outerWidth() / 2)) + 'px',
                display: 'block'
            })
            if (!this.autocomplete)
                $popoverInput.on('keydown keypress', event => {
                    if (event.which === 13) {
                        this.popoverFilterService.hidePopoverFilter()
                        event.preventDefault();
                    }
                });
            $popover.on('blur', event => {
                if (!$.contains($(this.element.nativeElement)[0], $(':focus')[0]))
                    this.popoverFilterService.hidePopoverFilter()
                else if (!$(':focus').is($popoverInput))
                    $popover.focus();
            })
            $popoverInput.on('blur', event => {
                if (!$.contains($(this.element.nativeElement)[0], $(':focus')[0]))
                    this.popoverFilterService.hidePopoverFilter()
            })
            $popoverInput.focus();
        })
    }

    public init(options: any, searchTextChange: EventEmitter<string>) {
        this.title = options.title
        this.autocomplete = options.autocomplete
        this.autocompleteList = options.autocompleteList
        this.autocompleteListChange = options.autocompleteListChange
        this.uppercase = options.uppercase
        this.top = options.top
        this.left = options.left
        this.searchText = options.searchText
        this.searchTextChange = searchTextChange;
    }

    private onChange(search) {
        this.searchTextChange.emit(search)
    }

    private onAutocompleteChange(selected) {
        if (selected) {
            this.searchTextChange.emit(selected.value)
            this.popoverFilterService.hidePopoverFilter()
        } else
            this.searchTextChange.emit('')
    }
}