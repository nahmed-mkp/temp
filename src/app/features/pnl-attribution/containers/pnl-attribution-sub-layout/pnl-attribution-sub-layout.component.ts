import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';


@Component({
  selector: 'app-pnl-attribution-sub-layout',
  templateUrl: './pnl-attribution-sub-layout.component.html',
  styleUrls: ['./pnl-attribution-sub-layout.component.scss']
})
export class PnlAttributionSubLayoutComponent implements OnInit {

  @Input() layoutName: string;
  @Input() isActive: boolean;

  // Ui
  public guid: string;
  public grouping$: Observable<string[]>;
  public gridDisplayMode$: Observable<any>;
  public showPlot: boolean = false;
  public showDetailInfo: boolean = false;
  public activeNodeId: number;
  public readOnlyMode$: Observable<boolean>;

  public layoutInfo$: Observable<fromModels.layoutState>;
  public layoutFilterValue$: Observable<string>;
  public layoutSortState$: Observable<any>;

  // Data ---------------------------------------------------------------------
  // public attributionData$: Observable<any[]>;
  public attributionLoading$: Observable<boolean>;
  public attributionLoaded$: Observable<boolean>;
  public attributionError$: Observable<string>;
  public attributionFlatData$: Observable<any[]>;
  public attributionTreeData$: Observable<any>;
  public attributionColumns$: Observable<string[]>;

  private subscription: Subscription;

  constructor(private store: Store<fromStore.PnlAttributionState>) { }

  ngOnInit() {

    // Ui
    this.store.select(fromStore.getGuidByLayoutName(this.layoutName)).subscribe(guid => {
      this.guid = guid;
    });
    this.grouping$ = this.store.select(fromStore.getLayoutGroupingByLayoutName(this.layoutName));
    this.gridDisplayMode$ = this.store.select(fromStore.getGridDisplayModeByLayoutName(this.layoutName));
    this.readOnlyMode$ = this.store.select(fromStore.getReadOnlyMode);

    this.layoutInfo$ = this.store.select(fromStore.getLayoutInfoByLayoutName(this.layoutName));
    this.layoutFilterValue$ = this.store.select(fromStore.getLayoutFilterValueByLayoutName(this.layoutName));
    this.layoutSortState$ = this.store.select(fromStore.getLayoutSortStateByLayoutName(this.layoutName));

    // Data
    // this.attributionData$ = this.store.select(fromStore.getAttribution);
    this.attributionLoading$ = this.store.select(fromStore.getAttributionLoadingStatusByLayoutName(this.layoutName));
    this.attributionLoaded$ = this.store.select(fromStore.getAttributionLoadedStatusByLayoutName(this.layoutName));
    this.attributionError$ = this.store.select(fromStore.getAttributionErrorByLayoutName(this.layoutName));

    this.attributionFlatData$ = this.store.select(fromStore.getAttributionFlatDataByLayoutName(this.layoutName));
    this.attributionTreeData$ = this.store.select(fromStore.getAttributionTreeDataByLayoutName(this.layoutName));
    this.attributionColumns$ = this.store.select(fromStore.getAttributionColumnsByLayoutName(this.layoutName));
  }

  // Event
  onLoadPositionAttribution(payload: fromModels.IPositionAttributionRequest) {
    this.store.dispatch(new fromStore.LoadPositionPnlAttribution(payload));
  }

  onLoadTimeseries(payload: fromModels.IAttributionDailyTimeseriesRequest) {
    // this.store.dispatch(new fromStore.LoadPnlAttributionDailyTimeseries(payload));
    this.store.dispatch(new fromStore.SetActiveNodeIdByLayout({layoutName: this.layoutName, activeNodeId: payload.id}))
  }

  onLoadDetails(payload: fromModels.IAttributionDetailsRequest) { 
    // this.store.dispatch(new fromStore.LoadPnlAttributionDetails(payload));
    const combineId = payload.id + '|' + payload.month + '|' + payload.year;
    this.store.dispatch(new fromStore.SetActiveNodeCellWithMonthYearByLayout({layoutName: this.layoutName, combineId: combineId}))
  }

  onTogglePlotMode() {
    this.showPlot = !this.showPlot;
  }

  onChangeSideScreen() {
    this.showDetailInfo = !this.showDetailInfo;
  }

  onSaveLayoutState(event: fromModels.layoutState) {
    this.store.dispatch(new fromStore.SaveLayout({layoutName: this.layoutName, info: event}));
    // this.store.dispatch(new fromStore.SaveLayoutCloud(this.layoutName));
  }

}
