import { Component, OnInit, Input } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-security-master-bbg-data-map-viewer',
  templateUrl: './security-master-bbg-data-map-viewer.component.html',
  styleUrls: ['./security-master-bbg-data-map-viewer.component.scss']
})
export class SecurityMasterBbgDataMapViewerComponent implements OnInit {

  @Input() data: any;
  @Input() loading: boolean;

  private gridApi: GridApi;
  public extraOption = { sizeColumnsToFit: true };

  public filterValue: string;

  public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true
        },
        columnDefs: [
            {
                headerName: 'Asset Class',
                field: 'SecType',
                filter: 'agSetColumnFilter',
                sort: 'asc'
            },
            {
                headerName: 'Bloomberg Mnemonic',
                field: 'Source_Field_Name',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Security Master Field',
                field: 'PSM_Display_Name',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Security Master Mnemonic',
                field: 'PSM_DB_Field_Name',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Source',
                field: 'Source',
                filter: 'agSetColumnFilter',
            },
            {
                headerName: 'IsBBGField',
                field: 'IsBBGField',
                filter: 'agSetColumnFilter',
                hide: true,
            },
        ],
    };

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
