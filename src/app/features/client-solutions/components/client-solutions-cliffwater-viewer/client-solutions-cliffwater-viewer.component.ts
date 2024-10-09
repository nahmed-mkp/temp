import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-client-solutions-cliffwater-viewer',
  templateUrl: './client-solutions-cliffwater-viewer.component.html',
  styleUrls: ['./client-solutions-cliffwater-viewer.component.scss']
})
export class ClientSolutionsCliffwaterViewerComponent implements OnInit {

  @Input() data: any[];
  @Input() loading: boolean;
  @Input() asOfDate: Date;

  @Output() downloadFile = new EventEmitter<any>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {
    autoSizeColumns: true
  };

  public customGridOption: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
        return typeof params.value === 'number' &&
                params.colDef.field.toLowerCase().includes('id') === false ?
                {'justify-content': 'flex-end'} : { };
      },
      cellClass: 'right-border',
      filter: 'agNumberColumnFilter',
      valueFormatter:  params => {
        if ( typeof params.value === 'number' && params.colDef.field.toLowerCase().includes('id') === false) {
          return this.utilityService.formatNumberWithCommasAndDigit(3)(params);
        }
      },
    },
    columnDefs: [
      {headerName: 'Security:DisplayName', field: 'Security:DisplayName'},
      {headerName: 'Fund', field: 'Fund'},
      {headerName: 'FundCapital(k)', field: 'FundCapital(k)'},
      {headerName: 'SecTypeDisplayName', field: 'SecTypeDisplayName'},
      {headerName: 'Cusip', field: 'Cusip'},
      {headerName: 'ISIN', field: 'ISIN'},
      {headerName: 'Country', field: 'Country'},
      {headerName: 'ExposureCurrency', field: 'ExposureCurrency'},
      {headerName: 'Currency', field: 'Currency'},
      {headerName: 'IndustryGroup', field: 'IndustryGroup'},
      {headerName: 'IndustrySector', field: 'IndustrySector'},
      {headerName: 'HY or IG', field: 'HY or IG'},
      {headerName: 'Underlying', field: 'Underlying'},
      {headerName: 'Notional', field: 'Notional'},
      {headerName: 'Quantity', field: 'Quantity'},
      {headerName: 'MarketValue ($K)(k)', field: 'MarketValue ($K)(k)'},
      {headerName: 'Delta', field: 'Delta'},
      {headerName: 'MV Delta Equiv New(k)', field: 'MV Delta Equiv New(k)'},
      {headerName: 'MV Delta Equiv New % to Fund', field: 'MV Delta Equiv New % to Fund'},
      {headerName: 'MV Delta Equiv New - Long(k)', field: 'MV Delta Equiv New - Long(k)'},
      {headerName: 'MV Delta Equiv New - Long % to Fund', field: 'MV Delta Equiv New - Long % to Fund'},
      {headerName: 'MV Delta Equiv New - Short(k)', field: 'MV Delta Equiv New - Short(k)'},
      {headerName: 'MV Delta Equiv New - Short % to Fund', field: 'MV Delta Equiv New - Short % to Fund'},
      {headerName: 'DollarDuration', field: 'DollarDuration'},
      {headerName: 'DollarSpreadDur', field: 'DollarSpreadDur'},
      {headerName: 'DetailSecType', field: 'DetailSecType'},
      {headerName: 'RiskSecType', field: 'RiskSecType'},
      {headerName: 'Category', field: 'Category'},
      {headerName: 'Yield', field: 'Yield'},
      {headerName: 'Price', field: 'Price'},
      {headerName: 'CouponRate', field: 'CouponRate'},
      {headerName: 'Strike', field: 'Strike'},
      {headerName: 'MarketValueDeltaEquivSwap(k)', field: 'MarketValueDeltaEquivSwap(k)'},
      {headerName: 'MarketValueDeltaEquivSwap % to Fund', field: 'MarketValueDeltaEquivSwap % to Fund'},
      {headerName: 'MarketValueDeltaEquivSwap % to Pod', field: 'MarketValueDeltaEquivSwap % to Pod'},
      {headerName: 'Capital(k)', field: 'Capital(k)'},
      {headerName: 'ContractSize', field: 'ContractSize'},
      {headerName: 'Region', field: 'Region'},
      {headerName: 'FactorValue', field: 'FactorValue'},
      {headerName: 'Current FxRate', field: 'Current FxRate'},
      {headerName: 'Exposure - Long(k)', field: 'Exposure - Long(k)'},
      {headerName: 'Exposure - Long % to Fund', field: 'Exposure - Long % to Fund'},
      {headerName: 'Exposure - Long % to Pod', field: 'Exposure - Long % to Pod'},
      {headerName: 'Exposure - Short(k)', field: 'Exposure - Short(k)'},
      {headerName: 'Exposure - Short % to Fund', field: 'Exposure - Short % to Fund'},
      {headerName: 'Exposure - Short % to Pod', field: 'Exposure - Short % to Pod'},
      {headerName: 'Exposure ($K)(k)', field: 'Exposure ($K)(k)'},
      {headerName: 'Exposure ($K) % to Fund', field: 'Exposure ($K) % to Fund'},
      {headerName: 'Exposure ($K) % to Pod', field: 'Exposure ($K) % to Pod'},
      {headerName: 'Exposure ($K) bps to Fund', field: 'Exposure ($K) bps to Fund'},
      {headerName: 'Exposure ($K) bps to Leveraged Pod', field: 'Exposure ($K) bps to Leveraged Pod'},
      {headerName: 'Exposure ($K) bps to Pod', field: 'Exposure ($K) bps to Pod'},
      {headerName: 'Exposure Strategy (Monthly)', field: 'Exposure Strategy (Monthly)'},
      {headerName: 'Exposure Strategy (Weekly)', field: 'Exposure Strategy (Weekly)'},
      {headerName: 'MarketValueDeltaEquivSwap bps to Fund', field: 'MarketValueDeltaEquivSwap bps to Fund'},
      {headerName: 'MarketValueDeltaEquivSwap bps to Leveraged Pod', field: 'MarketValueDeltaEquivSwap bps to Leveraged Pod'},
      {headerName: 'MarketValueDeltaEquivSwap bps to Pod', field: 'MarketValueDeltaEquivSwap bps to Pod'},
      {headerName: 'MarketValueDeltaEquivShort bps to Pod', field: 'MarketValueDeltaEquivShort bps to Pod'},
      {headerName: 'MarketValueDeltaEquivShort bps to Leveraged Pod', field: 'MarketValueDeltaEquivShort bps to Leveraged Pod'},
      {headerName: 'MarketValueDeltaEquivShort bps to Fund', field: 'MarketValueDeltaEquivShort bps to Fund'},
      {headerName: 'MarketValueDeltaEquivShort % to Pod', field: 'MarketValueDeltaEquivShort % to Pod'},
      {headerName: 'MarketValueDeltaEquivShort(k)', field: 'MarketValueDeltaEquivShort(k)'},
      {headerName: 'MarketValueDeltaEquivShort % to Fund', field: 'MarketValueDeltaEquivShort % to Fund'},
      {headerName: 'MarketValueDeltaEquiv % to Fund', field: 'MarketValueDeltaEquiv % to Fund'},
      {headerName: 'MarketValueDeltaEquiv % to Pod', field: 'MarketValueDeltaEquiv % to Pod'},
      {headerName: 'MarketValueDeltaEquiv bps to Fund', field: 'MarketValueDeltaEquiv bps to Fund'},
      {headerName: 'MarketValueDeltaEquiv bps to Leveraged Pod', field: 'MarketValueDeltaEquiv bps to Leveraged Pod'},
      {headerName: 'MarketValueDeltaEquiv bps to Pod', field: 'MarketValueDeltaEquiv bps to Pod'},
      {headerName: 'MarketValueDeltaEquivLong(k)', field: 'MarketValueDeltaEquivLong(k)'},
      {headerName: 'MarketValueDeltaEquivLong % to Fund', field: 'MarketValueDeltaEquivLong % to Fund'},
      {headerName: 'MarketValueDeltaEquivLong % to Pod', field: 'MarketValueDeltaEquivLong % to Pod'},
      {headerName: 'MarketValueDeltaEquivLong bps to Fund', field: 'MarketValueDeltaEquivLong bps to Fund'},
      {headerName: 'MarketValueDeltaEquivLong bps to Leveraged Pod', field: 'MarketValueDeltaEquivLong bps to Leveraged Pod'},
      {headerName: 'MarketValueDeltaEquivLong bps to Pod', field: 'MarketValueDeltaEquivLong bps to Pod'},
      {headerName: 'MarketValueDeltaEquiv(k)', field: 'MarketValueDeltaEquiv(k)'},
      {headerName: 'AverageRating', field: 'AverageRating'},
      {headerName: 'BlbgCompositeRating', field: 'BlbgCompositeRating'},
      {headerName: 'Category + Rating', field: 'Category + Rating'},
      {headerName: 'FitchRating', field: 'FitchRating'},
      {headerName: 'HighestRating', field: 'HighestRating'},
      {headerName: 'LowestRating', field: 'LowestRating'},
      {headerName: 'MoodyRating', field: 'MoodyRating'},
      {headerName: 'Rating', field: 'Rating'},
      {headerName: 'Rating Category', field: 'Rating Category'},
      {headerName: 'RatingRange', field: 'RatingRange'},
      {headerName: 'SPRating', field: 'SPRating'},
      {headerName: 'Unrealized P/L Total ($)', field: 'Unrealized P/L Total ($)'},
      {headerName: 'Pod', field: 'Pod'},
      {headerName: 'TradeNameWithID', field: 'TradeNameWithID'},
      {headerName: 'ClientServices - Theme', field: 'ClientServices - Theme'},
      {headerName: 'ClientServices - Theme Breakdown', field: 'ClientServices - Theme Breakdown'},
      {headerName: '10yr Equiv New(k)', field: '10yr Equiv New(k)'},
      {headerName: '10yr Equiv New - Long(k)', field: '10yr Equiv New - Long(k)'},
      {headerName: '10yr Equiv New - Long % to Fund', field: '10yr Equiv New - Long % to Fund'},
      {headerName: '10yr Equiv New - Long % to Pod', field: '10yr Equiv New - Long % to Pod'},
      {headerName: '10yr Equiv New - Short(k)', field: '10yr Equiv New - Short(k)'},
      {headerName: '10yr Equiv New - Short % to Fund', field: '10yr Equiv New - Short % to Fund'},
      {headerName: '10yr Equiv New - Short % to Pod', field: '10yr Equiv New - Short % to Pod'},
      {headerName: '10yr Equiv New % to Fund', field: '10yr Equiv New % to Fund'},
      {headerName: '10yr Equiv New % to Pod', field: '10yr Equiv New % to Pod'},
      {headerName: 'MaturityDate', field: 'MaturityDate'},
      {headerName: 'DollarWAL', field: 'DollarWAL'},
      {headerName: 'WAL', field: 'WAL'},
      {headerName: 'Accrued This Period ($)', field: 'Accrued This Period ($)'},
      {headerName: 'Accrued Today ($)', field: 'Accrued Today ($)'},
      {headerName: 'MacroTheme', field: 'MacroTheme'},
      {headerName: 'Sym σ (3mo) (Quarterly) bps to Fund', field: 'Sym σ (3mo) (Quarterly) bps to Fund'},
      {headerName: 'σ (3mo) (Quarterly) bps to Fund', field: 'σ (3mo) (Quarterly) bps to Fund'},
      {headerName: 'σ (3mo) bps to Fund', field: 'σ (3mo) bps to Fund'},
      {headerName: 'MTD% P/L (pctToFund)', field: 'MTD% P/L (pctToFund)'},
      {headerName: 'Core Liquidity(k)', field: 'Core Liquidity(k)'},
      {headerName: 'CrossFund', field: 'CrossFund'},
      {headerName: 'CrossPod', field: 'CrossPod'},
      {headerName: 'CrossFundCapital(k)', field: 'CrossFundCapital(k)'},
      {headerName: 'YTD$ P/L ($k)(k)', field: 'YTD$ P/L ($k)(k)'},
      {headerName: 'MTD$ P/L ($k)(k)', field: 'MTD$ P/L ($k)(k)'},
      {headerName: 'Life$ P/L ($k)(k)', field: 'Life$ P/L ($k)(k)'},
      {headerName: 'IsOTCDerivative', field: 'IsOTCDerivative'},
      {headerName: 'ExpireDate', field: 'ExpireDate'},
      {headerName: 'DerivCtpy Rating', field: 'DerivCtpy Rating'},
    ],

    getContextMenuItems: params => {
      const csvExport = {
        name: 'CSV Export',
        action: () => this.onDownloadData_csv()
      };

      const excelExport = {
        name: 'Excel Export',
        action: () => this.onDownloadData_excel()
      };
      return ['copy', 'copyWithHeaders', 'separator', csvExport, excelExport];
    },
  };

  constructor(private utilityService: UtilityService) {
    this.onDownloadData_csv = this.onDownloadData_csv.bind(this);
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.downloadFile.emit(this.onDownloadData_csv);
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public onDownloadData_csv(): void {
    this.gridApi.exportDataAsCsv({
      fileName: `Cliffwater Report ${this.asOfDate.toLocaleDateString('zh-Hans-CN', {year: 'numeric', month: '2-digit', day: '2-digit'})}`
    });
  }

  private onDownloadData_excel(): void {
    this.gridApi.exportDataAsExcel({
      fileName: `Cliffwater Report ${this.asOfDate.toLocaleDateString('zh-Hans-CN', {year: 'numeric', month: '2-digit', day: '2-digit'})}`
    });
  }

}
