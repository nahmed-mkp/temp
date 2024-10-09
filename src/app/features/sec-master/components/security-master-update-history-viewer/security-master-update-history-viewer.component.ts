import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { GridApi, GridOptions } from 'ag-grid-community';
import { AppConfirmationComponent } from 'src/app/components';

import * as fromModels from './../../models/sec-master-history.models';

@Component({
    selector: 'app-security-master-update-history-viewer',
    templateUrl: './security-master-update-history-viewer.component.html',
    styleUrls: ['./security-master-update-history-viewer.component.scss']
})
export class SecurityMasterUpdateHistoryViewerComponent implements OnInit {

    @Input() data: any[];
    @Input() startDate: Date;
    @Input() endDate: Date;
    @Input() loading: boolean;

    @Output() onLoadUpdateHistory: EventEmitter<fromModels.ISecurityHistoryReq> = new EventEmitter<fromModels.ISecurityHistoryReq>();
    @Output() deleteSecurity = new EventEmitter<number>();
    @Output() retryCreateSecurity = new EventEmitter<string>();

    private gridApi: GridApi;
    public extraOption = {};

    public filterValue: string;

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 200
        },
        getRowNodeId: data => data.Id,
        rowSelection: 'single',
        columnDefs: [
            {headerName: 'Status', field: 'Status', width: 80, pinned: 'left',
                cellStyle: params => {
                    if (params.value === 'Pending' || params.value === 'Processing') {
                        return {color: '#00bcd4', 'font-weight': 'bold'};
                    } else if (params.value === 'Finished') {
                        return {color: '#8bc34a', 'font-weight': 'bold'};
                    } else if (params.value === 'Error') {
                        return {color: '#ff0000ad', 'font-weight': 'bold'};
                    }
                },
            },
            {headerName: 'PortfolioDate', field: 'PortfolioDate'},
             // {headerName: 'BBGKey', field: 'BBGKey', width: 100},
            // {headerName: 'BBG_Global_ID', field: 'BBG_Global_ID', width: 150, filter: 'agTextColumnFilter'},
            // {headerName: 'BBG_Unique_ID', field: 'BBG_Unique_ID', width: 150},
            // {headerName: 'CRDSecID', field: 'CRDSecID', width: 100},
            // {headerName: 'ContractSize', field: 'ContractSize'},
            // {headerName: 'Counterparty', field: 'Counterparty'},
            // {headerName: 'CreatedBy', field: 'CreatedBy', width: 150},
            // {headerName: 'CreatedDate', field: 'CreatedDate'},
            // {headerName: 'Cusip', field: 'Cusip', width: 100, filter: 'agTextColumnFilter'},
            // {headerName: 'DWSecID', field: 'DWSecID', width: 90},
            // {headerName: 'DeliverablesCreated', field: 'DeliverablesCreated', width: 90},
            // {headerName: 'Description', field: 'Description', filter: 'agTextColumnFilter'},
            // {headerName: 'ErrorMessage', field: 'ErrorMessage'},
            // {headerName: 'ForceRefresh', field: 'ForceRefresh', width: 90},
            // {headerName: 'HasDeliverables', field: 'HasDeliverables', width: 90},
            // {headerName: 'HasParityOption', field: 'HasParityOption', width: 90},
            // {headerName: 'HasUnderlying', field: 'HasUnderlying', width: 90},
            // {headerName: 'Id', field: 'Id', width: 90},
            // {headerName: 'IdentifierToUse', field: 'IdentifierToUse', width: 150},
            // {headerName: 'IsBBGPullProcessDone', field: 'IsBBGPullProcessDone', width: 90},
            // {headerName: 'IsErrored', field: 'IsErrored', width: 90},
            // {headerName: 'IsOTC', field: 'IsOTC', width: 90},
            // {headerName: 'IsProcessed', field: 'IsProcessed', width: 90},
            // {headerName: 'IsRuleProcessDone', field: 'IsRuleProcessDone', width: 90},
            // {headerName: 'Isin', field: 'Isin', width: 100, filter: 'agTextColumnFilter'},
            // {headerName: 'ParityOptionCreated', field: 'ParityOptionCreated', width: 90},
            // {headerName: 'ProcessedTs', field: 'ProcessedTs', width: 100},
            // {headerName: 'RCPMSID', field: 'RCPMSID', width: 90},
            // {headerName: 'RequestID', field: 'RequestID', width: 250},
            // {headerName: 'SecType', field: 'SecType'},
            // {headerName: 'Sedol', field: 'Sedol'},
            // {headerName: 'Ticker', field: 'Ticker'},
            // {headerName: 'UnderlyingCreated', field: 'UnderlyingCreated', width: 90},
            // {headerName: 'pushedToCRD', field: 'pushedToCRD', width: 90},
            // {headerName: 'pushedToDW', field: 'pushedToDW', width: 90},
            // {headerName: 'pushedToRCPM', field: 'pushedToRCPM', width: 90},
            // {headerName: 'updateCRDTs', field: 'updateCRDTs', width: 90},
            // {headerName: 'updateDWTs', field: 'updateDWTs', width: 90},
            // {headerName: 'updateRCPMTs', field: 'updateRCPMTs', width: 90},

            { headerName: 'CreatedDate', field: 'CreatedDate' },
            { headerName: 'CreatedBy', field: 'CreatedBy', width: 150 },
            { headerName: 'Identifier', field: 'IdentifierToUse', width: 150 },
            { headerName: 'BBG GlobalID', field: 'BBG_Global_ID', width: 150, filter: 'agTextColumnFilter' },
            { headerName: 'Cusip', field: 'Cusip', width: 100, filter: 'agTextColumnFilter' },
            { headerName: 'Ticker', field: 'Ticker' },
            { headerName: 'Isin', field: 'Isin', width: 100, filter: 'agTextColumnFilter' },
            { headerName: 'Sedol', field: 'Sedol' },
            { headerName: 'Description', field: 'Description', filter: 'agTextColumnFilter' },
            { headerName: 'Security Type', field: 'SecType' },
            { headerName: 'Market Sector', field: 'BBGKey', width: 100 },
            { headerName: 'IsOTC', field: 'IsOTC', width: 90 },
            { headerName: 'ContractSize', field: 'ContractSize' },
            { headerName: 'Counterparty', field: 'Counterparty' },
            { headerName: 'BBG UniqueID', field: 'BBG_Unique_ID', width: 150 },

            { headerName: 'IsProcessed', field: 'IsProcessed', width: 90 },
            { headerName: 'IsErrored', field: 'IsErrored', width: 90 },
            { headerName: 'ErrorMessage', field: 'ErrorMessage' },

            { headerName: 'CRD SecID', field: 'CRDSecID', width: 100 },
            { headerName: 'DW SecID', field: 'DWSecID', width: 90 },
            { headerName: 'RCPM SID', field: 'RCPMSID', width: 90 },
            { headerName: 'pushedToCRD', field: 'pushedToCRD', width: 90 },
            { headerName: 'pushedToDW', field: 'pushedToDW', width: 90 },
            { headerName: 'pushedToRCPM', field: 'pushedToRCPM', width: 90 },
            { headerName: 'updateCRDTs', field: 'updateCRDTs', width: 90 },
            { headerName: 'updateDWTs', field: 'updateDWTs', width: 90 },
            { headerName: 'updateRCPMTs', field: 'updateRCPMTs', width: 90 },

            { headerName: 'HasDeliverables', field: 'HasDeliverables', width: 90 },
            { headerName: 'DeliverablesCreated', field: 'DeliverablesCreated', width: 90 },
            { headerName: 'HasParityOption', field: 'HasParityOption', width: 90 },
            { headerName: 'ParityOptionCreated', field: 'ParityOptionCreated', width: 90 },
            { headerName: 'HasUnderlying', field: 'HasUnderlying', width: 90 },
            { headerName: 'UnderlyingCreated', field: 'UnderlyingCreated', width: 90 },
            { headerName: 'ForceRefresh', field: 'ForceRefresh', width: 90 },
            { headerName: 'IsBBGPullProcessDone', field: 'IsBBGPullProcessDone', width: 90 },
            { headerName: 'IsRuleProcessDone', field: 'IsRuleProcessDone', width: 90 },
            { headerName: 'ProcessedTs', field: 'ProcessedTs', width: 100 },
            { headerName: 'RequestID', field: 'RequestID', width: 250 },

            { headerName: 'Id', field: 'Id', width: 90 },
        ],

        getRowStyle: params => {
            if (params.data['Status'] === 'Error') {
                return {'background': '#ff000033'};
            }
        },

        getContextMenuItems: params => {

            const deleteSecurity = {
                name: 'Delete Security',
                icon: '<i class="material-icons small-menu-icon">delete</i>',
                action: () => {
                    if (params && params.node && params.node.data && params.node.data['CRDSecID']) {
                        this.onDeleteSecurity(params.node.data['CRDSecID'], params.node.data['Description']);
                    }
                }
            };

            const retryCreateSecurity = {
                name: 'Retry Creating Security',
                icon: '<i class="material-icons small-menu-icon">replay</i>',
                action: () => {
                    if (params && params.node && params.node.data && params.node.data['RequestID']) {
                        this.onRetryCreateSecurity(params.node.data['RequestID']);
                    }
                }
            };

            if (params.api.getSelectedNodes().length !== 1) {
                retryCreateSecurity['disabled'] = true;
                deleteSecurity['disabled'] = true;
            }

            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', 'separator', retryCreateSecurity, deleteSecurity];
        }
    };


    constructor(private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.onDeleteSecurity = this.onDeleteSecurity.bind(this);
    }

    ngOnInit() {
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
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

    public onLoadData() {
        this.onLoadUpdateHistory.emit({
            startDate: this.startDate,
            endDate: this.endDate,
        });
    }

    public onDeleteSecurity(crdSecId: number, name?: string) {

        const dialogRef = this.dialog.open(AppConfirmationComponent, {
            data: {
                'title': 'Confirm Delete',
                'message': `Are you sure you want to delete: ${name + ', '} crdSecId = ${crdSecId} ?`,
                'showCancel': true,
                'showOk': false,
                'showConfirm': true
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteSecurity.emit(crdSecId);
            }
        });
    }

    public onRetryCreateSecurity(requestId: string): void {
        this.retryCreateSecurity.emit(requestId);
    }

}
