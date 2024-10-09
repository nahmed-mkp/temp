import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';

@Component({
  selector: 'app-pool-bidlist-viewer',
  templateUrl: './pool-bidlist-viewer.component.html',
  styleUrls: ['./pool-bidlist-viewer.component.scss']
})
export class PoolBidlistViewerComponent implements OnInit, OnChanges {

  @Input() customGridOption: GridOptions;
  @Input() data: any[];
  @Input() loading: boolean;

  @Output() resetFilterFunction = new EventEmitter<any>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  public extraOption = {
    autoSizeColumns: true,
  };

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.onResetFilters = this.onResetFilters.bind(this);
  }

  ngOnInit() {
    this.resetFilterFunction.emit(this.onResetFilters);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.customGridOption && changes.customGridOption.currentValue && this.gridApi) {
      this.gridApi.setColumnDefs([]);
      this.gridApi.setColumnDefs(this.customGridOption.columnDefs);
    }

    if (changes.data && changes.data.currentValue && this.gridApi) {
      this.gridApi.setRowData(this.data);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    if (this.data && this.data.length > 0) {
      this.gridApi.setRowData(this.data);
    }
  }

  onResetFilters() {
    this.gridApi.setFilterModel(null);
  }
}
