import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, CellValueChangedEvent } from "ag-grid-community";
import * as fromModels from '../../models';


@Component({
    selector: 'app-scenario-management-scenario-viewer',
    templateUrl: './scenario-management-scenario-viewer.component.html',
    styleUrls: ['./scenario-management-scenario-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioManagementScenarioViewerComponent {

    @Input() scenarios: fromModels.IScenario[];
    @Output() scenarioUpdate = new EventEmitter<fromModels.IScenarioUpdateReq>();

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        getRowNodeId: data => data['ScenarioId'],
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
            { headerName: 'Scenario Id', field: 'ScenarioId', width: 60},
            {  
                headerName: 'Enabled', 
                field: 'Enabled', 
                width: 30, 
                cellClass: 'column-highlight-yellow', 
                editable: true, 
                cellEditor: 'agRichSelectCellEditor', 
                cellEditorParams: {
                    values: ['true', 'false'], 
                    valuePlaceholder: 'true'
                },
                cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}
            },
            { headerName: 'Scenario Set', field: 'ScenarioSet', width: 50},
            { headerName: 'Country Code', field: 'CountryCode', width: 50},
            { 
                headerName: 'Scenario Description', 
                field: 'ScenarioDescription', 
                editable: true, 
                cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, 
                cellClass: 'column-highlight-yellow'
            },
            { 
                headerName: 'Scenario Name', 
                field: 'ScenarioName', 
                editable: true, 
                cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, 
                cellClass: 'column-highlight-yellow'
            },
            { 
                headerName: 'Sort Order', 
                field: 'ScenarioSortOrder', 
                editable: true, 
                cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, 
                cellClass: 'column-highlight-yellow', 
                width: 30
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
        const nodeData: fromModels.IScenario = event.node.data
        let payload: fromModels.IScenarioUpdateReq = {
            countryCode: nodeData.CountryCode,
            enabled: nodeData.Enabled === true ? 1 : 0,
            scenarioDescription: nodeData.ScenarioDescription,
            scenarioName: nodeData.ScenarioName,
            scenarioSortOrder: Number(nodeData.ScenarioSortOrder),
            scenarioId: nodeData.ScenarioId
        }
        this.scenarioUpdate.emit(payload)
    }

}
