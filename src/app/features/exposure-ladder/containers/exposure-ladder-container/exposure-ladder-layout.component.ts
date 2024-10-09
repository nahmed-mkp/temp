import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyTabGroup as MatTabGroup, MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

import * as fromStore from '../../store';

@Component({
  selector: 'app-exposure-ladder-layout',
  templateUrl: './exposure-ladder-layout.component.html',
  styleUrls: ['./exposure-ladder-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExposureLadderLayoutComponent implements OnInit, OnDestroy {

  public activeAsOfDateExposureLadder$: Observable<any>;
  public asofDatesLoadingStatus$: Observable<boolean>;

  public exposureLadderData$: Observable<any>;
  public exposureLadderAsOfDates$: Observable<any>;
  public exposureLadderLoadingStatus$: Observable<boolean>;

  public selectedAsOfDate: string;
  public datesSubscription$: Subscription;

  public timeStamp$: Observable<string>;

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadExposureLadder);
    this.exposureLadderData$ = this.store.select(fromStore.getExposureLadderData);
    this.exposureLadderAsOfDates$ = this.store.select(fromStore.getExposureAsOfDates)    
    this.exposureLadderLoadingStatus$ = this.store.select(fromStore.getExposureLadderLoadingStatus);
  }

  ngOnDestroy(): void {
    if (this.datesSubscription$) {
      this.datesSubscription$.unsubscribe();
    }
  }

}

