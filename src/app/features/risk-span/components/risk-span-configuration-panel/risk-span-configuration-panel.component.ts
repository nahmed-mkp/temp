import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import * as fromModels from '../../models';
import * as fromStore from './../../store';
import { RiskSpanRecordsViewerDialogComponent } from '../risk-span-records-viewer-dialog/risk-span-records-viewer-dialog.component';

@Component({
  selector: 'app-risk-span-configuration-panel',
  templateUrl: './risk-span-configuration-panel.component.html',
  styleUrls: ['./risk-span-configuration-panel.component.scss'],
})
export class RiskSpanConfigurationPanelComponent implements OnInit, OnDestroy {

  public uiViewMode$: Observable<string>;

  // Plot ------------------------------------------------------------
  public plotResponse$: Observable<fromModels.ReportPlotResponse>;
  public yAxisCollection = [
    'UPB', 'Number of Loans', 'Pool Count', 'Current Coupon', 'Rem Term',
    'CPR', 'Loan Age', 'Pool Age', 'Vintage', 'AOLS', 'ACLS', 'WAOLS', 'FICO', 'LTV',
    'SATO', 'RefiIncentive', 'BzDays', 'PreviousBalance', 'ScheduledBalance', 'SMM',
    'Active LoanCount', 'DayCountAdjSMM', 'DayDountAdjCPR', 'CPR3Mo', 'CPR6Mo', 'CPR12Mo'
  ];
  public xAxisCollection = [
    'Age', 'MaxLoanSize', 'RefiIncentive'
  ];
  public availableSeries: string[] = this.xAxisCollection;
  public availableColumns: string[] = this.xAxisCollection;
  public xAxis: string;
  public yAxis: string[];
  public series: string;
  public column: string | number;

  // Grid -----------------------------------------------------------------
  public result$: Observable<any>;
  public gridColumnsCollection$: Observable<string[]>;
  public targetColumn: string;
  public searchText: string;


  //public slideStatus = 'up';
  private recordsDialogRef: MatDialogRef<RiskSpanRecordsViewerDialogComponent>;
  private subscription: Subscription;

  constructor(private dialogRef: MatDialogRef<RiskSpanConfigurationPanelComponent>,
              private dialog: MatDialog,
              private store: Store<fromStore.RiskSpanState>) {}

  ngOnInit() {
    this.uiViewMode$ = this.store.select(fromStore.getUiViewMode);

    this.plotResponse$ = this.store.select(fromStore.getPlotResponse);
    this.subscription = this.plotResponse$.subscribe(plotResponse => {
      if (plotResponse) {
        // this.seriesCollection = plotResponse.plots[0].plot.map(item => item.series.name);
        this.series = plotResponse.series.split('_')[0];
        this.onSeriesSelect();
        this.column = plotResponse.column.split('_')[0];
      }
    });

    this.result$ = this.store.select(fromStore.getRiskSpanResults);
    this.gridColumnsCollection$ = this.store.select(fromStore.getColumnsCollection);
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }


  //// UI action -----------------------------------------------------------------------------------

  onSetUiViewMode(viewMode) {
    this.store.dispatch(new fromStore.SetUiViewMode(viewMode));
    this.searchText = undefined;
    this.targetColumn = undefined;
    this.store.dispatch(new fromStore.SetSearchText(undefined));
    this.store.dispatch(new fromStore.SetTargetColumn(undefined));
  }

  // plot UI action -------------------------------------------------------------------------------

  onLoadPlot() {
    this.store.dispatch(new fromStore.LoadMultiplePlot({
      xAxis: this.xAxis,
      yAxis: this.yAxis
    }));
  }

  onxAxisSelect() {
    this.availableSeries = this.xAxisCollection.filter(item => item !== this.xAxis);
  }

  onSeriesSelect() {
    this.availableColumns = this.availableSeries.filter(item => item !== this.series);
  }

  onSlideUp() {
    this.dialogRef.updatePosition({
      top: '-2.7rem',
    });
  }

  onSlideDown() {
    this.dialogRef.updatePosition({
      top: '0',
    });
  }

  onResetWorkflow() {
    this.store.dispatch(new fromStore.ResetWorkflow());
    this.xAxis = undefined;
    this.yAxis = undefined;
    this.series = undefined;
    this.column = undefined;
  }

  onOpenRocordsDialog() {
    this.recordsDialogRef = this.dialog.open(RiskSpanRecordsViewerDialogComponent, {
      panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
      hasBackdrop: false,
      width: '40rem',
      height: '30rem',
    });
  } 


  // Grid viewer UI action ----------------------------------------------

  onSetSearchText() {
    this.store.dispatch(new fromStore.SetSearchText(this.searchText));
  }

  onSetTargetColumn() {
    this.store.dispatch(new fromStore.SetTargetColumn(this.targetColumn));
  }

}
