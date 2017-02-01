import { Component, Injectable, ElementRef, Input, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

declare var $: any;

@Injectable()
export class SideMenuService {
    public sideMenuAction: EventEmitter<boolean> = new EventEmitter<boolean>()

    constructor() { }

    public showMenu() {
        this.sideMenuAction.emit(true)
    }

    public hideMenu() {
        this.sideMenuAction.emit(false)
    }
}

@Component({
    selector: 'side-menu',
    template: '<div class="side-menu-overlay" (click)="showMenu = false" *ngIf="showMenu && showMenuOverlay">&nbsp;</div>'
    + '<div class="side-menu animated fadeInLeft" *ngIf="showMenu"><button type="button" class="side-menu-close" *ngIf="showMenuClose" (click)="showMenu = false"><span>x</span></button>'
    + '<ng-content></ng-content></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenu {
    @Input() smFullHeight: boolean
    @Input() smToggleVisibility: boolean
    @Input() smHomeUrl: string

    showMenu: boolean = false
    showMenuOverlay: boolean = true
    showMenuClose: boolean = true

    constructor(private elementRef: ElementRef, private sideMenuService: SideMenuService, private location: Location, private changeDetectorRef: ChangeDetectorRef) {
        this.smFullHeight = typeof this.smFullHeight != 'undefined' ? this.smFullHeight : true
        this.smToggleVisibility = typeof this.smToggleVisibility != 'undefined' ? this.smToggleVisibility : true
        this.smHomeUrl = typeof this.smHomeUrl != 'undefined' ? this.smHomeUrl : '/'

        if (this.smFullHeight)
            $(elementRef.nativeElement).addClass('side-menu-full-height');

        if (!this.smToggleVisibility)
            $(elementRef.nativeElement).addClass('side-menu-no-hide');

        this.sideMenuService.sideMenuAction.subscribe(action => {
            if (action) {
                this.showMenu = true;
                if (this.location.path() == '') {
                    this.showMenuOverlay = false;
                    this.showMenuClose = false;
                } else {
                    this.showMenuOverlay = true;
                    this.showMenuClose = true;
                }
            } else {
                this.showMenu = false;
                this.showMenuOverlay = false;
                this.showMenuClose = true;
            }
            this.changeDetectorRef.markForCheck()
        })
    }
}