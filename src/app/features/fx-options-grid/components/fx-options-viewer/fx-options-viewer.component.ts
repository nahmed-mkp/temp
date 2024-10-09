
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Component({
    selector: 'app-fx-options-viewer',
    templateUrl: './fx-options-viewer.component.html',
    styleUrls: ['./fx-options-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FXOptionsViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() currency: string;

    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions;
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public timeStamp;

    constructor(private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi) {
        }

        if (this.gridApi) {
            this.gridApi.setRowData(changes.data.currentValue);
            this.gridApi.refreshCells();
            this.gridApi.sizeColumnsToFit();

        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.customGridOption = this._createGridOption();

        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this._getColumnDefs());
    }

    // Utility -----

    private _createGridOption(): GridOptions {
        return {
            defaultColDef: {
                suppressMenu: true,
                sortable: false,
                suppressFiltersToolPanel: true,
                cellStyle: params => {
                    return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
                },
            },
            // all even rows assigned 'my-shaded-effect'
            getRowClass: params => {
                if (params.node.rowIndex % 2 === 0) {
                    return ['even-row-shaded-effect', 'ultra-small-row'];
                } else {
                    return ['ultra-small-row'];
                }
            },
            rowHeight: 18,
            sideBar: false,
            showToolPanel: false,
        };
    }

    private _getColumnDefs(): any[] {
        return [
            { headerName: 'VV δ', width: 120, field: 'delta', cellClass: 'right-border-light', headerClass: 'header-bold'},
            { headerName: 'C/P', width: 200, field: 'call/put', cellClass: 'right-border-light', headerClass: 'header-bold', sort: 'desc', sortOrder: 2},
            {
                headerName: 'Vol',
                width: 150,
                field: 'vol',
                cellClass: 'right-border-light',
                headerClass: 'header-bold',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4),
                cellStyle: (params) => {
                    const minMax = this._getMinMax(params, 'vol');
                    let color = d3Chromatic.interpolateBlues((params.value - minMax[0]) / (minMax[1] - minMax[0]));
                    color = color.replace('rgb', 'rgba').replace(')', ', 0.5)');
                    return { 'background-color': color };
                }
            },
            {
                headerName: 'K',
                width: 150,
                field: 'strike',
                cellClass: 'right-border-light',
                headerClass: 'header-bold',
                sort: 'asc',
                sortOder: 1,
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4),
                cellStyle: (params) => {
                    const minMax = this._getMinMax(params, 'strike');
                    let color = d3Chromatic.interpolateGreens((params.value - minMax[0]) / (minMax[1] - minMax[0]));
                    color = color.replace('rgb', 'rgba').replace(')', ', 0.5)');
                    return { 'background-color': color };
                }
            },
            { headerName: 'Fwd', field: 'forward', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
            { headerName: 'OTM(%)', field: 'pctOTM', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
            { headerName: `Px (%${this.currency.substring(0, 3)})`, field: 'price', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
            { headerName: 'B/E', width: 150, field: 'breakeven', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) }
        ];
    }

    private _getMinMax(params: any, field: string): number[] {
        const values = this.data.map((row) => row[field]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        return [min, max];
    }
}
