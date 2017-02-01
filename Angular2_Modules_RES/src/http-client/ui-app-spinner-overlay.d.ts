import { AfterViewInit, ElementRef, ComponentFactoryResolver, ApplicationRef, ComponentRef } from '@angular/core';
import './img/gears.gif';
export declare class SpinnerOverlayService {
    private cmpResolver;
    private applicationRef;
    overlay: ComponentRef<SpinnerOverlay>;
    constructor(cmpResolver: ComponentFactoryResolver, applicationRef: ApplicationRef);
    showSpinnerOverlay(): void;
    hideSpinnerOverlay(): void;
}
export declare class SpinnerOverlay implements AfterViewInit {
    private element;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
}
