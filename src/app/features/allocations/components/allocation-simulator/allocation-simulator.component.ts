import { Component,  Input, ChangeDetectionStrategy } from '@angular/core';

import * as fromModels from '../../models';

import { AppCustomGridCellCheckboxComponent, AppCustomGridCellCrudOperationComponent } from 'src/app/components';

import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';


@Component({
    selector: 'app-allocation-simulator',
    templateUrl: './allocation-simulator.component.html',
    styleUrls: ['./allocation-simulator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllocationSimulatorComponent {

    @Input() agreementsAllocationCache: fromModels.ITradeAgreementAllocationCache[];
    @Input() agreementsAllocationCacheLoading: boolean;
    @Input() agreementsAllocationCacheLoaded: boolean;
    @Input() agreementsAllocationCacheError: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public searchCriteria: string = null;

    public customGridOption: GridOptions = {

        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('id') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            filter: 'agSetColumnFilter',
            editable: false
        },

        sideBar: false,
        suppressColumnVirtualisation: true,
        // rowMultiSelectWithClick: true,
        rowSelection: 'single',
        floatingFilter: true,
        stopEditingWhenGridLosesFocus: true,
        deltaRowDataMode: true,
        context: this,

        onRowClicked: params => { },

        frameworkComponents: {
            AppCustomGridCellCheckboxComponent: AppCustomGridCellCheckboxComponent,
            AppCustomGridCellCrudOperationComponent: AppCustomGridCellCrudOperationComponent
        },

        getRowNodeId: data => data.allocationId,
    };

    public extraOption = {
        autoSizeColumns: true
    };

    constructor() {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    onSearch(searchCriteria: string): void {
        this.gridApi.setQuickFilter(searchCriteria);
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.gridApi.closeToolPanel();

        this.gridApi.setColumnDefs([]);
        this.gridApi.setColumnDefs(this.getColumnDefs());

        if (this.agreementsAllocationCache) {
            this.gridApi.setRowData(this.agreementsAllocationCache);
        }
    }

    getColumnDefs(): any {
        const editable = false;
        const colDefs: any[] = [];
        colDefs.push({ headerName: 'Trade Agreement', field: 'tradeAgreement', editable: editable });
        colDefs.push({ headerName: 'Sec Type', field: 'secType', editable: editable });
        colDefs.push({ headerName: 'Entity', field: 'entity', editable: editable });
        colDefs.push({ headerName: 'CRD Broker', field: 'crdBroker', editable: editable });
        colDefs.push({ headerName: 'Currency', field: 'currency', editable: editable });
        colDefs.push({ headerName: 'Custodian', field: 'custodian', editable: editable });
        colDefs.push({ headerName: 'Blue Pearl', field: 'bluePearl', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'bluePearl', editable: false } });
        colDefs.push({ headerName: 'Alpha Port', field: 'alphaPort', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'alphaPort', editable: false } });
        colDefs.push({ headerName: 'Opportunity', field: 'opportunity', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'opportunity', editable: false } });
        colDefs.push({ headerName: 'Enhanced', field: 'enhancedOpp', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'enhancedOpp', editable: false } });
        colDefs.push({ headerName: 'MA7', field: 'ma7', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'ma7', editable: false } });
        colDefs.push({ headerName: 'GMMK', field: 'gmmk', editable: false, cellRenderer: 'AppCustomGridCellCheckboxComponent', cellRendererParams: { key: 'gmmk', editable: false } });

        return colDefs;
    }
}
