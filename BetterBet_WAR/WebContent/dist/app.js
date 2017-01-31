/*! CSE Web Application */
webpackJsonp([1],{

/***/ 1256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var platform_browser_dynamic_1 = __webpack_require__(224);
var core_1 = __webpack_require__(1);
var app_module_1 = __webpack_require__(646);
if (false) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(40);
var SampleService = (function () {
    function SampleService(utilService) {
        this.utilService = utilService;
        this.genderList = this.arrayToMap(["Male", "Female"]);
        this.genderListFilter = null;
    }
    SampleService.prototype.setFilterList = function (arraySampleElenco) {
        var genderArray = [];
        for (var i = 0; i < arraySampleElenco.length; i++) {
            if (arraySampleElenco[i].gender)
                if (!this.utilService.alreadyExists(arraySampleElenco[i].gender, genderArray))
                    genderArray.push({
                        value: arraySampleElenco[i].gender,
                        des: ''
                    });
        }
        this.genderListFilter = genderArray;
    };
    // Array -> Map conversion (value, des)
    SampleService.prototype.arrayToMap = function (array) {
        return array.map(function (item) {
            return {
                value: typeof item == 'string' ? item : item.value,
                des: typeof item == 'string' ? '' : item.des
            };
        });
    };
    ;
    SampleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object])
    ], SampleService);
    return SampleService;
    var _a;
}());
exports.SampleService = SampleService;


/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var ng2_translate_1 = __webpack_require__(103);
var utils_1 = __webpack_require__(40);
var http_client_1 = __webpack_require__(72);
var dialogs_1 = __webpack_require__(71);
var sample_service_1 = __webpack_require__(204);
var viewModal_1 = __webpack_require__(445);
var editModal_1 = __webpack_require__(443);
var insertModal_1 = __webpack_require__(444);
var Home = (function () {
    function Home(utilService, modalDialogService, sampleService, httpClient, translateService, changeDetectorRef) {
        var _this = this;
        this.utilService = utilService;
        this.modalDialogService = modalDialogService;
        this.sampleService = sampleService;
        this.httpClient = httpClient;
        this.translateService = translateService;
        this.changeDetectorRef = changeDetectorRef;
        this.$this = this;
        this.filtered_result = [];
        this.filtered = [];
        this.scommesseList = [];
        /* Sort, Filtering & Pagination */
        this.listChanged = false;
        this.sortType = '';
        this.sortReverse = false;
        this.filterSearch = {};
        this.currentPage = 1;
        this.httpClient.exceptionPropagationEvent.subscribe(function (ex) {
            _this.exception = ex;
            changeDetectorRef.markForCheck();
        });
    }
    // Generic Funtions
    Home.prototype.getItemData = function (index, callback) {
        callback(this.filtered_result[index]);
    };
    Home.prototype.sampleElenco = function (paginate) {
        var inputParam = {};
        this.scommesseList = this.filtered = [];
        this.listChanged = true;
        this.changeDetectorRef.markForCheck();
    };
    Home.prototype.sampleRefresh = function () {
        this.filterSearch = {};
        this.sortType = '';
        this.sortReverse = false;
        this.currentPage = 1;
        this.isFirstPage = true;
        this.isLastPage = false;
        this.sampleElenco();
    };
    Home.prototype.viewItem = function (index, event) {
        if (event)
            $(event.target).blur();
        var $this = this;
        this.getItemData(index, function (item) {
            $this.modalDialogService.dialog({
                controller: viewModal_1.ViewModalCtrl,
                locals: {
                    'item': item
                }
            }).subscribe(function (response) {
                if (response)
                    if (response.action == 'edit')
                        $this.editItem(index);
            });
        });
    };
    Home.prototype.editItem = function (index) {
        var $this = this;
        this.getItemData(index, function (item) {
            $this.modalDialogService.dialog({
                controller: editModal_1.EditModalCtrl,
                locals: {
                    'item': item
                }
            }).subscribe(function (editItem) {
                if (editItem) {
                    // TEST
                    $this.scommesseList[index] = editItem;
                    $this.listChanged = true;
                    $this.changeDetectorRef.markForCheck();
                }
            });
        });
    };
    Home.prototype.addItem = function () {
        var _this = this;
        this.modalDialogService.dialog({
            controller: insertModal_1.InsertModalCtrl
        }).subscribe(function (newItem) {
            if (newItem) {
                // TEST
                _this.scommesseList.unshift(newItem);
                _this.listChanged = true;
                _this.changeDetectorRef.markForCheck();
            }
        });
    };
    Home.prototype.getAbilOperations = function () {
        var _this = this;
        var menuOptions = [];
        var optionView = {
            icon: 'icon icon-view',
            text: '',
            clickEvent: new core_1.EventEmitter(),
            isActive: true
        };
        this.translateService.get('BUTTON_TEXT.VIEW_TITLE').subscribe(function (value) {
            optionView.text = value;
        });
        optionView.clickEvent.subscribe(function (index) {
            _this.viewItem(index);
        });
        menuOptions.push(optionView);
        var optionEdit = {
            icon: 'icon icon-edit',
            text: '',
            clickEvent: new core_1.EventEmitter(),
            isActive: true
        };
        this.translateService.get('BUTTON_TEXT.EDIT_TITLE').subscribe(function (value) {
            optionEdit.text = value;
        });
        optionEdit.clickEvent.subscribe(function (index) {
            _this.editItem(index);
        });
        menuOptions.push(optionEdit);
        return menuOptions;
    };
    Home.prototype.ngOnInit = function () {
        this.sampleRefresh();
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: __webpack_require__(950),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _b) || Object, (typeof (_c = typeof sample_service_1.SampleService !== 'undefined' && sample_service_1.SampleService) === 'function' && _c) || Object, (typeof (_d = typeof http_client_1.HttpClient !== 'undefined' && http_client_1.HttpClient) === 'function' && _d) || Object, (typeof (_e = typeof ng2_translate_1.TranslateService !== 'undefined' && ng2_translate_1.TranslateService) === 'function' && _e) || Object, (typeof (_f = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _f) || Object])
    ], Home);
    return Home;
    var _a, _b, _c, _d, _e, _f;
}());
exports.Home = Home;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var dialogs_1 = __webpack_require__(71);
var utils_1 = __webpack_require__(40);
var sample_service_1 = __webpack_require__(204);
var http_client_1 = __webpack_require__(72);
var EditModalCtrl = (function () {
    function EditModalCtrl(utilService, sampleService, modalDialogService, httpClient) {
        this.utilService = utilService;
        this.sampleService = sampleService;
        this.modalDialogService = modalDialogService;
        this.httpClient = httpClient;
    }
    EditModalCtrl.prototype.ngOnInit = function () {
        this.editItem = JSON.parse(JSON.stringify(this.locals['item']));
    };
    EditModalCtrl.prototype.close = function () {
        if (this.checkClose()) {
            var $this = this;
            this.modalDialogService.confirm('<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_EDIT"></div>', function (result) {
                if (result == true)
                    $this.modalDialogService.cancel();
            });
        }
        else
            this.modalDialogService.cancel();
    };
    ;
    EditModalCtrl.prototype.checkClose = function () {
        if (this.editItem.first_name && this.editItem.first_name != this.locals['item'].first_name
            || this.editItem.last_name && this.editItem.last_name != this.locals['item'].last_name
            || this.editItem.email && this.editItem.email != this.locals['item'].email
            || this.editItem.gender && this.editItem.gender != this.locals['item'].gender
            || this.editItem.ip_address && this.editItem.ip_address != this.locals['item'].ip_address)
            return true;
        return false;
    };
    EditModalCtrl.prototype.save = function () {
        var changeNotify = this.checkEdit();
        var $this = this;
        if (changeNotify != '') {
            $this.modalDialogService.confirm('<div class="panel-body-custom">Riepilogo Modifiche<ul>' + changeNotify + '</ul></div><div class="confirm-message">'
                + '<div class="row"><div class="col-sm-12"><span translate="MODAL_TEXT.MESSAGE_EDIT_CONFIRM"></span></div></div></div>', function (result) {
                if (result == true)
                    $this.modalDialogService.hide($this.editItem);
            });
        }
    };
    EditModalCtrl.prototype.checkEdit = function () {
        var changeNotify = '';
        if (this.editItem.first_name && this.editItem.first_name != '') {
            if (this.editItem.first_name != this.locals['item'].first_name)
                changeNotify += '<li><strong>Nome</strong>: ' + this.locals['item'].first_name + ' --> ' + this.editItem.first_name + '</li>';
        }
        else
            changeNotify += '<li><strong>Nome</strong>: ' + this.locals['item'].first_name + ' --> null</li>';
        if (this.editItem.last_name && this.editItem.last_name != '') {
            if (this.editItem.last_name != this.locals['item'].last_name)
                changeNotify += '<li><strong>Cognome</strong>: ' + this.locals['item'].last_name + ' --> ' + this.editItem.last_name + '</li>';
        }
        else
            changeNotify += '<li><strong>Cognome</strong>: ' + this.locals['item'].last_name + ' --> null</li>';
        if (this.editItem.email && this.editItem.email != '') {
            if (this.editItem.email != this.locals['item'].email)
                changeNotify += '<li><strong>Email</strong>: ' + this.locals['item'].email + ' --> ' + this.editItem.email + '</li>';
        }
        else
            changeNotify += '<li><strong>Email</strong>: ' + this.locals['item'].email + ' --> null</li>';
        if (this.editItem.gender && this.editItem.gender != '') {
            if (this.editItem.gender != this.locals['item'].gender)
                changeNotify += '<li><strong>Sesso</strong>: ' + this.locals['item'].gender + ' --> ' + this.editItem.gender + '</li>';
        }
        else
            changeNotify += '<li><strong>Sesso</strong>: ' + this.locals['item'].gender + ' --> null</li>';
        if (this.editItem.ip_address && this.editItem.ip_address != '') {
            if (this.editItem.ip_address != this.locals['item'].ip_address)
                changeNotify += '<li><strong>Indirizzo IP</strong>: ' + this.locals['item'].ip_address + ' --> ' + this.editItem.ip_address + '</li>';
        }
        else
            changeNotify += '<li><strong>Indirizzo IP</strong>: ' + this.locals['item'].ip_address + ' --> null</li>';
        return changeNotify;
    };
    EditModalCtrl = __decorate([
        core_1.Component({
            selector: 'modal-content',
            template: __webpack_require__(951)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof sample_service_1.SampleService !== 'undefined' && sample_service_1.SampleService) === 'function' && _b) || Object, (typeof (_c = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _c) || Object, (typeof (_d = typeof http_client_1.HttpClient !== 'undefined' && http_client_1.HttpClient) === 'function' && _d) || Object])
    ], EditModalCtrl);
    return EditModalCtrl;
    var _a, _b, _c, _d;
}());
exports.EditModalCtrl = EditModalCtrl;


/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var dialogs_1 = __webpack_require__(71);
var utils_1 = __webpack_require__(40);
var sample_service_1 = __webpack_require__(204);
var http_client_1 = __webpack_require__(72);
var InsertModalCtrl = (function () {
    function InsertModalCtrl(utilService, sampleService, modalDialogService, httpClient) {
        this.utilService = utilService;
        this.sampleService = sampleService;
        this.modalDialogService = modalDialogService;
        this.httpClient = httpClient;
    }
    InsertModalCtrl.prototype.ngOnInit = function () {
        this.insertItem = { "id": "", "first_name": "", "last_name": "", "email": "", "gender": "", "ip_address": "" };
    };
    InsertModalCtrl.prototype.close = function () {
        var $this = this;
        this.modalDialogService.confirm('<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_EDIT"></div>', function (result) {
            if (result == true)
                $this.modalDialogService.cancel();
        });
    };
    ;
    InsertModalCtrl.prototype.save = function () {
        var $this = this;
        $this.modalDialogService.confirm('<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_INSERT_CONFIRM"></div>', function (result) {
            if (result == true)
                $this.modalDialogService.hide($this.insertItem);
        });
    };
    InsertModalCtrl = __decorate([
        core_1.Component({
            selector: 'modal-content',
            template: __webpack_require__(952)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof sample_service_1.SampleService !== 'undefined' && sample_service_1.SampleService) === 'function' && _b) || Object, (typeof (_c = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _c) || Object, (typeof (_d = typeof http_client_1.HttpClient !== 'undefined' && http_client_1.HttpClient) === 'function' && _d) || Object])
    ], InsertModalCtrl);
    return InsertModalCtrl;
    var _a, _b, _c, _d;
}());
exports.InsertModalCtrl = InsertModalCtrl;


/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var dialogs_1 = __webpack_require__(71);
var utils_1 = __webpack_require__(40);
var ViewModalCtrl = (function () {
    function ViewModalCtrl(utilService, modalDialogService) {
        this.utilService = utilService;
        this.modalDialogService = modalDialogService;
        this.showDropdown = false;
    }
    ViewModalCtrl.prototype.toggleDropdown = function () {
        var $this = this;
        if (this.showDropdown)
            setTimeout(function () {
                $this.showDropdown = !$this.showDropdown;
            }, 100);
        else
            this.showDropdown = !this.showDropdown;
    };
    ViewModalCtrl.prototype.ngOnInit = function () {
        this.itemInfo = this.locals['item'];
    };
    ViewModalCtrl.prototype.close = function () {
        this.modalDialogService.cancel();
    };
    ;
    ViewModalCtrl.prototype.editItemPopup = function () {
        this.modalDialogService.hide({
            'action': 'edit'
        });
    };
    ViewModalCtrl = __decorate([
        core_1.Component({
            selector: 'modal-content',
            template: __webpack_require__(953)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _b) || Object])
    ], ViewModalCtrl);
    return ViewModalCtrl;
    var _a, _b;
}());
exports.ViewModalCtrl = ViewModalCtrl;
;


/***/ }),

/***/ 646:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var platform_browser_1 = __webpack_require__(34);
var forms_1 = __webpack_require__(112);
var http_1 = __webpack_require__(130);
var ng2_translate_1 = __webpack_require__(103);
/* Directives, Components & Providers */
var platform_browser_2 = __webpack_require__(34);
var components_1 = __webpack_require__(106);
var dialogs_1 = __webpack_require__(71);
var http_client_1 = __webpack_require__(72);
var pipes_1 = __webpack_require__(166);
var translate_1 = __webpack_require__(107);
var utils_1 = __webpack_require__(40);
var app_component_1 = __webpack_require__(774);
var app_routes_1 = __webpack_require__(775);
var shared_module_1 = __webpack_require__(777);
var home_component_1 = __webpack_require__(442);
var viewModal_1 = __webpack_require__(445);
var editModal_1 = __webpack_require__(443);
var insertModal_1 = __webpack_require__(444);
function createTranslateLoader(http) {
    return new ng2_translate_1.TranslateStaticLoader(http, './dist/assets/i18n', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [http_1.Http]
                }),
                app_routes_1.routing,
                components_1.AngularComponentsModule.forRoot(), dialogs_1.AngularDialogsModule.forRoot(), http_client_1.AngularHttpClientModule.forRoot(), pipes_1.AngularPipesModule, translate_1.AngularTranslateModule, utils_1.AngularUtilsModule.forRoot(),
                shared_module_1.SharedModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent, home_component_1.Home, viewModal_1.ViewModalCtrl, editModal_1.EditModalCtrl, insertModal_1.InsertModalCtrl
            ],
            entryComponents: [
                viewModal_1.ViewModalCtrl, editModal_1.EditModalCtrl, insertModal_1.InsertModalCtrl
            ],
            providers: [
                app_routes_1.appRoutingProviders,
                platform_browser_2.Title
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(167);
var common_1 = __webpack_require__(89);
var ng2_translate_1 = __webpack_require__(103);
var components_1 = __webpack_require__(106);
var utils_1 = __webpack_require__(40);
var http_client_1 = __webpack_require__(72);
var AppComponent = (function () {
    function AppComponent(router, httpClient, location, utilService, sideMenuService, changeDetectorRef, viewContainerRef, translate) {
        this.router = router;
        this.httpClient = httpClient;
        this.location = location;
        this.utilService = utilService;
        this.sideMenuService = sideMenuService;
        this.changeDetectorRef = changeDetectorRef;
        this.viewContainerRef = viewContainerRef;
        /* App Settings */
        utilService.APP_TITLE = 'Bet Results';
        translate.setDefaultLang('en');
        translate.use('it');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Verify: WebApp in sicurezza
        this.httpClient.srValidation(function (srData) {
            _this.utilService.abi = srData.abi;
            _this.httpClient.get('jsonService/menu?m=menu').subscribe(function (data) {
                _this.utilService.setMenu(data.xxMenu);
                _this.changeDetectorRef.markForCheck();
            }, function (err) { });
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            template: __webpack_require__(954),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof http_client_1.HttpClient !== 'undefined' && http_client_1.HttpClient) === 'function' && _b) || Object, (typeof (_c = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _c) || Object, (typeof (_d = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _d) || Object, (typeof (_e = typeof components_1.SideMenuService !== 'undefined' && components_1.SideMenuService) === 'function' && _e) || Object, (typeof (_f = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _f) || Object, (typeof (_g = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _g) || Object, (typeof (_h = typeof ng2_translate_1.TranslateService !== 'undefined' && ng2_translate_1.TranslateService) === 'function' && _h) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ 775:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var router_1 = __webpack_require__(167);
var home_component_1 = __webpack_require__(442);
var appRoutes = [
    { path: '', component: home_component_1.Home },
    { path: '**', redirectTo: '/' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);


/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var dialogs_1 = __webpack_require__(71);
var utils_1 = __webpack_require__(40);
var FilterModalCtrl = (function () {
    function FilterModalCtrl(utilService, modalDialogService) {
        this.utilService = utilService;
        this.modalDialogService = modalDialogService;
    }
    FilterModalCtrl.prototype.ngOnInit = function () {
        this.filtersArray = this.locals['filtersArray'];
    };
    FilterModalCtrl.prototype.close = function () {
        this.modalDialogService.cancel();
    };
    ;
    FilterModalCtrl.prototype.confirm = function () {
        this.modalDialogService.hide(this.filtersArray);
    };
    ;
    FilterModalCtrl = __decorate([
        core_1.Component({
            selector: 'modal-content',
            template: __webpack_require__(955)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _b) || Object])
    ], FilterModalCtrl);
    return FilterModalCtrl;
    var _a, _b;
}());
exports.FilterModalCtrl = FilterModalCtrl;
;


/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(1);
var platform_browser_1 = __webpack_require__(34);
var forms_1 = __webpack_require__(112);
var http_1 = __webpack_require__(130);
var ng2_translate_1 = __webpack_require__(103);
var components_1 = __webpack_require__(106);
var dialogs_1 = __webpack_require__(71);
var http_client_1 = __webpack_require__(72);
var pipes_1 = __webpack_require__(166);
var translate_1 = __webpack_require__(107);
var utils_1 = __webpack_require__(40);
var filterModal_1 = __webpack_require__(776);
var sample_service_1 = __webpack_require__(204);
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [sample_service_1.SampleService]
        };
    };
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_translate_1.TranslateModule,
                components_1.AngularComponentsModule, dialogs_1.AngularDialogsModule, http_client_1.AngularHttpClientModule, pipes_1.AngularPipesModule, translate_1.AngularTranslateModule, utils_1.AngularUtilsModule,
            ],
            declarations: [
                filterModal_1.FilterModalCtrl
            ],
            exports: [
                filterModal_1.FilterModalCtrl
            ],
            providers: [
                sample_service_1.SampleService
            ],
            entryComponents: [
                filterModal_1.FilterModalCtrl
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;


/***/ }),

/***/ 950:
/***/ (function(module, exports) {

module.exports = "<div class=\"row row-header\">\r\n\t<div class=\"col-sm-3 col-page-title\"><page-header></page-header></div>\r\n\t<div class=\"col-sm-9 col-table-actions\">\r\n\t\t<div class=\"item-action-group btn-group btn-group-sm\" role=\"group\" aria-label=\"...\">\r\n\t\t\t<button type=\"button\" class=\"btn btn-default\" (click)=\"addItem($event)\" [disabled]=\"insertDisabled\">\r\n\t\t\t\t<span class=\"icon icon-add\" aria-hidden=\"true\"></span> <span translate=\"BUTTON_TEXT.INSERT\"></span>\r\n\t\t\t</button>\r\n\t\t\t<button type=\"button\" class=\"btn btn-default\" (click)=\"sampleRefresh()\">\r\n\t\t\t\t<span class=\"icon icon-refresh\" aria-hidden=\"true\"></span> <span translate=\"BUTTON_TEXT.RELOAD\"></span>\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<ui-exception [(exception)]=\"exception\" exception-removable=\"true\" exception-hidden=\"true\"></ui-exception>\r\n<div class=\"table-container\">\r\n\t<table class=\"table table-bordered table-striped\">\r\n\t\t<thead>\r\n\t\t\t<tr>\r\n\t\t\t\t<th class=\"col-id col-sort\"><table-head hd-name=\"home\" [(hdcurrentpage)]=\"currentPage\" hd-type=\"home\" [(hdsorttype)]=\"sortType\" \r\n\t\t\t\t\t[(hdsortreverse)]=\"sortReverse\" hd-filter-title=\"Filtra per Squadra Casa\" [(hdfiltersearch)]=\"filterSearch\"></table-head></th>\r\n\t\t\t\t<th class=\"col-first-name col-sort\"><table-head hd-name=\"result\"></table-head></th>\r\n\t\t\t\t<th class=\"col-last-name col-sort\"><table-head hd-name=\"away\" [(hdcurrentpage)]=\"currentPage\" hd-type=\"away\" [(hdsorttype)]=\"sortType\" \r\n\t\t\t\t\t[(hdsortreverse)]=\"sortReverse\"\thd-filter-title=\"Filtra per Squadra Ospite\" [(hdfiltersearch)]=\"filterSearch\"></table-head></th>\r\n\t\t\t\t<th class=\"col-email col-sort\"><table-head hd-name=\"time\"></table-head></th>\r\n\t\t\t\t<th class=\"col-gender col-sort\"><table-head hd-name=\"bet\"></table-head></th>\r\n\t\t\t</tr>\r\n\t\t</thead>\r\n\t\t<tbody>\r\n\t\t\t<tr *ngFor=\"let item of scommesseList | filterSearch:$this | orderBy:sortType:sortReverse | filterPaginate:$this; let $index = index; let $last = last\" \r\n\t\t\t\tpipe-cicle [pc-last]=\"$last\" (pc-finish)=\"sampleService.setFilterList(filtered)\"\r\n\t\t\t\tcontext-menu [cm-model]=\"getAbilOperations()\" [cm-index]=\"$index\" (click)=\"viewItem($index, $event)\">\r\n\t\t\t\t<td>{{item.home}}</td>\r\n\t\t\t\t<td>{{item.result}}</td>\r\n\t\t\t\t<td>{{item.away}}</td>\r\n\t\t\t\t<td>{{item.time}}</td>\r\n\t\t\t\t<td>{{item.bet}}</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr *ngIf=\"scommesseList.length == 0 || filtered_result.length == 0\">\r\n\t\t\t\t<td colspan=\"6\" class=\"col-no-items\" translate=\"LABEL_TEXT.NO_RESULT\"></td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t\t<tfoot>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"6\" class=\"col-pagination\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<div class=\"col-sm-3 col-num-per-page\">\r\n\t\t\t\t\t\t\t<ui-select [select-model]=\"utilService.numPerPage.selected\" [select-options]=\"utilService.numPerPage.options\" \r\n\t\t\t\t\t\t\t\t(select-change)=\"utilService.setNumPerPage($event)\" [select-n-items]=\"filtered.length\">\r\n\t\t\t\t\t\t\t</ui-select>\r\n\t\t\t\t\t\t\t<span translate=\"LABEL_TEXT.ITEM_PER_PAGE\"></span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-sm-9 col-standard-pagination\">\r\n\t\t\t\t\t\t\t<table-pagination [total-items]=\"filtered.length\" [(currentpage)]=\"currentPage\" [items-per-page]=\"utilService.numPerPage.selected.id\"\t\r\n\t\t\t\t\t\t\t\tmax-size=\"5\" class=\"table-pagination\"></table-pagination>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</tfoot>\r\n\t</table>\r\n</div>";

/***/ }),

/***/ 951:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n\t<button type=\"button\" class=\"close\" (click)=\"close()\"><span>x</span></button>\r\n\t<h3 class=\"modal-title panel-view-title\" translate=\"MODAL_TEXT.TITLE_EDIT\" translate-values='{\"title\":\"Dati\"}'></h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n\t<form name=\"editForm\" novalidate>\r\n\t\t<div class=\"panel panel-default panel-edit\">\r\n\t\t\t<ui-exception [exception]=\"httpClient.exception\" exception-hidden=\"true\"></ui-exception>\r\n\t\t\t<div class=\"panel-body panel-body-custom\">\r\n\t\t\t\t<div class=\"row row-form-grid\">\r\n\t\t\t\t\t<div class=\"col-md-12 col-section\">\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">\r\n\t\t\t\t\t\t\t\t<font color=\"#cc0000\">*</font>id\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"id\" [(ngModel)]=\"editItem.id\" class=\"form-input p-key-disabled\" disabled />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">nome</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"first_name\" [(ngModel)]=\"editItem.first_name\" class=\"form-input\" validate [model]=\"[editItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">cognome</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"last_name\" [(ngModel)]=\"editItem.last_name\" class=\"form-input\" validate [model]=\"[editItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">email</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"email\" [(ngModel)]=\"editItem.email\" class=\"form-input\" validate [model]=\"[editItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">sesso</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"sampleService.genderList\" [ac-item-selected]=\"{value: editItem.gender, des: ''}\"\r\n\t\t\t\t\t\t\t\t\t(ac-item-selected-change)=\"editItem.gender = $event ? $event.value : ''\"\r\n\t\t\t\t\t\t\t\t\tac-not-found=\"sesso errato!\" ac-select-on-match=\"true\" ac-input-name=\"gender\" class=\"form-input\"\r\n\t\t\t\t\t\t\t\t\tvalidate [model]=\"[editItem]\"></ui-autocomplete>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">indirizzo ip</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"ip_address\" [(ngModel)]=\"editItem.ip_address\" class=\"form-input\" validate [model]=\"[editItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</form>\r\n</div>\r\n<div class=\"modal-footer\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-sm-12\">\r\n\t\t\t<button class=\"btn btn-default\" type=\"button\" (click)=\"close()\"><span translate=\"MODAL_TEXT.BUTTON_CLOSE\"></span></button>\r\n\t\t\t<button class=\"btn btn-primary\" type=\"button\" (click)=\"save()\"><span translate=\"MODAL_TEXT.BUTTON_SAVE\"></span></button>\r\n\t\t</div>\r\n\t</div>\t\t\t\r\n</div>";

/***/ }),

/***/ 952:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n\t<button type=\"button\" class=\"close\" (click)=\"close()\"><span>x</span></button>\r\n\t<h3 class=\"modal-title panel-view-title\" translate=\"MODAL_TEXT.TITLE_INSERT\" translate-values='{\"title\":\"Dati\"}'></h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n\t<form name=\"insertForm\" novalidate>\r\n\t\t<div class=\"panel panel-default panel-edit\">\r\n\t\t\t<ui-exception [exception]=\"httpClient.exception\" exception-hidden=\"true\"></ui-exception>\r\n\t\t\t<div class=\"panel-body panel-body-custom\">\r\n\t\t\t\t<div class=\"row row-form-grid\">\r\n\t\t\t\t\t<div class=\"col-md-12 col-section\">\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">\r\n\t\t\t\t\t\t\t\t<font color=\"#cc0000\">*</font>id\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"id\" [(ngModel)]=\"insertItem.id\" class=\"form-input\"  validate [model]=\"[insertItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">nome</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"first_name\" [(ngModel)]=\"insertItem.first_name\" class=\"form-input\" validate [model]=\"[insertItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">cognome</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"last_name\" [(ngModel)]=\"insertItem.last_name\" class=\"form-input\" validate [model]=\"[insertItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">email</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"email\" [(ngModel)]=\"insertItem.email\" class=\"form-input\" validate [model]=\"[insertItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">sesso</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"sampleService.genderList\" [ac-item-selected]=\"{value: insertItem.gender, des: ''}\"\r\n\t\t\t\t\t\t\t\t\t(ac-item-selected-change)=\"insertItem.gender = $event ? $event.value : ''\"\r\n\t\t\t\t\t\t\t\t\tac-not-found=\"sesso errato!\" ac-select-on-match=\"true\" ac-input-name=\"gender\" class=\"form-input\"\r\n\t\t\t\t\t\t\t\t\tvalidate [model]=\"[insertItem]\"></ui-autocomplete>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">indirizzo ip</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<input name=\"ip_address\" [(ngModel)]=\"insertItem.ip_address\" class=\"form-input\" validate [model]=\"[insertItem]\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</form>\r\n</div>\r\n<div class=\"modal-footer\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-sm-12\">\r\n\t\t\t<button class=\"btn btn-default\" type=\"button\" (click)=\"close()\"><span translate=\"MODAL_TEXT.BUTTON_CLOSE\"></span></button>\r\n\t\t\t<button class=\"btn btn-primary\" type=\"button\" (click)=\"save()\"><span translate=\"MODAL_TEXT.BUTTON_INSERT\"></span></button>\r\n\t\t</div>\r\n\t</div>\t\t\t\r\n</div>";

/***/ }),

/***/ 953:
/***/ (function(module, exports) {

module.exports = "<div>\r\n\t<div class=\"modal-header\">\r\n\t\t<button type=\"button\" class=\"close\" (click)=\"close()\"><span>x</span></button>\r\n\t\t<div class=\"dropdown\" [ngClass]=\"{open: showDropdown}\">\r\n\t\t\t<button class=\"btn btn-default btn-xs dropdown-toggle\" type=\"button\" (click)=\"toggleDropdown()\" (blur)=\"toggleDropdown()\">\r\n\t\t\t\t<span class=\"glyphicon glyphicon-menu-down\" aria-hidden=\"true\"></span> <span translate=\"LABEL_TEXT.ACTIONS\"></span>\r\n\t\t\t</button>\r\n\t\t\t<ul class=\"dropdown-menu dropdown-menu-right\">\r\n\t\t\t\t<li><a (click)=\"editItemPopup()\">\r\n\t\t\t\t\t<span class=\"icon icon-edit\" aria-hidden=\"true\"></span> <span translate=\"BUTTON_TEXT.EDIT_TITLE\"></span>\r\n\t\t\t\t</a></li>\r\n\t\t\t\t<li><a (click)=\"cloneItemPopup()\">\r\n\t\t\t\t\t<span class=\"icon icon-clone\" aria-hidden=\"true\"></span> <span translate=\"BUTTON_TEXT.CLONE_TITLE\"></span>\r\n\t\t\t\t</a></li>\r\n\t\t\t\t<li><a (click)=\"deleteItemPopup()\">\r\n\t\t\t\t\t<span class=\"icon icon-delete\" aria-hidden=\"true\"></span> <span translate=\"BUTTON_TEXT.DELETE_TITLE\"></span>\r\n\t\t\t\t</a></li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t\t<h3 class=\"modal-title panel-view-title\" translate=\"MODAL_TEXT.TITLE_VIEW\" translate-values='{\"title\":\"Dati\"}'></h3>\r\n\t</div>\r\n\t<div class=\"modal-body\">\r\n\t\t<div class=\"panel panel-default panel-view\">\t\t\t\r\n\t\t\t<div class=\"panel-heading\">\r\n\t\t\t\t<div class=\"row row-view-info\">\r\n\t\t\t\t\t<div class=\"col-sm-12 col-view-info\"><span>id</span>: <font color=\"#0079ff\">{{itemInfo.id}}</font></div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"panel-body panel-body-custom\">\r\n\t\t\t\t<div class=\"row row-form-grid\">\r\n\t\t\t\t\t<div class=\"col-sm-12 col-section\">\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-3 form-label\">nome</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-9 form-value\"><strong>{{itemInfo.first_name}}</strong></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-3 form-label\">cognome</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-9 form-value\"><strong>{{itemInfo.last_name}}</strong></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-3 form-label\">email</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-9 form-value\"><strong>{{itemInfo.email}}</strong></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-3 form-label\">sesso</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-9 form-value\"><strong>{{itemInfo.gender}}</strong></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-3 form-label\">indirizzo ip</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-9 form-value\"><strong>{{itemInfo.ip_address}}</strong></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"modal-footer\">\r\n\t\t<button class=\"btn btn-default\" type=\"button\" (click)=\"close()\"><span translate=\"MODAL_TEXT.BUTTON_CLOSE\"></span></button>\r\n\t</div>\r\n</div>";

/***/ }),

/***/ 954:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\t<!-- Main -->\r\n\t<div class=\"row main-row\">\r\n\t\t<div class=\"col-xs-1 col-side\"></div>\r\n\t\t<div class=\"col-xs-10 col-view\">\r\n\t\t\t<router-outlet></router-outlet>\t\r\n\t\t</div>\r\n\t\t<div class=\"col-xs-1 col-side\"></div>\r\n\t</div>\r\n</div>";

/***/ }),

/***/ 955:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n\t<button type=\"button\" class=\"close\" (click)=\"close()\"><span>x</span></button>\r\n\t<h3 class=\"modal-title panel-view-title\" translate=\"MODAL_TEXT.TITLE_APPLY_FILTER\"></h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n\t<div class=\"panel panel-default panel-edit\">\r\n\t\t<div class=\"panel-body panel-body-filter\">\r\n\t\t\t<div class=\"row row-gl-grid row-filter\">\r\n\t\t\t\t<div class=\"col-md-12\">\r\n\t\t\t\t\t<div class=\"row row-gl-entry\" *ngFor=\"let filter of filtersArray\">\r\n\t\t\t\t\t\t<div class=\"col-md-12 gl-separator\" *ngIf=\"filter.type == 'separator'\">\r\n\t\t\t\t\t\t\t<hr>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-3 gl-label\" *ngIf=\"filter.type != 'separator'\" [ngClass]=\"{'gl-label-switch': filter.type == 'toggle'}\">{{filter.name}}</div>\r\n\t\t\t\t\t\t<div class=\"col-md-9 gl-value\" *ngIf=\"filter.type == 'autocomplete'\">\r\n\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"filter.list\" [ac-search-text]=\"filter.searchText\" [ac-item-selected]=\"filter.itemSelected\" (ac-item-selected-change)=\"filter.itemSelected = $event\"\r\n\t\t\t\t\t\t\t\t[ac-uppercase]=\"filter.uppercase\" ac-not-found=\"{{ 'AUTOCOMPLETE_ERROR.NO_ABI' | translate }}\" \r\n\t\t\t\t\t\t\t\tac-select-on-match=\"true\" ac-no-cache=\"true\" ac-input-name=\"{{filter.name}}\"></ui-autocomplete>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-9 gl-value\" *ngIf=\"filter.type == 'input'\">\r\n\t\t\t\t\t\t\t<input name=\"{{filter.name}}\" [ngModel]=\"filter.itemSelected?.value\" (ngModelChange)=\"filter.itemSelected={value:$event}\" class=\"form-gl\" [ngClass]=\"{uppercase : filter.uppercase}\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-9 gl-value gl-value-switch\" *ngIf=\"filter.type == 'toggle'\">\r\n\t\t\t\t\t\t\t<button type=\"button\" (click)=\"filter.itemSelected.value = !filter.itemSelected.value\">\r\n\t\t\t\t\t\t\t\t<ui-switch [model]=\"filter.itemSelected.value\"></ui-switch>\r\n\t\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n\t<button class=\"btn btn-default\" type=\"button\" (click)=\"close()\"><span translate=\"MODAL_TEXT.BUTTON_CANCEL\"></span></button>\r\n\t<button class=\"btn btn-primary\" type=\"button\" (click)=\"confirm()\"><span>Ok</span></button>\r\n</div>";

/***/ })

},[1256]);
//# sourceMappingURL=app.js.map