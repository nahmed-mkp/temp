import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import moment from 'moment';

@Component({
  selector: 'app-rates-ois-year-end-pricing-viewer',
  templateUrl: './rates-ois-year-end-pricing-viewer.component.html',
  styleUrls: ['./rates-ois-year-end-pricing-viewer.component.scss']
})
export class RatesOisYearEndPricingViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: any[];
  @Input() selectedDate: string;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

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
      this.timeStamp = this.data[0]['timestamp'];
      this.ref.markForCheck();
    }
  }


  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.data && this.data.length > 0) {
      this._changeHeaderName(this.data[0]['header']);
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
        {headerName: 'Year', field: 'Year', cellClass: 'right-border-light', headerClass: 'header-bold', cellStyle: null, sortingOrder: ["asc"]},
        {
          headerName: 'Live', field: 'Live', cellClass: 'right-border-light'
        },
        {
          headerName: 'DoD chg', field: 'DoD chg', cellClass: 'right-border-light',
          cellStyle: (params) => {
            const other_values = [];
            params.api.forEachNode((node) => other_values.push(node.data['DoD chg']));
            const value = this._normalize_value(params.data['DoD chg'], other_values);
            if (params.data['DoD chg'] < 0) {
              let color = d3Chromatic.interpolateGreens(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              return { 'background-color': color };
            } else if (params.data['DoD chg'] > 0) {
              let color = d3Chromatic.interpolateReds(value);
              color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
              return { 'background-color': color };
            }
          }
        },
        {headerName: '3M Low', field: '3M Low', cellClass: 'right-border-light'},
        {headerName: '3M High', field: '3M High', cellClass: 'right-border-light'},
        {headerName: 'pctl', field: 'pctl', cellClass: 'right-border-light', cellStyle: params => { return {'justify-content': 'flex-end'}}},
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
          }
        },
        {headerName: '# of Hikes', field: 'numHikes', cellClass: 'right-border-light', hide: this.hideHikeColumn()},
        {headerName: 'Cumulative Step', field: 'cumulativeStep', cellClass: 'right-border-light', hide: this.hideStepsColumn(), width: 230, valueFormatter: (params) => params.value ? params.value.toFixed(1): ''}
      ],

      // autoGroupColumnDef: {
      //   field: 'Year',
      //   cellRendererParams: {
      //     suppressCount: true
      //   },
      //   pinned: 'left',
      //   filter: 'agSetColumnFilter',
      //   cellClass: 'right-border',
      //   cellStyle: {'font-weight': 'bolder', 'color': '#424242de'},
      //   width: 120,
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
    }
  }

  private _changeHeaderName(name: string) {
    const targetColDef =  this.gridApi.getColumnDef('Year');
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

  private hideHikeColumn(): boolean {
    let selectedDate = moment(this.selectedDate);
    let dateCutoff = moment('03-13-20239', 'MM-DD-YYYY');
    if(selectedDate > dateCutoff){
      return true;
    } else {
      return false;
    }
  }
  
  private hideStepsColumn(): boolean {
    let selectedDate = moment(this.selectedDate);
    let dateCutoff = moment('03-13-20239', 'MM-DD-YYYY');
    if(selectedDate < dateCutoff){
      return true;
    } else {
      return false;
    }
  }

}
