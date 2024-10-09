import { Component, ChangeDetectionStrategy, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import * as fromModels from '../../models/capitals.models';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';


@Component({
    selector: 'app-pod-strategy-allocation',
    templateUrl: './pod-strategy-allocation.component.html',
    styleUrls: ['./pod-strategy-allocation.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PodStrategyAllocationComponent implements OnInit, OnDestroy, OnChanges {

    @Input() podStrategyAllocations: any[];
    @Input() podStrategyAllocationsLoading: boolean;
    @Input() podStrategyAllocationsLoaded: boolean;
    @Input() podStrategyAllocationsError: string;

    private gridApi: GridApi;
    private columnApi: ColumnApi;
    public customGridOption: GridOptions;

    public extraOption = {
        autoSizeColumn: true
    };

    constructor(private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
        this.customGridOption = {
            defaultColDef: {
                cellStyle: params => {
                    return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
                },
                filter: 'agSetColumnFilter',
                editable: true
            },

            sideBar: false,
            rowSelection: 'single',
            floatingFilter: true,
            stopEditingWhenGridLosesFocus: true,
            deltaRowDataMode: true,
            editType: 'fullRow',
            context: this,

            getRowNodeId: data => data.crossPodStrat
        };
    }

    ngOnDestroy(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.podStrategyAllocationsLoading && changes.podStrategyAllocationsLoading.currentValue === true && this.gridApi) {
            this.gridApi.deselectAll();
        }

        if (changes.podStrategyAllocations && changes.podStrategyAllocations.currentValue && this.gridApi) {
            if (changes.podStrategyAllocations.previousValue === null) {
                this.gridApi.setRowData(this.podStrategyAllocations);
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.closeToolPanel();

        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.getColumnDefs());

        if (this.podStrategyAllocations) {
            this.gridApi.setRowData(this.podStrategyAllocations);
        }
    }

    getColumnDefs(): any {
        const colDefs: any[] = [];

        colDefs.push({ headerName: 'AsOfDate', field: 'asOfDate', editable: false, pinned: 'left'});
        colDefs.push({ headerName: 'Crosspod Strategy', field: 'crossPodStrat', editable: true, pinned: 'left', sort: 'asc'});
        colDefs.push({ headerName: 'Crosspod', field: 'crossPod', editable: true, pinned: 'left'});
        colDefs.push({ headerName: 'Opp Complex', field: 'opp', editable: true});
        colDefs.push({ headerName: 'Round', field: 'roundDigits', editable: true });
        colDefs.push({ headerName: 'Updated On', field: 'updateDate', editable: false });
        colDefs.push({ headerName: 'User Updated', field: 'userUpdated', editable: false });

        return colDefs;
    }

    getRowData() {
        const rowData = [];
        this.gridApi.forEachNode(function (node) {
            rowData.push(node.data);
        });
        return rowData;
    }

}
