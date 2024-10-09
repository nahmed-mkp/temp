import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

import * as fromModels from './../../models/timeseries-exporter.models';

@Component({
    selector: 'app-timeseries-exporter-items',
    templateUrl: './timeseries-exporter-items.component.html',
    styleUrls: ['./timeseries-exporter-items.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesExporterItemsComponent implements OnInit {

    @Input() monitor: fromModels.IMonitor;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            editable: false
        },
        getRowNodeId: data => data.mdid,
        getRowStyle: params => {
            if (params.node.rowPinned) {
                return { 'background-color': '#c8f1f9', 'font-weight': 'bold' };
            }
        },
        editType: 'fullRow',
        columnDefs: [
            {
                colId: 'displayName',
                headerName: 'Name',
                width: 150,
                field: 'displayName'
            },
            {
                colId: 'label',
                headerName: 'Label',
                width: 250,
                field: 'label',
                hide: false
            },
            {
                colId: 'displayType',
                headerName: 'DisplayType',
                width: 80,
                field: 'displayType'
            },
            {
                colId: 'mdid',
                headerName: 'MDID',
                width: 150,
                field: 'mdid',
                hide: true
            },
            {
                colId: 'listOrder',
                headerName: 'Order',
                width: 150,
                field: 'listOrder',
                hide: true
            }
        ]
    };

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }
}
