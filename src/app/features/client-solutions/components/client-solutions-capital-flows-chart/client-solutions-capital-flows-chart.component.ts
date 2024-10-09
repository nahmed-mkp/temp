import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UtilityService } from 'src/app/services';
import * as Highcharts from 'highcharts';

import * as fromModels from '../../models';

@Component({
    selector: 'app-cs-capital-flows-chart',
    templateUrl: './client-solutions-capital-flows-chart.component.html',
    styleUrls: ['./client-solutions-capital-flows-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsCapitalFlowsChartComponent implements OnInit, OnChanges {

    @Input() chartData: any;
    @Input() dateRange: fromModels.DateRange;

    public Highcharts = Highcharts;

    public chartDataTotalSubsReds: any[];
    public chartDataTotalSubsRedsByFund: any[];

    public chartTotalSubsReds: any;
    public optionsPlotTotalSubsReds = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        colors: ['#8000ff', '#ff8c00'],
        title: { text: 'Total Subscriptions/Redemptions' },
        subtitle: { text: '' },
        tooltip: {
            valuePrefix: '$',
            pointFormat: '{series.name} - <b>${point.y:,.0f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    valuePrefix: '$',
                    format: '<b>{point.name}</b> ${point.y:,.0f}'
                }
            }
        },
        credits: {
            enabled: false
        }
    };

    public chartTotalSubsRedsByFund: any;
    public optionsPlotTotalSubsRedsByFund = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total Subscriptions/Redemptions by Fund'
        },
        colors: ['#8000ff', '#c300ff', '#9600ff', '#ae65e1', '#501871', '#b36200', '#e67e00', '#ffa333'],
        xAxis: {
            categories: []
        },
        tooltip: {
            shared: true
        },
        credits: {
            enabled: false
        }
    };

    constructor(private utilityService: UtilityService ) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        this.callbackFnTotalSubsReds = this.callbackFnTotalSubsReds.bind(this);
        this.callbackFnTotalSubsRedsByFund = this.callbackFnTotalSubsRedsByFund.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.chartData && changes.chartData.currentValue) {

            if (changes.chartData.currentValue['totalFlows'] !== null && changes.chartData.currentValue['totalFlows'] !== undefined) {
                this.chartDataTotalSubsReds = this._formatSubsRedsPlotData(this.chartData['totalFlows']);
            }

            if (changes.chartData.currentValue['totalFlowsByFund'] !== null && changes.chartData.currentValue['totalFlowsByFund'] !== undefined) {
                this.chartDataTotalSubsRedsByFund = this._formatSubsRedsByFundPlotData(this.chartData['totalFlowsByFund']);
            }

            if (this.chartDataTotalSubsReds) {
                this._drawTotalSubsRedsPlot();
            }

            if (this.chartDataTotalSubsRedsByFund) {
                this._drawTotalSubsRedsByFundPlot();
            }
        }
    }

    public callbackFnTotalSubsReds(chart) {
        this.chartTotalSubsReds = chart;
        if (this.chartDataTotalSubsReds && this.chartDataTotalSubsReds.length > 0) {
            this._drawTotalSubsRedsPlot();
        }

        setTimeout(() => {
            this.chartTotalSubsReds.reflow();
        }, 100);
    }

    public callbackFnTotalSubsRedsByFund(chart) {
        this.chartTotalSubsRedsByFund = chart;

        if (this.chartDataTotalSubsRedsByFund && this.chartDataTotalSubsRedsByFund['data'] &&
            this.chartDataTotalSubsRedsByFund['data'].length > 0) {
            this._drawTotalSubsRedsByFundPlot();
        }

        setTimeout(() => {
            this.chartTotalSubsRedsByFund.reflow();
        }, 100);
    }

    private _drawTotalSubsRedsPlot() {
        if(this.chartTotalSubsReds && this.chartTotalSubsReds.series){
            while (this.chartTotalSubsReds.series.length > 0) {
                this.chartTotalSubsReds.series[0].remove();
            }    
        
            this.chartTotalSubsReds.addSeries(this.chartDataTotalSubsReds);

            this.chartTotalSubsReds.setTitle({ text: 'Total Subscriptions/Redemptions' },
                {text: `From: ${this.dateRange.startDate} To: ${this.dateRange.endDate}`});
        }
    }

    private _drawTotalSubsRedsByFundPlot() {

        if(this.chartTotalSubsRedsByFund && this.chartTotalSubsRedsByFund.series){
            while (this.chartTotalSubsRedsByFund.series.length > 0) {
                this.chartTotalSubsRedsByFund.series[0].remove();
            }
    
            this.chartDataTotalSubsRedsByFund['data'].forEach(series => {
                this.chartTotalSubsRedsByFund.addSeries(series, false, false);
            });
    
            this.chartTotalSubsRedsByFund.setTitle({ text: 'Total Subscriptions/Redemptions By Fund' },
                { text: `From: ${this.dateRange.startDate} To: ${this.dateRange.endDate}` });
    
            this.chartTotalSubsRedsByFund.xAxis[0].setCategories(this.chartDataTotalSubsRedsByFund['categories']);
    
            this.chartTotalSubsRedsByFund.xAxis[0].redraw();
            this.chartTotalSubsRedsByFund.redraw();
        }
    }

    private _formatSubsRedsPlotData(totalFlows: any): any {
        const result = {
            name: 'Subscriptions/Redemptions',
            data: [['Subscriptions', totalFlows['sub']],
                   ['Redemptions', totalFlows['red']]],
            size: '80%',
            innerSize: '50%',
            showInLegend: false,
            dataLabels: {
                enabled: true
            }
        };
        return result;
    }

    private _formatSubsRedsByFundPlotData(totalFlowsByFund: any): any {
        const result = {};
        const categories = Object.keys(totalFlowsByFund);
        const funds = [];
        const data = [];
        categories.forEach((category) => {
            const keys = Object.keys(totalFlowsByFund[category]);
            keys.forEach(key => {
                if (funds.indexOf(key) < 0) {
                    funds.push(key);
                }
            });
        });
        funds.forEach((fund) => {
            data.push({'name': fund, data: []});
            categories.forEach((category) => {
                let val = 0;
                if (totalFlowsByFund[category] !== undefined && totalFlowsByFund[category][fund] !== undefined) {
                    val = totalFlowsByFund[category][fund];
                }
                data[data.length - 1]['data'].push(val);
            });
        });
        result['data'] = data;
        result['categories'] = categories;
        return result;
    }

}
