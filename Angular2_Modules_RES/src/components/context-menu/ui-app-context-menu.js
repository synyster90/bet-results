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
var ContextMenuService = (function () {
    function ContextMenuService(cmpResolver, applicationRef) {
        this.cmpResolver = cmpResolver;
        this.applicationRef = applicationRef;
    }
    ContextMenuService.prototype.showContextMenu = function (options) {
        var _this = this;
        if ($('context-menu-dropdown').length == 0) {
            setTimeout(function () {
                var viewContainerRef = _this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
                _this.contextMenu = viewContainerRef.createComponent(_this.cmpResolver.resolveComponentFactory(ContextMenuDropdown), 0);
                _this.contextMenu.instance.init(options);
            });
        }
    };
    ContextMenuService.prototype.hideContextMenu = function () {
        this.contextMenu.destroy();
    };
    ContextMenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ApplicationRef])
    ], ContextMenuService);
    return ContextMenuService;
}());
exports.ContextMenuService = ContextMenuService;
var ContextMenu = (function () {
    function ContextMenu(elementRef, contextMenuService) {
        this.elementRef = elementRef;
        this.contextMenuService = contextMenuService;
    }
    ContextMenu.prototype.ngAfterViewInit = function () {
        var _this = this;
        $(this.elementRef.nativeElement).on('contextmenu', function (event) {
            event.stopPropagation();
            event.preventDefault();
            _this.contextMenuService.showContextMenu({
                parent: _this.elementRef,
                top: event.pageY,
                left: event.pageX,
                index: _this.cmIndex,
                menu: _this.cmModel
            });
        });
    };
    __decorate([
        core_1.Input('cm-model'), 
        __metadata('design:type', Array)
    ], ContextMenu.prototype, "cmModel", void 0);
    __decorate([
        core_1.Input('cm-index'), 
        __metadata('design:type', Number)
    ], ContextMenu.prototype, "cmIndex", void 0);
    ContextMenu = __decorate([
        core_1.Directive({
            selector: '[context-menu]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, ContextMenuService])
    ], ContextMenu);
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
var MenuOption = (function () {
    function MenuOption(index, icon, text, clickEvent, isActive) {
        this.isActive = false;
        this.icon = icon;
        this.text = text;
        this.clickEvent = clickEvent;
        this.isActive = isActive;
    }
    MenuOption.prototype.clicked = function (index) {
        this.clickEvent.emit(index);
    };
    return MenuOption;
}());
exports.MenuOption = MenuOption;
var ContextMenuDropdown = (function () {
    function ContextMenuDropdown(elementRef, contextMenuService) {
        this.elementRef = elementRef;
        this.contextMenuService = contextMenuService;
        this.optionsList = [];
        this.arrowPosX = 'left';
        this.arrowPosY = 'top';
    }
    ContextMenuDropdown.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var menuStyle = {
                right: null,
                left: null,
                bottom: null,
                top: null
            };
            // Position X
            if (_this.left + 120 >= $('body').width()) {
                menuStyle.right = ($('body').width() - _this.left - 19) + 'px';
                _this.arrowPosX = 'right';
            }
            else
                menuStyle.left = (_this.left - 19) + 'px';
            // Position Y
            if (_this.top + (_this.optionsList.length * 23) >= $('body').height()) {
                menuStyle.bottom = ($('body').height() - _this.top);
                _this.arrowPosY = 'bottom';
            }
            else
                menuStyle.top = _this.top + 'px';
            $(_this.elementRef.nativeElement).css(menuStyle);
            $(document).on('click', function (event) {
                $(document).off('click');
                _this.contextMenuService.hideContextMenu();
            });
        });
    };
    ContextMenuDropdown.prototype.ngOnDestroy = function () {
        $(this.parent.nativeElement).removeClass('context');
    };
    ContextMenuDropdown.prototype.init = function (options) {
        this.parent = options.parent;
        this.top = options.top;
        this.left = options.left;
        this.index = options.index;
        for (var i = 0; i < options.menu.length; i++)
            this.optionsList.push(new MenuOption(options.index, options.menu[i].icon, options.menu[i].text, options.menu[i].clickEvent, options.menu[i].isActive));
        $(this.parent.nativeElement).addClass('context');
    };
    ContextMenuDropdown = __decorate([
        core_1.Component({
            selector: 'context-menu-dropdown',
            template: '<ul class="dropdown-menu" role="menu" [ngClass]="arrowPosY + \' \' + arrowPosX"><li *ngFor="let option of optionsList">'
                + '<a (click)="option.clicked(index)" *ngIf="option.isActive">'
                + '<span [ngClass]="option.icon" aria-hidden="true"></span> <span>{{option.text}}</span></a>'
                + '</li></ul>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, ContextMenuService])
    ], ContextMenuDropdown);
    return ContextMenuDropdown;
}());
exports.ContextMenuDropdown = ContextMenuDropdown;
//# sourceMappingURL=ui-app-context-menu.js.map