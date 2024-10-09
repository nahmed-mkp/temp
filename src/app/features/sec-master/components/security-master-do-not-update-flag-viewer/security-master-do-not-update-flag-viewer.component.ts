import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';

import * as fromModels from './../../models';

@Component({
    selector: 'app-security-master-do-not-update-flag-viewer',
    templateUrl: './security-master-do-not-update-flag-viewer.component.html',
    styleUrls: ['./security-master-do-not-update-flag-viewer.component.scss']
})
export class SecurityMasterDoNotUpdateFlagViewerComponent implements OnInit {

    @Input() data: fromModels.ISecurityForDoNotUpdateFlag[];
    @Input() loading: boolean;
    @Input() setDoNotUpdateFlagPending: boolean;
    @Input() manualSetDoNotUpdateFlagPending: boolean;

    @Output() manualSetDoNotUpdateFlag = new EventEmitter<number>();
    @Output() setDoNotUpdateFlag = new EventEmitter<fromModels.ISetDoNotUpdateFlag>()

    private gridApi: GridApi;
    public extraOption = {sizeColumnsToFit: true};

    public filterValue: string;
    public crdSecId: number = null;

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 200
        },
        getRowNodeId: data => data.BBGGlobalId,
        columnDefs: [
            {headerName: 'BBGGlobalId', field: 'BBGGlobalId', width: 150, filter: 'agTextColumnFilter'},
            {headerName: 'CRDSecId', field: 'CRDSecId', width: 100},
            {headerName: 'CreatedBy', field: 'CreatedBy', width: 120},
            {headerName: 'CreatedDate', field: 'CreatedDate', width: 180},
            {headerName: 'SecName', field: 'SecName', width: 200},
            {headerName: 'UpdatedBy', field: 'UpdatedBy', width: 100},
            {headerName: 'UpdatedDate', field: 'UpdatedDate', width: 180},
            {headerName: 'DoNoUpdateFlag', field: 'DoNoUpdateFlag', width: 130},
        ],

        getContextMenuItems: params => {

            const addDoNotUpdateFlag = {
                name: 'Add DoNotUpdate Flag',
                icon: '<i class="material-icons small-menu-icon">add</i>',
                action: () => {
                    this.setDoNotUpdateFlag.emit({
                        CRDSecId: params.node.data['CRDSecId'],
                        action: 'Add'
                    });
                }
            };

            const removeDoNotUpdateFlag = {
                name: 'Remove DoNotUpdate Flag',
                icon: '<i class="material-icons small-menu-icon">remove</i>',
                action: () => {
                    this.setDoNotUpdateFlag.emit({
                        CRDSecId: params.node.data['CRDSecId'],
                        action: 'Remove'
                    });
                }
            }

            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', addDoNotUpdateFlag, removeDoNotUpdateFlag];
        }
    };

    constructor() { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
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

    public onManualSetDoNotUpdateFlag() {
        if (this.crdSecId) {
            this.manualSetDoNotUpdateFlag.emit(this.crdSecId);
            this.crdSecId = null;
        }
    }

}
