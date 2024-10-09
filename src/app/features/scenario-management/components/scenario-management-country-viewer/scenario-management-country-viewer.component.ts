import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { GridApi, ColumnApi, GridOptions, CellValueChangedEvent } from "ag-grid-community";
import * as fromModels from '../../models';

@Component({
    selector: 'app-scenario-management-country-viewer',
    templateUrl: './scenario-management-country-viewer.component.html',
    styleUrls: ['./scenario-management-country-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioManagementCountryViewerComponent {

    @Input() countries;
    @Output() countryUpdate = new EventEmitter<fromModels.ICountryUpdateReq>();
    
    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        onCellValueChanged: params => this.onCellValueChanged(params),
        getRowNodeId: data => data['countryCode'],
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false,
        },
        floatingFilter: true,
        columnDefs: [
            { headerName: 'Country', field: 'countryCode', width: 60}, 
            { headerName: 'Sort Order', field: 'countrySortOrder', width: 100, editable: true,  cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, cellClass: 'column-highlight-yellow'},
            { headerName: 'Name', field: 'Name', cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, cellClass: 'column-highlight-yellow'}
        ]
    };

    constructor() {
      
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    
    onCellValueChanged(event: CellValueChangedEvent){
        const nodeData: fromModels.ICountry = event.node.data
        let payload: fromModels.ICountryUpdateReq = {
            countryCode: nodeData.countryCode, 
            name: nodeData.Name,
            sortOrder: nodeData.countrySortOrder
        }
        this.countryUpdate.emit(payload)
    }

}
