import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

import * as moment from 'moment';
import { UtilityService } from 'src/app/services';

import * as fromModels from './../../models';

@Component({
    selector: 'app-tradename-helper-taxlots',
    templateUrl: './tradename-helper-taxlots.component.html',
    styleUrls: ['./tradename-helper-taxlots.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameHelperTaxLotsComponent implements OnInit, OnChanges {

    @Input() taxLots: fromModels.ITaxLot[];
    @Input() taxLotsLoading: boolean;
    @Input() taxLotsLoaded: boolean;
    @Input() taxLotsError: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public size = 25;
    public extraOption = {};
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            editable: false
        },
        floatingFilter: true,
        getRowNodeId: data => data.TradeID,
        columnDefs: [
            {
                colId: 'AsOfDate',
                headerName: 'Date',
                width: 150,
                field: 'AsOfDate',
                hide: true
            },
            {
                colId: 'TradeID',
                headerName: 'TradeID',
                width: 150,
                field: 'TradeID',
                cellRenderer: 'agGroupCellRenderer',
                filter: true
            },
            {
                colId: 'TradeName',
                headerName: 'TradeName',
                width: 350,
                field: 'TradeName',
                filter: true
            },
            {
                colId: 'TotalTaxLots',
                headerName: 'TotalTaxLots',
                width: 100,
                field: 'TotalTaxLots',
                hide: false
            }
        ],
        masterDetail: true,
        detailRowHeight: 500,
        detailCellRendererParams: {
            detailGridOptions: {
                rowSelection: 'multiple',
                suppressRowClickSelection: true,
                enableRangeSelection: true,
                pagination: true,
                paginationAutoPageSize: false,
                paginationPageSize: 50,
                floatingFilter: true,
                columnDefs: [
                    {
                        colId: 'AsOfDate',
                        headerName: 'Date',
                        width: 150,
                        field: 'AsOfDate',
                        hide: true
                    },
                    {
                        colId: 'TradeID',
                        headerName: 'TradeID',
                        width: 50,
                        field: 'TradeID',
                        filter: true
                    },
                    {
                        colId: 'TradeName',
                        headerName: 'TradeName',
                        width: 150,
                        field: 'TradeName'
                    },
                    {
                        colId: 'FundName',
                        headerName: 'FundName',
                        width: 150,
                        field: 'FundName',
                        filter: true,
                        sort: 'asc',
                        sortedAt: 2
                    },
                    {
                        colId: 'SecurityName',
                        headerName: 'SecurityName',
                        width: 250,
                        field: 'SecurityName',
                        filter: true,
                        sort: 'asc',
                        sortedAt: 1
                    },
                    {
                        colId: 'Qty',
                        headerName: 'Qty',
                        width: 100,
                        field: 'Qty',
                        filter: 'agNumberColumnFilter',
                        valueGetter: this.utilities.formatNumberWithCommaSeperated(0)
                    },
                    {
                        colId: 'TradeDate',
                        headerName: 'TradeDate',
                        width: 100,
                        field: 'TradeDate',
                        valueFormatter: (params) => {
                            return moment(params.value.split('T')[0]).format('MM/DD/YYYY');
                        }
                    },
                    {
                        colId: 'TID',
                        headerName: 'TID',
                        width: 30,
                        field: 'TID',
                        hide: true
                    },
                    {
                        colId: 'FundId',
                        headerName: 'FundId',
                        width: 30,
                        field: 'FundId',
                        hide: true
                    },
                    {
                        colId: 'SID',
                        headerName: 'ParentSID',
                        width: 30,
                        field: 'ParentSID',
                        hide: true
                    }
                ],
                defaultColDef: {
                    sortable: true,
                    flex: 1,
                    filter: 'agTextColumnFilter',
                    enableCellChangeFlash: false,
                    editable: false
                },
            },
            getDetailRowData: function (params) {
                params.successCallback(params.data.TaxLots);
            },
        }
    };

    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.taxLots && changes.taxLots.currentValue && changes.taxLots.currentValue.length > 0) {
            const groupedData = this.getGroupedData(changes.taxLots.currentValue);
            this.gridApi.setRowData(groupedData);
        }
    }

    ngOnInit(): void { }


    onSizeChange(size: number) {
        // this.gridApi.refreshCells({ columns: ['size'] });
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }

    private getGroupedData(taxLots: fromModels.ITaxLot[]): any[] {
        const result = {};

        taxLots.map((taxLot: fromModels.ITaxLot) => {
            if (!result[taxLot.TradeID]) {
                result[taxLot.TradeID] = Object.assign({}, {'TradeID': taxLot.TradeID, 'TradeName': taxLot.TradeName, 'TotalTaxLots': 0, 'TaxLots': [] });
            }
            result[taxLot.TradeID]['TotalTaxLots'] = result[taxLot.TradeID]['TotalTaxLots'] + 1;
            result[taxLot.TradeID]['TaxLots'].push(taxLot);
        });

        const groupedResult = [];
        Object.keys(result).forEach((tradeID) => {
            groupedResult.push(result[tradeID]);
        });

        return groupedResult;
    }

}
