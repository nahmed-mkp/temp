import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
  selector: 'app-pnl-attribution-timeseries-grid-viewer',
  templateUrl: './pnl-attribution-timeseries-grid-viewer.component.html',
  styleUrls: ['./pnl-attribution-timeseries-grid-viewer.component.scss']
})
export class PnlAttributionTimeseriesGridViewerComponent implements OnInit, OnChanges {

  @Input() attributionTimeseriesData;
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() darkTheme: boolean;

  private formattedData: any[];
  private colDefs: ColDef[];
  private gridApi: GridApi;
  public customGridOption: any;

  private nameMapping = {
    'TotalPL': 'TotalPL (Daily)',
    'bpsToFund': 'BpsToFund (Daily)',
    'bpsToCap': 'BpsToCap (Daily)',
    'TotalPL_acc': 'TotalPL (Cumulative)',
    'bpsToFund_acc': 'BpsToFund (Cumulative)',
    'bpsToCap_acc': 'BpsToCap (Cumulative)'
  }

  constructor(private utilityService: UtilityService) { 
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.customGridOption = {

      // Column Def
      defaultColDef: {
        filter: 'agTextColumnFilter',
        width: 100,
        suppressMenu: true,
        cellStyle: params => {
          let styleObj: any = {};
          if (typeof params.value === 'number') {
            styleObj = Object.assign(styleObj, {'justify-content': 'flex-end'});
          }
          if (params.colDef && params.colDef.field && params.colDef.field.includes('_acc')) {
            styleObj = Object.assign(styleObj, {'background': '#3f51b50f'});
          }
          return styleObj;
        },
        cellClass: 'right-border-light'
      },
      columnDefs: [],

      // Outlook 
      sideBar: false,
      suppressAggFuncInHeader: true,

      rowClass: 'medium-row',
      rowHeight: 22,
      groupHeaderHeight: 24,
      headerHeight: 24,
      floatingFiltersHeight: 28,
      showToolPanel: false,


      // Misc Behavior
      rowSelection: 'single',
      context: this,
      statusBar: {
          statusPanels: [
          {statusPanel: 'agAggregationComponent'},
          {statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
        ]
      },

        // Framework
      frameworkComponents: {
        'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.attributionTimeseriesData && changes.attributionTimeseriesData.currentValue) {
      this.formattedData = this._formatData(changes.attributionTimeseriesData.currentValue);
      this.colDefs = this._createColumnDefs(changes.attributionTimeseriesData.currentValue);
      if (this.gridApi) {
        this.gridApi.setColumnDefs(this.colDefs);
        this.gridApi.setRowData(this.formattedData);
      }
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;

    if (this.formattedData) {
      this.gridApi.setRowData(this.formattedData);
    }

    if (this.colDefs) {
      this.gridApi.setColumnDefs(this.colDefs);
    }
  }


  // Utitlity --------------------------------------------------
  private _formatData(rawData) {
    const columnNames = rawData.columns || [];
    const data = rawData.data || [];
    const formattedData = data.map(element => {
      const formattedObj: any = {};
      columnNames.forEach((name, index) => {
        formattedObj[name] = element[index];
      });
      return formattedObj;
    });
    return formattedData;
  }

  private _createColumnDefs(rawData): ColDef[] {
    const columnNames = rawData.columns || [];
    const colDefs: ColDef[] = columnNames.map(name => {
      if (name !== 'Date') {
        return {
          headerName: this.nameMapping[name],
          field: name,
          valueFormatter: params => {
            return  this.utilityService.formatNumberWithCommasAndDigitAdvance(2)(params);
          },
        };
      } else {
        return {
          headerName: name,
          field: name,
          sort: 'desc',
          comparator: (valueA, valueB) => {
            const dateA = (new Date(valueA)).getTime();
            const dateB = (new Date(valueB)).getTime();
            return dateA - dateB;
          }
        };
      }
    });
    return colDefs;
  }

}
