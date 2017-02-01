import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

declare var $: any;

@Injectable()
export class UtilService {
    constructor(protected pageTitle: Title, protected router: Router) { }

    public APP_TITLE: string
    public menu = []
    public abi: string = null

    public finalActionOperations = 'CE';

    // CodeMirror: Config
    public codeMirrorOptions = {
        lineNumbers: true,
        lineWrapping: true,
        indentWithTabs: true,
        indentUnit: 4,
        mode: 'xml'
    };

    public codeMirrorOptionsView = {
        lineNumbers: false,
        lineWrapping: true,
        indentWithTabs: true,
        indentUnit: 4,
        readOnly: 'nocursor',
        mode: 'xml'
    };

    // Item per Page: Config
    public numPerPage = {
        selected: {
            id: 20,
            name: '20'
        },
        options: [{
            id: 10,
            name: '10'
        }, {
                id: 15,
                name: '15'
            }, {
                id: 20,
                name: '20'
            }, {
                id: 25,
                name: '25'
            }, {
                id: 999999,
                name: 'Tutti'
            }]
    };

    public setNumPerPage(numPerPage) {
        if (this.numPerPage.selected.id != numPerPage.id)
            this.numPerPage.selected = numPerPage;
    };
    public resetNumPerPage() {
        this.numPerPage.selected = {
            id: 20,
            name: '20'
        };
    };

    // Filter & Refresh: Controller
    public refreshShow(isPaginating, filterObj) {
        if (isPaginating == false && Object.keys(filterObj).length == 0)
            return true;
        return false;
    };

    public advancedFilterIsActive(filterObj) {
        if (Object.keys(filterObj).length > 0)
            return true;
        return false;
    };

    // Main Menu
    public setMenu(menuList) {
        this.menu = menuList;
        this.setPageTitle();
    }

    public setPageTitle() {
        var noActive = true;
        for (var i = 0; i < this.menu.length; i++)
            if (this.router.isActive('/' + this.menu[i].id.toLowerCase(), true)) {
                noActive = false;
                this.pageTitle.setTitle(this.menu[i].name)
                break;
            }
        if (noActive)
            this.pageTitle.setTitle(this.APP_TITLE)
    }

    // Sort: ngClass
    public sortClass(sortReverse) {
        var classBase = 'glyphicon glyphicon-triangle-top';
        if (!sortReverse)
            classBase = 'glyphicon glyphicon-triangle-bottom';
        return classBase;
    };

    // Util Functions
    public alreadyExists(value, array) {
        for (var i = array.length - 1; i >= 0; i--)
            if (array[i].value == value)
                return true;
        return false;
    };

    public compareObject(origObj, filterObj) {
        if (filterObj.hasOwnProperty('value')) {
            // if: lvl -> foglia
            if (String(filterObj['value']).indexOf(',') == -1) {
                if (String(origObj['value']).toLowerCase().indexOf(String(filterObj['value']).toLowerCase()) > -1)
                    return true;
            } else {
                var searchQuery: string[] = String(filterObj['value']).split(',');
                for (var i = 0; i < searchQuery.length; i++)
                    if (String(origObj['value']).toLowerCase().indexOf(searchQuery[i].toLowerCase().trim()) == -1)
                        return false;
                return true;
            }
            return false;
        } else if (typeof filterObj == 'string') {
            // if: lvl -> foglia
            if (filterObj.indexOf(',') == -1) {
                if (String(origObj).toLowerCase().indexOf(filterObj.toLowerCase()) > -1)
                    return true;
            } else {
                var searchQuery: string[] = filterObj.split(',');
                for (var i = 0; i < searchQuery.length; i++)
                    if (String(origObj).toLowerCase().indexOf(searchQuery[i].toLowerCase().trim()) == -1)
                        return false;
                return true;
            }
            return false;
        } else {
            // else: lvl -> nodo
            for (var prop in filterObj)
                if (origObj[prop] == null)
                    return false;
                else if (!this.compareObject(origObj[prop], filterObj[prop]))
                    return false;
            return true;
        }
    }
}