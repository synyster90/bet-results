import { ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
export declare class SideMenuService {
    sideMenuAction: EventEmitter<boolean>;
    constructor();
    showMenu(): void;
    hideMenu(): void;
}
export declare class SideMenu {
    private elementRef;
    private sideMenuService;
    private location;
    private changeDetectorRef;
    smFullHeight: boolean;
    smToggleVisibility: boolean;
    smHomeUrl: string;
    showMenu: boolean;
    showMenuOverlay: boolean;
    showMenuClose: boolean;
    constructor(elementRef: ElementRef, sideMenuService: SideMenuService, location: Location, changeDetectorRef: ChangeDetectorRef);
}
