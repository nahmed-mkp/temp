import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';


@Component({
  selector: 'app-rcpm-pnl-attr-viewer',
  templateUrl: './rcpm-pnl-attr-viewer.component.html',
  styleUrls: ['./rcpm-pnl-attr-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RcpmPnlAttrViewerComponent implements OnInit {

  @Input() data: any[];
  @Input() loadingStatus: boolean;

  private gridApi: GridApi;
  private columnDefs: ColDef[];

  public customGridOption: GridOptions = {
    defaultColDef: {
      filter: 'agTextColumnFilter',
      enableRowGroup: true,
      cellStyle: params => {
        if (typeof params.value === 'number') {
          return {'text-align': 'right'}
        }
      }
    },
    columnDefs: [],
  }

  public extraOption = {toolPanel: true};

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi) {
      this.columnDefs = Object.keys(changes.data.currentValue[0]).map(key => {
        return {
          headerName: key,
          field: key,
        }
      });
      this.gridApi.setColumnDefs([]);
      this.gridApi.setColumnDefs(this.columnDefs);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    if (this.columnDefs) {
      this.gridApi.setColumnDefs(this.columnDefs);
    }
  }

}
