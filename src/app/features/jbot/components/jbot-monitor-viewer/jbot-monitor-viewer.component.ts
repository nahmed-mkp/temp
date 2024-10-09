import { Component, OnInit, Input, OnChanges, SimpleChanges,} from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef, RowNode } from 'ag-grid-community';

import * as fromModels from '../../models';
import { ColorCodingService } from '../../services';

@Component({
  selector: 'app-jbot-monitor-viewer',
  templateUrl: './jbot-monitor-viewer.component.html',
  styleUrls: ['./jbot-monitor-viewer.component.scss']
})
export class JbotMonitorViewerComponent implements OnInit, OnChanges {

  @Input() plotData: fromModels.JbotMonitorScore[];
  @Input() loadingStatus: boolean;
  @Input() deltaMode: boolean;
  @Input() routeDirectInstrument: string;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi; 

  private newColumnDefs: ColDef[] = [];
  private plotDataFormatFinal;
  private dateStatistic: any;

  public extraOption = {};
  public dataRendering: boolean = false;

  public customGridOption: GridOptions = {
    defaultColDef: {
      cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
      },
      filter: 'agNumberColumnFilter',
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
    this.generateDynamicColumns = this.generateDynamicColumns.bind(this);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.plotData && changes.plotData.currentValue && changes.plotData.currentValue.length > 0) {
      this.dataRendering = true;
      const result = this.formatDataAndGenerateDateStatistic(this.plotData);
      this.plotDataFormatFinal = result[0];

      this.dateStatistic = result[1];
      this.newColumnDefs = this.generateDynamicColumns(this.dateStatistic);

      if (this.gridApi) {
        this.renderData();
      }
    }

    if (changes.deltaMode && changes.deltaMode.isFirstChange() === false) {
      this.dataRendering = true;
      this.newColumnDefs = this.generateDynamicColumns(this.dateStatistic);
      this.renderData();
    }

    if (changes.routeDirectInstrument && changes.routeDirectInstrument.currentValue && this.gridApi) {
      this.locateInstrument();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.gridApi.closeToolPanel();

    this.renderData();
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
          headerName: this.deltaMode ? key + " (Diff)" : key,
          field: key,
          cellClass: 'right-border',
          width: 130,
          valueGetter: params => {
            let cellValue = params.data[params.colDef.field];
            if(this.deltaMode) {
              const targetCurrentDateField = params.columnApi.getAllColumns()[1].getColId();
              const currentColField = params.column.getColId();
              let result
              if(targetCurrentDateField !== currentColField) result = params.data[targetCurrentDateField] - cellValue;
              else result = cellValue;
              return result && parseFloat(result.toFixed(3));
            } else {
              return cellValue && parseFloat(cellValue.toFixed(3));
            }
          },
          cellStyle: params => {
            if(params.value !== undefined) return {
              'background': this.deltaMode === false ? this.getColorValue(dateStatistic[key].colorCoder(params.value)) : '',
              'justify-content': 'flex-end'
            }
            else return '';
          },
  
        })
      });
  
      return newColumnDefs;
    }

    renderData() {
      this.gridApi.setColumnDefs([]);
      this.gridApi.setColumnDefs(this.newColumnDefs);
      this.gridApi.setRowData(this.plotDataFormatFinal);
      this.dataRendering = false;
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
