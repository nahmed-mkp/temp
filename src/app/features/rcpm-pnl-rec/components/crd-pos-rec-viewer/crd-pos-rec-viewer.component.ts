import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';

import { UtilityService } from 'src/app/services';


@Component({
    selector: 'app-crd-pos-rec-viewer',
    templateUrl: './crd-pos-rec-viewer.component.html',
    styleUrls: ['./crd-pos-rec-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CRDPosRecViewerComponent implements OnInit {

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
                    { 'justify-content': 'flex-end' } : {};
            },
            cellClass: 'right-border',
            filter: 'agNumberColumnFilter',
            valueFormatter: params => {
                if (typeof params.value === 'number' && params.colDef.field.toLowerCase().includes('id') === false) {
                    return this.utilityService.formatNumberWithCommasAndDigit(2)(params);
                }
            }
        },

        columnDefs: [
            {
                headerName: 'Reason',
                field: 'REASON',
                enablePivot: true,
                enableRowGroup: true,
                filter: 'agSetColumnFilter',
                pinned: 'left'
            },
            {
                headerName: 'Sec Name [CRD]',
                field: 'SEC_NAME_CRD',
                enablePivot: true,
                enableRowGroup: true,
                filter: 'agSetColumnFilter',
                pinned: 'left',
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-start' }
            },
            {
                headerName: 'Sec Name [DWH]',
                field: 'SEC_NAME_DWH',
                enablePivot: true,
                enableRowGroup: true,
                filter: 'agSetColumnFilter',
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-start' }
            },
            {
                headerName: 'Sec Type [CRD]',
                field: 'SEC_TYP_CD_CRD',
                enablePivot: true,
                filter: 'agSetColumnFilter',
                enableRowGroup: true
            },
            {
                headerName: 'Sec Type [DWH]',
                field: 'SEC_TYP_CD_DWH',
                enablePivot: true,
                filter: 'agSetColumnFilter',
                enableRowGroup: true
            },
            {
                headerName: 'Fund [CRD]',
                field: 'ACCT_CD_CRD',
                enablePivot: true,
                enableRowGroup: true,
                filter: 'agSetColumnFilter',
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-start' }
            },
            {
                headerName: 'Fund [DWH]',
                field: 'ACCT_CD_DWH',
                enablePivot: true,
                enableRowGroup: true,
                filter: 'agSetColumnFilter',
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-start' }
            },
            {
                headerName: 'Cusip [CRD]',
                field: 'CUSIP_CRD',
                enablePivot: true,
                filter: 'agSetColumnFilter',
                enableValue: true
            },
            {
                headerName: 'Cusip [DWH]',
                field: 'CUSIP_DWH',
                enablePivot: true,
                filter: 'agSetColumnFilter',
                enableValue: true
            },
            {
                headerName: 'Maturity [CRD]',
                field: 'MATURE_DATE_CRD',
                valueFormatter: this.utilityService.formatDate,
                enablePivot: true,
                enableValue: true,
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-start' }
            },
            {
                headerName: 'Maturity [DWH]',
                field: 'MATURE_DATE_DWH',
                valueFormatter: this.utilityService.formatDate,
                enablePivot: true,
                enableValue: true,
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-start' }
            },
            {
                headerName: 'Notional [CRD]',
                field: 'NOTIONAL_CRD',
                aggFunc: 'sum',
                enableValue: true
            },
            {
                headerName: 'Notional [DWH]',
                field: 'NOTIONAL_DWH',
                aggFunc: 'sum',
                enableValue: true
            },
            {
                headerName: 'Price [CRD]',
                field: 'MKT_PRICE_CRD',
                enablePivot: false,
                enableValue: true,
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
            },
            {
                headerName: 'Price [DWH]',
                field: 'MKT_PRICE_DWH',
                enablePivot: false,
                enableValue: true,
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
            },
            {
                headerName: 'Prior Price [CRD]',
                field: 'PREV_PRICE_CRD',
                enablePivot: false,
                enableValue: true
            },
            {
                headerName: 'Prior Price [DWH]',
                field: 'PREV_PRICE_DWH',
                enablePivot: false,
                enableValue: true
            },
            {
                headerName: 'Contract Size [CRD]',
                field: 'CONTRACT_SIZE_CRD',
                enablePivot: false,
                enableValue: true,
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
            },
            {
                headerName: 'Contract Size [DWH]',
                field: 'CONTRACT_SIZE_DWH',
                enablePivot: false,
                enableValue: true,
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
            },
            {
                headerName: 'Factor [CRD]',
                field: 'FACTOR_CRD',
                enablePivot: false,
                enableValue: true,
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(5),
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
            },
            {
                headerName: 'Factor [DWH]',
                field: 'FACTOR_DWH',
                enablePivot: false,
                enableValue: true,
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(5),
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
            },
            {
                headerName: 'Sec ID [CRD]',
                field: 'SEC_ID',
                enablePivot: true,
                enableRowGroup: true,
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
            },
            {
                headerName: 'Sec ID [DWH]',
                field: 'SEC_ID_DWH',
                enablePivot: true,
                enableRowGroup: true,
                cellStyle: { 'background-color': '#daf4fa', 'justify-content': 'flex-end' }
            },
            {
                headerName: 'SID [DWH]',
                field: 'SID_DWH',
                enablePivot: true,
                enableRowGroup: true
            }
        ],

        sideBar: true,
        suppressAggFuncInHeader: true,
        groupHeaderHeight: 100,
    };

    constructor(private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        // this.gridApi.closeToolPanel();
    }

}
