/// <reference types="core-js" />
import { ElementRef, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import 'moment';
import './flags/de.png';
import './flags/es.png';
import './flags/fr.png';
import './flags/gb.png';
import './flags/it.png';
export declare class TranslateDirective implements AfterViewInit, OnChanges {
    private el;
    private translate;
    translateKey: string;
    model: string;
    translateValues: string;
    private origInnerHtml;
    constructor(el: ElementRef, translate: TranslateService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: Object): void;
    private setContent(key);
}
export declare class LangSelect {
    private translate;
    private changeDetectorRef;
    selectedLang: any;
    showDropdown: boolean;
    languages: {
        id: string;
        name: string;
        flagImg: string;
    }[];
    langChange(langKey: any, index: any): void;
    toggleDropdown(): void;
    constructor(translate: TranslateService, changeDetectorRef: ChangeDetectorRef);
}
