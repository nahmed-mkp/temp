import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-market-data-security-search-timeseries-exporter-layout',
  templateUrl: './market-data-security-search-timeseries-exporter-layout.component.html',
  styleUrls: ['./market-data-security-search-timeseries-exporter-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDataSecuritySearchTimeseriesExporterLayoutComponent implements OnInit {

  @Input() value: string;

  @Output() marketDataSelected: EventEmitter<fromModels.MarketDataForTimeseriesExporter> =
    new EventEmitter<fromModels.MarketDataForTimeseriesExporter>();
  // @Output() userInput: EventEmitter<string> = new EventEmitter<string>();

  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public searchResults$: Observable<fromModels.SecurityForTimeseriesExporter[]>;
  // public error$: Observable<string>;

  constructor(private store: Store<fromStore.MarketDataSearchState>) { }

  ngOnInit() {
    this.loading$ = this.store.select(fromStore.getSecuritySearchResultForTimeseriesExporterLoading);
    this.loaded$ = this.store.select(fromStore.getSecuritySearchResultForTimeseriesExporterLoaded);
    this.searchResults$ = this.store.select(fromStore.getSecuritySearchResultForTimeseriesExporter);
  }

  onSearchMarketData(event: string) {
    this.store.dispatch(new fromStore.SearchSecurityForTimeseriesExporter({
      searchCriteria: event,
      count: 10
    }));
  }

  onSecuritySelected(event) {
    alert(event.value);
    // this.store.dispatch(new fromStore.GetMarketDataForSecurity(event.value.sid));
  }

  onMarketDataSelected(event) {
    this.marketDataSelected.emit(event);
  }

}
