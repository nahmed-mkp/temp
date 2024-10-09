import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { MarketDataBackfillDialogComponent } from '../../containers';

@Component({
    selector: 'app-market-data-detail-viewer',
    templateUrl: './market-data-detail-viewer.component.html',
    styleUrls: ['./market-data-detail-viewer.component.scss']
})
export class MarketDataDetailViewerComponent implements OnInit {

    @Input() data: any[];
    @Input() loading: boolean;
    @Output() loadMarketDataTimeseries = new EventEmitter<number>();

    private dialogRef: MatDialogRef<MarketDataBackfillDialogComponent>;


    private gridApi: GridApi;
    public extraOption = {sizeColumnsToFit: true};
    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150
        },
        columnDefs: [
            {headerName: 'Name', field: 'Name'},
            {headerName: 'Bloomberg Ticker', field: 'BloombergTicker'},
            {headerName: 'Type', field: 'Type'},
            {headerName: 'Price Source', field: 'PriceSource'},
            {headerName: 'Bloomberg Field', field: 'BloombergField'},
            {headerName: 'MDID', field: 'MDID'},
            {headerName: 'SID', field: 'SID'},
        ],

        rowSelection: 'single',
        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.loadMarketDataTimeseries.emit(params.node.data);
            }
        },

        getContextMenuItems: params => {
            const defaultMenu: any =  ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator'];
            const targetRowData = params.node.data;

            if (targetRowData['PriceSource'].includes('Blbg') && targetRowData['BloombergTicker'] !== null && targetRowData['BloombergField'] !== null) {
                const backFill = {
                    name: 'Back Fill',
                    icon: '<i class="material-icons small-menu-icon">low_priority</i>',
                    action: () => {
                        this.openBackFillDialog(targetRowData['MDID']);
                    }
                };

                defaultMenu.push(backFill);
            }
            return defaultMenu;
        }
    }


    constructor(private dialog: MatDialog) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
    }

    
    customGridCallBack(params) {
        this.gridApi = params.api;
    }

    public openBackFillDialog(mdid: number) {
        this.dialogRef = this.dialog.open(MarketDataBackfillDialogComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '30rem',
            height: '20rem',
            data: mdid
        });
    }

}
