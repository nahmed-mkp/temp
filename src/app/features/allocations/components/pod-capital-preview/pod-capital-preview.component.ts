import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-pod-capital-preview',
    templateUrl: './pod-capital-preview.component.html',
    styleUrls: ['./pod-capital-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PodCapitalPreviewComponent implements OnInit, OnDestroy, OnChanges {

    @Input() podCapitalChangePreview: any[];
    @Input() previewLoading: boolean;
    @Input() previewLoaded: boolean;
    @Input() previewError: string;

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
        floatingFilter: true,
        deltaRowDataMode: true,
        context: this,
        skipHeaderOnAutoSize: true,
        enableSorting: true,

        getRowNodeId: data => data.PodID,

        statusBar: {
            statusPanels: [
                {
                    statusPanel: 'agAggregationComponent',
                    statusPanelParams: {
                        aggFuncs: ['sum']
                    }
                },
                {
                    statusPanel: 'AppGridCustomStatusBarCellValueComponent',
                    statusPanelParams: {
                        fractionDigits: 2
                    }
                },
            ],
        },


        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent
        },
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
        if (this.gridApi && changes.podCapitalChangePreview && changes.podCapitalChangePreview.currentValue) {
            if (this.gridApi) {
                this.columnDefs = this.getColumnDefs(changes.podCapitalChangePreview.currentValue);
                this.gridApi.setColumnDefs(this.columnDefs);
                this.gridApi.setRowData(changes.podCapitalChangePreview.currentValue);
                this.gridApi.sizeColumnsToFit();
            }
        }
    }

    getColumnDefs(podCapitalChangePreview: any[]): any {

        if (podCapitalChangePreview.length === 0) {
            return [];
        }

        const colDefs = [{
            headerName: 'Date',
            field: 'Date',
            width: 100,
            valueFormatter: params => {
                const date = params.value.split('T')[0];
                return date.substring(5, 7) + '/' + date.substring(8, 10) + '/' + date.substring(0, 4);
            },
            sort: 'desc',
            comparator: (valueA, valueB, nodeA, nodeB) => {
                const timeA = (new Date(valueA)).getTime();
                const timeB = (new Date(valueB)).getTime();
                return timeA - timeB;
            }
        }, {
            headerName: 'CrossPod',
            field: 'CrossPodName',
            width: 120,
            sort: 'asc'
        }, {
            headerName: 'Pod',
            field: 'PodName',
            width: 150,
            sort: 'asc'
        }, {
            headerName: 'Unlevered Pod Capital',
            field: 'NewUnleveredPodCapital',
            width: 100,
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'Overage',
            field: 'NewOverage',
            width: 100,
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(8),
        }, {
            headerName: 'Pod Capital',
            field: 'NewPodCapital',
            width: 120,
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'New (%)',
            field: 'NewAllocPct',
            width: 100,
            cellStyle: params => {
                return { 'background-color': '#fcfed6', 'justify-content': 'right' };
            },
            valueFormatter: (params) => {
                return (params.data['NewAllocPct'] * 100).toLocaleString('en-US', { maximumFractionDigits: 7, minimumFractionDigits: 7 }) + '%';
            },
        }];

        return colDefs;
    }


    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.podCapitalChangePreview && this.podCapitalChangePreview.length > 0) {
            this.columnDefs = this.getColumnDefs(this.podCapitalChangePreview);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.podCapitalChangePreview);
        }
    }

}
