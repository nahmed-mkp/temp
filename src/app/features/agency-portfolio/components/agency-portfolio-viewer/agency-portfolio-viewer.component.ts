
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import { GridOptions, GridApi, ColumnApi, ValueFormatterParams, ColDef, ValueGetterParams, RangeSelectionChangedEvent, RangeSelection, ColGroupDef } from 'ag-grid-community';
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';

import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { AgencyUtilityService } from '../../services';
import { AgencyPortfolioGridLayoutDialogComponent } from '../agency-portfolio-grid-layout-dialog/agency-portfolio-grid-layout-dialog.component';

@Component({
    selector: 'app-agency-portfolio-viewer',
    templateUrl: './agency-portfolio-viewer.component.html',
    styleUrls: ['./agency-portfolio-viewer.component.scss']
})
export class AgencyPortfolioViewerComponent implements OnInit, OnChanges, OnDestroy {

    @Input() columns: fromModels.BasicGridColumn[];
    @Input() data: any[];
    @Input() loadingStatus: boolean;
    @Input() allowLoadingDisplay: boolean;
    @Input() category: string;
    @Input() layout: fromModels.Layout;
    @Input() globalTextFilter: string;
    @Input() targetColumn: string;
    @Input() isActive: boolean;

    @Output() rangesStatisticsUpdate
    = new EventEmitter<{sum: number | string, mean: number | string, min: number | string, max: number | string}>();
    @Output() setAllowLoadingDisplay = new EventEmitter<boolean>();

    public customGridOption: GridOptions;
    public extraOption = {
        autoSizeColumns: true,
    };

    private gridApi: GridApi;
    private columnApi: ColumnApi;
    private autoSizingColumnTrigger = false;

    constructor(private utilityService: AgencyUtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
        this.customGridOption = {
            defaultColDef: {
                cellStyle: params => {
                    return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
                },
                filter: 'agTextColumnFilter',
                enableRowGroup: true,
                enableCellChangeFlash: false,
            },

            autoGroupColumnDef: {
                pinned: 'left',
                headerName: 'Group', // + this.columns[0].name,
                // field: this.columns[0].name,
                cellRendererParams: {
                    suppressCount: true,
                },
                sort: 'asc'
            },

            context: this,

            getRowNodeId: data => data.Id,
            // deltaRowDataMode: true,

            columnDefs: this.createColumnDefsNew(this.columns),

            rowClass: 'medium-row',
            rowHeight: 22,
            groupHeaderHeight: 24,
            headerHeight: 24,
            pivotGroupHeaderHeight: 100,
            // floatingFiltersHeight:24,
            // floatingFilter: true,
            getRowStyle: params => {
                let style;
                if (params.node.level === 1) {
                    style = {background: '#3f51b51f'};
                } else if (params.node.level === 2) {
                    style = {background: '#3d50b33b'};
                } else if (params.node.level === 3) {
                    style = {background: '#3d50b359'};
                } else if (params.node.level === 4) {
                    style = {background: '#3d50b385'};
                } else if (params.node.level === 5) {
                    style = {background: '#3d50b3ba', 'color': 'white'};
                }
                if (params.node.group) {
                    if (params.node.aggData && params.node.aggData['BenchMarkMissing'] >= 1) {
                        style = Object.assign({}, style, {color: 'red'});
                    }
                } else {
                    if (params.data && params.data['BenchMarkMissing'] >= 1) {
                        style = Object.assign({}, style, {color: 'red'});
                    }
                }
                return style;
            },
            sideBar: true,
            suppressColumnVirtualisation: false,
            suppressAggFuncInHeader: true,

            onRangeSelectionChanged: event => {
                const {sum, mean, min, max} = this.utilityService.getRangesSelectionStatistics(event);
                this.rangesStatisticsUpdate.emit({sum, mean, min, max});
            },

            onColumnRowGroupChanged: event => {
                if (event.columns.length > 0) {
                    event.columnApi.setColumnVisible(this.columns[0].name, false);
                } else {
                    event.columnApi.setColumnVisible(this.columns[0].name, true);
                }
            },

            onCellDoubleClicked: event => {
                if (event.node.group && event.colDef.headerName.includes('Group ||') === false) {
                    if (event.node.expanded === false) {
                        event.node.setExpanded(true);
                    } else {
                        event.node.setExpanded(false);
                    }
                }
            },

            onRowDataChanged: event => {
                if (this.allowLoadingDisplay) {
                    this.setAllowLoadingDisplay.emit(false);
                }
            },

            onRowDataUpdated: event => {
                if (this.allowLoadingDisplay) {
                    this.setAllowLoadingDisplay.emit(false);
                }
            },


            groupRemoveLowestSingleChildren: this.category === 'rolls',
            // groupDefaultExpanded: this.category === 'rolls' ? 1 : 0,
            // rememberGroupStateWhenNewData: this.category === 'rolls',
        };
        // this.createColumnDefs(this.columns);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi) {
            if (changes.data.previousValue && changes.data.previousValue.length > 0) {
                const oldData = this.getRowData();

                const [updateRows, removeRows, addRows] = this.utilityService.gridValueUpdater(this.utilityService.deepCopy(changes.data.currentValue), oldData);
                // console.log('updateRows', 'removeRows', 'addRows', updateRows, removeRows, addRows)
                this.gridApi.updateRowData({update: updateRows, remove: removeRows, add: addRows});

                // this.gridApi.updateRowData({update: updateRows});
                // this.gridApi.updateRowData({remove: removeRows});
                // this.gridApi.updateRowData({add: addRows});
            } else {
                this.gridApi.setRowData(this.utilityService.deepCopy(this.data));
            }

            // if(this.layout) this.columnApi.setColumnState(this.layout.data);
            // this.gridApi.setRowData(changes.data.currentValue)
        }

        if (changes.layout && changes.layout.currentValue && this.columnApi) {
            // console.log('i am here', this.layout)
            // if(changes.layout.previousValue) {
            //     if(changes.layout.previousValue.name !== changes.layout.currentValue.name) this.columnApi.setColumnState(this.layout.data);
            // } else this.columnApi.setColumnState(this.layout.data);
            this.columnApi.setColumnState(this.layout.layoutData);
        }

        if (changes.globalTextFilter && changes.globalTextFilter.currentValue !== undefined && this.gridApi) {
            this.gridApi.setQuickFilter(this.globalTextFilter);
        }

        if (changes.targetColumn && changes.targetColumn.currentValue && this.columnApi && this.gridApi) {
            this.columnFocus(changes.targetColumn.currentValue);
        }

        if (!this.autoSizingColumnTrigger && changes.isActive && changes.isActive.currentValue) {
            this.autoSizingColumnTrigger = true;
            console.log('auto size columns');
            setTimeout(() => {
              const allColumnIds = [];
              this.columnApi.getAllColumns().forEach((column: any) => {
                allColumnIds.push(column.colId);
              });
              this.columnApi.autoSizeColumns(allColumnIds);
            }, 0);
        }

        if (changes.columns && changes.columns.currentValue && this.gridApi) {
            const columnDefs = this.createColumnDefsNew(changes.columns.currentValue);
            this.gridApi.setColumnDefs([]);
            this.gridApi.setColumnDefs(columnDefs);
        }
    }

    ngOnDestroy() {}

    onSaveColumnState({type, columnStates}) {
        const dialogRef = this.dialog.open(AgencyPortfolioGridLayoutDialogComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '25rem',
            data: {type, columnStates, category: this.category}
        });
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    }


    // Utility --------------------------------------------------------------------------

    getRowData() {
        const rowData = [];
        this.gridApi.forEachNode(function(node) {
          rowData.push(node.data);
        });
        return rowData;
    }

    columnFocus(columnName) {
        this.gridApi.ensureColumnVisible(columnName);
        this.gridApi.flashCells({columns: [columnName]});
    }

    createColumnDefsNew(columns: fromModels.BasicGridColumn[]) {
        return this.columns.map(column => {
            const columnDef: any = {
                headerName: column.displayName ? column.displayName : column.name,
                field: column.name,
                aggFunc: column.aggFunc,
                rowGroup: column.rowGroup,
                pinned: column.pinned,
                hide: column.hide,
                sort: column.sort,
                pivot: column.pivot,
                enablePivot: column.enablePivot,
                enableValue: column.aggFunc ? true : false,
                children: column.children,
                cellClass: column.cellClass
            };
            if (column.digit !== undefined) {
                columnDef.cellRenderer = 'agAnimateShowChangeCellRenderer';
                if (column.format === 'percent') {
                    columnDef.valueGetter = this.utilityService.formatPercentNumber(column.digit);
                    columnDef.cellStyle = {'justify-content': 'flex-end'};
                } else {
                    columnDef.valueGetter = this.utilityService.formatNumber(column.digit);
                }
            }
            if (column.type === 'date') {
                columnDef.valueFormatter = this.utilityService.formatDate;
                columnDef.filter = 'agDateColumnFilter';
            } else if (column.type === 'number') {
                columnDef.valueFormatter = this.utilityService.numberWithCommas;
                columnDef.filter = 'agNumberColumnFilter';
            } else {
                if (column.filter) {
                    columnDef.filter = column.filter;
                }
            }
            return columnDef;
        });
    }
}
