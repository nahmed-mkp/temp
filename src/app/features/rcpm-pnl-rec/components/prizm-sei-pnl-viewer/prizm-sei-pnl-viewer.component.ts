import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import { AppGridCustomStatusBarCellRangesStatisticComponent, AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
    selector: 'app-prizm-sei-pnl-viewer',
    templateUrl: './prizm-sei-pnl-viewer.component.html',
    styleUrls: ['./prizm-sei-pnl-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrizmSEIPnlViewerComponent implements OnInit {

    @Input() funds: string[];
    @Input() data: any[];

    @Input() filesUploading: boolean;
    @Input() filesUploaded: boolean;
    @Input() filesUploadError: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = {
        autoSizeColumns: true
    };
    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
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
                headerName: 'Year', field: 'Year', hide: false, filter: 'agSetColumnFilter', type: 'number', 
                valueFormatter: this.utilityService.formatNumberAdvance(0)
            },
            {
                headerName: 'Month', field: 'Month', hide: false, filter: 'agSetColumnFilter', type: 'number',
                valueFormatter: this.utilityService.formatNumberAdvance(0)
            },
            { headerName: 'PnlDate', field: 'PnlDate', hide: false, type: ['dateColumn'], pinned: 'left', filter: 'agSetColumnFilter' },
            { headerName: 'Fund', field: 'Fund', hide: false, pinned: 'left', filter: 'agSetColumnFilter' },
            { headerName: 'SecType', field: 'SecurityType', pinned: 'left', filter: 'agSetColumnFilter' },
            { headerName: 'MKP SecType', field: 'UDF1052SecType', pinned: 'left', filter: 'agSetColumnFilter' },
            { headerName: 'SecName', field: 'SecurityDescription', pinned: 'left', filter: 'agSetColumnFilter' },
            { headerName: 'MKP SecName', field: 'UDF1052HoldingsGroup', filter: 'agSetColumnFilter' },
            { headerName: 'CUSIP', field: 'CUSIP', filter: 'agSetColumnFilter' },
            { headerName: 'MKP CUSIP', field: 'UDF1052Cusip', filter: 'agSetColumnFilter' },
            { headerName: 'ISIN', field: 'ISIN', filter: 'agSetColumnFilter' },
            { headerName: 'Currency', field: 'Currency', filter: 'agSetColumnFilter' },
            { headerName: 'IndustryCode', field: 'UDF1052IndustryCode', filter: 'agSetColumnFilter' },
            { headerName: 'SettleDate', field: 'SettleDate', filter: 'agSetColumnFilter' },
            { headerName: 'UnderlyingISIN', field: 'UnderlyingISIN', filter: 'agSetColumnFilter' },
            { headerName: 'MTDPLTotal', field: 'MTDPLTotal', type: ['numberColumn'], pinned: 'right',
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end' };
                },
            }
        ],

        sideBar: false,
        suppressAggFuncInHeader: false,
        groupHeaderHeight: 100,

        statusBar: {
            statusPanels: [
                {
                    statusPanel: 'agAggregationComponent',
                    statusPanelParams: {
                        aggFuncs: ['sum']
                    }
                },
                {
                    statusPanel: 'AppGridCustomStatusBarCellValueComponent',
                    statusPanelParams: {
                        fractionDigits: 2
                    }
                },
            ],
        },


        // Framework
        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
            'AppGridCustomStatusBarCellRangesStatisticComponent': AppGridCustomStatusBarCellRangesStatisticComponent
        }
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
