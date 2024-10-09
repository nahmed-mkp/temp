import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import * as fromModels from './../../models/order-book.models';
import { UtilityService } from 'src/app/services';
import { GridOptions, GridApi } from 'ag-grid-community';

@Component({
    selector: 'app-order-book-history',
    templateUrl: './order-book-history.component.html',
    styleUrls: ['./order-book-history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBookHistoryComponent implements OnInit, OnChanges {

    @Input() orderHistory: fromModels.IOrderHistory[];
    @Input() orderHistoryLoading: boolean;
    @Input() orderHistoryLoaded: boolean;
    @Input() orderHistoryError: string;

    public extraOption = {autoSizeColumns: true};
    public customGridOption: GridOptions;
    private gridApi: GridApi;

    constructor(private utilityService: UtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
        this.customGridOption = this._createGridOption();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.orderHistory && changes.orderHistory.currentValue) {
            // setTimeout(() => this._applyOrderStatusFilter(), 10);
        }
    }

    public customGridCallBack(params) {
        this.gridApi = params.api;
    }

    // Utility -------------------------------

    private _createGridOption(): GridOptions {
        return {
            defaultColDef: {
                suppressMenu: true,
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
                cellStyle: params => {
                  return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
                },
                cellClass: 'right-border-light',
                headerClass: 'ag-header-wrap'
            },

            columnDefs: [
                {
                    headerName: 'Audit Action',
                    field: 'auditAction',
                    maxWidth: 50,
                    cellStyle: (params) => {
                        return { 'background': '#fdf5c9'};
                    }
                },
                {
                    headerName: 'Audit Date',
                    field: 'AuditDate',
                    maxWidth: 120,
                    cellStyle: (params) => {
                        return { 'text-align': 'right', 'background': '#fdf5c9' };
                    },
                    valueFormatter: (params) => {
                        if (params.data && params.data.AuditDate) {
                            return this._format_iso_date(params.data.AuditDate);
                        }
                    }
                },
                {
                    headerName: 'Audit User',
                    field: 'AuditUser',
                    cellStyle: (params) => {
                        return { 'background': '#fdf5c9' };
                    }
                },
                {
                    headerName: 'Locked',
                    field: 'Locked'
                },
                {
                    headerName: 'Order Date',
                    field: 'OrderDate',
                    maxWidth: 70,
                    cellStyle: (params) => {
                        return { 'text-align': 'right' };
                    },
                    valueFormatter: (params) => {
                        if (params.data && params.data.OrderDate) {
                            const dateParts = params.data.OrderDate.split('T')[0].split('-');
                            return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
                        }
                    }
                },
                {
                    headerName: 'Pod',
                    field: 'Pod'
                },
                {
                    headerName: 'Order Type',
                    field: 'OrderType'
                },
                {
                    headerName: 'BuySell',
                    field: 'BuySell'
                },
                {
                    headerName: 'Security',
                    field: 'Security'
                },
                {
                    headerName: 'Quantity',
                    field: 'Quantity',
                    maxWidth: 60,
                    valueFormatter: (params) => {
                        if (params.data && params.data.Quantity) {
                            return params.data.Quantity.toLocaleString('en-US', { minimumFractionDigits: 0 });
                        }
                    }
                },
                {
                    headerName: 'Type',
                    field: 'Type'
                },
                {
                    headerName: 'Order Level',
                    field: 'Level',
                    maxWidth: 80,
                    valueFormatter: (params) => {
                        if (params.data && params.data.Level) {
                            return parseFloat(params.data.Level);
                        }
                    }
                },
                {
                    headerName: 'InWithNotIn',
                    field: 'InWith'
                },
                {
                    headerName: 'Contact',
                    field: 'Contact'
                },
                {
                    headerName: 'Expiry',
                    field: 'Expiry'
                },
                {
                    headerName: 'OrderStatus',
                    field: 'OrderStatus',
                    // suppressMenu: false,
                },
                {
                    headerName: 'LastUpdated',
                    field: 'LastUpdated',
                    valueFormatter: (params) => {
                        if (params.data && params.data.LastUpdated) {
                            return this._format_iso_date(params.data.LastUpdated);
                        }
                    }
                },
                {
                    headerName: 'Notes',
                    field: 'Notes'
                },
            ],

            getRowClass: params => {
                const rowClass = ['ultra-small-row'];
                if (params.node.rowIndex % 2 === 0) {
                  rowClass.push('even-row-shaded-effect');
                }
                return rowClass;
            },

            rowHeight: 18,
            sideBar: false,
            showToolPanel: false,
        };
    }

    private _format_iso_date(date: string): string {
        const dateParts = date.split('T');
        const datePart = dateParts[0].split('-');
        const timeParts = dateParts[1].replace('Z', '').split('.')[0].split(':');
        let hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);
        let minuteStr = minute.toString();
        if (minute <= 9) {
            minuteStr = '0' + minute;
        }
        let amPm = 'AM';
        if (hour >= 12) {
            hour = hour - 12;
            amPm = 'PM';
        }
        return `${datePart[1]}/${datePart[2]}/${datePart[0]} ${hour}:${minuteStr} ${amPm}`;

    }

    // private _applyOrderStatusFilter() {

    //     const targetFilter = this.gridApi.getFilterInstance('OrderStatus');
    //     targetFilter.setModel({values: ['Open', 'Other']});

    //     this.gridApi.onFilterChanged();
    // }
}
