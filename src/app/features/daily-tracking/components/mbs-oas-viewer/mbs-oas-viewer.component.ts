import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { DailyTrackingUtilityService } from '../../services';

import * as fromModels from './../../models/daily-tracking.models';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-mbs-oas-viewer',
    templateUrl: './mbs-oas-viewer.component.html',
    styleUrls: ['./mbs-oas-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MbsOASViewerComponent implements OnInit, OnChanges {

    @Input() metaData: fromModels.IntradayMetaData;

    @Input() data: any[];
    @Input() loading: boolean;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {
        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
            },
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            cellRenderer: 'agAnimateShowChangeCellRenderer'
        },

        groupRowRendererParams: {
            suppressCount: true
        },
        getRowNodeId: data => data.Id,
        getRowStyle: params => {
            if (params.node.leafGroup) {
                return {};
            }
            return { background: (params.node.rowIndex % 2 === 1) ? '#ffff99' : '#ccffff' };
        },
        deltaRowDataMode: true,

        columnDefs: this._getColDefs(),

        groupUseEntireRow: true,

        onRowDataChanged: event => {
            event.api.expandAll();
        },
        onFirstDataRendered: event => {
            event.api.expandAll();
        },
        headerHeight: this.utilityService.isCompactMode() ? 16 : 24,
        rowClass: this.utilityService.isCompactMode() ? 'ultra-small-row' : 'small-row',
        rowHeight: this.utilityService.isCompactMode() ? 12 : 16
    };

    constructor(private utilityService: DailyTrackingUtilityService, 
        private formatter: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && this.gridApi) {
            this.refreshGrid(changes.data.currentValue);
        }
    }

    ngOnInit() {
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.data.length > 0) { 
            this.refreshGrid(this.data);
        }

    }

    private refreshGrid(data: any[]): void { 
        this.gridApi.setRowData(data);
        this.gridApi.refreshCells({ force: true })
    }

    private _getColDefs(): any[] { 
        return [
            {
                headerName: 'Group',
                field: 'customGroup',
                valueFormatter: params => params.value && params.value.split('/')[1],
                rowGroup: true,
                hide: true,
                minWidth: 60
            },
            {
                headerName: 'Name',
                field: 'Name', sort: 'asc',
                valueFormatter: params => params.value && params.value.split(' ')[1],
                cellStyle: { 'font-weight': 'bold' },
                minWidth: 60
            },
            {
                headerName: 'OAS',
                headerTooltip: 'Option Adjusted Spread',
                field: 'oas',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(0),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: 'Duration',
                headerTooltip: 'Duration',
                field: 'duration',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: 'Convexity',
                headerTooltip: 'Convexity',
                field: 'convex',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: 'Yield',
                headerTooltip: 'Yield',
                field: 'yield',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: '6Mo KRD',
                headerTooltip: '6Mo Key rate Duration',
                field: '6mokrd',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: '1Yr KRD',
                headerTooltip: '1Yr Key rate Duration',
                field: '1yrkrd',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: '2Yr KRD',
                headerTooltip: '2Yr Key rate Duration',
                field: '2yrkrd',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: '3Yr KRD',
                headerTooltip: '3Yr Key rate Duration',
                field: '3yrkrd',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: '5Yr KRD',
                headerTooltip: '5Yr Key rate Duration',
                field: '5yrkrd',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: '10Yr KRD',
                headerTooltip: '10Yr Key rate Duration',
                field: '10yrkrd',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: '20Yr KRD',
                headerTooltip: '20Yr Key rate Duration',
                field: '20yrkrd',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
            {
                headerName: '30Yr KRD',
                headerTooltip: '30Yr Key rate Duration',
                field: '30yrkrd',
                valueFormatter: this.formatter.formatNumberWithCommasAndDigit(2),
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold', 'color': '#1550d7', 'text-align': 'right' },
                minWidth: 40
            },
        ];

    }

    // Utility --------------------------------------------------------------------------

    getRowData() {
        const rowData = [];
        this.gridApi.forEachNode(function (node) {
            rowData.push(node.data);
        });
        return rowData;
    }
}
