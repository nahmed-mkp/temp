import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { BehaviorSubject } from 'rxjs';

import * as fromModels from './../../models/sizing.models';

@Component({
    selector: 'app-sizing-sheet-default-capitals',
    templateUrl: './sizing-sheet-default-capitals.component.html',
    styleUrls: ['./sizing-sheet-default-capitals.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizingSheetDefaultCapitalComponent implements OnInit, OnChanges {

    @Input() defaultCapitals: fromModels.DefaultSizingCapital[];
    @Input() defaultCapitalsLoading: boolean;
    @Input() defaultCapitalsLoaded: boolean;
    @Input() defaultCapitalsError: string;

    @Output() saveChanges: EventEmitter<fromModels.DefaultSizingCapital[]> = new EventEmitter<fromModels.DefaultSizingCapital[]>();

    private newID = -1;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public defaultCapitals$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public changeStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private defaultCapitalsCurrent: fromModels.DefaultSizingCapital[] = [];

    public viewMode = 'showAll';

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            editable: true
        },
        getRowNodeId: data => data.NTName,
        getRowStyle: params => {
            if (params.node.data && (params.node.data.status === 'edited' || params.node.data.status === 'added')) {
                return { 'background-color': '#c8f1f9', 'font-style': 'italic', 'font-weight': 'bold' };
            } else if (params.node.data && (params.node.data.status === 'deleted')) {
                return { 'background-color': '#fea49e', 'font-weight': 'bold', 'text-decoration': 'line-through' };
            }
        },
        columnDefs: [
            {
                colId: 'NTName',
                headerName: 'Name',
                field: 'NTName',
                editable: true,
                sortedAt: 1,
                sortingOrder: ['asc'],
                checkboxSelection: false,
                cellEditor: 'agRichSelectCellEditor',
                // cellEditorParams: params => {
                //     return {
                //         values: [...this.getUniqueAssetClasses()]
                //     };
                // }
            },
            {
                colId: 'PodName',
                headerName: 'Pod or Fund',
                width: 200,
                sortedAt: 2,
                sortingOrder: ['asc'],
                field: 'PodName'
            },
            {
                colId: 'status',
                headerName: 'Status',
                width: 125,
                field: 'status'
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
                editedNode.data.origValue = Object.assign({}, { [colId]: oldValue });
            } else if (editedNode.data.origValue[colId] === undefined) {
                editedNode.data.origValue = Object.assign({}, editedNode.data.origValue, { [colId]: oldValue });
            }
            const editedValue = Object.assign({}, editedNode.data);
            const origValue = editedValue.origValue[colId];
            if (id === undefined && newValue !== origValue) {
                editedValue['status'] = 'added';
            } else {
                if (newValue !== origValue) {
                    editedValue['status'] = 'edited';
                } else {
                    let rowChanged = false;
                    Object.keys(editedValue.origValue).map((item) => {
                        if (editedValue[item] !== editedValue.origValue[item]) {
                            rowChanged = true;
                        }
                    });
                    if (!rowChanged) {
                        editedValue['status'] = null;
                    }
                }
            }
            this.defaultCapitalsCurrent[targetIndex] = editedValue;
            this.setValue(this.defaultCapitalsCurrent);
        },

        // Behavior -------------------------------------------------------------
        rowSelection: 'multiple',
        rowDragManaged: true,
        enableMultiRowDragging: true,
        suppressMoveWhenRowDragging: true,

        // frameworkComponents: {
        //     'SizingSheetSecurityRendererComponent': SizingSheetSecurityRendererComponent
        // }
    };

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.defaultCapitals && changes.defaultCapitals.currentValue) {
            this.defaultCapitalsCurrent = JSON.parse(JSON.stringify(changes.defaultCapitals.currentValue));
            this.setValue(this.defaultCapitalsCurrent);
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
        this.defaultCapitalsCurrent = JSON.parse(JSON.stringify(this.defaultCapitals));
        this.setValue(this.defaultCapitalsCurrent);
        this.newID = -1;
    }

    public onViewModeChanged(e: MatSlideToggleChange): void {
        this.viewMode = e.checked ? 'ShowChanges' : 'ShowAll';
        this.setValue(this.defaultCapitalsCurrent);
    }

    public addRow(): void {
        // const newEmptyRow: fromModels.SizingSecurity = {
        //     id: this.newID,
        //     mdid: null,
        //     assetClass: null,
        //     name: null,
        //     liquidityRank: null,
        //     status: 'added'
        // };
        // this.newID -= 1;
        // this.defaultCapitalsCurrent = [newEmptyRow, ...this.defaultCapitalsCurrent];
        // this.setValue(this.defaultCapitalsCurrent);
        // this.gridApi.setFocusedCell(0, 'assetClass');
    }

    public removeRow(): void {
        const selectedRows = this.gridApi.getSelectedRows();
        const selectedNodes = this.gridApi.getSelectedNodes();
        const existingIds = selectedRows.map((row) => row.id).filter((id) => id !== null && id !== undefined);
        const selectedRowIndices = selectedNodes.map((node) => node.rowIndex);
        const maxRowIndex = Math.max(...selectedRowIndices);
        const idsToRemove = [];
        const newList = this.defaultCapitalsCurrent.map((row) => {
            if (existingIds.indexOf(row.NTName) >= 0) {
                row['status'] = 'deleted';
                if (row.id < 0) {
                    idsToRemove.push(row.id);
                }
            }
            return row;
        });
        this.defaultCapitalsCurrent = newList.filter((row) => idsToRemove.indexOf(row.id) < 0);
        this.setValue(this.defaultCapitalsCurrent);
        this.gridApi.setFocusedCell(maxRowIndex + 1, 'assetClass');
    }

    // public getUniqueAssetClasses(): string[] {
    //     if (this.defaultCapitals && this.defaultCapitals.length > 0) {
    //         const assetClasses = [];
    //         this.defaultCapitals.map((security) => {
    //             if (assetClasses.indexOf(security.assetClass) < 0) {
    //                 assetClasses.push(security.assetClass);
    //             }
    //         });
    //         return assetClasses.sort();
    //     } else {
    //         return [];
    //     }
    // }

    private setValue(data: fromModels.DefaultSizingCapital[]): void {
        if (this.viewMode === 'ShowChanges') {
            const filteredItems = data.filter(row => row['status'] !== undefined && row['status'] !== null);
            this.defaultCapitals$.next([...filteredItems]);
        } else {
            this.defaultCapitals$.next([...data]);
        }
        this.checkChangedStatus(data);
    }

    private checkChangedStatus(data: fromModels.DefaultSizingCapital[]): void {
        let status = false;
        const changedRows = data.filter(row => row['status'] !== undefined && row['status'] !== null);
        if (changedRows.length > 0) {
            status = true;
        }
        this.changeStatus$.next(status);
    }

    public onApplyChanges() {
    }
}
