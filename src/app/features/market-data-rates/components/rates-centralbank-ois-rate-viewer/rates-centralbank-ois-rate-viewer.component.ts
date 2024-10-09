import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';


import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-rates-centralbank-ois-rate-viewer',
  templateUrl: './rates-centralbank-ois-rate-viewer.component.html',
  styleUrls: ['./rates-centralbank-ois-rate-viewer.component.scss']
})
export class RatesCentralbankOisRateViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: any[];
  @Input() layoutMode: 'spread' | 'compact' = 'spread';

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  public header: string;

  public timeStamp: string;

  constructor(private utilityService: UtilityService, private ref: ChangeDetectorRef) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.customGridOption = this._createGridOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi) {
      this._changeHeaderName(this.data[0]['header']);
      this.header = this.data[0]['header'];
      this.timeStamp = this.data[0]['timestamp'];
      this.ref.markForCheck();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.data && this.data.length > 0) {
      this._changeHeaderName(this.data[0]['header']);
      this.header = this.data[0]['header'];
      this.timeStamp = this.data[0]['timestamp'];
      this.ref.markForCheck();
    }
  }

  // Utility -----

  private _createGridOption(): GridOptions {
    return {
      defaultColDef: {
        suppressMenu: true,
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
      },
      columnDefs: [
        // {headerName: 'header', field: 'header', rowGroup: true, hide: true},
        {headerName: 'Index', field: 'index', cellClass: 'right-border-light', headerClass: 'header-bold', suppressSizeToFit: true, width: 48, sort: 'asc',
          comparator: (valueA, valueB, nodeA, nodeB) => {
            if (valueA === 'Fixing') {
              return -1;
            } else if (valueB === 'Fixing') {
              return 1;
            }
            const valueA_dateValue = (new Date(valueA)).getTime();
            const valueB_dateValue = (new Date(valueB)).getTime();
            return valueA_dateValue - valueB_dateValue;
        }},
        {
          headerName: 'Live', field: 'Live', cellClass: 'right-border-light'
        },
        {headerName: 'Chg', field: 'Chg', cellClass: 'right-border-light',
          cellStyle: (params) => {
            const other_values = [];
            params.api.forEachNode((node) => other_values.push(node.data['Chg']));
            const value = this._normalize_value(params.value, other_values);
            if (params.value < 0) {
              let color = d3Chromatic.interpolateGreens(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              return { 'background-color': color };
            } else if (params.value > 0) {
              let color = d3Chromatic.interpolateReds(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              return { 'background-color': color };
            }
          }
        },
        {
          headerName: 'Step', field: 'Step', cellClass: 'right-border-light',
          valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(2)},
        {
          headerName: 'Step Chg', field: 'Step Chg', cellClass: 'right-border-light',
          cellStyle: (params) => {
            const other_values = [];
            params.api.forEachNode((node) => other_values.push(node.data['Step Chg']));
            const value = this._normalize_value(params.value, other_values);
            if (params.value < 0) {
              let color = d3Chromatic.interpolateGreens(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              return { 'background-color': color };
            } else if (params.value > 0) {
              let color = d3Chromatic.interpolateReds(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              return { 'background-color': color };
            }
          },
        },
        {
          headerName: 'Compounding',
          children: [
              { field: 'CompoundingAdj' , headerName: 'Adj'},
              { field: 'Step(Compounding)', headerName: 'Step' },
              { field: 'cumulativeStep(Compounding)', headerName: 'Cumulative Step' },
          ]
      }
      ],

      // autoGroupColumnDef: {
      //   field: 'index',
      //   cellRendererParams: {
      //     suppressCount: true
      //   },
      //   pinned: 'left',
      //   filter: 'agSetColumnFilter',
      //   cellClass: 'right-border',
      //   cellStyle: {'font-weight': 'bolder', 'color': '#424242de'}
      // },

      // Outlook
      // all even rows assigned 'my-shaded-effect'
      getRowClass: params => {
        if (params.node.rowIndex % 2 === 0) {
          return ['even-row-shaded-effect', 'ultra-small-row'];
        } else {
          return ['ultra-small-row'];
        }
      },
      rowHeight: 18,
      sideBar: false,
      showToolPanel: false,
    };
  }

  private _changeHeaderName(name: string) {
    const targetColDef =  this.gridApi.getColumnDef('index');
    targetColDef.headerName = name;
    this.gridApi.refreshHeader();
  }

  private _normalize_value(curValue: number, otherValues: number[]): any {
    const positiveValues = otherValues.filter(val => val >= 0);
    const negativeValues = otherValues.filter(val => val < 0);
    if (curValue > 0) { 
      const min = Math.min(...positiveValues);
      const max = Math.max(...positiveValues);
      if (max !== min) {
        const result = Math.abs((curValue - min) / (max - min));
        return result;
      }
    } else {
      const max = Math.min(...negativeValues);
      const min = Math.max(...negativeValues);
      if (max !== min) {
        const result = Math.abs((curValue - min) / (max - min));
        return result;
      }
    }
    return 0;
  }

}
