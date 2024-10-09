import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { Observable } from 'rxjs';

import * as fromModels from './../../models';


@Component({
  selector: 'app-client-solutions-snapshots-layout',
  templateUrl: './client-solutions-snapshots-layout.component.html',
  styleUrls: ['./client-solutions-snapshots-layout.component.scss']
})
export class ClientSolutionsSnapshotsLayoutComponent implements OnInit {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  public param$: Observable<fromModels.ISnapshotParameter>;

  public funds$: Observable<fromModels.IFund[]>;
  public fundsLoading$: Observable<boolean>;
  public fundsLoaded$: Observable<boolean>;
  public fundsError$: Observable<string>;

  public periods$: Observable<fromModels.ISnapshotPeriod[]>;

  public monthEndDates$: Observable<string[]>;
  public monthEndDatesLoading$: Observable<boolean>;
  public monthEndDatesLoaded$: Observable<boolean>;
  public monthEndDatesError$: Observable<string>;

  public refreshDataPendingStatus$: Observable<boolean>;

  constructor(private store: Store<fromStore.State>) {
    this.funds$ = this.store.select(fromStore.getFunds);
    this.fundsLoading$ = this.store.select(fromStore.getFundsLoadingStatus);
    this.fundsLoaded$ = this.store.select(fromStore.getFundsLoadedStatus);
    this.fundsError$ = this.store.select(fromStore.getFundsError);

    this.periods$ = this.store.select(fromStore.getSnapshotPeriods);

    this.monthEndDates$ = this.store.select(fromStore.getSnapshotMonthEndDates);
    this.monthEndDatesLoading$ = this.store.select(fromStore.getSnapshotMonthEndDatesLoadingStatus);
    this.monthEndDatesLoaded$ = this.store.select(fromStore.getSnapshotMonthEndDatesLoadedStatus);
    this.monthEndDatesError$ = this.store.select(fromStore.getSnapshotMonthEndDatesError);

    this.refreshDataPendingStatus$ = this.store.select(fromStore.getRefreshDataPending);
  }

  ngOnInit() {
  }

  public onParamChanged(param: fromModels.ISnapshotParameter): void {
    this.store.dispatch(new fromStore.SnapshotParameterChanged(param));
  }

  public downloadFile(event) {
    // this.downloadFileFunc = event;
  }

  public onDownload() {
    // this.downloadFileFunc();
  }

}
