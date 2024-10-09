import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, RowNode, ColumnState } from 'ag-grid-community';
import { Store } from '@ngrx/store';

import { Observable, Subscription, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
  selector: 'app-pnl-attribution-detail-grid-layout',
  templateUrl: './pnl-attribution-detail-grid-layout.component.html',
  styleUrls: ['./pnl-attribution-detail-grid-layout.component.scss']
})
export class PnlAttributionDetailGridLayoutComponent implements ICellRendererAngularComp, OnDestroy {

  private params: any;
  public colDefs: any;
  public gridUniqueId: string;
  public masterGridApi: GridApi;
  public data$: Observable<any>;
  public loadingStatus$: Observable<boolean>;
  public pinnedStatus: string;
  public masterNode: RowNode;
  public gridDisplayMode$: Observable<any>;
  public gridColumnStateChangeSubject: Subject<{columnStates: ColumnState[], source: any, type: string}>;
  public detailGridRowSelectedSubject: Subject<string>;
  public singleCellValueSubject$: Subject<number>;

  private lineItemId: number;
  public guid: string;
  private layoutName: string;
  private subscription: Subscription;

  constructor(private store: Store<fromStore.PnlAttributionState>) {}

  agInit(params: any): void {
    
    this.gridUniqueId = params.node.id;
    this.masterGridApi = params.api;
    this.colDefs = params.detailGridOptions.columnDefs;
    this.pinnedStatus = params.pinned;
    this.masterNode = params.node;
    this.gridColumnStateChangeSubject = params.gridColumnStateChangeSubject;
    this.detailGridRowSelectedSubject = params.detailGridRowSelectedSubject;
    this.singleCellValueSubject$ = params.singleCellValueSubject$;

    this.guid = params.guid;
    this.lineItemId = params.lineItemId;
    this.layoutName = params.layoutName;

    // console.log('PnlAttributionDetailGridLayoutComponent rendering', params, this.store, this.guid, this.lineItemId);

    // Loading data

    this.data$ = this.store.select(fromStore.getAttributionLineItemByGuidAndId(this.guid, this.lineItemId));
    this.loadingStatus$ = this.store.select(fromStore.getAttributionLineItemLoadingStatusByGuidAndId(this.guid, this.lineItemId));
    this.gridDisplayMode$ = this.store.select(fromStore.getGridDisplayModeByLayoutName(this.layoutName));
    this.subscription = this.store.select(fromStore.getAttributionLineItemLoadedStatusByGuidAndId(this.guid, this.lineItemId)).pipe(
      take(1)
    ).subscribe(status => {
      if (status !== true) {
        if (this.pinnedStatus === 'left') {
          this.store.dispatch(new fromStore.LoadPositionPnlAttribution({
            id: this.lineItemId,
            guid: this.guid,
          }));
        }
      }
    })
  }

  refresh(params: any): boolean {
    return false
  }

  ngOnDestroy() {
    // console.log('detail grid layout destorying');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Event
  onLoadTimeseries(payload: fromModels.IAttributionDailyTimeseriesRequest) {
    // this.store.dispatch(new fromStore.LoadPnlAttributionDailyTimeseries(payload));
    this.store.dispatch(new fromStore.SetActiveNodeIdByLayout({layoutName: this.layoutName, activeNodeId: payload.id}))
  }

  onLoadDetails(payload: fromModels.IAttributionDetailsRequest) {
    // this.store.dispatch(new fromStore.LoadPnlAttributionDetails(payload));
    const combineId = payload.id + '|' + payload.month + '|' + payload.year;
    this.store.dispatch(new fromStore.SetActiveNodeCellWithMonthYearByLayout({layoutName: this.layoutName, combineId: combineId}))
  }



}
