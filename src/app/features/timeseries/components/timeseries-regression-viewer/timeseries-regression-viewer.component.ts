import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, ColDef } from 'ag-grid-community';
import moment from 'moment';
import * as fromModels from '../../models';
import { UtilityService } from 'src/app/services';
import * as fromStore from '../../store';
import { HighchartsFactory } from 'src/app/factories';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-timeseries-regression-viewer',
  templateUrl: './timeseries-regression-viewer.component.html',
  styleUrls: ['./timeseries-regression-viewer.component.scss']
})
export class TimeseriesRegressionViewerComponent implements OnChanges {

  @Input() currTab: fromModels.ITab;
  @Output() onRegressionViewChanged: EventEmitter<string> = new EventEmitter<string>();

  public timeseriesArr: any[];
  public Highcharts = Highcharts;

  public regressionData: fromModels.IRegressionRes;
  public regressionViewMode: 'residual' | 'actual' | 'regression' = 'regression';

  public residualChart: any;
  public actualChart: any;
  public regressionChart: any;

  public chartConfig = this.generateChartConfig();

  public selectedIndex: number = 0;

  constructor(private store: Store<fromStore.State>, public chartFactory: HighchartsFactory, private utilities: UtilityService) {
    this.residualChartCallbackFn = this.residualChartCallbackFn.bind(this);
    this.actualChartCallbackFn = this.actualChartCallbackFn.bind(this);
    this.regressionChartCallbackFn = this.regressionChartCallbackFn.bind(this);
    this.Highcharts = this.chartFactory.Highcharts;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes && changes.currTab && changes.currTab.currentValue){
      if(this.selectedIndex === 0){
        this.clearChart(this.regressionChart);
      }
      if(this.selectedIndex === 1){
        this.clearChart(this.actualChart);
      }
      if(this.selectedIndex === 2){
        this.clearChart(this.residualChart);
      }

      if(this.currTab.regressionData !== null && this.currTab.regressionData.timeseries.length > 0){
        
        if(this.regressionViewMode === 'regression'){
          this.selectedIndex = 0;
        } 
        if(this.regressionViewMode === 'actual'){
          this.selectedIndex = 1;
        }
        if(this.regressionViewMode === 'residual'){
          this.selectedIndex = 2;
        }

        this.chartConfig = this.generateChartConfig();
        this.regressionData = this.currTab.regressionData;
        this.refreshChart()
      }


    }

  }

  public refreshChart(){

    // remove NaNs
    let cleansedData = this.regressionData.timeseries;
    cleansedData.map(cols => {
      Object.keys(cols).map(col => {
        if(Number.isNaN(cols[col])){
          cols[col] = null
        }
      })
    })

    this.chartConfig = this.generateChartConfig();
    this._drawPlot();
  }

  public residualChartCallbackFn(chart: any): void {
    this.residualChart = chart;
    if (this.currTab.regressionData && this.currTab.regressionData.timeseries.length > 0) {
      this._drawPlot();
    }
  }

  public actualChartCallbackFn(chart: any): void {
    this.actualChart = chart;
    if (this.currTab.regressionData && this.currTab.regressionData.timeseries.length > 0) {
      this._drawPlot();
    }
  }

  public regressionChartCallbackFn(chart: any): void {
    this.regressionChart = chart;
    if (this.currTab.regressionData && this.currTab.regressionData.timeseries.length > 0) {
      this._drawPlot();
    }
  }

  private _drawPlot() {

    let actualTs = [];
    let predictedTs = [];
    let residualTs = [];
    let regressionTs = [];

    this.clearChart(this.regressionChart);
    this.clearChart(this.actualChart);
    this.clearChart(this.residualChart);
  
    this.regressionData.timeseries.map( ts => {
      actualTs.push({x: ts['Date'], y: ts['Actual']})
      predictedTs.push({x: ts['Date'], y: ts['Predicted']})
      residualTs.push({x: ts['Date'], y: ts['Error']})
    })

    this.regressionData.regressionPlot.map( ts => {
      regressionTs.push({ date: ts[Object.keys(ts)[0]], x: ts[Object.keys(ts)[1]], y: ts[Object.keys(ts)[2]]})
    })

    if(this.actualChart){
        this.actualChart.addSeries({
          data: actualTs,
          name: 'Actual Values',
          type: 'line',
          color: '#b4b4b4'
        })
        this.actualChart.addSeries({
          data: predictedTs,
          name: 'Predicted Values',
          type: 'line',
          color: '#0000FF'
        })    
        this.actualChart.reflow();
    }

    if(this.residualChart){
      this.residualChart.addSeries({
        data: residualTs,
        name: 'Residual Values',
        type: 'line'
      })
      this.residualChart.reflow();
    }

    if(this.regressionChart){

      this.regressionChart.addSeries({
        data: regressionTs,
        name: 'Series Data',
        type: 'scatter'
      })

      this.regressionChart.addSeries({
        name: 'Regression Line',
        data: this.currTab.regressionData.regressionLine,
        type: 'line',
        color: '#828476',
        marker: {
          symbol: 'square'
        }
      });

      this.regressionChart.addSeries({
        name: 'Current Point',
        data: [this.currTab.regressionData.curPoint],
        type: 'line',
        color: '#ff6a00',
        symbol: 'diamond',
        marker: {
          symbol: 'diamond',
          radius: 7,
        }
      });
      this.regressionChart.reflow();
    }

  }

  public clearChart(chartRef): void {
    if (chartRef && chartRef.series) {
      while (chartRef.series.length > 0) {
        chartRef.series[0].remove(true);
      }
    }
  }

  public generateChartConfig(){

    let viewMode = this.currTab ? this.currTab.regressionViewMode : 'regression';
    let title = 'Linear Regression';
    let xAxisTitle = undefined;
    let yAxisTitle = undefined;

    let tooltip = function() {
      if(viewMode === 'regression'){
        return `<b>Date: ${moment(this.point.options.date).format('MM/DD/YYYY')} </b> </br> x: ${this.x.toFixed(2)} </br> y: ${this.y.toFixed(2)}`
      } else {
        return this.points.reduce(function(s, point) {
          return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toFixed(2).toLocaleString();
      }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
      }
    }
    
    if(viewMode === 'residual'){
      title = 'Residual Plot';
      xAxisTitle = null;
      yAxisTitle = null;
    }
    if(viewMode === 'actual'){
      title = 'Actual vs Predicted Plot'
      xAxisTitle = null;
      yAxisTitle = null;
    }
    
    if(viewMode === 'regression'){
      title = 'Linear Regression'
      if(this.regressionData && this.regressionData.regressionPlot.length > 0){
        xAxisTitle = Object.keys(this.regressionData.regressionPlot[0])[1]
        yAxisTitle = Object.keys(this.regressionData.regressionPlot[0])[2]
      }
    }

    let config = {
      chart: {
        zooming:{
          type: 'xy'
        }
      },
      tooltip: {
        shared: true,
        crosshairs: [true],
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        split: true,
        valueDecimals: 2,
        pointFormat: 'Date: <b>{point.options.date}</b><br />x: <b>{point.x}</b><br />y: <b>{point.y}</b>',
        formatter: tooltip
      },
      legend:{
        enabled: this.regressionViewMode === 'regression' ? false : true,
      },
      title: { 
        useHTML: true,
        text: `<div style="width: 50vw; margin-left:12.5vw height: 70px;display:flex;flex-direction:column;align-items:center;justify-content:center; margin-top:10px"> 
                <span style="font-size:13px"> ${title} </span>          
                <div style="display:flex;flex-direction:row;align-items:center;justify-content:space-between; width: 25%;margin-top:5px;">
                    <span style="font-size:11px"> adjR2 = ${this.regressionData ? this.regressionData.r2.toFixed(3) : ''} </span>
                    <span style="font-size:11px"> SE = ${this.regressionData ? this.regressionData.mse.toFixed(3) : ''} </span>
                    <span style="font-size:11px"> Observations = ${this.regressionData ? this.regressionData.observations.toFixed(0) : ''} </span>
                  </div>
    
              </div>` 
      },
      subtitle: {
        useHTML: true,
        text: ` <span style="font-size:11px"> Reg: ${this.regressionData ? this.regressionData.expr : ''} </span>  `
      },
      navigator: {
        series: {
            includeInCSVExport: false
        },
        height: 80,
      },
      xAxis: {
        title: {
          text: xAxisTitle,
        }
      },
      yAxis: {
        title: {
          text: yAxisTitle !== null ? `<div style="font-size:11px"> ${yAxisTitle} </div>` : null,
        }
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
      },
      plotOptions: {
        series: {
          showInNavigator: true,
          states:{
            inactive: {
              enabled: false
            }
          }
        },
      },
    }
    return config  
  }

  onSelectedTabChange(event){
    this.onRegressionViewChanged.emit(event.tab.textLabel);
  }
  
}