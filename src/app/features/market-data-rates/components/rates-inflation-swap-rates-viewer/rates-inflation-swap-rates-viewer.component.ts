import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import * as moment from 'moment';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-rates-inflation-swaps-viewer',
  templateUrl: './rates-inflation-swap-rates-viewer.component.html',
  styleUrls: ['./rates-inflation-swap-rates-viewer.component.scss']
})
export class RatesInflationSwapsRatesViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: any[];

  public timestamp: any = 'Loading';

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(private utilityService: UtilityService, private ref: ChangeDetectorRef) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.customGridOption = this._createGridOption();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    this.timestamp = `Last Updated: ${moment(this.data[0].UpdateDate).format('MM-DD-YYYY HH:mm:ss')}` ;
    this.data.map( item => {
      item.Alias = item.Alias.replace('InflationSwap:', '');
    });
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private _createGridOption(): GridOptions {
    return {
      defaultColDef: {
        suppressMenu: true,
        cellStyle: params => {
          return {'justify-content': 'flex-end'};
        },
      },
      columnDefs: [
        {headerName: 'US', field: 'Alias', cellClass: 'right-border-light', width: 145},
        {headerName: 'Prev. Close (%)', field: 'Value', cellClass: 'right-border-light', width: 145, valueFormatter:  params => params.value.toFixed(2)}
      ],
      sideBar: false,
      showToolPanel: false,
    };
  }

}

