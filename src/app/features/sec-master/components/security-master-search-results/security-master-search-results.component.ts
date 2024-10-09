import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';

import * as fromModels from './../../models';

@Component({
    selector: 'app-sec-master-search-results',
    templateUrl: './security-master-search-results.component.html',
    styleUrls: ['./security-master-search-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecMasterSearchResultsComponent implements OnInit, OnChanges {

    @Input() searchResults: any[];

    @Output() securitySelected = new EventEmitter<number>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        floatingFilter: true,
        getRowNodeId: data => data.sid,
        deltaRowDataMode: true,
        columnDefs: [
            {
                headerName: 'SID',
                field: 'sid',
                editable: false,
                width: 100,
                filter: 'agNumberColumnFilter'
            },
            {
                headerName: 'Name',
                field: 'name',
                editable: false,
                sort: 'asc',
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'CUSIP',
                field: 'cusip',
                editable: false,
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'Security Type',
                field: 'securityType',
                editable: false,
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'CRD ID',
                field: 'crid',
                editable: false,
                width: 100,
                filter: 'agNumberColumnFilter'
            }
        ],
        // onRowClicked: (params) => {
        //     if (params) {
        //         this.securitySelected.emit(params.data['sid']);
        //     }
        // },
        onRowSelected: (params) => {
            const selRows = this.gridApi.getSelectedRows();
            if (selRows.length === 1) {
                this.securitySelected.emit(selRows[0]['sid']);
            }
        },
        navigateToNextCell: this.customNavigation,
    };

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.searchResults && changes.searchResults.currentValue && this.gridApi) {
            this.gridApi.setRowData(changes.searchResults.currentValue);
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.searchResults.length > 0) { this.gridApi.setRowData(this.searchResults); }
    }

    customNavigation(params) {
        let previousCell = params.previousCellDef;
        const suggestedNextCell = params.nextCellDef;

        const KEY_UP = 38;
        const KEY_DOWN = 40;
        const KEY_LEFT = 37;
        const KEY_RIGHT = 39;

        switch (params.key) {
            case KEY_DOWN:
                previousCell = params.previousCellDef;
                // set selected cell on current cell + 1
                this.gridApi.forEachNode(function (node) {
                    if (previousCell.rowIndex + 1 === node.rowIndex) {
                        node.setSelected(true);
                    }
                });
                return suggestedNextCell;
            case KEY_UP:
                previousCell = params.previousCellDef;
                // set selected cell on current cell - 1
                this.gridApi.forEachNode(function (node) {
                    if (previousCell.rowIndex - 1 === node.rowIndex) {
                        node.setSelected(true);
                    }
                });
                return suggestedNextCell;
            case KEY_LEFT:
            case KEY_RIGHT:
                return suggestedNextCell;
            default:
                // NOOP;
                break;
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }
}
