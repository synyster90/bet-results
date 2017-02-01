import { Component, Directive, Input, Output, EventEmitter, AfterViewInit, OnChanges, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

declare var $: any;

@Directive( {
    selector: '[highlight]'
})
export class AutocompleteHighlight implements OnChanges, AfterViewInit {
    @Input() text: string
    @Input() fullMatch: boolean

    private elementValue: string

    constructor( private element: ElementRef ) {
        this.fullMatch = typeof this.fullMatch == 'boolean' ? this.fullMatch : false
    }

    ngAfterViewInit() {
        this.elementValue = $( this.element.nativeElement ).text()
    }

    ngOnChanges( changes: Object ) {
        if ( changes.hasOwnProperty( 'text' ) )
            this.hightlightContent( changes['text'].currentValue )
    }

    private hightlightContent( text: string ) {
        var $element = $( this.element.nativeElement )
        if ( text )
            setTimeout(() => {
                var index: number = this.fullMatch ? this.elementValue.indexOf( text ) : this.elementValue.toUpperCase().indexOf( text.toUpperCase() )
                $element.html( this.elementValue.slice( 0, index ) + '<font color="#4ad840">' + this.elementValue.slice( index, index + text.length ) + '</font>'
                    + this.elementValue.slice( index + text.length ) )
            })
        else
            $element.html( this.elementValue )
    }
}

@Component( {
    selector: 'ui-autocomplete',
    template: '<div class="ui-autocomplete-container">'
    + '<input type="text" name="{{acInputName}}" [(ngModel)]="acSearchText" (ngModelChange)="onChange($event)" class="form-control autocomplete {{customClass}}"'
    + ' [disabled]="acDisabled" [ngClass]="{uppercase : acUppercase}"/>'
    + '<button tabindex="-1" type="button" class="ui-autocomplete-clear-btn" (click)="clear()" *ngIf="acSearchText && !acDisabled"><span>x</span></button>'
    + '<span tabindex="0" class="autocomplete-toggle glyphicon glyphicon-chevron-down" role="button" (click)="toggleFocus()"></span>'
    + '</div>'
    + '<div class="ui-autocomplete-list" *ngIf="isListOpen"><div class="ui-autocomplete-list-container"><div class="ui-autocomplete-list-scroller">'
    + '<span *ngFor="let item of filterItems | lazyLoadFilter:20:bottomReached; let $index = index; let $last = last" (click)="select($index)"'
    + ' class="ui-autocomplete-list-item" title="{{item.des}}"><font color="#000" highlight [text]="acSearchText" full-match="acFullMatch">{{item.value}}</font>'
    + '<font *ngIf="item.des && item.des != \'null\'"> - {{item.des}}</font></span>'
    + '<span *ngIf="filterItems.length == 0" class="ui-autocomplete-list-item-not-found">{{acNotFound}}</span>'
    + '</div></div></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Autocomplete implements AfterViewInit, OnChanges {
    private $this: Autocomplete = this
    private filterItems: any[] = []
    private bottomReached: boolean = true
    private isListOpen: boolean = false

    @Input( 'class' ) customClass: string
    @Input( 'ac-input-name' ) acInputName: string
    @Input( 'ac-not-found' ) acNotFound: string
    @Input( 'ac-uppercase' ) acUppercase: boolean
    @Input( 'ac-disabled' ) acDisabled: boolean
    @Input( 'ac-no-cache' ) acNoCache: boolean
    @Input( 'ac-select-on-match' ) acSelectOnMatch: boolean
    @Input( 'ac-full-match' ) acFullMatch: boolean
    @Input( 'ac-items' ) acItems: Object[]
    @Input( 'ac-item-selected' ) acItemSelected: Object
    @Input( 'ac-search-text' ) acSearchText: string

    @Output( 'ac-item-selected-change' ) acItemSelectedChange: EventEmitter<Object> = new EventEmitter<Object>()
    @Output( 'ac-search-text-change' ) acSearchTextChange: EventEmitter<string> = new EventEmitter<string>()

    acItemsChange: EventEmitter<Object[]> = new EventEmitter<Object[]>()

    constructor( private element: ElementRef, private changeDetectorRef: ChangeDetectorRef ) {
        this.acDisabled = typeof this.acDisabled == 'boolean' ? this.acDisabled : false
        this.acNoCache = typeof this.acNoCache == 'boolean' ? this.acNoCache : true
        this.acUppercase = typeof this.acUppercase == 'boolean' ? this.acUppercase : false
        this.acSelectOnMatch = typeof this.acSelectOnMatch == 'boolean' ? this.acSelectOnMatch : false
        this.acFullMatch = typeof this.acFullMatch == 'boolean' ? this.acFullMatch : false
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if ( this.acItemSelected ) {
                this.acSearchText = this.acItemSelected['value']
                this.changeDetectorRef.markForCheck()
            }
            if ( this.acItems )
                this.orderItems()

            $( 'input', this.element.nativeElement ).on( 'focus', event => {
                if ( typeof this.acSearchText == 'undefined' || this.acSearchText == '' && !this.isListOpen )
                    this.showAutocompleteList()
            })

            this.acItemSelectedChange.subscribe( newItem => {
                if ( newItem ) {
                    this.hideAutocompleteList()
                    this.acSearchText = newItem.value
                }
            })
        })
    }

    ngOnChanges( changes: Object ) {
        setTimeout(() => {
            if ( changes.hasOwnProperty( 'acItems' ) )
                this.acItemsChange.emit( changes['acItems']['currentValue'] )
            if ( changes.hasOwnProperty( 'acDisabled' ) )
                this.acDisabled = changes['acDisabled']['currentValue']
            if ( changes.hasOwnProperty( 'acItemSelected' ) )
                this.acItemSelected = changes['acItemSelected']['currentValue']
            this.changeDetectorRef.markForCheck()
        })
    }

    private showAutocompleteList() {
        this.isListOpen = true
        this.changeDetectorRef.markForCheck()
        setTimeout(() => {
            var $this = this
            $( 'div.ui-autocomplete-list-container', this.element.nativeElement ).scroll( function( event ) {
                if ( $( this ).scrollTop() + $( this ).innerHeight() >= $( this )[0].scrollHeight ) {
                    $this.bottomReached = true
                    $this.changeDetectorRef.markForCheck()
                }
            })

            this.filter( this.acSearchText )

            this.acItemsChange.subscribe( newItems => {
                this.acItems = newItems ? newItems : []
                this.orderItems()
                this.filter()
            })
            this.acSearchTextChange.subscribe( newSearchText => {
                this.filter( newSearchText )
            })
            setTimeout( () => {
                $( document ).on( 'click', event => {
                    if ( !$( event.target ).is( $( this.element.nativeElement ) ) ) {
                        $( document ).off( 'click' )
                        if ( this.isListOpen )
                            if ( !$.contains( $( 'div.ui-autocomplete-list', this.element.nativeElement )[0], $( event.target )[0] ) && !$( event.target ).hasClass( 'autocomplete-toggle' ) )
                                this.hideAutocompleteList()
                            else
                                $( 'input', this.element.nativeElement ).focus()
                    }
                })
            }, 300)
        })
    }

    private hideAutocompleteList() {
        this.isListOpen = false
        if ( !this.acItemSelected )
            this.acSearchText = ''
        this.changeDetectorRef.markForCheck()
    }

    private toggleFocus() {
        if ( !this.isListOpen )
            $( 'input', this.element.nativeElement ).focus()
    }

    private clear() {
        this.acSearchText = ''
        this.acSearchTextChange.emit( '' )
        this.acItemSelected = null
        this.acItemSelectedChange.emit( null )

        setTimeout(() => {
            $( 'input', this.element.nativeElement ).focus()
        })
    }

    private onChange( search ) {
        if ( !this.isListOpen )
            this.showAutocompleteList()
        this.acSearchTextChange.emit( search )
    }

    private filter( search?) {
        if ( !search || search == '' )
            this.filterItems = this.acItems
        else {
            var filtered = []
            for ( var i = 0; i < this.acItems.length; i++ ) {
                var match: boolean
                var MATCH_PATTERN: string = search.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" )
                if ( this.acFullMatch )
                    match = new RegExp( '^' + MATCH_PATTERN ).test( this.acItems[i]['value'] )
                else
                    match = new RegExp( MATCH_PATTERN.toUpperCase() ).test( this.acItems[i]['value'].toUpperCase() )
                if ( match )
                    filtered.push( this.acItems[i] )
            }
            this.filterItems = filtered
            // Select on Match
            if ( this.acSelectOnMatch && search != '' )
                if ( this.filterItems.length == 1 && search.toUpperCase() == this.filterItems[0].value.toUpperCase() )
                    this.acItemSelectedChange.emit( this.filterItems[0] )
        }
        this.changeDetectorRef.markForCheck()
    }

    private orderItems() {
        var key: string = 'value'
        if ( this.acItems.length > 1 )
            this.acItems.sort(( a: Object, b: Object ) => {
                if ( !isNaN( a[key] ) && !isNaN( b[key] ) ) {
                    if ( parseInt( a[key] ) == parseInt( b[key] ) )
                        return 0
                    else if ( parseInt( a[key] ) > parseInt( b[key] ) )
                        return 1
                    else if ( parseInt( a[key] ) < parseInt( b[key] ) )
                        return -1
                } else if ( typeof a[key] == 'string' && typeof b[key] == 'string' ) {
                    if ( a[key].toString().toUpperCase() == b[key].toString().toUpperCase() )
                        return 0
                    else if ( a[key].toString().toUpperCase() > b[key].toString().toUpperCase() )
                        return 1
                    else if ( a[key].toString().toUpperCase() < b[key].toString().toUpperCase() )
                        return -1
                }
            })
    }

    private select( index ) {
        this.acItemSelectedChange.emit( this.filterItems[index] )
    }
}