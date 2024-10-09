import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-market-data-layout',
    templateUrl: './market-data-layout.component.html',
    styleUrls: ['./market-data-layout.component.scss']
})
export class MarketDataLayoutComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';


    // Select Element Chart title
    public title: string;
    public subtitle: string;
    public seriesName: string;

    // Data

    public searchCriteria$: Observable<fromModels.IMarketDataSearch>;
    public searchResults$: Observable<any[]>;

    // public marketDataPriceSource$: Observable<any[]>;
    // public marketDataPriceSourceLoading$: Observable<boolean>;

    public selectedDateType: any;
    public selectedSecurity: any;
    
    public marketDataDetails$: Observable<any[]>;
    public marketDataDetailsLoading$: Observable<boolean>;

    public marketDataTypes$: Observable<any[]>;
    public marketDataTypeLoading$: Observable<boolean>;

    public marketDataTimeseries$: Observable<any[]>;
    public marketDataTimeseriesLoading$: Observable<boolean>;


    constructor(private store: Store<fromStore.MarketDataState>) {
        this.searchCriteria$ = this.store.select(fromStore.getMarketDataSearchCriteria);
        this.searchResults$ = this.store.select(fromStore.getMarketDataSearchResults);
    }

    ngOnInit(): void { 
        // this.store.dispatch(new fromStore.LoadMarketDataPriceSource);
        // this.marketDataPriceSource$ = this.store.select(fromStore.getMarketDataPriceSource);
        // this.marketDataPriceSourceLoading$ = this.store.select(fromStore.getMarketDataPriceSourceLoading);

        this.marketDataDetails$ = this.store.select(fromStore.getMarketDataDetail);
        this.marketDataDetailsLoading$ = this.store.select(fromStore.getMarketDataDetailLoading);

        this.marketDataTypes$ = this.store.select(fromStore.getMarketDataType);
        this.marketDataTypeLoading$ = this.store.select(fromStore.getMarketDataTypeLoading);

        this.marketDataTimeseries$ = this.store.select(fromStore.getMarketDataTimeseries);
        this.marketDataTimeseriesLoading$ = this.store.select(fromStore.getMarketDataTimeseriesLoading);

    }

    searchMarketData(search: fromModels.IMarketDataSearch): void {
        this.store.dispatch(new fromStore.SearchMarketData(search));
    }

    public onSelectedSecurity(event) {
        this.selectedSecurity = event;
        console.log('selected Security', event);
        this.store.dispatch(new fromStore.LoadMarketDataDetail({sid: this.selectedSecurity && this.selectedSecurity['SID']}));
        this.store.dispatch(new fromStore.LoadMarketDataType(this.selectedSecurity && this.selectedSecurity['SID']));
    }


    public onSelectedMarketDataType() {
        this.store.dispatch(new fromStore.LoadMarketDataDetail({
            sid: this.selectedSecurity['SID'],
            mdid: this.selectedDateType['MDID']
        }));
    }

    public onLoadMarketDataTimeseries(event: any) {
        this.store.dispatch(new fromStore.LoadMarketDataTimeseries(event['MDID']));

        this.title = event['Name'] + ' ' + event['Type'];
        this.subtitle = `Bloomberg Ticker: ${event['BloombergTicker']} | Bloomberg Field: ${event['BloombergField']} | PriceSource: ${event['PriceSource']}`;
        this.seriesName = event['Type'];
    }

    public onLoadData() {
        if (this.selectedDateType) {
            this.store.dispatch(new fromStore.LoadMarketDataDetail({
                sid: this.selectedSecurity['SID'],
                mdid: this.selectedDateType['MDID']
            }));
        } else {
            this.store.dispatch(new fromStore.LoadMarketDataDetail({
                sid: this.selectedSecurity['SID'],
            }));
        }
    }
}
