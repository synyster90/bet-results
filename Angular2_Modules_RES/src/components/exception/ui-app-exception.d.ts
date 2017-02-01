/// <reference types="core-js" />
import { OnChanges, ElementRef } from '@angular/core';
export declare class ExceptionTable implements OnChanges {
    private exceptionData;
    constructor();
    ngOnChanges(changes: Object): void;
    private getDetail(baMsg);
}
export declare class Exception implements OnChanges {
    private elementRef;
    private isRemovable;
    private isHidden;
    private exception;
    private exceptionChange;
    private exceptionErrors;
    private exceptionWarnings;
    private exceptionMsg;
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: Object): void;
    private toggleTable(id);
    private removePanel(event);
}
