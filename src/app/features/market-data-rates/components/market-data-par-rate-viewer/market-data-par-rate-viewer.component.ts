import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-market-data-par-rate-viewer',
  templateUrl: './market-data-par-rate-viewer.component.html',
  styleUrls: ['./market-data-par-rate-viewer.component.scss']
})
export class MarketDataParRateViewerComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() header: string;
  @Input() digit: number;

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
    if (changes.header && changes.header.currentValue && this.gridApi) {
      this._changeHeaderName(changes.header.currentValue);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.header) {
      this._changeHeaderName(this.header);
    }
  }

  // Utility -----

  private _createGridOption(): GridOptions {
    return {
      defaultColDef: {
        suppressMenu: true,
        valueFormatter: this.digit ? this.utilityService.formatNumberWithCommasAndDigitAdvance(this.digit) : this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
      },
      columnDefs: [
        {headerName: 'Tenor', field: 'tenor', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: null,
          sort: 'asc', comparator: (valueA, valueB) => {
            const valueAFormat = parseInt(valueA.split('y')[0], 10);
            const valueBFormat = parseInt(valueB.split('y')[0], 10);
            return valueAFormat - valueBFormat;
          }
        },
        {headerName: 'Live', field: 'Live', cellClass: 'right-border-light'},
        {headerName: 'DoD chg', field: 'DoD chg', cellClass: 'right-border-light'},
        {headerName: '3M Low', field: '3M Low', cellClass: 'right-border-light'},
        {headerName: '3M High', field: '3M High', cellClass: 'right-border-light'},
        {headerName: 'pctl', field: 'pctl', cellClass: 'right-border-light', cellStyle: params => { return {'justify-content': 'flex-end'}}},
        {headerName: 'Step', field: 'Step', cellClass: 'right-border-light', valueFormatter: this.digit ? this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(this.digit) : this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(2)},
        {headerName: 'Step Chg', field: 'Step Chg', cellClass: 'right-border-light', valueFormatter: this.digit ? this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(this.digit) : this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(2)},
        {headerName: '# of Hikes', field: 'numHikes', cellClass: 'right-border-light'}
      ],

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
    const targetColDef =  this.gridApi.getColumnDef('tenor');
    targetColDef.headerName = name;
    this.gridApi.refreshHeader();
  }

}
