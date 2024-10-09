import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../../store';
import * as fromModels from './../../models';

@Component({
  selector: 'app-cs-snapshots-inner-layout',
  templateUrl: './client-solutions-snapshots-inner-layout.component.html',
  styleUrls: ['./client-solutions-snapshots-inner-layout.component.scss']
})
export class ClientSolutionsSnapshotsInnerLayoutComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  public param$: Observable<fromModels.ISnapshotParameter>;

  public entitiesMap$: Observable<{ [code: string]: any }>;
  public groupings$: Observable<string[]>;

  public summaryStats$: Observable<any[]>;
  public summaryStatsLoading$: Observable<boolean>;
  public summaryStatsLoaded$: Observable<boolean>;
  public summaryStatsError$: Observable<string>;

  public correlationMatrix$: Observable<any[]>;
  public correlationMatrixLoading$: Observable<boolean>;
  public correlationMatrixLoaded$: Observable<boolean>;
  public correlationMatrixError$: Observable<string>;

  public snapshotData$: Observable<any>;
  public snapshotDataLoading$: Observable<boolean>;
  public snapshotDataLoaded$: Observable<boolean>;
  public snapshotDataError$: Observable<string>;

  public subscriptions: Subscription[] = [];

  constructor(private store: Store<fromStore.State>) {

    this.param$ = this.store.select(fromStore.getSnapshotParam);
    this.groupings$ = this.store.select(fromStore.getSnapshotSupportedGroupings);

    this.entitiesMap$ = this.store.select(fromStore.getSnapshotEntitiesMap);

    this.summaryStats$ = this.store.select(fromStore.getSnapshotSummaryStats);
    this.summaryStatsLoading$ = this.store.select(fromStore.getSnapshotSummaryStatsLoadingStatus);
    this.summaryStatsLoaded$ = this.store.select(fromStore.getSnapshotSummaryStatsLoadedStatus);
    this.summaryStatsError$ = this.store.select(fromStore.getSnapshotSummaryStatsError);

    this.correlationMatrix$ = this.store.select(fromStore.getSnapshotCorrelationMatrix);
    this.correlationMatrixLoading$ = this.store.select(fromStore.getSnapshotCorrelationMatrixLoadingStatus);
    this.correlationMatrixLoaded$ = this.store.select(fromStore.getSnapshotCorrelationMatrixLoadedStatus);
    this.correlationMatrixError$ = this.store.select(fromStore.getSnapshotCorrelationMatrixError);

    this.snapshotData$ = this.store.select(fromStore.getInvestorSnapshotData);
    this.snapshotDataLoading$ = this.store.select(fromStore.getInvestorSnapshotDataLoading);
    this.snapshotDataLoaded$ = this.store.select(fromStore.getInvestorSnapshotDataLoaded);
    this.snapshotDataError$ = this.store.select(fromStore.getInvestorSnapshotDataError);

    this.subscriptions.push(
      this.param$.subscribe((param) => {
        if (param) {
          this.store.dispatch(new fromStore.LoadSnapshotSummaryStats(param));
          this.store.dispatch(new fromStore.LoadSnapshotCorrelationMatrix(param));

          if (param.grouping) {
            this.store.dispatch(new fromStore.LoadSnapshotData(param));
          }

        }
      })
    );
  }

  ngOnInit() {
    // this.data$ = this.store.select(fromStore.getCliffwaterData);
    // this.loading$ = this.store.select(fromStore.getCliffwaterDataLoadingStatus);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  changeGrouping(param: fromModels.ISnapshotParameter): void {
    this.store.dispatch(new fromStore.LoadSnapshotData(param));
  }


}

