
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';
import { isNumber } from 'util';


    // redYellowGreenColorCoder(min: number, max: number) {
    //     return d3.scaleSequential(d3Chromatic.interpolateRdYlGn).domain([min, max]);
    // }

    // greenHueColorCoder(min: number, max: number) {
    //     return d3.scaleSequential(d3Chromatic.interpolateGreens).domain([min, max]);
    // }

@Component({
    selector: 'app-fx-options-summary-viewer',
    templateUrl: './fx-options-summary-viewer.component.html',
    styleUrls: ['./fx-options-summary-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FXOptionsSummaryViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() snapTimes: {[ccyPair: string]: string};

    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions;
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    constructor(private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.gridApi) {
            if (this.data) {
                this.gridApi.setColumnDefs([]);
                this.gridApi.setColumnDefs(this._getColumnDefs(this.data));
            }
            this.gridApi.setRowData(changes.data.currentValue);
            this.gridApi.refreshCells();
            this.gridApi.sizeColumnsToFit();

        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.customGridOption = this._createGridOption();

        if (this.gridApi) {

            if (this.data) {
                this.gridApi.setColumnDefs([]);
                this.gridApi.setColumnDefs(this._getColumnDefs(this.data));
            }
            this.gridApi.setRowData(this.data);
            this.gridApi.refreshCells();
            this.gridApi.sizeColumnsToFit();

        }
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

    private _getColumnDefs(grid: any[]): any[] {
        const result = [
            { headerName: 'VV δ', field: 'currency_pair', cellClass: 'right-border-light', headerClass: 'header-bold', sort: null }
        ];
        if (grid.length > 0) {
            const deltas = Object.keys(grid[0]).filter((key) => key !== 'currency_pair' && key !== 'expiry');
            const negDeltas = deltas.filter(delta => parseInt(delta, 10) < 0).sort();
            const posDeltas = deltas.filter(delta => parseInt(delta, 10) > 0).sort().reverse();
            const sortedDeltas = negDeltas.concat(posDeltas);
            sortedDeltas.forEach(delta => {
                const colDef = {
                    'headerName': delta,
                    'field': delta,
                    'cellClass': 'right-border-light',
                    'headerClass': 'header-bold',
                    'valueFormatter': this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4),
                    'sort': null
                };

                colDef['cellStyle'] = (params) => {
                    let color = d3Chromatic.interpolateBlues(params.value);
                    color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
                    return { 'background-color': color };
                };

                result.push(colDef);
            });
        }
        // Add Snaptime column
        const snapTimeColDef = {
            headerName: 'SnapTime',
            field: 'currency_pair',
            cellClass: 'right-border-light',
            headerClass: 'header-bold',
            minWidth: 150,
            valueGetter: params => {
                return this.snapTimes[params.data['currency_pair'].replace('/', '')] || '';
            },
            cellStyle: params => {
                return { 'justify-content': 'flex-end' };
            },
            sort: null
        };
        result.push(snapTimeColDef);
        return result;

        // return [
        //     { headerName: 'Delta', field: 'delta', cellClass: 'right-border-light', headerClass: 'header-bold', sort: 'asc' },
        //     { headerName: 'Call/Put', field: 'call/put', cellClass: 'right-border-light', headerClass: 'header-bold' },
        //     { headerName: 'Vol', field: 'vol', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
        //     { headerName: 'Strike', field: 'strike', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
        //     { headerName: 'Forward', field: 'forward', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
        //     { headerName: 'Forward', field: 'forward', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
        //     { headerName: 'OTM(%)', field: 'pctOTM', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
        //     { headerName: 'Price', field: 'price', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) },
        //     { headerName: 'Breakeven', field: 'breakeven', cellClass: 'right-border-light', headerClass: 'header-bold', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(4) }
        // ];
    }
}
