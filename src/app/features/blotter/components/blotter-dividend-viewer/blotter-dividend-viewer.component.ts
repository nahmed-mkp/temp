import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BlotterDividendAllocationModifierDialogComponent } from '../../containers';

@Component({
    selector: 'app-blotter-dividend-viewer',
    templateUrl: './blotter-dividend-viewer.component.html',
    styleUrls: ['./blotter-dividend-viewer.component.scss']
})
export class BlotterDividendViewerComponent implements OnInit {

    @Input() data: any[];
    @Input() loading: boolean;

    @Output() loadData = new EventEmitter<string>();

    private gridApi: GridApi;
    public extraOption = {};
    public filterValue: string;
    public selectedDate = new Date();

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150
        },
        columnDefs: [
            {headerName: 'Trade Date', field: 'TradeDate', width: 100},
            {headerName: 'Settle Date', field: 'SettleDate', width: 100},
            {headerName: 'Maturity Date', field: 'MaturityDate', width: 100},
            {headerName: 'CRD Account', field: 'CRDAccount'},
            {headerName: 'Strategy cd 1', field: 'Strategy_cd_1'},
            {headerName: 'Strategy cd 2', field: 'Strategy_cd_2'},
            {headerName: 'Custodian', field: 'Custodian',  width: 100},
            {headerName: 'Security Name', field: 'SecurityName'},
            {headerName: 'Security Type', field: 'SecurityType', width: 80},
            {headerName: 'Trans Type', field: 'TransType', width: 80},
            {headerName: 'Exec Qty', field: 'ExecQty'},
            {headerName: 'Block Qty', field: 'BlockQty'},
            {headerName: 'Long Short', field: 'LongShort', width: 60},
            {headerName: 'Pos Notional', field: 'PosNotional'},
            {headerName: 'Dvd Rate', field: 'dvd_rate', width: 60},
            {headerName: 'Dvd Declared Date', field: 'dvd_declared_date'},
            {headerName: 'dvd Records Date', field: 'dvd_records_date'},
            {headerName: 'Off Shore Pct', field: 'OffShorePct', width: 100},
            {headerName: 'WithHolding Pct', field: 'WithHoldingPct', width: 100},
            {headerName: 'Dividend', field: 'Dividend', width: 100},
            {headerName: 'DVDWithHeld', field: 'DVDWithHeld', width: 100},
            {headerName: 'NetDividend', field: 'NetDividend', width: 100},
            {headerName: 'UnderlyingSecurityName', field: 'UnderlyingSecurityName', width: 180},
            {headerName: 'FundID', field: 'FundID', width: 60},
            {headerName: 'PodID', field: 'PodID', width: 60},
            {headerName: 'TID', field: 'TID', width: 60},
            {headerName: 'SID', field: 'SID', width: 60},
            {headerName: 'FundName', field: 'FundName',  width: 180},
            {headerName: 'PodName', field: 'PodName'},
            {headerName: 'TradeName', field: 'TradeName'},
            {headerName: 'TradeId', field: 'TradeId', width: 60},
            {headerName: 'As Of Date', field: 'AsOfDate'},
        ]
    }

    constructor(private dialog: MatDialog) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
        this.onLoadData();
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
    }

    onLoadData() {
        const formattedDate = this.selectedDate.toLocaleDateString().split('/').join('-');
        this.loadData.emit(formattedDate);
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

    public onOpenDialog() {
        this.dialog.open(BlotterDividendAllocationModifierDialogComponent, {
            hasBackdrop: false,
            panelClass: ['event-analysis-pop-up-panel'],
            width: '36rem',
            height: '17rem',
        })
    }

}
