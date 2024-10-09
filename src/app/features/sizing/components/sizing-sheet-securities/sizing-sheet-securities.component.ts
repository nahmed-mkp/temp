import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { BehaviorSubject } from 'rxjs';

import * as fromModels from './../../models/sizing.models';
import { SizingSheetSecurityRendererComponent } from './sizing-sheet-security-renderer.component';
import { MarketDataSearchAggridCellEditorLayoutComponent, MarketDataTypeSearchAggridCellEditorLayoutComponent } from 'src/app/shared/custom/market-data-search/containers';

@Component({
    selector: 'app-sizing-sheet-securities',
    templateUrl: './sizing-sheet-securities.component.html',
    styleUrls: ['./sizing-sheet-securities.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizingSheetSecuritiesComponent implements OnInit, OnChanges {

    @Input() sizingSheetSecurities: fromModels.SizingSecurity[];
    @Input() sizingSheetSecuritiesLoading: boolean;
    @Input() sizingSheetSecuritiesLoaded: boolean;
    @Input() sizingSheetSecuritiesError: string;

    @Output() saveChanges: EventEmitter<fromModels.SizingSecurity[]> = new EventEmitter<fromModels.SizingSecurity[]>();

    private newID = -1;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public sizingSheetSecurities$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public changeStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private sizingSheetSecuritiesCurrent: fromModels.SizingSecurity[] = [];

    public viewMode = 'showAll';

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            editable: true
        },
        getRowNodeId: data => data.id,
        // deltaRowDataMode: true,
        getRowStyle: params => {
            if (params.node.data && (params.node.data.status === 'edited' || params.node.data.status === 'added')) {
                return { 'background-color': '#c8f1f9', 'font-style': 'italic', 'font-weight': 'bold' };
            } else if (params.node.data && (params.node.data.status === 'deleted')) {
                return { 'background-color': '#fea49e', 'font-weight': 'bold', 'text-decoration': 'line-through'};
            }
        },
        columnDefs: [
            {
                colId: 'assetClass',
                headerName: 'Asset Class',
                field: 'assetClass',
                editable: true,
                sortedAt: 1,
                sortingOrder: ['asc'],
                checkboxSelection: false,
                cellRenderer: 'SizingSheetSecurityRendererComponent',
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: params => {
                    return {
                        values: [...this.getUniqueAssetClasses()]
                    };
                }
            },
            // Universal Security Search Editor -----------------------------------
            {
                colId: 'securityName',
                headerName: 'Security Name',
                width: 150,
                field: 'securityName',
                cellEditor: 'MarketDateSearchAggridCellEditorLayoutComponent',
                cellEditorParams: {
                    mdid_targetField: 'mdid'
                }
            },
            {
                colId: 'marketDataType',
                headerName: 'Type',
                width: 150,
                field: 'marketDataType',
                cellEditor: 'MarketDataTypeSearchAggridCellEditorLayoutComponent',
                cellEditorParams: {
                    mdid_targetField: 'mdid'
                }
            },
            // ------------------------------------------------------------------------
            {
                colId: 'name',
                headerName: 'Display Name',
                width: 200,
                sortedAt: 2,
                sortingOrder: ['asc'],
                field: 'name'
            },
            {
                colId: 'liquidityRank',
                headerName: 'Liq. Rank',
                width: 150,
                field: 'liquidityRank',
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: params => {
                    return {
                        values: [1, 2, 3]
                    };
                }
            },

            {
                colId: 'mdid',
                headerName: 'MDID',
                width: 125,
                field: 'mdid'
            },
            {
                colId: 'mdid2',
                headerName: 'MDID2',
                width: 125,
                field: 'mdid2'
            },{
                colId: 'status',
                headerName: 'status',
                field: 'status',
            }

        ],

        // Events
        onCellValueChanged: params => {
            const editedNode = params.node;
            const targetIndex = params.node.rowIndex;
            const newValue = params.newValue;
            const oldValue = params.oldValue;
            const colId = params.colDef.colId;
            const id = params.node.data.id;
            if (editedNode.data.origValue === undefined) {
                editedNode.data.origValue = {};
                editedNode.data.origValue = Object.assign({}, {[colId]: oldValue});
            } else if (editedNode.data.origValue[colId] === undefined) {
                editedNode.data.origValue = Object.assign({}, editedNode.data.origValue, {[colId]: oldValue});
            }
            const editedValue = Object.assign({}, editedNode.data);
            const origValue = editedValue.origValue[colId];
            if (id === undefined && newValue !== origValue) {
                editedValue['status'] = 'added';
            } else {
                if (newValue !== origValue && editedValue['status'] !== 'added') {
                    editedValue['status'] = 'edited';
                } else {
                    let rowChanged = false;
                    Object.keys(editedValue.origValue).map((item) =>  {
                        if (editedValue[item] !== editedValue.origValue[item]) {
                            rowChanged = true;
                        }
                    });
                    if (!rowChanged) {
                        editedValue['status'] = null;
                    }
                }
            }
            this.sizingSheetSecuritiesCurrent[targetIndex] = editedValue;
            this.setValue(this.sizingSheetSecuritiesCurrent);
        },

        // Behavior -------------------------------------------------------------
        rowSelection: 'multiple',
        rowDragManaged: true,
        enableMultiRowDragging: true,
        suppressMoveWhenRowDragging: true,

        frameworkComponents: {
            'SizingSheetSecurityRendererComponent': SizingSheetSecurityRendererComponent,
            'MarketDateSearchAggridCellEditorLayoutComponent': MarketDataSearchAggridCellEditorLayoutComponent,
            'MarketDataTypeSearchAggridCellEditorLayoutComponent': MarketDataTypeSearchAggridCellEditorLayoutComponent
        }
    };

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.sizingSheetSecurities && changes.sizingSheetSecurities.currentValue) {
            this.sizingSheetSecuritiesCurrent = JSON.parse(JSON.stringify(changes.sizingSheetSecurities.currentValue));
            this.setValue(this.sizingSheetSecuritiesCurrent);
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    public onReset(): void {
        this.sizingSheetSecuritiesCurrent = JSON.parse(JSON.stringify(this.sizingSheetSecurities));
        this.setValue(this.sizingSheetSecuritiesCurrent);
        this.newID = -1;
    }

    public onViewModeChanged(e: MatSlideToggleChange): void {
        this.viewMode = e.checked ? 'ShowChanges' : 'ShowAll';
        this.setValue(this.sizingSheetSecuritiesCurrent);
    }

    public addRow(): void {
        const newEmptyRow: fromModels.SizingSecurity = {
            id: this.newID,
            mdid: null,
            assetClass: null,
            name: null,
            liquidityRank: null,
            status: 'added'
        };
        this.newID -= 1;
        this.sizingSheetSecuritiesCurrent = [newEmptyRow, ...this.sizingSheetSecuritiesCurrent];
        this.setValue(this.sizingSheetSecuritiesCurrent);
        this.gridApi.setFocusedCell(0, 'assetClass');
    }

    public removeRow(): void {
        const selectedRows = this.gridApi.getSelectedRows();
        const selectedNodes = this.gridApi.getSelectedNodes();
        const existingIds = selectedRows.map((row) => row.id).filter((id) => id !== null && id !== undefined);
        const selectedRowIndices = selectedNodes.map((node) => node.rowIndex);
        const maxRowIndex = Math.max(...selectedRowIndices);
        const idsToRemove = [];
        const newList = this.sizingSheetSecuritiesCurrent.map((row) => {
            if (existingIds.indexOf(row.id) >= 0) {
                row['status'] = 'deleted';
                if (row.id < 0) {
                    idsToRemove.push(row.id);
                }
            }
            return row;
        });
        this.sizingSheetSecuritiesCurrent = newList.filter((row) => idsToRemove.indexOf(row.id) < 0);
        this.setValue(this.sizingSheetSecuritiesCurrent);
        this.gridApi.setFocusedCell(maxRowIndex + 1, 'assetClass');
    }

    public getUniqueAssetClasses(): string[] {
        if (this.sizingSheetSecurities && this.sizingSheetSecurities.length > 0) {
            const assetClasses = [];
            this.sizingSheetSecurities.map((security) => {
                if (assetClasses.indexOf(security.assetClass) < 0) {
                    assetClasses.push(security.assetClass);
                }
            });
            return assetClasses.sort();
        } else {
            return [];
        }
    }

    private setValue(data: fromModels.SizingSecurity[]): void {
        if (this.viewMode === 'ShowChanges') {
            const filteredItems = data.filter(row => row['status'] !== undefined && row['status'] !== null);
            this.sizingSheetSecurities$.next([...filteredItems]);
        } else {
            this.sizingSheetSecurities$.next([...data]);
        }
        this.checkChangedStatus(data);
    }

    private checkChangedStatus(data: fromModels.SizingSecurity[]): void {
        let status = false;
        const changedRows = data.filter(row => row['status'] !== undefined && row['status'] !== null);
        if (changedRows.length > 0) {
            status = true;
        }
        this.changeStatus$.next(status);
    }

    public onApplyChanges(): void {
        console.log('this.sizingSheetSecuritiesCurrent', this.sizingSheetSecuritiesCurrent)

        const targetSecurities = this.sizingSheetSecuritiesCurrent.filter(row => row['status'] !== undefined && row['status'] !== null);
        this.saveChanges.emit(targetSecurities);
    }

}
