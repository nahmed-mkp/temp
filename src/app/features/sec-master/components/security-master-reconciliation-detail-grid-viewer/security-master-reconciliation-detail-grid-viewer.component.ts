import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions, ValueFormatterParams } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { SecurityMasterReconciliationDetailGridDeepViewerComponent } from '../security-master-reconciliation-detail-grid-deep-viewer/security-master-reconciliation-detail-grid-deep-viewer.component';

@Component({
    selector: 'app-security-master-reconciliation-detail-grid-viewer',
    templateUrl: './security-master-reconciliation-detail-grid-viewer.component.html',
    styleUrls: ['./security-master-reconciliation-detail-grid-viewer.component.scss']
})
export class SecurityMasterReconciliationDetailGridViewerComponent implements OnInit, OnChanges {

    @Input() data: any;
    @Input() loading: boolean;
    @Input() match: boolean;;

    private gridApi: GridApi;
    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions;

    constructor() {}

    ngOnInit() {
        // const detailColumns = this.data && this.data.length && this.data.length > 0 && Object.keys(this.data[0]['sourceData'][0]) || [];
        this.customGridOption = {
            defaultColDef: { filter: 'agTextColumnFilter'},
            columnDefs: [
                {
                    headerName: 'Source',
                    field: 'source',
                    cellRenderer: 'agGroupCellRenderer'
                },
            ],
            headerHeight: 0,
            rowClass: 'medium-row',
            rowHeight: 22,

            // Master - Detail grid setup
            embedFullWidthRows: true,
            masterDetail: true,
            detailRowHeight: 70,
            detailCellRenderer: 'SecurityMasterReconciliationDetailGridDeepViewerComponent',
            detailCellRendererParams: params => {
                const config: any = {};
                config['match'] = this.match;
                return config;
            },

            // Framework
            frameworkComponents: {
                'SecurityMasterReconciliationDetailGridDeepViewerComponent': SecurityMasterReconciliationDetailGridDeepViewerComponent,
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {}

    customGridCallBack(params) {
        this.gridApi = params.api;
    }

    // Utility --------------------------

}
