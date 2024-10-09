import { Component, OnInit, Input } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-security-master-config-downstream-mapping-viewer',
  templateUrl: './security-master-config-downstream-mapping-viewer.component.html',
  styleUrls: ['./security-master-config-downstream-mapping-viewer.component.scss']
})
export class SecurityMasterConfigDownstreamMappingViewerComponent implements OnInit {

    @Input() data: any;
    @Input() loading: boolean;

    private gridApi: GridApi;
    public extraOption = { sizeColumnsToFit: true };

    public filterValue: string;

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            // floatingFilter: true
        },
        columnDefs: [
            {
                headerName: 'Asset Class',
                field: 'SecType',
                sortedAt: 100,
                sort: 'asc'
            },
            {
                headerName: 'Security Master Field',
                field: 'PSMAttributeDisplayName',
                sortedAt: 200,
                sort: 'asc'
            },
            {
                headerName: 'Security Master Mnemonic',
                field: 'PSMAttributeName'
            },
            {
                headerName: 'Target System',
                field: 'DownstreamSystem',
                sort: 'asc',
                sortedAt: 0,
            },
            {
                headerName: 'Target System Attribute Name',
                field: 'DownstreamAttributeName'
            },
            {
                headerName: 'Target System Attribute Type',
                field: 'DownstreamAttributeType'
            },






            {
                headerName: 'IsDummyAttribute',
                field: 'IsDummyAttribute',
                hide: true,
            },
            {
                headerName: 'ReferenceAttributeTableName',
                field: 'ReferenceAttributeTableName',
                hide: true,
            },
            {
                headerName: 'ReferenceAttributeView',
                field: 'ReferenceAttributeView',
                hide: true,
            },
            {
                headerName: 'DownstreamAttributeId',
                field: 'DownstreamAttributeId',
                hide: true,
            },

        ],
    }

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {}

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

}
