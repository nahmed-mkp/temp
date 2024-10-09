import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';


@Component({
  selector: 'app-pnl-attribution-detail-layout',
  templateUrl: './pnl-attribution-detail-layout.component.html',
  styleUrls: ['./pnl-attribution-detail-layout.component.scss']
})
export class PnlAttributionDetailLayoutComponent implements OnInit, OnDestroy {

  @Input() layoutName: string;

  public attributionDetailData$: Observable<any>;
  public attributionDetailLoading$: Observable<boolean>;
  public attributionDetailLoaded$: Observable<boolean>;
  private subscription: Subscription;

  constructor(private store: Store<fromStore.PnlAttributionState>) { }

  ngOnInit() {
    this.attributionDetailData$ = this.store.select(fromStore.getAttributionDetailByLayoutName(this.layoutName));
    this.attributionDetailLoading$ = this.store.select(fromStore.getAttributionDetailLoadingStatusByLayoutName(this.layoutName));
    this.attributionDetailLoaded$ = this.store.select(fromStore.getAttributionDetailLoadedStatusByLayoutName(this.layoutName));
  
    this.subscription = this.store.select(fromStore.getActiveNodeCellWithMonthYearByLayoutName(this.layoutName)).subscribe(nodeCell => {
      this.store.dispatch(new fromStore.LoadPnlAttributionDetailsAdvance(this.layoutName));
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
