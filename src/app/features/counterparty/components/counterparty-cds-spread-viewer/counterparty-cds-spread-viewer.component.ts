import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import * as moment from 'moment';

@Component({
    selector: 'app-counterparty-cds-spread',
    templateUrl: './counterparty-cds-spread-viewer.component.html',
    styleUrls: ['./counterparty-cds-spread-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyCDSSpreadViewerComponent implements OnInit {

    @Input() cdsSpreads: any[];
    @Input() cdsSpreadsLoading: boolean;
    @Input() cdsSpreadsLoaded: boolean;
    @Input() cdsSpreadsError: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private isChanged = false;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            sortable: true
        },
        getRowNodeId: data => data.CompanyName,
        deltaRowDataMode: false,
        rowSelection: 'single',
        columnDefs: [
            {
                headerName: '',
                pinned: 'left',
                width: 350,
                field: 'CompanyName'
            },
            {
                headerName: 'Bid \u0394',
                field: 'BidChange',
                width: 100,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(1),
                cellStyle: (params) => {
                    return { 'justify-content': 'flex-end' };
                }
                // cellStyle: (params) => {
                //     const val = params.data['BidChange'];
                //     if (val >= 0.1 && val <= 20000) {
                //         return { 'background-color': '#a6ffa6', 'justify-content': 'flex-end' };
                //     } else if (val >= -20000 && val <= -0.1) {
                //         return { 'background-color': '#ffffb9', 'justify-content': 'flex-end' };
                //     } else {
                //         return { 'justify-content': 'flex-end' };
                //     }
                // }
            },
            {
                headerName: 'Ask \u0394',
                field: 'AskChange',
                width: 100,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(1),
                cellStyle: (params) => {
                    return { 'justify-content': 'flex-end' };
                }
                // cellStyle: (params) => {
                //     const val = params.data['AskChange'];
                //     if (val >= 0.1 && val <= 20000) {
                //         return { 'background-color': '#a6ffa6', 'justify-content': 'flex-end' };
                //     } else if (val >= -20000 && val <= -0.1) {
                //         return { 'background-color': '#ffffb9', 'justify-content': 'flex-end' };
                //     } else {
                //         return { 'justify-content': 'flex-end' };
                //     }
                // }
            },
            {
                headerName: 'Bid',
                field: 'Bid',
                width: 100,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(0),
                cellStyle: (params) => {
                    const val = params.data['Bid'];
                    if (val >= 0 && val < 300) { 
                        return { 'background-color': '#ccffcc', 'justify-content': 'flex-end'};
                    } else if (val >= 300 && val < 350) { 
                        return { 'background-color': '#ffffcc', 'justify-content': 'flex-end' };
                    } else if (val >= 350) { 
                        return { 'background-color': '#ffa6a6', 'justify-content': 'flex-end' };
                    } else {
                        return { 'justify-content': 'flex-end' };
                    }
                }
            },
            {
                headerName: 'Mid',
                field: 'Mid',
                width: 100,
                filter: 'agNumberColumnFilter',
                sort: 'desc',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(0),
                cellStyle: (params) => {
                    const val = params.data['Mid'];
                    if (val >= 0 && val < 300) {
                        return { 'background-color': '#ccffcc', 'justify-content': 'flex-end' };
                    } else if (val >= 300 && val < 350) {
                        return { 'background-color': '#ffffcc', 'justify-content': 'flex-end' };
                    } else if (val >= 350) {
                        return { 'background-color': '#ffa6a6', 'justify-content': 'flex-end' };
                    } else {
                        return { 'justify-content': 'flex-end' };
                    }
                }
            },
            {
                headerName: 'Ask',
                field: 'Ask',
                width: 100,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(0),
                cellStyle: (params) => {
                    const val = params.data['Mid'];
                    if (val >= 0 && val < 300) {
                        return { 'background-color': '#ccffcc', 'justify-content': 'flex-end' };
                    } else if (val >= 300 && val < 350) {
                        return { 'background-color': '#ffffcc', 'justify-content': 'flex-end' };
                    } else if (val >= 350) {
                        return { 'background-color': '#ffa6a6', 'justify-content': 'flex-end' };
                    } else {
                        return { 'justify-content': 'flex-end' };
                    }
                }
            },
            {
                headerName: 'Updated',
                field: 'LastUpdate',
                width: 100,
                cellRenderer: (data) => {
                    return data.value ? moment(data['LastUpdate']).format('HH:mm A') : '';
                },
                cellStyle: (params) => {
                    return { 'justify-content': 'flex-center' };
                }
            },
            {
                headerName: 'Equity Price',
                field: 'EquityPrice',
                width: 100,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(1),
                cellStyle: (params) => {
                    return {'justify-content': 'flex-end'};
                }
                // cellStyle: (params) => {
                //     const val = params.data['EquityPrice'];
                //     if (val >= 0.001 && val <= 1000) {
                //         return { 'background-color': '#a6ffa6', 'justify-content': 'flex-end' };
                //     } else if (val >= -1000 && val <= -0.001) {
                //         return { 'background-color': '#ffffb9', 'justify-content': 'flex-end' };
                //     } else {
                //         return { 'justify-content': 'flex-end' };
                //     }
                // }
            },
            {
                headerName: '% Change',
                field: 'PercentChg',
                width: 100,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilities.formatPercentNumberAdvance(2),
                cellStyle: (params) => {
                    return { 'justify-content': 'flex-end' };
                }
            },
            {
                headerName: 'Updated (Equity)',
                field: 'LastUpdatedEquity',
                width: 150,
                cellRenderer: (data) => {
                    return data.value ? moment(data['LastUpdateEquity']).format('HH:mm A') : '';
                },
                cellStyle: (params) => {
                    return { 'justify-content': 'flex-center' };
                }
            },
            {
                headerName: 'Mid Spread Change',
                field: 'MidSpreadChange',
                width: 150,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(0),
                cellStyle: (params) => {
                    const val = params.data['MidSpreadChange'];
                    if (val >= 0 && val < 50) {
                        return { 'background-color': '#ccffcc', 'justify-content': 'flex-end' };
                    } else if (val >= 50 && val < 75) {
                        return { 'background-color': '#ffffcc', 'justify-content': 'flex-end' };
                    } else if (val >= 75) {
                        return { 'background-color': '#ffa6a6', 'justify-content': 'flex-end' };
                    } else {
                        return { 'justify-content': 'flex-end' };
                    }
                }
            },
            {
                headerName: 'Min Mid Spread (1wk)',
                field: 'MinMidSpread',
                width: 150,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilities.formatNumberWithCommasAndDigit(0),
                cellStyle: (params) => {
                    return { 'justify-content': 'flex-end' };
                }
            },
            {
                headerName: 'Date (Min Mid Spread)',
                field: 'MinSpreadDate',
                width: 200,
                cellRenderer: (data) => {
                    return data.value ? moment(data['MinSpreadDate']).format('MM/DD/YYYY') : '';
                },
                cellStyle: (params) => {
                    return { 'justify-content': 'flex-end' };
                }
            }
        ]
    };

    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.cdsSpreads.length > 0) { this.gridApi.setRowData(this.cdsSpreads); }
    }
}
