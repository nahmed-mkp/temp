import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'lodash';

import * as moment from 'moment';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { ClientSolutionsRefreshDataDialogLayoutComponent } from '../../containers';

@Component({
    selector: 'app-cs-snapshots-toolbar',
    templateUrl: './client-solutions-snapshots-toolbar.component.html',
    styleUrls: ['./client-solutions-snapshots-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsSnapshotsToolbarComponent implements OnInit, OnChanges {

    @Input() periods: fromModels.ISnapshotPeriod[];

    @Input() funds: fromModels.IFund[];
    @Input() monthEndDates: string[];
    @Input() refreshDataPendingStatus: boolean;

    @Input() param: fromModels.ISnapshotParameter;

    @Output() paramsChanged: EventEmitter<fromModels.ISnapshotParameter> = new EventEmitter<fromModels.ISnapshotParameter>();

    @Input() selectedDate: string;
    @Input() selectedFund: fromModels.IFund;
    @Input() selectedPeriod: fromModels.ISnapshotPeriod;



    public onSelectedBenchmarkChange_debounce: any;

    constructor(private fb: UntypedFormBuilder, private store: Store<fromStore.State>, private dialog: MatDialog) {
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.param && changes.param.currentValue && changes.param.previousValue === undefined && this.periods) {
            this.selectedFund = changes.param.currentValue.fund;
            this.selectedDate = changes.param.currentValue.monthEndDate;
            this.selectedPeriod = this.periods.filter((period) => period.type === changes.param.currentValue).pop() || null;
        }
    }

    changeFund(e: MatSelectChange): void {
        // this.startDate = moment(e.value.inceptionDate);
        // this.paramsChanged.emit({'fund': e.value,
        //     'dateRange': {'startDate': this.startDate.toDate(), 'endDate': this.endDate.toDate()}});
    }

    // public onRun() {
    //     this.paramsChanged.emit({
    //         fund: this.inputForm.get('selectedFund').value,
    //         dateRange: {
    //             startDate: this.inputForm.get('startDate').value,
    //             endDate: this.inputForm.get('endDate').value,
    //         }
    //     });
    // }

    public onFundChanged() {
        this.onParamChanged();
    }

    public onDateChanged() {
        this.onParamChanged();
    }

    public onPeriodChanged() {
        this.onParamChanged();
    }

    public onParamChanged() {
        if (this.selectedFund && this.selectedDate && this.selectedPeriod) {
            this.paramsChanged.emit({
                fund: this.selectedFund,
                monthEndDate: this.selectedDate,
                period: this.selectedPeriod.type
            });
        }
    }

    public onOpenRefreshData() {
        this.dialog.open(ClientSolutionsRefreshDataDialogLayoutComponent, {
                hasBackdrop: false,
                panelClass: ['event-analysis-pop-up-panel'],
                width: '20rem',
                height: '30rem',
            }
        )
    }
}
