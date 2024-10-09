import { Component, OnInit, HostBinding, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import moment from 'moment';

@Component({
  selector: 'rates-step-charts-viewer',
  templateUrl: './rates-step-charts-viewer.component.html',
  styleUrls: ['./rates-step-charts-viewer.component.scss']
})

export class RatesStepChartsViewerComponent implements OnChanges {

    @Input() data: any;

    public chartInput: any;
    public chartData: any;
    public chart: any;

    public optionsPlotTotalSubsRedsByFund = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Cumulative Hikes/Cuts by Year Ends'
        },
        subtitle:{
            text: '(Cumulative Hikes/Cuts = Year End Market OIS Projection - Current Fixing)'
        },
        colors: ['#8000ff', '#c300ff', '#0062ff', '#000080'],
        xAxis: {
            categories: []
        },
        tooltip: {
            shared: true,
            valueDecimals: 1
        },
        credits: {
            enabled: false
        }
    };

    ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.data && changes.data.currentValue) {
        const dataset: any = Object.values(Object.assign({}, this.data));
        console.warn(this.data)
        console.warn(dataset)
        for (let i = 0; i < dataset.length; i ++) {
            dataset[i] = dataset[i].slice(0, 4);
            for (let y = 0; y < 4; y ++) {
                dataset[i][y] = { 'year': dataset[i][y].Year, 'country': dataset[i][y].header, 'cumulativeSteps': dataset[i][y].cumulativeStep};
            }
        }
        this.chartInput = dataset;

        this.chartData = this.generateChartData();

        // this.chartData = {
        //     'data': [
        //         {
        //             'name': '2023',
        //             'data': [
        //                 20,
        //                 48.1,
        //                 168.2,
        //                 45.2
        //             ]
        //         },
        //         {
        //             'name': '2024',
        //             'data': [
        //                 -121.8,
        //                 -21.6,
        //                 99.5,
        //                 -44.6
        //             ]
        //         },
        //         {
        //             'name': '2025',
        //             'data': [
        //                 -189.3,
        //                 -75.7,
        //                 -11.0,
        //                 -133.2
        //             ]
        //         }
        //     ],
        //     'categories': [
        //         'US',
        //         'EU',
        //         'UK',
        //         'CA',
        //         'JP',
        //         'AU',
        //         'NZ'
        //     ]
        // };

        this.drawPlot();
      }
    }

    constructor() {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        this.callbackFnTotalSubsRedsByFund = this.callbackFnTotalSubsRedsByFund.bind(this);
     }

    public callbackFnTotalSubsRedsByFund(chart) {
        this.chart = chart;

        if (this.chartInput.length > 0) {
            this.drawPlot();
        }

        setTimeout(() => {
            this.chart.reflow();
        }, 100);
    }

    private drawPlot() {
        if(this.chart){
            while (this.chart.series.length > 0) {
                this.chart.series[0].remove();
            }

            this.chartData['data'].forEach(series => {
                this.chart.addSeries(series, false, false);
            });
    
            this.chart.xAxis[0].setCategories(this.chartData['categories']);
    
            this.chart.xAxis[0].redraw();
            this.chart.redraw();
        }
    }

    private generateChartData() { 
        let result = {};
        let subArrs = {};
        let categories = [];
 
        let numYears = (this.chartInput[0].length);
        for(let i = 0; i < numYears; i++){
            subArrs[`${moment().year() + i}`] = {
                'name': moment().year() + i,
                'data': []
            }
        }

        this.chartInput.flat().map(item => {
            subArrs[item.year].data.push(item.cumulativeSteps);
        });

        Object.keys(this.data).map( country => {
            categories.push(this.countryMapping(country));
        })
        
        result['data'] = Object.values(subArrs);
        result['categories'] = categories;
        return result;
    }

    private countryMapping( country: string) {
        switch(country){
            case 'US':
                return 'FOMC';
            case 'EU':
                return 'ECB';
            case 'UK':
                return 'MPC';
            case 'CA':
                return 'BOC';
            case 'JP':
                return 'BOJ';
            case 'AU':
                return 'RBA';
            case 'NZ':
                return 'RBNZ'
        }
    }

}
