import { Component, OnInit, HostBinding, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import * as fromStore from '../../store';

@Component({
  selector: 'app-market-data-qe-forecast-layout',
  templateUrl: './market-data-qe-forecast-layout.component.html',
  styleUrls: ['./market-data-qe-forecast-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDataQEForecastLayoutComponent implements OnInit, OnDestroy {

  public OISQEForecastEntity$: Observable<any>;
  public OISQEForecastGroups$: Observable<string[]>;
  public OISQEForecastViewHeight$: Observable<string>;
  public OISQEForecastGroups: string[];

  public generalGroups: string[] = [];

  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public error$: Observable<string>;

  public timestamp$: Observable<string>;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store<fromStore.MarketDataRatesState>) { }

  ngOnInit() {

    this.OISQEForecastEntity$ = this.store.select(fromStore.getSelectedDateOisQEForecast);
    this.OISQEForecastGroups$ = this.store.select(fromStore.getSelectedDateOisQEForecastGroups);
    this.OISQEForecastViewHeight$ = this.store.select(fromStore.getSelectedDateOisQEForecastViewHeight);

    this.loading$ = this.store.select(fromStore.getForwardRateLoadingStatus);
    this.loaded$ = this.store.select(fromStore.getForwardRateLoadedStatus);
    this.error$ = this.store.select(fromStore.getForwardRateError);

    this.timestamp$ = this.store.select(fromStore.getSelectedDateForwardRatesTimestamp);

    this.subscriptions.push(this.OISQEForecastGroups$.subscribe(group => {
      this.OISQEForecastGroups = [...group];
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
