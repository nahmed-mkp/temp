import { Component, OnInit, HostBinding, OnDestroy, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridOptions, ValueFormatterParams, GridApi, ColumnApi } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromStore from './../../store';

@Component({
    selector: 'app-security-master-reconciliation-detail-grid-deep-viewer',
    templateUrl: './security-master-reconciliation-detail-grid-deep-viewer.component.html',
    styleUrls: ['./security-master-reconciliation-detail-grid-deep-viewer.component.scss']
})
export class SecurityMasterReconciliationDetailGridDeepViewerComponent implements ICellRendererAngularComp, OnDestroy {

    @HostBinding('class') classes = 'full-strech-block';
    @Input() match: boolean;

    public customGridOption: GridOptions;
    public data: any;
    public gridApi: GridApi;
    private columnApi: ColumnApi;
    public extraOption = { autoSizeColumns: true };

    public onlyDifferentColumnVisibility: boolean;

    private subscription: Subscription;


    constructor(private store: Store<fromStore.SecurityMasterState>) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    agInit(params: any): void {

        this.data = params.data['sourceData'];
        const columnNames = Object.keys(this.data[0]);
        this.match = params.match;

        this.customGridOption = {
            defaultColDef: { 
                filter: 'agTextColumnFilter', 
                cellStyle: { 'justify-content': 'flex-end'}
            },

            rowClass: 'medium-row',
            rowHeight: 22,
            headerHeight: 20,

            columnDefs: columnNames.map(columnName => {
                return {
                    headerName: columnName,
                    field: columnName,
                    // valueFormatter: params => {
                    //     if (params.value) {
                    //         const {Parallel, Prod} = params.value;
                    //         return `${Parallel}/${Prod}`;
                    //     }
                    // },
                    cellStyle: params => {
                        const {Parallel, Prod, Match} = params.value;
                        if (Match === true) {
                            return {'justify-content': 'flex-end'};
                        } else {
                            return {'justify-content': 'flex-end', 'background': '#ff000036'};
                        }
                    },
                    cellRenderer: params => {
                        const {Parallel, Prod} = params.value;
                        return `<strong>${Prod}</strong>&nbsp;|&nbsp;${Parallel}`;
                    }
                };
            }),
        };

        this.subscription = this.store.select(fromStore.getOnlyDifferentColumnVisibility).subscribe(result => {
            this.onlyDifferentColumnVisibility = result;
            if (this.columnApi && this.match === false) {
                this.setOnlynlyDifferentColumnVisibility(this.onlyDifferentColumnVisibility);
            }
        })
    }

    refresh(params: any): boolean {
        return false;
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        if (this.onlyDifferentColumnVisibility === true && this.match === false) {
            setTimeout(() => this.setOnlynlyDifferentColumnVisibility(this.onlyDifferentColumnVisibility), 200)
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private setOnlynlyDifferentColumnVisibility(status) {
        const columnState = this.columnApi.getColumnState();

        const targetData = this.data[0];
        const unMatchColumnNames = [];
        Object.keys(targetData).map(key => {
            if (targetData[key]['Match'] === false) {
                unMatchColumnNames.push(key);
            }
        });
        const newColumnState = columnState.map(column => {
            let newColumn;
            if (status === true) {
                if (unMatchColumnNames.includes(column.colId)) {
                    newColumn = Object.assign({}, column, {hide: false});
                } else {
                    newColumn = Object.assign({}, column, {hide: true});
                }
            } else {
                newColumn = Object.assign({}, column, {hide: false});
            }
            return newColumn;
        });
        this.columnApi.setColumnState(newColumnState);
    }
}
