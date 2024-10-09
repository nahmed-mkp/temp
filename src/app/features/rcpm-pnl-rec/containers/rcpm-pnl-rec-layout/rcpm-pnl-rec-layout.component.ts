import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';


@Component({
  selector: 'app-rcpm-pnl-rec-layout',
  templateUrl: './rcpm-pnl-rec-layout.component.html',
  styleUrls: ['./rcpm-pnl-rec-layout.component.scss']
})
export class RcpmPnlRecLayoutComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'full-strech-block';

  public activeDate: Date;
  public pnlRecData$: Observable<any[]>;
  public pnlRecDataLoadingStatus$: Observable<boolean>;

  public posRecData$: Observable<any[]>;
  public posRecDataLoadingStatus$: Observable<boolean>;

  public pricerRecData$: Observable<any[]>;
  public pricerRecDataLoadingStatus$: Observable<boolean>;

  // public title = 'Prizm vs. CRD Position Reconciliation';
  public title = 'PRIZM vs. RCPM P&L RECONCILIATION';


  private subscriptions: Subscription[] = [];

  constructor(private store: Store<fromStore.RCPMPnlRecState>) { }

  ngOnInit() {
    this.subscriptions.push(this.store.select(fromStore.getActiveDate).subscribe(date => {
      this.activeDate = date;
    }));

    this.pnlRecData$ = this.store.select(fromStore.getPnlRecData);
    this.pnlRecDataLoadingStatus$ = this.store.select(fromStore.getPnlRecDataLoading);

    this.posRecData$ = this.store.select(fromStore.getPosRecData);
    this.posRecDataLoadingStatus$ = this.store.select(fromStore.getPosRecDataLoading);

    this.pricerRecData$ = this.store.select(fromStore.getPricerRecData);
    this.pricerRecDataLoadingStatus$ = this.store.select(fromStore.getPricerRecDataLoading);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public onActiveDateChange() {
    this.store.dispatch(new fromStore.SetActiveDate(this.activeDate));
    this.store.dispatch(new fromStore.LoadPnlRecData(this.activeDate));
    this.store.dispatch(new fromStore.LoadCRDPosRecData(this.activeDate));
  }

  public tabChanged(e: MatTabChangeEvent): void {
    if (e.tab.textLabel === 'CRD/Prizm Position Rec.') {
      this.title = 'Prizm vs. CRD Position Reconciliation';
    } else if (e.tab.textLabel === 'RCPM/Prizm P&L Rec.') {
      this.title = 'Prizm vs. RCPM P&L Reconciliation';
    } else if (e.tab.textLabel === 'RCPM/Prizm Pricer Rec.') {
      this.title = 'Prizm vs RCPM Pricer Reconciliation';
    } else if (e.tab.textLabel === 'SEI/Prizm P&L Rec.') {
      this.title = 'Prizm vs. SEI Monthly P&L Reconciliation';
    }
  }

}
