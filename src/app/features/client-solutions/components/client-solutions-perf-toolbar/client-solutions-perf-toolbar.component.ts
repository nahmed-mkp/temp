import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'lodash';

import * as moment from 'moment';
import { Store } from '@ngrx/store';

import * as fromModels from './../../models';
import * as fromStore from './../../store';
import { ClientSolutionAddReturnLayoutDialogComponent } from '../../containers/client-solution-add-return-layout-dialog/client-solution-add-return-layout-dialog.component';
import { ClientSolutionsRefreshDataDialogLayoutComponent } from '../../containers';

@Component({
    selector: 'app-cs-perf-toolbar',
    templateUrl: './client-solutions-perf-toolbar.component.html',
    styleUrls: ['./client-solutions-perf-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsPerfToolbarComponent implements OnInit, OnChanges {

    @Input() funds: fromModels.IFund[];
    @Output() paramsChanged: EventEmitter<fromModels.IReportParameter> = new EventEmitter<fromModels.IReportParameter>();

    @Input() startDate: Date;
    @Input() endDate: Date;
    @Input() selectedFund: fromModels.IFund;

    @Input() refreshDataPendingStatus: boolean;

    @Input() benchmarks: fromModels.Benchmark[];
    @Input() selectedBenchmark: any;
    @Output() benchmarkChanged: EventEmitter<fromModels.Benchmark[]> = new EventEmitter<fromModels.Benchmark[]>();

    public onSelectedBenchmarkChange_debounce: any;

    // public startDate = new Date();
    // public endDate = new Date();

    // public inputForm = this.fb.group({
    //     selectedFund: [ this.selectedFund , Validators.required],
    //     startDate: [this.startDate, Validators.required],
    //     endDate: [this.endDate, Validators.required]
    // });

    constructor(private fb: UntypedFormBuilder, private store: Store<fromStore.State>, private dialog: MatDialog) { 
        this.onSelectedBenchmarkChange_debounce = _.debounce(this.onSelectedBenchmarkChange.bind(this), 1000);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedFund && changes.selectedFund.currentValue && changes.selectedFund.previousValue === undefined) {
            setTimeout(() => this.onRun(), 200);
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
        if (this.selectedFund) {
            this.startDate = new Date(this.selectedFund.inceptionDate);
            setTimeout(() => this.onRun(), 200);
        }
    }

    // public onDateChange() {
    //     console.log('store', this.store);
    //     this.store.dispatch(new fromStore.SelectFund(null));
    // }

    public onRun() {
        this.paramsChanged.emit({
            fund: this.selectedFund,
            dateRange: {
                startDate: this.startDate,
                endDate: this.endDate,
            }
        });
    }

    public onOpenAddReturn() {
        this.dialog.open(ClientSolutionAddReturnLayoutDialogComponent, {
                hasBackdrop: false,
                panelClass: ['event-analysis-pop-up-panel'],
                width: '30rem',
                height: '17rem',
            }
        )
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

    private onSelectedBenchmarkChange() {
        console.log('benchmark change', this.selectedBenchmark);
        this.benchmarkChanged.emit([...this.selectedBenchmark]);
    }
}
