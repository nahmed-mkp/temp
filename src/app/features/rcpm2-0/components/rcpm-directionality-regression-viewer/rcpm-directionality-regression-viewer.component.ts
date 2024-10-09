import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatLegacyChipInputEvent as MatChipInputEvent } from '@angular/material/legacy-chips';
import * as _ from 'lodash';

import * as fromModels from './../../models';

@Component({
  selector: 'app-rcpm-directionality-regression-viewer',
  templateUrl: './rcpm-directionality-regression-viewer.component.html',
  styleUrls: ['./rcpm-directionality-regression-viewer.component.scss']
})
export class RcpmDirectionalityRegressionViewerComponent implements OnInit, OnChanges {

  @Input() regressionFactors: any;
  @Input() regressionLoading: boolean;
  @Input() displayMode;
  @Output() runRegression = new EventEmitter<fromModels.regressionRequest>();
  @Output() setGridClearingStatus = new EventEmitter<boolean>();
  @Output() setDisplayMode = new EventEmitter<string>();

  private gridApi: GridApi;
  private formatData: any[];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private suggestFactors = {
    "EURUSD - Euro Spot": true,
    "USDJPY - Japanese Yen Spot": true,
    "INDEX - Euro Stoxx 50": true,
    "NIKKEI 225": true,
    "SPY - SPDR Trust Series 1": true,

    "MKP 2s5s10s Fly": true,
    "MKP 2s5s Spread": true,
    "MKP BTP Bund Spread": true,
    "MKP EUR 2s3s5s Fly": true,
    "MKP EUR 5s10s Spread": true,
    "MKP SPGB Bund Spread": true,
    "OTR/USD/10YR": true
  }
  private isExternalFilterPresent = false;
  public autoGroupColumnFilterValue: string;

  public regressionRequestParams: fromModels.regressionRequest = {
    rollingDays: 1,
    lookbacks: ['1m'],
    isRolling: true,
    fromDate: new Date(),
    factors: [],
  }

  public extraOption = {
    'sizeColumnsToFit': true
  };

  public customGridOption: GridOptions = {

    autoGroupColumnDef: {
      headerName: 'Factors',
      field: 'name',
      sort: 'asc',
      cellStyle: params => {
        if (params.node.group) {
          const allLeafChildren = params.node.allLeafChildren;
          const selected = allLeafChildren.some(node => node.isSelected() === true);
          if (selected) {
            return {"font-weight": "bolder"}
          }
        }
      },
      // checkboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { 
        checkbox: params => params.node.group === false,
        suppressCount: true,
      },
    },

    columnDefs: [
      {headerName: 'Factors', field: 'name', hide: true},
      {headerName: 'factorGroup', field: 'factorGroup', rowGroup: true, hide: true}
    ],

    onRowSelected: params => {
      const targetParentNode = params.node.parent;
      params.api.redrawRows({rowNodes: [targetParentNode]})
    },

    rowSelection: 'multiple',
    suppressRowClickSelection: true,

    isExternalFilterPresent: () => this.isExternalFilterPresent,
    doesExternalFilterPass: node => {
      const targetFilterValue = this.autoGroupColumnFilterValue.toLowerCase();
      const targetColumnsNeededToBeFilter = ['factorGroup', 'name'];
      targetColumnsNeededToBeFilter.push('securityName');
      if (targetFilterValue === undefined || targetFilterValue === null || targetFilterValue === '') {
        return true;
      }
      const result =  targetColumnsNeededToBeFilter.some((field: string) => {
        const targetValue = node.data[field];
        if (typeof targetValue === 'string') {
          return targetValue.toLowerCase().includes(targetFilterValue);
        } else {
          return false;
        }
      });
      return result;
    },
  }

  public dayChanges = [
    {displayName: 'Daily', value: 1},
    {displayName: 'Rolling 5-Day', value: 5},
    {displayName: 'Rolling 10-Day', value: 10},
    {displayName: 'Rolling 20-Day', value: 20},
  ];

  public selectedLookbacks = {
    '2w': false,
    '1mo': true,
    '3mo': false,
    '6mo': false,
  }

  public lookbackKeys = [
    '2w', '1mo', '3mo', '6mo'
  ];


  constructor() { 
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    if (this.displayMode === undefined) {
      this.displayMode = 'percent';
      this.setDisplayMode.emit(this.displayMode);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.regressionFactors && changes.regressionFactors.currentValue) {
      this.formatData = this._formatFactorsData(this.regressionFactors);
      if (this.gridApi) {
        this.gridApi.setRowData(this.formatData);
      }
    }
  }

  public customGridCallBack(params) {
    this.gridApi = params.api;
    if (this.formatData) {
      this.gridApi.setRowData(this.formatData);
    }
  }

  public onLookbackChange() {

    this.regressionRequestParams.lookbacks = Object.keys(this.selectedLookbacks).filter(key => {
      return this.selectedLookbacks[key] === true;
    })
  }

  public onRollingChange() {
    if (this.regressionRequestParams.rollingDays === 1) {
      this.regressionRequestParams.isRolling = true;
    } else {
      this.regressionRequestParams.isRolling = false;
    }
  }

  public onRunRegression() {
    const selectedFactors: number[] = this.gridApi.getSelectedRows().map(data => data['mdid']);
    this.regressionRequestParams.factors = selectedFactors;
    this.runRegression.emit(this.regressionRequestParams);
  }

  public onDeselectAll() {
    if (this.gridApi) {
      this.gridApi.deselectAll()
    }
  }

  public onSelectSuggestedFactors() {
    if (this.gridApi) {
      this.gridApi.forEachLeafNode(node => {
        const name = node.data['name'];
        if (this.suggestFactors[name]) {
          node.setSelected(true);
        }
      });
    }
  }

  public onAutoGroupColumnFilterValueChange() {
    if (this.gridApi) {
      this.isExternalFilterPresent = true;
      this.gridApi.onFilterChanged();
    }
  }

  public onSetGridClearingStatus() {
    this.setGridClearingStatus.emit(true);
    setTimeout(() => this.setGridClearingStatus.emit(false), 3000);
  }

  public onSetDisplayMode() {
    this.setDisplayMode.emit(this.displayMode);
  }

  // -----------------------------------------------------------

  private _formatFactorsData(rawData) {

    let result = Object.keys(rawData).map(key => rawData[key]);
    result = _.flatten(result);
    return result;
  }



}
