import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import {
  GridApi,
  GridOptions,
  ColDef,
  CellClickedEvent,
  RowNode,
  ColGroupDef,
  ColumnApi,
  ValueGetterParams,
  ColumnGroup,
} from 'ag-grid-community';
import * as _ from 'lodash';

import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import * as fromModels from './../../models/position.models';
import { PositionViewerService } from '../../services';
import { SetFilter } from 'ag-grid-enterprise';
import { Subject } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';

@Component({
  selector: 'app-rcpm-position-viewer',
  templateUrl: './rcpm-position-viewer.component.html',
  styleUrls: ['./rcpm-position-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RcpmPositionViewerComponent implements OnInit, OnChanges {
  // User Layout/config ---------------------------------
  @Input() layoutStyle: any;
  @Input() layoutName: string;
  @Input() userGridConfig: any;
  @Input() userGroupingStyle: any;
  @Input() systemStyle: any;

  // Data --------------------------------------------------

  @Input() data: any[];
  @Input() loadedStatus: boolean;
  @Input() targetManager: string[];
  @Input() lookups: any;

  @Input() targetLayout: any;
  @Input() primaryGroupingNameIdMaping: string;
  @Input() targetColumn: any;

  @Input() IsUnsettledClosingTradeStillAccruing: boolean;
  @Input() IsExcludeTestFundEnabled: boolean;

  @Input() nonlinearData: any;
  @Input() nonlinearDataLoadingStatus: boolean;
  @Input() nonlinearDataLoadedStatus: boolean;
  @Input() nonlinearPnlData: any;
  @Input() nonlinearPnlDataLoadingStatus: boolean;
  @Input() nonlinearPnlDataLoadedStatus: boolean;

  @Input() isActive: boolean;
  @Input() commonGrouping: string[];

  @Input() regressionDynamicColumns: any;
  @Input() regressionNonlinearData: any;
  @Input() regressionLoading: boolean;
  @Input() gridClearingStatus: boolean;
  @Input() displayMode: string;
  @Input() mode: 'live' | 'close';

  @Input() isOnCurrentDate: boolean;

  @Output() updatefilters = new EventEmitter<
    { [property: string]: number }[]
  >();
  @Output() currentGrouping = new EventEmitter<string[]>();
  @Output() updateUserLayoutList = new EventEmitter<boolean>();
  @Output() boardcastDisplayColumns = new EventEmitter<any>();
  @Output() onSelectDataPath = new EventEmitter<fromModels.DataPath>();
  @Output() onSelectLeafRow = new EventEmitter<any>();
  @Output() togglePeriodicPullingStatus = new EventEmitter<boolean>();

  @Output() backupGridSetting = new EventEmitter<boolean>();
  @Output() updateUserGridConfig = new EventEmitter<any>();
  @Output() updateUserGroupingStyle = new EventEmitter<any>();
  @Output() updateUserLayoutStyle = new EventEmitter<any>();

  public autoGroupColumnFilterValue: string;
  private isExternalFilterPresent = false;

  public singleCellValueSubject$ = new Subject<number>();

  private gridApi: GridApi;
  private columnApi: ColumnApi;
  private rowGrouping: any[] = [];
  private nonlinearColumns: string[] = [];

  private executionFiltersDict = {
    securityName: 'sid',
    fundName: 'fundID',
    podName: 'podID',
    tradeName: 'tid',
    TradeNameWithID: 'tid',
    SecurityName: 'sid',
  };
  public dynamicColDefs: ColDef[];

  public maxLastUpdate: Date;

  public customGridOption: GridOptions;

  public colDefs: ColDef[];
  public extraOption = { autoSizeColumns: true };

  constructor(
    private utilityService: UtilityService,
    private dom: ElementRef,
    public positionViewerService: PositionViewerService,
    private dialog: MatDialog
  ) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.nonlinearDataLoader = this.nonlinearDataLoader.bind(this);
    this._nonlinearDataLoaderForRegression = this._nonlinearDataLoaderForRegression.bind(this);
    setInterval( () => {
      this.gridApi.refreshCells();
    }, 5000 )
  }

  ngOnInit() {
    this.customGridOption = {
      // Basic Column Setup ---------------------------------------------------------------------------------------------------

      defaultColDef: {
        filter: 'agTextColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        enableRowGroup: true,
        enableCellChangeFlash: false,
        filterParams: {newRowsAction: 'keep'}
      },

      valueCache: true,
      autoGroupColumnDef: {
        pinned: 'left',
        cellRendererParams: {
          suppressCount: true,
        },
        headerName: 'Group',
        field: 'securityName',
        cellRenderer: 'agGroupCellRenderer',
        width: 370,
        sort: 'asc',
        comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
          if (nodeA.group) {
            if (
              nodeA.field === 'SecurityName' ||
              nodeA.field === 'SecurityNameExcludingCP'
            ) {
              const valueA_new =
                (nodeA.allLeafChildren[0].data['UnderlyingTicker'] || valueA) +
                '';
              const valueB_new =
                (nodeB.allLeafChildren[0].data['UnderlyingTicker'] || valueB) +
                '';
              return valueA_new
                .toLowerCase()
                .localeCompare(valueB_new.toLowerCase());
            } else {
              return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
            }
          } else {
            const valueA_new = (nodeA.data['UnderlyingTicker'] || valueA) + '';
            const valueB_new = (nodeB.data['UnderlyingTicker'] || valueB) + '';
            return valueA_new
              .toLowerCase()
              .localeCompare(valueB_new.toLowerCase());
          }
        },
        floatingFilter: false,
      },
      columnDefs: [],

      // Event Handling ---------------------------------------------------------------------------------------------------
      onCellClicked: this.getFilters.bind(this),
      onCellDoubleClicked: (params) => {
        if (params.column.getColId() !== 'ag-Grid-AutoColumn') {
          if (params.node.group) {
            if (params.node.expanded === false) {
              params.node.setExpanded(true);
            } else {
              params.node.setExpanded(false);
            }
          }
        }
      },

      onFirstDataRendered: (params) => {
        this.sendColumnGrouping(this.rowGrouping);
        if (this.targetLayout) {
          const layout = this.parseLayout(this.targetLayout);
          this.columnApi.setColumnState(layout);
        }

        if (this.isActive) {
          this.triggerBoardcastDisplayColumns();
        }

        this.expandTheFirstLevelnode();
      },

      onCellKeyDown: (params) => {
        const targRowIndex = params.api.getFocusedCell().rowIndex;
        const targetRowNode = params.api.getDisplayedRowAtIndex(targRowIndex);
        if (targetRowNode.group === false) {
          this.onSelectLeafRow.emit(targetRowNode.data);
        } else {
          this.onSelectLeafRow.emit(undefined);
        }

        let targetCapital = params.api.getValue(
          'FundCapital Merge',
          targetRowNode
        );
        if (targetCapital === '') {
          if (this._checkIfParentPathContain_SC_value(targetRowNode)) {
            targetCapital = params.api.getValue(
              'PodLeveredCapital',
              targetRowNode
            );
          }
        }

        if (targetRowNode.group === false) {
          this.onSelectLeafRow.emit(targetRowNode.data);
          this.onSelectDataPath.emit({
            grouping:
              this.positionViewerService.getNormalizedServerSideGrouping(
                this.rowGrouping
              ),
            key: this.positionViewerService.getNonLinearDataPathKeys(
              targetRowNode,
              this.primaryGroupingNameIdMaping
            ),
            displayName: targetRowNode.data['securityName'],
            capital: targetCapital,
          });
        } else {
          this.onSelectLeafRow.emit(undefined);
          this.onSelectDataPath.emit({
            grouping:
              this.positionViewerService.getNormalizedServerSideGrouping(
                this.rowGrouping
              ),
            key: this.positionViewerService.getNonLinearDataPathKeys(
              targetRowNode,
              this.primaryGroupingNameIdMaping
            ),
            displayName: targetRowNode.key,
            capital: targetCapital,
          });
        }
      },

      onColumnRowGroupChanged: (params) => {
        const columns = params.columnApi
          .getRowGroupColumns()
          .map((column) => column.getColId());
        this.rowGrouping = columns;
        params.api.redrawRows();
        setTimeout(() => {
          this.sendColumnGrouping(columns);
        }, 1000);
      },

      onRowClicked: (params) => {
        const targetParent = this.dom.nativeElement.querySelector(
          '.ag-column-drop-list'
        );
        const targetElements = targetParent.querySelectorAll(
          '.ag-column-drop-cell'
        );
        const targetLevel = params.node.level;
        targetElements.forEach((element, index) => {
          if (index === targetLevel) {
            element.classList.add('ag-group-level-highlight');
          } else {
            element.classList.remove('ag-group-level-highlight');
          }
        });

        let targetCapital = params.api.getValue(
          'FundCapital Merge',
          params.node
        );
        if (targetCapital === '') {
          if (this._checkIfParentPathContain_SC_value(params.node)) {
            targetCapital = params.api.getValue(
              'PodLeveredCapital',
              params.node
            );
          }
        }

        if (params.node.group === false) {
          this.onSelectLeafRow.emit(params.node.data);
          this.onSelectDataPath.emit({
            grouping:
              this.positionViewerService.getNormalizedServerSideGrouping(
                this.rowGrouping
              ),
            key: this.positionViewerService.getNonLinearDataPathKeys(
              params.node,
              this.primaryGroupingNameIdMaping
            ),
            displayName: params.node.data['securityName'],
            capital: targetCapital,
          });
        } else {
          this.onSelectLeafRow.emit(undefined);
          this.onSelectDataPath.emit({
            grouping:
              this.positionViewerService.getNormalizedServerSideGrouping(
                this.rowGrouping
              ),
            key: this.positionViewerService.getNonLinearDataPathKeys(
              params.node,
              this.primaryGroupingNameIdMaping
            ),
            displayName: params.node.key,
            capital: targetCapital,
          });
        }
        // console.log('on row selected', params)
      },

      // UI Custom-----------------------------------------------------------------------------------------------------------------

      rowClass: this.userGridConfig.rowClass
        ? this.userGridConfig.rowClass
        : 'medium-row',
      rowHeight: this.userGridConfig.rowHeight
        ? this.userGridConfig.rowHeight
        : 22,
      groupHeaderHeight: 24,
      headerHeight: 24,
      floatingFiltersHeight: 28,
      showToolPanel: false,
      suppressColumnVirtualisation: false,
      suppressAggFuncInHeader: true,
      suppressNoRowsOverlay: true,
      rowGroupPanelShow: 'always',
      sideBar: false,

      // Custom Grid Behavior -------------------------------------------------------------------------------------------------------------------

      statusBar: {
        statusPanels: [
          { statusPanel: 'agAggregationComponent' },
          { statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
        ],
      },
      floatingFilter: true,
      isExternalFilterPresent: () => this.isExternalFilterPresent,
      doesExternalFilterPass: (node) => {
        const targetFilterValue = this.autoGroupColumnFilterValue.toLowerCase();
        const targetColumnsNeededToBeFilter = [...this.rowGrouping];
        targetColumnsNeededToBeFilter.push('securityName');
        if (
          targetFilterValue === undefined ||
          targetFilterValue === null ||
          targetFilterValue === ''
        ) {
          return true;
        }
        const result = targetColumnsNeededToBeFilter.some((field: string) => {
          const targetValue = node.data[field];
          if (typeof targetValue === 'string') {
            return targetValue.toLowerCase().includes(targetFilterValue);
          } else {
            return false;
          }
        });
        return result;
      },

      getRowNodeId: (data) => data.RowId,
      rowSelection: 'single',

      context: this,
      frameworkComponents: {
        AppGridCustomStatusBarCellValueComponent:
          AppGridCustomStatusBarCellValueComponent,
      },
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.data &&
      changes.data.currentValue === undefined &&
      this.gridApi
    ) {
      this.gridApi.setRowData([]);
    }

    if (changes.data && changes.data.currentValue && this.gridApi) {
      if (changes.data.currentValue.length > 0) {
        if (
          changes.data.previousValue &&
          changes.data.previousValue.length > 0
        ) {
          const oldData = this.getRowData();
          const [updateRows, removeRows, addRows] =
            this.utilityService.gridValueUpdater(
              this.utilityService.deepCopy(changes.data.currentValue),
              oldData
            );
          this.gridApi.applyTransaction({
            update: updateRows,
            remove: removeRows,
            add: addRows,
          });
        } else {
          this.gridApi.setRowData(this.utilityService.deepCopy(this.data));
        }
      } else {
        this.gridApi.setRowData([]);
      }
      this.applyTargetManagerFilter(this.targetManager);
      this.setIsUnsettledClosingTradeStillAccruingFilter();
      this.setIsExcludeTestFundEnabledFilter();
    }

    if (
      changes.targetManager &&
      changes.targetManager.currentValue &&
      this.gridApi &&
      this.data
    ) {
      this.applyTargetManagerFilter(this.targetManager);
    }

    if (
      changes.lookups &&
      changes.lookups.currentValue &&
      changes.lookups.currentValue.columnDefs
    ) {
      this.dynamicColDefs = this.createColumnDefs(this.lookups.columnDefs);

      // Remove Directionality Column if current layout is directionality
      if (this.layoutName === '[static] Directionality') {
        this.dynamicColDefs = this.dynamicColDefs.filter(
          (col) => col.headerName !== 'Directionality'
        );
      }

      // sort the collected row grouping and save it to the component for later use
      this.rowGrouping.sort((a, b) => a.rowGroupIndex - b.rowGroupIndex);
      this.rowGrouping = this.rowGrouping.map((colDefRaw) => colDefRaw.field);

      // console.log('this.dynamicColDefs', this.dynamicColDefs);
      if (this.gridApi) {
        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.dynamicColDefs);
      }
    }

    if (
      changes.targetLayout &&
      changes.targetLayout.currentValue &&
      this.columnApi
    ) {
      // console.log('what is the target layout', changes.targetLayout.currentValue);
      const layout = this.parseLayout(changes.targetLayout.currentValue);

      // console.log('target layoutstate', layout);
      this.columnApi.setColumnState(layout);
    }

    if (
      changes.nonlinearData &&
      changes.nonlinearData.currentValue &&
      this.gridApi
    ) {
      this.gridApi.refreshCells({
        columns: this.nonlinearColumns,
      });
    }

    if (changes.isActive && changes.isActive.currentValue && this.columnApi) {
      this.triggerBoardcastDisplayColumns();
    }

    if (
      changes.targetColumn &&
      changes.targetColumn.currentValue &&
      this.gridApi &&
      this.isActive
    ) {
      this.gridApi.ensureColumnVisible(this.targetColumn);
      this.gridApi.flashCells({ columns: [this.targetColumn] });
    }

    if (
      changes.IsUnsettledClosingTradeStillAccruing &&
      changes.IsUnsettledClosingTradeStillAccruing.currentValue !== undefined &&
      this.gridApi
    ) {
      this.setIsUnsettledClosingTradeStillAccruingFilter();
    }

    if (
      changes.IsExcludeTestFundEnabled &&
      changes.IsExcludeTestFundEnabled.currentValue !== undefined &&
      this.gridApi
    ) {
      this.setIsExcludeTestFundEnabledFilter();
    }

    if (
      changes.commonGrouping &&
      changes.commonGrouping.currentValue &&
      this.gridApi
    ) {
      this._applyCommonGrouping(this.commonGrouping);
    }

    if (
      changes.regressionDynamicColumns &&
      changes.regressionDynamicColumns.currentValue &&
      this.gridApi
    ) {
      this._setUpRegressionDynamicColumns(this.regressionDynamicColumns);
    }

    if (
      changes.gridClearingStatus &&
      changes.gridClearingStatus.currentValue &&
      this.gridApi
    ) {
      const currentColumnState = this._clearDirectionalityFromState();
      this.dynamicColDefs = this._clearDirectionalityColumnsDef();
      this.gridApi.setColumnDefs([]);
      this.gridApi.setColumnDefs(this.dynamicColDefs);
      this.columnApi.setColumnState(currentColumnState);
    }

    if (
      changes.displayMode &&
      changes.displayMode.currentValue &&
      this.columnApi
    ) {
      this._adjustDirecationalityColumnStateByDisplayMode(this.displayMode);
    }

    if (
      (changes.nonlinearDataLoadedStatus &&
        changes.nonlinearDataLoadedStatus.currentValue) ||
      (changes.nonlinearPnlDataLoadedStatus &&
        changes.nonlinearPnlDataLoadedStatus.currentValue)
    ) {
      setTimeout(() => this._redrawGridCellUponNonlinearDataArrive(), 500);
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.closeToolPanel();
    if (this.dynamicColDefs) {
      this.gridApi.setColumnDefs(this.dynamicColDefs);
    }
  }

  // Event ----------------------------------------------------------------------------------

  public onUpdateUserGridConfig(newGridConfig: any) {
    this.updateUserGridConfig.emit(newGridConfig);
  }

  public onUpdateUserGroupingStyle(newGroupingStyle: any) {
    this.updateUserGroupingStyle.emit(newGroupingStyle);
  }

  public onUpdateUserLayoutStyle(newLayoutStyle: any) {
    this.updateUserLayoutStyle.emit(newLayoutStyle);
  }

  public onOpenSecurityEditor(event: RowNode) {
    this.dialog.open(SecurityEditorGeneralDialogComponent, {
      hasBackdrop: false,
      panelClass: ['event-analysis-pop-up-panel'],
      width: '80rem',
      height: '50rem',
      data: {
        sid: event.data['SID'],
        rowData: event.data,
      },
    });
  }

  // Uitlity ---------------------------------------------------------------------------------

  getFilters(params: CellClickedEvent) {
    const columnState = params.columnApi.getColumnState();
    columnState.shift();
    const groupingColumns = columnState.filter(
      (column) => column.rowGroupIndex !== null
    );
    groupingColumns.sort((a, b) => a.rowGroupIndex - b.rowGroupIndex);

    let currentNode: RowNode = params.node;
    const filters: { [property: string]: number }[] = [];
    do {
      if (currentNode.group === false) {
        filters.push({ sid: params.data['sid'] });
      } else {
        const curretGroupIndex = currentNode.rowGroupIndex;
        const filterName = groupingColumns[curretGroupIndex]['colId'];
        const filterKey = this.executionFiltersDict[filterName];
        if (filterKey) {
          filters.push({
            [filterKey]: currentNode.allLeafChildren[0].data[filterKey],
          });
        }
      }
      currentNode = currentNode.parent;
    } while (currentNode.id !== 'ROOT_NODE_ID');
    this.updatefilters.emit(filters);
  }

  getRowData() {
    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    return rowData;
  }

  public onUpdateUserLayoutList(event) {
    if (event) {
      this.updateUserLayoutList.emit(event);
    }
  }

  public onAutoGroupColumnFilterValueChange() {
    if (this.gridApi) {
      this.isExternalFilterPresent = true;
      this.gridApi.onFilterChanged();
    }
  }

  // -----------------------------------------------------------------------------------------

  private createColumnDefs(columnDefsRaw) {
    const dynamicColDefs = [];

    columnDefsRaw.forEach((colDefRaw) => {
      if (colDefRaw.children) {
        const basicColDef: ColGroupDef = {
          headerName: colDefRaw.headerName,
          children: this.createColumnDefs(colDefRaw.children),
        };

        dynamicColDefs.push(basicColDef);
      } else {
        const basicColDef: ColDef = {
          headerName: colDefRaw.headerName,
          field: colDefRaw.field,
          width: colDefRaw.width,
          hide: colDefRaw.hide,
          editable: colDefRaw.editable,
          cellStyle: (params) => {
            const targetField = params.colDef.field;

            if (this.userGridConfig['systemColor']) {
              if (this.systemStyle && this.systemStyle[targetField]) {
                return this.systemStyle[targetField];
              }
            }

            if (this.layoutStyle && this.layoutStyle[targetField]) {
              return this.layoutStyle[targetField];
            } else {
              return { background: 'initial' };
            }
          },
          pinned: colDefRaw.pinned,
          rowGroup: colDefRaw.rowGroup,
          rowGroupIndex: colDefRaw.rowGroupIndex,
          headerTooltip:
            colDefRaw.headerTooltip !== colDefRaw.headerName
              ? `${colDefRaw.headerName} <br/> ${colDefRaw.headerTooltip}`
              : colDefRaw.headerName,
          aggFunc: colDefRaw.aggFunc,
          suppressMenu:
            this.userGridConfig['columnMenu'] === true ||
            this.userGridConfig['columnMenu'] === undefined
              ? false
              : true,
        };

        if (colDefRaw.type.includes('numberColumn')) {
          if (colDefRaw.type.includes('thousands')) {
            basicColDef.valueFormatter =
              this.utilityService.formatNumberWithCommasAndDigit(
                colDefRaw.digit,
                { thousand: true }
              );
          } else if (colDefRaw.type.includes('percent')) {
            basicColDef.valueFormatter =
              this.utilityService.formatNumberWithCommasAndDigit(
                colDefRaw.digit,
                { percent: true }
              );
          } else {
            basicColDef.valueFormatter =
              this.utilityService.formatNumberWithCommasAndDigit(
                colDefRaw.digit
              );
          }
          basicColDef.filter = 'agNumberColumnFilter';
          basicColDef.cellClass = ['flex-end'];
        } else if (colDefRaw.type.includes('textColumn')) {
          if (colDefRaw.field === 'pm') {
            basicColDef.filter = 'agSetColumnFilter';
          } else {
            basicColDef.filter = 'agTextColumnFilter';
          }
        } else if (colDefRaw.type.includes('dropDownColumn')) {
          basicColDef.filter = 'agTextColumnFilter';
          basicColDef.cellEditor = 'agRichSelectCellEditor';
          basicColDef.cellEditorParams = {
            cellHeight: 30,
            values: this.lookups[colDefRaw.dictKey],
          };
        } else if (colDefRaw.type.includes('checkBoxColumn')) {
          basicColDef.filter = 'agSetColumnFilter';
          (basicColDef.cellRenderer = 'YieldbookCustomCheckboxComponent'),
            (basicColDef.cellRendererParams = {
              key: colDefRaw.field,
              defaultValue: colDefRaw.defaultValue,
            });
        } else if (colDefRaw.type.includes('dateColumn')) {
          basicColDef.filter = 'agTextColumnFilter';
          basicColDef.cellEditor = 'CutsomCellDateEditorComponent';
        } else if (colDefRaw.type.includes('expressionColumn')) {
          basicColDef.filter = 'agTextColumnFilter';
          if (typeof colDefRaw.expression === 'string') {
            basicColDef.valueGetter = colDefRaw.expression;
            basicColDef.valueFormatter =
              this.utilityService.formatNumberWithCommasAndDigit(
                colDefRaw.digit
              );
            basicColDef.filter = 'agNumberColumnFilter';
            basicColDef.cellClass = ['flex-end'];
          } else {
            basicColDef.valueGetter = colDefRaw.expression.join('');
          }
        }

        // Distinct Column type ----------------------------------------------------

        if (colDefRaw.type.includes('distinct')) {
          if (colDefRaw.type.includes('merge')) {
            // Notice complex logic involve !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            basicColDef.valueGetter = (params) => {
              if (params.node.level === 0 && params.node.group === false) {
                // no grouping, every is flat;
                return params.node.data[colDefRaw.targetColumn];
              } else if (
                params.node.level === 0 &&
                params.context.rowGrouping.indexOf('Firm') === 0
              ) {
                // at the root level and it is firm
                return params.context.getDistinctValues(
                  params.node.allLeafChildren.map(
                    (node) => node.data[colDefRaw.targetColumn]
                  )
                );
              } else {
                if (
                  params.context.rowGrouping.includes('fundName') === false &&
                  params.context.rowGrouping.includes('podName') === false &&
                  params.context.rowGrouping.includes('CrossFund') === false &&
                  params.context.rowGrouping.includes('CrossPodName') === false
                ) {
                  return params.api.getValue(
                    colDefRaw.field,
                    params.node.parent
                  );
                } else {
                  const fundNameGroupLevelIndex =
                    params.context.rowGrouping.indexOf('fundName');
                  const podNameGroupLevelIndex =
                    params.context.rowGrouping.indexOf('podName');
                  const CrossFundGroupLevelIndex =
                    params.context.rowGrouping.indexOf('CrossFund');
                  const CrossPodNameGroupLevelIndex =
                    params.context.rowGrouping.indexOf('CrossPodName');
                  const currentLevel = params.node.level;

                  if (
                    currentLevel === fundNameGroupLevelIndex &&
                    (fundNameGroupLevelIndex < podNameGroupLevelIndex ||
                      podNameGroupLevelIndex === -1)
                  ) {
                    return params.context.getDistinctValues(
                      params.node.allLeafChildren.map(
                        (node) => node.data[colDefRaw.targetColumn]
                      )
                    );
                  } else if (currentLevel === podNameGroupLevelIndex) {
                    // Small Flat for podname with prifix 'SC'
                    // if (params.node.key && params.node.key.startsWith('SC')) {
                    //   return '';
                    // }
                    return params.context.getDistinctValues(
                      params.node.allLeafChildren.map(
                        (node) => node.data[colDefRaw.mergeColumn]
                      )
                    );
                  } else if (
                    currentLevel === CrossFundGroupLevelIndex &&
                    (CrossFundGroupLevelIndex < CrossPodNameGroupLevelIndex ||
                      CrossPodNameGroupLevelIndex === -1)
                  ) {
                    return params.context.getDistinctValues(
                      params.node.allLeafChildren.map(
                        (node) => node.data[colDefRaw.targetColumn]
                      )
                    );
                  } else if (currentLevel === CrossPodNameGroupLevelIndex) {
                    // Small Flat for crossPodname with prifix 'SC'
                    // if (params.node.key && params.node.key.startsWith('SC')) {
                    //   return '';
                    // }
                    return params.context.getDistinctValues(
                      params.node.allLeafChildren.map(
                        (node) => node.data[colDefRaw.mergeColumn]
                      )
                    );
                  } else if (
                    (podNameGroupLevelIndex !== -1 &&
                      currentLevel > podNameGroupLevelIndex) ||
                    (CrossPodNameGroupLevelIndex !== -1 &&
                      currentLevel > CrossPodNameGroupLevelIndex)
                  ) {
                    // if (params.node.group === true) {
                    //   return params.context.getDistinctValues(params.node.allLeafChildren.map(node => node.data[colDefRaw.mergeColumn]));
                    // } else {
                    //   return params.node.data[colDefRaw.mergeColumn] // in line item level
                    // }

                    // Small Flat for parent crossPodname/PodName with prifix 'SC'
                    if (
                      params.node.group === true &&
                      params.context._checkIfParentPathContain_SC_value(
                        params.node
                      )
                    ) {
                      return '';
                    }

                    if (
                      params.node.group === true &&
                      (currentLevel === fundNameGroupLevelIndex ||
                        currentLevel === CrossFundGroupLevelIndex)
                    ) {
                      return params.context.getDistinctValues(
                        params.node.allLeafChildren.map(
                          (node) => node.data[colDefRaw.mergeColumn]
                        )
                      );
                    } else {
                      return params.api.getValue(
                        colDefRaw.field,
                        params.node.parent
                      );
                    }
                  } else {
                    return params.api.getValue(
                      colDefRaw.field,
                      params.node.parent
                    );
                  }
                }
              }
            };
          } else {
            basicColDef.valueGetter = (params) => {
              // Special Case
              if (colDefRaw.field === 'PodLeveredCapital') {
                if (
                  this._checkPodOrCrossPodNotPresentInBetweenCrossFundGroupingPath(
                    params.node
                  )
                ) {
                  return null;
                }
              }

              if (params.node.group === true) {
                return this.getDistinctValues(
                  params.node.allLeafChildren.map(
                    (node) => node.data[colDefRaw.field]
                  )
                );
              } else {
                return params.node.data[colDefRaw.field];
              }
            };
          }
        }

        // -------------------------------

        if (colDefRaw.type.includes('nonlinear')) {
          basicColDef.valueGetter = (params) => {
            let nonlinearData;
            if (params.node.group === false) {
              nonlinearData =
                this.primaryGroupingNameIdMaping &&
                this.nonlinearDataLoader(
                  params,
                  params.node.data['securityName']
                );
            } else {
              nonlinearData =
                this.primaryGroupingNameIdMaping &&
                this.nonlinearDataLoader(params, params.node.groupData);
            }

            if (
              colDefRaw.field.includes('TotalPL_') &&
              this.isOnCurrentDate === true
            ) {
              // if the nonlinear data is not avaliable, treat it as 0 (do not add the PnlAllIn)
              if (
                nonlinearData === null ||
                nonlinearData === undefined ||
                nonlinearData === ''
              ) {
                // return null;
                nonlinearData = 0;
              }

              if (params.node.group === false) {
                nonlinearData = (nonlinearData || 0) + params.data['PnLAllIn'];
              } else {
                nonlinearData =
                  (nonlinearData || 0) + params.node.aggData['PnLAllIn'];

                // blank those value if on firm level
                if (params.node.field === 'Firm') {
                  return undefined;
                }
              }
            }
            return nonlinearData;
          };
          this.nonlinearColumns.push(colDefRaw.field);
        }

        if (colDefRaw.type.includes('nonlinear-rt')) {
          basicColDef.valueGetter = (params: ValueGetterParams) => {
            let nonlinearData;
            if (params.node.group === false) {
              nonlinearData =
                this.primaryGroupingNameIdMaping &&
                this.nonlinearPnlDataLoader(params, basicColDef.field);
            } else {
              nonlinearData =
                this.primaryGroupingNameIdMaping &&
                this.nonlinearPnlDataLoader(params, basicColDef.field);
            }
            return nonlinearData;
          };
        }

        if (colDefRaw.type.includes('weightedAverage')) {
          basicColDef.valueGetter = (params) => {
            const targetNode = params.node;
            const colA = colDefRaw.weightAverageColumns[0];
            const colB = colDefRaw.weightAverageColumns[1];
            if (params.node.group) {
              const sumAwithWeight = targetNode.allLeafChildren.reduce(
                (value, node) => {
                  let valueA;
                  let valueB;
                  if (typeof node.data[colA] === 'string') {
                    valueA =
                      node.data[colA] === '' ? 0 : parseFloat(node.data[colA]);
                  } else {
                    valueA = node.data[colA];
                  }

                  if (typeof node.data[colB] === 'string') {
                    valueB =
                      node.data[colB] === '' ? 0 : parseFloat(node.data[colB]);
                  } else {
                    valueB = node.data[colB];
                  }
                  return value + valueA * Math.abs(valueB);
                },
                0
              );

              const sumB = targetNode.allLeafChildren.reduce((value, node) => {
                let valueB;
                if (typeof node.data[colB] === 'string') {
                  valueB =
                    node.data[colB] === '' ? 0 : parseFloat(node.data[colB]);
                } else {
                  valueB = node.data[colB];
                }
                return value + Math.abs(valueB);
              }, 0);
              if(sumB === 0){
                return null
              } else {
                return sumAwithWeight / sumB;
              }
            } else {
              return targetNode.data[colDefRaw.field];
            }
          };
        }

        if (colDefRaw.type.includes('booleanAggregation')) {
          basicColDef.valueGetter = (params) => {
            const targetNode = params.node;
            if (targetNode.group === false) {
              return targetNode.data[colDefRaw.field];
            } else {
              const allChildren = targetNode.allLeafChildren
                .map((node) => node)
                .filter((node) => {
                  if (this.IsUnsettledClosingTradeStillAccruing === true) {
                    return (
                      node.data['IsUnsettledClosingTradeStillAccruing'] ===
                      'False'
                    );
                  } else {
                    return true;
                  }
                });

              const allChildrenData = allChildren.map(
                (node) => node.data[colDefRaw.field]
              );

              let trueCount = 0;
              let totalCount = 0;
              allChildrenData.forEach((value) => {
                if (value === 'True') {
                  trueCount++;
                  totalCount++;
                } else if (value === 'False') {
                  totalCount++;
                }
              });
              return trueCount + '/' + totalCount;
            }
          };
        }

        if (colDefRaw.type.includes('distinctName')) {
          basicColDef.valueGetter = (params) => {
            if (params.node.group === true) {
              return this.getDistinctName(
                params.node.allLeafChildren.map(
                  (node) => node.data[colDefRaw.field]
                )
              );
            } else {
              return params.node.data[colDefRaw.targetColumn];
            }
          };
        }

        // ------------------------------------------

        if (colDefRaw.type.includes('totalPnlType')) {
          basicColDef.valueGetter = (params) => {
            const targetPreValue = params.api.getValue(
              colDefRaw['totalPnlTypeTargetField'],
              params.node
            );
            const intradDayPnl = params.api.getValue('PnLAllIn', params.node);
            if (this.mode === 'live') {
             // scientific notation fix 
              return targetPreValue !== undefined
                ? Number(intradDayPnl) + Number(targetPreValue)
                : null;
            } else {
              if (!this.isOnCurrentDate) {
                return targetPreValue !== undefined
                  ? intradDayPnl + targetPreValue
                  : null;
              } else {
                const includeIntradayPL =
                  this.nonlinearPnlData['includeIntradayPL'];
                if (includeIntradayPL === true) {
                  return targetPreValue !== undefined
                    ? intradDayPnl + targetPreValue
                    : null;
                } else {
                  return targetPreValue !== undefined ? targetPreValue : null;
                }
              }
            }
          };
        }

        // Derivative Column----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if (colDefRaw.rowGroup === true) {
          this.rowGrouping.push(colDefRaw);
        }

        dynamicColDefs.push(basicColDef);

        if (colDefRaw.hasBpsToPod) {
          const bpsToPodColDef = Object.assign({}, basicColDef, {
            headerName: colDefRaw.headerName + '-BpsToPod',
            field: colDefRaw.field + '-BpsToPod',
            headerTooltip: basicColDef.headerTooltip + ' in (bpsToPod)',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(
              colDefRaw.digit,
              { zeroCutOff: true }
            ),
            aggFunc: null,
            valueGetter: (params: ValueGetterParams) => {


              const targetPodLevel = this.rowGrouping.indexOf('podName');
              const targetCrossPodLevel = this.rowGrouping.indexOf('CrossPodName');

              const myCurrentGroupingLevel = params.node.level;
              const leafLevel = this.rowGrouping.length;

              let targetPodValue;


              // check for special case (where there is no crossPod/pod in between crossfund and its ancestor)
              if (
                this._checkPodOrCrossPodNotPresentInBetweenCrossFundGroupingPath(
                  params.node
                )
              ) {
                // return 'LevFundCap';
                targetPodValue = params.getValue('FundLeveredCapital'); 
              }

              // Check if the current node or its parent nodes contain SC
              // if (params.node.key && params.node.key.startsWith('SC')) {
              //   return '';
              // }
              if (
                params.node.group === true &&
                params.context._checkIfParentPathContain_SC_value(params.node)
              ) {
                return '';
              }


              // if no fund or cross fund above, use pod lev

              if (targetPodLevel === -1 && targetCrossPodLevel === -1) {
                // Use pod levered capital if podName and crossPodName are not in the grouping
                targetPodValue = params.getValue('PodLeveredCapital'); // use the level fund Value
              } else {
                const podLevelCollection = [
                  targetPodLevel,
                  targetCrossPodLevel,
                ].filter((num) => num !== -1);
                const podTrigger = Math.min(...podLevelCollection);
                if (myCurrentGroupingLevel >= podTrigger) {
                  // if the current grouping level is bigger than the pod level or the crossPodName Level
                  if(myCurrentGroupingLevel === leafLevel){
                    targetPodValue = params.getValue('PodLeveredCapital'); // use the level pod Value
                  } else {
                    targetPodValue = params.getValue('FundCapital Merge'); // capital column
                  }

                } else {
                  // if the current grouping level is smaller than the pod level
                  // return 'LevFundCap'
                  targetPodValue = params.getValue('FundLeveredCapital'); 
                }
              }
              const targetNonlinearValue = params.getValue(colDefRaw.field);
            
              if (
                targetNonlinearValue !== undefined &&
                targetPodValue !== undefined &&
                targetPodValue !== 0 && 
                typeof targetPodValue === 'number'
              ) {
                return (targetNonlinearValue / targetPodValue) * 10000;
              } else {
                return null;
              }
            },
          });
          dynamicColDefs.push(bpsToPodColDef);
        }

        if (colDefRaw.hasBpsToFund) {
          const bpsToFundColDef = Object.assign({}, basicColDef, {
            headerName: colDefRaw.headerName + '-BpsToFund',
            field: colDefRaw.field + '-BpsToFund',
            headerTooltip: basicColDef.headerTooltip + ' in (bpsToFund)',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(
              colDefRaw.digit,
              { zeroCutOff: true }
            ),
            aggFunc: null,
            valueGetter: (params: ValueGetterParams) => {
              const targetNonlinearValue = params.getValue(colDefRaw.field);
              const targetFundValue = params.getValue('FundCapital'); // use the un-level fund value

              const useFundLeveredCapital: boolean = this.useFundLeveredCapital(params.node);

              if(useFundLeveredCapital){
                const targetFundLeveredValue = params.getValue('FundLeveredCapital');
                const val = targetNonlinearValue/targetFundLeveredValue * 10000;
                return isNaN(val) ? null : val;
                // return 'LevFundCap'
                // return targetFundLeveredValue
                // return targetNonlinearValue/targetFundLeveredValue * 10000
              }

              if (targetNonlinearValue && targetFundValue) {
                const val = (targetNonlinearValue / targetFundValue) * 10000;
                return isNaN(val) ? null : val
                // return 'FundCap'
                // return targetFundValue
                // return (targetNonlinearValue / targetFundValue) * 10000;
              } else {
                return null;
              }
            },
          });

          dynamicColDefs.push(bpsToFundColDef);
        }

        if (colDefRaw.hasBpsToLeveredFund) {
          const bpsToLeveredFundColDef = Object.assign({}, basicColDef, {
            headerName: colDefRaw.headerName + '-BpsToLeveredFund',
            field: colDefRaw.field + '-BpsToLeveredFund',
            headerTooltip: basicColDef.headerTooltip + ' in (BpsToLeveredFund)',
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(
              colDefRaw.digit,
              { zeroCutOff: true }
            ),
            aggFunc: null,
            valueGetter: (params: ValueGetterParams) => {
              const targetNonlinearValue = params.getValue(colDefRaw.field);
              const targetFundValue = params.getValue('FundLeveredCapital'); // use the level fund value

              if (targetNonlinearValue && targetFundValue) {
                const val = (targetNonlinearValue / targetFundValue) * 10000;
                return isNaN(val) ? null : val
                return (targetNonlinearValue / targetFundValue) * 10000;
              } else {
                return null;
              }
            },
          });

          dynamicColDefs.push(bpsToLeveredFundColDef);
        }

        if (colDefRaw.hasPctToFund) {
          const pctToFundColDef = Object.assign({}, basicColDef, {
            headerName: colDefRaw.headerName + '-PctToFund',
            field: colDefRaw.field + '-PctToFund',
            headerTooltip: basicColDef.headerTooltip + ' in (PctToFund)',
            valueFormatter:
              this.utilityService.formatNumberWithCommasAndDigit(2),
            aggFunc: null,
            valueGetter: (params: ValueGetterParams) => {
              const targetNodeValue = params.getValue(colDefRaw.field);
              const targetFundValue = params.getValue('FundCapital'); // use the un-level fund value

              if (targetNodeValue && targetFundValue) {
                return (targetNodeValue / targetFundValue) * 100;
              } else {
                return null;
              }
            },
          });
          dynamicColDefs.push(pctToFundColDef);
        }

        if (colDefRaw.style) {
          basicColDef.cellStyle = Object.assign(
            {},
            basicColDef.cellStyle,
            colDefRaw.style
          );
        }

        // Special Type flag column
        if (colDefRaw.type.includes('sameSumSummary')) {
          basicColDef.valueGetter = (params) => {
            if (params.node.group) {
              if (params.node.field === 'SecurityName') {
                const targetValue =
                  params.node.allLeafChildren[0].data[colDefRaw.field];
                return targetValue;
              } else {
                return null;
              }
            } else {
              return params.node.data[colDefRaw.field];
            }
          };
        }
      }
    });

    return dynamicColDefs;
  }

  private nonlinearDataLoader(params: ValueGetterParams, position?: string) {
    const targetField = params.colDef.field;
    if (params.node.field === 'Firm' && params.node.level === 0) {
      return this.positionViewerService.getNonlinearDataForFirm(
        targetField,
        this.nonlinearData
      );
    } else {
      const formatTreePath =
        this.positionViewerService.getNonlinearDataPathAdvance(params.node);
      const nonlinearData = this.positionViewerService.getNonLinearData(
        formatTreePath,
        targetField,
        this.nonlinearData,
        position
      );

      return nonlinearData;
    }
  }

  private nonlinearPnlDataLoader(
    params: ValueGetterParams,
    targetField: string
  ) {
    if (params.node.field === 'Firm' && params.node.level === 0) {
      return this.positionViewerService.getNonlinearDataForFirm(
        targetField,
        this.nonlinearPnlData
      );
    } else {
      const formatTreePath =
        this.positionViewerService.getNonlinearDataPathAdvance(params.node);
      const nonlinearData = this.positionViewerService.getNonLinearData(
        formatTreePath,
        targetField,
        this.nonlinearPnlData
      );
      return nonlinearData;
    }
  }

  private _getNonlinearDataColumnInfo(targetField) {
    if (this.nonlinearData.columns === undefined) {
      return undefined;
    }

    const valueLocatorIndex = this.nonlinearData.columns.indexOf(targetField);

    return valueLocatorIndex;
  }

  private sendColumnGrouping(fields: string[]) {
    this.currentGrouping.emit(
      this.positionViewerService.prepareColumnGroupingForServer(fields)
    );
  }

  private parseLayout(targetLayoutRaw) {
    let layout = targetLayoutRaw.layout;
    const fullOriginLayout = this.columnApi.getColumnState();

    const layoutDict: any = {};
    layout.forEach((col) => {
      layoutDict[col.colId] = col;
    });

    // this will merge the user layout with the latest layout dict in the backend

    fullOriginLayout.forEach((col: any) => {
      if (layoutDict[col.colId]) {
        const sumFunction = col.aggFunc;
        layoutDict[col.colId] = Object.assign(col, layoutDict[col.colId], {
          aggFunc: sumFunction,
        });
      } else {
        col.hide = true;
        col.order = null;
        layoutDict[col.colId] = col;
      }
    });

    layout = Object.keys(layoutDict)
      .map((key) => layoutDict[key])
      .sort((a, b) => a.order - b.order);

    return layout;
  }

  private triggerBoardcastDisplayColumns() {
    const displayColumns: {
      headerName: string;
      field: string;
      group: string;
    }[] = [];
    const displayColumnGroups = this.columnApi.getAllDisplayedColumnGroups();
    displayColumnGroups.shift();

    displayColumnGroups.forEach((group: any) => {
      group.children.forEach((col) => {
        displayColumns.push({
          headerName: col.colDef.headerName,
          field: col.colDef.field,
          group: group.originalColumnGroup.colGroupDef.headerName,
        });
      });
    });
    this.boardcastDisplayColumns.emit(displayColumns);
  }

  private getDistinctValues(values: any[]) {
    if (values && values.length && values.length > 0) {
      const uniqueValueArray = _.uniq(values);
      return uniqueValueArray.reduce((a, b) => {
        if (typeof b === 'number') {
          return a + b;
        } else {
          return a;
        }
      }, 0);
    } else {
      return null;
    }
  }

  private getDistinctName(values: string[]) {
    const uniqueValueArray = _.uniq(values);
    if (uniqueValueArray.length === 1) {
      return uniqueValueArray[0];
    } else {
      return '';
    }
  }

  private applyTargetManagerFilter(targetManagers: string[]) {
    const portfolioManagerFilter: any = this.gridApi.getFilterInstance('pm');

    if (portfolioManagerFilter) {
      if (targetManagers === undefined) {
        portfolioManagerFilter.setModel(null);
      } else if (targetManagers.some((name) => name === 'all')) {
        portfolioManagerFilter.setModel(null);
      } else {
        const targetManagersCopy = [...targetManagers];
        if (targetManagersCopy.indexOf('') !== -1) {
          const locator = targetManagersCopy.indexOf('');
          targetManagersCopy[locator] = null;
        }
        portfolioManagerFilter.setModel({
          values: [...targetManagersCopy],
        });
      }
      this.gridApi.onFilterChanged();
    }
  }

  private expandTheFirstLevelnode() {
    setTimeout(() => {
      this.gridApi.forEachNode((node) => {
        if (node.group && node.level === 0) {
          node.setExpanded(true);
        }
      });
    }, 500);
  }

  private setIsUnsettledClosingTradeStillAccruingFilter() {
    const filterModel = this.gridApi.getFilterInstance(
      'IsUnsettledClosingTradeStillAccruing'
    );
    if (this.IsUnsettledClosingTradeStillAccruing === true) {
      filterModel.setModel({
        type: 'endsWith',
        filter: 'False',
      });
    } else {
      filterModel.setModel(null);
    }
    this.gridApi.onFilterChanged();
    this.gridApi.refreshCells({ columns: ['HasClosingPrc'] });
  }

  private setIsExcludeTestFundEnabledFilter() {
    const filterModel = this.gridApi.getFilterInstance('fundID');
    if (this.IsExcludeTestFundEnabled === true) {
      filterModel.setModel({
        type: 'notEqual',
        filter: '7',
      });
    } else {
      filterModel.setModel(null);
    }
    this.gridApi.onFilterChanged();
  }

  public onTogglePeriodicPullingStatus(event: boolean) {
    this.togglePeriodicPullingStatus.emit(event);
  }

  public onBackupGridSetting(event) {
    this.backupGridSetting.emit(true);
  }

  private _applyCommonGrouping(grouping: string[]) {
    const currentColumnState = this.columnApi.getColumnState();
    currentColumnState.forEach((element) => {
      const index = grouping.indexOf(element.colId);
      if (index !== -1) {
        element.rowGroupIndex = index;
      } else {
        element.rowGroupIndex = null;
      }
    });
    this.columnApi.setColumnState(currentColumnState);
  }

  private _checkIfParentPathContain_SC_value(node: RowNode) {
    return false;
  }

  // Regression function -------------------------------------------------------------

  private _setUpRegressionDynamicColumns(regressionColRaw) {
    let currentColumnState = this._clearDirectionalityFromState();
    this.dynamicColDefs = this._clearDirectionalityColumnsDef();

    // creat the new regression dynamic cols def and added into colDefs

    const colDefs: ColDef[] = [];
    regressionColRaw.forEach((rawCol) => {
      const colDef: ColDef = {
        headerName: rawCol.name,
        field: rawCol.field,
        headerTooltip: rawCol.name,
        width: 100,
        valueFormatter: rawCol.field.includes('rsquared')
          ? this.utilityService.formatNumberWithCommasAndDigit(2, {
              percent: true,
            })
          : this.utilityService.formatNumberWithCommasAndDigit(0),
        valueGetter: (params) => {
          let nonlinearData;
          if (params.node.group === false) {
            nonlinearData =
              this.primaryGroupingNameIdMaping &&
              this._nonlinearDataLoaderForRegression(
                params,
                params.node.data['securityName']
              );
          } else {
            nonlinearData =
              this.primaryGroupingNameIdMaping &&
              this._nonlinearDataLoaderForRegression(
                params,
                params.node.groupData
              );
          }
          return nonlinearData;
        },
      };
      colDefs.push(colDef);

      if (rawCol.field.includes('beta')) {
        const colDef_bpsToFund: ColDef = {
          headerName: rawCol.name + '-bpsToFund',
          field: '-bpsToFund' + rawCol.field,
          headerTooltip: rawCol.name + ' in (bpsToFund)',
          width: 100,
          valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(
            0,
            { zeroCutOff: true }
          ),
          valueGetter: (params) => {
            const targetNonlinearValue = params.getValue(rawCol.field);
            const targetFundValue = params.getValue('FundCapital'); // use the un-level fund value

            if (targetNonlinearValue && targetFundValue) {
              return (targetNonlinearValue / targetFundValue) * 10000;
            } else {
              return null;
            }
          },
        };

        const colDef_bpsToPod: ColDef = {
          headerName: rawCol.name + '-bpsToPod',
          field: 'bpsToPod-' + rawCol.field,
          headerTooltip: rawCol.name + ' in (bpsToPod)',
          width: 100,
          valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(
            0,
            { zeroCutOff: true }
          ),
          valueGetter: (params) => {
            // Check if the current node or its parent nodes contain SC
            // if (params.node.key && params.node.key.startsWith('SC')) {
            //   return '';
            // }
            if (
              params.node.group === true &&
              params.context._checkIfParentPathContain_SC_value(params.node)
            ) {
              return '';
            }

            const targetPodLevel = this.rowGrouping.indexOf('podName');
            const targetCrossPodLevel =
              this.rowGrouping.indexOf('CrossPodName');
            const myCurrentGroupingLevel = params.node.level;
            let targetPodValue;

            if (targetPodLevel === -1 && targetCrossPodLevel === -1) {
              // Use fund captial if podName and crossPodName are not in the grouping
              targetPodValue = params.getValue('FundCapital'); // use the level fund Value
            } else {
              const podLevelCollection = [
                targetPodLevel,
                targetCrossPodLevel,
              ].filter((num) => num !== -1);
              const podTrigger = Math.min(...podLevelCollection);
              if (myCurrentGroupingLevel >= podTrigger) {
                // if the current grouping level is bigger than the pod level or the crossPodName Level
                targetPodValue = params.getValue('PodLeveredCapital'); // use the level pod Value
              } else {
                // if the current grouping level is smaller than the pod level
                targetPodValue = params.getValue('FundCapital'); // use the level pod Value
              }
            }
            const targetNonlinearValue = params.getValue(rawCol.field);
            // const targetPodValue = params.getValue('PodLeveredCapital');   // use the level pod Value

            if (
              targetNonlinearValue !== undefined &&
              targetPodValue !== undefined &&
              targetPodValue !== 0
            ) {
              return (targetNonlinearValue / targetPodValue) * 10000;
            } else {
              return null;
            }
          },
        };
        colDefs.push(colDef_bpsToFund);
        colDefs.push(colDef_bpsToPod);
      }
    });

    const regressionColDef: ColGroupDef = {
      headerName: 'Directionality - Regression',
      children: colDefs,
    };

    this.dynamicColDefs.push(regressionColDef);
    // this.gridApi.setColumnDefs([]);  // avoid this combination which put instant high pressure on the grid
    this.gridApi.setColumnDefs([...this.dynamicColDefs]);

    // add the new regression dynamic cols into the current column state
    colDefs.forEach((colDef) => {
      currentColumnState.push({
        colId: colDef.field,
      });
    });
    currentColumnState = [...currentColumnState];

    setTimeout(() => this.columnApi.setColumnState(currentColumnState), 500);
    setTimeout(
      () =>
        this._adjustDirecationalityColumnStateByDisplayMode(this.displayMode),
      1000
    );
  }

  private _nonlinearDataLoaderForRegression(
    params: ValueGetterParams,
    position?: string
  ) {
    const targetField = params.colDef.field;
    const formatTreePath =
      this.positionViewerService.getNonlinearDataPathAdvance(params.node);
    const nonlinearData = this.positionViewerService.getNonLinearData(
      formatTreePath,
      targetField,
      this.regressionNonlinearData,
      position
    );
    return nonlinearData;
  }

  private _clearDirectionalityColumnsDef() {
    const result = this.dynamicColDefs.filter(
      (colGroup: ColGroupDef) =>
        colGroup.headerName !== 'Directionality - Regression'
    );
    return result;
  }

  private _clearDirectionalityFromState() {
    let columnState = this.columnApi.getColumnState();
    columnState = columnState.filter(
      (col) => !col.colId.includes('directionality')
    );
    return columnState;
  }

  private _adjustDirecationalityColumnStateByDisplayMode(mode: string) {
    let columnState = this.columnApi.getColumnState();
    const targetColumnState = columnState.filter((col) =>
      col.colId.includes('directionality')
    );
    targetColumnState.forEach((col) => {
      const suffix = col.colId.split(':').pop();
      if (mode === 'percent') {
        if (suffix === 'beta_std') {
          col.hide = true;
        } else if (suffix === 'beta') {
          col.hide = false;
        }
      } else if (mode === 'stdev') {
        if (suffix === 'beta') {
          col.hide = true;
        } else {
          col.hide = false;
        }
      }
    });
    columnState = [...columnState];
    this.columnApi.setColumnState(columnState);
  }

  public useFundLeveredCapital(node: RowNode){
    const currentLevel = node.level;
    const fundLevel = this.rowGrouping.indexOf('fundName');
    const crossFundLevel = this.rowGrouping.indexOf('CrossFund');

    let relevantLevels = [node.level];

    if(fundLevel > -1){
      relevantLevels.push(fundLevel)
    }
    // if(crossFundLevel > -1){
    //   relevantLevels.push(crossFundLevel)
    // }

    // if Fund is not an ancestors of the current grouping level
    if(Math.min(...relevantLevels) === currentLevel ){
      // if current level is one of the four named categories
      if(relevantLevels.filter(x => x === currentLevel).length > 1){
        // if currentLevel is crossFund
        return currentLevel === crossFundLevel ? true :  false
      } 
      return true
    } 
  }


  private _redrawGridCellUponNonlinearDataArrive() {
    this.gridApi.redrawRows();
  }

  private _checkPodOrCrossPodNotPresentInBetweenCrossFundGroupingPath(
    node: RowNode
  ) {
    const currentLevel = node.level;
    const podNameLevel = this.rowGrouping.indexOf('podName');
    const crossPodNameLevel = this.rowGrouping.indexOf('CrossPodName');
    const crossFundLevel = this.rowGrouping.indexOf('CrossFund');

    if (crossFundLevel === -1) {
      return false;
    }

    if (podNameLevel === -1 && crossPodNameLevel === -1) {
      if (currentLevel <= crossFundLevel) {
        return true;
      }
    } else {
      if (crossPodNameLevel !== -1) {
        if (
          crossPodNameLevel > crossFundLevel &&
          currentLevel <= crossFundLevel
        ) {
          return true;
        } else if (crossPodNameLevel < crossFundLevel) {
          return false;
        }
      }

      if (podNameLevel !== -1) {
        if (podNameLevel > crossFundLevel && currentLevel <= crossFundLevel) {
          return true;
        } else if (podNameLevel < crossFundLevel) {
          return false;
        }
      }
    }
  }
}