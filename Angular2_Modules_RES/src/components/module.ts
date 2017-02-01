import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Autocomplete, AutocompleteHighlight } from './autocomplete/ui-app-autocomplete';
import { AutosizeTextarea } from './autosize-textarea/ui-app-autosize-textarea';
import { Codemirror } from './codemirror/ui-app-codemirror';
import { ContextMenu, ContextMenuDropdown, ContextMenuService } from './context-menu/ui-app-context-menu';
import { Draggable } from './draggable/ui-app-draggable';
import { Exception } from './exception/ui-app-exception';
import { Overlay, OverlayService } from './overlay/ui-app-overlay';
import { PageHeader } from './page-header/ui-app-page-header';
import { PipeCicle } from './pipe-cicle/pipe-cicle';
import { Popover } from './popover/ui-app-popover';
import { PopoverFilter, PopoverFilterService } from './popover-filter/ui-app-popover-filter';
import { Select } from './select/ui-app-select';
import { SideMenu, SideMenuService } from './side-menu/ui-app-side-menu';
import { Switch } from './switch/ui-app-switch';
import { TableHead } from './table-head/ui-app-table-head';
import { TablePagination } from './table-pagination/ui-app-table-pagination';
import { Validate } from './validate/validate';

import { AngularTranslateModule } from '../translate/index';
import { AngularPipesModule } from '../pipes/index';

@NgModule({
    imports: [
        BrowserModule, FormsModule, AngularTranslateModule, AngularPipesModule
    ],
    declarations: [
        Autocomplete, AutocompleteHighlight, AutosizeTextarea, Codemirror, ContextMenu, ContextMenuDropdown,
        Draggable, Exception, Overlay, PageHeader, PipeCicle, Popover, PopoverFilter,
        Select, SideMenu, Switch, TableHead, TablePagination, Validate
    ],
    entryComponents: [
        ContextMenuDropdown, Overlay, PopoverFilter
    ],
    providers: [
        ContextMenuService, OverlayService, PopoverFilterService, SideMenuService
    ],
    exports: [
        Autocomplete, AutocompleteHighlight, AutosizeTextarea, Codemirror, ContextMenu, ContextMenuDropdown,
        Draggable, Exception, Overlay, PageHeader, PipeCicle, Popover, PopoverFilter,
        Select, SideMenu, Switch, TableHead, TablePagination, Validate
    ]
})
export class AngularComponentsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularComponentsModule,
            providers: [ContextMenuService, OverlayService, PopoverFilterService, SideMenuService]
        };
    }
}