import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import * as fromModels from './../../models/timeseries.models';

@Component({
    selector: 'app-timeseries-search-layout',
    templateUrl: './timeseries-search-layout.component.html',
    styleUrls: ['./timeseries-search-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesSearchLayoutComponent implements OnInit {

    public selectedTimeseries: fromModels.ITimeseries[];

    constructor(public dialogRef: MatDialogRef<TimeseriesSearchLayoutComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.selectedTimeseries = [];
        }

    ngOnInit(): void { }


    searchTimeseries(search: fromModels.ITimeseriesSearch): void {
        console.log(search);
    }

    onCloseClick(event: any): void {
        if (event === 'apply') {
            this.dialogRef.close(this.selectedTimeseries);
        } else {
            this.dialogRef.close();
        }
    }
}
