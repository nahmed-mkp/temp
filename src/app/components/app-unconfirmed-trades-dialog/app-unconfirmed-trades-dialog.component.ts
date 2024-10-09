import { Component, OnInit, Inject, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-unconfirmed-trades-dialog',
    templateUrl: './app-unconfirmed-trades-dialog.component.html',
})
export class UnconfirmedTradesDialogComponent implements OnInit, OnChanges, OnDestroy {

    public unconfirmedTrades: any[];
    public unconfirmedTradesLoading: boolean;
    public unconfirmedTradesLoaded: boolean;
    public unconfirmedTradesError: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    public selectedTradeID: string;

    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false
        },
        getRowNodeId: data => data.Trade_Id,
        deltaRowDataMode: false,
        rowSelection: 'single',
        columnDefs: [
            {
                headerName: 'Portfolio Manager',
                width: 80,
                field: 'PM'
            }, {
                headerName: 'Ticker',
                width: 80,
                field: 'Ticker',
                cellStyle: { 'background-color': '#eebb88' }
            }, {
                headerName: 'Buy/Sell',
                width: 60,
                field: 'BuySell'
            }, {
                headerName: 'Trade Date',
                field: 'Trade_Date',
                width: 50,
                cellStyle: { 'justify-content': 'flex-end' }
            }, {
                headerName: 'Notional',
                field: 'Notional',
                width: 100,
                valueGetter: this.utilities.formatNumberWithCommaSeperated(0),
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#eebb88' }
            }, {
                headerName: 'Price',
                field: 'Price',
                width: 50,
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#eebb88'   }
            }, {
                headerName: 'Fund',
                field: 'Fund',
                width: 100
            }, {
                headerName: 'Pod',
                field: 'RCPM_PodName',
                width: 100
            }, {
                headerName: 'TradeName',
                field: 'TradeName',
                width: 150
            }, {
                headerName: 'TradeID',
                width: 60,
                field: 'Trade_Id',
                cellStyle: { 'justify-content': 'flex-end' }
            }, {
                headerName: 'OrderID',
                width: 60,
                field: 'Order_Id',
                cellStyle: { 'justify-content': 'flex-end'}
            }
        ],
        context: { componentParent: this }
    };

    constructor(private utilities: UtilityService,
        public dialogRef: MatDialogRef<UnconfirmedTradesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.unconfirmedTrades = data['unconfirmedTrades'];
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.unconfirmedTrades && this.gridApi) {
            this.gridApi.setRowData(changes.unconfirmedTrades.currentValue);
            this.gridApi.refreshCells();
        }
    }

    ngOnDestroy(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.unconfirmedTrades.length > 0) {
            this.gridApi.setRowData(this.unconfirmedTrades);
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

}
