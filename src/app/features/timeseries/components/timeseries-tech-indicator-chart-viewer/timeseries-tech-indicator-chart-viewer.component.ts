import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as fromModels from '../../models';
import { HighchartsFactory } from 'src/app/factories';
import moment from 'moment';

@Component({
  selector: 'app-timeseries-tech-indicator-chart-viewer',
  templateUrl: './timeseries-tech-indicator-chart-viewer.component.html',
  styleUrls: ['./timeseries-tech-indicator-chart-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesTechIndicatorChartViewerComponent {

  @Input() currTab: fromModels.ITab;

  public Highcharts = Highcharts;
  public chart: Highcharts.Chart;

  public timeseriesArr: any[];

  public techIndicData: any[] = [];
  public chartConfig = this.generateChartConfig();

  constructor(public chartFactory: HighchartsFactory) {
    this.callbackFn = this.callbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes && changes.currTab && changes.currTab.currentValue){

      let techIndicData = [];

      if(this.currTab.simpleMovingAvgData){
        if(techIndicData.length === 0){
          techIndicData = this.currTab.simpleMovingAvgData
        } else {
          this.currTab.simpleMovingAvgData.map( (row,rowNum) => {
            Object.keys(row).map( key => {
              if(!Object.keys(techIndicData[rowNum]).includes(key)){
                techIndicData[rowNum][key] = this.currTab.simpleMovingAvgData[rowNum][key]
              }
            }) 
          })
        }
      }
      if(this.currTab.bollingerBandsData){
        if(techIndicData.length === 0){
          techIndicData = this.currTab.bollingerBandsData
        } else {
          this.currTab.bollingerBandsData.map( (row,rowNum) => {
            Object.keys(row).map( key => {
              if(!Object.keys(techIndicData[rowNum]).includes(key)){
                techIndicData[rowNum][key] = this.currTab.bollingerBandsData[rowNum][key]
              }
            }) 
          })
        }
      }
      if(this.currTab.relativeStrengthIndicatorData){
        if(techIndicData.length === 0){
          techIndicData = this.currTab.relativeStrengthIndicatorData
        } else {
          this.currTab.relativeStrengthIndicatorData.map( (row,rowNum) => {
            Object.keys(row).map( key => {
              if(!Object.keys(techIndicData[rowNum]).includes(key)){
                techIndicData[rowNum][key] = this.currTab.relativeStrengthIndicatorData[rowNum][key]
              }
            }) 
          })
        }
      }
      if(this.currTab.movingAverageConvergenceDivergenceData){
        if(techIndicData.length === 0){
          techIndicData = this.currTab.movingAverageConvergenceDivergenceData
        } else {
          this.currTab.movingAverageConvergenceDivergenceData.map( (row,rowNum) => {
            Object.keys(row).map( (key,idx) => {
              if(!Object.keys(techIndicData[rowNum]).includes(key)){
                techIndicData[rowNum][key] = this.currTab.movingAverageConvergenceDivergenceData[rowNum][key]
              }
            }) 
          })
        }
      }
      this.techIndicData = techIndicData;
      this.refreshChart();
    }

  }

  refreshChart(){
    this.chartConfig = this.generateChartConfig();

    // remove NaNs
    let cleansedData = this.techIndicData;
    cleansedData.map(row => {
      Object.keys(row).map(key => {
        if(Number.isNaN(row[key])){
          row[key] = null
        }
      })
    })

    this.timeseriesArr = this.createTimeseriesArr(cleansedData);
    this.chartConfig = this.generateChartConfig();
    this._drawPlot(this.timeseriesArr);
    
  }

  callbackFn(chart: any): void {
    this.chart = chart;
    if (this.techIndicData && this.techIndicData.length > 0) {
      this.timeseriesArr = this.createTimeseriesArr(this.techIndicData);
      this._drawPlot(this.timeseriesArr);
    }
    // setTimeout(() => {
    //   this.chart.reflow();
    // }, 1000);
  }

  _drawPlot(targetData: any[]) {

    this.clearChart();
    
    if(targetData.length > 0){
      targetData.forEach((data, idx) => {
        if(this.chart){
          this.chart.addSeries({
            data: data.data,
            type: 'line',
            lineWidth: this.isRegularTimeseries(data.name) ? 1 : 3,
            opacity: this.isRegularTimeseries(data.name) ? 0.5 : 1,
            name: data.name,
          })}
      });
    }
  }

  clearChart(): void {
    if (this.chart) {
      while (this.chart.series.length > 0) {
        this.chart.series[0].remove(true);
      }
    }
  }

  createTimeseriesArr(cleansedData){

    if(cleansedData.length > 0){

      // first subArry within timeseriesArr will always be date
      let temp = {};
      let keys = [];

      // generate subArrs for each key
      cleansedData.map( row => {
        Object.keys(row).map( key =>  {
          if(!keys.includes(key)){
            keys.push(key)
            temp[key] = []  
          }
        })
      })     

      // populate each subArr
      cleansedData.map( (row, idx) => {
        Object.keys(row).map( (key,index) => {
          temp[key].push(row[key])
        })
      })

      // separate date subArr;
      let dateData = temp['Date']
      delete temp['Date'];
      
      // tie date subarr with each key subArr
      let tempOutput = []
      Object.keys(temp).map( category => {
        let generatedSeries = [];
        let series = Object.values(temp[category])
        for(let j = 0; j < series.length; j++){
          let dataPoint = series[j];
          generatedSeries.push([dateData[j], dataPoint]);
        }
        tempOutput.push({
          data: generatedSeries,
          name: category
        })
      })
      return(tempOutput)
    }
    return []
  }

  showChart(){
    return (this.currTab && this.currTab.portfolio.timeseries.length) > 0 ? true : false
  }
  
  generateChartConfig(): Highcharts.Options { 
    let config: Highcharts.Options =  {
      chart: {
        zooming:{
          type: 'xy'
        }
      },
      tooltip: {
        shared: true,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        split: true,
        formatter: function() {
          return this.points.reduce(function(s, point) {
              return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toFixed(2).toLocaleString();
          }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
        }
      },
      title: { 
        text: 'Technical Indicators'
      },
      xAxis:{
        crosshair: true,
        labels:{
          formatter: function() {
            return moment(this.value).format('MMM DD');
          }
        }
      },
      yAxis:{
        title:{
          text: undefined
        }
      },
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'center',
        floating: true,
        verticalAlign: 'top',
        y: 20,
        itemStyle: {fontSize: "10px", cursor: "pointer"},
      },
      navigator: {
        height: 80,
      },
      exporting: {
          csv: {
              dateFormat: '%Y-%m-%d'
          }
      },
      credits: {
        enabled: false,
      },
      rangeSelector: {
        inputEnabled: false,
        allButtonsEnabled: true,
        buttons: [{
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        },
        {
          type: 'all',
          text: 'All',
          title: 'View all'
        }]
      },
      plotOptions: {
        series: {
          showInNavigator: true,
          allowPointSelect: true,
        },
      }
    }
    return config
  }

  isRegularTimeseries(name: string){
    if(name.includes('bband') || name.includes('rsi') || name.includes('sma') || name.includes('macd')){
      return false
    } else {
      return true
    }
  }

}