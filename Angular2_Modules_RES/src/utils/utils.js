"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var UtilService = (function () {
    function UtilService(pageTitle, router) {
        this.pageTitle = pageTitle;
        this.router = router;
        this.menu = [];
        this.abi = null;
        this.finalActionOperations = 'CE';
        // CodeMirror: Config
        this.codeMirrorOptions = {
            lineNumbers: true,
            lineWrapping: true,
            indentWithTabs: true,
            indentUnit: 4,
            mode: 'xml'
        };
        this.codeMirrorOptionsView = {
            lineNumbers: false,
            lineWrapping: true,
            indentWithTabs: true,
            indentUnit: 4,
            readOnly: 'nocursor',
            mode: 'xml'
        };
        // Item per Page: Config
        this.numPerPage = {
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
    }
    UtilService.prototype.setNumPerPage = function (numPerPage) {
        if (this.numPerPage.selected.id != numPerPage.id)
            this.numPerPage.selected = numPerPage;
    };
    ;
    UtilService.prototype.resetNumPerPage = function () {
        this.numPerPage.selected = {
            id: 20,
            name: '20'
        };
    };
    ;
    // Filter & Refresh: Controller
    UtilService.prototype.refreshShow = function (isPaginating, filterObj) {
        if (isPaginating == false && Object.keys(filterObj).length == 0)
            return true;
        return false;
    };
    ;
    UtilService.prototype.advancedFilterIsActive = function (filterObj) {
        if (Object.keys(filterObj).length > 0)
            return true;
        return false;
    };
    ;
    // Main Menu
    UtilService.prototype.setMenu = function (menuList) {
        this.menu = menuList;
        this.setPageTitle();
    };
    UtilService.prototype.setPageTitle = function () {
        var noActive = true;
        for (var i = 0; i < this.menu.length; i++)
            if (this.router.isActive('/' + this.menu[i].id.toLowerCase(), true)) {
                noActive = false;
                this.pageTitle.setTitle(this.menu[i].name);
                break;
            }
        if (noActive)
            this.pageTitle.setTitle(this.APP_TITLE);
    };
    // Sort: ngClass
    UtilService.prototype.sortClass = function (sortReverse) {
        var classBase = 'glyphicon glyphicon-triangle-top';
        if (!sortReverse)
            classBase = 'glyphicon glyphicon-triangle-bottom';
        return classBase;
    };
    ;
    // Util Functions
    UtilService.prototype.alreadyExists = function (value, array) {
        for (var i = array.length - 1; i >= 0; i--)
            if (array[i].value == value)
                return true;
        return false;
    };
    ;
    UtilService.prototype.compareObject = function (origObj, filterObj) {
        if (filterObj.hasOwnProperty('value')) {
            // if: lvl -> foglia
            if (String(filterObj['value']).indexOf(',') == -1) {
                if (String(origObj['value']).toLowerCase().indexOf(String(filterObj['value']).toLowerCase()) > -1)
                    return true;
            }
            else {
                var searchQuery = String(filterObj['value']).split(',');
                for (var i = 0; i < searchQuery.length; i++)
                    if (String(origObj['value']).toLowerCase().indexOf(searchQuery[i].toLowerCase().trim()) == -1)
                        return false;
                return true;
            }
            return false;
        }
        else if (typeof filterObj == 'string') {
            // if: lvl -> foglia
            if (filterObj.indexOf(',') == -1) {
                if (String(origObj).toLowerCase().indexOf(filterObj.toLowerCase()) > -1)
                    return true;
            }
            else {
                var searchQuery = filterObj.split(',');
                for (var i = 0; i < searchQuery.length; i++)
                    if (String(origObj).toLowerCase().indexOf(searchQuery[i].toLowerCase().trim()) == -1)
                        return false;
                return true;
            }
            return false;
        }
        else {
            // else: lvl -> nodo
            for (var prop in filterObj)
                if (origObj[prop] == null)
                    return false;
                else if (!this.compareObject(origObj[prop], filterObj[prop]))
                    return false;
            return true;
        }
    };
    UtilService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [platform_browser_1.Title, router_1.Router])
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
//# sourceMappingURL=utils.js.map