import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-rates-ois-qe-forecast-viewer',
  templateUrl: './rates-ois-qe-forecast-viewer.component.html',
  styleUrls: ['./rates-ois-qe-forecast-viewer.component.scss']
})
export class RatesOisQuarterEndForecastViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: any[];
  @Input() layoutMode: 'spread' | 'compact' = 'spread';

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.customGridOption = this._createGridOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi) {
      this._changeHeaderName(this.data[0]['Header']);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.data && this.data.length > 0) {
      this._changeHeaderName(this.data[0]['Header']);
    }
  }

  // Utility -----

  private _createGridOption(): GridOptions {
    return {
      defaultColDef: {
        suppressMenu: true,
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
      },
      columnDefs: [
        // {headerName: 'header', field: 'header', rowGroup: true, hide: true},
        {headerName: 'Period', field: 'Period', cellClass: 'right-border-light', headerClass: 'header-bold', suppressSizeToFit: true, width: 48},
        {headerName: 'Live', field: 'Live', cellClass: 'right-border-light'},
        {headerName: 'DoD Chg', field: 'DoD chg', cellClass: 'right-border-light'},
        {headerName: 'Step', field: 'Step', cellClass: 'right-border-light', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(2)},
        {headerName: 'Step Chg', field: 'Step Chg', cellClass: 'right-border-light'}
      ],

      // autoGroupColumnDef: {
      //   field: 'index',
      //   cellRendererParams: {
      //     suppressCount: true
      //   },
      //   pinned: 'left',
      //   filter: 'agSetColumnFilter',
      //   cellClass: 'right-border',
      //   cellStyle: {'font-weight': 'bolder', 'color': '#424242de'}
      // },

      // Outlook
      // all even rows assigned 'my-shaded-effect'
      getRowClass: params => {
        if (params.node.rowIndex % 2 === 0) {
          return ['even-row-shaded-effect', 'ultra-small-row'];
        } else {
          return ['ultra-small-row'];
        }
      },
      rowHeight: 18,
      sideBar: false,
      showToolPanel: false,
    };
  }

  private _changeHeaderName(name: string) {
    const targetColDef = this.gridApi.getColumnDef('Period');
    targetColDef.headerName = name;
    this.gridApi.refreshHeader();
  }

}
