import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cs-fund-performance-layout',
    templateUrl: './fund-performance-layout.component.html',
    styleUrls: ['./fund-performance-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundPerformanceLayoutComponent implements OnInit, OnChanges {

    @Input() params: fromModels.IReportParameter;

    public fundStatistic$: Observable<fromModels.IStatistics[]>;
    public fundStatisticLoading$: Observable<boolean>;
    public fundStatisticViewHeight$: Observable<string>;

    public benchmarks$: Observable<fromModels.Benchmark[]>;
    public benchmarkCodeMap$: Observable<any>;

    public correlations$: Observable<fromModels.ICorrelation[]>;
    public correlationsLoading$: Observable<boolean>;
    public correlationsViewHeight$: Observable<string>;

    public timeseries$: Observable<any[]>;
    public timeseriesLoading$: Observable<boolean>;

    public drawdown$: Observable<any[]>;
    public drawdownLoading$: Observable<boolean>;

    public histogram$: Observable<fromModels.IHistogram[]>;
    public histogramLoading$: Observable<boolean>;

    public alphaBetaStats$: Observable<fromModels.IAlphaBetaStats[]>;
    public alphaBetaStatsLoading$: Observable<boolean>;

    public rawReturns$: Observable<any[]>;
    public rawReturnsLoading$: Observable<boolean>;
    public rawReturnsViewHeight$: Observable<string>;

    public fundEntity$: Observable<{[id: string]: fromModels.IFund}>;
    
    public filteredBenchmark$: Observable<fromModels.IBenchmark[]>;

    constructor(private store: Store<fromStore.State>) { }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.params && changes.params.currentValue) { 
            // dispatch events to change the fund performance
            this.store.dispatch(new fromStore.LoadRawReturns(changes.params.currentValue));
        }
    }

    ngOnInit(): void {
        this.fundEntity$ = this.store.select(fromStore.getFundEntities);

        this.benchmarks$ = this.store.select(fromStore.getBenchmarks);
        this.benchmarkCodeMap$ = this.store.select(fromStore.getBenchMarksCodeMap);

        this.fundStatistic$ = this.store.select(fromStore.getStatistics);
        this.fundStatisticLoading$ = this.store.select(fromStore.getFundStatisticsLoading);
        this.fundStatisticViewHeight$ = this.store.select(fromStore.getStatisticsViewHeight);

        this.correlations$ = this.store.select(fromStore.getFundCorrelation);
        this.correlationsLoading$ = this.store.select(fromStore.getFundCorrelationLoading);
        this.correlationsViewHeight$ = this.store.select(fromStore.getFundCorrelationViewHeight);

        this.timeseries$ = this.store.select(fromStore.getFundTimeseries);
        this.timeseriesLoading$ = this.store.select(fromStore.getFundTimeseriesLoading);

        this.drawdown$ = this.store.select(fromStore.getFundDrawdownValue);
        this.drawdownLoading$ = this.store.select(fromStore.getFundDrawdownloading);

        this.histogram$ = this.store.select(fromStore.getFundHistogram);
        this.histogramLoading$ = this.store.select(fromStore.getFundHistogramLoading);

        this.alphaBetaStats$ = this.store.select(fromStore.getAlphaBeta);
        this.alphaBetaStatsLoading$ = this.store.select(fromStore.getAlphaBetaLoading);

        this.rawReturns$ = this.store.select(fromStore.getFundRawReturns);
        this.rawReturnsLoading$ = this.store.select(fromStore.getFundRawReturnsLoading);
        this.rawReturnsViewHeight$ = this.store.select(fromStore.getFundRawReturnsViewHeight);

        this.filteredBenchmark$ = this.store.select(fromStore.getFilteredBenchmarks);
    }
}
