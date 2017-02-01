/// <reference types="core-js" />
import { ComponentRef, ElementRef, Compiler, ComponentFactoryResolver, ApplicationRef, ViewContainerRef, AfterViewInit, EventEmitter } from '@angular/core';
import { HttpClient } from '../http-client/http-client';
import './img/success.png';
import './img/error.png';
export declare class ModalStack {
    dialog: ComponentRef<ModalDialog>;
    promise: EventEmitter<any>;
    constructor(dialog: ComponentRef<ModalDialog>, promise: EventEmitter<any>);
}
export interface IModalDialog {
    close(): any;
}
export declare class ModalDialogService {
    private cmpResolver;
    private applicationRef;
    private httpClient;
    modalStack: ModalStack[];
    constructor(cmpResolver: ComponentFactoryResolver, applicationRef: ApplicationRef, httpClient: HttpClient);
    simpleDialog(title: string, text: string): EventEmitter<any>;
    alert(exception: any): EventEmitter<any>;
    warning(bawarMsgs: any): EventEmitter<any>;
    success(body: string): EventEmitter<any>;
    confirm(text: string, callback: any): EventEmitter<any>;
    dialog(options: Object): EventEmitter<any>;
    hide(returnObj?: Object): void;
    cancel(): void;
    private createSimpleCtrl(template);
    private createAlertCtrl(template, exception);
    private removeDialog();
    private formatXml(xml);
}
export declare class ModalDialog implements AfterViewInit {
    private cmpResolver;
    private compiler;
    private element;
    private modalDialogService;
    private locals;
    private controller;
    private customController;
    private clickOutsideToClose;
    private escapeToClose;
    private size;
    private index;
    protected contentTarget: ViewContainerRef;
    constructor(cmpResolver: ComponentFactoryResolver, compiler: Compiler, element: ElementRef, modalDialogService: ModalDialogService);
    init(options: Object): void;
    ngAfterViewInit(): void;
    keydownClose($element: any): void;
}
