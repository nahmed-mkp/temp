import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, CellValueChangedEvent, CellClickedEvent } from "ag-grid-community";
import * as fromModels from '../../models';

@Component({
    selector: 'app-scenario-management-econvar-viewer',
    templateUrl: './scenario-management-econvar-viewer.component.html',
    styleUrls: ['./scenario-management-econvar-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioManagementRconVarViewerComponent {

    @Input() economicVars: fromModels.IEconomicVariable[];
    @Output() economicVariableUpdate = new EventEmitter<fromModels.IEconomicVariableUpdateReq>();

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        getRowNodeId: data => data['VariableId'],

        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false,
        },
        floatingFilter: true,
        onCellValueChanged: params => this.onCellValueChanged(params),
        columnDefs: [
            { headerName: 'Variable Id', field: 'VariableId', width: 100},
            {  
                headerName: 'Enabled', 
                field: 'Enabled', 
                width: 100, 
                cellClass: 'column-highlight-yellow', 
                editable: true, 
                cellEditor: 'agRichSelectCellEditor', 
                cellEditorParams: {
                    values: ['true', 'false'], 
                    valuePlaceholder: 'true'
                },
                cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}
            },
            { headerName: 'Country', field: 'CountryCode'},
            { 
                headerName: 'Name', 
                field: 'VariableName', 
                editable: true, 
                cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, 
                cellClass: 'column-highlight-yellow'
            }
        ]
    };

    constructor() {
       
    }

    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onCellValueChanged(event: CellValueChangedEvent){
        const nodeData: fromModels.IEconomicVariable = event.node.data
        console.warn(nodeData)
        let payload: fromModels.IEconomicVariableUpdateReq = {
            countryCode: nodeData.CountryCode,
            enabled: nodeData.Enabled === true ? 1 : 0,
            variableId: nodeData.VariableId,
            variableName: nodeData.VariableName
        }

        console.warn(payload)
        this.economicVariableUpdate.emit(payload)
    }

}

