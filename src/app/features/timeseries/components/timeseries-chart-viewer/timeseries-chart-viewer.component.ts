import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as fromModels from '../../models';
import { HighchartsFactory } from 'src/app/factories';
import moment from 'moment';


let app: TimeseriesChartViewerComponent;

@Component({
  selector: 'app-timeseries-chart-viewer',
  templateUrl: './timeseries-chart-viewer.component.html',
  styleUrls: ['./timeseries-chart-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesChartViewerComponent implements OnChanges, OnInit {

  @Input() currTab: fromModels.ITab;
  @Input() axisConfig: fromModels.AxisType[];
  
  @Output() onChartConfigChanged: EventEmitter<any> = new EventEmitter<any>();

  public Highcharts = Highcharts;
  public chart: Highcharts.Chart;
  public timeseriesArr: any[];
  public chartConfig = this.generateChartConfig();
  

  private currentActivePlotBandID: string;
  private axisMapping: any;

  constructor(public chartFactory: HighchartsFactory) {
    this.callbackFn = this.callbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;
  }

  ngOnInit(): void {
    app = this;
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes && changes.currTab && changes.currTab.currentValue){
      this.refreshChart();
    }
    
  }

  refreshChart(){

    this.axisMapping = this.generateAxisMapping()
    this.chartConfig = this.generateChartConfig();

    if(this.chart){
      this.chart.update(this.chartConfig, true, true, true);
    }

    // remove NaNs
    let cleansedData = this.currTab && this.currTab.chartData ? structuredClone(this.currTab.chartData) : [];
    if (cleansedData) { 
      cleansedData.map(cols => {
        Object.keys(cols).map(col => {
          if (Number.isNaN(cols[col])) {
            cols[col] = null
          }
          if (Highcharts.isString(cols[col])) {
            cols[col] = null
          }
        })
      });
    }

    this.timeseriesArr = this.createTimeseriesArr(cleansedData);
    this._drawPlot(this.timeseriesArr);
  }

  callbackFn(chart: any): void {
    this.chart = chart;
    if (this.currTab && this.currTab.chartData && this.currTab.chartData.length > 0) {
      this.refreshChart();
    }
    setTimeout(() => {
      this.chart.reflow();
    }, 1000);
  }

  _drawPlot(targetData: any[]) {

    this.clearChart();
    
    if(this.currTab && this.currTab.chartData && this.currTab.chartData.length > 0){
      
      let names = [];
      
      this.currTab.portfolio.timeseries.map( ts => {
        if(ts['alias']){
          names.push(ts['alias'])
        } else {
          names.push(ts['label'])
        }
      })

      if(this.currTab.portfolio.derivedTimeseries){
        this.currTab.portfolio.derivedTimeseries.map( ts => {
          if(ts['alias']){
            names.push(ts['alias'])
          } else {
            names.push(ts['label'])
          }
        })
      }

      let timeseries: any = this.currTab.portfolio.timeseries ? [...this.currTab.portfolio.timeseries] : [];
      let derivedTimeseries: any = this.currTab.portfolio.derivedTimeseries ? [...this.currTab.portfolio.derivedTimeseries] : [];
      let allTimeseries = timeseries.concat(derivedTimeseries);

      targetData.forEach((data, idx) => {
        if(this.chart){
          this.chart.addSeries({
            data: data,
            type: 'line',
            shadow: false,
            name: names[idx], 
            yAxis: this.assignAxisToSeries(allTimeseries[idx])
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

  createTimeseriesArr(inputData){
    
    let tsArrKeys = [];

    let tsArr: any = this.currTab && this.currTab.portfolio ? [...this.currTab.portfolio.timeseries] : [];
    let derivedTsArr: any = this.currTab.portfolio && this.currTab.portfolio.derivedTimeseries ? [...this.currTab.portfolio.derivedTimeseries] : [];

    tsArr.map( ts => {
      if(ts['alias']){
        tsArrKeys.push(ts['alias'])
      } else {
        tsArrKeys.push(ts['label'])
      }
    })
    tsArrKeys.sort();

    derivedTsArr.map( ts => {
      if(ts['alias']){
        tsArrKeys.push(ts['alias'])
      } else {
        tsArrKeys.push(ts['label'])
      }
    })

    tsArrKeys.unshift('Date')

    if(inputData && inputData.length > 0){

      // remove id key/value pair when needed (to avoid timeseries line)
      inputData.map( item => {
        if(Object.keys(item).includes('id')){
          delete item.id
        }
      })

      // first subArry within timeseriesArr will always be date
      let timeseriesArrMap = {};
      let timeseriesArr = [];
      let keys = [];
      
      // generate subArrs for each key
      tsArrKeys.map( key => {
        keys.push(key)
        timeseriesArrMap[key] = []
        timeseriesArr.push([])
      })     

      // populate each subArr
      inputData.map( (inputRow, idx) => {
        let keys = Object.keys(inputRow)
        if(idx === 0){}
        keys.map( (key,index) => {
          if(timeseriesArrMap[key] !== undefined && inputRow[key] !== null && inputRow[key] !== undefined){
            timeseriesArrMap[key].push(inputRow[key])
          }
        })
      })
  
      // separate date subArr;
      let dateData = timeseriesArrMap['Date']
      delete timeseriesArrMap['Date'];
      
      let tempOutput = []
      Object.keys(timeseriesArrMap).map( category => {
        let generatedSeries = [];
        let series = Object.values(timeseriesArrMap[category]) 
        if (series.length > 0){
          for(let j = 0; j < series.length; j++){
            let dataPoint = series[j];
            generatedSeries.push([dateData[j], dataPoint]);
          }
          tempOutput.push(generatedSeries)
        }
      })
      return(tempOutput)
    }
    return []
  }

  generateAxisMapping(){
    let mapping = {};
    if(this.currTab && this.currTab.portfolio && this.currTab.portfolio.timeseries) {

      let timeseries: any =  this.currTab.portfolio.timeseries ? [...this.currTab.portfolio.timeseries] : [];
      let derivedTimeseries: any = this.currTab.portfolio.derivedTimeseries ? [...this.currTab.portfolio.derivedTimeseries] : [];
      let allTimeseries = timeseries.concat(derivedTimeseries);

      allTimeseries.map((ts,idx) => {
        if(ts.axis === 'auto'){
          mapping[`${ts.variable}`] = `default`
        }
        if(ts.axis === 'left'){
          mapping[`${ts.variable}`] = `left-${idx}`
        } 
        if(ts.axis === 'right'){
          mapping[`${ts.variable}`] = `right-${idx}`
        }
      }) 
    }
    return mapping;
  }

  assignAxisToSeries(ts: fromModels.ITimeseries | fromModels.IDerivedTimeseries){
    if(ts){
      return this.axisMapping[ts.variable]
    }
  }

  showChart(){
    return (this.currTab && this.currTab.portfolio && this.currTab.portfolio.timeseries.length) > 0 ? true : false
  }
  
  generateYAxisConfig(): Highcharts.YAxisOptions[]{

    let defaultAxisArr = [{id: 'default', opposite: false, title: {text: undefined}}]
    let leftAxisArr = [];
    let rightAxisArr = [];


    if(this.currTab && this.currTab.portfolio && this.currTab.portfolio.timeseries.length > 0){

      let timeseries: any =  this.currTab.portfolio.timeseries ? [...this.currTab.portfolio.timeseries] : [];
      let derivedTimeseries: any = this.currTab.portfolio.derivedTimeseries ? [...this.currTab.portfolio.derivedTimeseries] : [];
      let allTimeseries = timeseries.concat(derivedTimeseries);

      allTimeseries.map( (ts, idx) => {
        if(ts.axis === 'left'){
          leftAxisArr.push({
            id: `left-${idx}`,
            opposite: false,
            title: {
              text: undefined
            }
          })
        } 
        if(ts.axis === 'right'){
          rightAxisArr.push({
            id: `right-${idx}`,
            opposite: true,
            title: {
              text: undefined
            }
          })
        }
      })
    }
    return defaultAxisArr.concat(leftAxisArr, rightAxisArr)
  }

  generateTooltipFormatter(contextObj: Highcharts.TooltipFormatterContextObject){
    return function() {
      return contextObj.points.reduce(function(s, point) {
          return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toFixed(2).toLocaleString();
      }, '<b>' + new Date(contextObj.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
    }
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
          return app.generateTooltipFormatter(this)();
        }
      },
      title: { 
        text: this.currTab && this.currTab.portfolio ? this.currTab.portfolio.name : 'Timeseries History'
      },
      xAxis:{
        crosshair: true,
        labels:{
          formatter: function() {
            return moment(this.value).format('MMM DD');
          }
        }
      },
      yAxis: this.generateYAxisConfig(),
      legend: {
        enabled: true,
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        shadow: true,
        y: 20,
        itemStyle: {          
          fontSize: "11px", 
          cursor: "pointer"
        },
      },
      navigator: {
        enabled: true,
        height: 40,
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
      }
    }
    this.onChartConfigChanged.emit(config)
    return config
  }

}