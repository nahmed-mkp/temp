import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import * as fromStore from './../../store';

@Component({
  selector: 'app-market-data-par-rate-layout',
  templateUrl: './market-data-par-rate-layout.component.html',
  styleUrls: ['./market-data-par-rate-layout.component.scss']
})
export class MarketDataParRateLayoutComponent implements OnInit, OnDestroy {

  public spreadEntity$: Observable<any>;
  public spreadViewHeight$: Observable<string>;
  public spreadGroups: string[] = [];

  public swapEntity$: Observable<any>;
  public swapViewHeight$: Observable<string>;
  public swapGroups: string[] = [];

  public treasuryEntity$: Observable<any>;
  public treasuryViewHeight$: Observable<string>;
  public treasuryGroups: string[] = [];

  public generalGroups: string[] = [];

  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public error$: Observable<string>;

  public timestamp$: Observable<string>;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store<fromStore.MarketDataRatesState>) { }

  ngOnInit() {
    this.spreadEntity$ = this.store.select(fromStore.getSelectedDateSpread);
    this.spreadViewHeight$ = this.store.select(fromStore.getSelectedDateSpreadViewHeight);
    this.subscriptions.push(this.store.select(fromStore.getSelectedDateSpreadGroups).subscribe(groups => {
      this.spreadGroups = [...groups];
      this.generalGroups = [...groups];    // Assumption: all three caterogry has the same exact number of groups;
    }));

    this.swapEntity$ = this.store.select(fromStore.getSelectedDateSwap);
    this.swapViewHeight$ = this.store.select(fromStore.getSelectedDateSwapViewHeight);
    this.subscriptions.push(this.store.select(fromStore.getSelectedDateSwapGroups).subscribe(groups => {
      this.swapGroups = [...groups];
    }));

    this.treasuryEntity$ = this.store.select(fromStore.getSelectedDateTreasury);
    this.treasuryViewHeight$ = this.store.select(fromStore.getSelectedDateTreasuryViewHeight);
    this.subscriptions.push(this.store.select(fromStore.getSelectedDateTreasuryGroups).subscribe(groups => {
      this.treasuryGroups = [...groups];
    }));

    this.loading$ = this.store.select(fromStore.getParRateLoadingStatus);
    this.loaded$ = this.store.select(fromStore.getParRateLoadedStatus);
    this.error$ = this.store.select(fromStore.getParRateError);

    this.timestamp$ = this.store.select(fromStore.getSelectedDateParRateTimeStamp);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public treasury_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.treasuryGroups, event.previousIndex, event.currentIndex);
  }

  public swap_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.swapGroups, event.previousIndex, event.currentIndex);
  }

  public spread_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.spreadGroups, event.previousIndex, event.currentIndex);
  }

  public general_drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.generalGroups, event.previousIndex, event.currentIndex);
  }

}
