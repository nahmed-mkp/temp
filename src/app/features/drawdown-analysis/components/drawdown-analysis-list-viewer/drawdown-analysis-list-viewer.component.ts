import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';

import * as fromModels from './../../models';

@Component({
  selector: 'app-drawdown-analysis-list-viewer',
  templateUrl: './drawdown-analysis-list-viewer.component.html',
  styleUrls: ['./drawdown-analysis-list-viewer.component.scss']
})
export class DrawdownAnalysisListViewerComponent implements OnInit, OnChanges {

  @Input() drawdownAnalysisTableItems: fromModels.DrawDownAnalysisResponse[];
  @Input() drawdownAnalysisTableLoadingStatus: boolean;
  @Input() drawdownAnalysisTableLoadedStatus: boolean;

  @Input() pointSelected: {date: string; value: number};
  @Input() calMethod: string;

  @Output() drawdownAnalysisItemSelected: EventEmitter<fromModels.DrawDownAnalysisResponse> = new EventEmitter();

  private pendingTaskUntilChartReady: any[] = [];
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public gridOptions: GridOptions = {

    //Grid basic setup
    defaultColDef: {
      enableValue: true, 
      comparator: (valueA, valueB, nodeA, nodeB) => parseFloat(valueA) - parseFloat(valueB)
    },

    columnDefs: [
      // {headerName: 'OP Start', field: 'observe_period_start', headerTooltip: 'Observe Period Start', sort: 'desc'},
      // {headerName: 'OP End', field: 'observe_period_end', headerTooltip: 'Observe Period End'},
      {headerName: 'Start Date', field: 'drawdown_start', headerTooltip: 'Drawdown Start Date', comparator: this.dateComparison},
      {headerName: 'End Date', field: 'drawdown_end', headerTooltip: 'Drawdown End Date', comparator: this.dateComparison},
      {headerName: 'Interval', field: 'drawdown_interval', headerTooltip: 'Drawdown Interval', valueFormatter: params => {
        return  params.data && (Math.floor(params.data['drawdown_interval'])).toFixed(0)
      }},
      {headerName: 'Start Value', field: 'drawdown_start_level', headerTooltip: 'Drawdown Start Level',  valueFormatter: params => {
        return params.data && parseFloat(params.data['drawdown_start_level']).toFixed(4);
      }},
      {headerName: 'End Value', field: 'drawdown_end_level', headerTooltip: 'Drawdown End Level',  valueFormatter: params => {
        return params.data && parseFloat(params.data['drawdown_end_level']).toFixed(4);
      }},
      {headerName: 'Drawdown', field: 'drawdown_value', headerTooltip: 'Drawdown Value',  sort: 'desc', valueFormatter: params => {
        if(this.calMethod === 'diff') return params.data['drawdown_value'].toFixed(4);
        else if(this.calMethod === 'pct') return (params.data['drawdown_value']*100).toFixed(2).toString() + '%';
        else return params.data['drawdown_value'];
      }},
    ],
    rowData: [],

    //columns functional feature
    enableSorting: true,
    enableColResize: true,

    //rows functional feature
    enableRangeSelection: true,
    rowSelection: 'single',

    //Event handling
    onRowClicked: row => {
      this.drawdownAnalysisItemSelected.emit(row.data);
    },
    onGridReady: this.onGridReady.bind(this),

    //Cell Range Aggregation
    statusBar: {
      statusPanels: [
        {statusPanel: "agAggregationComponent"}
      ]
    },
  }

  constructor() {
    this.renderGridData = this.renderGridData.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.drawdownAnalysisTableItems) {
      if(this.gridOptions.api) this.renderGridData();
      else this.pendingTaskUntilChartReady.push(this.renderGridData);
    }

    if(changes.pointSelected && changes.pointSelected.currentValue) {
      this.searchTimeRange(changes.pointSelected.currentValue);
    }
  }

  onGridReady(params) {
    //this will expose the gridApi and the gridColumnApi to the component scope
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

    this.pendingTaskUntilChartReady.forEach(task => task());
  }

  // Helper function ------------------------------

  searchTimeRange(point) {
    let targetTime = new Date(point.date);
    let targetNode = [];
    this.gridApi.forEachNode((node, index) => {
      let drawdown_end = new Date(node.data.drawdown_end);
      let drawdown_start = new Date(node.data.drawdown_start);
      if(targetTime >= drawdown_start && targetTime <= drawdown_end) {
        targetNode.push(index);
        node.setSelected(true);
      }
    })
    // console.log('target node', targetNode);
    this.gridApi.ensureIndexVisible(targetNode[0], 'middle');
  }

  renderGridData() {
    this.gridOptions.api.setRowData(this.drawdownAnalysisTableItems);
  }

  dateComparison(valueA, valueB) {
    let dateA = new Date(valueA);
    let dateB = new Date(valueB);
    return dateA.getTime() - dateB.getTime();
  }

}
