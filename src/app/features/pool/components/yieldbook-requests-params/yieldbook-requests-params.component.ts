import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { UntypedFormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as moment from 'moment';
import * as fromModels from '../../models/yieldbook.models';


@Component({
    selector: 'app-yieldbook-requests-params',
    templateUrl: './yieldbook-requests-params.component.html',
    styleUrls: ['./yieldbook-requests-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YieldbookRequestsParamsComponent implements OnInit {

    @Input() asOfDate: string;

    @Output() dateSelected: EventEmitter<string> = new EventEmitter<string>();
    @Output() resetSession: EventEmitter<void> = new EventEmitter<void>();

    date = new UntypedFormControl(new Date());

    constructor() { }

    ngOnInit(): void { }

    getDate(): Date {
        return (this.asOfDate !== undefined) ? moment(this.asOfDate).toDate() : new Date();
    }

    dateChanged(event: MatDatepickerInputEvent<Date>): void {
        this.dateSelected.emit(moment(event.value).format('MM-DD-YYYY'));
    }

    reset(): void {
        this.resetSession.emit();
    }
}
