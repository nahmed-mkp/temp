import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond } from '../../../../models/renderer.models';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UtilityService } from 'src/app/services';

@Component({
    templateUrl: './forwardpaths.component.html',
    styleUrls: ['./forwardpaths.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForwardPathsComponent implements OnInit {

    public fwdPaths: any[];
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
        rowClass:'small-row',
        rowHeight: 16,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: true,

        getRowNodeId: data => {
            return data['month']
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

    public chartPaths: any;

    public optionsPlot = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'line'
        },
        title: { text: 'Forward CPR Paths' },
        tooltip: {
            split: false, 
            pointFormat: '<br />{series.name}: <b>{point.y:,.3f}</b>'
        },
        xAxis: {
            type: 'category',
            categories: []  ,
            labels: {
                enabled: false
            }
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            enabled: false
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },        
        credits: {
            enabled: false
        }
    };

    constructor(private dialogRef: MatDialogRef<ForwardPathsComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any, private utilities: UtilityService) {
        this.fwdPaths = this.data.fwdPaths;
        this.bond = this.data.bond;

        this.callbackFn = this.callbackFn.bind(this);
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

        if (this.fwdPaths && this.fwdPaths.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.fwdPaths);
        }
    }

    public callbackFn(chart) {
        this.chartPaths = chart;

        if (this.fwdPaths && this.fwdPaths.length > 0) {
            this._drawForwardPathsPlot();
        }

        setTimeout(() => {
            this.chartPaths.reflow();
        }, 100);
    }

    private _drawForwardPathsPlot() {

        while (this.chartPaths.series.length > 0) {
            this.chartPaths.series[0].remove();
        }

        const series = [{
            'name': 'CPR',
            'data': []
        }];

        const months = this.fwdPaths.map((path) => `Month: ${path['month']}`);
        this.fwdPaths.forEach((proj) => {
            
            series.forEach((series) => {
                if (series['name'] === 'CPR') { 
                    series['data'].push(proj['cpr']);
                }            
            })
        });

        series.forEach((ser) => {
            this.chartPaths.addSeries(ser)
        });

        this.chartPaths.setTitle({
            text: 'Forward CPR Paths'
        }, { text: `${this.bond.name} [${this.bond.cusip}]` });

        this.chartPaths.xAxis[0].update({
            categories: months,
            type: 'category'
        });

        setTimeout(() => {
            this.chartPaths.reflow();
        }, 100);
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Month',
            headerTooltip: 'Month',
            field: 'month',
            sort: 'asc', 
            cellStyle: params => {
                let result = { 'border-left': '0.2px dotted #dadad8;', 'justify-content': 'flex-start' };
                return result;
            },
            valueGetter: (params) => {
                return parseInt(params.data['month'], 10);
            },
            valueFormatter: (params) => {
                return 'Month: ' + parseInt(params.data['month'], 10);
            }
        }, {
            headerName: 'CPR',
            headerTooltip: 'Conditional Prepayment Rate',
            field: 'cpr',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(3)
        }];
        return result;
    }
}

