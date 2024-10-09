import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import * as fromStore from '../../../../store';

@Component({
    selector: 'app-sockets-overview-component',
    templateUrl: './sockets-dashboard-viewer.component.html',
    styleUrls: ['./sockets-dashboard-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocketsOverviewComponent implements OnInit {

    @Input() socketDashboardData;

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false,
        },
        floatingFilter: true,
        suppressNoRowsOverlay: true,
        columnDefs: [
            { headerName: 'Username', field: 'username'},
            { headerName: 'Channel', field: 'channel'},
            { headerName: 'ID', field: 'id'},
            { headerName: 'Auth State', field: 'authState'},
            { headerName: 'State', field: 'state' },
            { headerName: 'Messages Sent', field: 'inboundReceived'},
            { headerName: 'Messages Received', field: 'outboundSent'},
        ],
    };

    constructor(private store: Store<fromStore.RootState>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }


    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

}
