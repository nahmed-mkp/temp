import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as moment from 'moment';

import * as fromModels from './../../models/capitals.models';

@Component({
    selector: 'app-capitals-parameters',
    templateUrl: './capitals-parameters.component.html',
    styleUrls: ['./capitals-parameters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapitalsParametersComponent implements OnInit, OnChanges {

    @Input() input: fromModels.ICapitalInput;
    @Input() fundComplexes: string[];

    @Output() paramChanged: EventEmitter<fromModels.ICapitalInput> = new EventEmitter<fromModels.ICapitalInput>();
    @Output() resetCapitalChanges: EventEmitter<fromModels.ICapitalInput> = new EventEmitter < fromModels.ICapitalInput>();
    @Output() saveCapitalChanges: EventEmitter<fromModels.ICapitalInput> = new EventEmitter<fromModels.ICapitalInput>();

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes && changes.input && changes.input.currentValue) {
        //     
        //     this.paramChanged.emit(changes.input.currentValue);
        // }
    }

    ngOnInit(): void { }


    public onActiveDateChanged(e: MatDatepickerInputEvent<Date>): void {
        this.paramChanged.emit(Object.assign({}, this.input, { 'asOfDate': moment(e.value).format('MM-DD-YYYY') }));
    }

    public onChangeLeverage(e: MatCheckboxChange): void {
        this.paramChanged.emit(Object.assign({}, this.input, { 'useLeverage': e.checked }));
    }

    public onResetChanges(e: any): void {
        this.resetCapitalChanges.emit(Object.assign({}, this.input));
    }

    public getDate(input: fromModels.ICapitalInput): Date {
        if (input) {
            return input && moment(input.asOfDate, 'MM-DD-YYYY', true).toDate();
        }
    }

    public onSaveChanges(e: any): void {
        this.saveCapitalChanges.emit(Object.assign({}, this.input));
    }

    public changeFundComplex(e: any): void {
        // TODO: Pending
    }
}
