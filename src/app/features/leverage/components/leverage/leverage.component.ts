import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, ValueGetterParams, ColDef, RowNode } from 'ag-grid-community';
import * as _ from 'lodash';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

import { UtilityService } from 'src/app/services';


@Component({
    selector: 'app-leverage',
    templateUrl: './leverage.component.html',
    styleUrls: ['./leverage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeverageComponent implements OnInit, OnChanges {

    @Input() leverage: any;
    @Input() leverageLoading: boolean;
    @Input() leverageLoaded: boolean;
    @Input() leverageError: string;

    @Output() sendTimeStamp = new EventEmitter<string>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    private grouping: string[];
    private groupingAttributes: string[];
    private columns: string[];
    public flatLeafData: any[];
    public maxTimeStamp: string;

    public extraOption = {
        autoSizeColumns: true
    };

    public customGridOption: GridOptions = {
        toolPanelSuppressRowGroups: true,
        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                        params.colDef.field.toLowerCase().includes('id') === false ?
                        {'justify-content': 'flex-end'} : { };
            },
            cellClass: 'right-border',
            filter: 'agNumberColumnFilter',
            valueFormatter:  params => {
              if ( typeof params.value === 'number' && params.colDef.field.toLowerCase().includes('id') === false) {
                return this.utilityService.formatNumberWithCommasAndDigit(3)(params);
              }
            },
        },

        autoGroupColumnDef: {
            pinned: 'left',
            cellRendererParams: {
                suppressCount: true,
            },
            headerName: 'Group',
            field: 'Position',
            cellRenderer: 'agGroupCellRenderer',
            width: 370,
            sort: 'asc',
            comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
              if (valueA !== undefined && valueB !== undefined) {
                return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
              }
            },
          },

        columnDefs: [
            {headerName: 'FundCapital', field: 'FundCapital', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)},
            // {headerName: 'PodCapital', field: 'PodCapital', valueGetter: this._getNonlinearData.bind(this)},
            // {headerName: 'FundLeveredCapital', field: 'FundLeveredCapital', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'PodLeveredCapital', field: 'PodLeveredCapital', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)},
            {headerName: 'MVUSD', field: 'MVUSD', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)},
            {headerName: 'GrossLeverage', field: 'GrossLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'NetLeverage', field: 'NetLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'NetLongLeverage', field: 'NetLongLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'NetShortLeverage', field: 'NetShortLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OnBalanceLeverage', field: 'OnBalanceLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OnBalanceLongLeverage', field: 'OnBalanceLongLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OnBalanceShortLeverage', field: 'OnBalanceShortLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OffBalanceLeverage', field: 'OffBalanceLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OffBalanceLongLeverage', field: 'OffBalanceLongLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OffBalanceShortLeverage', field: 'OffBalanceShortLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Gross10YrEquivLeverage', field: 'Gross10YrEquivLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Gross10YrEquivLeverageExclude10YrEqv', field: 'Gross10YrEquivLeverageExclude10YrEqv', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Net10YrEquivLeverage', field: 'Net10YrEquivLeverage', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Net10YrEquivLeverageExclude10YrEqv', field: 'Net10YrEquivLeverageExclude10YrEqv', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'GrossLeverage_Pod', field: 'GrossLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'NetLeverage_Pod', field: 'NetLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'NetLongLeverage_Pod', field: 'NetLongLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'NetShortLeverage_Pod', field: 'NetShortLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OnBalanceLeverage_Pod', field: 'OnBalanceLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OnBalanceLongLeverage_Pod', field: 'OnBalanceLongLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OnBalanceShortLeverage_Pod', field: 'OnBalanceShortLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OffBalanceLeverage_Pod', field: 'OffBalanceLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OffBalanceLongLeverage_Pod', field: 'OffBalanceLongLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'OffBalanceShortLeverage_Pod', field: 'OffBalanceShortLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Gross10YrEquivLeverage_Pod', field: 'Gross10YrEquivLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Gross10YrEquivLeverageExclude10YrEqv_Pod', field: 'Gross10YrEquivLeverageExclude10YrEqv_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Net10YrEquivLeverage_Pod', field: 'Net10YrEquivLeverage_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Net10YrEquivLeverageExclude10YrEqv_Pod', field: 'Net10YrEquivLeverageExclude10YrEqv_Pod', valueGetter: this._getNonlinearData.bind(this)},
            {headerName: 'Ten10YrEquiv', field: 'Ten10YrEquiv', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)},
            {headerName: 'DollarDurationOneBp', field: 'DollarDurationOneBp', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)},

            {headerName: 'Exposure', field: 'Exposure', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(3)},
            {headerName: 'ExposureLong', field: 'ExposureLong', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(3)},
            {headerName: 'ExposureShort', field: 'ExposureShort', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(3)},
            { headerName: 'NetExposurePctToFund', field: 'NetExposurePctToFund', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatPercentNumberFormatterMultiply100OrZero(3)},
            { headerName: 'NetLongExposurePctToFund', field: 'NetLongExposurePctToFund', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatPercentNumberFormatterMultiply100OrZero(3)},
            { headerName: 'NetShortExposurePctToFund', field: 'NetShortExposurePctToFund', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatPercentNumberFormatterMultiply100OrZero(3)},
            {headerName: 'TenYrEquivLongLeverage', field: 'TenYrEquivLongLeverage', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(3)},
            {headerName: 'TenYrEquivShortLeverage', field: 'TenYrEquivShortLeverage', valueGetter: this._getNonlinearData.bind(this), valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(3)},


        ],
        suppressAggFuncInHeader: true,

        getContextMenuItems: params => {

            const getNonlinearDataPath = {
                name: 'Get Nonlinear Data Path (Dev)',
                icon: '<i class="material-icons small-menu-icon">construction</i>',
                action: () => {
                    let path = this._getNonlinearDataPath(params.node.level, params.node);
                    if (params.node.group) {
                        path = path.join('      ');
                    }
                    const targetColumnIndex = this.columns.indexOf(params.column.getColId());
                    setTimeout(() => alert('Nonlinear Data Path is: ' + path + '\n targetColumn Index: ' + targetColumnIndex), 100);
                }
            };

            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', getNonlinearDataPath];
        },

        getRowNodeId: data => data['id'],
        rowClass: 'medium-row',
        rowHeight: 22,
        headerHeight: 24,
        deltaRowDataMode: true,

        sideBar: {
            defaultToolPanel: 'columns',
            toolPanels: [
                {
                  id: 'columns',
                  labelDefault: 'Columns',
                  labelKey: 'columns',
                  iconKey: 'columns',
                  toolPanel: 'agColumnsToolPanel',
                  toolPanelParams: {
                    // suppressRowGroups: true,
                    suppressValues: true,
                    suppressPivots: true,
                    suppressPivotMode: true,
                    suppressSideButtons: true,
                    suppressColumnFilter: true,
                    suppressColumnSelectAll: true,
                    suppressColumnExpandAll: true,
                  },
                },
            ],
        },

        statusBar: {
            statusPanels: [
                {
                    statusPanel: 'agAggregationComponent',
                    statusPanelParams: {
                        aggFuncs: ['sum']
                    }
                },
                {
                    statusPanel: 'AppGridCustomStatusBarCellValueComponent',
                    statusPanelParams: {
                        fractionDigits: this.getFractionDigits()
                    }
                },
            ],
        },

        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent
        },
    };

    constructor(private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.leverage && changes.leverage.currentValue) {
            this.grouping = this.leverage.grouping && this.leverage.grouping.split('|') || undefined;
            this.groupingAttributes = this.leverage.groupingAttributes || undefined;
            this.columns = this.leverage.columns || [];
            this.flatLeafData = this.leverage.data && this._getLeafFlatData(this.leverage.data) || [];
            this._getMaxTimeStamp(this.flatLeafData);

            if (this.grouping) {
                if (changes.leverage.previousValue &&
                    changes.leverage.currentValue.grouping !== changes.leverage.previousValue.grouping ||
                    changes.leverage.previousValue === null) {
                    this._updateColumnDef(this.grouping);
                }
            }

            if (changes.leverage.previousValue) {
                const oldData = this._getRowData();

                if (this.flatLeafData.length > 0) {
                    if (changes.leverage.currentValue.grouping === changes.leverage.previousValue.grouping) {
                        const [updateRows, removeRows, addRows] = this.utilityService.gridValueUpdater(this.utilityService.deepCopy(this.flatLeafData), oldData);
                        this.gridApi.applyTransaction({update: updateRows, remove: removeRows, add: addRows});
                    } else {
                        this.gridApi.setRowData(this.utilityService.deepCopy(this.flatLeafData))
                    }

                    setTimeout(() => {
                        this.gridApi.refreshCells({
                            columns: this.columns,
                        });
                    }, 1000)
                } else {
                    this.gridApi.setRowData([]);
                }

            } else {
                this.gridApi.setRowData(this.utilityService.deepCopy(this.flatLeafData));
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    private _getLeafFlatData(data): any[] {

        const finalResult = [];

        Object.keys(data).forEach(key => {
            if (key !== 'level' && key !== 'levelName' && key !== '7') {
                // ignore "test fund" so the grid won't crash
                // const payload  = data[key];
                // if (payload) {
                    finalResult.push(this._unwrapData(data[key]));
                // }
            }
        });

        return _.flatten(finalResult);
    }

    private getFractionDigits(): number {
        return 5;
    }

    private _unwrapData(data, levelDisplayName = []): any[] {

        if (data.branches) {
            // levelDisplayName.push(data.displayName);
            levelDisplayName = [...levelDisplayName, data.displayName];
            return this._unwrapData(data.branches, levelDisplayName);

        } else if (data.leaves) {
            levelDisplayName = [...levelDisplayName, data.displayName];
            const leafData = [];
            Object.keys(data.leaves).forEach(key => {

                if (key !== 'level' && key !== 'levelName') {
                    const targetObj = data.leaves[key];
                    const row: any = {};
                    // All the numerical attribute data enrichment
                    targetObj.data.forEach((value, index) => {
                        row[this.columns[index]] = value;
                    });
                    // all the grouping attribute data enrichment
                    levelDisplayName.forEach((groupName, index) => {
                        row[this.grouping[index]] = groupName;
                    });
                    row['Position'] = targetObj.displayName;
                    leafData.push(row);
                }

            });
            return leafData;
        } else {
            const finalResult = [];

            Object.keys(data).forEach(key => {
                if (key !== 'level' && key !== 'levelName') {

                    // const payload  = data[key];
                    // if (payload) {
                    //     finalResult.push(this._unwrapData(data[key]), levelDisplayName);
                    // }
                    finalResult.push(this._unwrapData(data[key], levelDisplayName));
                }
            })

            return _.flatten(finalResult);
        }
    }

    private _updateColumnDef(grouping) {

        const colDefs = [...this.customGridOption.columnDefs];
        grouping.forEach((name, index) => {

            let colDef: ColDef;

            if (name !== 'Position') {
                colDef = {
                    headerName: name,
                    field: name,
                    rowGroup: true,
                    rowGroupIndex: index,
                    hide: true
                };
            } else {
                colDef = {
                    headerName: name,
                    field: name,
                    hide: true,
                };
            }
            colDefs.unshift(colDef);
        });

        if (this.gridApi) {
            // this.gridApi.setColumnDefs([]);
            this.gridApi.setColumnDefs(colDefs);
        }
    }

    private _getNonlinearData(params: ValueGetterParams) {
        const targetColumn = params.column.getColId();
        const level = params.node.level;
        const targetRowNode = params.node;
        if (targetRowNode.group) {
            // get nonlinear data
            const nonlinearPath = this._getNonlinearDataPath(level, targetRowNode);
            const nonlinearData = this._searchForNonlinearData(nonlinearPath, targetColumn);
            return nonlinearData;
        } else {
            // get flat data`
            return targetRowNode.data[targetColumn];
        }
    }


    private _getNonlinearDataPath(level, targetRowNode: RowNode) {
        if (targetRowNode.group) {
            const leafPath = targetRowNode.allLeafChildren[0].data['id'].split('_');
            const levelPath = leafPath.slice(0, level + 1);

            let accumlativePath;
            const formatTreePath = levelPath.map((item, index) => {
                if (index > 0) {
                    accumlativePath = accumlativePath + '_' + item;
                    return accumlativePath;
                } else {
                    accumlativePath = '' + item;
                    return accumlativePath;
                }
            });
            return formatTreePath;
        } else {
            return targetRowNode.data['id'];
        }

    }

    private _searchForNonlinearData(dataPath, targetColumn) {
        const targetIndex = this.columns.indexOf(targetColumn);
        const targetLevelData = dataPath.reduce((tree, path, currentIndex) => {
            if (tree) {
                if (currentIndex === 0) {
                    return tree[path];
                } else if (tree.branches) {
                    return tree.branches[path];
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }

        }, this.leverage.data)

        if (targetLevelData) {
            const finalResult = targetLevelData.data ?  targetLevelData.data[targetIndex] : 0
            return finalResult;
        } else {
            return undefined;
        }
    }

    private _getRowData() {
        const rowData = [];
        this.gridApi.forEachNode(function(node) {
            rowData.push(node.data);
        });
        return rowData;
    }

    private _getMaxTimeStamp(data: any[]) {
        const timeCollection = data.map(item => (new Date(item['LastUpdated'])).getTime());
        const maxTimeStamp = Math.max(...timeCollection);
        this.maxTimeStamp = (new Date(maxTimeStamp)).toLocaleString('en-US', { timeZone: 'UTC', hour12: true });
        this.sendTimeStamp.emit(this.maxTimeStamp);
    }
}
