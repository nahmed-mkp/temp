import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-fund-capital-preview',
    templateUrl: './fund-capital-preview.component.html',
    styleUrls: ['./fund-capital-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundCapitalPreviewComponent implements OnInit, OnDestroy, OnChanges {

    @Input() fundCapitalChangePreview: any[];
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

        getRowNodeId: data => data.FundID,

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
        if (this.gridApi && changes.fundCapitalChangePreview && changes.fundCapitalChangePreview.currentValue) {
            if (this.gridApi) {
                this.columnDefs = this.getColumnDefs(changes.fundCapitalChangePreview.currentValue);
                this.gridApi.setColumnDefs(this.columnDefs);
                this.gridApi.setRowData(changes.fundCapitalChangePreview.currentValue);
                this.gridApi.sizeColumnsToFit();
            }
        }
    }

    getColumnDefs(fundCapitalChangePreview: any[]): any {

        if (fundCapitalChangePreview.length === 0) {
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
            headerName: 'Fund',
            field: 'FundName',
            sort: 'asc'
        }, {
            headerName: 'Unlevered Capital',
            field: 'NewSODCapital',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'Leverage',
            field: 'NewLeverageFactor',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(2),
        }, {
            headerName: 'Levered Capital',
            field: 'NewLeveredSODCapital',
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
        }, {
            headerName: 'Change',
            field: 'Change',
            cellStyle: params => {
                return {'background-color': '#fcfed6', 'justify-content': 'right'};
            },
            valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
        }];

        return colDefs;
    }


    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        if (this.fundCapitalChangePreview && this.fundCapitalChangePreview.length > 0) {
            this.columnDefs = this.getColumnDefs(this.fundCapitalChangePreview);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.fundCapitalChangePreview);
        }
    }

}
