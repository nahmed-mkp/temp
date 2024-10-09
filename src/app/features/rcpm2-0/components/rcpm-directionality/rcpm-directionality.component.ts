import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { MatSelectChange } from '@angular/material/select';

import * as fromModels from './../../models';
import { UtilityService } from 'src/app/services';
import moment from 'moment';



@Component({
  selector: 'app-rcpm-directionality',
  templateUrl: './rcpm-directionality.component.html',
  styleUrls: ['./rcpm-directionality.component.scss']
})
export class RcpmDirectionalityComponent implements OnInit, OnChanges, OnDestroy {

  @Input() dataPath: fromModels.DataPath;
  @Input() input: fromModels.DirectionalityInputs;
  @Input() data: any;
  @Input() loading: boolean;
  @Input() selectedLookback: string;
  @Input() selectedLookbackCollection: string[];
  @Input() updateTimestamp: Date;
  @Input() isOpen: boolean;
  @Input() currentDate: string;

  @Output() loadDirectionality: EventEmitter<fromModels.DirectionalityRequest> = new EventEmitter<fromModels.DirectionalityRequest>();
  @Output() lookbackChanged: EventEmitter<{ 'index': number, 'name': string }> = new EventEmitter<{ 'index': number, 'name': string }>();
  @Output() onSelectFactor = new EventEmitter<{data: fromModels.ScatterPlotRequest, lookback: string, factor: string}>();


  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private formatData: any;
  private scatterPlotRequest: any;
  private currentTime = new Date();
  public timeDiffFormat: string;
  private timer: any;

  public params: fromModels.DirectionalityRequest = {
    grouping: null,
    key: null,
    lookbacks: ['1m', '2w'],
    fromDate: new Date(),
    isRolling: false,
    rollingDays: 1,
    asOfDate: ''
  };  public extraOption = {};

  public customGridOption: GridOptions = {
    rowSelection: 'single',
    columnDefs: [
      {headerName: 'Factor', field: 'factor', width: 180, pinned: 'left'},
      {headerName: 'β (1%/1bp)', field: 'beta1', headerTooltip: 'Beta (Lookback1)', width: 90,
        valueGetter: params => params.data['lookback1Data'] && params.data['lookback1Data']['beta']},
      {headerName: 'β (1σ)', field: 'beta1-stdev', headerTooltip: 'β as a multiple of 1σ for Lookback1', width: 90,
        valueGetter: params => params.data['lookback1Data'] && params.data['lookback1Data']['beta_stdev']},
      {headerName: 'β (bpsToCap) from β (1%/1bp)', field: 'beta1-bpsToCap', headerTooltip: 'β (1%/1bp) (Lookback1) bps to Capital', width: 50,
        valueGetter: params => (params.data['lookback1Data'] && params.data['lookback1Data']['beta'] / this.dataPath.capital) * 10000.0 , valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2)},
      {headerName: 'β (bpsToCap) from β (1σ)', field: 'beta1-stdev-bpsToCap', headerTooltip: 'β *1σ) (Lookback1) bps to Capital', width: 50,
        valueGetter: params => (params.data['lookback1Data'] && params.data['lookback1Data']['beta_stdev'] / this.dataPath.capital) * 10000.0, valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2)},
      {headerName: 'r^2', field: 'rSquared1', headerTooltip: 'rSquared (Lookback1)', width: 50, cellClass: 'right-border',
        valueGetter: params => params.data['lookback1Data'] && params.data['lookback1Data']['rSquared'], valueFormatter: this.utilityService.formatPercentNumberAdvance(2),
        sort: 'desc'},
      {headerName: 'β (1%/1bp) (2)', field: 'beta2', headerTooltip: 'Beta (Lookback2)', width: 90, cellStyle: {background: '#00cab02b'},
        valueGetter: params => params.data['lookback2Data'] && params.data['lookback2Data']['beta']},
      {headerName: 'β (1σ) (2)', field: 'beta2-stdev', headerTooltip: 'β as a multiple of factor σ for Lookback2', width: 90, cellStyle: {background: '#00cab02b'},
        valueGetter: params => params.data['lookback2Data'] && params.data['lookback2Data']['beta_stdev']},
      {headerName: 'β (bpsToCap) from β (1%/1bp) (2)', field: 'beta2-bpsToCap', headerTooltip: 'β (1%/1bp) (Lookback2) bps to Capital', width: 50, cellStyle: {background: '#00cab02b'},
        valueGetter: params => (params.data['lookback2Data'] && params.data['lookback2Data']['beta'] / this.dataPath.capital) * 10000.0, valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2)},
      {headerName: 'β (bpsToCap) from β (1σ) (2)', field: 'beta2-stdev-bpsToCap', headerTooltip: 'β (1σ) (Lookback2) bps to Capital', width: 50, cellStyle: {background: '#00cab02b'},
        valueGetter: params => (params.data['lookback2Data'] && params.data['lookback2Data']['beta_stdev'] / this.dataPath.capital) * 10000.0, valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(2)},
      {headerName: 'r^2 (2)', field: 'rSquared2', headerTooltip: 'rSquared (Lookback2)', width: 50, cellStyle: {background: '#00cab02b'},
        valueGetter: params => params.data['lookback2Data'] && params.data['lookback2Data']['rSquared'], valueFormatter: this.utilityService.formatPercentNumberAdvance(2)},
    ],
    sideBar: false,

    rowClass: 'medium-row',
    rowHeight: 22,
    groupHeaderHeight: 24,
    headerHeight: 24,

    onCellKeyDown: params => {
      const targRowIndex = params.api.getFocusedCell().rowIndex;
      const targetRowNode = params.api.getDisplayedRowAtIndex(targRowIndex);
      targetRowNode.setSelected(true);
    },

    onRowSelected: params => {
      if (params.node.isSelected()) {
        this.scatterPlotRequest = {
          grouping: this.params.grouping,
          key: this.params.key,
          fromDate: this.params.fromDate,
          isRolling: this.params.isRolling,
          rollingDays: this.params.rollingDays,
          factor: params.data['lookback1Data']['mdid'],
          asOfDate: moment(this.currentDate).format('MM-DD-YYYY')
        };
  
        if (this.selectedLookback) {
          const lookbackRequest = Object.assign({}, this.scatterPlotRequest, { lookback: this.selectedLookback });
          this.onSelectFactor.emit({ data: lookbackRequest, lookback: this.selectedLookback, factor: params.data['factor'] });
        }
      }
    },
  };

  constructor(private utilityService: UtilityService, private ref: ChangeDetectorRef) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this._setUpdatetimeCounter();
    this.params.asOfDate = moment(this.currentDate).format('MM-DD-YYYY');
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.currentDate && changes.currentDate.currentValue){
      this.params.asOfDate = moment(this.currentDate).format('MM-DD-YYYY');
    }

    if (changes.input && changes.input.currentValue) {
      const selectedLookback = this.input.lookback1.filter((lookback) => lookback.code === this.params['lookbacks'][0])[0];
      this.selectedLookback = selectedLookback.code;
      this.lookbackChanged.emit({ index: 0, 'name': selectedLookback.name });
    }

    if (changes.dataPath && changes.dataPath.currentValue) {
      this.params.grouping = this.dataPath.grouping;
      this.params.key = this.dataPath.key;
      setTimeout(() => this.loadDirectionality.emit(this.params), 100);
    }

    if (changes.data && changes.data.currentValue) {
      this.formatData = this._formatData(this.data);
      if (this.gridApi) {
        this.gridApi.setRowData(this.formatData);

        this.gridApi.forEachNode((node) => node.rowIndex ? 0 : node.setSelected(true));
      }
    }

    if (changes.selectedLookback && changes.selectedLookback.currentValue) {
      if (this.scatterPlotRequest !== undefined && this.scatterPlotRequest !== null) {
        const lookbackRequest = Object.assign({}, this.scatterPlotRequest, { lookback: this.selectedLookback });
        this.onSelectFactor.emit({ data: lookbackRequest, lookback: this.selectedLookback, factor: this.scatterPlotRequest['factor']});
      }
    }

    if (changes.updateTimestamp && changes.updateTimestamp.currentValue) {
      this.currentTime = this.updateTimestamp;
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;

    if (this.formatData) {
      this.gridApi.setRowData(this.formatData);
    }
  }

  public onLookbackchange(event: MatSelectChange, index: number) {
    this.params.lookbacks[index] = event.value;
    console.log('params', this.params);
    this.loadDirectionality.emit(this.params);
    if (index === 0) {
      const selectedLookback = this.input.lookback1.filter((lookback) => lookback.code === event.value)[0];
      this.lookbackChanged.emit({ 'index': index, 'name': selectedLookback.name });
    } else {
      const selectedLookback = this.input.lookback2.filter((lookback) => lookback.code === event.value)[0];
      this.lookbackChanged.emit({ 'index': index, 'name': selectedLookback.name });
    }
  }

  public onFromDateChange() {
    this.loadDirectionality.emit(this.params);
  }

  private _formatData(data: any) {
    console.log('directionality data', data);

    if (data === undefined) {
      return;
    }

    const lookback1_DataDict: any = {};
    const lookback2_DataDict: any = {};
    const lookbackKeys = this.selectedLookbackCollection;

    if (data[lookbackKeys[0]] && data[lookbackKeys[0]].length && data[lookbackKeys[0]].length > 0) {
      data[lookbackKeys[0]].forEach(element => {
        if (lookback1_DataDict[element.factor] === undefined) {
          lookback1_DataDict[element.factor] = element;
        }
      });
    } 

    if (data[lookbackKeys[1]] && data[lookbackKeys[1]].length && data[lookbackKeys[1]].length > 0) {
      data[lookbackKeys[1]].forEach(element => {
        if (lookback2_DataDict[element.factor] === undefined) {
          lookback2_DataDict[element.factor] = element;
        }
      });
    }

    const formatResult = Object.keys(lookback1_DataDict).map(key => {
      return {
        factor: key,
        lookback1Data: lookback1_DataDict[key],
        lookback2Data: lookback2_DataDict[key],
      };
    });

    console.log('formatResult', formatResult);
    return formatResult;

  }

  public onSearch(searchCriteria: string): void {
    this.gridApi.setQuickFilter(searchCriteria);
  }

  public onRefresh() {
    this.loadDirectionality.emit(this.params);
  }









  private _setUpdatetimeCounter() {

    this._compareTime();
    this.timer = setInterval(() => this._compareTime(), 10000);

    this.ref.markForCheck();
  }

  private _compareTime() {
    if (this.updateTimestamp) {
      this.currentTime = new Date();
      const timeDiff = (this.currentTime.getTime() - this.updateTimestamp.getTime()) / 1000;
      if (timeDiff > 60) {
        if (timeDiff > 120) {
          this.timeDiffFormat = (timeDiff / 60).toFixed(0) + ' mins ago';
        } else {
          this.timeDiffFormat = (timeDiff / 60).toFixed(0) + ' min ago';
        }
      } else if (timeDiff > 3600) {
        if (timeDiff > 3600 * 2) {
          this.timeDiffFormat = (timeDiff / 60).toFixed(0) + ' hrs ago';
        } else {
          this.timeDiffFormat = (timeDiff / 60).toFixed(0) + ' hr ago';
        }
      } else {
        this.timeDiffFormat = timeDiff.toFixed(0) + 's ago';
      }
      this.ref.markForCheck();
    } 
  }

}
