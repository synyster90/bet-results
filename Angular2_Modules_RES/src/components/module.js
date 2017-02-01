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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var ui_app_autocomplete_1 = require('./autocomplete/ui-app-autocomplete');
var ui_app_autosize_textarea_1 = require('./autosize-textarea/ui-app-autosize-textarea');
var ui_app_codemirror_1 = require('./codemirror/ui-app-codemirror');
var ui_app_context_menu_1 = require('./context-menu/ui-app-context-menu');
var ui_app_draggable_1 = require('./draggable/ui-app-draggable');
var ui_app_exception_1 = require('./exception/ui-app-exception');
var ui_app_overlay_1 = require('./overlay/ui-app-overlay');
var ui_app_page_header_1 = require('./page-header/ui-app-page-header');
var pipe_cicle_1 = require('./pipe-cicle/pipe-cicle');
var ui_app_popover_1 = require('./popover/ui-app-popover');
var ui_app_popover_filter_1 = require('./popover-filter/ui-app-popover-filter');
var ui_app_select_1 = require('./select/ui-app-select');
var ui_app_side_menu_1 = require('./side-menu/ui-app-side-menu');
var ui_app_switch_1 = require('./switch/ui-app-switch');
var ui_app_table_head_1 = require('./table-head/ui-app-table-head');
var ui_app_table_pagination_1 = require('./table-pagination/ui-app-table-pagination');
var validate_1 = require('./validate/validate');
var index_1 = require('../translate/index');
var index_2 = require('../pipes/index');
var AngularComponentsModule = (function () {
    function AngularComponentsModule() {
    }
    AngularComponentsModule.forRoot = function () {
        return {
            ngModule: AngularComponentsModule,
            providers: [ui_app_context_menu_1.ContextMenuService, ui_app_overlay_1.OverlayService, ui_app_popover_filter_1.PopoverFilterService, ui_app_side_menu_1.SideMenuService]
        };
    };
    AngularComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule, forms_1.FormsModule, index_1.AngularTranslateModule, index_2.AngularPipesModule
            ],
            declarations: [
                ui_app_autocomplete_1.Autocomplete, ui_app_autocomplete_1.AutocompleteHighlight, ui_app_autosize_textarea_1.AutosizeTextarea, ui_app_codemirror_1.Codemirror, ui_app_context_menu_1.ContextMenu, ui_app_context_menu_1.ContextMenuDropdown,
                ui_app_draggable_1.Draggable, ui_app_exception_1.Exception, ui_app_overlay_1.Overlay, ui_app_page_header_1.PageHeader, pipe_cicle_1.PipeCicle, ui_app_popover_1.Popover, ui_app_popover_filter_1.PopoverFilter,
                ui_app_select_1.Select, ui_app_side_menu_1.SideMenu, ui_app_switch_1.Switch, ui_app_table_head_1.TableHead, ui_app_table_pagination_1.TablePagination, validate_1.Validate
            ],
            entryComponents: [
                ui_app_context_menu_1.ContextMenuDropdown, ui_app_overlay_1.Overlay, ui_app_popover_filter_1.PopoverFilter
            ],
            providers: [
                ui_app_context_menu_1.ContextMenuService, ui_app_overlay_1.OverlayService, ui_app_popover_filter_1.PopoverFilterService, ui_app_side_menu_1.SideMenuService
            ],
            exports: [
                ui_app_autocomplete_1.Autocomplete, ui_app_autocomplete_1.AutocompleteHighlight, ui_app_autosize_textarea_1.AutosizeTextarea, ui_app_codemirror_1.Codemirror, ui_app_context_menu_1.ContextMenu, ui_app_context_menu_1.ContextMenuDropdown,
                ui_app_draggable_1.Draggable, ui_app_exception_1.Exception, ui_app_overlay_1.Overlay, ui_app_page_header_1.PageHeader, pipe_cicle_1.PipeCicle, ui_app_popover_1.Popover, ui_app_popover_filter_1.PopoverFilter,
                ui_app_select_1.Select, ui_app_side_menu_1.SideMenu, ui_app_switch_1.Switch, ui_app_table_head_1.TableHead, ui_app_table_pagination_1.TablePagination, validate_1.Validate
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AngularComponentsModule);
    return AngularComponentsModule;
}());
exports.AngularComponentsModule = AngularComponentsModule;
//# sourceMappingURL=module.js.map