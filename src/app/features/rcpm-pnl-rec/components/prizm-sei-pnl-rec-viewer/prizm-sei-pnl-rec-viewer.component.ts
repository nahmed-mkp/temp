import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import { AppGridCustomStatusBarCellRangesStatisticComponent, AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-prizm-sei-pnl-rec-viewer',
    templateUrl: './prizm-sei-pnl-rec-viewer.component.html',
    styleUrls: ['./prizm-sei-pnl-rec-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrizmSEIPnlRecViewerComponent implements OnInit {

    @Input() funds: string[];
    @Input() reconciliations: any[];

    @Input() reconciliationsLoading: boolean;
    @Input() reconciliationsLoaded: boolean;
    @Input() reconciliationsError: string;

    @Output() fundSelected: EventEmitter<string> = new EventEmitter<string>();

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
            {   headerName: 'MatchStatus', field: 'MatchStatus', hide: false, pinned: 'left', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'InvestmentID', field: 'InvestmentID', pinned: 'left', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'SecName', field: 'SecurityDescription', pinned: 'left', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'PnlDate', field: 'PnlDate', hide: false, filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'Fund', field: 'Fund', hide: false, filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'SecType', field: 'SecurityType', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'MKP SecType', field: 'UDF1052SecType', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'MKP SecName', field: 'UDF1052HoldingsGroup', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'CUSIP', field: 'CUSIP', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'MKP CUSIP', field: 'UDF1052Cusip', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'ISIN', field: 'ISIN', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'SEDOL', field: 'SEDOL', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'UnderlyingISIN', field: 'UnderlyingISIN', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                } },
            {
                headerName: 'Currency', field: 'Currency', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'SettleDate', field: 'SettleDate', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'Last Held', field: 'LastHeldDate', filter: 'agSetColumnFilter',
                cellStyle: params => {
                    return { 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'SEI MTD P/L', field: 'MTDPLTotal_SEI', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                pinned: 'right',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'background-color': '#f0d0a2', 'color': this.getColor(params)};
                },
            },
            {
                headerName: 'MKP MTD P/L', field: 'MTDPLTotal_MKP', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                pinned: 'right',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'background-color': '#f0d0a2', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'MTD P/L (Diff)', field: 'MTDPLTotal_Diff', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                pinned: 'right',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'background-color': '#f0d0a2', 'color': this.getColor(params)};
                },
            },
            {
                headerName: 'FX Rate (SEI)', field: 'SEIFXRate', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'FX Rate (MKP)', field: 'MKPFXRate', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                }
            },
            {
                headerName: 'PricePnL', field: 'PricePnL', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'Commission', field: 'Commission', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'AccruedInterest', field: 'AccruedInterest', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'FactorPayDownPnl', field: 'FactorPayDownPnl', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'RepoCharges', field: 'RepoCharges', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'RepoFxPnl', field: 'RepoFxPnl', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'TicketCharge', field: 'TicketCharge', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'MonthEndAdjustment', field: 'MonthEndAdjustment', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'CloPayment', field: 'CloPayment', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'FundAccrualCharges', field: 'FundAccrualCharges', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'PnlAdjustment', field: 'PnlAdjustment', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'RealizedPnLLocal', field: 'RealizedPnLLocal', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'UnRealizedPnlLocal', field: 'UnRealizedPnlLocal', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'FxPnL', field: 'FxPnL', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'UnrealizedTotalPnl', field: 'UnrealizedTotalPnl', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'RealizedFxPnl', field: 'RealizedFxPnl', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'UnRealizedFxPnl', field: 'UnRealizedFxPnl', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
                },
            },
            {
                headerName: 'MTDTotalPLUnadjusted', field: 'MTDTotalPLUnadjusted', type: ['numberColumn'],
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2),
                cellStyle: params => {
                    return { 'justify-content': 'flex-end', 'color': this.getColor(params) };
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
    }

    public selectFund(e: MatSelectChange): void {
        this.fundSelected.emit(e.value);
    }

    private getBackgroundColor(params): string {
        if (['MTDPLTotal_SEI', 'MTDPLTotal_MKP', 'MTDPLTotal_Diff'].indexOf(params.column.colId) >= 0) {
            return '#f0d0a2';
        }
        return null;
    }

    private getColor(params): string {
        if (params.data['MatchStatus'] === 'Full') {
            return '#999999';
        } else if (params.data['MatchStatus'].startsWith('Missing')) {
            return '#e01d2c';
        }
        return null;
    }
}
