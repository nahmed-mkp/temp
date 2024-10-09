import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-tbareports-parser-steps',
    templateUrl: './parser-steps.component.html',
    styleUrls: ['./parser-steps.component.scss']
})
export class ParserStepsComponent implements OnInit {

    @Input() steps: fromModels.Step[];
    @Input() currentStep: fromModels.Step;

    @Output() onUpdateStep: EventEmitter<fromModels.Step>  = new EventEmitter<fromModels.Step>();

    constructor() { }

    ngOnInit() { }

    public updateStep(e: any): void {
        const selectedSteps = this.steps.filter((step: fromModels.Step) => step.name === e.target.innerText);
        if (selectedSteps.length > 0) {
            this.onUpdateStep.emit(selectedSteps[0]);
        }
        e.preventDefault();
    }
}
