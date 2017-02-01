import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'ui-popover',
    template: '<button type="button" class="btn btn-default" data-toggle="popover"><ng-content></ng-content></button>'
})
export class Popover implements AfterViewInit {
    @Input() private title: string
    @Input() private content: string

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        $('button', this.elementRef.nativeElement).popover({
            title: this.title,
            content: this.content,
            placement: 'left',
            trigger: 'manual',
            html: true
        })
        var $this = this
        $('button', this.elementRef.nativeElement).on('click', function() {
            $(this).popover('toggle')
        })

        $('button', this.elementRef.nativeElement).on('blur', function() {
            try {
                if (!$.contains($('div.popover', $this.elementRef.nativeElement)[0], $(':focus')[0]) && !$(':focus').is($('div.popover', $this.elementRef.nativeElement)))
                    $(this).popover('hide')
                else
                    $(this).focus()
            } catch (e) {
                $(this).popover('hide')
            }
        })
    }
}