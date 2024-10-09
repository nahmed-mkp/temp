import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';

import * as moment from 'moment';

import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-pricing-engine-treasury-auction-viewer',
    templateUrl: './pricing-engine-treasury-auction-viewer.component.html',
    styleUrls: ['./pricing-engine-treasury-auction-viewer.component.scss']
})
export class PricingEngineTreasuryAuctionViewerComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() loading: boolean;
    @Input() mode: 'live' | 'close';

    private gridApi: GridApi;
    public extraOption = {};

    public customGridOption: GridOptions = {
        defaultColDef: {
            sortable: false,
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150,
            cellStyle: params => {
                return typeof params.value === 'number' ? { 'justify-content': 'flex-end', 'border-left': '0.2px dotted #d7d7d7;' } : { 'border-left': '0.2px dotted #d7d7d7;' };
            }
        },
        columnDefs: [
            {
                headerName: 'SecurityType',
                field: 'securityType',
                filter: 'agSetColumnFilter',
                width: 100,
                pinned: 'left'
            },
            {
                headerName: 'Tenor',
                field: 'securityTerm',
                filter: 'agSetColumnFilter',
                width: 100,
                pinned: 'left'
            },
            {
                headerName: 'CUSIP',
                field: 'cusip',
                filter: 'agSetColumnFilter',
                pinned: 'left'
            },
            {
                headerName: 'Announcement Date',
                field: 'announcementDate',
                filter: 'agDateColumnFilter',
                valueFormatter: params => {
                    return moment(params.value).format('MM/DD/YYYY');
                },
                cellStyle: params => {
                    return {};
                }
            },
            {
                headerName: 'Auction Date',
                field: 'auctionDate',
                filter: 'agDateColumnFilter',
                valueFormatter: params => {
                    return moment(params.value).format('MM/DD/YYYY');
                }
            },
            {
                headerName: 'FirstInterestPaymentDate',
                field: 'firstInterestPaymentDate',
                valueFormatter: params => {
                    if (params.value) {
                        return moment(params.value).format('MM/DD/YYYY');
                    }
                    return '';
                }
            },
            {
                headerName: 'MaturityDate',
                field: 'maturityDate',
                valueFormatter: params => {
                    return moment(params.value).format('MM/DD/YYYY');
                }
            },
            {headerName: 'IsReopening', field: 'reopening'},
            {headerName: 'Type', field: 'type'},
        ],

        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['cusip'] + data['announcementDate'] + data['auctionDate'] + data['maturityDate'] + data['reopening'] + data['securityTerm'] + data['securityType'] + data['type']
,

        // UI ---------------------------------------------
        rowClass: 'medium-row',
        rowHeight: 22,
        groupHeaderHeight: 24,
        headerHeight: 24,
        floatingFiltersHeight: 28,
    };

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
            if (this.gridApi) {
                this.gridApi.setRowData(this.data);
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;

        if (this.data && this.data.length > 0) {
            this.gridApi.setRowData(this.data);
        }
    }

}
