import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

import * as fromStore from '../../store';



@Component({
  selector: 'app-market-data-rates-tab-layout',
  templateUrl: './market-data-rates-tab-layout.component.html',
  styleUrls: ['./market-data-rates-tab-layout.component.scss']
})
export class MarketDataRatesTabLayoutComponent implements OnInit {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  public selectedDate$: Observable<Date>;
  // public displayMode: 'Forward Rates' | 'Curves' | 'Par Rates' | 'Futures Basis' | 'Q/E Forecasts' | string = 'Forward Rates';
  public displayMode: 'Forward Rates' | 'Curves' | 'Futures Basis' | 'Q/E Forecasts' | string = 'Forward Rates';
  public layoutMode: 'compact' | 'spread';
  public devMode$: Observable<boolean>;

  constructor(private store: Store<fromStore.MarketDataRatesState>) { }

  ngOnInit() {
    this.devMode$ = this.store.select(fromStore.getDevMode);
    this.selectedDate$ = this.store.select(fromStore.getSelectedDate);
    this._onLoadData();
  }

  // Event -----------------------------

  public onTabChanged(event: MatTabChangeEvent) {
    this.displayMode = event.tab.textLabel;
    this._onLoadData();
  }

  public sendNewSelectedDate(event) {
    this.store.dispatch(new fromStore.SetSelectiveDate(event));
    this._onLoadData();
  }

  public onSetLayoutMode(event) {
    this.store.dispatch(new fromStore.SetLayoutMode(event));
  }

  public changeMode(event) {
    this.store.dispatch(new fromStore.ToggleDevMode);
    this._onLoadData();
  }

  // Utility --------------------------------

  private _onLoadData() {
    if (this.displayMode === 'Forward Rates' || this.displayMode === 'Q/E Forecasts') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadForwardRatesPreprocess()), 100);
    }

    if (this.displayMode === 'Inflation Swaps') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadInflationSwaps()), 100);
      setTimeout(() => this.store.dispatch(new fromStore.LoadInflationSwapsDataPoints()), 100);
    }

    if (this.displayMode === 'Curves') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadCurvePreprocess()), 100);
    }

    // if (this.displayMode === 'Par Rates') {
    //   setTimeout(() => this.store.dispatch(new fromStore.LoadParRatePreprocess()), 100);
    // }

    if (this.displayMode === 'Futures Basis') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadFuturesBasisMonitor()), 100);
    }
  }

  // private _onLoadForwardRatesData() {
  //   this.store.dispatch(new fromStore.LoadForwardRates())
  // }

  // private _onLoadCurveData() {
  //   this.store.dispatch(new fromStore.LoadForwardRates())
  // }

}
