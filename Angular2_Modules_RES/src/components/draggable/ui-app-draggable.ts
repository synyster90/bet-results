import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

declare var $: any;

@Directive({
    selector: '[ui-draggable]'
})
export class Draggable implements AfterViewInit {
    @Input('ui-draggable') dragTarget: string

    private startPos = {
        x: 0,
        y: 0
    }

    private isDragging: boolean = false

    private hasTopFixed: boolean = false
    private TOP_BOUND: number = 0

    constructor(public element: ElementRef) {
        if ($('top-fixed').length > 0) {
            this.hasTopFixed = true
            this.TOP_BOUND = $('top-fixed').height()
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            var $dragTarget = $(this.element.nativeElement)
            if (this.dragTarget)
                $dragTarget = $(this.dragTarget, this.element.nativeElement)
            $dragTarget.on('mousedown', event => {
                if (!this.isDragging && !$(event.target).is('button')) {
                    this.startPos.x = event.pageX;
                    this.startPos.y = event.pageY;
                    this.isDragging = true;
                    $(document).on('selectstart', event => { return false })
                    if (this.hasTopFixed)
                        $('body').append('<div id="drag-bound" style="position: absolute; width: 100%; height: ' + this.TOP_BOUND + 'px; top: 0; left: 0; z-index: 10001;"></div>')
                }
            });

            $(document).on('mousemove', event => {
                if (this.isDragging) {
                    var newPos = {
                        left: ($(this.element.nativeElement).offset().left + event.pageX - this.startPos.x),
                        top: ($(this.element.nativeElement).offset().top + event.pageY - this.startPos.y)
                    }
                    var viewportWidth = $(window).width();
                    var viewportHeight = $(window).height();
                    var modalWidth = $(this.element.nativeElement).width();
                    var modelHeight = $(this.element.nativeElement).height();

                    $(this.element.nativeElement).offset({
                        left: (newPos.left < 0) ? 0 : ((newPos.left + modalWidth) > viewportWidth ? (viewportWidth - modalWidth) : newPos.left),
                        top: (newPos.top < this.TOP_BOUND) ?
                            this.TOP_BOUND :
                            ((newPos.top + modelHeight - this.TOP_BOUND) > viewportHeight ?
                                (viewportHeight - modelHeight + this.TOP_BOUND) < this.TOP_BOUND ?
                                    this.TOP_BOUND :
                                    (viewportHeight - modelHeight + this.TOP_BOUND) :
                                newPos.top)
                    });

                    this.startPos.x = event.pageX;
                    this.startPos.y = event.pageY;
                }
            });

            $(document).on('mouseup', () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    $(document).off('selectstart')
                    if (this.hasTopFixed)
                        $('#drag-bound').remove()
                }
            })
        }, 100)
    }
}