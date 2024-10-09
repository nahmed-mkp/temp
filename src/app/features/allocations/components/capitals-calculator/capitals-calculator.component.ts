import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import * as fromModels from './../../models/capitals.models';

@Component({
    selector: 'app-capitals-calculator',
    templateUrl: './capitals-calculator.component.html',
    styleUrls: ['./capitals-calculator.component.scss']
})
export class CapitalsCalculatorComponent implements OnInit, OnChanges {

    @Input() input: fromModels.ICapitalInput;

    @Input() capitalMatrix: any[];
    @Input() capitalMatrixNew: any[];
    @Input() capitalMatrixDiff: any[];

    @Input() capitalMatrixPct: any[];
    @Input() capitalMatrixPctNew: any[];
    @Input() capitalMatrixPctDiff: any[];

    @Input() funds: string[];

    @Input() capitalMatrixLoading: boolean;
    @Input() capitalMatrixLoaded: boolean;
    @Input() capitalMatrixError: string;

    @Input() showPct: boolean;
    @Input() rowHeight: any;

    @Output() resetChanges: EventEmitter<void> = new EventEmitter<void>();
    @Output() changeFundCapital: EventEmitter<any> = new EventEmitter<any>();
    @Output() changeCrossPodCapital: EventEmitter<any> = new EventEmitter<any>();

    @Output() reloadMatrix: EventEmitter<fromModels.ICapitalInput> = new EventEmitter<fromModels.ICapitalInput>();

    public fundPanelOpenState = true;
    public crosspodPanelOpenState = false;
    public podPanelOpenState = false;
    /** Forms **/

    constructor() { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
    }

    public discardChanges(e: any): void {
        if (this.input) {
            this.reloadMatrix.emit(this.input);
        }
    }

    private updateFundCapitals(fundCapitals: any[]): void {
        const filteredFundCapitals = fundCapitals.filter(capital => capital.CrossPodName === null);
        console.log(filteredFundCapitals);
        // this.fundCapitals$.next(filteredFundCapitals);
    }
}
