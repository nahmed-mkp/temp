import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';

import * as fromModels from './../../models';

@Component({
  selector: 'app-sizing-sheet-viewer',
  templateUrl: './sizing-sheet-viewer.component.html',
  styleUrls: ['./sizing-sheet-viewer.component.scss']
})
export class SizingSheetViewerComponent implements OnInit, OnChanges {

  @Input() sizingSheetItems: fromModels.SizingItem[];
  @Input() sizingSheetItemsLoading: boolean;

  @Input() sizingCapitals: fromModels.SizingCapital[];
  @Input() sizingSheetUpdatedTime: string;
  @Input() sizingSheetDefaultColumns: number[];
  @Input() sizingSheetCapitalBase: number;

  @Output() toggleConfiguration: EventEmitter<void> = new EventEmitter<void>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private benchmarkY = 100000000;

  public filterValue: string;
  public newBps: number;
  public selectedBenchmark = 1;



  // Meta Grid configuratoin ----------------------------------------------------------------------------------------

  public gridOptions: GridOptions = {
    // Grid basic setup
    defaultColDef: {
      filter: 'agTextColumnFilter',
      enableValue: true,
      allowedAggFuncs: ['sum', 'min', 'max'],
      enableCellChangeFlash: true,
    },
    rowData: undefined,
    columnDefs: [
      { headerName: 'Asset', field: 'asset_class', rowGroup: true, checkboxSelection: true, suppressFilter: true, hide: true },
      { headerName: 'Security', field: 'security', sort: 'asc', sortedAt: 1 },
      { headerName: 'Liquidity', field: 'liquidity', sort: 'asc', sortedAt: 0 },
      {
        headerName: 'Ann Vol', field: 'ann_vol', valueGetter: params => {
          const assetName = params.getValue('asset_class');
          if (assetName) {
            if (assetName.includes('RATES') || assetName.includes('AGENCY') || assetName.includes('CREDIT')) { return Math.floor(params.data.ann_vol); } else { return Math.round(params.data.ann_vol * 10) / 10 + '%'; }
          }
        }
      },
      {
        headerName: 'ATM 1mo vol', field: 'ATM_1mo_vol', valueGetter: params => {
          if (params.data && params.data.ATM_1mo_vol === 'N/A') { return ""; }
          const assetName = params.getValue('asset_class');
          if (assetName) {
            if (assetName.includes('RATES') || assetName.includes('AGENCY') || assetName.includes('CREDIT')) {
              return Math.floor(params.data.ATM_1mo_vol);
            } else { return Math.round(params.data.ATM_1mo_vol * 10) / 10 + '%'; }
          }
        }
      },
      { headerName: 'ATM 1yr percentile', field: 'ATM_1yr_percentile', valueFormatter: params => {
        if(params.data && params.data['ATM_1yr_percentile'] === "N/A"){return ""}
        return params.data && (params.data['ATM_1yr_percentile'] * 100).toFixed(2)
      } },
      { headerName: 'origin', field: 'size_10bps', hide: true },
      // {
      //   headerName: '5 bps',
      //   colId: '5bps',
      //   valueGetter: params => Math.floor(parseFloat(params.getValue('size_10bps')) * .5 * (this.selectedBenchmark / this.benchmarkY)) || undefined,
      //   valueFormatter: params => params.value && params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      // },
      // {
      //   headerName: '10 bps',
      //   colId: '10bps',
      //   valueGetter: params => Math.floor(parseFloat(params.getValue('size_10bps')) * 1 * (this.selectedBenchmark / this.benchmarkY)) || undefined,
      //   valueFormatter: params => params.value && params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      // },
      // {
      //   headerName: '20 bps',
      //   colId: '20bps',
      //   valueGetter: params => Math.floor(parseFloat(params.getValue('size_10bps')) * 2.0 * (this.selectedBenchmark / this.benchmarkY)) || undefined,
      //   valueFormatter: params => params.value && params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      // },
      // {
      //   headerName: '25 bps',
      //   colId: '25bps',
      //   valueGetter: params => Math.floor(parseFloat(params.getValue('size_10bps')) * 2.5 * (this.selectedBenchmark / this.benchmarkY)) || undefined,
      //   valueFormatter: params => params.value && params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      // },
      // {
      //   headerName: '50 bps',
      //   colId: '50bps',
      //   valueGetter: params => Math.floor(parseFloat(params.getValue('size_10bps')) * 5 * (this.selectedBenchmark / this.benchmarkY)) || undefined,
      //   valueFormatter: params => params.value && params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      // },
    ],

    // columns functional feature
    enableSorting: true,
    enableFilter: true,
    floatingFilter: true,
    enableColResize: true,

    // rows functional feature
    enableRangeSelection: true,

    // Event handling
    onGridReady: this.onGridReady.bind(this),

    // Cell Range Aggregation
    statusBar: {
      statusPanels: [
        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
        { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
        { statusPanel: 'agAggregationComponent' }
      ]
    },

    // Row styling
    getRowClass: params => params.data ? `liquidity-${params.data.liquidity}` : '',

  };



  // -----------------------------------------------------------------------------------------------------------------

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.gridOptions.api && changes.sizingSheetItems) {
      this.gridOptions.api.setRowData(this.sizingSheetItems);
    }

    if (this.gridOptions.api && changes.sizingCapitals) {
      const defaultSelectedCapital = changes.sizingCapitals.currentValue.filter(sizingCapital => sizingCapital.default === true)[0];
      this.selectedBenchmark = defaultSelectedCapital.capital;
      this.gridOptions.api.refreshCells();
    }

    if (this.gridOptions.api && changes.sizingSheetCapitalBase) {
      this.benchmarkY = changes.sizingSheetCapitalBase.currentValue;
      this.gridOptions.api.refreshCells();
    }


    if (changes && changes.sizingSheetDefaultColumns && changes.sizingSheetDefaultColumns.currentValue
      && changes.sizingSheetDefaultColumns.currentValue.length > 0) {
      const otherCols = changes.sizingSheetDefaultColumns.currentValue.map((bps) => {
        this.addBpsColumn(bps);
      });
    }
  }

  onGridReady(params) {
    // this will expose the gridApi and the gridColumnApi to the component scope
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onToggleConfiguration(): void {
    this.toggleConfiguration.emit();
  }

  // Extra grid feature ---------------------------------------------------------------------------------------

  onGlobalFilterValueDataReady() {
    this.gridOptions.api.setQuickFilter(this.filterValue);
  }

  addNewBps() {
    this.addBpsColumn(this.newBps);
  }

  addBpsColumn(bps: any): void {
    const factor = bps / 10.0;
    const newColDef = {
      headerName: `${bps} bps`,
      colId: `${bps}bps`,
      valueGetter: params => Math.floor(parseFloat(params.getValue('size_10bps')) * factor * (this.selectedBenchmark / this.benchmarkY)) || undefined,
      valueFormatter: params => params.value && params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    };

    this.gridOptions.columnDefs.push(newColDef);
    this.gridApi.setColumnDefs(this.gridOptions.columnDefs);
    this.gridApi.sizeColumnsToFit();
    this.newBps = undefined;
  }

  onSelectedBenchmarkChange() {
    this.gridApi.refreshCells();
  }

  // untility -----------------------
  format(value) {
    return value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  timeFormat(timeString) {
    const time = new Date(timeString);
    return time.toLocaleString();
  }
}
