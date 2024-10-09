import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
  selector: 'app-rates-forward-swap-rates-viewer',
  templateUrl: './rates-forward-swap-rates-viewer.component.html',
  styleUrls: ['./rates-forward-swap-rates-viewer.component.scss']
})
export class RatesForwardSwapRatesViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: any[];

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public timeStamp;

  constructor(private utilityService: UtilityService, private ref: ChangeDetectorRef) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.customGridOption = this._createGridOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi) {
      this._changeHeaderName(this.data[0]['benchmark']);
      this.timeStamp = this.data[0]['timestamp'];
      this.ref.markForCheck();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.data && this.data.length > 0) {
      this._changeHeaderName(this.data[0]['benchmark']);
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
        {
          headerName: 'Tenor', field: 'Tenor', cellClass: 'right-border-light', headerClass: 'header-bold',
          cellStyle: params => {
            const step_values = [];
            params.api.forEachNode((node) => step_values.push(node.data['Step']));
            const isTrend = this._is_trend(params.node.rowIndex, step_values);
            if (isTrend) {
              return { 'font-weight': 'bold' };
            }
          }
        },
        {
          headerName: 'Live', field: 'Live', cellClass: 'right-border-light',
          cellStyle: params => {
            const step_values = [];
            params.api.forEachNode((node) => step_values.push(node.data['Step']));
            const isTrend = this._is_trend(params.node.rowIndex, step_values);
            if (isTrend) {
              return { 'font-weight': 'bold' };
            }
          }
        },
        {headerName: 'DoD chg', field: 'DoD chg', cellClass: 'right-border-light',
          cellStyle: (params) => {
            const result = {};
            const other_values = [];
            const step_values = [];
            params.api.forEachNode((node) => {
              other_values.push(node.data['DoD chg']);
              step_values.push(node.data['Step']);
            });
            const isTrend = this._is_trend(params.node.rowIndex, step_values);
            if (isTrend) {
              result['font-weight'] = 'bold';
            }
            const value = this._normalize_value(params.value, other_values);
            if (params.value < 0) {
              let color = d3Chromatic.interpolateGreens(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              result['background-color'] = color;
            } else if (params.value > 0) {
              let color = d3Chromatic.interpolateReds(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              result['background-color'] = color;
            }
            return result;
          }
        },
        {
          headerName: '3M Low', field: '3M Low', cellClass: 'right-border-light',
          cellStyle: params => {
            const step_values = [];
            params.api.forEachNode((node) => step_values.push(node.data['Step']));
            const isTrend = this._is_trend(params.node.rowIndex, step_values);
            if (isTrend) {
              return { 'font-weight': 'bold' };
            }
          }
        },
        {
          headerName: '3M High', field: '3M High', cellClass: 'right-border-light',
          cellStyle: params => {
            const step_values = [];
            params.api.forEachNode((node) => step_values.push(node.data['Step']));
            const isTrend = this._is_trend(params.node.rowIndex, step_values);
            if (isTrend) {
              return { 'font-weight': 'bold' };
            }
          }
        },
        {
          headerName: 'pctl', field: 'pctl', cellClass: 'right-border-light',
          cellStyle: params => {
            const result = {};
            const step_values = [];
            params.api.forEachNode((node) => step_values.push(node.data['Step']));
            const isTrend = this._is_trend(params.node.rowIndex, step_values);
            if (isTrend) {
              result['font-weight'] = 'bold';
            }
            result['justify-content'] = 'flex-end';
            return result;
          }
        },
        {
          headerName: 'Step', field: 'Step', cellClass: 'right-border-light',
          cellStyle: params => {
            const step_values = [];
            params.api.forEachNode((node) => step_values.push(node.data['Step']));
            const isTrend = this._is_trend(params.node.rowIndex, step_values);
            if (isTrend) {
              return { 'font-weight': 'bold' };
            }
          },
          valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(2)},
        {
          headerName: 'Step Chg', field: 'Step Chg', cellClass: 'right-border-light',
          cellStyle: (params) => {
            const result = {};
            const other_values = [];
            const step_values = [];
            params.api.forEachNode((node) => {
              other_values.push(node.data['Step Chg']);
              step_values.push(node.data['Step']);
            });
            const isTrend = this._is_trend(params.node.rowIndex, step_values);
            if (isTrend) {
              result['font-weight'] = 'bold';
            }
            const value = this._normalize_value(params.value, other_values);
            if (params.value < 0) {
              let color = d3Chromatic.interpolateGreens(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              result['background-color'] = color;
            } else if (params.value > 0) {
              let color = d3Chromatic.interpolateReds(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              result['background-color'] = color;
            }
            return result;
          }
        },
      ],

      // autoGroupColumnDef: {
      //   field: 'Tenor',
      //   cellRendererParams: {
      //     suppressCount: true
      //   },
      //   pinned: 'left',
      //   filter: 'agSetColumnFilter',
      //   cellClass: 'right-border',
      //   cellStyle: {'font-weight': 'bolder', 'color': '#424242de'},
      //   width: 140,
      //   suppressSizeToFit: true
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
    const targetColDef =  this.gridApi.getColumnDef('Tenor');
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

  private _is_trend(curIndex: number, otherValues: number[]): boolean {
    const signCurrent = Math.sign(otherValues[curIndex]);
    if (curIndex === 1) {
      const nextValue = otherValues[curIndex + 1];
      const signNext = Math.sign(nextValue);
      if (signCurrent === signNext) {
        return true;
      }
    } else if (curIndex > 0 && curIndex < otherValues.length) {
      const prevValue = otherValues[curIndex - 1];
      const nextValue = otherValues[curIndex + 1];
      if (prevValue && nextValue) {
        const signPrev = Math.sign(prevValue);
        const signNext = Math.sign(nextValue);
        if (signPrev !== signCurrent && signNext === signCurrent) {
          return true;
        }
      }
    }
    return false;
  }

}
