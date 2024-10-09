import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

import * as fromModels from './../../models/tagging.models';

@Component({
    selector: 'app-tagging-params',
    templateUrl: './tagging-params.component.html',
    styleUrls: ['./tagging-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaggingParamsComponent implements OnInit, OnChanges {

    @Input() selectedDateRange: fromModels.IDateRange;

    @Output() dateRangeChanged: EventEmitter<fromModels.IDateRange> = new EventEmitter<fromModels.IDateRange>();
    // @Output() resetChanges: EventEmitter<void> = new EventEmitter<void>();
    // @Output() saveChanges: EventEmitter<void> = new EventEmitter<void>();

    public startDate: Date;
    public endDate: Date;

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.selectedDateRange && changes.selectedDateRange.currentValue) {
            this.startDate = new Date(changes.selectedDateRange.currentValue.startDate);
            this.endDate = new Date(changes.selectedDateRange.currentValue.endDate);
        }
    }

    onStartDateSelected(e: MatDatepickerInputEvent<Date>): void {
        this.startDate = e.value;
        // const payload = Object.assign({}, { 'startDate': moment(e.value).format('MM/DD/YYYY'), 'endDate': this.selectedDateRange.endDate});
        // this.dateRangeChanged.emit(payload);
    }

    onEndDateSelected(e: MatDatepickerInputEvent<Date>): void {
        // const payload = Object.assign({}, { 'startDate': this.selectedDateRange.startDate, 'endDate': moment(e.value).format('MM/DD/YYYY') });
        // this.dateRangeChanged.emit(payload);
        this.endDate = e.value;
    }

    onRun(): void {
        const payload = Object.assign({}, {
            'startDate': moment(this.startDate).format('MM/DD/YYYY'),
            'endDate': moment(this.endDate).format('MM/DD/YYYY')
        });
        this.dateRangeChanged.emit(payload);
    }

    // onResetChanges(): void {
    //     this.resetChanges.emit();
    // }

    // onSaveChanges(): void {
    //     this.saveChanges.emit();
    // }

}
