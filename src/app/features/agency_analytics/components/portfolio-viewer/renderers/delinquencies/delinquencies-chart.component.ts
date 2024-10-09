import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import * as Highcharts from 'highcharts';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond, IDelinquency } from './../../../../models/renderer.models';

@Component({
    templateUrl: './delinquencies-chart.component.html',
    styleUrls: ['./delinquencies-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DelinquenciesChartComponent implements OnInit {

    public delinquencies: IDelinquency[];
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
            return data['delinquencyType']
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

    public chartDelinquencies: any;
    optionsPlot = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column'
        },
        title: { text: 'Mortgage Delinquencies' },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y:,.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            series: {
                grouping: false,
                borderWidth: 0
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: [{
            title: {
                text: '(%) Delinquent'
            },
            showFirstLabel: false
        }],
        credits: {
            enabled: false
        }
    };

    constructor(private dialogRef: MatDialogRef<DelinquenciesChartComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        this.delinquencies = this.data.delinquencies;
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

        if (this.delinquencies && this.delinquencies.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.delinquencies.filter((delinquency) => delinquency.percent !== 0));
        }
    }

    public callbackFn(chart) {
        this.chartDelinquencies = chart;

        if (this.delinquencies && this.delinquencies.length > 0) {
            this._drawDelinquenciesPlot();
        }

        setTimeout(() => {
            this.chartDelinquencies.reflow();
        }, 100);
    }

    private _drawDelinquenciesPlot() {

        while (this.chartDelinquencies.series.length > 0) {
            this.chartDelinquencies.series[0].remove();
        }

        const series = {'name': 'Delinquencies', colorByPoint: true, data: []};
        this.delinquencies.forEach((delinquency) => {
            const point = { 'name': delinquency['delinquencyType'], 'y': delinquency['percent']};
            series['data'].push(point);
        });

        this.chartDelinquencies.addSeries(series);

        this.chartDelinquencies.setTitle({
            text: 'Mortgage Delinquencies' },
            { text: `${this.bond.name} [${this.bond.cusip}]` });
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Delinquencies',
            field: 'delinquencyType'
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
