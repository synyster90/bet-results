import { AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '../../http-client/http-client';
export declare class TopFixed implements AfterViewInit {
    private httpClient;
    private domSanitizer;
    private topUrl;
    constructor(httpClient: HttpClient, domSanitizer: DomSanitizer);
    ngAfterViewInit(): void;
}
