import { Component, Injectable, AfterViewInit, ComponentFactoryResolver, ApplicationRef, ViewContainerRef, ElementRef, ComponentRef } from '@angular/core';

declare var $: any;

@Injectable()
export class OverlayService {
    private overlayComp: ComponentRef<Overlay>

    constructor(private cmpResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef) { }

    showPopoverOverlay(clickCallback) {
        if ($('overlay').length == 0) {
            setTimeout(() => {
                var viewContainerRef: ViewContainerRef = this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
                this.overlayComp = viewContainerRef.createComponent(this.cmpResolver.resolveComponentFactory(Overlay), 0)
                $(this.overlayComp.location.nativeElement).on('click', event => {
                    clickCallback();
                    this.hidePopoverOverlay();
                });
            })
        }
    }

    hidePopoverOverlay() {
        this.overlayComp.destroy()
    }

}

@Component({
    selector: 'overlay',
    template: ''
})
export class Overlay implements AfterViewInit {
    constructor(private element: ElementRef) { }

    ngAfterViewInit() {
        $(this.element.nativeElement).css({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '90',
            opacity: '0'
        });
    }
}