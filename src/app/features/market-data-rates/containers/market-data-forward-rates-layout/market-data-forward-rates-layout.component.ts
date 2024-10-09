import { Component, OnInit, HostBinding, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import * as fromStore from './../../store';


@Component({
  selector: 'app-market-data-forward-rates-layout',
  templateUrl: './market-data-forward-rates-layout.component.html',
  styleUrls: ['./market-data-forward-rates-layout.component.scss']
})
export class MarketDataForwardRatesLayoutComponent implements OnInit, OnDestroy {

  // @HostBinding('class') classes = 'horizontal-flex-full-height';

  @Input() selectedDate: string;

  public centralBankOISRates$: Observable<any[]>;
  public forwardSwapRates$: Observable<any>;
  public oisYEPricing$: Observable<any>;

  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public error$: Observable<string>;

  public centralBankOISRateEntity$: Observable<any>;
  public centralBankOISRateGroups$: Observable<string[]>;
  public centralBankOISRateViewHeight$: Observable<string>;
  public centralBankOISRateGroups: string[];

  public forwardSwapRateEntity$: Observable<any>;
  public forwardSwapRateGroups$: Observable<string[]>;
  public forwardSwapRateViewHeight$: Observable<string>;
  public forwardSwapRateGroups: string[];

  public oisYEPricingEntity$: Observable<any>;
  public oisYEPricingGroups$: Observable<string[]>;
  public oisYEPricingViewHeight$: Observable<string>;
  public oisYEPricingGroups: string[];

  public showStepCharts = false;

  private subscriptions: Subscription[] = [];

  public timestamp$: Observable<string>;
  public devMode$: Observable<boolean>;

  constructor(private store: Store<fromStore.MarketDataRatesState>) { }

  ngOnInit() {
    this.centralBankOISRates$ = this.store.select(fromStore.getCentralBankOISRates);
    this.forwardSwapRates$ = this.store.select(fromStore.getForwardSwapRates);
    this.oisYEPricing$ = this.store.select(fromStore.getOisYEPricing);

    this.loading$ = this.store.select(fromStore.getForwardRateLoadingStatus);
    this.loaded$ = this.store.select(fromStore.getForwardRateLoadedStatus);
    this.error$ = this.store.select(fromStore.getForwardRateError);

    this.centralBankOISRateEntity$ = this.store.select(fromStore.getSelectedDateCentralBankOISRate);
    this.centralBankOISRateGroups$ = this.store.select(fromStore.getSelectedDateCentralBankOISRateGroups);
    this.centralBankOISRateViewHeight$ = this.store.select(fromStore.getSelectedDateCentralBankOISRateViewHeight);

    this.forwardSwapRateEntity$ = this.store.select(fromStore.getSelectedDateForwardSwapRate);
    this.forwardSwapRateGroups$ = this.store.select(fromStore.getSelectedDateForwardSwapRateGroups);
    this.forwardSwapRateViewHeight$ = this.store.select(fromStore.getSelectedDateForwardSwapRateViewHeight);

    this.oisYEPricingEntity$ = this.store.select(fromStore.getSelectedDateOisYEPricing);
    this.oisYEPricingGroups$ = this.store.select(fromStore.getSelectedDateOisYEPricingGroups);
    this.oisYEPricingViewHeight$ = this.store.select(fromStore.getSelectedDateOisYEPricingViewHeight);

    this.subscriptions.push(this.centralBankOISRateGroups$.subscribe(group => {
      this.centralBankOISRateGroups = [...group];
    }));

    this.subscriptions.push(this.forwardSwapRateGroups$.subscribe(group => {
      this.forwardSwapRateGroups = [...group];
    }));

    this.subscriptions.push(this.oisYEPricingGroups$.subscribe(group => {
      this.oisYEPricingGroups = [...group];
    }));

    this.timestamp$ = this.store.select(fromStore.getSelectedDateForwardRatesTimestamp);
    this.devMode$ = this.store.select(fromStore.getDevMode);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public centralBank_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.centralBankOISRateGroups, event.previousIndex, event.currentIndex);
    // this.store.dispatch(new fromStore.UpdateGroupOrder({type: 'centralBankOISRateGroups', result: this.centralBankOISRateGroups}));
  }

  public oisYEPricing_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.oisYEPricingGroups, event.previousIndex, event.currentIndex);
    // this.store.dispatch(new fromStore.UpdateGroupOrder({type: 'oisYEPricingGroups', result: this.oisYEPricingGroups}));
  }

  public forwardSwapRate_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.forwardSwapRateGroups, event.previousIndex, event.currentIndex);
    // this.store.dispatch(new fromStore.UpdateGroupOrder({type: 'forwardSwapRateGroups', result: this.forwardSwapRateGroups}));
  }

  public toggleStepCharts() {
    this.showStepCharts = !this.showStepCharts;
  }

}
