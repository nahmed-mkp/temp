import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

@Component({
    selector: 'app-tradename-helper-layout',
    templateUrl: './tradename-helper-layout.component.html',
    styleUrls: ['./tradename-helper-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameHelperLayoutComponent implements OnInit {

    public taxLots$: Observable<fromModels.ITaxLot[]>;
    public taxLotsLoading$: Observable<boolean>;
    public taxLotsLoaded$: Observable<boolean>;
    public taxLotsError$: Observable<string>;

    public tradeNames$: Observable<fromModels.ITradeName[]>;
    public tradeNamesLoading$: Observable<boolean>;
    public tradeNamesLoaded$: Observable<boolean>;
    public tradeNamesError$: Observable<string>;

    public tradeNameCounters$: Observable<fromModels.ITradeNameCounter[]>;
    public tradeNameCountersLoading$: Observable<boolean>;
    public tradeNameCountersLoaded$: Observable<boolean>;
    public tradeNameCountersError$: Observable<string>;

    constructor(private store: Store<fromStore.TradeNameHelperState>) {
        this.taxLots$ = this.store.select(fromStore.getTaxLots);
        this.taxLotsLoading$ = this.store.select(fromStore.getTaxLotsLoading);
        this.taxLotsLoaded$ = this.store.select(fromStore.getTaxLotsLoaded);
        this.taxLotsError$ = this.store.select(fromStore.getTaxLotsError);

        this.tradeNames$ = this.store.select(fromStore.getTradeNames);
        this.tradeNamesLoading$ = this.store.select(fromStore.getTradeNamesLoading);
        this.tradeNamesLoaded$ = this.store.select(fromStore.getTradeNamesLoaded);
        this.tradeNamesError$ = this.store.select(fromStore.getTradeNamesError);

        this.tradeNameCounters$ = this.store.select(fromStore.getTradeNameCountersWithTaxLots);
        this.tradeNameCountersLoading$ = this.store.select(fromStore.getTradeNameCountersLoading);
        this.tradeNameCountersLoaded$ = this.store.select(fromStore.getTradeNameCountersLoaded);
        this.tradeNameCountersError$ = this.store.select(fromStore.getTradeNameCountersError);
    }

    ngOnInit(): void { }

    public onSelectedTabChange(event: MatTabChangeEvent) {
        const activeTab = event.tab.textLabel;
        switch (activeTab) {
            case 'Open Taxlots':
                this.store.dispatch(new fromStore.LoadTaxlots());
                break;
            case 'All Tradenames':
                this.store.dispatch(new fromStore.LoadAllTradeNames());
                break;
            case 'Most Recent TradeNames':
                this.store.dispatch(new fromStore.LoadTradeNameCounters());
                break;
        }
    }

    public reinstateTradeName(tradeName: fromModels.ITradeName): void {
        this.store.dispatch(new fromStore.ReinstateTradeName(tradeName));
    }

    public changeTradeName(tradeName: fromModels.ITradeName): void {
        if (tradeName.NewTradeName !== null && tradeName.NewTradeName !== tradeName.TradeName) {
            this.store.dispatch(new fromStore.UpdateTradeName(tradeName));
        }
    }
}
