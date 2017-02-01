import { Component, EventEmitter } from '@angular/core';

import { SideMenuService } from '../../components/side-menu/ui-app-side-menu';
import { UtilService } from '../../utils/utils';

@Component({
    selector: 'page-header',
    template: '<h3><button class="btn btn-default btn-sm ng-scope" onclick="window.close()" type="button"><span class="icon icon-close" aria-hidden="true" title="chiudi"></span></button>'
    + '<button type="button" class="btn btn-default btn-sm" (click)="sideMenuService.showMenu()"><span class="icon icon-menu" aria-hidden="true" title="menu"></span></button>'
    + '<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span> <span>{{utilService.pageTitle.getTitle()}}</span></h3>'
})
export class PageHeader {
    constructor(private sideMenuService: SideMenuService, private utilService: UtilService) { }
}