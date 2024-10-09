import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { GridOptions, CellEditingStoppedEvent, ColDef, GridApi } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import uuidv1 from 'uuid/v1';
import { Subscription } from 'rxjs';

import * as moment from 'moment';

import * as fromMarketDataSearchModels from './../../../../shared/custom/market-data-search/models';
import * as fromModels from './../../models/event-analysis.models';
import { EventAnalysisFourmulaTimeseriesVariablesDialogComponent } from '../event-analysis-fourmula-timeseries-variables-dialog/event-analysis-fourmula-timeseries-variables-dialog.component';
import { EventAnalysisCustomFunctionsDialogComponent } from '../event-analysis-custom-functions-dialog/event-analysis-custom-functions-dialog.component';
import { MarketDataSearchCellEditorComponent } from 'src/app/shared/custom/market-data-search/containers';
import { EventAnalysisCellVisibilityIconComponent } from './event-analysis-formula-timeseries-visibility-cell-icon.component';
import { EventAnalysisCellDeleteIconComponent } from './event-analysis-formula-timeseries-delete-cell-icon.component';


@Component({
  selector: 'app-event-analysis-formula-timeseries-setting',
  templateUrl: './event-analysis-formula-timeseries-setting.component.html',
  styleUrls: ['./event-analysis-formula-timeseries-setting.component.scss']
})
export class EventAnalysisFormulaTimeseriesSettingComponent implements OnInit, OnChanges, OnDestroy {

  @Input() configuration: fromModels.Configuration;
  @Input() marketDataProviders: fromModels.MarketDataProvider[];
  @Input() displayMode: string;
  @Input() visibilityInEventPlot: {[series: string]: boolean};

  @Output() addConfiguration: EventEmitter<fromModels.Configuration> =
    new EventEmitter<fromModels.Configuration>();
  @Output() updateConfiguration: EventEmitter<fromModels.Configuration> =
    new EventEmitter<fromModels.Configuration>();
  @Output() changeDisplayMode: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleVisibilityInEventPlot: EventEmitter<{[series: string]: boolean}> =
    new EventEmitter<{[series: string]: boolean}>();

  private gridApi: GridApi;
  private subscription: Subscription;
  private newCongurationMode = false;
  private uniqueSymbols = [...fromModels.uniqueHighchartSymbols].reverse();

  public customGridOption: GridOptions = {
    columnDefs: [
      { headerName: 'Label',
        field: 'label',
        filter: 'agTextColumnFilter',
        // checkboxSelection: true
      },
      { headerName: 'Sym',
        field: 'symbol',
        cellStyle: {'font-weight': 'bolder', 'font-size': '1rem'},
        width: 37,
        cellRenderer: params => {
          return `<img src="/assets/marker/${params.value}.svg" style="width:100%;height: 100%; opacity: 0.4">`;
        },
        suppressFilter: true,
        suppressAutoSize: true,
        suppressSizeToFit: true
      },
      { headerName: 'Expression',
        field: 'displayName',
        filter: 'agTextColumnFilter',
        editable: true,
        cellEditor: 'marketDataSearchEditor',
        width: 300,
      },
      { headerName: 'Alias',
        field: 'alias',
        filter: 'agTextColumnFilter',
        editable: true,
        cellStyle: {'background-color': '#ffff0042'},
        width: 300,
      },
      {
        headerName: 'Transformation',
        field: 'transformation',
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        filter: 'agTextColumnFilter',
        cellStyle: {'background-color': '#ffff0042'},
        cellEditorParams: {
          cellHeight: 30,
          values: ['Original', 'Difference', 'Absolute Diff', 'Pct Change']
        },
      },
      {
        headerName: 'Scalar',
        field: 'scalar',
        editable: true,
        cellStyle: {'background-color': '#ffff0042'},
      },
      { headerName: 'Exclude',
        field: 'exclude',
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellStyle: {'background-color': '#ffff0042'},
        cellEditorParams: {
          cellHeight: 30,
          values: [true, false]}
      },
      { headerName: 'Custom Axis',
        field: 'customAxis',
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellStyle: {'background-color': '#ffff0042'},
        cellEditorParams: {
          cellHeight: 30,
          values: [true, false]}
      },
      { headerName: 'Source',
        field: 'source',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'V',
        suppressAutoSize: true,
        suppressFilter: true,
        width: 35,
        cellRenderer: 'iconRender',
        suppressSizeToFit: true
      },
      {
        headerName: 'D',
        suppressAutoSize: true,
        suppressFilter: true,
        width: 35,
        cellRenderer: 'deleteIconRender',
        suppressSizeToFit: true
      },
    ],

    floatingFilter: true,
    onCellEditingStopped: this.onUpdateTimeseriesAndFormulas.bind(this),

    getContextMenuItems: (params) => {
      const deleteAction = {
        name: 'Delete',
        action: () => {
          this.onDeleteTimeseriesFormula(params.node.data);
        }
      };

      return ['copy', 'copyWithHeaders', 'separator', deleteAction];
    },

    frameworkComponents: {
      'marketDataSearchEditor': MarketDataSearchCellEditorComponent,
      'iconRender': EventAnalysisCellVisibilityIconComponent,
      'deleteIconRender': EventAnalysisCellDeleteIconComponent,
    },

    rowSelection: 'single',
    suppressRowClickSelection: true,
    context: this,
  };

  public extraOption = {
    sizeColumnsToFit: true
  };

  constructor(private dialog: MatDialog) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.marketDataProviders && changes.marketDataProviders.currentValue.length > 0) {
    //   const providers = this.marketDataProviders.map(provider => provider.name);
    //   const newColdefs = this.customGridOption.columnDefs.filter((col: ColDef) => col.headerName !== 'Source');
    //   newColdefs.push({
    //     headerName: 'Source',
    //     field: 'source',
    //     editable: true,
    //     cellEditor: 'agRichSelectCellEditor',
    //     cellStyle: {'background-color': '#ffff0042'},
    //     cellEditorParams: {
    //       cellHeight: 30,
    //       values: providers
    //     },
    //   });
    //   this.customGridOption = Object.assign({}, this.customGridOption, {columnDefs: newColdefs});
    // }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // new workflow ----------------------------------------------------------------------------------------------

  onAdd() {
    if (!this.configuration) {
      this.configuration = this.createNewConfiguration();
      this.newCongurationMode = true;
    } else {
      const newRow = this.createNewRow();
      this.configuration.timeseriesAndFormulas = [...this.configuration.timeseriesAndFormulas, newRow];
    }
  }

  onMultiDelete() {
    this.gridApi.getSelectedRows().forEach(rowData => this.onDeleteTimeseriesFormula(rowData));
  }

  createNewConfiguration(): fromModels.Configuration {
    return {
      guid: uuidv1(),
      startDate: moment(new Date()).subtract(1, 'years').format('MM-DD-YYYY'),
      endDate: moment(new Date()).format('MM-DD-YYYY'),
      timeseriesAndFormulas: [this.createNewRow()],
      preprocessing: 'drop'
    };
  }

  createNewRow() {
    const lastTimeseriesElement = this.configuration
      && this.configuration.timeseriesAndFormulas[this.configuration.timeseriesAndFormulas.length - 1];

    if (this.configuration) {
      this.configuration.timeseriesAndFormulas.forEach(timeseries => {
        this.uniqueSymbols = this.uniqueSymbols.filter(symbol => symbol !== timeseries.symbol);
      });
    }

    const newRow = {
      label: lastTimeseriesElement ? this.getNextLabel(lastTimeseriesElement.label) : 'A',
      source: undefined,
      expression: undefined,
      displayName: undefined,
      scalar: '1',
      alias: undefined,
      exclude: false,
      transformation: 'Original',
      customAxis: false,
      symbol: this.uniqueSymbols.pop(),
    };
    return newRow;
  }

  // Old workflow ------------------------------------------------------------------------------------------------

  // marketDataEntered(payload: fromMarketDataSearchModels.MarketDataInput): void {
  //   const newExpression: fromModels.TimeseriesExpression = this.buildExpressionFromUserInput(payload);
  //   this.createOrUpdateConfiguration(newExpression);
  // }

  // marketDataSelected(payload: fromMarketDataSearchModels.MarketDataSearchResult): void {
  //   const newExpression: fromModels.TimeseriesExpression = this.buildExpressionFromSearchResult(payload);
  //   this.createOrUpdateConfiguration(newExpression);
  // }

  private createOrUpdateConfiguration(expression: fromModels.TimeseriesExpression): void {
    let bIsNew = false;
    let configuration = this.configuration;
    if (!configuration) {
      configuration = {
        guid: uuidv1(),
        startDate: moment(new Date()).subtract(1, 'years').format('MM-DD-YYYY'),
        endDate: moment(new Date()).format('MM-DD-YYYY'),
        timeseriesAndFormulas: [expression],
        preprocessing: 'drop'
      };
      bIsNew = true;
    } else {
      configuration.timeseriesAndFormulas = [...this.configuration.timeseriesAndFormulas, expression];
    }

    if (bIsNew) {
      this.addConfiguration.emit(configuration);
    } else {
      this.updateConfiguration.emit(configuration);
    }
  }

  // private getNextLabel(num: number): string {
  //   let ret = '';
  //   let a = 1;
  //   let b = 26;
  //   num += 1; // This is to generate the first offset.
  //   for (ret = '', a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
  //     ret = String.fromCharCode(Math.floor((num % b) / a) + 65) + ret;
  //   }
  //   return ret;
  // }
  private getNextLabel(label: string): string {
    return String.fromCharCode(label.charCodeAt(0) + 1);
  }

  // private buildExpressionFromUserInput(payload: fromMarketDataSearchModels.MarketDataInput): fromModels.TimeseriesExpression {
  //   // const numLabels = this.configuration && this.configuration.timeseriesAndFormulas.map((tsf) => tsf.label).length || 0;
  //   const lastTimeseriesElement = this.configuration
  //     && this.configuration.timeseriesAndFormulas[this.configuration.timeseriesAndFormulas.length - 1];
  //   return {
  //     label: lastTimeseriesElement ? this.getNextLabel(lastTimeseriesElement.label) : 'A',
  //     source: payload.provider,
  //     expression: payload.expression,
  //     displayName: payload.expression,
  //     alias: payload.expression,
  //     exclude: false,
  //     transformation: 'Original',
  //     customAxis: false
  //   };
  // }

  // private buildExpressionFromSearchResult(payload: fromMarketDataSearchModels.MarketDataSearchResult): fromModels.TimeseriesExpression {
  //   // const numLabels = this.configuration && this.configuration.timeseriesAndFormulas.map((tsf) => tsf.label).length || 0;
  //   const lastTimeseriesElement = this.configuration
  //    && this.configuration.timeseriesAndFormulas[ this.configuration.timeseriesAndFormulas.length-1];
  //   return {
  //     label: lastTimeseriesElement ? this.getNextLabel(lastTimeseriesElement.label) : 'A',
  //     source: payload.provider,
  //     expression: payload.expression,
  //     displayName: payload.displayName,
  //     alias: payload.displayName,
  //     exclude: false,
  //     transformation: 'Original',
  //     customAxis: false
  //   };
  // }

  private onUpdateTimeseriesAndFormulas(event: CellEditingStoppedEvent) {
    const allTimesereiesAndFormula = [];
    event.api.forEachNode(node => {
      if (node.data['displayName'] !== undefined) {
        if (typeof node.data['displayName'] === 'object') {
          node.data['alias'] = node.data['displayName']['alias'];
          node.data['source'] = node.data['displayName']['source'];
          node.data['expression'] = node.data['displayName']['expression'];
          node.data['displayName'] = node.data['displayName']['displayName'];
        }
        allTimesereiesAndFormula.push(node.data);
      }
    });
    console.log('allTimesereiesAndFormula', allTimesereiesAndFormula);
    this.configuration = Object.assign({}, this.configuration, {timeseriesAndFormulas: allTimesereiesAndFormula});
    if (this.newCongurationMode) {
      this.addConfiguration.emit(this.configuration);
      this.newCongurationMode = false;
    } else {
      this.updateConfiguration.emit(this.configuration);
    }
  }

  private onDeleteTimeseriesFormula(targetTimeseries) {
    const remainTimeseries
      = this.configuration.timeseriesAndFormulas.filter(timeseries => timeseries.displayName !== targetTimeseries.displayName);
    const recycleSymbol = targetTimeseries.symbol;
    this.uniqueSymbols.push(recycleSymbol);
    this.configuration = Object.assign({}, this.configuration, {timeseriesAndFormulas: remainTimeseries});
    this.updateConfiguration.emit(this.configuration);
  }

  public customGridCallBack(params) {
    this.gridApi = params.api;
  }

  public onOpenVariableSetup() {
    const dialogRef = this.dialog.open(EventAnalysisFourmulaTimeseriesVariablesDialogComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '20rem',
      height: '20rem',
      data: this.configuration && this.configuration.variables || []
    });

    this.subscription = dialogRef.afterClosed().subscribe(variablesSetup => {
      if (variablesSetup && variablesSetup.length > 0) {
        this.configuration.variables = variablesSetup;
        this.updateConfiguration.emit(this.configuration);
      }
    });
  }

  public onOpenCustomFunctionset() {
    this.dialog.open(EventAnalysisCustomFunctionsDialogComponent, {
      panelClass: 'event-analysis-pop-up-panel',
      width: '30rem',
      hasBackdrop: false,
    });
  }

  onChangeDisplayMode() {
    this.changeDisplayMode.emit();
  }

  onToggleVisibility(payload) {
    this.toggleVisibilityInEventPlot.emit(payload);
  }

}


