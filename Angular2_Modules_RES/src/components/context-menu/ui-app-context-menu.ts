import { Component, Directive, Injectable, ElementRef, ComponentRef, ComponentFactoryResolver, ApplicationRef, ViewContainerRef, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';

declare var $: any;

@Injectable()
export class ContextMenuService {
    private contextMenu: ComponentRef<ContextMenuDropdown>

    constructor(private cmpResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef) { }

    showContextMenu(options: Object) {
        if ($('context-menu-dropdown').length == 0) {
            setTimeout(() => {
                var viewContainerRef: ViewContainerRef = this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
                this.contextMenu = viewContainerRef.createComponent(this.cmpResolver.resolveComponentFactory(ContextMenuDropdown), 0)
                this.contextMenu.instance.init(options)
            })
        }
    }

    hideContextMenu() {
        this.contextMenu.destroy()
    }
}

@Directive({
    selector: '[context-menu]'
})
export class ContextMenu implements AfterViewInit {
    @Input('cm-model') cmModel: Object[]
    @Input('cm-index') cmIndex: number

    constructor(private elementRef: ElementRef, private contextMenuService: ContextMenuService) { }

    ngAfterViewInit() {
        $(this.elementRef.nativeElement).on('contextmenu', event => {
            event.stopPropagation();
            event.preventDefault();
            this.contextMenuService.showContextMenu({
                parent: this.elementRef,
                top: event.pageY,
                left: event.pageX,
                index: this.cmIndex,
                menu: this.cmModel
            })
        })
    }
}

export class MenuOption {
    icon: string
    text: string
    clickEvent: EventEmitter<number>
    isActive: boolean = false

    clicked(index) {
        this.clickEvent.emit(index)
    }

    constructor(index, icon: string, text: string, clickEvent: EventEmitter<number>, isActive: boolean) {
        this.icon = icon
        this.text = text
        this.clickEvent = clickEvent
        this.isActive = isActive
    }
}

@Component({
    selector: 'context-menu-dropdown',
    template: '<ul class="dropdown-menu" role="menu" [ngClass]="arrowPosY + \' \' + arrowPosX"><li *ngFor="let option of optionsList">'
    + '<a (click)="option.clicked(index)" *ngIf="option.isActive">'
    + '<span [ngClass]="option.icon" aria-hidden="true"></span> <span>{{option.text}}</span></a>'
    + '</li></ul>'
})
export class ContextMenuDropdown implements AfterViewInit, OnDestroy {
    parent: ElementRef
    top: number
    left: number
    index: number
    optionsList: MenuOption[] = []

    private arrowPosX = 'left';
    private arrowPosY = 'top';

    constructor(private elementRef: ElementRef, private contextMenuService: ContextMenuService) { }

    ngAfterViewInit() {
        setTimeout(() => {
            var menuStyle = {
                right: null,
                left: null,
                bottom: null,
                top: null
            };
            // Position X
            if (this.left + 120 >= $('body').width()) {
                menuStyle.right = ($('body').width() - this.left - 19) + 'px';
                this.arrowPosX = 'right'
            }
            else
                menuStyle.left = (this.left - 19) + 'px';

            // Position Y
            if (this.top + (this.optionsList.length * 23) >= $('body').height()) {
                menuStyle.bottom = ($('body').height() - this.top);
                this.arrowPosY = 'bottom';
            }
            else
                menuStyle.top = this.top + 'px';
            $(this.elementRef.nativeElement).css(menuStyle);
            $(document).on('click', event => {
                $(document).off('click')
                this.contextMenuService.hideContextMenu()
            })
        })
    }

    ngOnDestroy() {
        $(this.parent.nativeElement).removeClass('context');
    }

    public init(options: any) {
        this.parent = options.parent
        this.top = options.top
        this.left = options.left
        this.index = options.index
        for (var i = 0; i < options.menu.length; i++)
            this.optionsList.push(new MenuOption(options.index, options.menu[i].icon, options.menu[i].text, options.menu[i].clickEvent, options.menu[i].isActive))
        $(this.parent.nativeElement).addClass('context');
    }
}