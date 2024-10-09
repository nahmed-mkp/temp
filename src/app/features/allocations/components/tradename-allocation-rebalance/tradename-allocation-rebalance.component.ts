import { Component, OnInit, OnDestroy, OnChanges, ChangeDetectionStrategy,
            Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { BehaviorSubject } from 'rxjs';

import * as moment from 'moment';

import { UtilityService } from 'src/app/services';
import { StrategyRendererComponent } from './../renderer-components/strategy-renderer-component';

import * as fromModels from './../../models';
import { CapitalWorkflowDialogComponent } from '../capital-workflow-dialog/capital-workflow-dialog.component';


@Component({
    selector: 'app-tradename-allocation-rebalance',
    templateUrl: './tradename-allocation-rebalance.component.html',
    styleUrls: ['./tradename-allocation-rebalance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameAllocationRebalanceComponent implements OnInit, OnDestroy, OnChanges {

    @ViewChild('sidenav') sidenav: MatSidenav;

    @Input() selectedDate: string;
    @Input() allocations: any;
    @Input() loading: boolean;
    @Input() loaded: boolean;
    @Input() error: string;
    @Input() strategyAllocation: any;

    @Input() clientServicesTradeThemes: any[];

    @Input() pmPodDetails: any;
    @Input() pmPodDetailsLoading: boolean;
    @Input() pmPodDetailsLoaded: boolean;
    @Input() pmPodDetailsError: string;
    @Input() crossPodStratergyMapping: any;

    @Input() pms: fromModels.PortfolioManager[];
    @Input() creatingTradeName: boolean;
    @Input() createdTradeName: boolean;
    @Input() createTradeNameSuccessMessage: string;
    @Input() createTradeNameFailureMessage: string;

    @Input() multiAllocTradeNames: fromModels.IMultiAllocTradeName[];
    @Input() multiAllocTradeNamesLoading: boolean;
    @Input() multiAllocTradeNamesLoaded: boolean;
    @Input() multiAllocTradeNamesError: string;

    @Input() multiAllocationSplit: fromModels.IMultiAllocationSplit[];
    @Input() multiAllocationSplitLoading: boolean;
    @Input() multiAllocationSplitLoaded: boolean;
    @Input() multiAllocationSplitError: string;
    @Input() multiAllocationSplitStatus: string;

    @Output() changeDate = new EventEmitter<string>();
    @Output() saveChanges = new EventEmitter<any[]>();
    @Output() reset = new EventEmitter<{ date: string, isChanged: boolean }>();

    @Output() loadPMPodDetails = new EventEmitter<void>();
    @Output() loadMultiAllocTradeNames = new EventEmitter<void>();
    @Output() loadMultiAllocTradeName = new EventEmitter<fromModels.IMultiAllocTradeName>();
    @Output() createTradeName = new EventEmitter<fromModels.INewTradeName>();

    @Output() onCreateOrUpdateMultiAllocTradeName = new EventEmitter<fromModels.INewOrUpdateMultiAllocTradeName>();


    public activeTradeNames$ = new BehaviorSubject<any[]>([]);

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private isChanged = false;

    public sidePane = 'newTradeName';
    public editable = false;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false
        },
        getRowNodeId: data => data.TID,
        deltaRowDataMode: false,
        rowSelection: 'multiple',
        columnDefs: [
            {
                headerName: 'Date',
                width: 120,
                field: 'AsOfDate'
            },
            {
                headerName: 'CrossPod',
                width: 200,
                field: 'CrossPodName',
                editable: params => {
                    return params.data['editable'];
                },
                cellStyle: { 'background-color': '#8ce8e8', 'justify-content': 'flex-start' },
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: params => {
                    return this.getCrossPodNames(params);
                },
                valueFormatter: (params) => {
                    return this.formatCrossPodName(params.value);
                },
                valueParser: (params) => {
                    return this.parseCrossPodName(params.newValue);
                },
                filter: 'agSetColumnFilter',
                floatingFilter: true,
            },
            {
                headerName: 'TradeName',
                width: 400,
                field: 'TradeName',
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                filter: 'agSetColumnFilter',
                floatingFilter: true,
            },
            {
                headerName: 'TradeID',
                width: 150,
                field: 'TradeID',
                filter: 'agSetColumnFilter',
                floatingFilter: true,
            },
            {
                headerName: 'Strategy',
                width: 250,
                field: 'Strategy',
                filter: 'agSetColumnFilter',
                floatingFilter: true,
                editable: params => {
                    return params.data['editable'];
                },
                cellStyle: { 'background-color': '#8ce8e8', 'justify-content': 'flex-start' },
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: params => {
                    return this.getStrategies(params);
                },
                valueFormatter: (params) => {
                    return this.formatStrategy(params.value);
                },
                valueParser: (params) => {
                    return this.parseStrategy(params.newValue);
                },
                valueSetter: (params) => {
                    if (params.newValue !== params.oldValue) {

                        // store inital values in order to swap back if user selects custom
                        if(params.data['Opp_old'] == undefined){
                            params.data['Opp_old'] = params.data['Opp'];
                            params.data['Enhanced Opp_old'] = params.data['Enhanced Opp'];
                            params.data['MA7_old'] = params.data['MA7'];
                            params.data['Alpha Port_old'] = params.data['Alpha Port'];
                            params.data['GMMK_old'] = params.data['GMMK'];
                        }

                        if (params.newValue !== 'Custom') {

                            // use _new key when switching to STIR or Cash Management
                            if (params.newValue == 'STIR' || params.newValue == 'Cash Management'){
                                params.data['Opp'] = this.strategyAllocation[params.newValue]['Opp_new'];
                                params.data['Enhanced Opp'] = this.strategyAllocation[params.newValue]['Enhanced Opp_new'];
                                params.data['MA7'] = this.strategyAllocation[params.newValue]['MA7_new'];
                                params.data['Alpha Port'] = this.strategyAllocation[params.newValue]['Alpha Port_new'];
                                params.data['GMMK'] = this.strategyAllocation[params.newValue]['GMMK_new'];
                            } else {
                                params.data['Opp'] = this.strategyAllocation[params.newValue]['Opp'];
                                params.data['Enhanced Opp'] = this.strategyAllocation[params.newValue]['Enhanced Opp'];
                                params.data['MA7'] = this.strategyAllocation[params.newValue]['MA7'];
                                params.data['Alpha Port'] = this.strategyAllocation[params.newValue]['Alpha Port'];
                                params.data['GMMK'] = this.strategyAllocation[params.newValue]['GMMK'];
                            }

                        } 

                        if (params.newValue === 'Custom') {
                            params.data['Opp'] = params.data['Opp_old'];
                            params.data['Enhanced Opp'] = params.data['Enhanced Opp_old'];
                            params.data['MA7'] = params.data['MA7_old'];
                            params.data['Alpha Port'] = params.data['Alpha Port_old'];
                            params.data['GMMK'] = params.data['GMMK_old'];
                        }

                        params.data['TotalAlloc'] = params.data['Opp'] + params.data['Enhanced Opp'] + params.data['MA7'] + params.data['Alpha Port'] + params.data['GMMK']
                        params.data['Strategy'] = params.newValue;
                        params.data['isChanged'] = true;
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                headerName: 'Opp (%)',
                field: 'Opp',
                editable: params => {
                    return params.data['Strategy'] === 'Custom' && params.data['editable'];
                },
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: params => params.data['oppChanged'] === true ?
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end', 'font-style': 'italic' } :
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end' },
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        if (typeof newValue === 'string' && isNaN(parseFloat(newValue)) === false) {
                            const newFloatVal = parseFloat(newValue);
                            const total = parseFloat(params.data['Alpha Port']) + parseFloat(params.data['Enhanced Opp']) +
                                parseFloat(params.data['MA7']) + parseFloat(params.data['GMMK']) + newFloatVal;
                            params.data['TotalAlloc'] = total;
                            params.data[params.colDef.field] = newFloatVal;
                            this.isChanged = true;
                            params.data['isChanged'] = true;
                            params.data['oppChanged'] = true;
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                headerName: 'Enhanced Opp (%)',
                field: 'Enhanced Opp',
                editable: params => {
                    return params.data['Strategy'] === 'Custom' && params.data['editable'];
                },
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: params => params.data['enhancedChanged'] === true ?
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end', 'font-style': 'italic' } :
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end' },
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        if (typeof newValue === 'string' && isNaN(parseFloat(newValue)) === false) {
                            const newFloatVal = parseFloat(newValue);
                            const total = parseFloat(params.data['Opp']) + parseFloat(params.data['Alpha Port']) +
                                parseFloat(params.data['MA7']) + parseFloat(params.data['GMMK']) + newFloatVal;
                            params.data['TotalAlloc'] = total;
                            params.data[params.colDef.field] = newFloatVal;
                            this.isChanged = true;
                            params.data['isChanged'] = true;
                            params.data['enhancedChanged'] = true;
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                headerName: 'MA7 (%)',
                field: 'MA7',
                editable: params => {
                    return params.data['Strategy'] === 'Custom' && params.data['editable'];
                },
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: params => params.data['ma7Changed'] === true ?
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end', 'font-style': 'italic' } :
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end' },
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        if (typeof newValue === 'string' && isNaN(parseFloat(newValue)) === false) {
                            const newFloatVal = parseFloat(newValue);
                            const total = parseFloat(params.data['Opp']) + parseFloat(params.data['Enhanced Opp']) +
                                parseFloat(params.data['Alpha Port']) + parseFloat(params.data['GMMK']) + newFloatVal;
                            params.data['TotalAlloc'] = total;
                            params.data[params.colDef.field] = newFloatVal;
                            this.isChanged = true;
                            params.data['isChanged'] = true;
                            params.data['ma7Changed'] = true;
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                headerName: 'Alpha Port (%)',
                field: 'Alpha Port',
                editable: params => {
                    return params.data['Strategy'] === 'Custom' && params.data['editable'];
                },
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: params => params.data['alphaPortChanged'] === true ?
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end', 'font-style': 'italic' } :
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end' },
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        if (typeof newValue === 'string' && isNaN(parseFloat(newValue)) === false) {
                            const newFloatVal = parseFloat(newValue);
                            const total = parseFloat(params.data['Opp']) + parseFloat(params.data['Enhanced Opp']) +
                                parseFloat(params.data['MA7']) + parseFloat(params.data['GMMK']) + newFloatVal;
                            params.data['TotalAlloc'] = total;
                            params.data[params.colDef.field] = newFloatVal;
                            this.isChanged = true;
                            params.data['isChanged'] = true;
                            params.data['alphaPortChanged'] = true;
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                }
            }, {
                headerName: 'GMMK (%)',
                field: 'GMMK',
                editable: params => {
                    return params.data['Strategy'] === 'Custom' && params.data['editable'];
                },
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: params => params.data['gmmkChanged'] === true ?
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end', 'font-style': 'italic' } :
                    { 'background-color': '#b6efe7', 'justify-content': 'flex-end' },
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        if (typeof newValue === 'string' && isNaN(parseFloat(newValue)) === false) {
                            const newFloatVal = parseFloat(newValue);
                            const total = parseFloat(params.data['Opp']) + parseFloat(params.data['Enhanced Opp']) +
                                parseFloat(params.data['MA7']) + parseFloat(params.data['Alpha Port']) + newFloatVal;
                            params.data['TotalAlloc'] = total;
                            params.data[params.colDef.field] = newFloatVal;
                            this.isChanged = true;
                            params.data['isChanged'] = true;
                            params.data['gmmkChanged'] = true;
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                headerName: 'Total (%)',
                field: 'TotalAlloc',
                editable: false,
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: params => {
                    return parseFloat(params.data['TotalAlloc']) !== 100.00 ?
                    { 'background-color': '#f3b6b7', 'justify-content': 'flex-end' } :
                    { 'background-color': '#cbfae6', 'justify-content': 'flex-end' };
                }
            },
            {
                headerName: 'Updated',
                field: 'Updated'
            },
            {
                headerName: 'TID',
                field: 'TID'
            }
        ],
        frameworkComponents: {
            'strategyRenderer': StrategyRendererComponent
        },
        getRowStyle: params => {
            if (params.data['isChanged']) {
                return {
                    'font-weight': 'bolder',
                    'color': '#6e8eeccc',
                    'font-style': 'italic',
                };
            }
        },
    };

    date = new UntypedFormControl(new Date());
    serializedDate = new UntypedFormControl((new Date()).toISOString());

    constructor(private utilities: UtilityService, private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.allocations && this.gridApi) {
            if (changes.allocations.currentValue.length > 0) {
                this.editable = changes.allocations.currentValue[0]['editable'];
            }
            const activeTradeNames = changes.allocations.currentValue.map((allocation) => {
                return {TradeID: allocation.TradeID, TradeName: allocation.TradeName, TID: allocation.TID};
            });
            this.activeTradeNames$.next(activeTradeNames);
            this.gridApi.setRowData(changes.allocations.currentValue);
            this.gridApi.refreshCells();
        }
    }

    ngOnDestroy(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.allocations.length > 0) { this.gridApi.setRowData(this.allocations); }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    onSearch(searchCriteria: string): void {
        this.gridApi.setQuickFilter(searchCriteria);
    }

    onCreateTradeName(param: fromModels.INewTradeName): void {
        this.createTradeName.emit(param);
    }

    onSaveChanges(): void {
        const results = [];
        this.gridApi.forEachNode((node) => {
            if (node.data['isChanged'] === true) {
                results.push(node.data);
            }
        });
        if (results.length > 0) {
            this.saveChanges.emit(results);
        }
    }

    onShowTradeNameCreation(view: string): void {
        this.sidenav.open();
        this.sidePane = view;
        if (view === 'newTradeName') {
            this.loadPMPodDetails.emit();
        } else if (view === 'newMultiTradeName') {
            this.loadMultiAllocTradeNames.emit();

        }
    }

    onEmailAllocationReport(): void {
        // TODO:
    }

    onResetGrid(): void {
        this.reset.emit({date: this.selectedDate, isChanged: this.isChanged});
    }

    private setColumnDefs(): void {
        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.customGridOption.columnDefs);
        this.gridApi.sizeColumnsToFit();
    }

    selectMultiAllocTradeName(e: fromModels.IMultiAllocTradeName): void {
        this.loadMultiAllocTradeName.emit(e);
    }

    getStrategies(params) {
        if (this.crossPodStratergyMapping && this.crossPodStratergyMapping[params.data['CrossPodName']]) {
            return {
                values: ['Custom', ...this.crossPodStratergyMapping[params.data['CrossPodName']]]
            };
        } else {
            return {
                values: ['Custom']
            };
        }
    }

    getCrossPodNames(params) {
        if (this.crossPodStratergyMapping) {
            return {
                values: Object.keys(this.crossPodStratergyMapping)
            };
        } else {
            return {
                values: []
            };
        }
    }

    formatStrategy(input: any): any {
        return input;
    }

    parseStrategy(input: any): any {
        const foo = 'bar';
        return foo;
    }

    formatCrossPodName(input: any): any {
        return input;
    }

    parseCrossPodName(input: any): any {
        const foo = 'bar';
        return foo;
    }

    public createOrUpdateMultiAllocTradeName(payload: fromModels.INewOrUpdateMultiAllocTradeName) {
        this.onCreateOrUpdateMultiAllocTradeName.emit(payload);
    }

    public updateSelectedTrades(): void {
        const selNodes = this.gridApi.getSelectedNodes();
        selNodes.forEach(node => {
            const newData = Object.assign({}, node.data);
            newData['Opp'] = node.data['Opp_new'];
            newData['Enhanced Opp'] = node.data['Enhanced Opp_new'];
            newData['Alpha Port'] = node.data['Alpha Port_new'];
            newData['MA7'] = node.data['MA7_new'];
            newData['GMMK'] = node.data['GMMK_new'];
            newData['isChanged'] = true;
            node.setData(newData);
        });
    }

    public showCapitalsWorkflow(): void {
        const dialogRef = this.dialog.open(CapitalWorkflowDialogComponent, {
            hasBackdrop: true,
            width: '80%',
            height: '80%'
            // data: { type, columnStates, category: this.category }
        });
    }

}
