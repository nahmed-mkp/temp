import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import * as Highcharts from 'highcharts';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond, IDelinquency } from './../../../../models/renderer.models';

@Component({
    templateUrl: './act-vs-proj-summary.component.html',
    styleUrls: ['./act-vs-proj-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActVsProjSummaryComponent implements OnInit {

    public summary: any[];
    public bond: IBond;

    public Highcharts = Highcharts;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
            },
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        floatingFilter: false,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: true,

        getRowNodeId: data => {
            return data['month']
        }
    };

    public extraOption = {
        sizeColumnsToFit: true
    };


    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: any[];

    public chartDelinquencies: any;

    constructor(private dialogRef: MatDialogRef<ActVsProjSummaryComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        this.summary = this.data.summary;
        this.bond = this.data.bond;

        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    onCloseClick(e: any): void {
        this.dialogRef.close();
    }

    public customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.summary && this.summary.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.summary);
        }
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Month',
            field: 'month',
            sortable: false
        }, {
            headerName: 'Actual CPR',
            field: 'actualCPR',
            sortable: false,
            valueFormatter: (params) => {
                return params.value && params.value.toFixed(2) + '%' || '';
            }
        }, {
            headerName: 'Projected CPR',
            field: 'projectedCPR',
            sortable: false,
            valueFormatter: (params) => {
                return params.value && params.value.toFixed(2) + '%' || '';
            }
        }];
        return result;
    }
}
