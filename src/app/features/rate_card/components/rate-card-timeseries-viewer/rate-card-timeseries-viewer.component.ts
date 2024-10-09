import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import * as fromModels from '../../models';
import { HighchartsFactory } from 'src/app/factories';
import moment from 'moment';
import { stringToArray } from 'ag-grid-community';

@Component({
  selector: 'app-rate-card-timeseries-viewer',
  templateUrl: './rate-card-timeseries-viewer.component.html',
  styleUrls: ['./rate-card-timeseries-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateCardTimeseriesViewerComponent {

  @Input() secName: string;
  @Input() data: fromModels.IRateCard[];
  @Input() dataLoading: boolean;

  public Highcharts = Highcharts;
  public chart: any;
  public timeseriesArr: any[];
  public chartConfig = this.generateChartConfig();

  constructor(public chartFactory: HighchartsFactory) {
    this.callbackFn = this.callbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes && changes.data && changes.data.currentValue !== null &&  changes.data.currentValue.length > 0){
      this.generateTimeseriesArr(this.data);
    }
    if(changes && changes.secName && changes.secName.currentValue){
      this.chart.update({
          title: {
              text: `${this.secName} | Historical Rate Change`
          }
        })
    }
  }

  generateTimeseriesArr(inputData: fromModels.IRateCard[]){
    let outputArr = [];
    let alphaPortArr = [];
    let bluePearlArr = [];
    let gmmkArr = [];
    let enhancedArr = [];
    let oppArr = [];

    //cleanse data
    let cleansedData = inputData.filter( data => (data && data['Alpha Port'] && data['BluePearl'] && data['GMMK'] && data['Enhanced Opportunity Master Fund'] && data['Opportunity Master Fund']))
    cleansedData.map( data => {
      alphaPortArr.push({ x: new Date(data['AsOfDate']).getTime() , y: data['Alpha Port'] });
      bluePearlArr.push({ x: new Date(data['AsOfDate']).getTime()  , y: data['BluePearl'] })
      gmmkArr.push({ x: new Date(data['AsOfDate']).getTime()  , y: data['GMMK'] })
      enhancedArr.push({ x: new Date(data['AsOfDate']).getTime()  , y: data['Enhanced Opportunity Master Fund'] })
      oppArr.push({ x: new Date(data['AsOfDate']).getTime() , y: data['Opportunity Master Fund'] });
    })
    outputArr.push(
      {title: "AlphaPort" , data: alphaPortArr}, 
      {title: "BluePearl" , data: bluePearlArr},
      {title: "GMMK" , data: gmmkArr},
      {title: "Enhanced" , data: enhancedArr},
      {title: "Opportunity" , data: oppArr}
    )
    this.drawPlot(outputArr)
  }

  drawPlot(seriesArr){
    this.clearChart();

    seriesArr.map( (series : {title: string, data: any}) => {
      this.chart.addSeries({
        data: series.data,
        name: series.title,
        type: 'line'
      })
    })
  }


  callbackFn(chart: any): void {
    this.chart = chart;
  }

  clearChart(): void {
    if (this.chart) {
      while (this.chart.series.length > 0) {
        this.chart.series[0].remove(true);
      }
    }
  }

  generateChartConfig(){
    let config = {
      chart: {
        zooming:{
          type: 'xy'
        }
      },
      tooltip: {
        shared: true,
        crosshairs: [true],
        animation: true,
        useHTML: true,
        formatter: function() {
          let output = '<div style="height: 25px;width: 250px;display:flex;flex-direction: row;">'
          let firstSet = '<div style="flex:1; display:flex;flex-direction:column;align-items:center;justify-content: center">'
          let secondSet = '<div style="flex:1; display:flex;flex-direction:column;align-items:center;justify-content: center">'
          this.points.map((point,idx) => {
            let htmlData = `
              <div style="font-size:10px"> 
                <b> ${point.series.name} </b> : <span> ${point.y.toFixed(2)} </span>
              </div>
            `
            idx < 3 ? firstSet += htmlData : secondSet += htmlData
          })
          output += `<div style="font-size:11px;font-weight:bold; display:flex; align-items:center;justify-content:center;"> ${moment(this.x).format('MM-DD-YYYY')}  </div>`
          output += firstSet + '</div>' + secondSet + '</div></div>'
          return output
        }
      },
      navigator: {
        series: {
            includeInCSVExport: false
        },
        height: 20,
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
    return config
  }


}
