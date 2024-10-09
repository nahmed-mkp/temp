import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond, IStateDistribution } from './../../../../models/renderer.models';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UtilityService } from 'src/app/services';

@Component({
    templateUrl: './geographies.component.html',
    styleUrls: ['./geographies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeographiesComponent implements OnInit {

    public geographies: IStateDistribution[];
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
            return data['state']
        },

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


        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
        },
    };

    public extraOption = {
        sizeColumnsToFit: true
    };


    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: any[];

    constructor(private dialogRef: MatDialogRef<GeographiesComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any, private utilities: UtilityService) {
        this.geographies = this.data.geographies;
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

        if (this.geographies && this.geographies.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.geographies);
        }
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'State',
            field: 'state',
            sortable: false
        }, {
            headerName: 'Percent (%)',
            field: 'percent',
            sort: 'desc',
            sortable: false
        }];
        return result;
    }
}

