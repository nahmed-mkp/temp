import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ValueFormatterParams, ValueGetterParams, ColDef, RowNode } from 'ag-grid-community';

import * as fromModels from '../../models';
import { ColorCodingService } from '../../services';
import { FirstDataRenderedEvent } from 'ag-grid-community/dist/lib/events';

@Component({
  selector: 'app-jbot-tech-viewer',
  templateUrl: './jbot-tech-viewer.component.html',
  styleUrls: ['./jbot-tech-viewer.component.scss']
})
export class JbotTechViewerComponent implements OnInit, OnChanges {

  @Input() plotData: fromModels.JbotTechScore[];
  @Input() loadingStatus: boolean;
  @Input() routeDirectInstrument: string;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi; 

  private newColumnDefs: ColDef[] = [];
  private plotDataFormatFinal;


  public extraOption = {};
  public dataRendering: boolean = false;

  public customGridOption: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
      filter: "agNumberColumnFilter",
    },
    floatingFilter: true,
    sideBar: true,

    // onFirstDataRendered: (params) => {
    //   this.dataRendering = false;
    //   // this.columnColorCoding(params);
    // },

    getContextMenuItems: (params) => {
      return ['copy', 'copyWithHeaders', 'separator','csvExport', 'excelExport'] 
    },

    onRowDataChanged: this.locateInstrument.bind(this)
  }

 
  constructor(private colorCoding: ColorCodingService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.plotData && changes.plotData.currentValue && changes.plotData.currentValue.length > 0) {
      this.dataRendering = true;
      const result = this.formatDataAndGenerateDateStatistic(this.plotData);
      this.plotDataFormatFinal = result[0];

      const dateStatistic = result[1];
      this.newColumnDefs = this.generateDynamicColumns(dateStatistic);

      if(this.gridApi) {
        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.newColumnDefs);
        this.gridApi.setRowData(this.plotDataFormatFinal);
        this.dataRendering = false;
      }
    }

    if (changes.routeDirectInstrument && changes.routeDirectInstrument.currentValue && this.gridApi) {
      this.locateInstrument();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.gridApi.closeToolPanel();

    this.gridApi.setColumnDefs([]);
    this.gridApi.setColumnDefs(this.newColumnDefs);
    this.gridApi.setRowData(this.plotDataFormatFinal);
    this.dataRendering = false;
  }


  // Utility -------------------------------------------------------------------------------

  getColorValue(rgbString: string): string {
    const result = `rgba(${rgbString.slice(4, rgbString.length-1)}, 0.6)`;
    return result;
  }

  formatDataAndGenerateDateStatistic(plotData) {
    const dateStatistic: any = {};
    const plotDataFormat: any = {};

    plotData.forEach(item => {
      if(plotDataFormat[item.instrument] === undefined) {
        plotDataFormat[item.instrument] = {}
        plotDataFormat[item.instrument].name = item.instrument;
        plotDataFormat[item.instrument][item.asOfDate] = item.score;
      } else {
        plotDataFormat[item.instrument][item.asOfDate] = item.score;
      }

      if(dateStatistic[item.asOfDate] === undefined) {
        dateStatistic[item.asOfDate] = {};
        dateStatistic[item.asOfDate].min = item.score;
        dateStatistic[item.asOfDate].max = item.score;
      } else {
        if(item.score > dateStatistic[item.asOfDate].max) dateStatistic[item.asOfDate].max = item.score;
        if(item.score < dateStatistic[item.asOfDate].min) dateStatistic[item.asOfDate].min = item.score;
      }
    })

    Object.keys(dateStatistic).forEach(key => {
      dateStatistic[key].colorCoder = this.colorCoding.redYellowGreenColorCoder(
        dateStatistic[key].min,
        dateStatistic[key].max
      );
    })
    const plotDataFormatFinal = Object.keys(plotDataFormat).map(key => plotDataFormat[key]);

    return [plotDataFormatFinal, dateStatistic];
  }

  generateDynamicColumns(dateStatistic) {
    const newColumnDefs: ColDef[] = [
      {headerName: 'Instrument', field: 'name', pinned: 'left', width: 200, filter: 'agTextColumnFilter'}
    ];

    Object.keys(dateStatistic)
    .sort((keyA, keyB) => (new Date(keyB)).getTime() - (new Date(keyA)).getTime())
    .forEach(key => {
        newColumnDefs.push({
        headerName: key,
        field: key,
        cellClass: 'right-border',
        width: 130,
        valueFormatter: params => params.value && params.value.toFixed(3),
        cellStyle: params => {
          if(params.value) return {
            'background': this.getColorValue(dateStatistic[key].colorCoder(params.value)),
            'justify-content': 'flex-end'
          }
          else return '';
        },

      })
    });

    return newColumnDefs;
  }

  locateInstrument() {
    let targetNode: RowNode;
    if (this.gridApi && this.routeDirectInstrument) {
      this.gridApi.forEachNode(node => {
        if (node.data['name'] && node.data['name'].includes(this.routeDirectInstrument)) {
          targetNode = node;
          node.setSelected(true);
        }
      });
      this.gridApi.ensureNodeVisible(targetNode, 'middle');
    }
  }
}
