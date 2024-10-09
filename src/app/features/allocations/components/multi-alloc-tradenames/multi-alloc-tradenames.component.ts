import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GridApi, ColumnApi, GridOptions, RowNode } from 'ag-grid-community';

import * as fromModels from './../../models/tradename.models';

import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-multi-alloc-tradenames',
    templateUrl: './multi-alloc-tradenames.component.html',
    styleUrls: ['./multi-alloc-tradenames.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiAllocTradeNamesComponent implements OnInit, OnDestroy, OnChanges {

    @Input() activeTradeNames: any[];
    @Input() multiAllocTradeNames: fromModels.IMultiAllocTradeName[];
    @Input() multiAllocTradeNamesLoading: boolean;
    @Input() multiAllocTradeNamesLoaded: boolean;
    @Input() multiAllocTradeNamesError: string;

    @Input() multiAllocationSplit: fromModels.IMultiAllocationSplit[];
    @Input() multiAllocationSplitLoading: boolean;
    @Input() multiAllocationSplitLoaded: boolean;
    @Input() multiAllocationSplitError: string;
    @Input() multiAllocationSplitStatus: string;

    @Output() selectTradeName: EventEmitter<fromModels.IMultiAllocTradeName> = new EventEmitter<fromModels.IMultiAllocTradeName>();
    @Output() createOrUpdateMultiAllocTradeName: EventEmitter<fromModels.INewOrUpdateMultiAllocTradeName> = new EventEmitter<fromModels.INewOrUpdateMultiAllocTradeName>()

    public selectedTradeName: fromModels.IMultiAllocTradeName;
    public isValid$ = new BehaviorSubject<boolean>(true);

    public allocationForm = this.fb.group({
        tradeName: ['', Validators.required],
        allocations: [0, {validators: [Validators.min(100), Validators.max(100)]}]
    });

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public readonly AGG_ROW_TID = -1;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
        },
        getRowStyle: params => {
            if (params.node.rowPinned) {
                return { 'background-color': '#c8f1f9', 'font-weight': 'bold' };
            }
        },
        columnDefs: [
            {
                colId: 'tid',
                headerName: 'TID',
                field: 'tid',
                hide: true
            },
            {
                colId: 'tradeID',
                headerName: 'TradeID',
                width: 150,
                field: 'tradeID',
                editable: true,
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: params => {
                    return {
                        values: [...params.context.activeTradeNames],
                        cellRenderer: innerParams => innerParams.value && `${innerParams.value.TradeID}`
                    }
                },
                valueSetter: params => {
                    try {
                        params.data['tradeID'] = params.newValue['TradeID'];
                        params.data['tradeName'] = params.newValue['TradeName'];
                        params.data['tid'] = params.newValue['TID']
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                colId: 'tradeName',
                headerName: 'TradeName',
                width: 400,
                field: 'tradeName'
            },
            {
                colId: 'amtAlloc',
                headerName: 'AmtAlloc',
                headerTooltip: 'AmtAlloc',
                width: 150,
                field: 'amtAlloc',
                valueFormatter: this.utilities.formatNumberWithCommas,
                cellStyle: (params) => {
                    return { 'background-color': '#faf9cf', 'justify-content': 'flex-end' };
                },
                editable: true,
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        const number = Number(newValue);
                        let totalFloatVal = 0.0;
                        params.api.forEachNode(node => {
                            let amtAlloc = Number(node.data['amtAlloc']);
                            if (!isNaN(amtAlloc)) {
                                totalFloatVal += amtAlloc;
                            }
                        });
                        if (!isNaN(number)) {
                            const newFloatVal = Math.abs(Number(newValue));
                            totalFloatVal += newFloatVal;
                            params.data[params.colDef.field] = newFloatVal;
                            params.data['isChanged'] = true;
                            params.api.forEachNode(node => {
                                node.data['pctAlloc'] = ((totalFloatVal !== 0.0) && (!isNaN(totalFloatVal)) 
                                    ? node.data['amtAlloc'] / totalFloatVal : 0.0) * 100.0;
                            });
                            params.data['pctAlloc'] = ((totalFloatVal !== 0.0) && (!isNaN(totalFloatVal)) 
                                ? newFloatVal / totalFloatVal : 0.0) * 100.0;
                            this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
                            return true;
                        } else if (params.newValue === '') {
                            params.data[params.colDef.field] = null;
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
                colId: 'pctAlloc',
                headerName: 'PctAlloc',
                headerTooltip: '% Alloc',
                field: 'pctAlloc',
                width: 150,
                valueFormatter: this.utilities.formatPercentNumberFormatterOrZero(2),
                cellStyle: (params) => {
                    if (!params.node.rowPinned) {
                        return { 'background-color': '#faf9cf', 'justify-content': 'flex-end' };
                    }
                },
                editable: true,
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        const number = Number(newValue);
                        if (!isNaN(number)) {
                            const newFloatVal = Math.abs(Number(newValue));
                            params.data[params.colDef.field] = newFloatVal;
                            params.data['isChanged'] = true;
                            setTimeout(() => {
                                this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
                            },100)
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                }
            }
        ],
        context: this
    };

    constructor(private fb: UntypedFormBuilder, private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes && changes.multiAllocationSplit && changes.multiAllocationSplit.currentValue && this.gridApi) {
            this.gridApi.setRowData(changes.multiAllocationSplit.currentValue);
            this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
        }

        if (changes && changes.activeTradeNames && changes.activeTradeNames.currentValue) {
            console.log('what is my active tradename', this.activeTradeNames);
            // this.gridApi.getColumnDef('tradeID').cellEditorParams = { values: changes.activeTradeNames.currentValue.map(tradeName => tradeName.TradeID) };
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    displayMultiTradeName(val: fromModels.IMultiAllocTradeName): string {
        if (val) {
            return `${val.tradeName}: ${val.tradeID}`;

        } else {
            return null;
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.setColumnDefs();
    }

    tradeNameSelected(e: MatAutocompleteSelectedEvent): void {
        const tradeName = e.option.value;
        this.selectedTradeName = tradeName;
        this.allocationForm.get('tradeName').setValue(tradeName);
        this.selectTradeName.emit(tradeName);
    }

    resetForm(): void {
        this.allocationForm.reset();
        if (this.gridApi) {
            this.multiAllocationSplit = [];
            this.gridApi.setRowData([]);
            this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
        }
    }

    private getTotalsRow(): any {
        const result = {};
        result['tid'] = this.AGG_ROW_TID;
        result['tradeID'] = null;
        result['tradeName'] = 'Totals';
        const aggCols = ['amtAlloc', 'pctAlloc'];
        aggCols.map((aggCol) => {
            let total = 0.0;
            this.gridApi.forEachNode((node: RowNode) => {
                if (node.data[aggCol]) {
                    total += Number(node.data[aggCol]);
                }
            });
            result[aggCol] = total;
            this.checkAllocations();
        });
        return result;
    }

    private setColumnDefs(): void {
        this.gridApi.setRowData([]);
        this.gridApi.setRowData(this.multiAllocationSplit);
        this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
    }

    private checkAllocations(): boolean {
        let result = true;
        let pctTotal = 0.0;
        if (this.selectTradeName !== null || this.selectTradeName === undefined) {
            if (this.gridApi) {
                this.gridApi.forEachNode((node: RowNode) => {
                    if (node.data['pctAlloc']) {
                        pctTotal += node.data['pctAlloc'];
                    }
                });
                if (Math.abs(pctTotal - 100.0) > .01) {
                    result = false;
                }
            }
        }
        this.allocationForm.get('allocations').setValue(pctTotal);
        // console.log('checking validation', result);
        this.isValid$.next(result);
        return result;
    }

    public addNewTradeNameSplit(e: any): void {
        const minTID = this.getMinTID();
        const newItem = [{tid: minTID - 1, tradeName: null, amtAlloc: 0, pctAlloc: 0}];
        this.gridApi.addItems(newItem);
        this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
    }

    public removeTradeNameSplit(e: any): void {
        let nodeToDelete = null;
        this.gridApi.forEachNode((node) => {
            if (node.data['tid'] !== this.AGG_ROW_TID) {
                nodeToDelete = node;
            }          
        });
        if (nodeToDelete !== null) {
            this.gridApi.removeItems([nodeToDelete]);
        }

        let totalFloatVal = 0.0;
        this.gridApi.forEachNode((node) => {
            let amtAlloc = node.data['amtAlloc'];
            if (!isNaN(amtAlloc)) {
                totalFloatVal += amtAlloc;
            }
        });
        
        if (totalFloatVal > 0.0) {
            this.gridApi.forEachNode(node => {
                node.data['pctAlloc'] = (totalFloatVal !== 0.0 ? node.data['amtAlloc'] / totalFloatVal : 0.0) * 100.0;
            });
            this.gridApi.refreshCells();
        }
        
        this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
        this.checkAllocations();
    }

    public resetTradeNameSplit(e: any): void {
        this.setColumnDefs();
    }

    private getMinTID(): number {
        let minTID = -1;
        this.gridApi.forEachNode((node) => {
            if (node.data['tid'] < minTID) {
                minTID = node.data['tid'];
            }
        });
        return minTID;
    }


    public submitForm() {
        const split = [];
        this.gridApi.forEachNode(node => {
            split.push(node.data)
        });
        const targetTradeName = this.allocationForm.get('tradeName').value;
        const payload: fromModels.INewOrUpdateMultiAllocTradeName = {
            tid: targetTradeName.tid,
            tradeID: targetTradeName.tradeID,
            tradeName: targetTradeName.tradeName || targetTradeName,
            split: split,
        };
        this.createOrUpdateMultiAllocTradeName.emit(payload);
    }

}
