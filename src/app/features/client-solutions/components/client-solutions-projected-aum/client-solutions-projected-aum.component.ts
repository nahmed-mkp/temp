import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';


import * as fromModels from './../../models';

@Component({
    selector: 'app-cs-projected-aum',
    templateUrl: './client-solutions-projected-aum.component.html',
    styleUrls: ['./client-solutions-projected-aum.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsProjectedAUMComponent implements OnInit, OnChanges {

    @Input() projectedAUM: fromModels.ProjectedAUM;
    @Input() projectedAUMLoading: boolean;
    @Input() projectedAUMLoaded: boolean;
    @Input() projectedAUMError: string;

    public extraOption = {sizeColumnsToFit: true, autoSizeColumns: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
        },
        floatingFilter: true
    };

    decimalFormatter(params) {
        return `${(params.value * 100).toFixed(2)}`;
    }

    constructor(private utilities: UtilityService ) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }
    ngOnChanges(changes: SimpleChanges): void {

        if (changes && changes.projectedAUM && changes.projectedAUM.currentValue) {

            if (this.gridApi) {
                const columnDefs = this.getColumnDefs(changes.projectedAUM.currentValue);
                this.gridApi.setColumnDefs(columnDefs);
                this.gridApi.setRowData([]);
                this.gridApi.setRowData(changes.projectedAUM.currentValue.data);
                this.gridApi.refreshCells();
                this.gridApi.sizeColumnsToFit();
            }
        }
    }

    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        if (this.gridApi && this.projectedAUM) {
            const columnDefs = this.getColumnDefs(this.projectedAUM);
            this.gridApi.setColumnDefs(columnDefs);
            this.gridApi.setRowData([]);
            this.gridApi.setRowData(this.projectedAUM.data);
            this.gridApi.refreshCells();
            this.gridApi.sizeColumnsToFit();
        }
    }

    getColumnDefs(projectedAUM: fromModels.ProjectedAUM): any[] {
        const colDefs: any[] = [];
        if (projectedAUM) {
            projectedAUM.cols.forEach((col) => {
                colDefs.push({
                    headerName: col,
                    field: col,
                    sortable: false,
                    cellStyle: (params) => {
                        if (col === 'MasterFundName') {
                            if (params.data['MasterFundName'] === 'Firm' || params.data['MasterFundName'] === 'Macro') {
                                return { 'font-weight': 'bold', 'background-color': '#f4ffe8' };
                            }
                        } else {
                            if (params.data['MasterFundName'] === 'Firm' || params.data['MasterFundName'] === 'Macro') {
                                return { 'justify-content': 'end', 'font-weight': 'bold', 'background-color': '#f4ffe8' };
                            } else {
                                return { 'justify-content': 'end' };
                            }
                        }
                    },
                    valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
                });
            });
        }
        return colDefs;
    }

}
