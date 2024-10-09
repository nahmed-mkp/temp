import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import * as fromModels from '../../models';


@Component({
    selector: 'app-market-data-search',
    templateUrl: './market-data-search-layout.component.html',
    styleUrls: ['./market-data-search-layout.component.scss']
})
export class MarketDataSearchLayoutComponent implements OnInit, OnDestroy {

    @Input() searchContext: string;
    @Output() marketDataSelected: EventEmitter<fromModels.MarketDataSearchResult> =
        new EventEmitter<fromModels.MarketDataSearchResult>();
    @Output() marketDataEntered: EventEmitter<fromModels.MarketDataInput> =
        new EventEmitter<fromModels.MarketDataInput>();

    public providers$: Observable<fromModels.MarketDataProvider[]>;
    public searchCriteria$: Observable<fromModels.MarketDataSearchCriteria>;
    public searchResults$: Observable<fromModels.MarketDataSearchResult[]>;

    public loading$: Observable<boolean>;
    public loaded$: Observable<boolean>;
    public error$: Observable<string>;

    constructor(private store: Store<fromStore.MarketDataSearchState>) {
        this.providers$ = this.store.select(fromStore.getMarketDataSearchProviders);
        this.searchCriteria$ = this.store.select(fromStore.getMarketDataSearchCriteria);
        this.searchResults$ = this.store.select(fromStore.getMarketDataSearchResults);

        this.loading$ = this.store.select(fromStore.getMarketDataSearchLoadingStatus);
        this.loaded$ = this.store.select(fromStore.getMarketDataSearchLoadedStatus);
        this.error$ = this.store.select(fromStore.getMarketDataSearchError);
    }

    ngOnInit(): void {
        this.store.dispatch(new fromStore.LoadProviders());
    }

    ngOnDestroy(): void {
    }

    updateProvider(provider: fromModels.MarketDataProvider): void {
        const newCriteria = Object.assign({}, { text: '', provider: provider.name, context: this.searchContext});
        this.store.dispatch(new fromStore.UpdateCriteria(newCriteria));
    }

    searchMarketData(criteria: fromModels.MarketDataSearchCriteria): void {
        const newCriteria = Object.assign({}, criteria, {context: criteria.context ? criteria.context : this.searchContext});
        this.store.dispatch(new fromStore.SearchMarketData(newCriteria));
    }

    selectMarketData(payload: fromModels.MarketDataSearchResult): void {
        this.marketDataSelected.emit(payload);
    }

    marketDataInput(payload: fromModels.MarketDataInput): void {
        this.marketDataEntered.emit(payload);
    }
}
