import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { SecurityMasterUserActivityProgressBarComponent } from '../security-master-user-activity-progress-bar/security-master-user-activity-progress-bar.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AppConfirmationComponent } from 'src/app/components';

@Component({
    selector: 'app-security-master-user-activity-viewer',
    templateUrl: './security-master-user-activity-viewer.component.html',
    styleUrls: ['./security-master-user-activity-viewer.component.scss']
})
export class SecurityMasterUserActivityViewerComponent implements OnInit, OnChanges {

    @Input() data: any;
    @Input() loading: boolean;

    @Output() selectActiveUserActivity = new EventEmitter<any>();
    @Output() deleteSecurity = new EventEmitter<number>();
    @Output() retryCreateSecurity = new EventEmitter<string>();

    private gridApi: GridApi;
    public extraOption = { autoSizeColumns: true };

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true
        },
        columnDefs: [
            {
                headerName: 'Sec Type',
                field: 'secType',
                filter: 'agSetColumnFilter',
            },
            {
                headerName: 'Identifier Type',
                field: 'identifierToUse',
                filter: 'agSetColumnFilter',
            },
            {
                headerName: 'Identifier',
                field: 'identifier',
                valueGetter: params => {
                    let identifierToUse: string = params.data['identifierToUse'] || '';
                    identifierToUse = identifierToUse.toLowerCase();
                    return params.data[identifierToUse];
                }
            },
            {
                headerName: 'Progress',
                field: 'progress',
                cellRenderer: 'SecurityMasterUserActivityProgressBarComponent',
                minWidth: 200,
                pinned: 'right'
            },
            {
                headerName: 'Status',
                field: 'Status',
                // valueGetter: params => {
                //     if (params.data['isProcessed'] === true && params.data['isErrored'] === false) {
                //         return 'Finished';
                //     } else {
                //         if (params.data['isErrored'] === true) {
                //             return 'Error';
                //         } else {
                //             return 'Pending';
                //         }
                //     }
                // },
                cellStyle: params => {
                    if (params.value === 'Pending' || params.value === 'Processing') {
                        return {color: '#00bcd4', 'font-weight': 'bold'};
                    } else if (params.value === 'Finished') {
                        return {color: '#8bc34a', 'font-weight': 'bold'};
                    } else if (params.value === 'Error') {
                        return {color: '#ff0000ad', 'font-weight': 'bold'};
                    }
                },
                pinned: 'left',
                filter: 'agSetColumnFilter',
            },
            {
                headerName: 'Detail',
                field: 'details#',
                pinned: 'right',
                suppressMenu: true,
                cellRenderer: params => {
                    if (params.data['isProcessed'] || params.data['isErrored']) {
                        return '<a style="font-weight: bolder;text-decoration: underline;" class="clickable">Detail</a>';
                    } else {
                        return '<a style="color: #b2b2b2cf;font-weight: bolder;" class="clickable">Detail</a>';
                    }
                }
            },
            // {
            //     headerName: 'bbg_global_id',
            //     field: 'bbg_global_id'
            // },
            // {
            //     headerName: 'bbg_unique_id',
            //     field: 'bbg_unique_id'
            // },
            {
                headerName: 'Market Sector',
                field: 'bbgkey'
            },
            {
                headerName: 'Description',
                field: 'description',
                minWidth: 250
            },
            {
                headerName: 'Contract Size',
                field: 'contractSize'
            },
            {
                headerName: 'Counter Party',
                field: 'counterparty'
            },
            {
                headerName: 'crdSecID',
                field: 'crdSecID'
            },
            {
                headerName: 'Created By',
                field: 'createdBy',
                hide: true,
            },
            {
                headerName: 'Created Date',
                field: 'createdDate',
                sort: 'desc',
                comparator: (valueA, valueB, nodeA, nodeB) => {
                    const dateValueA = (new Date(valueA)).getTime();
                    const dateValueB = (new Date(valueB)).getTime();
                    return dateValueA - dateValueB;
                }
            },
            {
                headerName: 'Cusip',
                field: 'cusip',
            },
            {
                headerName: 'dwSecID',
                field: 'dwSecID',
            },
            {
                headerName: 'Force Refresh',
                field: 'forceRefresh',
            },
            // {
            //     headerName: 'identifierToUse',
            //     field: 'identifierToUse',
            // },
            {
                headerName: 'IsOTC',
                field: 'isOTC',
            },
            {
                headerName: 'Isin',
                field: 'isin',
            },
            {
                headerName: 'ProcessedTs',
                field: 'processedTs',
            },
            // {
            //     headerName: 'isBBGPullProcessDone',
            //     field: 'isBBGPullProcessDone',
            // },
            // {
            //     headerName: 'isRuleProcessDone',
            //     field: 'isRuleProcessDone',
            // },
            // {
            //     headerName: 'pushedToCRD',
            //     field: 'pushedToCRD',
            // },
            // {
            //     headerName: 'pushedToDW',
            //     field: 'pushedToDW',
            // },
            // {
            //     headerName: 'pushedToRCPM',
            //     field: 'pushedToRCPM',
            // },
            {
                headerName: 'IsProcessed',
                field: 'isProcessed',
            },
            // {
            //     headerName: 'rcpmSID',
            //     field: 'rcpmSID',
            // },

            {
                headerName: 'Sedol',
                field: 'sedol',
            },
            {
                headerName: 'Ticker',
                field: 'ticker',
            },
            {
                headerName: 'Update CRDTs',
                field: 'updateCRDTs',
            },
            {
                headerName: 'Update DWTs',
                field: 'updateDWTs',
            },
            {
                headerName: 'Update RCPMTs',
                field: 'updateRCPMTs',
            },
            {
                headerName: 'requestId',
                field: 'requestId',
            }
        ],

        // onRowSelected: params => {
        //     if (params.node.isSelected()) {
        //         this.selectActiveUserActivity.emit(params.node.data);
        //     }
        // },

        onCellClicked: params => {
            if (params.column && params.column.getColId() === 'details#') {
                // if (params.data['isProcessed'] || params.data['isErrored']) {
                //     this.selectActiveUserActivity.emit(params.node.data);
                // }
                this.selectActiveUserActivity.emit(params.node.data);
            }
        },

        onRowClicked: params => {
            if (params.data['isProcessed'] || params.data['isErrored']) {
                this.selectActiveUserActivity.emit(params.node.data);
            }
        },

        // Framework
        frameworkComponents: {
            'SecurityMasterUserActivityProgressBarComponent': SecurityMasterUserActivityProgressBarComponent,
        },

        // Misc

        getRowNodeId: data => data['requestId'],

        deltaRowDataMode: true,

        getContextMenuItems: params => {

            const deleteSecurity = {
                name: 'Delete Security',
                icon: '<i class="material-icons small-menu-icon">delete</i>',
                action: () => {
                    if (params && params.node && params.node.data && params.node.data['CRDSecID']) {
                        this.onDeleteSecurity(params.node.data['CRDSecID'], params.node.data['description']);
                    }
                }
            };

            const retryCreateSecurity = {
                name: 'Retry Creating Security',
                icon: '<i class="material-icons small-menu-icon">replay</i>',
                action: () => {
                    if (params && params.node && params.node.data && params.node.data['requestId']) {
                        this.onRetryCreateSecurity(params.node.data['requestId']);
                    }
                }
            };

            if (params.api.getSelectedNodes().length !== 1) {
                retryCreateSecurity['disabled'] = true;
                deleteSecurity['disabled'] = true;
            }
            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', retryCreateSecurity, deleteSecurity];
        }
    };

    constructor(private dialog: MatDialog) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {}

    ngOnChanges(change: SimpleChanges) {
        if (change.data && change.data.currentValue && this.gridApi) {
            this.gridApi.setRowData(this.data);
            this.gridApi.refreshCells({columns: ['progress', 'details#'], force: true});
        } 
    }

    customGridCallBack(params) {
        this.gridApi = params.api;

        if (this.data) {
            this.gridApi.setRowData(this.data)
        }
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
