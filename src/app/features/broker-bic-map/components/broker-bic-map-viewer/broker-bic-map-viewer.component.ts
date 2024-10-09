import { Component, OnInit, Input } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { GridCellGeneralButtonComponent } from 'src/app/components';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { BrokerBipMapEditorLayoutDialogComponent } from '../../containers';

@Component({
    selector: 'app-broker-bic-map-viewer',
    templateUrl: './broker-bic-map-viewer.component.html',
    styleUrls: ['./broker-bic-map-viewer.component.scss']
})
export class BrokerBicMapViewerComponent implements OnInit {

    @Input() data: any = [];
    @Input() loading: boolean;

    private gridApi: GridApi;
    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions = {
        defaultColDef: {
            floatingFilter: true,
            filter: 'text',
        },

        columnDefs: [
            {headerName: 'Broker Code', field: 'BrokerCode'},
            {headerName: 'Broker Name', field: 'BrokerName'},
            {headerName: 'BIC Code', field: 'BIC_Code'},
            {
                headerName: 'Modify',
                field: 'Modify',
                cellStyle: {'color': '#00bcd4', 'font-weight': 'bold', 'justify-content': 'center'},
                pinned: 'right',
                suppressMenu: true,
                cellRenderer: 'GridCellGeneralButtonComponent',
                suppressFilter: true,
                cellRendererParams: {
                    click: params => {
                        this.openEditorDialog(params.data);
                    },
                    buttonText: 'Edit',
                    isIconButton: true,
                    icon: 'edit'
                },
                maxWidth: 45
            }
        ],

        getRowNodeId: data => data.id,

        frameworkComponents: {
            'GridCellGeneralButtonComponent': GridCellGeneralButtonComponent
        }
    }

    constructor(private dialog: MatDialog) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.openEditorDialog = this.openEditorDialog.bind(this);
    }

    ngOnInit() {
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
    }

    private openEditorDialog(rowData) {
        this.dialog.open(BrokerBipMapEditorLayoutDialogComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '20rem',
            height: '20rem',
            data: rowData
        });
    }

}
