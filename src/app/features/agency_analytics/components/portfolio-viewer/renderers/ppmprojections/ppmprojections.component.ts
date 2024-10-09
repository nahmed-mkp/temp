import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { IBond } from './../../../../models/renderer.models';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UtilityService } from 'src/app/services';

@Component({
    templateUrl: './ppmprojections.component.html',
    styleUrls: ['./ppmprojections.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PPMProjectionsComponent implements OnInit {

    public ppmProjections: any[];
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

    public chartProjections: any;

    public optionsPlot = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'line'
        },
        yAxis: [
            {
                title: '0',
                opposite: true
            },
            {
                title: '1',
                opposite: true
            },
        ],
        title: { text: 'Prepayment Model Projections' },
        tooltip: {
            split: false, 
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:,.1f}%</b><br />'
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

    constructor(private dialogRef: MatDialogRef<PPMProjectionsComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any, private utilities: UtilityService) {
        this.ppmProjections = this.data.ppmProjections;
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

        if (this.ppmProjections && this.ppmProjections.length > 0) {
            this.columnDefs = this.getColumnDefs();
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.ppmProjections);
        }
    }

    public callbackFn(chart) {
        this.chartProjections = chart;

        if (this.ppmProjections && this.ppmProjections.length > 0) {
            this._drawProjectionsPlot();
        }

        setTimeout(() => {
            this.chartProjections.reflow();
        }, 100);
    }

    private _drawProjectionsPlot() {

        while (this.chartProjections.series.length > 0) {
            this.chartProjections.series[0].remove();
        }

        const series = [{
            'name': 'CPR',
            'data': [],
            'yAxis': 0
        }, {
            'name': 'Curtail',
            'data': [], 
            'yAxis': 1
        }, {
            'name': 'CDR', 
            'data': [],
            'yAxis': 1
        }, {
            'name': 'Refi',
            'data': [],
            'yAxis': 1
        }, {
            'name': 'Turnover',
            'data': [],
            'yAxis': 0
        }, {
            'name': 'VPR',
            'data': [],
            'yAxis': 0
        }];

        this.ppmProjections.forEach((proj) => {
            const date = new Date(proj['date']).getTime();
            series.forEach((series) => {
                if (series['name'] === 'CPR') { 
                    series['data'].push([date, proj['cpr']]);
                } else if (series['name'] === 'Curtail') { 
                    series['data'].push([date, proj['curtail']]);
                } else if (series['name'] === 'CDR') {
                    series['data'].push([date, proj['cdr']]);
                } else if (series['name'] === 'Turnover') {
                    series['data'].push([date, proj['turnover']]);
                } else if (series['name'] === 'Refi') {
                    series['data'].push([date, proj['refi']]);
                } else if (series['name'] === 'VPR') {
                    series['data'].push([date, proj['vpr']]);
                }            
            })
        });

        series.forEach((ser) => {
            this.chartProjections.addSeries(ser)
        });

        this.chartProjections.setTitle({
            text: 'Prepayment Model Projections'
        }, { text: `${this.bond.name} [${this.bond.cusip}]` });

    }

    private getColumnDefs(): ColDef[] {
        const result: ColDef[] = [{
            headerName: 'Date',
            headerTooltip: 'Projection Date',
            field: 'date',
            sort: 'asc'
        }, {
            headerName: 'CPR',
            headerTooltip: 'Conditional Prepayment Rate',
            field: 'cpr',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: 'Curtail',
            headerTooltip: 'Curtailment Rate',
            field: 'curtail',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: 'Refi',
            headerTooltip: 'Refinancing Rate',
            field: 'refi',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: 'CDR',
            headerTooltip: 'Constant Default Rate - The percentage of mortgages within a pool of loans on which the borrowers have fallen more than 90 days behind in making payments to their lenders',
            field: 'cdr',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: 'VPR',
            headerTooltip: 'Voluntary Prepayment Rate - A version of CPR, that only measures the prepayments that happen without a loss.',
            field: 'vpr',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }, {
            headerName: 'Turnover',
            headerTooltip: 'Turnover',
            field: 'cpr',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigit(2)
        }];


        return result;
    }
}

