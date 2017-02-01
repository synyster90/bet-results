/// <reference types="core-js" />
import { EventEmitter, OnChanges } from '@angular/core';
export declare class PipeCicle implements OnChanges {
    pcLast: boolean;
    pcFinish: EventEmitter<boolean>;
    constructor();
    ngOnChanges(changes: Object): void;
}
