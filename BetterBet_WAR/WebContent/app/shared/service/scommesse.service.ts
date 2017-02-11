import { Injectable } from '@angular/core';

import { UtilService } from '@angular/modules/src/utils';

declare var $: any;

@Injectable()
export class ScommesseService {
    constructor( private utilService: UtilService ) { }

    public competitions: Object[] = null
    public matches: Object[] = null

    public competitionsMap: Object[] = null
    public matchesMap: Object[] = null

    public scommesseList: Object[] = this.arrayToMap( ["1", "X", "2"] )
    public scommesseListFilter: Object[] = null

    public setFilterList( arraySampleElenco ) {
        var scommesseArray = []

        for ( var i = 0; i < arraySampleElenco.length; i++ ) {
            if ( arraySampleElenco[i].scommesse )
                if ( !this.utilService.alreadyExists( arraySampleElenco[i].scommesse, scommesseArray ) )
                    scommesseArray.push( {
                        value: arraySampleElenco[i].scommesse,
                        des: ''
                    })
        }
        this.scommesseListFilter = scommesseArray
    }

    public competitionsToMap( array ) {
        return array.map( function( item ) {
            return {
                value: item.title + " (" + item.country[0].displayName + ")",
                des: item.competition_id
            };
        });
    };

    public matchesToMap( array ) {
        return array.map( function( item ) {
            return {
                value: item.team_A_title + ' - ' + item.team_B_title,
                des: item.match_id
            };
        });
    };

    public getCompetition( competition_id ) {
        for ( var i = 0; i < this.competitionsMap.length; i++ ) {
            if ( this.competitionsMap[i]['des'] == competition_id )
                return this.competitionsMap[i]
        }
    }

    public getMatch( match_id ) {
        for ( var i = 0; i < this.matchesMap.length; i++ ) {
            if ( this.matchesMap[i]['des'] == match_id )
                return this.matchesMap[i]
        }
    }

    // Array -> Map conversion (value, des)
    public arrayToMap( array ) {
        return array.map( function( item ) {
            return {
                value: typeof item == 'string' ? item : item.value,
                des: typeof item == 'string' ? '' : item.des
            };
        });
    };
}