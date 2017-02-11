/*! Web Application */
webpackJsonp([1],{

/***/ 116:
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
var utils_1 = __webpack_require__(39);
var ScommesseService = (function () {
    function ScommesseService(utilService) {
        this.utilService = utilService;
        this.competitions = null;
        this.matches = null;
        this.competitionsMap = null;
        this.matchesMap = null;
        this.scommesseList = this.arrayToMap(["1", "X", "2"]);
        this.scommesseListFilter = null;
    }
    ScommesseService.prototype.setFilterList = function (arraySampleElenco) {
        var scommesseArray = [];
        for (var i = 0; i < arraySampleElenco.length; i++) {
            if (arraySampleElenco[i].scommesse)
                if (!this.utilService.alreadyExists(arraySampleElenco[i].scommesse, scommesseArray))
                    scommesseArray.push({
                        value: arraySampleElenco[i].scommesse,
                        des: ''
                    });
        }
        this.scommesseListFilter = scommesseArray;
    };
    ScommesseService.prototype.competitionsToMap = function (array) {
        return array.map(function (item) {
            return {
                value: item.title + " (" + item.country[0].displayName + ")",
                des: item.competition_id
            };
        });
    };
    ;
    ScommesseService.prototype.matchesToMap = function (array) {
        return array.map(function (item) {
            return {
                value: item.team_A_title + ' - ' + item.team_B_title,
                des: item.match_id
            };
        });
    };
    ;
    ScommesseService.prototype.getCompetition = function (competition_id) {
        for (var i = 0; i < this.competitionsMap.length; i++) {
            if (this.competitionsMap[i]['des'] == competition_id)
                return this.competitionsMap[i];
        }
    };
    ScommesseService.prototype.getMatch = function (match_id) {
        for (var i = 0; i < this.matchesMap.length; i++) {
            if (this.matchesMap[i]['des'] == match_id)
                return this.matchesMap[i];
        }
    };
    // Array -> Map conversion (value, des)
    ScommesseService.prototype.arrayToMap = function (array) {
        return array.map(function (item) {
            return {
                value: typeof item == 'string' ? item : item.value,
                des: typeof item == 'string' ? '' : item.des
            };
        });
    };
    ;
    ScommesseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object])
    ], ScommesseService);
    return ScommesseService;
    var _a;
}());
exports.ScommesseService = ScommesseService;


/***/ }),

/***/ 1260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var platform_browser_dynamic_1 = __webpack_require__(223);
var core_1 = __webpack_require__(1);
var app_module_1 = __webpack_require__(649);
if (false) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * angular2-cookie - Implementation of Angular 1.x $cookies service to Angular 2
 * @version v1.2.6
 * @link https://github.com/salemdar/angular2-cookie#readme
 * @license MIT
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var services_1 = __webpack_require__(442);
__export(__webpack_require__(442));
exports.ANGULAR2_COOKIE_PROVIDERS = [
    { provide: services_1.CookieOptions, useClass: services_1.BaseCookieOptions },
    { provide: services_1.CookieService, useFactory: cookieServiceFactory, deps: [services_1.CookieOptions] }
];
function cookieServiceFactory(options) {
    return new services_1.CookieService(options);
}
exports.cookieServiceFactory = cookieServiceFactory;

//# sourceMappingURL=core.js.map


/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * angular2-cookie - Implementation of Angular 1.x $cookies service to Angular 2
 * @version v1.2.6
 * @link https://github.com/salemdar/angular2-cookie#readme
 * @license MIT
 */

var base_cookie_options_1 = __webpack_require__(443);
exports.BaseCookieOptions = base_cookie_options_1.BaseCookieOptions;
exports.CookieOptions = base_cookie_options_1.CookieOptions;
var cookies_service_1 = __webpack_require__(444);
exports.CookieService = cookies_service_1.CookieService;

//# sourceMappingURL=services.js.map


/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * angular2-cookie - Implementation of Angular 1.x $cookies service to Angular 2
 * @version v1.2.6
 * @link https://github.com/salemdar/angular2-cookie#readme
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var common_1 = __webpack_require__(70);
var core_1 = __webpack_require__(1);
/** @private */
var CookieOptions = (function () {
    function CookieOptions(_a) {
        var _b = _a === void 0 ? {} : _a, path = _b.path, domain = _b.domain, expires = _b.expires, secure = _b.secure;
        this.path = this.isPresent(path) ? path : null;
        this.domain = this.isPresent(domain) ? domain : null;
        this.expires = this.isPresent(expires) ? expires : null;
        this.secure = this.isPresent(secure) ? secure : false;
    }
    CookieOptions.prototype.merge = function (options) {
        return new CookieOptions({
            path: this.isPresent(options) && this.isPresent(options.path) ? options.path : this.path,
            domain: this.isPresent(options) && this.isPresent(options.domain) ? options.domain :
                this.domain,
            expires: this.isPresent(options) && this.isPresent(options.expires) ? options.expires :
                this.expires,
            secure: this.isPresent(options) && this.isPresent(options.secure) ? options.secure :
                this.secure,
        });
    };
    CookieOptions.prototype.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    return CookieOptions;
}());
exports.CookieOptions = CookieOptions;
/** @private */
var BaseCookieOptions = (function (_super) {
    __extends(BaseCookieOptions, _super);
    function BaseCookieOptions(baseHref) {
        _super.call(this, { path: baseHref || '/' });
        this.baseHref = baseHref;
    }
    BaseCookieOptions = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(common_1.APP_BASE_HREF)), 
        __metadata('design:paramtypes', [String])
    ], BaseCookieOptions);
    return BaseCookieOptions;
}(CookieOptions));
exports.BaseCookieOptions = BaseCookieOptions;

//# sourceMappingURL=base-cookie-options.js.map


/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * angular2-cookie - Implementation of Angular 1.x $cookies service to Angular 2
 * @version v1.2.6
 * @link https://github.com/salemdar/angular2-cookie#readme
 * @license MIT
 */

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__(1);
var base_cookie_options_1 = __webpack_require__(443);
var CookieService = (function () {
    function CookieService(_defaultOptions) {
        this._defaultOptions = _defaultOptions;
    }
    Object.defineProperty(CookieService.prototype, "cookieString", {
        get: function () {
            return document.cookie || '';
        },
        set: function (val) {
            document.cookie = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name CookieService#get
     *
     * @description
     * Returns the value of given cookie key.
     *
     * @param {string} key Id to use for lookup.
     * @returns {string} Raw cookie value.
     */
    CookieService.prototype.get = function (key) {
        return this._cookieReader()[key];
    };
    /**
     * @name CookieService#getObject
     *
     * @description
     * Returns the deserialized value of given cookie key.
     *
     * @param {string} key Id to use for lookup.
     * @returns {Object} Deserialized cookie value.
     */
    CookieService.prototype.getObject = function (key) {
        var value = this.get(key);
        return value ? JSON.parse(value) : value;
    };
    /**
     * @name CookieService#getAll
     *
     * @description
     * Returns a key value object with all the cookies.
     *
     * @returns {Object} All cookies
     */
    CookieService.prototype.getAll = function () {
        return this._cookieReader();
    };
    /**
     * @name CookieService#put
     *
     * @description
     * Sets a value for given cookie key.
     *
     * @param {string} key Id for the `value`.
     * @param {string} value Raw value to be stored.
     * @param {CookieOptionsArgs} options (Optional) Options object.
     */
    CookieService.prototype.put = function (key, value, options) {
        this._cookieWriter()(key, value, options);
    };
    /**
     * @name CookieService#putObject
     *
     * @description
     * Serializes and sets a value for given cookie key.
     *
     * @param {string} key Id for the `value`.
     * @param {Object} value Value to be stored.
     * @param {CookieOptionsArgs} options (Optional) Options object.
     */
    CookieService.prototype.putObject = function (key, value, options) {
        this.put(key, JSON.stringify(value), options);
    };
    /**
     * @name CookieService#remove
     *
     * @description
     * Remove given cookie.
     *
     * @param {string} key Id of the key-value pair to delete.
     * @param {CookieOptionsArgs} options (Optional) Options object.
     */
    CookieService.prototype.remove = function (key, options) {
        this._cookieWriter()(key, undefined, options);
    };
    /**
     * @name CookieService#removeAll
     *
     * @description
     * Remove all cookies.
     */
    CookieService.prototype.removeAll = function () {
        var _this = this;
        var cookies = this.getAll();
        Object.keys(cookies).forEach(function (key) {
            _this.remove(key);
        });
    };
    CookieService.prototype._cookieReader = function () {
        var lastCookies = {};
        var lastCookieString = '';
        var that = this;
        var cookieArray, cookie, i, index, name;
        var currentCookieString = this.cookieString;
        if (currentCookieString !== lastCookieString) {
            lastCookieString = currentCookieString;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                index = cookie.indexOf('=');
                if (index > 0) {
                    name = that._safeDecodeURIComponent(cookie.substring(0, index));
                    // the first value that is seen for a cookie is the most
                    // specific one.  values for the same cookie name that
                    // follow are for less specific paths.
                    if (this.isBlank(lastCookies[name])) {
                        lastCookies[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
                    }
                }
            }
        }
        return lastCookies;
    };
    CookieService.prototype._cookieWriter = function () {
        var that = this;
        return function (name, value, options) {
            that.cookieString = that._buildCookieString(name, value, options);
        };
    };
    CookieService.prototype._safeDecodeURIComponent = function (str) {
        try {
            return decodeURIComponent(str);
        }
        catch (e) {
            return str;
        }
    };
    CookieService.prototype._buildCookieString = function (name, value, options) {
        var cookiePath = '/';
        var path, expires;
        var defaultOpts = this._defaultOptions || new base_cookie_options_1.CookieOptions({ path: cookiePath });
        var opts = this._mergeOptions(defaultOpts, options);
        expires = opts.expires;
        if (this.isBlank(value)) {
            expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
            value = '';
        }
        if (this.isString(expires)) {
            expires = new Date(expires);
        }
        var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        str += opts.path ? ';path=' + opts.path : '';
        str += opts.domain ? ';domain=' + opts.domain : '';
        str += expires ? ';expires=' + expires.toUTCString() : '';
        str += opts.secure ? ';secure' : '';
        // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
        // - 300 cookies
        // - 20 cookies per unique domain
        // - 4096 bytes per cookie
        var cookieLength = str.length + 1;
        if (cookieLength > 4096) {
            console.log("Cookie '" + name + "' possibly not set or overflowed because it was too \n      large (" + cookieLength + " > 4096 bytes)!");
        }
        return str;
    };
    CookieService.prototype._mergeOptions = function (defaultOpts, providedOpts) {
        var newOpts = defaultOpts;
        if (this.isPresent(providedOpts)) {
            return newOpts.merge(new base_cookie_options_1.CookieOptions(providedOpts));
        }
        return newOpts;
    };
    CookieService.prototype.isBlank = function (obj) {
        return obj === undefined || obj === null;
    };
    CookieService.prototype.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    CookieService.prototype.isString = function (obj) {
        return typeof obj === 'string';
    };
    CookieService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [base_cookie_options_1.CookieOptions])
    ], CookieService);
    return CookieService;
}());
exports.CookieService = CookieService;

//# sourceMappingURL=cookies.service.js.map


/***/ }),

/***/ 445:
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
var ng2_translate_1 = __webpack_require__(102);
var core_2 = __webpack_require__(441);
var utils_1 = __webpack_require__(39);
var http_client_1 = __webpack_require__(72);
var dialogs_1 = __webpack_require__(71);
var scommesse_service_1 = __webpack_require__(116);
var viewModal_1 = __webpack_require__(448);
var editModal_1 = __webpack_require__(446);
var insertModal_1 = __webpack_require__(447);
var Home = (function () {
    function Home(utilService, modalDialogService, scommesseService, httpClient, translateService, changeDetectorRef, cookieService) {
        var _this = this;
        this.utilService = utilService;
        this.modalDialogService = modalDialogService;
        this.scommesseService = scommesseService;
        this.httpClient = httpClient;
        this.translateService = translateService;
        this.changeDetectorRef = changeDetectorRef;
        this.cookieService = cookieService;
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
        var scommesse = [];
        if (this.cookieService.get('scommessePartiteTableData'))
            scommesse = JSON.parse(this.cookieService.get('scommessePartiteTableData'));
        this.scommesseList = this.filtered = scommesse;
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
            var _this = this;
            $this.modalDialogService.dialog({
                controller: editModal_1.EditModalCtrl,
                locals: {
                    'item': item
                }
            }).subscribe(function (editItem) {
                if (editItem) {
                    $this.scommesseList[index]['competition_id'] = editItem.competition.des;
                    $this.scommesseList[index]['match_id'] = editItem.match.des;
                    $this.scommesseList[index]['home'] = editItem.match.value.split(' - ')[0];
                    $this.scommesseList[index]['away'] = editItem.match.value.split(' - ')[1];
                    $this.scommesseList[index]['bet'] = {
                        id: editItem.scommessa.des,
                        text: editItem.scommessa.value
                    };
                    _this.cookieService.put('scommessePartiteTableData', JSON.stringify(_this.scommesseList));
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
                _this.scommesseList.unshift({
                    id: newItem.id,
                    competition_id: newItem.competition.des,
                    match_id: newItem.match.des,
                    home: newItem.match.value.split(' - ')[0],
                    away: newItem.match.value.split(' - ')[1],
                    bet: {
                        id: newItem.scommessa.des,
                        text: newItem.scommessa.value
                    }
                });
                _this.cookieService.put('scommessePartiteTableData', JSON.stringify(_this.scommesseList));
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
    Home.prototype.refreshPartiteLive = function (timer) {
        var _this = this;
        var matches = '';
        for (var i = 0; i < this.scommesseList.length; i++) {
            var scommessa = this.scommesseList[i];
            if (scommessa.time != 'FIN') {
                if (i > 0 && matches != '')
                    matches += ',';
                matches += scommessa.match_id;
            }
        }
        if (matches != '')
            this.httpClient.post('rest/live', {
                matches: matches
            }, true).subscribe(function (liveData) {
                if (liveData && liveData.matches && liveData.matches.length > 0) {
                    for (var i = 0; i < _this.scommesseList.length; i++)
                        for (var i = 0; i < liveData.matches.length; i++)
                            if (liveData.matches[i].id == scommessa.match_id) {
                                if (liveData.matches[i].status == 'fixture')
                                    _this.scommesseList[i]['time'] = liveData.matches[i].mobile.state;
                                else
                                    _this.scommesseList[i]['time'] = liveData.matches[i].period;
                                if (liveData.matches[i].has_score)
                                    _this.scommesseList[i]['result'] = liveData.matches[i].score.home + ' - ' + liveData.matches[i].score.away;
                                break;
                            }
                    _this.changeDetectorRef.markForCheck();
                }
            }, function (err) {
                if (timer)
                    clearInterval(timer);
            });
    };
    Home.prototype.ngOnInit = function () {
        var _this = this;
        this.sampleRefresh();
        var timer = window.setInterval(function () {
            _this.refreshPartiteLive(timer);
        }, 5000);
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: __webpack_require__(954),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _b) || Object, (typeof (_c = typeof scommesse_service_1.ScommesseService !== 'undefined' && scommesse_service_1.ScommesseService) === 'function' && _c) || Object, (typeof (_d = typeof http_client_1.HttpClient !== 'undefined' && http_client_1.HttpClient) === 'function' && _d) || Object, (typeof (_e = typeof ng2_translate_1.TranslateService !== 'undefined' && ng2_translate_1.TranslateService) === 'function' && _e) || Object, (typeof (_f = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _f) || Object, (typeof (_g = typeof core_2.CookieService !== 'undefined' && core_2.CookieService) === 'function' && _g) || Object])
    ], Home);
    return Home;
    var _a, _b, _c, _d, _e, _f, _g;
}());
exports.Home = Home;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),

/***/ 446:
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
var utils_1 = __webpack_require__(39);
var scommesse_service_1 = __webpack_require__(116);
var http_client_1 = __webpack_require__(72);
var EditModalCtrl = (function () {
    function EditModalCtrl(utilService, scommesseService, modalDialogService, httpClient) {
        this.utilService = utilService;
        this.scommesseService = scommesseService;
        this.modalDialogService = modalDialogService;
        this.httpClient = httpClient;
        this.filterMatches = [];
    }
    EditModalCtrl.prototype.ngOnInit = function () {
        this.origItem = {
            id: this.locals['item'].id,
            competition: this.scommesseService.getCompetition(this.locals['item'].competition_id),
            match: this.scommesseService.getMatch(this.locals['item'].match_id),
            bet: {
                value: this.locals['item'].bet.text,
                des: this.locals['item'].bet.id
            }
        };
        this.editItem = JSON.parse(JSON.stringify(this.origItem));
    };
    EditModalCtrl.prototype.onCompetitionChange = function (competitionSelect) {
        if (competitionSelect) {
            this.editItem.competition = competitionSelect;
            for (var i = 0; i < this.scommesseService.matches.length; i++) {
                if (this.scommesseService.matches[i]['competition_id'] == competitionSelect.des)
                    this.filterMatches.push({
                        value: this.scommesseService.matches[i]['team_A_title'] + ' - ' + this.scommesseService.matches[i]['team_B_title'],
                        des: this.scommesseService.matches[i]['match_id']
                    });
            }
        }
        else {
            this.filterMatches = [];
            this.editItem.competition = null;
            this.editItem.match = null;
        }
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
        if ((this.editItem.competition && this.editItem.competition.des && this.editItem.competition.des != this.origItem.competition.des)
            || (this.editItem.match && this.editItem.match.des && this.editItem.match.des != this.origItem.match.des)
            || (this.editItem.scommessa && this.editItem.scommessa.des && this.editItem.scommessa.des != this.origItem.scommessa.des))
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
        if (this.editItem.competition && this.editItem.competition != '') {
            if (this.editItem.competition.des != this.origItem.competition.des)
                changeNotify += '<li><strong>Competizione</strong>: ' + this.origItem.competition_id + ' --> ' + this.editItem.competition.value + '</li>';
        }
        else
            changeNotify += '<li><strong>Competizione</strong>: ' + this.origItem.competition_id + ' --> null</li>';
        if (this.editItem.match && this.editItem.match != '') {
            if (this.editItem.match.des != this.origItem.match.des)
                changeNotify += '<li><strong>Partita</strong>: ' + this.origItem.match.value + ' --> ' + this.editItem.match.value + '</li>';
        }
        else
            changeNotify += '<li><strong>Partita</strong>: ' + this.origItem.match.value + ' --> null</li>';
        if (this.editItem.scommessa && this.editItem.scommessa != '') {
            if (this.editItem.scommessa.des != this.origItem.scommessa.des)
                changeNotify += '<li><strong>Scommessa</strong>: ' + this.origItem.scommessa.value + ' --> ' + this.editItem.scommessa.value + '</li>';
        }
        else
            changeNotify += '<li><strong>Scommessa</strong>: ' + this.origItem.scommessa.value + ' --> null</li>';
        return changeNotify;
    };
    EditModalCtrl = __decorate([
        core_1.Component({
            selector: 'modal-content',
            template: __webpack_require__(955)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof scommesse_service_1.ScommesseService !== 'undefined' && scommesse_service_1.ScommesseService) === 'function' && _b) || Object, (typeof (_c = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _c) || Object, (typeof (_d = typeof http_client_1.HttpClient !== 'undefined' && http_client_1.HttpClient) === 'function' && _d) || Object])
    ], EditModalCtrl);
    return EditModalCtrl;
    var _a, _b, _c, _d;
}());
exports.EditModalCtrl = EditModalCtrl;


/***/ }),

/***/ 447:
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
var core_2 = __webpack_require__(441);
var dialogs_1 = __webpack_require__(71);
var utils_1 = __webpack_require__(39);
var scommesse_service_1 = __webpack_require__(116);
var http_client_1 = __webpack_require__(72);
var InsertModalCtrl = (function () {
    function InsertModalCtrl(utilService, scommesseService, modalDialogService, httpClient, cookieService) {
        this.utilService = utilService;
        this.scommesseService = scommesseService;
        this.modalDialogService = modalDialogService;
        this.httpClient = httpClient;
        this.cookieService = cookieService;
        this.filterMatches = [];
    }
    InsertModalCtrl.prototype.ngOnInit = function () {
        this.insertItem = { "id": "", "competition": "", "match": "", "scommessa": "" };
        if (this.cookieService.get('scommessePartiteTableData')) {
            var scommesse = JSON.parse(this.cookieService.get('scommessePartiteTableData'));
            this.insertItem.id = scommesse[scommesse.length - 1].id + 1;
        }
        else
            this.insertItem.id = 0;
    };
    InsertModalCtrl.prototype.onCompetitionChange = function (competitionSelect) {
        if (competitionSelect) {
            this.insertItem.competition = competitionSelect;
            for (var i = 0; i < this.scommesseService.matches.length; i++) {
                if (this.scommesseService.matches[i]['competition_id'] == competitionSelect.des)
                    this.filterMatches.push({
                        value: this.scommesseService.matches[i]['team_A_title'] + ' - ' + this.scommesseService.matches[i]['team_B_title'],
                        des: this.scommesseService.matches[i]['match_id']
                    });
            }
        }
        else {
            this.filterMatches = [];
            this.insertItem.competition = null;
            this.insertItem.match = null;
        }
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
        if (this.insertItem.match && this.insertItem.match != '' && this.insertItem.competition && this.insertItem.competition != '' && this.insertItem.scommessa && this.insertItem.scommessa != '') {
            var $this = this;
            $this.modalDialogService.confirm('<div class="panel-body-custom" translate="MODAL_TEXT.MESSAGE_INSERT_CONFIRM"></div>', function (result) {
                if (result == true)
                    $this.modalDialogService.hide($this.insertItem);
            });
        }
        else {
            this.modalDialogService.alert("Compilare tutti i campi");
        }
    };
    InsertModalCtrl = __decorate([
        core_1.Component({
            selector: 'modal-content',
            template: __webpack_require__(956)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof scommesse_service_1.ScommesseService !== 'undefined' && scommesse_service_1.ScommesseService) === 'function' && _b) || Object, (typeof (_c = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _c) || Object, (typeof (_d = typeof http_client_1.HttpClient !== 'undefined' && http_client_1.HttpClient) === 'function' && _d) || Object, (typeof (_e = typeof core_2.CookieService !== 'undefined' && core_2.CookieService) === 'function' && _e) || Object])
    ], InsertModalCtrl);
    return InsertModalCtrl;
    var _a, _b, _c, _d, _e;
}());
exports.InsertModalCtrl = InsertModalCtrl;


/***/ }),

/***/ 448:
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
var utils_1 = __webpack_require__(39);
var scommesse_service_1 = __webpack_require__(116);
var ViewModalCtrl = (function () {
    function ViewModalCtrl(utilService, scommesseService, modalDialogService) {
        this.utilService = utilService;
        this.scommesseService = scommesseService;
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
        this.itemInfo = {
            id: this.locals['item'].id,
            competition: this.scommesseService.getCompetition(this.locals['item'].competition_id),
            match: this.scommesseService.getMatch(this.locals['item'].match_id),
            bet: {
                value: this.locals['item'].bet.text,
                des: this.locals['item'].bet.id
            }
        };
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
            template: __webpack_require__(957)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof scommesse_service_1.ScommesseService !== 'undefined' && scommesse_service_1.ScommesseService) === 'function' && _b) || Object, (typeof (_c = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _c) || Object])
    ], ViewModalCtrl);
    return ViewModalCtrl;
    var _a, _b, _c;
}());
exports.ViewModalCtrl = ViewModalCtrl;
;


/***/ }),

/***/ 649:
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
var platform_browser_1 = __webpack_require__(36);
var forms_1 = __webpack_require__(111);
var http_1 = __webpack_require__(130);
var ng2_translate_1 = __webpack_require__(102);
var cookies_service_1 = __webpack_require__(444);
/* Directives, Components & Providers */
var platform_browser_2 = __webpack_require__(36);
var components_1 = __webpack_require__(105);
var dialogs_1 = __webpack_require__(71);
var http_client_1 = __webpack_require__(72);
var pipes_1 = __webpack_require__(167);
var translate_1 = __webpack_require__(106);
var utils_1 = __webpack_require__(39);
var app_component_1 = __webpack_require__(778);
var app_routes_1 = __webpack_require__(779);
var shared_module_1 = __webpack_require__(781);
var home_component_1 = __webpack_require__(445);
var viewModal_1 = __webpack_require__(448);
var editModal_1 = __webpack_require__(446);
var insertModal_1 = __webpack_require__(447);
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
                platform_browser_2.Title,
                cookies_service_1.CookieService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ 778:
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
var router_1 = __webpack_require__(168);
var common_1 = __webpack_require__(70);
var ng2_translate_1 = __webpack_require__(102);
var components_1 = __webpack_require__(105);
var utils_1 = __webpack_require__(39);
var http_client_1 = __webpack_require__(72);
var scommesse_service_1 = __webpack_require__(116);
var AppComponent = (function () {
    function AppComponent(router, httpClient, location, utilService, sideMenuService, changeDetectorRef, viewContainerRef, translate, scommesseService) {
        this.router = router;
        this.httpClient = httpClient;
        this.location = location;
        this.utilService = utilService;
        this.sideMenuService = sideMenuService;
        this.changeDetectorRef = changeDetectorRef;
        this.viewContainerRef = viewContainerRef;
        this.scommesseService = scommesseService;
        /* App Settings */
        utilService.APP_TITLE = 'Bet Results';
        translate.setDefaultLang('en');
        translate.use('it');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpClient.get('rest/init').subscribe(function (data) {
            console.log(data);
            _this.scommesseService.competitions = data.competitions;
            _this.scommesseService.matches = data.Matches;
            _this.scommesseService.competitionsMap = _this.scommesseService.competitionsToMap(data.competitions);
            _this.scommesseService.matchesMap = _this.scommesseService.matchesToMap(data.Matches);
            _this.changeDetectorRef.markForCheck();
        }, function (err) {
            console.log(err);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            template: __webpack_require__(958),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof http_client_1.HttpClient !== 'undefined' && http_client_1.HttpClient) === 'function' && _b) || Object, (typeof (_c = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _c) || Object, (typeof (_d = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _d) || Object, (typeof (_e = typeof components_1.SideMenuService !== 'undefined' && components_1.SideMenuService) === 'function' && _e) || Object, (typeof (_f = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _f) || Object, (typeof (_g = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _g) || Object, (typeof (_h = typeof ng2_translate_1.TranslateService !== 'undefined' && ng2_translate_1.TranslateService) === 'function' && _h) || Object, (typeof (_j = typeof scommesse_service_1.ScommesseService !== 'undefined' && scommesse_service_1.ScommesseService) === 'function' && _j) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ 779:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var router_1 = __webpack_require__(168);
var home_component_1 = __webpack_require__(445);
var appRoutes = [
    { path: '', component: home_component_1.Home },
    { path: '**', redirectTo: '/' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);


/***/ }),

/***/ 780:
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
var utils_1 = __webpack_require__(39);
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
            template: __webpack_require__(959)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof utils_1.UtilService !== 'undefined' && utils_1.UtilService) === 'function' && _a) || Object, (typeof (_b = typeof dialogs_1.ModalDialogService !== 'undefined' && dialogs_1.ModalDialogService) === 'function' && _b) || Object])
    ], FilterModalCtrl);
    return FilterModalCtrl;
    var _a, _b;
}());
exports.FilterModalCtrl = FilterModalCtrl;
;


/***/ }),

/***/ 781:
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
var platform_browser_1 = __webpack_require__(36);
var forms_1 = __webpack_require__(111);
var http_1 = __webpack_require__(130);
var ng2_translate_1 = __webpack_require__(102);
var components_1 = __webpack_require__(105);
var dialogs_1 = __webpack_require__(71);
var http_client_1 = __webpack_require__(72);
var pipes_1 = __webpack_require__(167);
var translate_1 = __webpack_require__(106);
var utils_1 = __webpack_require__(39);
var filterModal_1 = __webpack_require__(780);
var scommesse_service_1 = __webpack_require__(116);
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [scommesse_service_1.ScommesseService]
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
                scommesse_service_1.ScommesseService
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

/***/ 954:
/***/ (function(module, exports) {

module.exports = "<div class=\"row row-header\">\r\n\t<div class=\"col-sm-3 col-page-title\">\r\n\t\t<h3>\r\n\t\t\t<span aria-hidden=\"true\" class=\"glyphicon glyphicon-menu-right\"></span>\r\n\t\t\t<span>{{utilService.pageTitle.getTitle()}}</span>\r\n\t\t</h3>\r\n\t</div>\r\n\t<div class=\"col-sm-9 col-table-actions\">\r\n\t\t<div class=\"item-action-group btn-group btn-group-sm\" role=\"group\" aria-label=\"...\">\r\n\t\t\t<button type=\"button\" class=\"btn btn-default\" (click)=\"addItem($event)\" [disabled]=\"insertDisabled\">\r\n\t\t\t\t<span class=\"icon icon-add\" aria-hidden=\"true\"></span> <span translate=\"BUTTON_TEXT.INSERT\"></span>\r\n\t\t\t</button>\r\n\t\t\t<button type=\"button\" class=\"btn btn-default\" (click)=\"sampleRefresh()\">\r\n\t\t\t\t<span class=\"icon icon-refresh\" aria-hidden=\"true\"></span> <span translate=\"BUTTON_TEXT.RELOAD\"></span>\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<ui-exception [(exception)]=\"exception\" exception-removable=\"true\" exception-hidden=\"true\"></ui-exception>\r\n<div class=\"table-container\">\r\n\t<table class=\"table table-bordered table-striped\">\r\n\t\t<thead>\r\n\t\t\t<tr>\r\n\t\t\t\t<th class=\"col-id col-sort\"><table-head hd-name=\"LABEL_TEXT.HOME\" [(hdcurrentpage)]=\"currentPage\" hd-type=\"home\" [(hdsorttype)]=\"sortType\" \r\n\t\t\t\t\t[(hdsortreverse)]=\"sortReverse\" hd-filter-title=\"Filtra per Squadra Casa\" [(hdfiltersearch)]=\"filterSearch\"></table-head></th>\r\n\t\t\t\t<th class=\"col-first-name col-sort\"><table-head hd-name=\"LABEL_TEXT.RESULT\"></table-head></th>\r\n\t\t\t\t<th class=\"col-last-name col-sort\"><table-head hd-name=\"LABEL_TEXT.AWAY\" [(hdcurrentpage)]=\"currentPage\" hd-type=\"away\" [(hdsorttype)]=\"sortType\" \r\n\t\t\t\t\t[(hdsortreverse)]=\"sortReverse\"\thd-filter-title=\"Filtra per Squadra Ospite\" [(hdfiltersearch)]=\"filterSearch\"></table-head></th>\r\n\t\t\t\t<th class=\"col-email col-sort\"><table-head hd-name=\"LABEL_TEXT.TIME\"></table-head></th>\r\n\t\t\t\t<th class=\"col-gender col-sort\"><table-head hd-name=\"LABEL_TEXT.BET\"></table-head></th>\r\n\t\t\t</tr>\r\n\t\t</thead>\r\n\t\t<tbody>\r\n\t\t\t<tr *ngFor=\"let item of scommesseList | filterSearch:$this | orderBy:sortType:sortReverse | filterPaginate:$this; let $index = index; let $last = last\" \r\n\t\t\t\tpipe-cicle [pc-last]=\"$last\" (pc-finish)=\"scommesseService.setFilterList(filtered)\"\r\n\t\t\t\tcontext-menu [cm-model]=\"getAbilOperations()\" [cm-index]=\"$index\" (click)=\"viewItem($index, $event)\">\r\n\t\t\t\t<td>{{item.home}}</td>\r\n\t\t\t\t<td>{{item.result}}</td>\r\n\t\t\t\t<td>{{item.away}}</td>\r\n\t\t\t\t<td>{{item.time}}</td>\r\n\t\t\t\t<td>{{item.bet.text}}</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr *ngIf=\"scommesseList.length == 0 || filtered_result.length == 0\">\r\n\t\t\t\t<td colspan=\"5\" class=\"col-no-items\" translate=\"LABEL_TEXT.NO_RESULT\"></td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t\t<tfoot>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"5\" class=\"col-pagination\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<div class=\"col-sm-3 col-num-per-page\">\r\n\t\t\t\t\t\t\t<ui-select [select-model]=\"utilService.numPerPage.selected\" [select-options]=\"utilService.numPerPage.options\" \r\n\t\t\t\t\t\t\t\t(select-change)=\"utilService.setNumPerPage($event)\" [select-n-items]=\"filtered.length\">\r\n\t\t\t\t\t\t\t</ui-select>\r\n\t\t\t\t\t\t\t<span translate=\"LABEL_TEXT.ITEM_PER_PAGE\"></span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-sm-9 col-standard-pagination\">\r\n\t\t\t\t\t\t\t<table-pagination [total-items]=\"filtered.length\" [(currentpage)]=\"currentPage\" [items-per-page]=\"utilService.numPerPage.selected.id\"\t\r\n\t\t\t\t\t\t\t\tmax-size=\"5\" class=\"table-pagination\"></table-pagination>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</tfoot>\r\n\t</table>\r\n</div>";

/***/ }),

/***/ 955:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n\t<button type=\"button\" class=\"close\" (click)=\"close()\"><span>x</span></button>\r\n\t<h3 class=\"modal-title panel-view-title\" translate=\"MODAL_TEXT.TITLE_EDIT\" translate-values='{\"title\":\"Dati\"}'></h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n\t<form name=\"editForm\" novalidate>\r\n\t\t<div class=\"panel panel-default panel-edit\">\r\n\t\t\t<ui-exception [exception]=\"httpClient.exception\" exception-hidden=\"true\"></ui-exception>\r\n\t\t\t<div class=\"panel-body panel-body-custom\">\r\n\t\t\t\t<div class=\"row row-form-grid\">\r\n\t\t\t\t\t<div class=\"col-md-12 col-section\">\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">competizione</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"scommesseService.competitionsMap\" (ac-item-selected-change)=\"onCompetitionChange($event)\"\r\n\t\t\t\t\t\t\t\t\t[ac-item-selected]=\"editItem.competition\" ac-not-found=\"competizione inserita errata!\" ac-hide-des=\"true\"\r\n\t\t\t\t\t\t\t\t\tac-select-on-match=\"true\" ac-input-name=\"competizione\" class=\"form-input\" validate [model]=\"[editItem]\"></ui-autocomplete>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">partita</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"filterMatches\" (ac-item-selected-change)=\"editItem.match = $event ? $event : ''\"\r\n\t\t\t\t\t\t\t\t\t[ac-item-selected]=\"editItem.match\" ac-not-found=\"partita inserita errata!\" ac-hide-des=\"true\"\r\n\t\t\t\t\t\t\t\t\tac-select-on-match=\"true\" ac-input-name=\"match\" class=\"form-input\" validate [model]=\"[editItem]\"></ui-autocomplete>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">scommessa</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"scommesseService.scommesseList\" [ac-item-selected]=\"editItem.scommessa\"\r\n\t\t\t\t\t\t\t\t\t(ac-item-selected-change)=\"editItem.scommessa = $event ? $event : ''\" ac-hide-des=\"true\"\r\n\t\t\t\t\t\t\t\t\tac-not-found=\"scommessa inserita errata!\" ac-select-on-match=\"true\" ac-input-name=\"scommessa\" class=\"form-input\"\r\n\t\t\t\t\t\t\t\t\tvalidate [model]=\"[editItem]\"></ui-autocomplete>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</form>\r\n</div>\r\n<div class=\"modal-footer\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-sm-12\">\r\n\t\t\t<button class=\"btn btn-default\" type=\"button\" (click)=\"close()\"><span translate=\"MODAL_TEXT.BUTTON_CLOSE\"></span></button>\r\n\t\t\t<button class=\"btn btn-primary\" type=\"button\" (click)=\"save()\"><span translate=\"MODAL_TEXT.BUTTON_SAVE\"></span></button>\r\n\t\t</div>\r\n\t</div>\t\t\t\r\n</div>";

/***/ }),

/***/ 956:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n\t<button type=\"button\" class=\"close\" (click)=\"close()\"><span>x</span></button>\r\n\t<h3 class=\"modal-title panel-view-title\" translate=\"MODAL_TEXT.TITLE_INSERT\" translate-values='{\"title\":\"Scommessa\"}'></h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n\t<form name=\"insertForm\" novalidate>\r\n\t\t<div class=\"panel panel-default panel-edit\">\r\n\t\t\t<ui-exception [exception]=\"httpClient.exception\" exception-hidden=\"true\"></ui-exception>\r\n\t\t\t<div class=\"panel-body panel-body-custom\">\r\n\t\t\t\t<div class=\"row row-form-grid\">\r\n\t\t\t\t\t<div class=\"col-md-12 col-section\">\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">competizione</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"scommesseService.competitionsMap\" (ac-item-selected-change)=\"onCompetitionChange($event)\"\r\n\t\t\t\t\t\t\t\t\t[ac-item-selected]=\"{value: '', des: ''}\" ac-not-found=\"competizione inserita errata!\" ac-hide-des=\"true\"\r\n\t\t\t\t\t\t\t\t\tac-select-on-match=\"true\" ac-input-name=\"competizione\" class=\"form-input\" validate [model]=\"[insertItem]\"></ui-autocomplete>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">partita</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"filterMatches\" (ac-item-selected-change)=\"insertItem.match = $event ? $event : ''\"\r\n\t\t\t\t\t\t\t\t\t[ac-item-selected]=\"{value: '', des: ''}\" ac-not-found=\"partita inserita errata!\" ac-hide-des=\"true\"\r\n\t\t\t\t\t\t\t\t\tac-select-on-match=\"true\" ac-input-name=\"match\" class=\"form-input\" validate [model]=\"[insertItem]\"></ui-autocomplete>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-3 form-label\">scommessa</div>\r\n\t\t\t\t\t\t\t<div class=\"col-md-9 form-value\">\r\n\t\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"scommesseService.scommesseList\" [ac-item-selected]=\"{value: insertItem.scommessa, des: ''}\"\r\n\t\t\t\t\t\t\t\t\t(ac-item-selected-change)=\"insertItem.scommessa = $event ? $event : ''\" ac-hide-des=\"true\"\r\n\t\t\t\t\t\t\t\t\tac-not-found=\"scommessa inserita errata!\" ac-select-on-match=\"true\" ac-input-name=\"scommessa\" class=\"form-input\"\r\n\t\t\t\t\t\t\t\t\tvalidate [model]=\"[insertItem]\"></ui-autocomplete>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</form>\r\n</div>\r\n<div class=\"modal-footer\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-sm-12\">\r\n\t\t\t<button class=\"btn btn-default\" type=\"button\" (click)=\"close()\"><span translate=\"MODAL_TEXT.BUTTON_CLOSE\"></span></button>\r\n\t\t\t<button class=\"btn btn-primary\" type=\"button\" (click)=\"save()\"><span translate=\"MODAL_TEXT.BUTTON_INSERT\"></span></button>\r\n\t\t</div>\r\n\t</div>\t\t\t\r\n</div>";

/***/ }),

/***/ 957:
/***/ (function(module, exports) {

module.exports = "<div>\r\n\t<div class=\"modal-header\">\r\n\t\t<button type=\"button\" class=\"close\" (click)=\"close()\"><span>x</span></button>\r\n\t\t<div class=\"dropdown\" [ngClass]=\"{open: showDropdown}\">\r\n\t\t\t<button class=\"btn btn-default btn-xs dropdown-toggle\" type=\"button\" (click)=\"toggleDropdown()\" (blur)=\"toggleDropdown()\">\r\n\t\t\t\t<span class=\"glyphicon glyphicon-menu-down\" aria-hidden=\"true\"></span> <span translate=\"LABEL_TEXT.ACTIONS\"></span>\r\n\t\t\t</button>\r\n\t\t\t<ul class=\"dropdown-menu dropdown-menu-right\">\r\n\t\t\t\t<li><a (click)=\"editItemPopup()\">\r\n\t\t\t\t\t<span class=\"icon icon-edit\" aria-hidden=\"true\"></span> <span translate=\"BUTTON_TEXT.EDIT_TITLE\"></span>\r\n\t\t\t\t</a></li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t\t<h3 class=\"modal-title panel-view-title\" translate=\"MODAL_TEXT.TITLE_VIEW\" translate-values='{\"title\":\"Dati\"}'></h3>\r\n\t</div>\r\n\t<div class=\"modal-body\">\r\n\t\t<div class=\"panel panel-default panel-view\">\t\t\t\r\n\t\t\t<div class=\"panel-body panel-body-custom\">\r\n\t\t\t\t<div class=\"row row-form-grid\">\r\n\t\t\t\t\t<div class=\"col-sm-12 col-section\">\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-3 form-label\">competizione</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-9 form-value\"><strong>{{itemInfo.competition.value}}</strong></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-3 form-label\">partita</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-9 form-value\"><strong>{{itemInfo.match.value}}</strong></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row row-form-entry\">\r\n\t\t\t\t\t\t\t<div class=\"col-sm-3 form-label\">scommessa</div>\r\n\t\t\t\t\t\t\t<div class=\"col-sm-9 form-value\"><strong>{{itemInfo.scommessa.value}}</strong></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"modal-footer\">\r\n\t\t<button class=\"btn btn-default\" type=\"button\" (click)=\"close()\"><span translate=\"MODAL_TEXT.BUTTON_CLOSE\"></span></button>\r\n\t</div>\r\n</div>";

/***/ }),

/***/ 958:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\t<!-- Main -->\r\n\t<div class=\"row main-row\">\r\n\t\t<div class=\"col-xs-1 col-side\"></div>\r\n\t\t<div class=\"col-xs-10 col-view\">\r\n\t\t\t<router-outlet></router-outlet>\t\r\n\t\t</div>\r\n\t\t<div class=\"col-xs-1 col-side\"></div>\r\n\t</div>\r\n</div>";

/***/ }),

/***/ 959:
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n\t<button type=\"button\" class=\"close\" (click)=\"close()\"><span>x</span></button>\r\n\t<h3 class=\"modal-title panel-view-title\" translate=\"MODAL_TEXT.TITLE_APPLY_FILTER\"></h3>\r\n</div>\r\n<div class=\"modal-body\">\r\n\t<div class=\"panel panel-default panel-edit\">\r\n\t\t<div class=\"panel-body panel-body-filter\">\r\n\t\t\t<div class=\"row row-gl-grid row-filter\">\r\n\t\t\t\t<div class=\"col-md-12\">\r\n\t\t\t\t\t<div class=\"row row-gl-entry\" *ngFor=\"let filter of filtersArray\">\r\n\t\t\t\t\t\t<div class=\"col-md-12 gl-separator\" *ngIf=\"filter.type == 'separator'\">\r\n\t\t\t\t\t\t\t<hr>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-3 gl-label\" *ngIf=\"filter.type != 'separator'\" [ngClass]=\"{'gl-label-switch': filter.type == 'toggle'}\">{{filter.name}}</div>\r\n\t\t\t\t\t\t<div class=\"col-md-9 gl-value\" *ngIf=\"filter.type == 'autocomplete'\">\r\n\t\t\t\t\t\t\t<ui-autocomplete [ac-items]=\"filter.list\" [ac-search-text]=\"filter.searchText\" [ac-item-selected]=\"filter.itemSelected\" (ac-item-selected-change)=\"filter.itemSelected = $event\"\r\n\t\t\t\t\t\t\t\t[ac-uppercase]=\"filter.uppercase\" ac-not-found=\"{{ 'AUTOCOMPLETE_ERROR.NO_ABI' | translate }}\" \r\n\t\t\t\t\t\t\t\tac-select-on-match=\"true\" ac-no-cache=\"true\" ac-input-name=\"{{filter.name}}\"></ui-autocomplete>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-9 gl-value\" *ngIf=\"filter.type == 'input'\">\r\n\t\t\t\t\t\t\t<input name=\"{{filter.name}}\" [ngModel]=\"filter.itemSelected?.value\" (ngModelChange)=\"filter.itemSelected={value:$event}\" class=\"form-gl\" [ngClass]=\"{uppercase : filter.uppercase}\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"col-md-9 gl-value gl-value-switch\" *ngIf=\"filter.type == 'toggle'\">\r\n\t\t\t\t\t\t\t<button type=\"button\" (click)=\"filter.itemSelected.value = !filter.itemSelected.value\">\r\n\t\t\t\t\t\t\t\t<ui-switch [model]=\"filter.itemSelected.value\"></ui-switch>\r\n\t\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n\t<button class=\"btn btn-default\" type=\"button\" (click)=\"close()\"><span translate=\"MODAL_TEXT.BUTTON_CANCEL\"></span></button>\r\n\t<button class=\"btn btn-primary\" type=\"button\" (click)=\"confirm()\"><span>Ok</span></button>\r\n</div>";

/***/ })

},[1260]);
//# sourceMappingURL=app.js.map