import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter, HostBinding } from '@angular/core';
// import { AgGridNg2 } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';


import { GridOptions, GridApi, ColumnApi, ColDef, Column, ColGroupDef, initialiseAgGridWithAngular1, GetContextMenuItemsParams } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription, Observable, Subject } from 'rxjs';
import { startWith, map, filter, debounceTime } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromModels from './../../models';
import * as fromStore from './../../store';
import { PoolPortfoliosItemsNotePopupComponent } from '../pool-portfolios-items-note-popup/pool-portfolios-items-note-popup.component';
import { CreateNewPortfolioPopupComponent } from '../create-new-portfolio-popup/create-new-portfolio-popup.component';
import { PoolGridLayoutConfigurationDialogComponent } from '../pool-grid-layout-configuration-dialog/pool-grid-layout-configuration-dialog.component';
import { PoolGridGroupingConfigurationDialogComponent } from '../pool-grid-grouping-configuration-dialog/pool-grid-grouping-configuration-dialog.component';
import { UtilityService } from 'src/app/services';
import { YieldbookCustomCheckboxComponent } from './yieldbook-custom-checkbox.component';
import { CutsomCellDateEditorComponent } from './custom-cell-date-editor.component';
import { PrepayRateCustomCellEditorComponent } from '../prepay-rate-custom-cell-editor/prepay-rate-custom-cell-editor.component';
import { PureFunctionsService } from 'src/app/shared/custom/utilities';
import { AppGridLayoutManagementComponent } from 'src/app/components';




@Component({
  selector: 'app-pool-portfolios-items-viewer',
  templateUrl: './pool-portfolios-items-viewer.component.html',
  styleUrls: ['./pool-portfolios-items-viewer.component.scss']
})
export class PoolPortfoliosItemsViewerComponent implements OnInit, OnChanges, OnDestroy {

  @HostBinding('class') classes = 'standard-grid-layout';

  @Input() lookups: fromModels.ILookups;
  @Input() securities: fromModels.Security[];
  @Input() poolLayouts: fromModels.PoolItemsGridColumnLayout[];
  @Input() poolLayoutsLoadingStatus: boolean;
  @Input() poolViewerItemsGroupings: fromModels.PoolItemGridRowGrouping[];
  @Input() poolViewerItemsGroupingsLoadingStatus: boolean;
  @Input() loading: boolean;
  @Input() PortfolioId: any;

  @Input() gridSize: string;
  @Input() isActive: boolean;

  @Output() onSaveNewPoolLayout = new EventEmitter<fromModels.PoolItemsGridColumnLayout>();
  @Output() onSaveNewPoolItemsGrouping = new EventEmitter<fromModels.PoolItemGridRowGrouping>();  
  @Output() onExplodeMegaData = new EventEmitter<{name: string; data: string[]}>();
  @Output() onSelectedCusip = new EventEmitter<{Cusip: string; BlbgName: string;}>();

  // Yieldbook events
  @Output() onRunPYCalc = new EventEmitter<any>();
  @Output() onRunSensitivities = new EventEmitter<any>();
  @Output() onRunModelValidation = new EventEmitter<any>();
  @Output() onRunHorizonAnalysis = new EventEmitter<any>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private dynamicColDefs: ColDef[];
  private yieldInputParamsColNames: string[] = [];
  private dropdownTypeColumnNames: string[] = [];
  private shadedNode: any[] = [];

  private pendingTaskUntilGridReady: any[] = [];
  private LayoutDiaglogRef: MatDialogRef<PoolGridLayoutConfigurationDialogComponent>;
  // private GroupingDialogRef: MatDialogRef<PoolGridGroupingConfigurationDialogComponent>;
  private GroupingDialogRef: MatDialogRef<AppGridLayoutManagementComponent>;

  public poolViewerLayoutSearchControl = new UntypedFormControl();
  // public filteredPoolViewerLayoutOptions: Observable<fromModels.PoolItemsGridColumnLayout[]>;
  public filteredPoolViewerLayoutOptions = new Subject<fromModels.PoolItemsGridColumnLayout[]>();
  public mapCalLayoutSearchControl = new UntypedFormControl();
  // public filteredMapCalLayoutOptions: Observable<fromModels.PoolItemsGridColumnLayout[]>;
  public filteredMapCalLayoutOptions = new Subject<fromModels.PoolItemsGridColumnLayout[]>();

  private subscriptions: Subscription[] = [];

  public filterValue: string;
  public autoSizingColumnTrigger = false;

  public columnsFilter: UntypedFormControl = new UntypedFormControl();
  public filteredColumns$: Observable<Column[]>;

  public timeStamp = new Date();

  public poolViewerLayouts: fromModels.PoolItemsGridColumnLayout[] = [];
  public mapCalLayouts: fromModels.PoolItemsGridColumnLayout[] = [];
  public activeViewingLayout = 'Standard - Pool Viewer';
  public activeGrouping = 'agency';


  // Meta Grid configuratoin ---------------------------------------------------------------------------------------------

  public customGridOption: GridOptions = {

    // Grid basic setup
    defaultColDef: {
      filter: 'agTextColumnFilter',
      enableValue: true,
      aggFunc: 'sum',
      allowedAggFuncs: ['sum', 'min', 'max'],
      enableCellChangeFlash: true,
      enableRowGroup: true,
      cellStyle: params => {
        if (typeof params.value === 'number') {
          return {'justify-content': 'flex-end'};
        }
      },
      valueFormatter: params => {
        if (typeof params.value === 'number') {
            return params.value.toLocaleString(undefined, {maximumFractionDigits: 2});
        }
      },
      width: 150
    },

    rowDragManaged: true,

    autoGroupColumnDef: {
      rowDrag: true
    },

    rowData: null,
    columnDefs: [],

    // Columns functional feature
    enableSorting: true,
    enableFilter: true,
    floatingFilter: true,
    enableColResize: true,

    // rows functional feature
    getRowNodeId: data => data.RecordId,
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    enableRangeSelection: true,
    getRowStyle: params => {
      if (params.data && params.data['_shadedSelected']) {
        return {'background-color': '#a7bdcab3'};
      } else {
        return {};
      }
    },

    // Event handling ----------------------------------------------------------------------
    // onFirstDataRendered: this.onGlobalFilterValueDataReady.bind(this),
    onCellEditingStopped: params => {
      console.log('onCellEditingStopped', params);
    },

    onRowClicked: params => {
      this.onSelectedCusip.emit({Cusip: params.data['Cusip'], BlbgName: params.data['BlbgName']});
    },

    // Cell Range Aggregation ------------------------------------------------------------------
    statusBar: {
      statusPanels: [
        {statusPanel: 'agAggregationComponent'}
      ]
    },

    // Sidebar Setup
    sideBar: true,

    // Basic Context Menu Setup
    getContextMenuItems: (function getContextMenuItems(params) {
      // console.log('params', params);
      const openNotes = {
        name: 'Open Notes',
        icon: '<i class="material-icons small-menu-icon">note_add</i>',
        action: () => {
          this.dialog.open(PoolPortfoliosItemsNotePopupComponent, {data: params.node.data || 'Group'});
        }
      };
      const highlightColumn = {
        name: 'Highlight Column',
        icon: '<i class="material-icons small-menu-icon">border_color</i>',
        subMenu: [
          {name: 'Blue', action: () => {colorChanger('blue'); }, icon: '<span class="color-icon color-icon-blue"></span>'},
          {name: 'Yellow', action: () => {colorChanger('yellow'); }, icon: '<span class="color-icon color-icon-yellow"></span>'},
          {name: 'Red', action: () => {colorChanger('red'); }, icon: '<span class="color-icon color-icon-red"></span>'},
          {name: 'Green', action: () => {colorChanger('green'); }, icon: '<span class="color-icon color-icon-green"></span>'},
          {name: 'Purple', action: () => {colorChanger('purple'); }, icon: '<span class="color-icon color-icon-purple"></span>'}
        ]
      };

      const unSelectAllRows = {
        name: 'Unselected All Rows',
        icon: '<i class="material-icons small-menu-icon">clear</i>',
        action: () => {
          params.api.deselectAll();
        }
      };

      const createNewPortfolioBaseOnSelection = {
        name: 'Create New Portfolio from Selection',
        icon: '<i class="material-icons small-menu-icon">list_alt</i>',
        action: () => {
          const selectedRow = params.api.getSelectedRows();
          // this.dialog.open(CreateNewPortfolioPopupComponent, {data: selectedRow || undefined});
          console.log('selected row', selectedRow);
          // this.store.dispatch(new fromStore.CreateTempPortfolio(selectedRow));
        }
      };

      function colorChanger(color: string) {
        params.column.colDef = Object.assign({}, params.column.colDef, {cellClass: `column-highlight-${color}`});
        params.api.refreshCells({columns: [params.column.colId], force: true});
      }

      const showYieldbookParameters = {
        name: '<span>Show Yieldbook Parameters</span>',
        icon: '<i class="material-icons small-menu-icon">unfold_more</i>',
        action: () => {
          const yieldbookColumnDef = params.context.dynamicColDefs.filter(colDef => colDef.headerName === 'Yieldbook Parameters')[0].children;
          yieldbookColumnDef.forEach(colDef => colDef.hide = false);

          // initial yieldbook parameter column Data
          params.context.securities.forEach(item => {
            yieldbookColumnDef.forEach(colDef => {
              if (colDef.cellRendererParams !== undefined && colDef.cellRendererParams.defaultValue) {
                item[colDef.field] = colDef.cellRendererParams.defaultValue;
              } else if (colDef.cellEditorParams !== undefined &&  colDef.cellEditorParams.defaultValue) {
                item[colDef.field] = colDef.cellEditorParams.defaultValue;
              }
            });
          });
          params.api.setColumnDefs([]);
          params.api.setColumnDefs(params.context.dynamicColDefs);
        }
      };

      const hideYieldbookParameters = {
        name: '<span>Hide Yieldbook Parameters</span>',
        icon: '<i class="material-icons small-menu-icon">unfold_less</i>',
        action: () => {
          const yieldbookColumnDef = params.context.dynamicColDefs.filter(colDef => colDef.headerName === 'Yieldbook Parameters')[0].children;
          yieldbookColumnDef.forEach(colDef => colDef.hide = true);
          params.api.setColumnDefs([]);
          params.api.setColumnDefs(params.context.dynamicColDefs);
        }
      };

      const showYieldbookResult = {
        name: 'Show Yieldbook Result',
        icon: '<i class="material-icons small-menu-icon">visibility</i>',
        action: () => {
          const yieldbookResultColumnDef = params.context.dynamicColDefs.filter(colDef => colDef.headerName === 'Yieldbook Result')[0].children;
          yieldbookResultColumnDef.forEach(colDef => colDef.hide = false);
          params.api.setColumnDefs([]);
          params.api.setColumnDefs(params.context.dynamicColDefs);
        }
      };

      const hideYieldbookResult = {
        name: 'Hide Yieldbook Result',
        icon: '<i class="material-icons small-menu-icon">visibility_off</i>',
        action: () => {
          const yieldbookResultColumnDef = params.context.dynamicColDefs.filter(colDef => colDef.headerName === 'Yieldbook Result')[0].children;
          yieldbookResultColumnDef.forEach(colDef => colDef.hide = true);
          params.api.setColumnDefs([]);
          params.api.setColumnDefs(params.context.dynamicColDefs);
        }
      };

      const runPYCalc = {
        name: '<span>Run P/Y Calc</span>',
        icon: '<i class="material-icons small-menu-icon">play_arrow</i>',
        action: () => {
          const nodeData = params.node.data;
          const yieldbookParameters = {
            Cusip: nodeData['Cusip'],
            RecordId: nodeData['RecordId'],
            PortfolioId: params.context.PortfolioId,
          };
          params.context.yieldInputParamsColNames.forEach(name => {
            yieldbookParameters[name] = nodeData[name];
          });
          params.context.onRunPYCalc.emit(yieldbookParameters);
        }
      };

      const runSensitivities = {
        name: '<span>Run Sensitivities</span>',
        icon: '<i class="material-icons small-menu-icon">play_circle_filled</i>',
        action: () => {
          const nodeData = params.node.data;
          const yieldbookParameters = {
            Cusip: nodeData['Cusip']
          };
          params.context.yieldInputParamsColNames.forEach(name => {
            yieldbookParameters[name] = nodeData[name];
          });
          params.context.onRunSensitivities.emit(yieldbookParameters);
        }
      };

      const runHorizonAnalysis = {
        name: '<span>Run Horizon Analysis</span>',
        icon: '<i class="material-icons small-menu-icon">play_circle_outlined</i>',
        action: () => {
          const nodeData = params.node.data;
          const yieldbookParameters = {
            Cusip: nodeData['Cusip']
          };
          params.context.yieldInputParamsColNames.forEach(name => {
            yieldbookParameters[name] = nodeData[name];
          });
          params.context.onRunHorizonAnalysis.emit(yieldbookParameters);
        }
      };

      const runModelValidation = {
        name: '<span>Run Model Validation</span>',
        icon: '<i class="material-icons small-menu-icon">multiline_chart</i>',
        action: () => {
          const nodeData = params.node.data;
          const yieldbookParameters = {
            Cusip: nodeData['Cusip']
          };
          params.context.yieldInputParamsColNames.forEach(name => {
            yieldbookParameters[name] = nodeData[name];
          });
          params.context.onRunModelValidation.emit(yieldbookParameters);
        }
      };

      const explodeInNewTab = {
        name: 'Explode in New Tab',
        icon: '<i class="material-icons small-menu-icon">explore</i>',
        action: () => {
          console.log('params', params);
          const selectedRow = params.node.data;
          // const selectedRow = params.api.getSelectedRows();
          // const selectedCusips: string[] = selectedRow.map(row => row.Cusip);
          params.context.onExplodeMegaData.emit({
            data: [selectedRow.Cusip],
            name: selectedRow.BlbgName
          });
        }
      };

      const shadeSelectedRow = {
        name: '<span>Shade Selected Rows</span>',
        action: () => this.addShadedRows(params)
      }

      const unshadeSelectedRow = {
        name: '<span>Unshade selected Rows</span>',
        action: () => this.unshadeSelectedRow(params)
      }

      const unShadeAll = {
        name: '<span>Unshade All</span>',
        action: () => this.removeShadedRows(params)
      }

      const invertShadeRows = {
        name: '<span>Invert Shading</span>',
        action: () => this.invertShadeRows(params)
      }


      return ['copy', 'copyWithHeaders', 'paste', 'separator', 'csvExport', 'excelExport', 'separator',
        openNotes, highlightColumn, unSelectAllRows, 'separator', shadeSelectedRow, unshadeSelectedRow, unShadeAll, invertShadeRows, 'separator', createNewPortfolioBaseOnSelection,
        'separator', showYieldbookParameters, hideYieldbookParameters, showYieldbookResult, hideYieldbookResult,
        'separator', runPYCalc, runSensitivities, runModelValidation, runHorizonAnalysis,
        'separator', explodeInNewTab];
    }).bind(this),

    // miscellaneous
    suppressAggFuncInHeader: true,
    context: this,
    singleClickEdit: true,
    // suppressColumnVirtualisation: true,   // remove this if performance is critical

    // Cosmetic
    rowClass: 'medium-row',
    rowHeight: 22,
    groupHeaderHeight: 24,
    headerHeight: 33,
    floatingFiltersHeight: 28,
    rowBuffer: 100,

    // Custom Componnent
    frameworkComponents: {
      YieldbookCustomCheckboxComponent: YieldbookCustomCheckboxComponent,
      CutsomCellDateEditorComponent: CutsomCellDateEditorComponent,
      PrepayRateCustomCellEditorComponent: PrepayRateCustomCellEditorComponent
    },
    // components: {
    //   datePicker: this.getDateDatePicker()
    // }
  };

  public extraOption = {};


  // ----------------------------------------------------------------------------------------------------------------

  constructor(private dialog: MatDialog, private pureFunctions: PureFunctionsService, private utilityService: UtilityService) {
    this.autoSizeAllColumns = this.autoSizeAllColumns.bind(this);
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.poolViewerLayoutSearchControl.valueChanges
    .pipe(
      debounceTime(1000),
      map(value => this._filterLayout(value, this.poolViewerLayouts))
    ).subscribe(result => this.filteredPoolViewerLayoutOptions.next(result));

    this.mapCalLayoutSearchControl.valueChanges
    .pipe(
      debounceTime(1000),
      map(value => this._filterLayout(value, this.mapCalLayouts))
    ).subscribe(result => this.filteredMapCalLayoutOptions.next(result));
  }

  // initialize row data or re-render row data when receving new data
  ngOnChanges(changes: SimpleChanges) {
    // if (changes.securities) {
    //   if (this.gridOptions.api) {
    //     if (changes.securities.previousValue === undefined) {
    //       this.gridOptions.api.setRowData(this.securities);
    //     } else {
    //       this.gridOptions.api.refreshCells();
    //     }
    //   } else {
    //     this.pendingTaskUntilGridReady.push(this.renderData.bind(this));
    //   }
    // }

    // if (!this.gridApi) {
    //   this.pendingTaskUntilGridReady.push(this.changeRowSize.bind(this));
    // } else {
    //   this.changeRowSize();
    // }

    if (!this.autoSizingColumnTrigger && changes.isActive && changes.isActive.currentValue) {
      this.autoSizingColumnTrigger = true;
      setTimeout(() => {
        const allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach((column: any) => {
          allColumnIds.push(column.colId);
        });
        this.gridColumnApi.autoSizeColumns(allColumnIds);
      }, 0);
    }

    if (changes.poolLayouts && changes.poolLayouts.currentValue.length > 0) {
      this.poolViewerLayouts = changes.poolLayouts.currentValue.filter(layout => layout.type === 'PoolViewer');
      this.mapCalLayouts = changes.poolLayouts.currentValue.filter(layout => layout.type === 'MapCal');
      setTimeout(() => {
        /* since Subject is a hot observale (emitting value even if no one subscriptin), it is important to put following
        operation to async in order to let the temple construct before the following operation so that the observers in the
        template could have time to listen to the value emit by the Subject
        */
        this.filteredPoolViewerLayoutOptions.next(this.poolViewerLayouts);
        this.filteredMapCalLayoutOptions.next(this.mapCalLayouts);
      });
    }

    // if (changes.securities && changes.securities.currentValue && changes.securities.currentValue.length > 0) {
    //   this.dynamicColDefs = this.getDynamicColumns(changes.securities.currentValue);
    //   if (this.gridApi) {
    //     this.gridApi.setColumnDefs([]);
    //     this.gridApi.setColumnDefs(this.dynamicColDefs);
    //   }
    // }

    if (changes.lookups && changes.lookups.currentValue && changes.lookups.currentValue.columns) {
      this.dynamicColDefs = this.createColumnDefs(this.lookups.columns.columnDefs);

      console.log('this.dynamicColDefs', this.dynamicColDefs);
      if (this.gridApi) {
        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.dynamicColDefs);
      }
    }

  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  customGridCallBack(params) {
    // this will expose the gridApi and the gridColumnApi to the component scope
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.pendingTaskUntilGridReady.forEach(task => {
      task();
    });
    this.filteredColumns$ = this.columnsFilter.valueChanges
    .pipe(
        startWith(''),
        map(name => name ? this._filter(name) : this.gridColumnApi.getAllDisplayedColumns().slice())
    );
    if (this.dynamicColDefs) {
      this.gridApi.setColumnDefs([]);
      this.gridApi.setColumnDefs(this.dynamicColDefs);
    }
  }

  // Extra grid feature / Event / UI function---------------------------------------------------------------------------------------

  onGlobalFilterValueDataReady() {
    this.gridApi.setQuickFilter(this.filterValue);
  }

  changeRowSize(targetSize?: string) {
    const size = targetSize || this.gridSize || 'big';
    if (targetSize) {
      this.gridSize = targetSize;
    }

    if (size === 'big') {
      this.customGridOption.rowHeight = 28;
      this.customGridOption.getRowClass = () => 'big-row';
    }
    if (size === 'medium') {
      this.customGridOption.rowHeight = 22;
      this.customGridOption.getRowClass = () => 'medium-row';
    }
    if (size === 'small') {
      this.customGridOption.rowHeight = 16;
      this.customGridOption.getRowClass = () => 'small-row';
    }
    this.gridApi.redrawRows();
    this.gridApi.resetRowHeights();
  }

  columnFocus(selectedCol) {
    const targetCol = this.gridColumnApi.getAllColumns().filter(col => col.getColDef().headerName === selectedCol.getColDef().headerName);
    this.gridApi.ensureColumnVisible(targetCol[0].getColId());
    this.gridApi.flashCells({columns: [targetCol[0].getColDef().field]});
  }

  savePortfolioAndResult() {
    this.dialog.open(CreateNewPortfolioPopupComponent, {width: '400px', data: ''});
  }

  configurateColumnsLayout() {
    this.LayoutDiaglogRef = this.dialog.open(PoolGridLayoutConfigurationDialogComponent, {
      data: this.gridColumnApi.getAllColumns()
    });

    this.subscriptions.push(this.LayoutDiaglogRef.afterClosed().subscribe(result => {
      if (result && result.action) {

        if (result.action === 'apply') {
          console.log('apply column result', result);
          this._setColumnDefinition(result.newColDef);
        }

        if (result.action === 'save') {
          this.onSaveNewPoolLayout.emit({
            id: result.newLayoutName,
            data: result.newColDef,
            type: result.newLayoutType
          });
        }
      }
    }));
  }

  configurateItemsGrouping() {
    const currentGroupings = [];
    this.gridColumnApi.getAllColumns().forEach(col => {
      const colDef = col.getColDef();
      if (colDef.rowGroup === true) {
        currentGroupings.push(colDef.headerName);
      }
    });
    // this.GroupingDialogRef = this.dialog.open(PoolGridGroupingConfigurationDialogComponent, {
    //   data: {
    //     currentGroupings: currentGroupings,
    //   }
    // });

    this.GroupingDialogRef = this.dialog.open(AppGridLayoutManagementComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '60rem',
      height: '50rem',
      data: {
        currentGroupings: currentGroupings,
      }
    });

    this.subscriptions.push(this.GroupingDialogRef.afterClosed().subscribe(result => {
      if (result && result.action) {
        if (result.action === 'apply') {
          this.triggerGrouping(result.newGrouping);
        }
        if (result.action === 'save') {
          this.onSaveNewPoolItemsGrouping.emit({
            id: result.newGroupingName,
            data: result.newGrouping
          });
        }
      }
    }));
  }

  changeLayoutSet(layout: fromModels.PoolItemsGridColumnLayout) {
    this.activeViewingLayout = layout.id;
    this.poolViewerLayoutSearchControl.setValue('');
    this.mapCalLayoutSearchControl.setValue('');
    this._setColumnDefinition(layout.data);
  }

  changeGrouping(targetGrouping: fromModels.PoolItemGridRowGrouping) {
    // this.gridOptions.columnDefs.forEach((colDef: ColDef) => {
    //   if(colDef.headerName === TargetGrouping.data) colDef.rowGroup = true;
    //   if(colDef.headerName !== TargetGrouping.data && colDef.rowGroup === true) delete colDef.rowGroup;
    // });
    // this._setColumnDefinition(this.gridOptions.columnDefs);
    this.triggerGrouping(targetGrouping.data);
    this.activeGrouping = targetGrouping.id;
  }



  // Helper function --------------------------------------------------------------------
  renderData() {
    this.gridApi.setRowData(this.securities);
  }

  arrayMove(array, fromIndex, toIndex) {
    const placeholder = {};
    const objectToMove = array.splice(fromIndex, 1, placeholder)[0];
    array.splice(toIndex, 0, objectToMove);
    array.splice(array.indexOf(placeholder), 1);
  }

  triggerGrouping(selectedGroupings: string[]) {
    const normalColumns = [];
    this.gridColumnApi.getAllColumns().forEach(col => {
      const colDef = col.getColDef();
      const isNormalColumn = selectedGroupings.every(groupCol => {
        return groupCol !== colDef.headerName;
      });
      if (isNormalColumn) {
        if (colDef.rowGroup) {
          delete colDef.rowGroup;
        }
        normalColumns.push(colDef);
      }
    });
    const groupingColumn = selectedGroupings.map(col => {
      return {
        headerName: col,
        field: col,
        rowGroup: true,
        hide: true
      };
    });
    const newColDefs = [...groupingColumn, ...normalColumns];
    this._setColumnDefinition(newColDefs);
  }

  autoSizeAllColumns() {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach((column: any) => {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  private _filter(value: string | ColDef | any): Column[] {
    let filterValue;
    if (typeof value === 'string') {
      filterValue =  value.toLowerCase();
    } else {
      filterValue = value.colDef.headerName.toLowerCase();
    }
    // const avaliableColumns = this.gridColumnApi.getAllColumns().filter(column => column.getColDef().hide !== true)
    const avaliableColumns = this.gridColumnApi.getAllDisplayedColumns();
    return avaliableColumns.filter(column => column.getColDef().headerName.toLowerCase().indexOf(filterValue) === 0);
  }

  public displayFn(column: Column): string {
    return column ? column.getColDef().headerName : undefined;
  }

  private _filterLayout(value: string, layouts: fromModels.PoolItemsGridColumnLayout[]) {
    const filterValue = value.toLowerCase();
    const result = layouts.filter(layout => layout.id.toLowerCase().includes(filterValue));
    return result;
  }

  private _setColumnDefinition(newColDefs) {
    this.gridApi.setColumnDefs([]);
    this.gridApi.setColumnDefs(newColDefs);
    this.autoSizeAllColumns();
  }

  private createColumnDefs(columnDefsRaw) {

    const dynamicColDefs = columnDefsRaw.map(colDefRaw => {

      if (colDefRaw.children) {
        const basicColDef: ColGroupDef = {
          headerName: colDefRaw.headerName,
          children: this.createColumnDefs(colDefRaw.children),
        };
        if (colDefRaw.headerName === 'Yieldbook Parameters') {
          this.yieldInputParamsColNames = colDefRaw.children.map(colDef => colDef.field);
        }
        return basicColDef;
      } else {
        const basicColDef: ColDef = {
          headerName: colDefRaw.headerName,
          field: colDefRaw.field,
          width: colDefRaw.width,
          hide: colDefRaw.hide,
          editable: colDefRaw.editable,
          cellStyle: colDefRaw.editable ? {'background-color': '#ffff0012'} : colDefRaw.cellStyle,
          pinned: colDefRaw.pinned,
          rowGroup: colDefRaw.rowGroup,
          headerTooltip: colDefRaw.headerName,
        };

        if (colDefRaw.type.includes('numberColumn')) {
          basicColDef.valueGetter = this.utilityService.formatNumber(colDefRaw.digit);
          basicColDef.valueFormatter = this.utilityService.formatNumberWithCommas;
          basicColDef.filter = 'agNumberColumnFilter';
          basicColDef.cellStyle = Object.assign({}, basicColDef.cellStyle, {'justify-content': 'flex-end'});
        } else if (colDefRaw.type.includes('textColumn')) {
          basicColDef.filter = 'agTextColumnFilter';
          basicColDef.valueFormatter = params => params.value;
        } else if (colDefRaw.type.includes('dropDownColumn')) {
          basicColDef.filter = 'agTextColumnFilter';
          basicColDef.cellEditor = 'agRichSelectCellEditor';
          basicColDef.cellEditorParams = {
            cellHeight: 30,
            values: [null, ...this.lookups[colDefRaw.dictKey]],
            // defaultValue: colDefRaw.defaultValueKey ? this.lookups['defaultValues'][colDefRaw.defaultValueKey] : null
            defaultValue: this.lookups['defaultValues'][colDefRaw.field] ? this.lookups['defaultValues'][colDefRaw.field] : null
          };
          this.dropdownTypeColumnNames.push(colDefRaw.field);
        } else if (colDefRaw.type.includes('checkBoxColumn')) {
          basicColDef.filter = 'agSetColumnFilter';
          basicColDef.cellRenderer = 'YieldbookCustomCheckboxComponent',
          basicColDef.cellRendererParams = {
            key: colDefRaw.field,
            defaultValue: colDefRaw.defaultValue
          };
        } else if (colDefRaw.type.includes('dateColumn')) {
          basicColDef.filter = 'agTextColumnFilter';
          basicColDef.cellEditor = 'CutsomCellDateEditorComponent';
          basicColDef.valueFormatter = this.pureFunctions.getFunctionFromString('date');
          basicColDef.cellStyle = Object.assign({}, basicColDef.cellStyle, { 'justify-content': 'space-around' });
        } else if (colDefRaw.type.includes('prepayRateCustomColumn')) {
          basicColDef.filter = 'agTextColumnFilter';
          basicColDef.cellEditor = 'PrepayRateCustomCellEditorComponent';
          basicColDef.cellEditorParams = (params) => {
            return {
              title: params.data['BlbgName']
            };
          };
        } else if (colDefRaw.type.includes('expressionColumn')) {
          basicColDef.filter = 'agTextColumnFilter';
          if (typeof colDefRaw.expression === 'string') {
            basicColDef.valueGetter = colDefRaw.expression;
          } else {
            basicColDef.valueGetter = colDefRaw.expression.join('');
          }
        }

        if (colDefRaw.cellStyle) {
          basicColDef.cellStyle = Object.assign({}, basicColDef.cellStyle, colDefRaw.cellStyle);
        }

        return basicColDef;
      }
    });

    return dynamicColDefs;
  }

  private addShadedRows(params: GetContextMenuItemsParams) {
    const targetNodes = params.api.getSelectedNodes();
    const newAddedNodes = [];
    targetNodes.forEach(node => {
      if (this.shadedNode.indexOf(node) === -1) {
        newAddedNodes.push(node);
      }
    });
    this.shadedNode = [...this.shadedNode, ...newAddedNodes];
    const selectedRowsAggregation: any = {};
    this.shadedNode.map(node => node.data).forEach(row => {
      row['_shadedSelected'] = true;
      for (const key in row) {
        const isNumber = /^\d+\.?\d+$/.test(row[key]);
        if (isNumber) {
          const value = parseFloat(row[key]);
          if (selectedRowsAggregation[key] === undefined) {
            selectedRowsAggregation[key] = value;
          } else {
            selectedRowsAggregation[key] += value;
          }
        }
      }
    });
    selectedRowsAggregation.Cusip = 'Shaded Rows';
    params.api.setPinnedBottomRowData([selectedRowsAggregation]);
    params.api.redrawRows({rowNodes: targetNodes});
  }

  private unshadeSelectedRow(params: GetContextMenuItemsParams) {
    const targetNodes = params.api.getSelectedNodes();
    targetNodes.forEach(node => {
      if (this.shadedNode.indexOf(node) !== -1) {
        node.data['_shadedSelected'] = false;
      }
    });
    params.api.redrawRows({rowNodes: targetNodes});
    this.shadedNode = this.shadedNode.filter(node => node.data['_shadedSelected'] === true);
    const selectedRowsAggregation: any = {};
    this.shadedNode.map(node => node.data).forEach(row => {
      row['_shadedSelected'] = true;
      for (const key in row) {
        const isNumber = /^\d+\.?\d+$/.test(row[key]);
        if (isNumber) {
          const value = parseFloat(row[key]);
          if (selectedRowsAggregation[key] === undefined) {
            selectedRowsAggregation[key] = value;
          } else {
            selectedRowsAggregation[key] += value;
          }
        }
      }
    });
    params.api.setPinnedBottomRowData([selectedRowsAggregation]);
  }

  private removeShadedRows(params: GetContextMenuItemsParams) {
    this.shadedNode.map(node => node.data).forEach(row => {
      row['_shadedSelected'] = false;
    });
    params.api.redrawRows({rowNodes: this.shadedNode});
    this.shadedNode = [];

    const selectedRowsAggregation: any = {};
    selectedRowsAggregation.Cusip = 'Shaded Rows';
    params.api.setPinnedBottomRowData([selectedRowsAggregation]);
  }

  private invertShadeRows(params: GetContextMenuItemsParams) {
    const newShadedNodes = [];
    params.api.forEachNode(node => {
      if (this.shadedNode.indexOf(node) === -1) {
        node.data['_shadedSelected'] = true;
        newShadedNodes.push(node);
      } else {
        node.data['_shadedSelected'] = false;
      }
    });
    this.shadedNode = newShadedNodes;
    const selectedRowsAggregation: any = {};
    this.shadedNode.map(node => node.data).forEach(row => {
      row['_shadedSelected'] = true;
      for (const key in row) {
        const isNumber = /^\d+\.?\d+$/.test(row[key]);
        if (isNumber) {
          const value = parseFloat(row[key]);
          if (selectedRowsAggregation[key] === undefined) {
            selectedRowsAggregation[key] = value;
          } else {
            selectedRowsAggregation[key] += value;
          }
        }
      }
    });
    selectedRowsAggregation.Cusip = 'Shaded Rows';
    params.api.setPinnedBottomRowData([selectedRowsAggregation]);
    params.api.redrawRows();
  }

}
