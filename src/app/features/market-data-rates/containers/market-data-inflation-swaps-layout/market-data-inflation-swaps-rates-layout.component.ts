import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import * as fromStore from '../../store';

@Component({
  selector: 'app-market-data-inflation-swaps-rates-layout',
  templateUrl: './market-data-inflation-swaps-rates-layout.component.html',
  styleUrls: ['./market-data-inflation-swaps-rates-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDataInflationSwapsLayoutComponent implements OnInit, OnDestroy {

  public inflationSwaps$: Observable<any>;
  public inflationSwapsLoading$: Observable<boolean>;
  public inflationSwapsLoaded$: Observable<boolean>;
  public inflationSwapsError$: Observable<string>;

  public inflationSwapsDataPoints$: Observable<any>;
  public inflationSwapsDataPointsLoading$: Observable<boolean>;
  public inflationSwapsDataPointsLoaded$: Observable<boolean>;
  public inflationSwapsDataPointsError$: Observable<string>;

  constructor(private store: Store<fromStore.MarketDataRatesState>) {
    this.inflationSwaps$ = this.store.select(fromStore.getInflationSwapsData);
    this.inflationSwapsLoading$ = this.store.select(fromStore.getInflationSwapsLoadingStatus);
    this.inflationSwapsLoaded$ = this.store.select(fromStore.getInflationSwapsLoadingStatus);
    this.inflationSwapsError$ = this.store.select(fromStore.getInflationSwapsError);

    this.inflationSwapsDataPoints$ = this.store.select(fromStore.getInflationSwapsDataPoints);
    this.inflationSwapsDataPointsLoading$ = this.store.select(fromStore.getInflationSwapsDataPointsLoadingStatus);
    this.inflationSwapsDataPointsLoaded$ = this.store.select(fromStore.getInflationSwapsDataPointsLoadingStatus);
    this.inflationSwapsDataPointsError$ = this.store.select(fromStore.getInflationSwapsDataPointsError);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
