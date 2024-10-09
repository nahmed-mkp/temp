import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsFactory } from '../../../../factories';

@Component({
  selector: 'app-bills-short-coupon-dashboard-chart-viewer',
  templateUrl: './bills-short-coupon-dashboard-chart-viewer.component.html',
  styleUrls: ['./bills-short-coupon-dashboard-chart-viewer.component.scss']
})

export class BillsShortCouponsDashboardChartViewerComponent implements OnInit, OnChanges {

    @Input() chartData: any[];
    @Input() type: string;
    

    public Highcharts = Highcharts;

    public data: any;
    public chart: any;
    public optionsPlot: any;


    public chartConfig: Highcharts.Options = {
        chart: {
            type: 'scatter',
            animation: false,
            zooming:{
                type: 'xy'
            }
        },
        title: {
            text: 'Plot Against Maturity'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis:{
            opposite: false
        },
        credits:{
            enabled: false
        },
        plotOptions: {
            series: {
              showInNavigator: true
            }
          },
    }

    constructor(public chartFactory: HighchartsFactory) {
        this.callbackFn = this.callbackFn.bind(this);
    }

    ngOnChanges (changes: SimpleChanges) {
        if(this.chartData && this.chartData[this.type]){
            this.drawLine(this.chartData[this.type].data)
            this.chart.setTitle({
                text: this.chartData[this.type].title
            })
        }

    }

    ngOnInit () {
      
    }

    public callbackFn(chart) {
        this.chart = chart;
    }

    public drawLine(data){

        while(this.chart.series.length > 0){
            this.chart.series[0].remove()
        }

        this.chart.addSeries({
            name: 'test',
            data: data
        })
    }

}
