import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { CookieService } from 'angular2-cookie/core';

import { UtilService } from '@angular/modules/src/utils';
import { HttpClient } from '@angular/modules/src/http-client';
import { ModalDialogService } from '@angular/modules/src/dialogs';

import { ScommesseService } from '../../shared/service/scommesse.service';
import { ViewModalCtrl } from './modals/view/viewModal';
import { EditModalCtrl } from './modals/edit/editModal';
import { InsertModalCtrl } from './modals/insert/insertModal';

declare var $: any;

@Component( {
    selector: 'home',
    template: require( './home.html' ),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit {
    $this: Home = this
    private exception: Object

    filtered_result: Object[] = []
    filtered: Object[] = []
    scommesseList: Object[] = []

    isFirstPage: boolean
    isLastPage: boolean

    /* Sort, Filtering & Pagination */
    listChanged: boolean = false
    sortType: string = '';
    sortReverse: boolean = false;
    filterSearch: Object = {}
    currentPage: number = 1;

    constructor( private utilService: UtilService, private modalDialogService: ModalDialogService, private scommesseService: ScommesseService, private httpClient: HttpClient,
        private translateService: TranslateService, private changeDetectorRef: ChangeDetectorRef, private cookieService: CookieService ) {
        this.httpClient.exceptionPropagationEvent.subscribe( ex => {
            this.exception = ex
            changeDetectorRef.markForCheck()
        })
    }

    // Generic Funtions
    getItemData( index, callback ) {
        callback( this.filtered_result[index] )
    }

    sampleElenco( paginate?: boolean ) {
        var inputParam = {};
        var scommesse: any[] = []
        if ( this.cookieService.get( 'scommessePartiteTableData' ) )
            scommesse = JSON.parse( this.cookieService.get( 'scommessePartiteTableData' ) );
        this.scommesseList = this.filtered = scommesse;
        this.listChanged = true
        this.changeDetectorRef.markForCheck()
    }

    sampleRefresh() {
        this.filterSearch = {}
        this.sortType = '';
        this.sortReverse = false;
        this.currentPage = 1;
        this.isFirstPage = true;
        this.isLastPage = false;
        this.sampleElenco();
    }

    viewItem( index, event?) {
        if ( event )
            $( event.target ).blur();
        var $this = this
        this.getItemData( index, function( item ) {
            $this.modalDialogService.dialog( {
                controller: ViewModalCtrl,
                locals: {
                    'item': item
                }
            }).subscribe(( response ) => {
                if ( response )
                    if ( response.action == 'edit' )
                        $this.editItem( index );
            })
        });
    }

    editItem( index ) {
        var $this = this
        this.getItemData( index, function( item ) {
            $this.modalDialogService.dialog( {
                controller: EditModalCtrl,
                locals: {
                    'item': item
                }
            }).subscribe(( editItem ) => {
                if ( editItem ) {
                    // TEST
                    $this.scommesseList[index] = editItem
                    $this.listChanged = true
                    $this.changeDetectorRef.markForCheck()
                }
            })
        });
    }

    addItem() {
        this.modalDialogService.dialog( {
            controller: InsertModalCtrl
        }).subscribe(( newItem ) => {
            if ( newItem ) {
                var itemList: any = {}
                itemList.id = newItem.id;
                itemList.competition_id = newItem.competition.des;
                itemList.match_id = newItem.match.des;
                itemList.home = newItem.match.value.split( ' - ' )[0];
                itemList.away = newItem.match.value.split( ' - ' )[1];
                itemList.bet.id = newItem.scommessa.des;
                itemList.bet.text = newItem.scommessa.value;
                // TEST
                this.scommesseList.unshift( itemList )
                this.cookieService.put( 'scommessePartiteTableData', JSON.stringify( this.scommesseList ) );
                this.listChanged = true
                this.changeDetectorRef.markForCheck()
            }
        })
    }

    getAbilOperations(): Object[] {
        var menuOptions: Object[] = []

        var optionView = {
            icon: 'icon icon-view',
            text: '',
            clickEvent: new EventEmitter<number>(),
            isActive: true
        }
        this.translateService.get( 'BUTTON_TEXT.VIEW_TITLE' ).subscribe( value => {
            optionView.text = value;
        })
        optionView.clickEvent.subscribe( index => {
            this.viewItem( index );
        })
        menuOptions.push( optionView );

        var optionEdit = {
            icon: 'icon icon-edit',
            text: '',
            clickEvent: new EventEmitter<number>(),
            isActive: true
        }
        this.translateService.get( 'BUTTON_TEXT.EDIT_TITLE' ).subscribe( value => {
            optionEdit.text = value;
        })
        optionEdit.clickEvent.subscribe( index => {
            this.editItem( index );
        })
        menuOptions.push( optionEdit );

        return menuOptions
    }

    refreshPartiteLive() {
        var matches = '';
        for ( var i = 0; i < this.scommesseList.length; i++ ) {
            var scommessa: any = this.scommesseList[i];
            if ( i > 0 )
                matches += ','
            matches += scommessa.match_id;
        }
        if ( matches != '' )
            this.httpClient.get( 'http://www.goal.com/feed/matches/scores?matchId=' + matches + '&edition=it&format=guest' ).subscribe(( liveData: any ) => {
                console.log( liveData )
                // scommessa['time'] = liveData.time;
                // scommessa['result'] = liveData.result;
            })
    }

    ngOnInit() {
        this.sampleRefresh()
        window.setInterval(() => {
            this.refreshPartiteLive();
        }, 5000 )
    }
}