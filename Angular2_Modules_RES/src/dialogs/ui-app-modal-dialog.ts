import { NgModule, Component, Injectable, ComponentRef, ElementRef, Compiler, ComponentFactoryResolver, ApplicationRef, ViewContainerRef, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';

import { AngularComponentsModule } from '../components/index';
import { AngularTranslateModule } from '../translate/index';

import { HttpClient, ExceptionT } from '../http-client/http-client';

import './img/success.png';
import './img/error.png';

declare var $: any;

export class ModalStack {
    dialog: ComponentRef<ModalDialog>
    promise: EventEmitter<any>

    constructor(dialog: ComponentRef<ModalDialog>, promise: EventEmitter<any>) {
        this.dialog = dialog
        this.promise = promise
    }
}

export interface IModalDialog {
    close()
}

@Injectable()
export class ModalDialogService {
    modalStack: ModalStack[] = []

    constructor(private cmpResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private httpClient: HttpClient) {
        /* Exception Handler */
        httpClient.exceptionEvent.subscribe((ex: ExceptionT) => {
            if (ex.isError)
                this.alert(ex.fault)
            else
                this.warning(ex.fault['bawarMsgs'])
        })
    }

    /* Dialog Methods - Show */
    public simpleDialog(title: string, text: string): EventEmitter<any> {
        return this.dialog({
            customController: this.createSimpleCtrl('<div class="modal-header">'
                + '<button type="button" class="close" (click)="close()"><span>x</span></button><h3 class="modal-title panel-view-title">' + title + '</h3></div>'
                + '<div class="modal-body">' + text + '</div>')
        })
    }

    public alert(exception: any): EventEmitter<any> {
        var bodyError = 'Errore applicativo';
        if (exception) {
            if (typeof exception == 'string') {
                bodyError = exception;
            } else {
                var message = '';
                if (exception.errMsg)
                    message = exception.errMsg;
                else if ((exception.baerrMsgs && exception.baerrMsgs.length > 0) || (exception.bawarMsgs && exception.bawarMsgs.length > 0))
                    message = '<ui-exception [exception]="exception"></ui-exception>'
                bodyError = '<strong>' + (exception.esito ? (exception.esito.value + ' - ' + exception.esito.des) : 'Errore applicativo') + '</strong><br>' + message;
            }
            return this.dialog({
                customController: this.createAlertCtrl('<div class="modal-header modal-header-alert">'
                    + '<button class="close" type="button" (click)="close()"><span>x</span></button><h3 class="modal-title panel-view-title" translate="MODAL_TEXT.ERROR"></h3></div>'
                    + '<div class="modal-body"><img class="alert-icon" src="dist/assets/@angular/modules/src/dialogs/img/error.png"><div class="alert-text">' + bodyError + '</div></div>'
                    + '<div class="modal-footer"><button class="btn btn-default" type="button" (click)="close()"><span>Ok</span></button></div>', exception),
                size: '900px'
            })
        }
    }

    public warning(bawarMsgs) {
        if (bawarMsgs) {
            return this.dialog({
                customController: this.createAlertCtrl('<div class="modal-header modal-header-warning">'
                    + '<button class="close" type="button" (click)="close()"><span>x</span></button><h3 class="modal-title panel-view-title" translate="MODAL_TEXT.WARNING"></h3></div>'
                    + '<div class="modal-body"><div class="alert-text warning"><ui-exception [exception]="exception"></ui-exception></div></div>'
                    + '<div class="modal-footer"><button class="btn btn-default" type="button" (click)="close()"><span>Ok</span></button></div>',
                    { bawarMsgs: bawarMsgs }),
                size: '900px'
            })
        }
    }

    public success(body: string): EventEmitter<any> {
        return this.dialog({
            customController: this.createSimpleCtrl('<div class="modal-header modal-header-success">'
                + '<button type="button" class="close" (click)="close()"><span>x</span></button><h3 class="modal-title panel-view-title" translate="MODAL_TEXT.SUCCESS"></h3></div>'
                + '<div class="modal-body">' + body + '<img src="dist/assets/@angular/modules/src/dialogs/img/success.png" /><span class="alert-message" translate="MODAL_TEXT.MESSAGE_GENERIC_SUCCESS"></span></div>'
                + '<div class="modal-footer"><button class="btn btn-default" type="button" (click)="close()"><span>Ok</span></button></div>'),
            size: '500px'
        })
    }

    public confirm(text: string, callback): EventEmitter<any> {
        return this.dialog({
            customController: this.createSimpleCtrl('<div class="modal-header modal-header-info">'
                + '<button type="button" class="close" (click)="confirm(false)"><span>x</span></button><h3 class="modal-title panel-view-title" translate="MODAL_TEXT.WARNING"></h3></div>'
                + '<div class="modal-body">' + text + '</div>'
                + '<div class="modal-footer"><button class="btn btn-primary" type="button" (click)="confirm(true)"><span>Ok</span></button>'
                + '<button class="btn btn-default" type="button" (click)="confirm(false)"><span translate="MODAL_TEXT.BUTTON_CANCEL"></span></button></div>'),
            size: '500px'
        }).subscribe(choise => callback(choise), () => callback(false))
    }

    public dialog(options: Object): EventEmitter<any> {
        var promise: EventEmitter<any> = new EventEmitter<any>()
        if (this.modalStack.length == 0)
            $('body').append('<ui-backdrop></ui-backdrop>')
        setTimeout(() => {
            var viewContainerRef: ViewContainerRef = this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
            var dialog: ComponentRef<ModalDialog> = viewContainerRef.createComponent(this.cmpResolver.resolveComponentFactory(ModalDialog), 0)
            dialog.instance.init(options)
            this.modalStack.push(new ModalStack(dialog, promise));
        })
        return promise
    }

    /* Dialog Methods - Remove */
    public hide(returnObj?: Object) {
        this.removeDialog().promise.emit(returnObj)
    }

    public cancel() {
        this.removeDialog().promise.error(null)
    }

    /* Dialog Methods - Util */
    private createSimpleCtrl(template: string) {
        @Component({
            selector: 'modal-content',
            template: template,
        })
        class SimpleCtrl implements IModalDialog {
            constructor(private modalDialogService: ModalDialogService) { }

            close() {
                this.modalDialogService.cancel();
            };

            confirm(result: any) {
                this.modalDialogService.hide(result);
            };
        };
        @NgModule({
            imports: [ AngularTranslateModule ],
            declarations: [ SimpleCtrl ]
        })
        class SimpleModule { }
        
        return {
            ctrl: SimpleCtrl,
            module: SimpleModule
        }
    }

    private createAlertCtrl(template: string, exception: Object) {
        @Component({
            selector: 'modal-content',
            template: template
        })
        class AlertCtrl implements IModalDialog{
            private exception: Object = exception

            constructor(private modalDialogService: ModalDialogService) { }

	        close() {
	            this.modalDialogService.cancel();
	        };
        };
        @NgModule({
            imports: [ AngularComponentsModule, AngularTranslateModule ],
            declarations: [ AlertCtrl ]
        })
        class AlertModule { }
        
        return {
            ctrl: AlertCtrl,
            module: AlertModule
        };
    }

    private removeDialog() {
        var dialogRemoved: ModalStack = this.modalStack.pop();
        $(dialogRemoved.dialog.location.nativeElement).remove()
        if (this.modalStack.length == 0) {
            this.httpClient.propagateException()
            $('ui-backdrop').remove()
        }
        return dialogRemoved
    }

    private formatXml(xml: string) {
        return xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
    }
}

@Component({
    selector: 'ui-dialog-container',
    template: '<div class="ui-dialog" tabindex="-1" role="dialog" ui-draggable="div.modal-header"><div #modalDialogContent></div></div>'
})
export class ModalDialog implements AfterViewInit {
    private locals: Object
    private controller: any
    private customController: Object
    private clickOutsideToClose: boolean = true
    private escapeToClose: boolean = true
    private size: string = '1000px'
    private index: number = this.modalDialogService.modalStack.length + 1

    @ViewChild('modalDialogContent', { read: ViewContainerRef }) protected contentTarget: ViewContainerRef;

    constructor(private cmpResolver: ComponentFactoryResolver, private compiler: Compiler, private element: ElementRef, private modalDialogService: ModalDialogService) { }

    init(options: Object) {
        if (options.hasOwnProperty('locals'))
            this.locals = options['locals']
        if (options.hasOwnProperty('clickOutsideToClose'))
            this.clickOutsideToClose = options['clickOutsideToClose']
        if (options.hasOwnProperty('escapeToClose'))
            this.escapeToClose = options['escapeToClose']
        if (options.hasOwnProperty('size'))
            this.size = options['size']
        if (options.hasOwnProperty('controller'))
            this.controller = options['controller']
        if (options.hasOwnProperty('customController'))
            this.customController = options['customController']
    }

    ngAfterViewInit() {
        setTimeout(() => {
        	var controllerInstance = null
            if (this.controller) {
                var ctrl = this.contentTarget.createComponent(this.cmpResolver.resolveComponentFactory(this.controller), 0)
                if (this.locals)
                    ctrl.instance['locals'] = this.locals;
                controllerInstance = ctrl.instance
            } else if (this.customController) {
                var runtimeModule = this.customController['module']
                var runtimeCtrl = this.customController['ctrl']
                this.compiler.compileModuleAndAllComponentsAsync(runtimeModule).then((moduleWithFactories) => {
                    moduleWithFactories.componentFactories.forEach((value) => {
                        if (value.componentType == runtimeCtrl) {
                        	var ctrl = this.contentTarget.createComponent(value);
                            controllerInstance = ctrl.instance
                            return value
                        }
                    })
                })
            }
            /* Style */
            var $dialogContainer = $(this.element.nativeElement)
            var $dialog = $('.ui-dialog', this.element.nativeElement)

            $dialogContainer.css({
                zIndex: 80 + this.index
            })
            var $this = this
            if (this.clickOutsideToClose)
                $dialogContainer.on('click', function(e) {
                    if (e.target !== this)
                        return;
                    if(controllerInstance)
                    	controllerInstance.close()
                })

            if (this.escapeToClose)
                this.keydownClose($dialog)

            $dialog.css({
                marginTop: parseInt($dialog.css('margin-top').replace('px', '')) + (20 * (this.index - 1)),
                left: 20 * (this.index - 1),
                maxWidth: this.size
            })
        })
    }

    keydownClose($element) {
        var $this = this
        var keydownCallback = function(event) {
            var $footer = $('div.modal-footer', $element);
            if (event.which === 13) {
                $('input', $element).blur();
                $('button', $element).blur();
                setTimeout(() => {
                    if ($('button.btn-primary', $footer).length > 0)
                        $('button.btn-primary', $footer).click();
                    else if ($('button.btn-default', $footer).length > 0)
                        $('button.btn-default', $footer).click();
                    else
                        $this.modalDialogService.cancel();
                })
            } else if (event.which === 27) {
                $('input', $element).blur();
                $('button', $element).blur();
                setTimeout(() => {
                    if ($('button.btn-default', $footer).length > 0)
                        $('button.btn-default', $footer).click();
                    else
                        $this.modalDialogService.cancel();
                })
            }
        }
        $($element).on('keydown', keydownCallback);
        setTimeout(() => {
            $element.focus();
            if ($('textarea', $element).length > 0)
                $('textarea', $element).each(function() {
                    $(this).on('focus', function() {
                        $($element).off('keydown');
                    });
                    $(this).on('blur', function() {
                        $($element).on('keydown', keydownCallback);
                    });
                });
        })
    }
}