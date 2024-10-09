import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from '../../models';


@Component({
    selector: 'app-tbareports-parser-actions',
    templateUrl: './parser-actions.component.html',
    styleUrls: ['./parser-actions.component.scss']
})
export class ParserActionsComponent implements OnInit {

    @Output() onNextStep: EventEmitter<void> = new EventEmitter<void>();
    @Output() onPrevStep: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    public prevStep(): void {
        this.onPrevStep.emit();
    }

    public nextStep(): void {
        this.onNextStep.emit();
    }

}
