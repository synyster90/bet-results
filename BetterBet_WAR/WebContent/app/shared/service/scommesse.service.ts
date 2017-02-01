import { Injectable } from '@angular/core';

import { UtilService } from '@angular/modules/src/utils';

declare var $: any;

@Injectable()
export class ScommesseService {
    constructor(private utilService: UtilService) { }

    public scommesseList: Object[] = this.arrayToMap(["1", "X", "2"])
    public scommesseListFilter: Object[] = null

    public setFilterList(arraySampleElenco) {
        var scommesseArray = []

        for (var i = 0; i < arraySampleElenco.length; i++) {
            if (arraySampleElenco[i].scommesse)
                if (!this.utilService.alreadyExists(arraySampleElenco[i].scommesse, scommesseArray))
                    scommesseArray.push({
                        value: arraySampleElenco[i].scommesse,
                        des: ''
                    })
        }
        this.scommesseListFilter = scommesseArray
    }

    // Array -> Map conversion (value, des)
    public arrayToMap(array) {
        return array.map(function(item) {
            return {
                value: typeof item == 'string' ? item : item.value,
                des: typeof item == 'string' ? '' : item.des
            };
        });
    };
}