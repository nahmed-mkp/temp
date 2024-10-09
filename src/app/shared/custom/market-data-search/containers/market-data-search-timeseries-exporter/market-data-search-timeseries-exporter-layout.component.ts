import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-market-data-search-timeseries-exporter-layout',
  templateUrl: './market-data-search-timeseries-exporter-layout.component.html',
  styleUrls: ['./market-data-search-timeseries-exporter-layout.component.scss']
})
export class MarketDataSearchTimeseriesExporterLayoutComponent implements OnInit {

  @Input() value: string;

  @Output() marketDataSelected: EventEmitter<fromModels.MarketDataForTimeseriesExporter> =
  new EventEmitter<fromModels.MarketDataForTimeseriesExporter>();
  // @Output() userInput: EventEmitter<string> = new EventEmitter<string>();

  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public searchResults$: Observable<fromModels.MarketDataForTimeseriesExporter[]>;
  // public error$: Observable<string>;

  constructor(private store: Store<fromStore.MarketDataSearchState>) { }

  ngOnInit() {
    this.loading$ = this.store.select(fromStore.getSearchResultForTimeseriesExporterLoading);
    this.loaded$ = this.store.select(fromStore.getSearchResultForTimeseriesExporterLoaded);
    this.searchResults$ = this.store.select(fromStore.getSearchResultForTimeseriesExporter);
  }

  onSearchMarketData(event: string) {
    this.store.dispatch(new fromStore.SearchMarketDataForTimeseriesExporter({
      searchCriteria: event,
      priceSource: 'Bloomberg',
      count: 10
    }));
  }

  onMarketDataSelected(event) {
    this.marketDataSelected.emit(event);
  }

}
