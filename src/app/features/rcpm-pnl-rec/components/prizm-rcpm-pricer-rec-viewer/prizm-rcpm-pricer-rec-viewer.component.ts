import { Component, OnInit, Input } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-prizm-rcpm-pricer-rec-viewer',
  templateUrl: './prizm-rcpm-pricer-rec-viewer.component.html',
  styleUrls: ['./prizm-rcpm-pricer-rec-viewer.component.scss']
})
export class PrizmRcpmPricerRecViewerComponent implements OnInit {

  @Input() data: any[];
  @Input() loadingStatus: boolean;

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
          return this.utilityService.formatNumberWithCommasAndDigit(0)(params);
        }
      }
    },
    columnDefs: [
      { headerName: 'CrossPodName', field: 'CrossPodName', enablePivot: true, enableRowGroup: true, rowGroup: true, filter: 'agSetColumnFilter', hide: true},
      { headerName: 'FundName', field: 'FundName', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', hide: true},
      { headerName: 'PodName', field: 'PodName', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', hide: true},
      { headerName: 'TradeNameWithId', field: 'TradeNameWithId', enablePivot: true, enableRowGroup: true, rowGroup: true, filter: 'agSetColumnFilter', hide: true},
      { headerName: 'ParentSecName', field: 'ParentSecName', enablePivot: true, enableRowGroup: true, rowGroup: true, filter: 'agSetColumnFilter', hide: true},
      { headerName: 'TradeName', field: 'TradeName', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', hide: true},
      { headerName: 'SecurityName', field: 'SecurityName', enablePivot: true, enableRowGroup: true, rowGroup: true, filter: 'agSetColumnFilter', hide: true},
      { headerName: 'SecurityType', field: 'SecurityType', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', hide: true},
      {headerName: '(PRIZM) Price ', field: 'PRIZM_Price', valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(5)},
      {headerName: '(RCPM) Price ', field: 'RCPM_Price', valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(5)},
      {headerName: '(PRIZM) Market Value ', field: 'MVUSD_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM)  Market Value ', field: 'MVUSD_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) Rate +1bp ', field: 'RatePlus1bp_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) Rate +1bp ', field: 'RatePlus1bp_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) $Duration ', field: 'DollarDur_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) $Duration ', field: 'DollarDur_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) $SpreadDuration ', field: 'DollarSpreadDur_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) $SpreadDuration ', field: 'DollarSpreadDur_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) $InflationDurationOneBp', field: 'DollarInflationDurationOneBp_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) $InflationDurationOneBp', field: 'DollarInflationDurationOneBp_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: 'PRIZM $Convexity', field: 'DollarConvexity_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: 'RCPM $Convexity', field: 'DollarConvexity_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) CreditSpread +1BP ', field: 'DollarCreditSpreadPlus1BP_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) CreditSpread +1BP ', field: 'DollarCreditSpreadPlus1BP_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) $VolDuration', field: 'DollarVolDuration_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) $VolDuration', field: 'DollarVolDuration_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) Vol +1Bp', field: 'DollarVolPlus1Bp_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) Vol +1Bp', field: 'DollarVolPlus1Bp_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) PxVol', field: 'PxVol_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) PxVol', field: 'PxVol_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) $Gamma1%', field: 'DollarGamma1Pct_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) $Gamma1%', field: 'DollarGamma1Pct_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) Currency -1%', field: 'CurrencyMinus1Pct_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) Currency -1%', field: 'CurrencyMinus1Pct_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) USD -1%', field: 'USDMinus1Pct_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) USD -1%', field: 'USDMinus1Pct_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) TimeValue', field: 'TimeValue_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM) TimeValue', field: 'TimeValue_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: '(PRIZM) OptionDecayPerDay', field: 'OptionDecayPerDay_PRIZM', aggFunc: 'sum', enableValue: true},
      {headerName: '(RCPM OptionDecayPerDay', field: 'OptionDecayPerDay_RCPM', aggFunc: 'sum', enableValue: true},
      {headerName: 'LastUpdatePrice_PRIZM', field: 'LastUpdatePrice_PRIZM', },
      {headerName: 'LastUpdatePrice_RCPM', field: 'LastUpdatePrice_RCPM'},
      {headerName: 'FundID', field: 'FundID'},
      {headerName: 'PodID', field: 'PodID'},
      {headerName: 'TID', field: 'TID'},
      {headerName: 'SID', field: 'SID'},
      {headerName: 'ParentSecId', field: 'ParentSecId'},
    ],

    sideBar: true,
    suppressAggFuncInHeader: true,
    groupHeaderHeight: 100,
  };



  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    // this.gridApi.closeToolPanel();
  }

}
