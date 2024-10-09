import { Component, OnInit, HostBinding } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { GridOptions, GridApi, CellEditingStoppedEvent } from 'ag-grid-community';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-prepay-rate-custom-cell-editor',
  templateUrl: './prepay-rate-custom-cell-editor.component.html',
  styleUrls: ['./prepay-rate-custom-cell-editor.component.scss']
})
export class PrepayRateCustomCellEditorComponent implements ICellEditorAngularComp {

  @HostBinding('style.width') private width = '40rem';
  @HostBinding('style.height') private height = '25rem';
  @HostBinding('style.min-width') private minWidth = '0';
  @HostBinding('class') private classes = 'vertical-flex';

  private params: any;
  public value: any;
  public multiplier: number;
  public Highcharts = Highcharts;
  public title: string;

  private gridApi: GridApi;
  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions = {
    columnDefs: [
      {
        headerName: 'Prepayment Rate', field: 'rate',
        cellStyle: {'justify-content': 'flex-end'},
        editable: true,
      }
    ],
    rowHeight: 22,
    onCellEditingStopped: this.onGridDataChange.bind(this)
  }

  public chart: any;
  public optionsPlot = {
    chart: {
      animation: false,
      type: 'line',
      zooming:{
        type: 'xy'
      }
    },
    yAxis: {
      labels: {
        enabled: true
      },
      title: {
        text: null
      }
    },
    xAxis: {
      gridLineWidth: 1
    },
    title: {
      text: null
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    navigator: {
        series: {
            includeInCSVExport: false
        }
    },
    exporting: {
        csv: {
            dateFormat: '%Y-%m-%d'
        }
    },
  };

  private plotData: any[];
  public gridData: any[];

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.callbackFn = this.callbackFn.bind(this);
  }


  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    this.title = this.params.title;

    const result = this.value.split(':');
    this.multiplier = result[0];

    this.plotData = this.getPlotData(result[1]);
    this.gridData = this.getGridData(result[1]);
  }

  getValue() {
    const prepaymentRate = this.gridData.map(item => item.rate).join(' ');
    const result = this.multiplier + ': ' + prepaymentRate;
    return result;
  }


  refresh(): boolean {
    return false;
  }

  isPopup(): boolean {
    return true;
  }

  // ---------------------------------------
  public customGridCallBack(params) {
    this.gridApi = params.api;
  }

  public callbackFn(chart) {
    this.chart = chart;
    if (this.plotData) {
      this.chart.addSeries({
        name: 'prepay rate',
        type: 'line',
        data: this.plotData
      });
      setTimeout(() =>  this.chart.reflow())
    }
  }

  private getGridData(rawdata: string) {
    const dataArray = rawdata.split(' ');
    dataArray.shift();
    const gridData = dataArray.map(element => {
      return {rate: element}
    });
    return gridData;
  }

  private getPlotData(rawdata: string) {
    const result = rawdata.split(' ');
    result.shift();
    const plotData = result.map(item => parseFloat(item));
    return plotData;
  }

  private onGridDataChange(params: CellEditingStoppedEvent) {
    this.plotData = this.gridData.map(item => parseFloat(item.rate));
    this.chart.series[0].remove(false, false);
    this.chart.addSeries({
      data: this.plotData
    });
  }


}
