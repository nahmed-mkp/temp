import { Component, OnInit, Input } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-market-data-timeseries-grid-viewer',
    templateUrl: './market-data-timeseries-grid-viewer.component.html',
    styleUrls: ['./market-data-timeseries-grid-viewer.component.scss']
})
export class MarketDataTimeseriesGridViewerComponent implements OnInit {

    @Input() data: any[];
    @Input() loading: boolean;

    private gridApi: GridApi;
    public extraOption = {sizeColumnsToFit: true};
    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150,
            cellStyle: params => {
                return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
            },
        },
        columnDefs: [
            {headerName: 'Date', field: 'date', sort: 'desc',
                comparator: (valueA, valueB, nodeA, nodeB) => {
                    const dateA = (new Date(valueA)).getTime();
                    const dateB = (new Date(valueB)).getTime();
                    return dateA - dateB;
                }},
            {headerName: 'EOD Value', field: 'eod_value', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(4)},
        ],
    }

    constructor(private utilityService: UtilityService) { }

    ngOnInit() {
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
    }

}
