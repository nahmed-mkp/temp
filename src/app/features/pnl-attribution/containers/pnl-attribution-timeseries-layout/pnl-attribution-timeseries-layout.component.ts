import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';


@Component({
  selector: 'app-pnl-attribution-timeseries-layout',
  templateUrl: './pnl-attribution-timeseries-layout.component.html',
  styleUrls: ['./pnl-attribution-timeseries-layout.component.scss']
})
export class PnlAttributionTimeseriesLayoutComponent implements OnInit, OnDestroy {

  @Input() guid: string;
  @Input() layoutName: string;
  
  public displayMode: 'plot' | 'grid' = 'plot'
  public darkTheme = false;

  public attributionTimeseriesData$: Observable<any>;
  public attributionTimeseriesLoading$: Observable<any>;
  public attributionTimeseriesLoaded$: Observable<any>;
  private subscription: Subscription;

  constructor(private store: Store<fromStore.PnlAttributionState>) { }

  ngOnInit() {
    this.attributionTimeseriesData$ = this.store.select(fromStore.getAttributionTimeseriesByLayoutName(this.layoutName));
    this.attributionTimeseriesLoading$ = this.store.select(fromStore.getAttributionTimeseriesLoadingStatusByLayoutName(this.layoutName));
    this.attributionTimeseriesLoaded$ = this.store.select(fromStore.getAttributionTimeseriesLoadedStatusByLayoutName(this.layoutName));

    this.subscription = this.store.select(fromStore.getActiveNodeIdByLayoutName(this.layoutName)).subscribe(nodeId => {
      // meaning the active nodeId change, fire timeseries request
      this.store.dispatch(new fromStore.LoadPnlAttributionDailyTimeseriesAdvance(this.layoutName))
    });
  }

  public switchDisplayMode(mode) {
    this.displayMode = mode;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public toogleNightMode() {
    this.darkTheme = !this.darkTheme
  }

}
