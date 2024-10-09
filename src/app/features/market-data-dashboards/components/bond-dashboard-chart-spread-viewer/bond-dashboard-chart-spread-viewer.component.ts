import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-dashboard-chart-spread-viewer',
  templateUrl: './bond-dashboard-chart-spread-viewer.component.html',
  styleUrls: ['./bond-dashboard-chart-spread-viewer.component.scss']
})

export class BondDashboardChartSpreadViewerComponent implements OnInit, OnChanges {

    @Input() chartData: any[];

    public Highcharts = Highcharts;
    public chart: any;
    
    public chartConfig: Highcharts.Options = {
        title: {
            text: 'Spread (-)'
        },
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '80%',
            resize: {
                enabled: true
            }
        }],
        tooltip: {
            //@ts-ignore
            shape: 'square',
            headerShape: 'callout',
            borderWidth: 0,
            shadow: false
        },
        series: [],
        stockTools: {
            gui: {
                enabled: true
            }
        }
    }

    constructor() {
        this.callbackFn = this.callbackFn.bind(this);
    }

    ngOnInit () {}

    ngOnChanges (changes: SimpleChanges) {

        if (this.chart && this.chart.series && this.chart.series.length > 0) {
            while (this.chart.series.length) {
                this.chart.series[0].remove();
            }
        }

        if(this.chart && this.chartData && this.chartData.length > 0) {
            this.chart.addSeries({
                type:'line',
                name: `Spread`,
                pointInterval: 24 * 3600 * 1000,
                data: this.chartData
            });
        }
    }

    public callbackFn(chart) {
        this.chart = chart;
    }

}
