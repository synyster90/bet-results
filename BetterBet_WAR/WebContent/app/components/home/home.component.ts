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
                    else if ( response.action == 'delete' )
                        $this.deleteItem( index );
            })
        });
    }

    editItem( index ) {
        var $this = this
        $this.modalDialogService.dialog( {
            controller: EditModalCtrl,
            locals: {
                'item': this.filtered_result[index]
            }
        }).subscribe(( editItem ) => {
            if ( editItem ) {
                $this.scommesseList[index]['competition_id'] = editItem.competition.des
                $this.scommesseList[index]['match_id'] = editItem.match.des
                $this.scommesseList[index]['home'] = editItem.match.value.split( ' - ' )[0]
                $this.scommesseList[index]['away'] = editItem.match.value.split( ' - ' )[1]
                $this.scommesseList[index]['bet'] = {
                    id: editItem.scommessa.des,
                    text: editItem.scommessa.value
                }
                this.cookieService.put( 'scommessePartiteTableData', JSON.stringify( this.scommesseList ) );
                $this.listChanged = true
                $this.changeDetectorRef.markForCheck()
            }
        })
    }

    addItem() {
        this.modalDialogService.dialog( {
            controller: InsertModalCtrl
        }).subscribe(( newItem ) => {
            if ( newItem ) {
                this.scommesseList.unshift( {
                    id: newItem.id,
                    competition_id: newItem.competition.des,
                    match_id: newItem.match.des,
                    home: newItem.match.value.split( ' - ' )[0],
                    away: newItem.match.value.split( ' - ' )[1],
                    bet: {
                        id: newItem.scommessa.des,
                        text: newItem.scommessa.value
                    }
                })
                this.cookieService.put( 'scommessePartiteTableData', JSON.stringify( this.scommesseList ) );
                this.listChanged = true
                this.changeDetectorRef.markForCheck()
            }
        })
    }

    deleteItem( index ) {
        this.modalDialogService.confirm( '<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_DELETE"></div>', function( result ) {
            if ( result == true )
                this.scommesseList.splice( index, 1 );
        });
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

        var optionDelete = {
            icon: 'icon icon-delete',
            text: '',
            clickEvent: new EventEmitter<number>(),
            isActive: true
        }
        this.translateService.get( 'BUTTON_TEXT.DELETE_TITLE' ).subscribe( value => {
            optionDelete.text = value;
        })
        optionDelete.clickEvent.subscribe( index => {
            this.deleteItem( index );
        })
        menuOptions.push( optionDelete );

        return menuOptions
    }

    refreshPartiteLive( timer?) {
        var matches = '';
        for ( var i = 0; i < this.scommesseList.length; i++ ) {
            var scommessa: any = this.scommesseList[i];
            if ( scommessa.time != 'FIN' ) {
                if ( i > 0 && matches != '' )
                    matches += ','
                matches += scommessa.match_id;
            }
        }
        if ( matches != '' )
            this.httpClient.post( 'rest/live', {
                matches: matches
            }, true ).subscribe(( liveData: any ) => {
                if ( liveData && liveData.matches && liveData.matches.length > 0 ) {
                    for ( var i = 0; i < this.scommesseList.length; i++ )
                        for ( var j = 0; j < liveData.matches.length; j++ )
                            if ( liveData.matches[j].id == scommessa.match_id ) {
                                if ( liveData.matches[j].status == 'fixture' )
                                    this.scommesseList[i]['time'] = liveData.matches[j].mobile.state;
                                else
                                    this.scommesseList[i]['time'] = liveData.matches[j].period;

                                if ( liveData.matches[j].has_score )
                                    this.scommesseList[i]['result'] = liveData.matches[j].score.home + ' - ' + liveData.matches[j].score.away;
                                break;
                            }
                    this.changeDetectorRef.markForCheck()
                }
            }, err => {
                if ( timer )
                    clearInterval( timer );
            })
    }

    ngOnInit() {
        this.sampleRefresh()
        var timer = window.setInterval(() => {
            this.refreshPartiteLive( timer );
        }, 5000 )
    }
}