import { Injectable } from '@angular/core';

import { UtilService } from '@angular/modules/src/utils';

declare var $: any;

@Injectable()
export class SampleService {
    constructor(private utilService: UtilService) { }

    public genderList: Object[] = this.arrayToMap(["Male", "Female"])
    public genderListFilter: Object[] = null

    public setFilterList(arraySampleElenco) {
        var genderArray = []

        for (var i = 0; i < arraySampleElenco.length; i++) {
            if (arraySampleElenco[i].gender)
                if (!this.utilService.alreadyExists(arraySampleElenco[i].gender, genderArray))
                    genderArray.push({
                        value: arraySampleElenco[i].gender,
                        des: ''
                    })
        }
        this.genderListFilter = genderArray
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