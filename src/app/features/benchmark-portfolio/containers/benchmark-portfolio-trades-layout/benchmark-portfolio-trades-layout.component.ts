import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models/trades.models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-benchmark-portfolio-trades-layout',
    templateUrl: './benchmark-portfolio-trades-layout.component.html',
    styleUrls: ['./benchmark-portfolio-trades-layout.component.scss']
})
export class BenchmarkPortfolioTradesLayoutComponent implements OnInit {

    public activeTab = 'fx';

    public tradeDates$: Observable<string[]>;
    public tradeDatesLoading$: Observable<boolean>;
    public tradeDatesLoaded$: Observable<boolean>;
    public tradeDatesError$: Observable<string>;

    public selectedTradeDate$: Observable<string>;

    public fxTrades$: Observable<fromModels.IFXTrade[]>;
    public fxTradesLoading$: Observable<boolean>;
    public fxTradesLoaded$: Observable<boolean>;
    public fxTradesError$: Observable<string>;

    private selectedbatchId: string;

    constructor(public store: Store<fromStore.BenchmarkPortfolioState>) {

        this.tradeDates$ = store.select(fromStore.getBenchmarkPortfolioTradeDates);
        this.tradeDatesLoading$ = store.select(fromStore.getBenchmarkPortfolioTradeDatesLoadingStatus);
        this.tradeDatesLoaded$ = store.select(fromStore.getBenchmarkPortfolioTradeDatesLoadedStatus);
        this.tradeDatesError$ = store.select(fromStore.getBenchmarkPortfolioTradeDatesError);

        this.selectedTradeDate$ = store.select(fromStore.getBenchmarkPortfolioSelectedTradeDate);

        this.fxTrades$ = store.select(fromStore.getBenchmarkPortfolioFXTrades);
        this.fxTradesLoading$ = store.select(fromStore.getBenchmarkPortfolioFXTradesLoadingStatus);
        this.fxTradesLoaded$ = store.select(fromStore.getBenchmarkPortfolioFXTradesLoadedStatus);
        this.fxTradesError$ = store.select(fromStore.getBenchmarkPortfolioFXTradesError);
    }

    ngOnInit(): void { }

    changeTradeDate(tradeDate: string) {
        this.store.dispatch(new fromStore.LoadFXTrades(tradeDate));
    }

    loadFXTrades(trades: fromModels.IFXTrade[]): void {
        if (trades.length > 0) {
            const tradeDate = trades[0].tradeDate;
            this.store.dispatch(new fromStore.LoadFXTrades(tradeDate));
        }
    }

    onActiveTabChange(activeTab: string) {
        this.activeTab = activeTab;
    }

    onSelectedBatchId(batchId: string) {
        console.log('onSelectedbatchId', batchId);
        this.selectedbatchId = batchId;
    }

    onSendFxTrades() {
        this.store.dispatch(new fromStore.SendFXTradesToCRD(this.selectedbatchId));
        this.selectedbatchId = undefined;
    }
}
