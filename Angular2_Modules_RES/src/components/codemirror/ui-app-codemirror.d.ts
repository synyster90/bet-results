/// <reference types="core-js" />
import { EventEmitter, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
export declare class Codemirror implements AfterViewInit, OnChanges {
    private element;
    cmOptions: Object;
    ngModel: string;
    ngModelChange: EventEmitter<string>;
    private codeMirror;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: Object): void;
}
