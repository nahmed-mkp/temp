import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond } from './../../../../models/renderer.models';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UtilityService } from 'src/app/services';

@Component({
    templateUrl: './oaspaths.component.html',
    styleUrls: ['./oaspaths.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OASPathsComponent implements OnInit {

    public oasPaths: any[];
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
        rowClass:'small-row',
        rowHeight: 16,
        skipHeaderOnAutoSize: true,
        enableSorting: true,

        getRowNodeId: data => {
            return data['path']
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

    constructor(private dialogRef: MatDialogRef<OASPathsComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any, private utilities: UtilityService) {
        this.oasPaths = this.data.oasPaths;
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

        if (this.oasPaths && this.oasPaths.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.oasPaths);
        }
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [];
        
        result.push({
            headerName: 'Path',
            field: 'path',
            sort: 'asc',
            pinned: 'left',
            sortable: false
        });

        const ccRatesColDefs: ColDef[] = [{
            headerName: '1Y',
            headerTooltip: '1 Year Current Coupon',
            pinned: 'left',
            valueGetter: (params) => {
                return params.data['ccrates']['oneYear'];
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: '3Y',
            headerTooltip: '3 Year Current Coupon',
            pinned: 'left',
            valueGetter: (params) => {
                return params.data['ccrates']['threeYear'];
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: '5Y',
            headerTooltip: '5 Year Current Coupon',
            pinned: 'left',
            valueGetter: (params) => {
                return params.data['ccrates']['fiveYear'];
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }];
        const groupedccRatesCalcColDefs = {
            headerName: 'CC Rates',
            headerTooltip: 'Current Coupon Rates',
            children: ccRatesColDefs
        };
        result.push(groupedccRatesCalcColDefs);

        const oasPathColDefs: ColDef[] = [{
            headerName: 'Price',
            headerTooltip: 'Price (in ticks)',
            field: 'price',
            sortable: false, 
            valueFormatter: this.utilities.formatPriceToTicks
        }, {
            headerName: 'Yield',
            headerTooltip: 'Yield',
            field: 'yield',
            sortable: false,
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(4)
        }, {
            headerName: 'WAL',
            headerTooltip: 'Weighted Average Life',
            field: 'wal',
            sortable: false,
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: 'OAS',
            headerTooltip: 'Option Adjusted Spread',
            field: 'oas',
            sortable: false,
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: 'CPR (1Y)',
            headerTooltip: '1 year Conditional Prepayment Rate',
            field: 'oneYearCPR',
            sortable: false,
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: 'CPR (LT)',
            headerTooltip: 'Long Term Conditional Prepayment Rate',
            field: 'longTermCPR',
            sortable: false,
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }];
        result.push(...oasPathColDefs);
        
        return result;
    }
}

