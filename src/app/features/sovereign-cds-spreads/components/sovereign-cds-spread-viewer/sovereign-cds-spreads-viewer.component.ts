import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { isNumber } from 'highcharts';
import moment from 'moment';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/services';

// import * as fromStore from '../../store';

@Component({
    selector: 'app-sovereign-cds-spread-viewer',
    templateUrl: './sovereign-cds-spreads-viewer.component.html',
    styleUrls: ['./sovereign-cds-spreads-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SovereignCDSSpreadsViewerComponent implements OnChanges {

    @Input() sovereignCdsSpreads: any;
    @Input() sovereignCdsSpreadsLoading: boolean;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {
        defaultColDef: {
          filter: 'agTextColumnFilter',
          enableCellChangeFlash: false,
          sortable: true,
          cellStyle: params => {
            return typeof params.value === 'number' ? { 'justify-content': 'flex-end', 'border-right': '1px dashed gainsboro'} : {'border-right': '1px dashed gainsboro'};
          },
        },
        getRowNodeId: data => data.Id,
        deltaRowDataMode: false,
        rowSelection: 'single',
        columnDefs: [

          {headerName: "As Of Date", field: "AsOfDate", valueFormatter: params => params.value ? moment(params.value).format('MM-DD-YYYY') : ''},
          {headerName: "Country", field: "Country"},
          {headerName: "Bloomberg Ticker", field: "BbgTicker"},

          {headerName: "Curr Bid", field: "BID",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "1D Bid Delta", field: "1D-Bid-Delta",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "1W Bid Delta", field: "1W-Bid-Delta",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "1M Bid Delta", field: "1M-Bid-Delta",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "52Wk Bid Avg", field: "52Wk-Bid-Avg",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "52Wk Bid Min", field: "52Wk-Bid-Min",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "52Wk Bid Max", field: "52Wk-Bid-Max",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
        
          {headerName: "Curr Ask", field: "ASK",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "1D Ask Delta", field: "1D-Ask-Delta",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "1W Ask Delta", field: "1W-Ask-Delta",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "1M Ask Delta", field: "1M-Ask-Delta",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "52Wk Ask Avg", field: "52Wk-Ask-Avg", valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "52Wk Ask Min", field: "52Wk-Ask-Min",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "52Wk Ask Max", field: "52Wk-Ask-Max",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "Last Price", field: "LAST_PRICE",  valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)},
          {headerName: "Id", field: "Id", hide: true},
        ]
    };

    constructor(private utilities: UtilityService) {
      this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.sovereignCdsSpreads && changes.sovereignCdsSpreads.currentValue && this.gridApi) {
        this.gridApi.setRowData(changes.sovereignCdsSpreads.currentValue);
      }
    }

    customGridCallBack(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.ColumnApi;
      if(this.sovereignCdsSpreads.length > 0){
        this.gridApi.setRowData(this.sovereignCdsSpreads);
      }
    }

}
