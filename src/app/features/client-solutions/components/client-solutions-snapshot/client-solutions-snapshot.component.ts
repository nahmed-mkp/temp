import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { GridOptions, GridApi, ColumnApi, ColDef, ValueGetterParams, RowNode } from 'ag-grid-community';

import * as fromModels from './../../models/fund.model';
import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';


@Component({
    selector: 'app-cs-snapshots',
    templateUrl: './client-solutions-snapshot.component.html',
    styleUrls: ['./client-solutions-snapshot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsSnapshotComponent implements OnInit, OnChanges {

    @Input() param: fromModels.ISnapshotParameter;

    @Input() groupings: string[];

    @Input() data: any;
    @Input() loading: boolean;
    @Input() loaded: boolean;
    @Input() error: string;

    @Output() groupingChanged: EventEmitter<fromModels.ISnapshotParameter> = new EventEmitter<fromModels.ISnapshotParameter>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private colDefs: ColDef[];
    private autoGroupColDef: ColDef;

    public selectedGrouping: string;
    public extraOption = {
        autoSizeColumns: true
    };
    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
            cellStyle: params => {
              return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
            },
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
        },
        getRowClass: params => {
            const rowClass = ['ultra-small-row'];
            if (params.node.rowIndex % 2 === 0) {
              rowClass.push('even-row-shaded-effect');
            }
            return rowClass;
        },
        rowHeight: 18,
        sideBar: false,
        showToolPanel: false,
        statusBar: {
            statusPanels: [
              {statusPanel: 'agAggregationComponent'},
              {statusPanel: 'AppGridCustomStatusBarCellValueComponent'},
            ],
        },
        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
        },
        suppressColumnVirtualisation: true,
    };
    public leafData: any[] = [];
    private groupingFormat: string[];
    private columns: string;
    

    constructor(private utilityService: UtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this._getNonlinearData = this._getNonlinearData.bind(this);
    }

    ngOnInit(): void { }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue) {
            this.columns = this.data.columns;
            this.colDefs = this.data.columns && this._createDynamicColDefs(this.data.columns) || [];
            this.leafData = this.data.data && this._getLeafFlatData(this.data.data) || [];
            this.autoGroupColDef = this.groupingFormat && this._createAutoGroupColDef(this.groupingFormat) || {};
            // console.log('col defs', this.colDefs);
            // console.log('leaf data', this.leafData);
            if (this.gridApi) {
                this.gridApi.setColumnDefs([]);
                this.gridApi.setAutoGroupColumnDef(this.autoGroupColDef);
                this.gridApi.setColumnDefs(this.colDefs);
                this.gridApi.setRowData(this.leafData);

                setTimeout(() => {
                    this.autoSizeColumn();
                }, 300)
            }
        }
    }

    onGroupingChanged(): void {
        if (this.selectedGrouping && this.param) {
            const newParam = Object.assign({}, this.param, {'grouping': this.selectedGrouping});
            this.groupingChanged.emit(newParam);
            this.groupingFormat = this.selectedGrouping.split('|') || null;
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        if (this.colDefs) {
            this.gridApi.setColumnDefs(this.colDefs);
        }
    }

    // Uitility -------------------------------------------------------------

    private _createDynamicColDefs(columns: string[]): ColDef[] {

        const colDefs: ColDef[] = columns.map(column => {
            return {
                headerName: column,
                field: column,
                hide: column === 'id' || column === 'parentId',
                valueGetter: this._getNonlinearData,
                valueFormatter: column.toLowerCase().includes('bpstofund') ?
                    this.utilityService.formatNumberWithCommasAndDigit(3, {bps: true}) :
                    this.utilityService.formatNumberWithCommasAndDigit(3)
            };
        });

        this.groupingFormat.forEach((grouping, index) => {
            colDefs.push({
                headerName: grouping,
                field: grouping,
                rowGroup: index !== this.groupingFormat.length - 1 ? true : false,
                width: 200,
            });
        });

        return colDefs;
    }

    private _createAutoGroupColDef(columns: string[]): ColDef {
        return {
            pinned: 'left',
            cellRendererParams: {
                suppressCount: true
            },
            headerName: 'Group',
            field: columns[columns.length - 1],
            width: 200,
            sort: 'asc',
        }
    }

    private _getLeafFlatData(data): any[] {

        const finalResult = [];

        Object.keys(data).forEach(key => {
            if (key !== 'level' && key !== 'levelName') {
                finalResult.push(this._unwrapData(data[key]));
            }
        })

        return _.flatten(finalResult);
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
                    const levelDisplayName_leaf = [...levelDisplayName, targetObj.displayName];
                    levelDisplayName_leaf.forEach((groupName, index) => {
                        row[this.groupingFormat[index]] = groupName;
                    });
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

    private _getNonlinearData(params: ValueGetterParams) {
        const targetColumn = params.column.getColId();
        const level = params.node.level;
        const targetRowNode = params.node;

        // if (targetRowNode.rowIndex !== 0) {
        //    
        // }

        if (targetRowNode.group) {
            // get nonlinear data
            const nonlinearPath = this._getNonlinearDataPath(level, targetRowNode);
            const nonlinearData = this._searchForNonlinearData(nonlinearPath, targetColumn);
            return nonlinearData;
        } else {
            // get flat data
            return targetRowNode.data[targetColumn];
        }
    }

    private _getNonlinearDataPath(level, targetRowNode: RowNode) {
        if (targetRowNode.group) {
            const leafPath = targetRowNode.allLeafChildren[0].data['id'].split('|');
            const levelPath = leafPath.slice(0, level + 1);
            let accumlativePath;
            const formatTreePath = levelPath.map((item, index) => {
                if (index > 0) {
                    accumlativePath = accumlativePath + '|' + item;
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

        }, this.data.data)

        if (targetLevelData) {
            const finalResult = targetLevelData.data ?  targetLevelData.data[targetIndex] : 0
            return finalResult;
        } else {
            return undefined;
        }
    }

    private autoSizeColumn() {
        const allColumns = this.gridColumnApi.getAllColumns();
        const allColumnIds = [];
        if (allColumns) {
            allColumns.forEach((column: any) => {
                allColumnIds.push(column.colId);
            });
        }
        this.gridColumnApi.autoSizeColumns(allColumnIds);
    }
}
