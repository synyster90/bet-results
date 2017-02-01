import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

declare var $: any;

@Directive({
    selector: 'textarea[autosize-textarea]'
})
export class AutosizeTextarea implements OnInit {
    @HostListener('input', ['$event.target'])
    onInput(textArea) {
        this.adjust();
    }
    
    private maxHeight: number
    
    constructor(public element: ElementRef) { }
    
    ngOnInit() {
    	this.maxHeight = $(this.element.nativeElement).css('max-height').replace('px', '')
        this.adjust();
    }
    
    private adjust() {
        this.element.nativeElement.style.height = 'auto';
        
    	var newHeight = (this.element.nativeElement.scrollHeight + 1)
        this.element.nativeElement.style.height = newHeight + "px";
        this.element.nativeElement.style.overflowY = (newHeight > this.maxHeight) ? 'scroll' : 'hidden';
    }
}