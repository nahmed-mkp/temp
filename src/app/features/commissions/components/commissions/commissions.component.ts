import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

import * as fromModels from './../../models/commissions.models';

@Component({
    selector: 'app-commissions',
    templateUrl: './commissions.component.html',
    styleUrls: ['./commissions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommissionsComponent implements OnInit, OnChanges, OnDestroy {

    @Input() commissions: fromModels.ICommission[];
    @Input() commissionsLoading: boolean;
    @Input() commissionsLoaded: boolean;
    @Input() commissionsError?: string;

    public customGridOption: GridOptions;
    public extraOption = {
        autoSizeColumns: true,
    };

    private gridApi: GridApi;
    private columnApi: ColumnApi;
    private autoSizingColumnTrigger = false;

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
        this.customGridOption = {
            defaultColDef: {
                cellStyle: params => {
                    return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
                },
                filter: 'agSetColumnFilter',
                enableRowGroup: true,
                enableCellChangeFlash: false,
                sortable: false,
                editable: false
            },

            autoGroupColumnDef: {
                pinned: 'left',
                headerName: 'Group', // + this.columns[0].name,
                // field: this.columns[0].name,
                cellRendererParams: {
                    suppressCount: true,
                },
                sort: 'asc'
            },

            context: this,

            getRowNodeId: data => data.Id,

            columnDefs: [{
                headerName: 'Fund',
                field: 'Fund',
                sortable: true,
                sortedAt: 3,
                pinned: 'left',
                filter: 'agSetColumnFilter'
            }, {
                headerName: 'Contract',
                field: 'Contract',
                sortable: true,
                sortedAt: 1,
                pinned: 'left',
                filter: 'agSetColumnFilter'
            }, {
                headerName: 'Extension',
                field: 'Extension',
                sortable: true,
                pinned: 'left',
                filter: 'agSetColumnFilter'
            }, {
                headerName: 'Trade Type',
                field: 'Trade_Type',
                sortable: true,
                sortedAt: 4,
                pinned: 'left',
                filter: 'agSetColumnFilter'
            }, {
                headerName: 'Description',
                field: 'Description',
                filter: 'agSetColumnFilter',
                minWidth: 300
            }, {
                headerName: 'Exchange',
                field: 'Exchange',
                sortable: true,
                filter: 'agSetColumnFilter'
            }, {
                headerName: 'Exchange Fee',
                field: 'Exch_Fee',
                cellStyle: { 'justify-content': 'flex-end' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'CS Clearing Fee',
                field: 'CS_Clearing_Fee',
                cellStyle: { 'justify-content': 'flex-end' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'MS Clearing Fee',
                field: 'MS_Clearing_Fee',
                cellStyle: { 'justify-content': 'flex-end' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'GS Clearing Fee',
                field: 'GS_Clearing_Fee',
                cellStyle: { 'justify-content': 'flex-end' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'JP Clearing Fee',
                field: 'JP_Clearing_Fee',
                cellStyle: { 'justify-content': 'flex-end' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'WF Clearing Fee',
                field: 'WF_Clearing_Fee',
                cellStyle: { 'justify-content': 'flex-end' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'Citi Clearing Fee',
                field: 'Citi_Clearing_Fee',
                cellStyle: { 'justify-content': 'flex-end' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'Currency',
                field: 'Currency'
            }, {
                headerName: 'Broker',
                field: 'Broker',
                sortable: true,
                sortedAt: 2,
                filter: 'agSetColumnFilter'
            }, {
                headerName: 'Broker Fee',
                field: 'Broker_Fee',
                cellStyle: { 'justify-content': 'flex-end' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'CS Total',
                valueGetter: (params) => {
                    const value = params.data['Exch_Fee'] + params.data['CS_Clearing_Fee'] + params.data['Broker_Fee'];
                    return parseFloat(value).toFixed(2);
                },
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#f1fef2', 'font-weight': 'bold' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'MS Total',
                valueGetter: (params) => {
                    const value = params.data['Exch_Fee'] + params.data['MS_Clearing_Fee'] + params.data['Broker_Fee'];
                    return parseFloat(value).toFixed(2);
                },
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#f1fef2', 'font-weight': 'bold' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'GS Total',
                valueGetter: (params) => {
                    const value = params.data['Exch_Fee'] + params.data['GS_Clearing_Fee'] + params.data['Broker_Fee'];
                    return parseFloat(value).toFixed(2);
                },
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#f1fef2', 'font-weight': 'bold' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'JP Total',
                valueGetter: (params) => {
                    const value = params.data['Exch_Fee'] + params.data['JP_Clearing_Fee'] + params.data['Broker_Fee'];
                    return parseFloat(value).toFixed(2);
                },
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#f1fef2', 'font-weight': 'bold' },
                filter: 'agNumberColumnFilter'
            }, {
                headerName: 'WF Total',
                valueGetter: (params) => {
                    const value = params.data['Exch_Fee'] + params.data['WF_Clearing_Fee'] + params.data['Broker_Fee'];
                    return parseFloat(value).toFixed(2);
                },
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#f1fef2', 'font-weight': 'bold' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }, {
                headerName: 'Citi Total',
                valueGetter: (params) => {
                    const value = params.data['Exch_Fee'] + params.data['Citi_Clearing_Fee'] + params.data['Broker_Fee'];
                    return parseFloat(value).toFixed(2);
                },
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#f1fef2', 'font-weight': 'bold' },
                filter: 'agNumberColumnFilter',
                maxWidth: 70
            }],

            rowClass: 'medium-row',
            rowHeight: 22,
            headerHeight: 24,
            floatingFilter: true,
            suppressColumnVirtualisation: false,
            suppressAggFuncInHeader: true,
        };
        // this.createColumnDefs(this.columns);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.commissions && changes.commissions.currentValue && changes.commissions.currentValue.length > 0 && this.gridApi) {
            this.gridApi.setRowData(this.commissions);
        }
    }

    ngOnDestroy() { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    }


    // Utility --------------------------------------------------------------------------

    getRowData() {
        const rowData = [];
        this.gridApi.forEachNode(function (node) {
            rowData.push(node.data);
        });
        return rowData;
    }

    columnFocus(columnName) {
        this.gridApi.ensureColumnVisible(columnName);
        this.gridApi.flashCells({ columns: [columnName] });
    }
}
