import { Component, AfterViewInit, ViewChild, ElementRef, ComponentFactoryResolver, ApplicationRef, ViewContainerRef, Injectable, ComponentRef } from '@angular/core';

import './img/gears.gif';

declare var $: any;

@Injectable()
export class SpinnerOverlayService {
    overlay: ComponentRef<SpinnerOverlay>

    constructor(private cmpResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef) { }

    showSpinnerOverlay() {
        setTimeout(() => {
            if ($('spinner-overlay').length == 0) {
                var viewContainerRef: ViewContainerRef = this.applicationRef['_rootComponents'][0].instance.viewContainerRef;
                this.overlay = viewContainerRef.createComponent(this.cmpResolver.resolveComponentFactory(SpinnerOverlay), 0)
            }
        })
    }

    hideSpinnerOverlay() {
        setTimeout(() => {
            this.overlay.destroy()
        })
    }

}

@Component({
    selector: 'spinner-overlay',
    template: '<div class="overlay"></div><div class="spinner-container"><img src="dist/assets/@angular/modules/src/http-client/img/gears.gif"/></div>'
})
export class SpinnerOverlay implements AfterViewInit {

    constructor(private element: ElementRef) { }

    ngAfterViewInit() {
        $(this.element.nativeElement).find('div.overlay').css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            backgroundColor: 'grey',
            opacity: 0.6,
            '-webkit-filter': 'blur(1.5px)',
            '-moz-filter': 'blur(1.5px)',
            '-ms-filter': 'blur(1.5px)',
            '-o-filter': 'blur(1.5px)',
            filter: 'blur(1.5px)'
        });
        $(this.element.nativeElement).find('div.spinner-container').css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '90px',
            height: '90px',
            marginTop: '-45px',
            marginLeft: '-45px',
            padding: '10px',
            zIndex: 1001,
            backgroundColor: '#fff',
            borderRadius: '15px',
            opacity: 0.7,
            '-webkit-filter': 'blur(1.5px)',
            '-moz-filter': 'blur(1.5px)',
            '-ms-filter': 'blur(1.5px)',
            '-o-filter': 'blur(1.5px)',
            filter: 'blur(1.5px)'
        });
    }
}