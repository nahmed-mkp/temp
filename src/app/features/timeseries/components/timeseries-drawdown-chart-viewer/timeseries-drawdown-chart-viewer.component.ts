import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as fromModels from '../../models';
import { HighchartsFactory } from 'src/app/factories';
import moment from 'moment';

@Component({
  selector: 'app-timeseries-drawdown-chart-viewer',
  templateUrl: './timeseries-drawdown-chart-viewer.component.html',
  styleUrls: ['./timeseries-drawdown-chart-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesDrawdownChartViewerComponent {

  @Input() currTab: fromModels.ITab;
  @Input() axisConfig: fromModels.AxisType[];
  @Input() drawdownData: {drawdown: any[], data: any[]};

  @Input() selectedDrawdownDataTimeseries: string;
  @Input() selectedDrawdownDataTimeseriesRow: any;

  @Output() pointSelected = new EventEmitter();
  @Output() onChartConfigChanged: EventEmitter<any> = new EventEmitter<any>();

  public Highcharts = Highcharts;
  public chart: Highcharts.Chart;
  public timeseriesArr: any[];
  public chartConfig = this.generateChartConfig();

  private currentActivePlotBandID: string;
  private currentPlotBandIDs: string[] = [];
  private axisMapping: any;

  constructor(public chartFactory: HighchartsFactory) {
    this.callbackFn = this.callbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes && changes.currTab && changes.currTab.currentValue){
      this.refreshChart();
    }
    
    if(changes && changes.selectedDrawdownDataTimeseriesRow && changes.selectedDrawdownDataTimeseriesRow.currentValue){
      if(this.currentActivePlotBandID){
        this.chart.xAxis[0].removePlotBand(this.currentActivePlotBandID);
      }
      const startDate = new Date(changes.selectedDrawdownDataTimeseriesRow.currentValue.drawdown_start);
      const endDate = new Date(changes.selectedDrawdownDataTimeseriesRow.currentValue.drawdown_end);
      const bandId =  `${changes.selectedDrawdownDataTimeseriesRow.currentValue.drawdown_start}:${changes.selectedDrawdownDataTimeseriesRow.currentValue.drawdown_end}`;
      this.chart.xAxis[0].addPlotBand({
        from: startDate.getTime(),
        to: endDate.getTime(),
        color: '#b7e4ff4d',
        id: bandId+'+'
      });
      this.currentActivePlotBandID = bandId+'+';
    }
  }

  refreshChart(){

    this.axisMapping = this.generateAxisMapping()
    this.chartConfig = this.generateChartConfig();

    if(this.chart){
      this.chart.update(this.chartConfig, true, true, true);
    }

    // remove NaNs
    let cleansedData = this.currTab ? structuredClone(this.currTab.chartData) : [];
    if (cleansedData) { 
      cleansedData.map(cols => {
        Object.keys(cols).map(col => {
          if (Number.isNaN(cols[col])) {
            cols[col] = null
          }
          if (Highcharts.isString(cols[col])) {
            cols  [col] = null
          }
        })
      });
    }

    this.timeseriesArr = this.createTimeseriesArr(cleansedData);
    this.chartConfig = this.generateChartConfig();
    this._drawPlot(this.timeseriesArr);
    
    if(this.chart &&  
      this.drawdownData && 
      Object.keys(this.drawdownData.data).length > 0 ){
        let dataset = this.drawdownData.drawdown
        this.plotBand(dataset)
    }

    if(this.chart &&  
      this.selectedDrawdownDataTimeseries && 
      Object.keys(this.drawdownData.data).length > 0){
        let dataset = this.drawdownData.drawdown
        this.plotBand(dataset)
    }
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

      // remove previous plot bands 
      if(this.chart){
        this.chart.xAxis[0].removePlotBand(this.currentActivePlotBandID);
        this.currentPlotBandIDs.forEach(id => this.chart.xAxis[0].removePlotBand(id))
        this.currentActivePlotBandID = undefined;
        this.currentPlotBandIDs = [];
      }

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

    let tsArr: any = this.currTab && this.currTab.portfolio && this.currTab.portfolio.timeseries ? [...this.currTab.portfolio.timeseries] : [];
    let derivedTsArr: any = this.currTab && this.currTab.portfolio && this.currTab.portfolio && this.currTab.portfolio.derivedTimeseries ? [...this.currTab.portfolio.derivedTimeseries] : [];

    tsArr.map( ts => {
        if(ts['alias']){
          tsArrKeys.push(ts['alias'])
        } else {
          tsArrKeys.push(ts['label'])
        }
      })

      derivedTsArr.map( ts => {
        if(ts['alias']){
          tsArrKeys.push(ts['alias'])
        } else {
          tsArrKeys.push(ts['label'])
        }
      })

    tsArrKeys.sort();
    tsArrKeys.unshift('Date')

    if(inputData && inputData.length > 0){

      // remove id key/value pair when needed (to avoid timeseries line)
      inputData.map( item => {
        if(Object.keys(item).includes('id')){
          delete item.id
        }
        Object.keys(item).map(key => {
          if(!tsArrKeys.includes(key)){
            delete item[key]
          }
        })
      })

      // first subArry within timeseriesArr will always be date
      let temp = {};
      let timeseriesArr = [];
      let output = [];
      let keys = [];
      
      // generate subArrs for each key
      tsArrKeys.map( key => {
        keys.push(key)
        temp[key] = []
        timeseriesArr.push([])
      })     

      // populate each subArr
  
      inputData.map( (inputRow, idx) => {
        let keys = Object.keys(inputRow)
        if(idx === 0){
        }
        keys.map( (key,index) => {
          temp[key].push(inputRow[key])
        })
      })

  
      // separate date subArr;
      let dateData = temp['Date']
      delete temp['Date'];
      
      let tempOutput = []
      Object.keys(temp).map( category => {
        let generatedSeries = [];
        let series = Object.values(temp[category])
        for(let j = 0; j < series.length; j++){
          let dataPoint = series[j];
          generatedSeries.push([dateData[j], dataPoint]);
        }
        tempOutput.push(generatedSeries)
      })

      return(tempOutput)
    }
    return []
  }

  generateAxisMapping(){
    let mapping = {};
    if(this.currTab && this.currTab.portfolio.timeseries) {
      this.currTab.portfolio.timeseries.map((ts,idx) => {
        if(ts.axis === 'auto'){
          mapping[`${ts.id}`] = `default`
        }
        if(ts.axis === 'left'){
          mapping[`${ts.id}`] = `left-${idx}`
        } 
        if(ts.axis === 'right'){
          mapping[`${ts.id}`] = `right-${idx}`
        }
      }) 
    }
    return mapping;
  }

  assignAxisToSeries(ts: fromModels.ITimeseries){
    if(ts){
      return this.axisMapping[ts.id]
    }
  }

  plotBand(dataset: any) {
    Object.values(dataset).map((analysisItemArr: any) => {
      analysisItemArr.map((analysisItem: any) => {
        const startDate = new Date(analysisItem.drawdown_start);
        const endDate = new Date(analysisItem.drawdown_end);
  
        this.chart.xAxis[0].addPlotBand({
          from: startDate.getTime(),
          to: endDate.getTime(),
          color: '#e7e7e7',
          id: `${analysisItem.drawdown_start}:${analysisItem.drawdown_end}` 
        })
        this.currentPlotBandIDs.push(`${analysisItem.drawdown_start}:${analysisItem.drawdown_end}`);
      })
    });    
  }

  showChart(){
    return (this.currTab && this.currTab.portfolio.timeseries.length) > 0 ? true : false
  }
  
  generateYAxisConfig(): Highcharts.YAxisOptions[]{
    let defaultAxisArr = [{id: 'default', opposite: false, title: {text: undefined}}]
    let leftAxisArr = [];
    let rightAxisArr = [];

    if(this.currTab && this.currTab.portfolio &&  this.currTab.portfolio.timeseries.length > 0){
      this.currTab.portfolio.timeseries.map( (ts, idx) => {
        if(ts.axis === 'left'){
          leftAxisArr.push({
            id: `left-${idx}`,
            opposite: false
          })
        } 
        if(ts.axis === 'right'){
          rightAxisArr.push({
            id: `right-${idx}`,
            opposite: true
          })
        }
      })
    }
    return defaultAxisArr.concat(leftAxisArr, rightAxisArr)
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
        layout: 'vertical',
        align: 'center',
        floating: true,
        verticalAlign: 'top',
        y: 20,
        itemStyle: {fontSize: "11px", cursor: "pointer"},
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
      },
      plotOptions: {
        series: {
          showInNavigator: true,
          allowPointSelect: true,
          point: {
            events: {
              select: (point: any) => {
                this.pointSelected.emit({date: point.target.x, value: point.target.y});
              }
            }
          }
        },
      }
    }
    this.onChartConfigChanged.emit(config)
    return config
  }

}