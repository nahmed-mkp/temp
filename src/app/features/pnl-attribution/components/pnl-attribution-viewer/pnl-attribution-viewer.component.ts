import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, RowNode, ColGroupDef, ColumnGroup, ColDef, ColumnState, RowClickedEvent, RangeSelectionChangedEvent, GetContextMenuItemsParams, ValueGetterParams } from 'ag-grid-community';
import * as _ from 'lodash';
import { UtilityService } from 'src/app/services';
import { Store } from '@ngrx/store';

import { combineLatest, Subject, Subscription } from 'rxjs';
import { takeWhile, debounceTime, debounce } from 'rxjs/operators';
import { PnlAttributionDetailGridLayoutComponent, PnlAttributionCustomGroupingDialogComponent } from '../../containers';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { AppGridCustomStatusBarCellValueComponent, AppGridCustomStatusBarCellRangesStatisticComponent } from 'src/app/components';
import { environment } from 'src/environments/environment';


import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
    selector: 'app-pnl-attribution-viewer',
    templateUrl: './pnl-attribution-viewer.component.html',
    styleUrls: ['./pnl-attribution-viewer.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PnlAttributionViewerComponent implements OnInit, OnChanges, OnDestroy {

    // UI --------------------------
    @Input() gridDisplayMode: any;
    @Input() layoutName: string;
    @Input() isActive: boolean;
    @Input() readOnlyMode: boolean;

    @Input() rowGrouping: string[];
    @Input() layoutInfo: fromModels.layoutState;
    @Input() layoutFilterValue: string;
    @Input() layoutSortState: any;


    // Data\flow -----------------------------------
    @Input() attribution: any[];
    @Input() attributionLoading: boolean;
    @Input() attributionLoaded: boolean;
    @Input() attributionError: string;

    @Input() attributionFlatData: any[];
    @Input() attributionTreeData: any;
    @Input() attributionColumns: string[];
    @Input() guid: string;

    // @Output() loadPositionAttribution = new EventEmitter<fromModels.IPositionAttributionRequest>();
    @Output() loadTimeseries = new EventEmitter<fromModels.IAttributionDailyTimeseriesRequest>();
    @Output() loadDetails = new EventEmitter<fromModels.IAttributionDetailsRequest>();
    @Output() saveLayoutState = new EventEmitter<fromModels.layoutState>();



    // Constant ------------------------------------
    private MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    private columnOrder = ['P/L($)', '% to Fund', '% to Cap','Fund Cap (k)', 'Cap (k)', 'σ', 'σ(%)'];
    private headerNameMap = {
        TotalPL: 'P/L($)',
        Total_pctToFund: '% to Fund',
        Total_pctToCap: '% to Cap',
        Total_annualizedVol$: 'σ',
        Total_annualizedVolPct: 'σ(%)',


        PctToFundCap: '% to Fund',
        PctToCap: '% to Cap',
        FundCapital: 'Fund Cap (k)',
        Capital: 'Cap (k)',
        annualizedVol$: 'σ',
        annualizedVolPct: 'σ(%)',

        quarterSummary_PctToFundCap: '% to Fund(qr)',
        quarterSummary_TotalPL: 'P/L($)(qr)',
        yearlySummary_PctToFundCap: '% to Fund(yr)',
        yearlySummary_TotalPL: 'P/L($)(yr)'
    };

    private quarterConstant = {
        mar: {start: 'jan', name: 'Q1'},
        jun: {start: 'apr', name: 'Q2'},
        sep: {start: 'jul', name: 'Q3'},
        dec: {start: 'oct', name: 'Q4'},
    }

    // Component Utility ------------------------------------------
    
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private isExternalFilterPresent = false;
    private colDefs: ColGroupDef[];
    private colDefs_detailGrid: ColGroupDef[];
    private autoColumnGroupDef: ColDef;

    private dialogRef: MatDialogRef<PnlAttributionCustomGroupingDialogComponent>;
    private gridColumnStateChangeSubject = new Subject<{columnStates: ColumnState[], source: any, type: string}>();
    private detailGridRowSelectedSubject = new Subject<string>();
    private subscription: Subscription;

    private activeSortModel: {
        [groupingPath: string]: {colId: string; level: number; groupName: string; sortOrder: 'asc' | 'desc'}
    } = {};

    public autoGroupColumnFilterValue: string;
    public onAutoGroupColumnFilterValueChange_debounce: any;
    public _onRangeSelectionChanged_debounce: any;

    public extraOption = {};
    public customGridOption: GridOptions;
    public singleCellValueSubject$ = new Subject<number>();


    @HostListener('window:keydown', ['$event'])
    onKeyDown($event) {
        if ($event.keyCode === 27 && this.gridApi) {
            this._removeAllRangeSelection(this.gridApi);
        }
    }

    public constructor(private utilityService: UtilityService, private store: Store<fromStore.PnlAttributionState>, private dialog: MatDialog, private dom: ElementRef, private snackbar: MatSnackBar) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.onAutoGroupColumnFilterValueChange_debounce = _.debounce(this._onAutoGroupColumnFilterValueChange.bind(this), 400);
        this._getNonlinearData = this._getNonlinearData.bind(this);
        this._getNonlinearDataPath = this._getNonlinearDataPath.bind(this);
        this._checkDisplayMode = this._checkDisplayMode.bind(this);
        this._openCustomGroupingManagement = this._openCustomGroupingManagement.bind(this);

        this._onRangeSelectionChanged_debounce = _.debounce(this._onRangeSelectionChanged.bind(this), 300);
        // this._loadLineItemData =  _.throttle(this._loadLineItemData.bind(this), 500);
        this._customComparator = this._customComparator.bind(this);
        this._getGroupingPath = this._getGroupingPath.bind(this);
    }
    
    ngOnInit(): void {
        this.subscription = this.gridColumnStateChangeSubject.pipe(
            debounceTime(500)
        ).subscribe(event => {
            if (event.type === 'fromDetailGrid') {
                // console.log('gridColumnStateChangeSubject', event);
                this._syncCurrentGridStateWithSourceGridState(event.columnStates, this.gridColumnApi.getColumnState());
            }
        });



        this.customGridOption = {

            // Column Def
            defaultColDef: {
                filter: 'agTextColumnFilter',
                width: 100,
                suppressMenu: true,
                cellStyle: params => {
                    let styleObj: any = {};
                    if (typeof params.value === 'number') {
                        styleObj = Object.assign(styleObj, {'justify-content': 'flex-end'});
                    }
                    const fieldName = params.colDef.field;
                    if (fieldName.includes('TotalPL')) {
                        styleObj = Object.assign(styleObj, {'font-weight': 'bolder', 'color': '#424242de'});
                    }

                    if (fieldName.includes('quarterSummary')) {
                        styleObj = Object.assign(styleObj, {'background': '#00800024'});
                    }
    
                    if (fieldName.includes('yearlySummary')) {
                        styleObj = Object.assign(styleObj, {'background': '#8000803d'});
                    }
                    return styleObj;
                },
                cellClass: params => {
                    const fieldName = params.colDef.field;
                    let isOddColumn: boolean;

                    const month = fieldName.split('_')[0];
                    const monthIndex = params.context.MONTHS.indexOf(month);

                    if (monthIndex !== -1) {
                        isOddColumn = (monthIndex + 1) % 2 === 0 ? false : true;
                    }
                    if (isOddColumn) {
                        return ['ag-grid-column-light-height'];
                    }
                },
                comparator: this._customComparator,

            },
            autoGroupColumnDef: {
                pinned: 'left',
                cellRendererParams: {
                    suppressCount: true
                },
                headerName: 'Group',
                field: this.rowGrouping[this.rowGrouping.length - 1],
                width: 300,
                sort: 'asc',
                cellClass: this._getIndentClass,
                comparator: (valueA, valueB, nodeA, nodeB) => {
                    if (valueA !== undefined && valueB !== undefined) {
                        const codeA = valueA.charCodeAt(0);
                        const codeB = valueB.charCodeAt(0);
                        return codeA - codeB;
                    } else {
                        return 0;
                    }
                }
            },
            columnDefs: [],

            getRowNodeId: data => data['Id'],
    
            //Event
            onRowClicked: params => {
                this._highlightGroupingLevel(params);

                const nodeId = params.api.getValue('Id', params.node);
                const nodeKey = params.node.key;
                params.context.loadTimeseries.emit({ 'id': nodeId, 'guid': this.guid, 'name': nodeKey});

                this.gridApi.forEachDetailGridInfo(detailGridInfo => {
                    detailGridInfo.api.clearFocusedCell();
                    detailGridInfo.api.getSelectedNodes().forEach(node => node.setSelected(false));
                })
            },
            onCellClicked: params => {
                const nodeId = params.api.getValue('Id', params.node);
                const colId = params.column.getColId();
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const month = colId.substring(0, 3);
                const monthIdx = months.indexOf(month);
                if (monthIdx >= 0) {
                    const year = parseInt('20' + colId.split('_')[1], 10);
                    params.context.loadDetails.emit({ 'id': nodeId, 'guid': this.guid, 'month': monthIdx + 1, 'year': year });
                }
            },

            onFirstDataRendered: params => {
                setTimeout(function () {
                    params.api.getDisplayedRowAtIndex(0).setExpanded(true);
                }, 100);
            },

            onColumnResized: params => {
                const currentColumnState: ColumnState[] = this.gridColumnApi.getColumnState();
                this.gridColumnStateChangeSubject.next({columnStates: currentColumnState, source: this.guid, type: 'fromMasterGrid'})
            },

            onSortChanged: params => {
                const currentSortingState = params.api.getSortModel();
                if (this.attributionLoading === false && this.attributionLoaded === true) {
                    if (JSON.stringify(currentSortingState) !== JSON.stringify(this.layoutSortState)) {
                        this.saveLayoutState.emit({
                            sortState: currentSortingState
                        });
                    }
                }
            },
            

            // onRangeSelectionChanged: this._onRangeSelectionChanged_debounce,



            // Filtering
            isExternalFilterPresent: () => this.isExternalFilterPresent,
            doesExternalFilterPass: this._externalFilter.bind(this),
    
    
            // Outlook 
            sideBar: false,
            rowGroupPanelShow: 'always',
            suppressAggFuncInHeader: true,

            rowClass: 'medium-row',
            rowHeight: 22,
            groupHeaderHeight: 24,
            headerHeight: 24,
            floatingFiltersHeight: 28,
            showToolPanel: false,
            excelStyles: [
                {
                  id: 'indent-1',
                  alignment: { indent: 1 },
                  dataType: 'string',
                },
                {
                  id: 'indent-2',
                  alignment: { indent: 4 },
                  dataType: 'string',
                },
                {
                  id: 'indent-3',
                  alignment: { indent: 6 },
                  dataType: 'string',
                },
                {
                  id: 'indent-4',
                  alignment: { indent: 8 },
                  dataType: 'string',
                },
                {
                  id: 'indent-5',
                  alignment: { indent: 10 },
                  dataType: 'string',
                },
                {
                  id: 'indent-6',
                  alignment: { indent: 12 },
                  dataType: 'string',
                },
            ],


            // Misc Behavior
            rowSelection: 'single',
            context: this,
            statusBar: {
                statusPanels: [
                // {statusPanel: 'agAggregationComponent'},
                {statusPanel: 'AppGridCustomStatusBarCellRangesStatisticComponent'},
                {statusPanel: 'AppGridCustomStatusBarCellValueComponent'},
              ]
            },
            getContextMenuItems: params => {

                const customGrouping = {
                    name: 'Layout Configuration',
                    icon: '<i class="material-icons small-menu-icon">table_chart</i>',
                    action: () => this._openCustomGroupingManagement(params.columnApi)
                }

                const customExport = {
                    name: 'Excel Export',
                    icon: '<i class="material-icons small-menu-icon">get_app</i>',
                    action: () => {
                        this.gridApi.exportDataAsExcel({
                            processRowGroupCallback: this._rowGroupCallback,
                        });
                    }
                }

                // const saveCompleteLayoutState = {
                //     name: 'Save Layout',
                //     icon: '<i class="material-icons small-menu-icon">save</i>',
                //     action: () => {
                //         const currentSortingState = params.api.getSortModel();
                //         console.log(currentSortingState, this.autoGroupColumnFilterValue);
                //         this.saveLayoutState.emit({
                //             filterValue: this.autoGroupColumnFilterValue,
                //             sortState: currentSortingState,
                //             grouping: this.rowGrouping
                //         });
                //     }
                // }

                const shareResult = {
                    name: 'Share Result',
                    icon: '<i class="material-icons small-menu-icon">launch</i>',
                    action: () => {

                        const url = environment.production ? `http://prizm-map.mkpcap.com/app/attribution/${this.guid}` : `http://localhost:4205/app/attribution/${this.guid}`;

                        // current layout info (like filtering value, sorting state);
                        const filterValue_Encode = encodeURI(this.layoutFilterValue);
                        const layoutSortState_Encode = encodeURI(JSON.stringify(this.layoutSortState));
                        const gridDisplayMode_Encode = encodeURI(JSON.stringify(this.gridDisplayMode));


                        let collectiveEncodeString: any = [];
                        if (filterValue_Encode !== '' && filterValue_Encode !== 'undefined') {
                            collectiveEncodeString.push(`filter=${filterValue_Encode}`);
                        }

                        if (layoutSortState_Encode !== '' && layoutSortState_Encode !== 'undefined') {
                            collectiveEncodeString.push(`sort=${layoutSortState_Encode}`);
                        }

                        if (gridDisplayMode_Encode !== '' && gridDisplayMode_Encode !== 'undefined') {
                            collectiveEncodeString.push(`display=${gridDisplayMode_Encode}`);
                        }

                        if (collectiveEncodeString.length > 0) {
                            collectiveEncodeString = '?' + collectiveEncodeString.join('&');
                        }
                        const finalUrl = url + collectiveEncodeString;

                        this._copyTextToClipboard(finalUrl);
                    }
                }

                const clearRangeSelection = {
                    name: 'Clear Range Selection',
                    icon: '<i class="material-icons small-menu-icon">remove_done</i>',
                    action: () => this._removeAllRangeSelection(this.gridApi)
                }

                const sortAsc = {
                    name: 'Ascending Sort',
                    icon: '<i class="material-icons small-menu-icon upside-down-flip">sort</i>',
                    action: () => this._sortRowsCustom(params, 'asc')
                }

                const sortDesc = {
                    name: 'Descending Sort',
                    icon: '<i class="material-icons small-menu-icon">sort</i>',
                    action: () => this._sortRowsCustom(params, 'desc')
                }


                // return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', customExport,'separator', customGrouping];

                if (this.readOnlyMode) {
                    return ['copy', 'copyWithHeaders', 'separator', customExport,
                    'separator', clearRangeSelection,
                    'separator', sortAsc, sortDesc];
                } else {
                    return ['copy', 'copyWithHeaders', customExport, 'separator',
                        customGrouping, 'separator',
                        shareResult,
                        clearRangeSelection, 'separator',
                        sortAsc, sortDesc
                    ];
                }
            },
    
    
            // Master - Detail grid setup
            embedFullWidthRows: true,
            masterDetail: true,
            detailCellRenderer: 'PnlAttributionDetailGridLayoutComponent',
            detailRowHeight: 200,
            detailCellRendererParams: params => {

                // Setup param config for detail grid
                const config: any = {};
                config.detailGridOptions = {
                    columnDefs: this.colDefs_detailGrid,
                }
                
                config.guid = this.guid;
                config.lineItemId = this.gridApi.getValue('Id', params.node);
                config.refreshStrategy = 'nothing';
                config.layoutName = this.layoutName;
                config.gridColumnStateChangeSubject = this.gridColumnStateChangeSubject;
                config.detailGridRowSelectedSubject = this.detailGridRowSelectedSubject;
                config.singleCellValueSubject$ = this.singleCellValueSubject$;
                return config;
            },
            // Framework
            frameworkComponents: {
                'PnlAttributionDetailGridLayoutComponent': PnlAttributionDetailGridLayoutComponent,
                'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
                'AppGridCustomStatusBarCellRangesStatisticComponent': AppGridCustomStatusBarCellRangesStatisticComponent
            }
        };
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.attributionFlatData && changes.attributionFlatData.currentValue && this.gridApi) {
            this.setData(changes.attributionFlatData.currentValue);
        }

        if (changes.attributionColumns && changes.attributionColumns.currentValue && changes.attributionColumns.currentValue.length > 0) {
            this.colDefs = this.getColDefs(changes.attributionColumns.currentValue, true);
            this.colDefs_detailGrid = this.getColDefs(changes.attributionColumns.currentValue, false);
            this.autoColumnGroupDef = this.getAutoColumnGroupDef();

            if (this.gridApi) {
                this.gridApi.setColumnDefs([]);
                this.gridApi.setColumnDefs(this.colDefs);
                setTimeout(() => this.gridApi.setAutoGroupColumnDef(this.autoColumnGroupDef), 200);
                setTimeout(() => this._createLeafLevelGroupingDomElement(), 300);
            }
        }

        if (changes.gridDisplayMode && changes.gridDisplayMode.currentValue && this.gridApi) {
            this._onDisplayModeChange();
        }

        // if (changes.layoutInfo && changes.layoutInfo.currentValue && this.gridApi && this.isActive) {
        //     this._applyLayoutState(changes.layoutInfo.currentValue);
        // } 

        if (changes.layoutFilterValue && this.gridApi && this.isActive) {
            this._applyLayoutFilterValue(changes.layoutFilterValue.currentValue);
        }
        if (changes.layoutSortState && changes.layoutSortState.currentValue && this.gridApi && this.isActive) {
            this._applyLayoutSortState(changes.layoutSortState.currentValue);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        if (this.attributionFlatData) {
            this.setData(this.attributionFlatData);
        }

        if (this.attributionColumns) {

            if (this.colDefs) {
                this.gridApi.setColumnDefs(this.colDefs);
                setTimeout(() => this._createLeafLevelGroupingDomElement(), 300);
            }

            if (this.autoColumnGroupDef) {
                setTimeout(() => this.gridApi.setAutoGroupColumnDef(this.autoColumnGroupDef), 200);
            }
            // this.colDefs = this.getColDefs(this.attributionColumns, true);
            // this.colDefs_detailGrid = this.getColDefs(this.attributionColumns, false);
        }

        if (this.gridDisplayMode) {
            this._onDisplayModeChange();
        }

        // if (this.layoutInfo && this.isActive) {
        //     
        //     this._applyLayoutState(this.layoutInfo);
        // }

        if (this.layoutFilterValue && this.isActive) {
            this._applyLayoutFilterValue(this.layoutFilterValue);
        }

        if (this.layoutSortState && this.isActive) {
            this._applyLayoutSortState(this.layoutSortState);
        }
    }


    // Utility ---------------------------------------------------------------------------------

    private getColDefs(columnNames: string[], includesGrouping: boolean) {

        const columnGroupingCollection: any = {};

        columnNames.forEach(name => {
            const isMonthProperty = this.MONTHS.some(month => name.startsWith(month));
            if (isMonthProperty) {
                const [month, year, detailProperty] = name.split('_');
                const groupingName = month + " '" + year;

                if (columnGroupingCollection[groupingName] === undefined) {
                    columnGroupingCollection[groupingName] = []
                }
                columnGroupingCollection[groupingName].push({
                    displayName: detailProperty,
                    field: name,
                    hide: this._checkDisplayMode(detailProperty),
                });
            } else {
                if (columnGroupingCollection['Total'] === undefined) {
                    columnGroupingCollection['Total'] = []
                }
                columnGroupingCollection['Total'].push({
                    displayName: name,
                    field: name,
                    hide: (name.toLowerCase().includes('total') ? false : true) || this._checkDisplayMode(name),
                })
            }
        });


        // console.log('columnGroupingCollection', columnGroupingCollection)

        const columnGroupingCollectionKeySorted = Object.keys(columnGroupingCollection);
        columnGroupingCollectionKeySorted.sort((keyA, keyB) => {
                if (keyA === 'Total') {
                    return -1;
                } else if (keyB === 'Total') {
                    return 1;
                } else {
                    const [month_A, year_A] = keyA.split(" '");
                    const [month_B, year_B] = keyB.split(" '");
                    const resultA = this.MONTHS.indexOf(month_A) + parseInt(year_A) * 100;
                    const resultB = this.MONTHS.indexOf(month_B) + parseInt(year_B) * 100;

                    return resultA - resultB;
                }
            });

        //console.log('columnGroupingCollection sorted', columnGroupingCollectionKeySorted, columnGroupingCollection)

        // create colDefs
        const context = this;
        const colDefs: ColGroupDef[] = columnGroupingCollectionKeySorted.map(key => {
            const colGroupDef: ColGroupDef = {
                headerName: key,
                children: columnGroupingCollection[key].map(property => {
                    const colDef: ColDef = {
                        headerName: context.headerNameMap[property.displayName],
                        field: property.field,
                        colId: property.field,
                        hide: property.hide,
                        headerTooltip: property.field,
                        width: property.displayName.toLowerCase().includes('pct') ? 50 : 90,
                        // valueFormatter: property.field.toLowerCase().includes('pct') ? this.utilityService.formatNumberWithCommasAndDigit(2) : this.utilityService.formatNumberWithCommasAndDigit(0),
                        valueFormatter: params => {

                            if (property.displayName.includes('annualizedVolPct')) {
                                return this.utilityService.formatNumberWithCommasAndDigitAdvance(4, {percent_pure: true, zeroCutOff: true})(params);
                            }

                            if (property.field.toLowerCase().includes('pct')) {
                                return this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {zeroCutOff: true})(params);
                            }

                            if (property.displayName === 'FundCapital' || property.displayName === 'Capital') {
                                return this.utilityService.formatNumberWithCommasAndDigitAdvance(0, {thousand: true, zeroCutOff: true})(params);
                            }

                            return this.utilityService.formatNumberWithCommasAndDigit(0, {zeroCutOff: true})(params);
                        }, 
                        valueGetter: params => {
                            if (params.node.group) {
                                const value: number = this._getNonlinearData(params.node, params.colDef.field);
                                if (value !== undefined) {
                                    if (property.displayName.includes('annualizedVolPct')) {
                                        return this.custom_zeroCutOff_rounding(value, 4);
                                    } else if (property.field.toLowerCase().includes('pct')) {
                                        return this.custom_zeroCutOff_rounding(value, 2);
                                    } else {
                                        return this.custom_zeroCutOff_rounding(value, 0);
                                    }
                                }

                            } else {
                                const value = params.data[params.colDef.field];
                                if (value !== undefined) {
                                    if (property.displayName.includes('annualizedVolPct') ) {
                                        return this.custom_zeroCutOff_rounding(value, 4);
                                    } else if (property.field.toLowerCase().includes('pct')) {
                                        return this.custom_zeroCutOff_rounding(value, 2);
                                    } else {
                                        return this.custom_zeroCutOff_rounding(value, 0);
                                    }
                                }
                            }
                        }
                    };
                    return colDef;
                }).sort((colA, colB) => {
                    const colA_order = context.columnOrder.indexOf(colA.headerName);
                    const colB_order = context.columnOrder.indexOf(colB.headerName);

                    return colA_order - colB_order;
                })
            };
            return colGroupDef;
        });

        let extraColDefs;

        if (includesGrouping) {
            // row Grouping Coldefs

            const actualRowGrouping = [...this.rowGrouping];
            actualRowGrouping.pop(); //  important remove the last level grouping
            extraColDefs = {
                headerName: 'rowGrouping',
                children: actualRowGrouping.map((rowGroupName, index) => {
                    const colDef: ColDef = {
                        headerName: rowGroupName,
                        field: rowGroupName,
                        hide: true,
                        rowGroup: true,
                        rowGroupIndex: index,
                        colId: rowGroupName,
                    };
                    return colDef;
                })
            }
        } else {
            extraColDefs = {
                headerName: 'SecurityName',
                children: [
                    {headerName: 'Position', field: 'Position', width: 240, floatingFilter: true, colId: 'Position'}
                ]
            };
        }

        // const rowGroupingDefs: ColGroupDef = {
        //     headerName: 'rowGrouping',
        //     children: this.rowGrouping.map((rowGroupName, index) => {
        //         const colDef: ColDef = {
        //             headerName: rowGroupName,
        //             field: rowGroupName,
        //             hide: true,
        //             rowGroup: true,
        //             rowGroupIndex: index
        //         };
        //         return colDef
        //     })
        // }

        const colDefCollection: ColGroupDef[] = [...colDefs, extraColDefs];


        // console.log('colDefs', colDefCollection);

        const colDefCollectionWithQuarterSummary = [];
        colDefCollection.forEach((colDef: ColGroupDef, index) => {
            
            colDefCollectionWithQuarterSummary.push(colDef);
            // const headerNameCollection = colDef.headerName.split(' ');

            if (this._checkIfNeedQuarterSummary(colDef, index)) {
                const colDef_quarterSummary = this._getQuarterSummary(colDefCollection, index);
                // colDefCollectionWithQuarterSummary.splice(colDefCollectionWithQuarterSummary.length - 3, 0, colDef_quarterSummary);
                colDefCollectionWithQuarterSummary.push(colDef_quarterSummary);
            }

            if (this._checkIfNeedYearSummary(colDef, index)) {
                const colDef_yearSummary = this._getYearlySummary(colDefCollection, index);
                // colDefCollectionWithQuarterSummary.splice(colDefCollectionWithQuarterSummary.length - 15, 0, colDef_yearSummary);
                colDefCollectionWithQuarterSummary.push(colDef_yearSummary);
            }


        });

        if (includesGrouping) {
            // console.log('final colDefCollectionWithSummary sortted', colDefCollectionWithQuarterSummary);
        }
        return colDefCollectionWithQuarterSummary;

    }

    private getAutoColumnGroupDef(): ColDef {
        return {
            pinned: 'left',
            cellRendererParams: {
                suppressCount: true
            },
            headerName: 'Group',
            field: this.rowGrouping[this.rowGrouping.length - 1],
            width: 300,
            sort: 'asc',
            cellClass: this._getIndentClass
        }
    }

    private setData(data: any[]): void {
        this.gridApi.setRowData(data);
        setTimeout(() => {
            const targetNode = this.gridApi.getDisplayedRowAtIndex(0);
            if (targetNode) {
                targetNode.setExpanded(true);
            }
            // if (this.layoutInfo) {
            //     this._applyLayoutState(this.layoutInfo);
            // }
            if (this.layoutFilterValue) {
                this._applyLayoutFilterValue(this.layoutFilterValue);
            }
            if (this.layoutSortState) {
                this._applyLayoutSortState(this.layoutSortState);
            }
        }, 300);
    }

    private _onAutoGroupColumnFilterValueChange() {
        // if (this.gridApi) {
        //   this.isExternalFilterPresent = true;
        //   this.gridApi.onFilterChanged();
        // }
        this.saveLayoutState.emit({
            filterValue: this.autoGroupColumnFilterValue,
        });
    }

    private _externalFilter(node: RowNode) {
        const targetFilterValue = this.autoGroupColumnFilterValue.toLowerCase();
        const targetColumnsNeededToBeFilter = [...this.rowGrouping];
        targetColumnsNeededToBeFilter.push('TradeName');
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
    }


    private _getNonlinearData(node: RowNode, field: string) {
        if (this.attributionTreeData) {
            const path = this._getNonlinearDataPath(node);
            const resultObj = path.reduce((dataTree, pathString) => {
                if (dataTree) {
                    const dataTree_subsection = dataTree.branch[pathString];
                    return dataTree_subsection;
                } else {
                    return undefined;
                }
            }, this.attributionTreeData);

            if (resultObj) {
                const resultData = resultObj.data[field];
                return resultData;
            }

        } else {
            return null;
        }
    }

    private _getNonlinearDataPath(node: RowNode) {
        const path: string[] = [];
        let currentNode = node;
        do {
            if (currentNode.group) {
                path.unshift(currentNode.key);
            }
            currentNode = currentNode.parent;
        } while (currentNode.level !== -1)

        return path;
    }

    private _checkDisplayMode(name) {
        const correctedName = this.headerNameMap[name];
        return !this.gridDisplayMode[correctedName];
    }

    private _onDisplayModeChange() {

        const currentColumnState = this.gridColumnApi.getColumnState();
        const showCols = [];
        const hideCols = [];
        currentColumnState.forEach(col => {
            const headerName = this.gridApi.getColumnDef(col.colId).headerName;
            if (this.gridDisplayMode[headerName]) {
                if (headerName === '% to Fund(qr)') {
                    this.gridDisplayMode['% to Fund'] ? showCols.push(col.colId) : hideCols.push(col.colId);
                } else if (headerName === 'P/L($)(qr)') {
                    this.gridDisplayMode['P/L($)'] ? showCols.push(col.colId) : hideCols.push(col.colId);
                } else if (headerName === '% to Fund(yr)') {
                    this.gridDisplayMode['% to Fund'] ? showCols.push(col.colId) : hideCols.push(col.colId);
                } else if (headerName === 'P/L($)(yr)') {
                    this.gridDisplayMode['P/L($)'] ? showCols.push(col.colId) : hideCols.push(col.colId);
                } else {
                    showCols.push(col.colId);
                }
            } else {
                hideCols.push(col.colId);
            }
        });

        this.gridColumnApi.setColumnsVisible(showCols, true);
        this.gridColumnApi.setColumnsVisible(hideCols, false);

        this.colDefs_detailGrid = this.getColDefs(this.attributionColumns, false);
    }


    private _openCustomGroupingManagement(columnApi: ColumnApi) {
        this.dialogRef = this.dialog.open(PnlAttributionCustomGroupingDialogComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '40rem',
            height: '40rem',
            data: {
                layoutName: this.layoutName
            }
        });
    }

    private _getIndentClass(params) {
        let indent = 0;
        let node = params.node;
        while (node && node.parent) {
          indent++;
          node = node.parent;
        }
        return ['indent-' + indent];
    }

    private _rowGroupCallback(params) {
        return params.node.key;
    }

    private _syncCurrentGridStateWithSourceGridState(sourceGridState: ColumnState[], currentGridState: ColumnState[]) {
        const hashMapOfSourceGridState = _.keyBy(sourceGridState, 'colId');
        const resultState: ColumnState[] = [];
        currentGridState.forEach(currentGridColumnState => {
            const colId = currentGridColumnState.colId;
            const sourceGridColumnState = hashMapOfSourceGridState[colId];
            if (hashMapOfSourceGridState[colId]) {
                const newColumnState: ColumnState = Object.assign({}, currentGridColumnState, sourceGridColumnState);
                resultState.push(newColumnState); 
            } else {
                resultState.push(currentGridColumnState);
            }
        });
        this.gridColumnApi.setColumnState(resultState);
    }

    private _highlightGroupingLevel(params: RowClickedEvent) {
        const targetParent = this.dom.nativeElement.querySelector('.ag-column-drop-list');
        const targetElements = targetParent.querySelectorAll('.ag-column-drop-cell');
        const targetLevel = params.node.level;
        targetElements.forEach((element, index) => {
          if (index === targetLevel) {
            element.classList.add('ag-group-level-highlight');
          } else {
            element.classList.remove('ag-group-level-highlight');
          }
        });
    }

    private _createLeafLevelGroupingDomElement() {
        const targetParent = this.dom.nativeElement.querySelector('.ag-column-drop-list');

        const targetElements = targetParent.querySelector('.ag-column-drop-cell');
        const targetElementsClone = targetElements.cloneNode(true);
        const rightArrowIcon = targetParent.querySelector('.ag-icon-small-right');
        const rightArrowIconClone = rightArrowIcon.cloneNode(true);

        const innerTextElemenmt = targetElementsClone.querySelector('.ag-column-drop-cell-text');

        const leafLevelGrouping = this.rowGrouping[this.rowGrouping.length - 1];
        innerTextElemenmt.textContent = leafLevelGrouping;


        targetParent.appendChild(rightArrowIconClone);
        targetParent.appendChild(targetElementsClone);
    }

    // private _applyLayoutState(layoutInfo: fromModels.layoutState) {
    //     if (layoutInfo.sortState) {
    //         this.gridApi.setSortModel(layoutInfo.sortState);
    //     }
    //     if (layoutInfo.filterValue) {
    //         this.autoGroupColumnFilterValue = layoutInfo.filterValue;
    //         if (this.gridApi) {
    //             this.isExternalFilterPresent = true;
    //             this.gridApi.onFilterChanged();
    //         }
    //     }
    // }

    private _applyLayoutFilterValue(value: string) {
        this.autoGroupColumnFilterValue = value;
        this.isExternalFilterPresent = true;
        this.gridApi.onFilterChanged();
    }

    private _applyLayoutSortState(sortState: any) {
        this.gridApi.setSortModel(sortState);
    }

    private _copyTextToClipboard(text: string): void {

        const textArea = document.createElement('textarea');

        // Place in the top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = '0';

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of the white box if rendered for any reason.
        textArea.style.background = 'transparent';
        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            this.snackbar.open(`Url to access this attribution analysis was copied to your clipboard!`, '', { duration: 3000 });
        } catch (err) {
            // console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    } 

    private _onRangeSelectionChanged (event: RangeSelectionChangedEvent) {

        const rangesCollection = []
        this.gridApi.forEachDetailGridInfo(detailGridInfo => {

            const rangeObj = {
                gridApi: detailGridInfo.api,
                ranges: detailGridInfo.api.getCellRanges()
            }
            rangesCollection.push(rangeObj);
        });
        rangesCollection.push({
            gridApi: this.gridApi,
            ranges: this.gridApi.getCellRanges()
        });

        const {sum, mean, min, max, counter} = this.utilityService.getMultipleGridsRangesSelectionStatistics(rangesCollection);
    }

    private _removeAllRangeSelection(masterGridApi: GridApi) {
        masterGridApi.clearRangeSelection();
        masterGridApi.forEachDetailGridInfo(gridInfo => {
            gridInfo.api.clearRangeSelection();
        });
    }

    private _sortRowsCustom(params: GetContextMenuItemsParams, order: 'asc' | 'desc') {
        // console.log('_sortRowsAscendingly', params);

        // this.gridColumnApi.setColumnState([
        //     {colId: params.column.getColId(), }
        // ])

        const colId = params.column.getColId();
        const groupingPath = this._getGroupingPath(params.node, false);

        this.activeSortModel = Object.assign(this.activeSortModel, {
            [groupingPath]: {
                colId: colId,
                level: params.node.level,
                sortOrder: order,
                groupName: params.node.key,
            }
        })

        this.gridApi.setSortModel([{
            colId: colId,
            sort: 'asc'
        }])
        // const targetNode = params.node;
        // targetNode.childIndex = 0;
        // targetNode.rowIndex = 1;
        // setTimeout(() => {
        //     
        //     this.gridApi.redrawRows({
        //         rowNodes: [targetNode]
        //     });
        // });
    }

    private _customComparator(valueA, valueB, nodeA: RowNode, nodeB: RowNode) {

        const groupingPath_nodeA = this._getGroupingPath(nodeA, true);
        const groupingPath_nodeB = this._getGroupingPath(nodeB, true);

        if (this.activeSortModel[groupingPath_nodeA] && this.activeSortModel[groupingPath_nodeB]) {

            const sortOrder = this.activeSortModel[groupingPath_nodeA].sortOrder;
            const nodeA_value = this.gridApi.getValue(this.activeSortModel[groupingPath_nodeA].colId, nodeA);
            const nodeB_value = this.gridApi.getValue(this.activeSortModel[groupingPath_nodeB].colId, nodeB);

            if (sortOrder === 'asc') {
                // return valueA - valueB;
                if (valueA === 0) {
                    return 1;
                } else if (valueB === 0) {
                    return -1;
                }
                return nodeA_value - nodeB_value;
            } else if (sortOrder === 'desc') {
                // return valueB - valueA;
                if (valueA === 0) {
                    return 1;
                } else if (valueB === 0) {
                    return -1;
                }
                return nodeB_value - nodeA_value;
            } else {
                return null;
            }

        } else {
            if (nodeA.group && nodeB.group) {
                return nodeA.key.charCodeAt(0) - nodeB.key.charCodeAt(0)
            } else {
                // const targetfield = this.customGridOption.autoGroupColumnDef.field;
                const targetfield = this.rowGrouping[this.rowGrouping.length - 1];
                const targetValueA = nodeA.data[targetfield];
                const targetValueB = nodeB.data[targetfield];

                if (targetValueA === 0) {
                    return -1;
                } else if (targetValueB === 0) {
                    return 1;
                }
                return targetValueA.charCodeAt(0) - targetValueB.charCodeAt(0);
            }
        }

        // if (nodeA.parent.key === this.activeSortModel.groupName && nodeB.parent.key === this.activeSortModel.groupName) {
        //     if (this.activeSortModel.sortOrder === 'asc') {
        //         return valueA - valueB;
        //     } else if (this.activeSortModel.sortOrder === 'desc') {
        //         return valueB - valueA;
        //     } else {
        //         return null;
        //     }
        // } else { 
        //     if (nodeA.group && nodeB.group) {
        //         return nodeA.key.charCodeAt(0) - nodeB.key.charCodeAt(0)
        //     } else {
        //         const targetfield = this.customGridOption.autoGroupColumnDef.field;
        //         const targetValueA = nodeA.data[targetfield];
        //         const targetValueB = nodeB.data[targetfield];
        //         return targetValueA.charCodeAt(0) - targetValueB.charCodeAt(0);
        //     }
        // }
    }

    private _getGroupingPath(node: RowNode, ignoreItSelf: boolean) {
        const groupingValuePath: string[] = [];
        let currentNode = node;
        do {
            if (currentNode.group) {
                groupingValuePath.push(currentNode.key);
            } else {
                // const targetfield = this.customGridOption.autoGroupColumnDef.field;
                const targetfield = this.rowGrouping[this.rowGrouping.length - 1];
                groupingValuePath.push(currentNode.data[targetfield]);
            }

            currentNode = currentNode.parent;
        } while (currentNode.id !== 'ROOT_NODE_ID');

        let groupingValuePathFormatted;
        if (ignoreItSelf) {
            groupingValuePathFormatted = groupingValuePath.reverse();
            groupingValuePathFormatted.pop();
            groupingValuePathFormatted = groupingValuePathFormatted.join('|');
        } else {
            groupingValuePathFormatted = groupingValuePath.reverse().join('|');
        }
        return groupingValuePathFormatted;
    }

    private _checkIfNeedQuarterSummary(colDef: ColGroupDef, index: number) {
        const headerNameCollection = colDef.headerName.split(' ');
        if (headerNameCollection.length === 2) {
            const month = headerNameCollection[0].toLowerCase();
            const year = headerNameCollection[1];
            return this.quarterConstant[month] && (index - 2) > 0;
        } else {
            return false;
        }
    }

    private _checkIfNeedYearSummary(colDef: ColGroupDef, index: number) {
        const headerNameCollection = colDef.headerName.split(' ');
        if (headerNameCollection.length === 2) {
            const month = headerNameCollection[0].toLowerCase();
            const year = headerNameCollection[1];
            return month === 'dec' && (index - 11) > 0;
        } else {
            return false;
        }
    }

    private _getQuarterSummary(colDefCollection: ColGroupDef[], index): ColGroupDef {

        const colDef_month1 = colDefCollection[index - 2];
        const colDef_month2 = colDefCollection[index - 1];
        const colDef_month3 = colDefCollection[index];

        const colDef_month1_targetField_pct = (colDef_month1.children as ColDef[]).filter(col => col.field.includes('PctToFundCap'))[0].field;
        const colDef_month2_targetField_pct = (colDef_month2.children as ColDef[]).filter(col => col.field.includes('PctToFundCap'))[0].field;
        const colDef_month3_targetField_pct = (colDef_month3.children as ColDef[]).filter(col => col.field.includes('PctToFundCap'))[0].field;

        const colDef_month1_targetField_dollar = (colDef_month1.children as ColDef[]).filter(col => col.field.includes('TotalPL'))[0].field;
        const colDef_month2_targetField_dollar = (colDef_month2.children as ColDef[]).filter(col => col.field.includes('TotalPL'))[0].field;
        const colDef_month3_targetField_dollar = (colDef_month3.children as ColDef[]).filter(col => col.field.includes('TotalPL'))[0].field;

        const headerNameCollection = colDef_month3.headerName.split(' ');
        const month = headerNameCollection[0].toLowerCase();
        const year = headerNameCollection[1];
        
        const colDef_quarterSummary: ColGroupDef = {
            headerName: this.quarterConstant[month].name + year,
            children: [
                {
                    headerName: 'P/L($)(qr)',
                    field: 'quarterSummary_TotalPL',
                    hide: this._checkDisplayMode('quarterSummary_TotalPL') && this._checkDisplayMode('P/L($)'),
                    valueGetter: params => {
                        const m1 = this.gridApi.getValue(colDef_month1_targetField_dollar, params.node);
                        const m2 = this.gridApi.getValue(colDef_month2_targetField_dollar, params.node);
                        const m3 = this.gridApi.getValue(colDef_month3_targetField_dollar, params.node);
                        const result = m1 + m2 + m3;
                        const preFormattedValue = this.custom_zeroCutOff_rounding(result, 0);
                        return preFormattedValue;
                    },
                    valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0, {zeroCutOff: true})
                },
                {
                    headerName: '% to Fund(qr)',
                    field: 'quarterSummary_PctToFundCap',
                    hide: this._checkDisplayMode('quarterSummary_PctToFundCap') && this._checkDisplayMode('% to Fund'),
                    width: 60,
                    valueGetter: params => {
                        const m1 = this.gridApi.getValue(colDef_month1_targetField_pct, params.node) / 100;
                        const m2 = this.gridApi.getValue(colDef_month2_targetField_pct, params.node) / 100;
                        const m3 = this.gridApi.getValue(colDef_month3_targetField_pct, params.node) / 100;
                        const result = ((1 + m1) * (1 + m2) * (1 + m3) - 1) * 100;
                        const preFormattedValue = this.custom_zeroCutOff_rounding(result, 2);
                        return preFormattedValue;
                    },
                    valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2, {zeroCutOff: true})
                },
            ]
        }
        return colDef_quarterSummary;
    }

    private _getYearlySummary(colDefCollection: ColGroupDef[], targetIndex) {
        const allTargetMonthColDefs: ColGroupDef[] = [];
        for (let index = targetIndex; index > targetIndex - 12; index--) {
            const element = colDefCollection[index];
            allTargetMonthColDefs.push(element);
        }

        const allTargetDollarField = allTargetMonthColDefs.map(colGroupDef => {
            const targetField = (colGroupDef.children as ColDef[]).filter(col => col.field.includes('TotalPL'))[0].field;
            return targetField;
        });
        const allTargetPctToFundCapField = allTargetMonthColDefs.map(colGroupDef => {
            const targetField = (colGroupDef.children as ColDef[]).filter(col => col.field.includes('PctToFundCap'))[0].field;
            return targetField;
        });

        const headerNameCollection = colDefCollection[targetIndex].headerName.split(' ');
        const year = headerNameCollection[1];
        const colDef_yearlySummary: ColGroupDef = {
            headerName: year,
            children: [
                {
                    headerName: 'P/L($)(yr)',
                    field: 'yearlySummary_TotalPL',
                    hide: this._checkDisplayMode('yearlySummary_TotalPL') && this._checkDisplayMode('P/L($)'),
                    valueGetter: params => {
                        const allTargetDollarValue = allTargetDollarField.map(field => {
                            return this.gridApi.getValue(field, params.node);
                        });
                        const result = allTargetDollarValue.reduce((a, b) => a + b, 0);
                        const preFormattedValue = this.custom_zeroCutOff_rounding(result, 0);
                        return preFormattedValue;
                    },
                    valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(0)
                },
                {
                    headerName: '% to Fund(yr)',
                    field: 'yearlySummary_PctToFundCap',
                    hide: this._checkDisplayMode('yearlySummary_PctToFundCap') && this._checkDisplayMode('% to Fund'),
                    width: 60,
                    valueGetter: params => {
                        const allTargetPctToFundCapValue = allTargetPctToFundCapField.map(field => {
                            return this.gridApi.getValue(field, params.node) / 100;
                        });
                        const result = allTargetPctToFundCapValue.reduce((a, b) => a * (1 + b), 1);
                        const finalResult = (result - 1) * 100;
                        const preFormattedValue = this.custom_zeroCutOff_rounding(finalResult, 2);
                        return preFormattedValue;
                    },
                    valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2)
                },
            ]
        }

        return colDef_yearlySummary;
    }

    private custom_zeroCutOff_rounding(value, digit) {

        let preFormattedValue;
        if (digit === 2) {
            if (Math.abs(value) < 0.01) {
                return 0;
            }
            preFormattedValue = parseFloat(value.toFixed(2));
        } else if (digit === 4) {
            if (Math.abs(value) < 0.0001) {
                return 0;
            }
            preFormattedValue = parseFloat(value.toFixed(4));
        } else if (digit === 0) {
            if (Math.abs(value) < 1) {
                return 0;
            }
            preFormattedValue = parseFloat(value.toFixed(0));
        }

        return preFormattedValue;
    }
}
