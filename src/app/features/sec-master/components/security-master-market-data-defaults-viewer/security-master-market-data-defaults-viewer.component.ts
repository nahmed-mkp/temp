import { Component, OnInit, Input } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import moment from 'moment';

@Component({
  selector: 'app-security-master-market-data-defaults-viewer',
  templateUrl: './security-master-market-data-defaults-viewer.component.html',
  styleUrls: ['./security-master-market-data-defaults-viewer.component.scss']
})
export class SecurityMasterMarketDataDefaultsViewerComponent implements OnInit {

    @Input() data: any;
    @Input() loading: boolean;

    private gridApi: GridApi;
    public extraOption = { sizeColumnsToFit: true };

    public filterValue: string;

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            // floatingFilter: true
        },
        columnDefs: [
            {
                headerName: 'Market Data Group',
                field: 'MarketDataGroup'
            },
            {
                headerName: 'Type',
                field: 'Type'
            },
            {
                headerName: 'Bloomberg Field',
                field: 'BloombergField'
            },
            {
                headerName: 'Bloomberg EOD Field',
                field: 'BloombergEODField'
            },
            {
                headerName: 'Price Source',
                field: 'PriceSource'
            },
            {
                headerName: 'Created By',
                field: 'CreateName'
            },
            {
                headerName: 'Created Date',
                field: 'CreateDate',
                valueFormatter: this.dateFormatter
            },
            {
                headerName: 'Updated By',
                field: 'UpdateName',
            },
            {
                headerName: 'Update Date',
                field: 'UpdateDate',
                valueFormatter: this.dateFormatter
            },
            {
                headerName: 'Market Data Group ID',
                field: 'MarketDataGroupID'
            },
        ],
    };


    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {}

    customGridCallBack(params) {
        this.gridApi = params.api;
    }

    public dateFormatter(params) {
        return moment.utc(params.value).format();
    }

    public onFilterChange() {
        if (this.gridApi) {
            if (this.filterValue === '' || this.filterValue === undefined) {
                this.gridApi.setQuickFilter(null);
            } else {
                this.gridApi.setQuickFilter(this.filterValue);
            }
        }
    }
}
