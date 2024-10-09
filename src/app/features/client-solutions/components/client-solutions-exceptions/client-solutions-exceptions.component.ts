import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-cs-exceptions',
    templateUrl: './client-solutions-exceptions.component.html',
    styleUrls: ['./client-solutions-exceptions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsExceptionsComponent implements OnInit {

    @Input() exceptions: any[];
    @Input() exceptionsLoading: boolean;
    @Input() exceptionsLoaded: boolean;
    @Input() exceptionsError: string;

    public extraOption = {sizeColumnsToFit: true, autoSizeColumns: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: false,
            sortable: false,
            filter: true,
            resizable: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
        },
        floatingFilter: true,
        sideBar: false,
        context: this,
        columnDefs: [
            {
                headerName: 'Fund',
                field: 'fundName',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Investor',
                field: 'investorName',
                filter: 'agSetColumnFilter'
            },
            {
                headerName: 'Investor Id',
                field: 'investorId',
                filter: 'agSetColumnFilter',
                cellStyle: { backgroundColor: '#fcfbe4', 'font-weight': 'bold' }
            },
            {
                headerName: 'Fund Id',
                field: 'fundId',
                filter: 'agSetColumnFilter',
                cellStyle: { backgroundColor: '#fcfbe4', 'font-weight': 'bold' }
            }, {
                headerName: 'Class Id',
                field: 'classId',
                filter: 'agSetColumnFilter'
            }
        ]
    };


    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
}

