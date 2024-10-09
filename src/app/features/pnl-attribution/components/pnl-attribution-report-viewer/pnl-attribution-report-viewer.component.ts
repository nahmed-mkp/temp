import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, ColDef, CellClickedEvent, RowNode } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-pnl-attribution-report-viewer',
  templateUrl: './pnl-attribution-report-viewer.component.html',
  styleUrls: ['./pnl-attribution-report-viewer.component.scss']
})
export class PnlAttributionReportViewerComponent implements OnInit, OnChanges {

  @Input() reportData: any[];
  @Input() pods: string[];
  @Input() funds: string[];
  @Input() loading: boolean;
  @Input() selectedPods: string[];
  @Input() selectedFunds: string[];

  @Output() sendGridApi = new EventEmitter<GridApi>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {};
  public customGridOption: GridOptions = {
    defaultColDef: {
      filter: 'agTextColumnFilter',
      editable: false,
      enableCellChangeFlash: false,
      cellStyle: params => {
        let styleObj = {'justify-content': 'flex-end'};
        // if (typeof params.value === 'number') {
        //   styleObj = Object.assign(styleObj, {'justify-content': 'flex-end'})
        // }
        if (params.node.data['PodName'] === 'TotalFund') {
          styleObj = Object.assign(styleObj, {'border-top': '3px solid #8080804d'})
        }

        return styleObj;
      },
      cellClass: 'cell-right-border',
      headerClass: 'word-wrap'
    },

    columnDefs: [],
    sideBar: false,
    headerHeight: 55
  }

  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  
  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.sendGridApi.emit(this.gridApi);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.reportData && changes.reportData.currentValue && this.selectedFunds) {
      setTimeout(() => {
        const colDefs = this._createDynamicColDef(this.selectedFunds);
        if (this.gridApi) {
          this.gridApi.setColumnDefs(colDefs);
        }
      }, 200)
    }
  }

  private _createDynamicColDef(funds: string[]): ColDef[] {
    const colDefs: ColDef[] = [];
    colDefs.push({
      headerName: 'PodName',
      field: 'PodName',
      sort: 'asc',
      width: 120,
      comparator: (valueA, valueB, nodeA, nodeB) => {
        if (valueA === 'TotalFund') {
          return 1;
        } else if (valueB === 'TotalFund') {
          return -1
        } else {
          valueA.localeCompare(valueB)
        }
      },
      cellStyle: params => {
        let styleObj = {'justify-content': 'flex-start'};
        if (params.node.data['PodName'] === 'TotalFund') {
          styleObj = Object.assign(styleObj, {'border-top': '3px solid #8080804d'})
        }
        return styleObj;
      }
    });
    this.selectedFunds.forEach(fundName => {
      colDefs.push({
        headerName: fundName,
        field: fundName,
        valueGetter: this.utilityService.formatNumberWithCommaSeperated(0),
        width: 80,
      });
    });
    colDefs.push({
      headerName: 'TotalPod',
      field: 'TotalPod',
      valueGetter: this.utilityService.formatNumberWithCommaSeperated(0),
      cellClass: ['cell-left-border-thick'],
      width: 80,
    });
    return colDefs;
  }
}
