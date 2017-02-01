import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

import { HttpClient } from '../../http-client/http-client';

declare var $: any;

@Component({
    selector: 'top-fixed',
    template: '<iframe id="iframe-top" width="100%" height="100%" [src]="topUrl" frameborder="0"></iframe>',
})
export class TopFixed implements AfterViewInit {
    private topUrl: SafeResourceUrl

    constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) { }

    ngAfterViewInit() {
        if (this.httpClient.srData)
            this.topUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.httpClient.srData['topUrl'])
    }
}