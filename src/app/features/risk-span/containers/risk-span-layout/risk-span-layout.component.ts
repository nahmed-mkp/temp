import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { RiskSpanConfigurationPanelComponent } from '../../components';
import * as fromStore from '../../store';
import * as fromModels from '../../models';

@Component({
  selector: 'app-risk-span-layout',
  templateUrl: './risk-span-layout.component.html',
  styleUrls: ['./risk-span-layout.component.scss']
})
export class RiskSpanLayoutComponent implements OnInit, OnDestroy {

  // -----------Ui ------------------------------------------
  private dialogRef: MatDialogRef<RiskSpanConfigurationPanelComponent>;
  public uiViewMode$: Observable<string>;
  private uiSubscription: Subscription;
  public multiPlotViewMode: 'compact' | 'regular' = 'regular';

  // Data ----------------------------------------------------------
  public currentRequest: fromModels.IRequest | fromModels.IDetailRequest;
  // Plot
  public plotResponse$: Observable<fromModels.ReportPlotResponse>;
  public plotLoading$: Observable<boolean>;
  public multiPlotMode$: Observable<boolean>;
  public seriesCollection: string[];
  public targetSeries: string[];
  private subscriptions: Subscription[] = [];

  // Grid
  public rawData$: Observable<any>;
  public rawDetailData$: Observable<any>;
  public requestSubmittingStatus$: Observable<boolean>;
  public targetColumn$: Observable<string>;
  public searchText$: Observable<string>;


  constructor(private dialog: MatDialog, private store: Store<fromStore.RiskSpanState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadReports());
    // UI
    this.uiViewMode$ = this.store.select(fromStore.getUiViewMode);
    this.uiSubscription = this.uiViewMode$.subscribe(uiViewMode => {
      if (uiViewMode) {
        this.dialogRef = this.dialog.open(RiskSpanConfigurationPanelComponent, {
          panelClass: ['configuration-pop-up-panel-light', 'tool-bar-border-radius'],
          hasBackdrop: false,
          width: '50rem',
          height: '3.3rem',
          position: {top: '3px'}
        });
        this.uiSubscription.unsubscribe();
      }
    });
    this.store.select(fromStore.getRiskSpanCurrentRequest).subscribe(request => {
      if (request) {
        this.currentRequest = request;
      }
    });

    // Plot
    this.multiPlotMode$ = this.store.select(fromStore.getMultiPlotMode);
    this.plotResponse$ = this.store.select(fromStore.getPlotResponse);
    this.plotLoading$ = this.store.select(fromStore.getPlotLoadingStatus);
    this.subscriptions.push(this.plotResponse$.subscribe(plotResponse => {
      if (plotResponse) {
        this.seriesCollection = plotResponse.plots[0].plot.map(item => item.series.name);
      } else {
        this.seriesCollection = [];
      }
      this.targetSeries = [];
    }));

    // Grid
    this.rawData$ = this.store.select(fromStore.getRiskSpanResults);
    this.rawDetailData$ = this.store.select(fromStore.getRiskSpanDetailResults);
    this.requestSubmittingStatus$ = this.store.select(fromStore.getRiskSpanRequestSubmittingStatus);
    this.targetColumn$ = this.store.select(fromStore.getTargetColumn);
    this.searchText$ = this.store.select(fromStore.getSearchText);
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    if (this.uiSubscription) {
      this.uiSubscription.unsubscribe();
    }
  }

  onSetColumnsCollection(columns: string[]) {
    this.store.dispatch(new fromStore.SetColumnsCollection(columns));
  }

  onShowDetail(clusterName) {
    const oldRequest = JSON.parse(JSON.stringify(this.currentRequest));
    const newRequest = Object.assign({}, oldRequest, {clusterKey: clusterName, detailFieldList: []});
    this.store.dispatch(new fromStore.UpdateRequest(newRequest));
    this.store.dispatch(new fromStore.SubmitDetailRequest(newRequest));
  }

  // onSeriesSelected() {
  //   console.log('targetSeries', this.targetSeries);
  // }
}
