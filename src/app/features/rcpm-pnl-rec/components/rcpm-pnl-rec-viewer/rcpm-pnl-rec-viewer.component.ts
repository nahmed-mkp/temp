import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';

import { UtilityService } from 'src/app/services';


@Component({
  selector: 'app-rcpm-pnl-rec-viewer',
  templateUrl: './rcpm-pnl-rec-viewer.component.html',
  styleUrls: ['./rcpm-pnl-rec-viewer.component.scss']
})
export class RcpmPnlRecViewerComponent implements OnInit, OnChanges {

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
          return this.utilityService.formatNumberWithCommasAndDigit(2)(params);
        }
      }
    },


    columnDefs: [
      { headerName: 'SecurityName', field: 'SecurityName', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', pinned: 'left' },
      { headerName: 'FundName', field: 'FundName', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', width: 60 },
      { headerName: 'PodName', field: 'PodName', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', width: 60 },
      { headerName: 'TradeName', field: 'TradeName', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', width: 60 },
      { headerName: 'SecurityType', field: 'SecurityType', enablePivot: true, enableRowGroup: true, filter: 'agSetColumnFilter', width: 60 },
      { headerName: 'Currency', field: 'Currency', enablePivot: true, filter: 'agSetColumnFilter', enableRowGroup: true},
      { headerName: 'TradeId', field: 'TradeId', enablePivot: true, enableRowGroup: true},
      {
        headerName: 'Missing? [Prizm]', field: 'isMissingInPRIZM', enablePivot: true, enableRowGroup: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Missing? [RCPM]', field: 'isMissingInRCPM', enablePivot: true, enableRowGroup: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end', 'width': 20 }
      },
      {headerName: 'IsUnsettledClosingTradeStillAccruing', field: 'IsUnsettledClosingTradeStillAccruing', enablePivot: true, enableRowGroup: true},
      {
        headerName: 'Notional [RCPM]', field: 'RCPM_Notional', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Notional [Prizm]', field: 'PRIZM_Notional', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Notional (Diff)', field: 'DiffNotional', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {headerName: 'Total P&L [RCPM]', field: 'RCPM_TotalPnL', aggFunc: 'sum', enableValue: true},
      {headerName: 'Total P&L [Prizm]', field: 'PRIZM_TotalPnL', aggFunc: 'sum', enableValue: true},
      {
        headerName: 'Total P&L (Diff)', field: 'DiffTotalPnL', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'TotalPnLAdjusted (Diff)', field: 'DiffTotalPnLAdjusted',  aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'TotalPnLAdjusted [Prizm]', field: 'PRIZM_TotalPnLAdjusted',  aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },



      {headerName: 'Prc', field: 'Prc'},
      {headerName: 'PrevClosePrc', field: 'PrevClosePrc'},
      {
        headerName: 'Price P&L [RCPM]', field: 'RCPM_PricePnl', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Price P&L [Prizm]', field: 'PRIZM_PricePnL', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Price P&L (Diff)', field: 'DiffPricePnL', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'P&L Adjustment [Prizm]', field: 'PRIZM_PnLAdjustment', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },




      {headerName: 'Accrued [RCPM]', field: 'RCPM_Accrued', aggFunc: 'sum', enableValue: true},
      {headerName: 'Accrued [Prizm]', field: 'PRIZM_Accrued', aggFunc: 'sum', enableValue: true},
      {
        headerName: 'Accrued (Diff)', field: 'DiffAccruedInterest', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Factor Paydown [RCPM]', field: 'RCPM_FactorDownPnL', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Factor Paydown [Prizm]', field: 'PRIZM_FactorDownPnL', aggFunc: 'sum', enableValue: true ,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Factor Paydown (Diff)', field: 'DiffFactorPayDownPnl', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      { headerName: 'Repo Charges [RCPM]', field: 'RCPM_RepoCharges', aggFunc: 'sum', enableValue: true },
      { headerName: 'Repo Charges [Prizm]', field: 'PRIZM_RepoCharges', aggFunc: 'sum', enableValue: true },
      {
        headerName: 'Repo Charges (Diff)', field: 'DiffRepoCharges', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Repo FX [RCPM]', field: 'RCPM_RepoFXPnL', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Repo FX [Prizm]', field: 'PRIZM_RepoFxPnl', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Repo FX (Diff)', field: 'DiffRepoFXPL', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Funding Accrual [RCPM]', field: 'FundAccrualCharges', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Funding Accrual [Prizm]', field: 'PRIZM_FundAccrualCharges', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Funding Accrual (Diff)', field: 'DiffFundAccrualCharges', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {headerName: 'Commissions [RCPM]', field: 'RCPM_Commission', aggFunc: 'sum', enableValue: true},
      {headerName: 'Commissions [Prizm]', field: 'PRIZM_Commission', aggFunc: 'sum'},
      {
        headerName: 'Commissions (Diff)', field: 'DiffCommission', aggFunc: 'sum',
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Ticket Charges [RCPM]', field: 'RCPM_TicketCharges', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Ticket Charges [Prizm]', field: 'PRIZM_TicketCharges', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
      },
      {
        headerName: 'Ticket Charges (Diff)', field: 'DiffTicketCharges', aggFunc: 'sum', enableValue: true,
        cellStyle: { 'background-color': '#dbf7de', 'justify-content': 'flex-end' }
      },
      { headerName: 'MonthEndAdjustment', field: 'MonthEndAdjustment', aggFunc: 'sum', enableValue: true },
      { headerName: 'MonthEndAdjustment [Prizm]', field: 'PRIZM_MonthEndAdjustment', aggFunc: 'sum', enableValue: true },
      { headerName: 'MonthEndAdjustment (Diff)', field: 'DiffMonthEndAdjustment', aggFunc: 'sum', enableValue: true },


      { headerName: 'CloPayment', field: 'CloPayment', aggFunc: 'sum', enableValue: true },
      {headerName: 'FundId', field: 'FundId', hide: false},
      {headerName: 'PodId', field: 'PodId', hide: false},
      {headerName: 'TID', field: 'TID', hide: false},
      {headerName: 'SID', field: 'SID', hide: false},
    ],

    sideBar: true,
    suppressAggFuncInHeader: true,
    groupHeaderHeight: 100,
  };

  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {}

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    // this.gridApi.closeToolPanel();
  }

}
