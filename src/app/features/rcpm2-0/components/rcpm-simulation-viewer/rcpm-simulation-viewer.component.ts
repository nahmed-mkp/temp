import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, ValueGetterParams, ColDef, RowNode } from 'ag-grid-community';


@Component({
  selector: 'app-rcpm-simulation-viewer',
  templateUrl: './rcpm-simulation-viewer.component.html',
  styleUrls: ['./rcpm-simulation-viewer.component.scss']
})
export class RcpmSimulationViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: boolean;
  @Input() showIsSymmetric: boolean;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {
    autoSizeColumns: true
  };

  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'Date', field: 'SimulationDate', sort: 'desc',
        comparator: (valueA, valueB, nodeA, nodeB) => {
          const dateTimeA = (new Date(valueA)).getTime();
          const dateTimeB = (new Date(valueB)).getTime();
          return dateTimeA - dateTimeB;
        }},
      {headerName: 'IsSymmetric', field: 'IsSymmetric'},
      {headerName: 'PnL', field: 'PnL'},
    ],
    sideBar: false,
  };

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showIsSymmetric && this.gridApi) {
      this.applyFilter();
    }

    if (changes.data && changes.data.currentValue) {
      setTimeout(() => this.applyFilter(), 100) ;
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.applyFilter();
  }

  private applyFilter() {
    const targetFilter = this.gridApi.getFilterInstance('IsSymmetric');
    if (targetFilter) {
      if (this.showIsSymmetric === true) {
        targetFilter.setModel(null);
      } else {
        targetFilter.setModel({values: ['False']});
      }
      this.gridApi.onFilterChanged();
    }
  }

}
