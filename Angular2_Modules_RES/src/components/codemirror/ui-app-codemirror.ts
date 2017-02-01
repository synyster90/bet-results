import { Directive, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

import 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';

declare var $: any;
declare var CodeMirror: any

@Directive({
    selector: '[ui-codemirror]'
})
export class Codemirror implements AfterViewInit, OnChanges {
    @Input('cm-options') cmOptions: Object
    @Input() ngModel: string
    @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>()

    private codeMirror

    constructor(private element: ElementRef) { }

    ngAfterViewInit() {
        this.codeMirror = CodeMirror.fromTextArea($(this.element.nativeElement)[0], this.cmOptions);
        this.codeMirror.setValue(this.ngModel)
        if (!this.cmOptions.hasOwnProperty('readOnly')) {
            // Keep the ngModel in sync with changes from CodeMirror
            var $this = this
            this.codeMirror.on('change', function(instance) {
                var newValue = instance.getValue();
                if (newValue !== $this.ngModel)
                    $this.ngModel = newValue
            });
            this.codeMirror.on('focus', event => {
            	$(document).off('keydown')
            })
            this.codeMirror.on('blur', event => {
                this.ngModelChange.emit(this.ngModel)
            })
        }
    }

    ngOnChanges(changes: Object) {
        if (changes.hasOwnProperty('ngModel'))
            if (this.codeMirror && changes['ngModel']['currentValue'])
                this.codeMirror.setValue(changes['ngModel']['currentValue'])
    }
}