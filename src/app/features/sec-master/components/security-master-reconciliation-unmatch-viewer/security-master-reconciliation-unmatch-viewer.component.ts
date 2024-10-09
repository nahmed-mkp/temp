import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { SecurityMasterReconciliationDetailGridLayoutComponent } from '../../containers';

@Component({
    selector: 'app-security-master-reconciliation-unmatch-viewer',
    templateUrl: './security-master-reconciliation-unmatch-viewer.component.html',
    styleUrls: ['./security-master-reconciliation-unmatch-viewer.component.scss']
})
export class SecurityMasterReconciliationUnmatchViewerComponent implements OnInit {

    @Input() data: any;
    @Input() loading: boolean;
    @Input() layoutMode: any;

    @Output() toggleView = new EventEmitter<string>();

    private gridApi: GridApi;
    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true
        },
        columnDefs: [
            {
                headerName: 'Unmatched Securities ( Prod | Parallel )',
                field: 'SEC_NAME',
                cellRenderer: 'agGroupCellRenderer'
            },
            {
                headerName: 'Security ID',
                field: 'SEC_ID',
            },
        ],
        // getRowNodeId: data => data['SEC_NAME'],


        // Master - Detail grid setup
        embedFullWidthRows: true,
        masterDetail: true,
        detailCellRenderer: 'SecurityMasterReconciliationDetailGridLayoutComponent',
        detailRowHeight: 215,
        detailCellRendererParams: params => {
            const config: any = {};
            config['nodeId'] = params.data['SEC_NAME'];
            config['match'] = false;
            return config;
        },

        // Framework
        frameworkComponents: {
            'SecurityMasterReconciliationDetailGridLayoutComponent': SecurityMasterReconciliationDetailGridLayoutComponent,
        }
    };

    constructor() { }

    ngOnInit() {}


    customGridCallBack(params) {
        this.gridApi = params.api;
    }

    public onToggleView() {
        this.toggleView.next('unmatch');
    }
}
