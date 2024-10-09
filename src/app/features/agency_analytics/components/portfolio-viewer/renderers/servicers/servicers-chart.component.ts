import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import * as Highcharts from 'highcharts';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond, IServicer } from './../../../../models/renderer.models';

@Component({
    templateUrl: './servicers-chart.component.html',
    styleUrls: ['./servicers-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicersChartComponent implements OnInit {

    public servicers: IServicer[];
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
            return data['servicer']
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

    public chartServicers: any;

    public optionsPlot = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: { text: 'Mortgage Servicers' },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y:,.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ${point.y:,.1f}%'
                }
            }
        },
        credits: {
            enabled: false
        }
    };

    constructor(private dialogRef: MatDialogRef<ServicersChartComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        this.servicers = this.data.servicers;
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

        if (this.servicers && this.servicers.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.servicers);
        }
    }

    public callbackFn(chart) {
        this.chartServicers = chart;

        if (this.servicers && this.servicers.length > 0) {
            this._drawServicersPlot();
        }

        setTimeout(() => {
            this.chartServicers.reflow();
        }, 100);
    }

    private _drawServicersPlot() {

        while (this.chartServicers.series.length > 0) {
            this.chartServicers.series[0].remove();
        }
        const series = {'name': 'Servicers', colorByPoint: true, data: []};
        this.servicers.forEach((servicer) => {
            const point = {'name': servicer['servicer'], 'y': servicer['percent']};
            series['data'].push(point);
        });

        this.chartServicers.addSeries(series);

        this.chartServicers.setTitle({
            text: 'Mortgage Servicers' },
            { text: `${this.bond.name} [${this.bond.cusip}]` });
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Servicer',
            field: 'servicer'
        }, {
            headerName: 'Percentage',
            field: 'percent',
            sort: 'desc',
            valueFormatter: (params) => {
                return params.value && params.value.toFixed(2) + '%' || '';
            }
        }];
        return result;
    }
}
