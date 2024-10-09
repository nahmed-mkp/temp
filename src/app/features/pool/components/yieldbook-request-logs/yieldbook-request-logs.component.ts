import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { GridApi, ColumnApi, GridOptions, ValueFormatterParams } from 'ag-grid-community';

import * as fromModels from '../../models/yieldbook.models';


@Component({
    selector: 'app-yieldbook-request-logs',
    templateUrl: './yieldbook-request-logs.component.html',
    styleUrls: ['./yieldbook-request-logs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YieldbookRequestLogsComponent implements OnInit, OnChanges {

    @Input() requestLogs: fromModels.IYieldbookRequestLog[];
    @Input() selectedRequestLog: number;

    @Input() requestLogsLoading: boolean;
    @Input() requestLogsLoaded: boolean;
    @Input() requestLogsError: string;

    @Output() requestLogSelected: EventEmitter<fromModels.IYieldbookRequestLog> = new EventEmitter<fromModels.IYieldbookRequestLog>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('yieldBookRequestID') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            filter: 'agNumberColumnFilter',
            // valueFormatter: this.regularRoundOff(2),
        },

        columnDefs: [
            {
                headerName: 'Request ID', field: 'yieldBookRequestID', filter: 'agNumberColumnFilter'},
            { headerName: 'Request Type', field: 'requestType' },
            { headerName: 'User', field: 'requestingUser' },
            { headerName: 'Environment', field: 'environment'},
            { headerName: 'Success', field: 'success' },
            { headerName: 'Process Time', field: 'processTime' },
            { headerName: 'Error', field: 'Exception Details' },
            { headerName: 'Timestamp', field: 'requestTimestamp' },
            { headerName: 'Request File', field: 'requestFile' },
            { headerName: 'Response File', field: 'responseFile' }
        ],

        getContextMenuItems: params => {
            const deselect = {
                name: 'Deselect All',
                action: () => params.api.deselectAll(),
                // icon: '<i class="material-icons small-menu-icon">table_chart</i>',
            };

            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', deselect];
        },

        sideBar: true,
        suppressColumnVirtualisation: true,
        rowMultiSelectWithClick: false,
        rowSelection: 'single',
        // onRowClicked: params => {
        //     const targetBatchIds: any = {};
        //     const selectedTradeIds: number[] = [];
        //     params.api.getSelectedRows().forEach(row => {
        //         targetBatchIds[row['batchId']] = true;
        //     });
        //     console.log('targetBatchIds', targetBatchIds);
        //     // const targetBatchId = params.node.data['batchId'];
        //     params.api.forEachNode(node => {
        //         if (targetBatchIds[node.data['batchId']]) {
        //             node.setSelected(true);
        //             selectedTradeIds.push(node.data['id']);
        //         }
        //     });
        //     // this.onSelectedTradeIds.emit(selectedTradeIds);
        // }
    };

    public extraOption = {
        autoSizeColumns: true
    };

    ngOnChanges(changes: SimpleChanges) {
        if (changes.requestLogsLoading && changes.requestLogsLoading.currentValue === true && this.gridApi) {
            this.gridApi.deselectAll();
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();
    }


    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }
}
