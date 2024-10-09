import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-fund-matrix',
    templateUrl: './fund-matrix.component.html',
    styleUrls: ['./fund-matrix.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundMatrixComponent implements OnInit, OnDestroy, OnChanges {

    @Input() fundComplex: string;
    @Input() fundCapitals: any[];

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private columnDefs: any[];
    private callBackInitialized = false;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('CrossPodName') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            sortable: false,
            suppressMenu: true
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        rowSelection: 'single',
        floatingFilter: false,
        stopEditingWhenGridLosesFocus: true,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        getRowNodeId: data => data.index
    };

    public extraOption = {
        sizeColumnsToFit: true
    };

    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() { }

    ngOnDestroy() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.fundCapitals && changes.fundCapitals.currentValue && changes.fundCapitals.currentValue.length > 0) {
            this.columnDefs = this.getColumnDefs(changes.fundCapitals.currentValue);
            setTimeout(() => {
                this.gridApi.setRowData([]);
                this.gridApi.setRowData(changes.fundCapitals.currentValue);
            }, 200);
        }
    }

    getColumnDefs(fundCapitals: any[]): any {

        if (fundCapitals.length === 0) {
            return [];
        }

        const colDefs: any[] = [];

        const funds = Object.keys(fundCapitals[0]).filter((key) => key !== 'Date' && key !== 'CrossPodName'
            && key !== 'SortOrder' && key !== 'Type' && key !== 'index').sort();

        funds.map((fund) => {
            colDefs.push({
                headerName: fund,
                field: fund,
                editable: false,
                width: '60px;',
                cellStyle: (params) => {
                    return params.context.getCellStyle(params.data['CrossPodName'], this.fundComplex, 'numeric', 'Fund');
                },
                valueFormatter: (params) => {
                    if (params.context.isPctColumn(params.data['CrossPodName'])) {
                        return (params.data[fund] * 100).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '%';
                    } else {
                        return (params.data[fund] / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + 'm';
                    }
                }
            });
        });

        return colDefs;
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();
    }
}
