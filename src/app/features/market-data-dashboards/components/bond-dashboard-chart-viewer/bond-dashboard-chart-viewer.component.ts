import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-bond-dashboard-chart-viewer',
  templateUrl: './bond-dashboard-chart-viewer.component.html',
  styleUrls: ['./bond-dashboard-chart-viewer.component.scss']
})

export class BondDashboardChartViewerComponent implements OnChanges {

    @Input() chartData: any[];

    public Highcharts = Highcharts;
    public chart: any;
    
    public chartConfig: Highcharts.Options = {
        title: {
            text: 'Dataset Comparison'
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
            // @ts-ignore
            shape: 'square',
            headerShape: 'callout',
            borderWidth: 0,
            shadow: false
        },
        series: [],
        legend: {
            enabled: true, 
            align: 'left',
            title: {
                text: 'Legend',
            },
        },
        stockTools: {
            gui: {
                enabled: true
            }
        },
    }

    constructor() {
        this.callbackFn = this.callbackFn.bind(this);
    }

    ngOnChanges (changes: SimpleChanges) {

        if (this.chart && this.chart.series && this.chart.series.length > 0) {
            while (this.chart.series.length) {
                this.chart.series[0].remove();
            }
        }

        if(this.chartData && this.chartData.length > 0) {
            this.chartData.map(item => {
                this.chart.addSeries({
                    type:'line',
                    name: `${item['asset_class']}:${item['ticker']}:${item['alias']}`,
                    pointInterval: 24 * 3600 * 1000,
                    data: item.data
               });
            })
        }
    }

    public callbackFn(chart) {
        this.chart = chart;
    }

}
