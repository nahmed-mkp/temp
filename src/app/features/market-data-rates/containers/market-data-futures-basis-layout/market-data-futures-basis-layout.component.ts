import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import * as fromStore from '../../store';

@Component({
  selector: 'app-market-data-futures-basis-layout',
  templateUrl: './market-data-futures-basis-layout.component.html',
  styleUrls: ['./market-data-futures-basis-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDataFuturesBasisLayoutComponent implements OnInit, OnDestroy {

  public futuresBasisMonitor$: Observable<any>;
  public futuresBasisMonitorLoading$: Observable<boolean>;
  public futuresBasisMonitorLoaded$: Observable<boolean>;
  public futuresBasisMonitorError$: Observable<string>;

  public basicGroup$: Observable<string[]>;
  public basicEntity$: Observable<any>;
  public cashManagementComparisonEntity$: Observable<any>;
  public deliveryEntity$: Observable<any>;
  public netEntity$: Observable<any>;
  public openInterestEntity$: Observable<any>;

  public selectedPeriod = '3m';

  constructor(private store: Store<fromStore.MarketDataRatesState>) {
    this.futuresBasisMonitor$ = this.store.select(fromStore.getFuturesBasisMonitor);
    this.futuresBasisMonitorLoading$ = this.store.select(fromStore.getFuturesBasisMonitorLoadingStatus);
    this.futuresBasisMonitorLoaded$ = this.store.select(fromStore.getFuturesBasisMonitorLoadingStatus);
    this.futuresBasisMonitorError$ = this.store.select(fromStore.getFuturesBasisMonitorError);

    this.basicGroup$ = this.store.select(fromStore.getFuturesBasis_basicGroup);
    this.basicEntity$ = this.store.select(fromStore.getFuturesBasis_basic);
    this.cashManagementComparisonEntity$ = this.store.select(fromStore.getFuturesBasis_cashManagementComparison);
    this.deliveryEntity$ = this.store.select(fromStore.getFuturesBasis_delivery);
    this.netEntity$ = this.store.select(fromStore.getFuturesBasis_net);
    this.openInterestEntity$ = this.store.select(fromStore.getFuturesBasis_openInterest);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onChangePeriod (lookback: string) {
    this.selectedPeriod = lookback;
  }

}
