import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-risk-span-raw-data-viewer',
  templateUrl: './risk-span-raw-data-viewer.component.html',
  styleUrls: ['./risk-span-raw-data-viewer.component.scss']
})
export class RiskSpanRawDataViewerComponent implements OnInit, OnChanges {

  @Input() rawData: any;
  @Input() loading: boolean;
  @Input() targetColumn: string;
  @Input() searchText: string;
  @Input() summaryMode = true;
  @Output() setColumnsColletions = new EventEmitter<string[]>();
  @Output() showDetail = new EventEmitter<any>();

  public gridData: any[];

  public customGridOption: GridOptions = {
    columnDefs: [],
    suppressColumnVirtualisation: true,
    showToolPanel: true,
    onCellClicked: params => {
      if (params.column.getColId() === 'detail' && this.summaryMode) {
        this.showDetail.emit(params.data['ClusterName']);
      }
    }
  };
  public extraOption = {
    autoSizeColumns: true
  };
  public columnDefs: ColDef[];

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rawData && changes.rawData.currentValue) {
      if (this.summaryMode) {
        this.columnDefs = changes.rawData.currentValue.data && this.generateDynamicColumns(changes.rawData.currentValue.data);
        this.gridData = changes.rawData.currentValue.data;
      } else {
        this.columnDefs = this.generateDynamicColumns(changes.rawData.currentValue);
        this.gridData = changes.rawData.currentValue;
      }

      if (this.gridApi) {
        this.setColumnDefs(this.columnDefs);
      }
    }

    if (changes.targetColumn && changes.targetColumn.currentValue && this.gridApi) {
      this.gridApi.ensureColumnVisible(changes.targetColumn.currentValue);
      this.gridApi.flashCells({columns: [changes.targetColumn.currentValue]});
    }

    if (changes.searchText && changes.searchText.currentValue !== undefined && this.gridApi) {
      this.gridApi.setQuickFilter(this.searchText);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.gridApi.closeToolPanel();

    if (this.columnDefs) {
      this.setColumnDefs(this.columnDefs);
    }
  }

  generateDynamicColumns(gridData: any[] = []): ColDef[] {
    const firstRow = gridData[0];
    const columnNames =  Object.keys(firstRow);
    this.setColumnsColletions.emit(columnNames);
    const columnDefs: ColDef[] = columnNames.map(key => {
      return {
        headerName: key,
        field: key,
        filter: 'agNumberColumnFilter',
        valueGetter: params => key.toLowerCase().includes('date') ? params.data[key].toString() : params.data[key],
      };
    });

    if (this.summaryMode === true) {
      columnDefs.push({
        headerName: 'cohort Detail',
        field: 'detail',
        valueFormatter: params => 'Show Detail',
        cellClass: 'grid-cell-clickable-link',
        pinned: 'right'
      });
    }

    return columnDefs;
  }

  setColumnDefs(columnDefs) {
    this.gridApi.setColumnDefs([]);
    this.gridApi.setColumnDefs(columnDefs);
  }
}
