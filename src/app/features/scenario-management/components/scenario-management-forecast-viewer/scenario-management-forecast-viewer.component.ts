import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { GridApi, ColumnApi, GridOptions, CellValueChangedEvent } from "ag-grid-community";
import * as fromModels from '../../models';
import { updateAggregatedForecast } from "../../store";
import moment from "moment";

@Component({
    selector: 'app-scenario-management-forecast-viewer',
    templateUrl: './scenario-management-forecast-viewer.component.html',
    styleUrls: ['./scenario-management-forecast-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioManagementForecastViewerComponent {

    @Input() forecasts;
    @Output() forecastUpdate = new EventEmitter<fromModels.IForecastUpdateReq>();

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
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
            { headerName: 'As Of Date', field: 'AsOfDate', valueFormatter: params => moment(params.value).format('MM/DD/YYYY')},

            { headerName: 'Country Name', field: 'Name'},
            { headerName: 'Scenario Name', field: 'ScenarioName', editable: true,  cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, cellClass: 'column-highlight-yellow'},    
            { headerName: 'Variable Name', field: 'VariableName', editable: true, cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, cellClass: 'column-highlight-yellow'},
            { headerName: 'Forecast Period', field: 'ForecastPeriod', editable: true, cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, cellClass: 'column-highlight-yellow'},
         
            { headerName: 'MKP Value', field: 'MKPValue', editable: true,  cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, cellClass: 'column-highlight-yellow'},
            { headerName: 'Consensus Value', field: 'ConsensusValue', editable: true, cellStyle: { 'border-left': '1px dashed gainsboro', 'border-right': '1px dashed gainsboro'}, cellClass: 'column-highlight-yellow'},
    
            // { headerName: 'Forecast Period Id', field: 'ForecastPeriodId'},
            // { headerName: 'Variable Id', field: 'VariableId'},
            // { headerName: 'Scenario Id', field: 'ScenarioId'},    
        ]
    };

    constructor() {
       
    }

    onCellValueChanged(event: CellValueChangedEvent){
       const scenarioName: string = event.data['ScenarioName']
       const scenarioId: number = event.data['ScenarioId']
       const econVarId: number = event.data['VariableId']
       const econVarName: string = event.data['VariableName']
       const mkpVal: number = event.data['MKPValue']
       const consensusVal: number = event.data['ConsensusValue']
       const forecastPeriod: string = event.data['ForecastPeriod']
       const forecastPeriodId: number = event.data['ForecastPeriodId'] 
       let payload: fromModels.IForecastUpdateReq = {
            econVariableName: econVarName,
            econVariableId: econVarId,
            scenarioId: scenarioId,
            scenarioName: scenarioName, 
            forecastPeriodId: forecastPeriodId,
            forecastPeriod: forecastPeriod,
            mkpValue: Number(mkpVal),
            consensusValue: Number(consensusVal)
        }
       this.forecastUpdate.emit(payload)
    }
    
    ngOnInit(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

}
