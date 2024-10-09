import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, } from 'ag-grid-community';

import { UtilityService } from 'src/app/services';

import * as moment from 'moment';


@Component({
    selector: 'app-app-history-viewer',
    templateUrl: './app-history-viewer.component.html',
    styleUrls: ['./app-history-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHistoryViewerComponent implements OnInit, OnChanges {

    @Input() runHistory: any[];
    @Input() runHistoryLoading: boolean;
    @Input() runHistoryLoaded: boolean;
    @Input() runHistoryError: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = {
        autoSizeColumns: true
    };

    public customGridOption: GridOptions = {
        toolPanelSuppressRowGroups: false,
        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('id') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            cellClass: 'right-border',
            filter: 'agNumberColumnFilter'
        },
        columnDefs: [
            {
                headerName: 'App Name',
                field: 'AppName',
                cellStyle: params => {
                    return params.data['ShutDownSuccess'] === false ?
                        { 'background-color': '#a3f3c2' } : { 'background-color': '#f9c1c6' };
                }
            },
            {
                headerName: 'Server',
                field: 'MachineName',
                cellStyle: params => {
                    return params.data['ShutDownSuccess'] === false ?
                        { 'background-color': '#a3f3c2' } : { 'background-color': '#f9c1c6' };
                }
            },
            {
                headerName: 'PID',
                field: 'PID',
                cellStyle: params => {
                    return params.data['ShutDownSuccess'] === false ?
                        { 'background-color': '#a3f3c2' } : { 'background-color': '#f9c1c6' };
                }
            },
            {
                headerName: 'BlbgPatterns',
                field: 'BlbgPatterns',
                cellStyle: params => {
                    return params.data['ShutDownSuccess'] === false ?
                        { 'background-color': '#a3f3c2' } : { 'background-color': '#f9c1c6' };
                }
            },
            {
                headerName: 'Started At',
                field: 'StartupTs',
                valueFormatter: (params) => {
                    if (params.value === null) {
                        return '';
                    }
                    return moment(this.getTimezoneUnawareDate(params.value)).format('MM/DD/YYYY hh:mm a');
                },
                cellStyle: params => {
                    return params.data['ShutDownSuccess'] === false ?
                        { 'background-color': '#a3f3c2' } : { 'background-color': '#f9c1c6' };
                }
            },
            {
                headerName: 'Shutdown Signal At',
                field: 'ShutDownSignalTs',
                valueFormatter: (params) => {
                    if (params.value === null) {
                        return '';
                    }
                    return moment(this.getTimezoneUnawareDate(params.value)).format('MM/DD/YYYY hh:mm a');
                },
                cellStyle: params => {
                    return params.data['ShutDownSuccess'] === false ?
                        { 'background-color': '#a3f3c2' } : { 'background-color': '#f9c1c6' };
                }
            },
            {
                headerName: 'Shutdown At',
                field: 'ShutDownSuccessTs',
                valueFormatter: (params) => {
                    if (params.value === null) { 
                        return '';
                    }
                    return moment(this.getTimezoneUnawareDate(params.value)).format('MM/DD/YYYY hh:mm a');
                },
                cellStyle: params => {
                    return params.data['ShutDownSuccess'] === false ?
                        { 'background-color': '#a3f3c2' } : { 'background-color': '#f9c1c6' };
                },
                sort: 'asc'
            }
        ],
        sideBar: false,
        getRowNodeId: data => data['Id'],
        rowClass: 'medium-row',
        rowHeight: 22,
        headerHeight: 24,
        deltaRowDataMode: true

    }

    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.runHistory && changes.runHistory.currentValue && this.gridApi) { 
            this.gridApi.setRowData([]);
            this.gridApi.setRowData(changes.runHistory.currentValue);
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.runHistory !== undefined && this.runHistory !== null) {
            this.gridApi.setRowData(this.runHistory);
        }
    }

    public getTimezoneUnawareDate(date: string): Date {
        const dateValue = new Date(date);
        const dateWithNoTimezone = new Date(
            dateValue.getUTCFullYear(),
            dateValue.getUTCMonth(),
            dateValue.getUTCDate(),
            dateValue.getUTCHours(),
            dateValue.getUTCMinutes(),
            dateValue.getUTCSeconds()
        );
        return dateWithNoTimezone;
    }
}
