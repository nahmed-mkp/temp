import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { CustomCheckboxComponent } from './custom-cell-checkbox.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

import { VolReportTimeseriesDialogLayoutComponent } from '../../containers/vol-report-timeseries-layout/vol-report-timeseries-dialog-layout.component';
import * as fromModels from '../../models';

@Component({
  selector: 'app-vol-report-viewer',
  templateUrl: './vol-report-viewer.component.html',
  styleUrls: ['./vol-report-viewer.component.scss']
})
export class VolReportViewerComponent implements OnInit, OnChanges {

  @Input() plotData: fromModels.VolReportData[];
  @Input() volReportLoadingStatus: boolean = false;

  private ATM_Vol_max = 0;
  private animationMode = true;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {};
  public categories: string[] = [];
  public plotDataGrouping: {
    [category: string]: fromModels.VolReportData[]
  };
  public dataRendering: boolean = false;


  public customGridOption: GridOptions = {
    headerHeight: 45,
    groupHeaderHeight: 30,
    columnDefs: [
      {headerName: 'Index', field: 'index', width: 80, pinned: 'left'},
      {headerName: 'Date', field: 'date', width: 80, pinned: 'left'},
      {
        headerName: 'Current 1 Month Vol',
        children: [
          {headerName: 'ATM Vol', field: 'ATM_Vol', cellClass: ['left-border', 'proportion-cell'], width: 120, cellRenderer: 'CustomCheckboxComponent' , 
            cellRendererParams: {proportion: true}},
          {headerName: '1 Day Vol Chg', field: '1 Day Vol Chg', width: 90},
          {headerName: '1 Day Chg as pct of ATM Vol', field: '1 Day Chg as pct of ATM Vol', width: 130, valueFormatter: params => params.value + '%', cellClass: params => {
            return [this.weeklyVolChgColorCoding(params.value)]
          }},
          {headerName: '1 Week Vol Chg', field: '1 Week Vol Chg', width: 90},
          {headerName: '1 Week CHg as pct of ATM Vol', field: '1 Week CHg as pct of ATM Vol', width: 130, valueFormatter: params => params.value + '%', cellClass: params => {
            return [this.weeklyVolChgColorCoding(params.value), 'right-border']
          }},

          {headerName: 'Spot', field: 'Spot', width: 90},
          {headerName: 'ATM Forward', field: 'ATM Forward', width: 90},
          {headerName: '25 Delta Put Breakeven', field: '25 Delta Put Breakeven', width: 120},
          {headerName: '25 Delta Call Breakeven', field: '25 Delta Call Breakeven', width:120, cellClass: ['right-border']},

          {headerName: 'Skew', field: 'Skew', width: 90, cellRenderer: 'CustomCheckboxComponent'},
          {headerName: '1 Week Skew Chg', field: '1 Week Skew Chg', width: 110},
          {headerName: 'Skew/ATM Ratio', field: 'Skew/ATM Ratio', width: 110, cellClass: ['right-border'], cellRenderer: 'CustomCheckboxComponent'},

          {headerName: 'Implied vs Realized Vol Ratio', field: 'Implied vs Realized Vol Ratio', width: 140, cellRenderer: 'CustomCheckboxComponent'},
          {headerName: 'Vol Ratio 1 Week Chg', field: 'Vol Ratio 1 Week Chg', width: 110},
          {headerName: 'Vol Ratio 1Yr LB Percentile', field: 'Vol Ratio 1Yr LB Percentile', width: 120, valueFormatter: params => params.value + '%', cellClass: params => {
            return [this.percentileColorCoding(params.value)]
          }},
          {headerName: 'Vol Ratio 1 Year Avg', field: 'Vol Ratio 1 Year Avg', width: 110, cellClass: ['right-border']},
        ]
      },
      {headerName: 'ATM Term Structure 3M-1M', field: 'ATM Term Structure 3M-1M', width: 140, cellClass: ['right-border']},
      {
        headerName: '1 Year Lookback Statistic',
        children: [
          {headerName: 'ATM Vol Z Scores', field: 'ATM Vol Z Scores 1 year', width: 90},
          {headerName: 'ATM Vol Percentile', field: 'ATM Vol Percentile 1 year',  width: 100, cellRenderer: 'CustomCheckboxComponent', valueGetter: params => params.data['ATM Vol Percentile 1 year'] + '%', cellClass: params => {
            return [this.percentileColorCoding(parseInt(params.value))]
          }},
          {headerName: 'Skew/ATM Z Scores', field: 'Skew/ATM Z Scores 1 year',  width: 110},
          {headerName: 'Skew/ATM Percentile', field: 'Skew/ATM Percentile 1 year', width: 110,  valueGetter: params => params.data['Skew/ATM Percentile 1 year'] + '%', cellClass: params => {
            return [this.percentileColorCoding(parseInt(params.value)), 'right-border']
          }},
        ]
      },
      {
        headerName: '5 Year Lookback Statistic',
        children: [
          {headerName: 'ATM Vol Z Scores', field: 'ATM Vol Z Scores 5 year', width: 90},
          {headerName: 'ATM Vol Percentile', field: 'ATM Vol Percentile 5 year',  width: 100, cellRenderer: 'CustomCheckboxComponent', valueGetter: params => params.data['ATM Vol Percentile 5 year'] + '%', cellClass: params => {
            return [this.percentileColorCoding(parseInt(params.value))]
          }},
          {headerName: 'Skew/ATM Z Scores', field: 'Skew/ATM Z Scores 5 year',  width: 110},
          {headerName: 'Skew/ATM Percentile', field: 'Skew/ATM Percentile 5 year', width: 110,  valueGetter: params => params.data['Skew/ATM Percentile 5 year'] + '%', cellClass: params => {
            return [this.percentileColorCoding(parseInt(params.value)), 'right-border']
          }},
        ]
      },
      {
        headerName: '10 Year Lookback Statistic',
        children: [
          {headerName: 'ATM Vol Z Scores', field: 'ATM Vol Z Scores 10 year', width: 90},
          {headerName: 'ATM Vol Percentile', field: 'ATM Vol Percentile 10 year',  width: 100, cellRenderer: 'CustomCheckboxComponent', valueGetter: params => params.data['ATM Vol Percentile 10 year'] + '%' ,cellClass: params => {
            return [this.percentileColorCoding(parseInt(params.value))]
          }},
          {headerName: 'Skew/ATM Z Scores', field: 'Skew/ATM Z Scores 10 year',  width: 110},
          {headerName: 'Skew/ATM Percentile', field: 'Skew/ATM Percentile 10 year', width: 110, valueGetter: params => params.data['Skew/ATM Percentile 10 year'] + '%' ,cellClass: params => {
            return [this.percentileColorCoding(parseInt(params.value)), 'right-border']
          }},
        ]
      },
    ],

    frameworkComponents: {
      CustomCheckboxComponent: CustomCheckboxComponent
    },
    
    context: {componentParent: this},

    onFirstDataRendered: params => {
      params.api.forEachNode(node => {
        if(node.data['ATM_Vol']>this.ATM_Vol_max) this.ATM_Vol_max = node.data['ATM_Vol'];
      });
      console.log('max value', this.ATM_Vol_max)
      params.api.refreshCells({columns: ['ATM_Vol'], force: true});
    },

     //Basic Context Menu Setup
    getContextMenuItems: (params:any) => {
      const viewTimeSeries = {
        name: 'View Timeseries',
        action: this.openTimeseriesPlot
      }

      return ['copy', 'copyWithHeaders', 'separator','csvExport', 'excelExport', 'separator', viewTimeSeries] 
    }

  }

  

  public data = [
    {
      index: 'SPX', date: '11/9/2017', ATM_Vol: 7.69, '1 Day Vol Chg': 0.51, '1 Day Chg as pct of ATM Vol': 7,
      '1 Week Vol Chg': 0.27, '1 Week CHg as pct of ATM Vol': 4, Spot: 2584.6, 'ATM Forward': 2583.5, 
      '25 Delta Put Breakeven': 2523.5, '25 Delta Call Breakeven': 2625.6, 'Skew': 8.68, '1 Week Skew Chg': 1.92,
      'Skew/ATM Ratio': 1.13, 'Implied vs Realized Vol Ratio': '164%', 'Vol Ratio 1 Week Chg': '10%', 
      'Vol Ratio 1Yr LB Percentile': 88, 'Vol Ratio 1 Year Avg': '130%', 'ATM Term Structure 3M-1M': 2.38,
      'ATM Vol Z Scores 1 year': -0.68, 'ATM Vol Percentile 1 year': 31, 'Skew/ATM Z Scores 1 year': 0.73, 'Skew/ATM Percentile 1 year': 77,
      'ATM Vol Z Scores 5 year': -1.33, 'ATM Vol Percentile 5 year': 6, 'Skew/ATM Z Scores 5 year': 2.04, 'Skew/ATM Percentile 5 year': 94,
      'ATM Vol Z Scores 10 year': -1.07, 'ATM Vol Percentile 10 year': 3, 'Skew/ATM Z Scores 10 year': 2.41, 'Skew/ATM Percentile 10 year': 97
    }
  ]

  constructor(private dialog: MatDialog) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.openTimeseriesPlot = this.openTimeseriesPlot.bind(this);
  }

  ngOnInit() {
    for (let index = 0; index < 100; index++) {
      const temp = Object.assign({}, this.data[0]);
      temp.ATM_Vol = Math.floor(Math.random() * 101);
      temp["1 Day Chg as pct of ATM Vol"] = Math.floor(Math.random() * (100 - (-100) + 1)) + (-100);
      temp["1 Week CHg as pct of ATM Vol"] = Math.floor(Math.random() * (100 - (-100) + 1)) + (-100);
      temp["Vol Ratio 1Yr LB Percentile"] = Math.floor(Math.random() * 101);
      temp["ATM Vol Percentile 1 year"] = Math.floor(Math.random() * 101);
      temp['Skew/ATM Percentile 1 year'] = Math.floor(Math.random() * 101);
      temp["ATM Vol Percentile 5 year"] = Math.floor(Math.random() * 101);
      temp['Skew/ATM Percentile 5 year'] = Math.floor(Math.random() * 101);
      temp["ATM Vol Percentile 10 year"] = Math.floor(Math.random() * 101);
      temp['Skew/ATM Percentile 10 year'] = Math.floor(Math.random() * 101);
      this.data.push(temp)
    }

    setTimeout(() => {
      this.animationMode = false;
    }, 2000)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.plotData && changes.plotData.currentValue) {
      this.plotDataGrouping = {};
      this.plotData.forEach(data => {
        if(this.plotDataGrouping[data.category] === undefined) {
          this.plotDataGrouping[data.category] = [data];
        } else {
          this.plotDataGrouping[data.category].push(data)
        }
      });
      this.categories = Object.keys(this.plotDataGrouping);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.gridApi.closeToolPanel();
  }

  openTimeseriesPlot() {
    this.dialog.open(VolReportTimeseriesDialogLayoutComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '65rem',
      height: '40rem',
    })
  }

  selectedTabChange(event: MatTabChangeEvent) {
    this.dataRendering = true;
  }


  // Utility ------------------------------------------------------

  weeklyVolChgColorCoding(value) {
    if(value <= -20) return 'cell-green';
    else if(value >=20) return 'cell-red';
    else return '';
  }

  percentileColorCoding(value) {
    if(value >= 0 && value <= 10) return 'cell-blue';
    else if(value > 10 && value <= 20) return 'cell-light-blue';
    else if(value >= 80  && value <= 90) return 'cell-light-red';
    else if(value > 90 && value <= 100) return 'cell-red';
    else return '';
  }

}
