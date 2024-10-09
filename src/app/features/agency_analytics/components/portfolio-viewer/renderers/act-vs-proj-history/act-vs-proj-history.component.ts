import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import * as Highcharts from 'highcharts';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond } from './../../../../models/renderer.models';

@Component({
    templateUrl: './act-vs-proj-history.component.html',
    styleUrls: ['./act-vs-proj-history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActVsProjHistoryComponent implements OnInit {

    public history: any[];
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
            return data['date']
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
        title: { text: 'Actual vs. Projected History' },
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

    constructor(private dialogRef: MatDialogRef<ActVsProjHistoryComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        this.history = this.data.history;
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

        if (this.history && this.history.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.history);
        }
    }

    public callbackFn(chart) {
        // this.chartDelinquencies = chart;

        // if (this.delinquencies && this.delinquencies.length > 0) {
        //     this._drawHistoryPlot();
        // }

        // setTimeout(() => {
        //     this.chartDelinquencies.reflow();
        // }, 100);
    }

    private _drawHistoryPlot() {

        // while (this.chartDelinquencies.series.length > 0) {
        //     this.chartDelinquencies.series[0].remove();
        // }

        // const series = { 'name': 'Delinquencies', colorByPoint: true, data: [] };
        // this.delinquencies.forEach((delinquency) => {
        //     const point = { 'name': delinquency['delinquencyType'], 'y': delinquency['percent'] };
        //     series['data'].push(point);
        // });

        // this.chartDelinquencies.addSeries(series);

        // this.chartDelinquencies.setTitle({
        //     text: 'Mortgage Delinquencies'
        // },
        //     { text: `${this.bond.name} [${this.bond.cusip}]` });
    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Date',
            field: 'date',
            sort: 'desc'
        }, {
            headerName: 'Projected CDR',
            field: 'projectedCDR'
        }, {
            headerName: 'Projected CPR',
            field: 'projectedCPR'
        }, {
            headerName: 'Projected Curtailment',
            field: 'projectedCurtail'
        }, {
            headerName: 'Projected Loss Severity',
            field: 'projectedLossSeverity'
        }, {
            headerName: 'Projected Refi',
            field: 'projectedRefi'
        }, {
            headerName: 'Projected Turnover',
            field: 'projectedTurnover'
        }, {
            headerName: 'Projected VPR',
            field: 'projectedVPR'
        }];
        return result;
    }
}
