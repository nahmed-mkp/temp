import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';


@Component({
  selector: 'app-prizm-sei-pnl-rec-layout',
  templateUrl: './prizm-sei-pnl-rec-layout.component.html',
  styleUrls: ['./prizm-sei-pnl-rec-layout.component.scss']
})
export class PrizmSEIPnlRecLayoutComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'full-strech-block';

  public activeDate: Date;

  // public title = 'Prizm vs. CRD Position Reconciliation';
  public title = 'Prizm vs. SEI Monthly P&L Reconciliation';

  public funds$: Observable<string[]>;
  public data$: Observable<any[]>;
  public filesUploading$: Observable<boolean>;
  public filesUploaded$: Observable<boolean>;
  public filesError$: Observable<string>;

  public fundsInDB$: Observable<string[]>;
  public fundsInDBError$: Observable<string>;

  private subscriptions: Subscription[] = [];

  public reconciliations$: Observable<any[]>;
  public reconciliationsLoading$: Observable<boolean>;
  public reconciliationsLoaded$: Observable<boolean>;
  public reconciliationsError$: Observable<string>;

  constructor(private store: Store<fromStore.RCPMPnlRecState>) {
    this.funds$ = store.select(fromStore.getPrizmSEIPnlFunds);
    this.data$ = store.select(fromStore.getPrizmSEIPnl);

    this.filesUploading$ = store.select(fromStore.getPrizmSEIPnlFileUploadLoadingStatus);
    this.filesUploaded$ = store.select(fromStore.getPrizmSEIPnlFileUploadLoadedStatus);
    this.filesError$ = store.select(fromStore.getPrizmSEIPnlFileUploadErrorStatus);

    this.reconciliations$ = store.select(fromStore.getPrizmSEIFundReconciliation);
    this.reconciliationsLoading$ = store.select(fromStore.getPrizmSEIFundReconciliationLoading);
    this.reconciliationsLoaded$ = store.select(fromStore.getPrizmSEIFundReconciliationLoaded);
    this.reconciliationsError$ = store.select(fromStore.getPrizmSEIFundReconciliationError);

    this.fundsInDB$ = store.select(fromStore.getPrizmSEIFundListInDB);
    this.fundsInDBError$ = store.select(fromStore.getPrizmSEIFundListInDBError);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public onActiveDateChange() {
  }

  public tabChanged(e: MatTabChangeEvent): void {
  }

  public uploadFiles(selectedFiles: string[]): void {
    this.store.dispatch(new fromStore.UploadFiles(selectedFiles));
  }

  public uploadFunds(selectedFunds: string[]): void {
    this.store.dispatch(new fromStore.UploadFunds(selectedFunds));
  }

  public loadFromDatabase(): void {
    this.store.dispatch(new fromStore.LoadFundsForRec());
  }

  public loadRec(fund: string): void {
    this.store.dispatch(new fromStore.RunReconciliation(fund));
  }

}
