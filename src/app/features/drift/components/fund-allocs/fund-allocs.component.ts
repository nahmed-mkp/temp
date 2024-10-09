
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import * as fromModels from './../../models/drift.models';

@Component({
    selector: 'app-fund-allocs',
    templateUrl: './fund-allocs.component.html',
    styleUrls: ['./fund-allocs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundAllocsComponent implements OnInit, OnChanges {

    @Input() drifts: any[];
    @Input() request: fromModels.PositionsDriftRequest;

    public actualAlloc: any[];
    public targetAlloc: any[];
    public chart: any;
    public chart1: any;

    public optionsPlot = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title : { text : 'CrossFund P&L Breakdown' },
        subtitle: { text: 'Cross Fund Actual P&L (%)' },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f} %</b>'
        },
        accessibility: {
            point : {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                }
            }
        },
        legend: {
            enabled: false,
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'top',
            floating: false,
            y: 100,
        },
        credits: {
            enabled: false
        }
    };

    public optionsPlot1 = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: { text: 'CrossFund Capital Allocation' },
        subtitle: { text: 'Cross Fund Capital Allocation (%)' },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f} %</b>'
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
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %'
                }
            }
        },
        legend: {
            enabled: false,
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'top',
            floating: false,
            y: 100,
        },
        credits: {
            enabled: false
        }
    };

    constructor() {
        this.callbackFn = this.callbackFn.bind(this);
        this.callbackFn1 = this.callbackFn1.bind(this);
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.drifts && changes.drifts.currentValue) {
            this.actualAlloc = changes.drifts.currentValue.map((drift) => {
                return { 'name': drift['fundName'], 'y': drift['act'], 'sliced': drift['fundName'] === 'Opp', 'selected': drift['fundName'] === 'Opp' };
            });
            this.targetAlloc = changes.drifts.currentValue.map((drift) => {
                return { 'name': drift['fundName'], 'y': drift['tgt'], 'sliced': drift['fundName'] === 'Opp', 'selected': drift['fundName'] === 'Opp' };
            });

            if (this.chart) {
                this.drawPlot();
            }
            if (this.chart1) {
                this.drawPlot1();
            }
        }
    }

    public callbackFn(chart: any): void {
        this.chart = chart;
        if (this.actualAlloc && this.actualAlloc.length > 0) {
            this.drawPlot();
        }

        if (this.chart) {
            this.chart.setTitle({
                text: (this.request ? this.request.asOfDate.toLocaleDateString() + ' ' : '') + 'CrossFund P&L Breakdown'
            });
        }

        setTimeout(() => {
            this.chart.reflow();
        }, 100);
    }

    public callbackFn1(chart: any): void {
        this.chart1 = chart;
        if (this.targetAlloc && this.targetAlloc.length > 0) {
            this.drawPlot1();
        }

        if (this.chart1) {
            this.chart1.setTitle({
                text: (this.request ? this.request.asOfDate.toLocaleDateString() + ' ' : '') + 'CrossFund Capital Allocation'
            });
        }

        setTimeout(() => {
            this.chart1.reflow();
        }, 100);
    }

    private drawPlot() {

        while (this.chart.series.length > 0) {
            this.chart.series[0].remove();
        }

        this.chart.addSeries({
            data: this.actualAlloc,
            colorByPoint: true,
            name: 'Actual P&L %'
        });
    }

    private drawPlot1() {

        while (this.chart1.series.length > 0) {
            this.chart1.series[0].remove();
        }

        this.chart1.addSeries({
            data: this.targetAlloc,
            colorByPoint: true,
            name: 'Target P&L %'
        });
    }
}
