import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';

import * as fromModels from './../../models/order-book.models';
import { UtilityService, AuthService } from 'src/app/services';
import * as moment from 'moment';
import { AppCustomGridCellCheckboxComponent } from 'src/app/components';


@Component({
    selector: 'app-order-book',
    templateUrl: './order-book.component.html',
    styleUrls: ['./order-book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBookComponent implements OnInit, OnChanges {

    @Input() lookups: any;
    @Input() orders: fromModels.IOrder[];
    @Input() ordersLoading: boolean;
    @Input() ordersLoaded: boolean;
    @Input() ordersError: string;

    @Output() onOrderSelected = new EventEmitter<number>();
    @Output() onOrderLocked = new EventEmitter<fromModels.ILockOrderReq>();

    private pod_colors = ['#b3ecec', '#f1f1f1', '#b4f5ff', '#89ecda', '#43e8d8', '#3bd6c6', '#97ebdb', '#bbeeff',
        '#00c2c7', '#5abcd8', '#74ccf4', '#2389da'];
    private pod_colors_map = {};

    public extraOption = {autoSizeColumns: true};
    public customGridOption: GridOptions;
    private gridApi: GridApi;

    public currentUser: string;

    private isFilterTriggered: boolean = false;

    constructor(private utilityService: UtilityService, private authService: AuthService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
        this.customGridOption = this._createGridOption();
        this.currentUser = this.authService.getUser();
        // setTimeout(() => this._applyOrderStatusFilter(), 1000);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.orders && changes.orders.currentValue.length && changes.orders.currentValue.length > 0 && this.isFilterTriggered === false ) {
            setTimeout(() => this._applyOrderStatusFilter(), 1000);
            this.isFilterTriggered = true;
        }
    }

    public customGridCallBack(params) {
        this.gridApi = params.api;
    }

    // Utility -------------------------------

    private _createGridOption(): GridOptions {
        return {
            defaultColDef: {
                suppressMenu: false,
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
                cellStyle: params => {
                  return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
                },
                sortable: false,
                filter: true,
                cellClass: 'right-border-light',
                headerClass: 'ag-header-wrap'
            },
            getRowNodeId: data => data['orderId'],
            deltaRowDataMode: true,
            getRowStyle: (params) => {
                return this._get_row_style(params.data);
            },
            columnDefs: [
                {
                    headerName: 'Locked',
                    field: 'locked',
                    maxWidth: 60,
                    cellRenderer: 'AppCustomGridCellCheckboxComponent', 
                    cellRendererParams: params => {
                        const lockUser: string = params.data['lockedBy'];

                        if (lockUser !== undefined && lockUser !== null) {
                            if (lockUser.toLowerCase() === this.currentUser.toLowerCase()) {
                                return { key: 'locked', editable: true };
                            } else {
                                // can not unlock if are not the orginal lock user
                                return { key: 'locked', editable: false };
                            }
                        } else {
                            return { key: 'locked', editable: true }
                        }
                    },
                    onCellValueChanged: params => {
                        this.onOrderLocked.emit({
                            locked: params.newValue,
                            orderId: params.data['orderId']
                        })
                    }
                },
                {
                    headerName: 'Locked By',
                    field: 'lockedBy',
                    maxWidth: 80
                },
                {
                    headerName: 'Order Date',
                    field: 'orderDate',
                    maxWidth: 70,
                    cellStyle: (params) => {
                        return {'text-align': 'right'};
                    },
                    valueFormatter: (params) => {
                        if (params.data && params.data.orderDate) {
                            const dateParts = params.data.orderDate.split('T')[0].split('-');
                            return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
                        }
                    }
                },
                {
                    headerName: 'Pod',
                    field: 'pod',
                },
                {
                    headerName: 'Order Type',
                    field: 'orderType',
                    maxWidth: 70
                },
                {
                    headerName: 'BuySell',
                    field: 'buySell'
                },
                {
                    headerName: 'Security',
                    field: 'security'
                },
                {
                    headerName: 'Quantity',
                    field: 'quantity',
                    maxWidth: 60,
                    valueFormatter: (params) => {
                        if (params.data && params.data.quantity) {
                            return params.data.quantity.toLocaleString('en-US', { minimumFractionDigits: 0 });
                        }
                    }
                },
                {
                    headerName: 'Type',
                    field: 'type'
                },
                {
                    headerName: 'Order Level',
                    field: 'orderLevel',
                    maxWidth: 80,
                    valueFormatter: (params) => {
                        if (params.data && params.data.orderLevel) {
                            return parseFloat(params.data.orderLevel);
                        }
                    }
                },
                {
                    headerName: 'Current Level',
                    field: 'currentLevel',
                    maxWidth: 80,
                    valueFormatter: (params) => {
                        if (params.data && params.data.currentLevel) {
                            return parseFloat(params.data.currentLevel);
                        }
                    }
                },
                {
                    headerName: 'Distance To Level',
                    field: 'distanceToLevel',
                    maxWidth: 80,
                    valueFormatter: (params) => {
                        if (params.data && params.data.distanceToLevel) {
                            return parseFloat(params.data.distanceToLevel);
                        }
                    }
                },
                {
                    headerName: 'Distance %',
                    field: 'distancePct',
                    maxWidth: 80,
                    valueFormatter: (params) => {
                        if (params.data && params.data.distancePct) {
                            return (params.data.distancePct * 100.0).toFixed(4) + '%';
                        }
                    }
                },
                { headerName: 'InWithNotIn', field: 'inWith'},
                { headerName: 'Contact', field: 'contact'},
                { headerName: 'Expiry', field: 'expiry'},
                {
                    headerName: 'OrderStatus',
                    field: 'orderStatus',
                    filter: 'agSetColumnFilter'
                },
                { headerName: 'Notes', field: 'notes'},
                { headerName: 'AssetType', field: 'assetType'},
                { headerName: 'DisplayType', field: 'displayType'},
                {
                    headerName: 'LastUpdated',
                    field: 'lastUpdated',
                    valueFormatter: (params) => {
                        if (params.data && params.data.lastUpdated) {
                            return this._format_iso_date(params.data.lastUpdated);
                        }
                    }
                },
                { headerName: 'UpdatedBy', field: 'updatedBy'},
                {
                    headerName: 'Order Id',
                    field: 'orderId',
                    valueFormatter: (params) => {
                        if (params.data && params.data.orderId) {
                            return parseInt(params.data.orderId, 10).toString();
                        }
                    },
                    sortable: true,
                    sort: 'desc'
                }
            ],

            getRowClass: params => {
                const rowClass = ['ultra-small-row'];
                if (params.node.rowIndex % 2 === 0) {
                  rowClass.push('even-row-shaded-effect');
                }
                return rowClass;
            },

            frameworkComponents: {
                AppCustomGridCellCheckboxComponent: AppCustomGridCellCheckboxComponent,
            },

            // Event -------------------------------------------
            onRowSelected: params => {
                if (params.node.isSelected()) {
                    this.onOrderSelected.emit(params.data['orderId']);
                }
            },

            // onFirstDataRendered: this.onFirstDataRendered.bind(this),

            rowHeight: 18,
            sideBar: false,
            showToolPanel: false,
            rowSelection: 'single',
        };
    }

    // onFirstDataRendered(params) {
    //     this.gridApi = params.api;

    //     setTimeout(() => {
    //         this.applyDefaultFilter(params);
    //     }, 150);
    // }

    // private applyDefaultFilter(params: any): void {
    //     const instance = params.api.getFilterInstance('OrderStatus');
    //     if (instance) {
    //         instance.setModel({ values: ['Open', 'Other'] });
    //         instance.onFilterChanged();
    //     }
    // }

    private _get_row_style(data: any): any {
        if (data['locked'] === true) {
            return { background: '#ffbaba' };
        } else {
            if (data.pod) {
                if (this.pod_colors_map[data.pod] === undefined) {
                    const pod_idx = Object.keys(this.pod_colors_map).length + 1;
                    this.pod_colors_map[data.pod] = pod_idx;
                }
                return { background: this.pod_colors[this.pod_colors_map[data.pod]]};
            } else {
                return { background: this.pod_colors[0] };
            }
        }
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

    private _applyOrderStatusFilter() {

        const targetFilter = this.gridApi && this.gridApi.getFilterInstance('orderStatus') || null;
        if (targetFilter) {
            targetFilter.setModel({values: ['Open', 'Other']});
            this.gridApi.onFilterChanged();
        }

    }
}


