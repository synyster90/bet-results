import { AfterViewInit, ComponentFactoryResolver, ApplicationRef, ElementRef } from '@angular/core';
export declare class OverlayService {
    private cmpResolver;
    private applicationRef;
    private overlayComp;
    constructor(cmpResolver: ComponentFactoryResolver, applicationRef: ApplicationRef);
    showPopoverOverlay(clickCallback: any): void;
    hidePopoverOverlay(): void;
}
export declare class Overlay implements AfterViewInit {
    private element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
}
