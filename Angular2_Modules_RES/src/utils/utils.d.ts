import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
export declare class UtilService {
    protected pageTitle: Title;
    protected router: Router;
    constructor(pageTitle: Title, router: Router);
    APP_TITLE: string;
    menu: any[];
    abi: string;
    finalActionOperations: string;
    codeMirrorOptions: {
        lineNumbers: boolean;
        lineWrapping: boolean;
        indentWithTabs: boolean;
        indentUnit: number;
        mode: string;
    };
    codeMirrorOptionsView: {
        lineNumbers: boolean;
        lineWrapping: boolean;
        indentWithTabs: boolean;
        indentUnit: number;
        readOnly: string;
        mode: string;
    };
    numPerPage: {
        selected: {
            id: number;
            name: string;
        };
        options: {
            id: number;
            name: string;
        }[];
    };
    setNumPerPage(numPerPage: any): void;
    resetNumPerPage(): void;
    refreshShow(isPaginating: any, filterObj: any): boolean;
    advancedFilterIsActive(filterObj: any): boolean;
    setMenu(menuList: any): void;
    setPageTitle(): void;
    sortClass(sortReverse: any): string;
    alreadyExists(value: any, array: any): boolean;
    compareObject(origObj: any, filterObj: any): boolean;
}
