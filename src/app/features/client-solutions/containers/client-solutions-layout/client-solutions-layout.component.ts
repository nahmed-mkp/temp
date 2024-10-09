import { ChangeDetectionStrategy, Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-client-solutions-layout',
    templateUrl: './client-solutions-layout.component.html',
    styleUrls: ['./client-solutions-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsLayoutComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public funds$: Observable<fromModels.IFund[]>;
    public selectedFund$: Observable<fromModels.IFund>;
    public params$: Observable<fromModels.IReportParameter>;
    public startDate$: Observable<Date>;
    public endDate$: Observable<Date>;

    public benchmarks$: Observable<fromModels.Benchmark[]>;
    public filteredBenchmark$: Observable<any>;

    public refreshDataPendingStatus$: Observable<boolean>;

    constructor(private store: Store<fromStore.State>) {
        this.funds$ = store.select(fromStore.getFunds);
        this.selectedFund$ = store.select(fromStore.getSelectedFund);
        this.params$ = store.select(fromStore.getReportParams);

        this.startDate$ = this.store.select(fromStore.getDateRangeStartDate);
        this.endDate$ = this.store.select(fromStore.getDateRangeEndDate);

        this.benchmarks$ = this.store.select(fromStore.getBenchmarks);
        this.filteredBenchmark$ = this.store.select(fromStore.getFilteredBenchmarks);
        
        this.refreshDataPendingStatus$ = this.store.select(fromStore.getRefreshDataPending);
    }

    ngOnInit(): void { }

    changeParams(params: fromModels.IReportParameter): void {
        this.store.dispatch(new fromStore.ChangeReportParameter(params));
        this.store.dispatch(new fromStore.SelectFund(params.fund));
    }

    public onBenchmarkChanged(benchmarks: fromModels.IBenchmark[]) {
        this.store.dispatch(new fromStore.FilterBenchmarks(benchmarks));
    }
}
