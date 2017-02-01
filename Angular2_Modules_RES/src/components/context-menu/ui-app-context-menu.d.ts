/// <reference types="core-js" />
import { ElementRef, ComponentFactoryResolver, ApplicationRef, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
export declare class ContextMenuService {
    private cmpResolver;
    private applicationRef;
    private contextMenu;
    constructor(cmpResolver: ComponentFactoryResolver, applicationRef: ApplicationRef);
    showContextMenu(options: Object): void;
    hideContextMenu(): void;
}
export declare class ContextMenu implements AfterViewInit {
    private elementRef;
    private contextMenuService;
    cmModel: Object[];
    cmIndex: number;
    constructor(elementRef: ElementRef, contextMenuService: ContextMenuService);
    ngAfterViewInit(): void;
}
export declare class MenuOption {
    icon: string;
    text: string;
    clickEvent: EventEmitter<number>;
    isActive: boolean;
    clicked(index: any): void;
    constructor(index: any, icon: string, text: string, clickEvent: EventEmitter<number>, isActive: boolean);
}
export declare class ContextMenuDropdown implements AfterViewInit, OnDestroy {
    private elementRef;
    private contextMenuService;
    parent: ElementRef;
    top: number;
    left: number;
    index: number;
    optionsList: MenuOption[];
    private arrowPosX;
    private arrowPosY;
    constructor(elementRef: ElementRef, contextMenuService: ContextMenuService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    init(options: any): void;
}
