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
var index_1 = require('../components/index');
var index_2 = require('../translate/index');
var http_client_1 = require('../http-client/http-client');
require('./img/success.png');
require('./img/error.png');
var ModalStack = (function () {
    function ModalStack(dialog, promise) {
        this.dialog = dialog;
        this.promise = promise;
    }
    return ModalStack;
}());
exports.ModalStack = ModalStack;
var ModalDialogService = (function () {
    function ModalDialogService(cmpResolver, applicationRef, httpClient) {
        var _this = this;
        this.cmpResolver = cmpResolver;
        this.applicationRef = applicationRef;
        this.httpClient = httpClient;
        this.modalStack = [];
        /* Exception Handler */
        httpClient.exceptionEvent.subscribe(function (ex) {
            if (ex.isError)
                _this.alert(ex.fault);
            else
                _this.warning(ex.fault['bawarMsgs']);
        });
    }
    /* Dialog Methods - Show */
    ModalDialogService.prototype.simpleDialog = function (title, text) {
        return this.dialog({
            customController: this.createSimpleCtrl('<div class="modal-header">'
                + '<button type="button" class="close" (click)="close()"><span>x</span></button><h3 class="modal-title panel-view-title">' + title + '</h3></div>'
                + '<div class="modal-body">' + text + '</div>')
        });
    };
    ModalDialogService.prototype.alert = function (exception) {
        var bodyError = 'Errore applicativo';
        if (exception) {
            if (typeof exception == 'string') {
                bodyError = exception;
            }
            else {
                var message = '';
                if (exception.errMsg)
                    message = exception.errMsg;
                else if ((exception.baerrMsgs && exception.baerrMsgs.length > 0) || (exception.bawarMsgs && exception.bawarMsgs.length > 0))
                    message = '<ui-exception [exception]="exception"></ui-exception>';
                bodyError = '<strong>' + (exception.esito ? (exception.esito.value + ' - ' + exception.esito.des) : 'Errore applicativo') + '</strong><br>' + message;
            }
            return this.dialog({
                customController: this.createAlertCtrl('<div class="modal-header modal-header-alert">'
                    + '<button class="close" type="button" (click)="close()"><span>x</span></button><h3 class="modal-title panel-view-title" translate="MODAL_TEXT.ERROR"></h3></div>'
                    + '<div class="modal-body"><img class="alert-icon" src="dist/assets/@angular/modules/src/dialogs/img/error.png"><div class="alert-text">' + bodyError + '</div></div>'
                    + '<div class="modal-footer"><button class="btn btn-default" type="button" (click)="close()"><span>Ok</span></button></div>', exception),
                size: '900px'
            });
        }
    };
    ModalDialogService.prototype.warning = function (bawarMsgs) {
        if (bawarMsgs) {
            return this.dialog({
                customController: this.createAlertCtrl('<div class="modal-header modal-header-warning">'
                    + '<button class="close" type="button" (click)="close()"><span>x</span></button><h3 class="modal-title panel-view-title" translate="MODAL_TEXT.WARNING"></h3></div>'
                    + '<div class="modal-body"><div class="alert-text warning"><ui-exception [exception]="exception"></ui-exception></div></div>'
                    + '<div class="modal-footer"><button class="btn btn-default" type="button" (click)="close()"><span>Ok</span></button></div>', { bawarMsgs: bawarMsgs }),
                size: '900px'
            });
        }
    };
    ModalDialogService.prototype.success = function (body) {
        return this.dialog({
            customController: this.createSimpleCtrl('<div class="modal-header modal-header-success">'
                + '<button type="button" class="close" (click)="close()"><span>x</span></button><h3 class="modal-title panel-view-title" translate="MODAL_TEXT.SUCCESS"></h3></div>'
                + '<div class="modal-body">' + body + '<img src="dist/assets/@angular/modules/src/dialogs/img/success.png" /><span class="alert-message" translate="MODAL_TEXT.MESSAGE_GENERIC_SUCCESS"></span></div>'
                + '<div class="modal-footer"><button class="btn btn-default" type="button" (click)="close()"><span>Ok</span></button></div>'),
            size: '500px'
        });
    };
    ModalDialogService.prototype.confirm = function (text, callback) {
        return this.dialog({
            customController: this.createSimpleCtrl('<div class="modal-header modal-header-info">'
                + '<button type="button" class="close" (click)="confirm(false)"><span>x</span></button><h3 class="modal-title panel-view-title" translate="MODAL_TEXT.WARNING"></h3></div>'
                + '<div class="modal-body">' + text + '</div>'
                + '<div class="modal-footer"><button class="btn btn-primary" type="button" (click)="confirm(true)"><span>Ok</span></button>'
                + '<button class="btn btn-default" type="button" (click)="confirm(false)"><span translate="MODAL_TEXT.BUTTON_CANCEL"></span></button></div>'),
            size: '500px'
        }).subscribe(function (choise) { return callback(choise); }, function () { return callback(false); });
    };
    ModalDialogService.prototype.dialog = function (options) {
        var _this = this;
        var promise = new core_1.EventEmitter();
        if (this.modalStack.length == 0)
            $('body').append('<ui-backdrop></ui-backdrop>');
        setTimeout(function () {
            var viewContainerRef = _this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
            var dialog = viewContainerRef.createComponent(_this.cmpResolver.resolveComponentFactory(ModalDialog), 0);
            dialog.instance.init(options);
            _this.modalStack.push(new ModalStack(dialog, promise));
        });
        return promise;
    };
    /* Dialog Methods - Remove */
    ModalDialogService.prototype.hide = function (returnObj) {
        this.removeDialog().promise.emit(returnObj);
    };
    ModalDialogService.prototype.cancel = function () {
        this.removeDialog().promise.error(null);
    };
    /* Dialog Methods - Util */
    ModalDialogService.prototype.createSimpleCtrl = function (template) {
        var SimpleCtrl = (function () {
            function SimpleCtrl(modalDialogService) {
                this.modalDialogService = modalDialogService;
            }
            SimpleCtrl.prototype.close = function () {
                this.modalDialogService.cancel();
            };
            ;
            SimpleCtrl.prototype.confirm = function (result) {
                this.modalDialogService.hide(result);
            };
            ;
            SimpleCtrl = __decorate([
                core_1.Component({
                    selector: 'modal-content',
                    template: template,
                }), 
                __metadata('design:paramtypes', [ModalDialogService])
            ], SimpleCtrl);
            return SimpleCtrl;
        }());
        ;
        var SimpleModule = (function () {
            function SimpleModule() {
            }
            SimpleModule = __decorate([
                core_1.NgModule({
                    imports: [index_2.AngularTranslateModule],
                    declarations: [SimpleCtrl]
                }), 
                __metadata('design:paramtypes', [])
            ], SimpleModule);
            return SimpleModule;
        }());
        return {
            ctrl: SimpleCtrl,
            module: SimpleModule
        };
    };
    ModalDialogService.prototype.createAlertCtrl = function (template, exception) {
        var AlertCtrl = (function () {
            function AlertCtrl(modalDialogService) {
                this.modalDialogService = modalDialogService;
                this.exception = exception;
            }
            AlertCtrl.prototype.close = function () {
                this.modalDialogService.cancel();
            };
            ;
            AlertCtrl = __decorate([
                core_1.Component({
                    selector: 'modal-content',
                    template: template
                }), 
                __metadata('design:paramtypes', [ModalDialogService])
            ], AlertCtrl);
            return AlertCtrl;
        }());
        ;
        var AlertModule = (function () {
            function AlertModule() {
            }
            AlertModule = __decorate([
                core_1.NgModule({
                    imports: [index_1.AngularComponentsModule, index_2.AngularTranslateModule],
                    declarations: [AlertCtrl]
                }), 
                __metadata('design:paramtypes', [])
            ], AlertModule);
            return AlertModule;
        }());
        return {
            ctrl: AlertCtrl,
            module: AlertModule
        };
    };
    ModalDialogService.prototype.removeDialog = function () {
        var dialogRemoved = this.modalStack.pop();
        $(dialogRemoved.dialog.location.nativeElement).remove();
        if (this.modalStack.length == 0) {
            this.httpClient.propagateException();
            $('ui-backdrop').remove();
        }
        return dialogRemoved;
    };
    ModalDialogService.prototype.formatXml = function (xml) {
        return xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
    };
    ModalDialogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ApplicationRef, http_client_1.HttpClient])
    ], ModalDialogService);
    return ModalDialogService;
}());
exports.ModalDialogService = ModalDialogService;
var ModalDialog = (function () {
    function ModalDialog(cmpResolver, compiler, element, modalDialogService) {
        this.cmpResolver = cmpResolver;
        this.compiler = compiler;
        this.element = element;
        this.modalDialogService = modalDialogService;
        this.clickOutsideToClose = true;
        this.escapeToClose = true;
        this.size = '1000px';
        this.index = this.modalDialogService.modalStack.length + 1;
    }
    ModalDialog.prototype.init = function (options) {
        if (options.hasOwnProperty('locals'))
            this.locals = options['locals'];
        if (options.hasOwnProperty('clickOutsideToClose'))
            this.clickOutsideToClose = options['clickOutsideToClose'];
        if (options.hasOwnProperty('escapeToClose'))
            this.escapeToClose = options['escapeToClose'];
        if (options.hasOwnProperty('size'))
            this.size = options['size'];
        if (options.hasOwnProperty('controller'))
            this.controller = options['controller'];
        if (options.hasOwnProperty('customController'))
            this.customController = options['customController'];
    };
    ModalDialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var controllerInstance = null;
            if (_this.controller) {
                var ctrl = _this.contentTarget.createComponent(_this.cmpResolver.resolveComponentFactory(_this.controller), 0);
                if (_this.locals)
                    ctrl.instance['locals'] = _this.locals;
                controllerInstance = ctrl.instance;
            }
            else if (_this.customController) {
                var runtimeModule = _this.customController['module'];
                var runtimeCtrl = _this.customController['ctrl'];
                _this.compiler.compileModuleAndAllComponentsAsync(runtimeModule).then(function (moduleWithFactories) {
                    moduleWithFactories.componentFactories.forEach(function (value) {
                        if (value.componentType == runtimeCtrl) {
                            var ctrl = _this.contentTarget.createComponent(value);
                            controllerInstance = ctrl.instance;
                            return value;
                        }
                    });
                });
            }
            /* Style */
            var $dialogContainer = $(_this.element.nativeElement);
            var $dialog = $('.ui-dialog', _this.element.nativeElement);
            $dialogContainer.css({
                zIndex: 80 + _this.index
            });
            var $this = _this;
            if (_this.clickOutsideToClose)
                $dialogContainer.on('click', function (e) {
                    if (e.target !== this)
                        return;
                    if (controllerInstance)
                        controllerInstance.close();
                });
            if (_this.escapeToClose)
                _this.keydownClose($dialog);
            $dialog.css({
                marginTop: parseInt($dialog.css('margin-top').replace('px', '')) + (20 * (_this.index - 1)),
                left: 20 * (_this.index - 1),
                maxWidth: _this.size
            });
        });
    };
    ModalDialog.prototype.keydownClose = function ($element) {
        var $this = this;
        var keydownCallback = function (event) {
            var $footer = $('div.modal-footer', $element);
            if (event.which === 13) {
                $('input', $element).blur();
                $('button', $element).blur();
                setTimeout(function () {
                    if ($('button.btn-primary', $footer).length > 0)
                        $('button.btn-primary', $footer).click();
                    else if ($('button.btn-default', $footer).length > 0)
                        $('button.btn-default', $footer).click();
                    else
                        $this.modalDialogService.cancel();
                });
            }
            else if (event.which === 27) {
                $('input', $element).blur();
                $('button', $element).blur();
                setTimeout(function () {
                    if ($('button.btn-default', $footer).length > 0)
                        $('button.btn-default', $footer).click();
                    else
                        $this.modalDialogService.cancel();
                });
            }
        };
        $($element).on('keydown', keydownCallback);
        setTimeout(function () {
            $element.focus();
            if ($('textarea', $element).length > 0)
                $('textarea', $element).each(function () {
                    $(this).on('focus', function () {
                        $($element).off('keydown');
                    });
                    $(this).on('blur', function () {
                        $($element).on('keydown', keydownCallback);
                    });
                });
        });
    };
    __decorate([
        core_1.ViewChild('modalDialogContent', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], ModalDialog.prototype, "contentTarget", void 0);
    ModalDialog = __decorate([
        core_1.Component({
            selector: 'ui-dialog-container',
            template: '<div class="ui-dialog" tabindex="-1" role="dialog" ui-draggable="div.modal-header"><div #modalDialogContent></div></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.Compiler, core_1.ElementRef, ModalDialogService])
    ], ModalDialog);
    return ModalDialog;
}());
exports.ModalDialog = ModalDialog;
//# sourceMappingURL=ui-app-modal-dialog.js.map