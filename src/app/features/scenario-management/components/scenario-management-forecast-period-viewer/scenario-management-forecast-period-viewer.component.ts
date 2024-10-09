import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { GridApi, ColumnApi, GridOptions, ValueFormatterParams, CellValueChangedEvent, CellClickedEvent } from "ag-grid-community";
import * as fromModels from '../../models';

@Component({
    selector: 'app-scenario-management-forecast-period-viewer',
    templateUrl: './scenario-management-forecast-period-viewer.component.html',
    styleUrls: ['./scenario-management-forecast-period-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioManagementForecastPeriodViewerComponent {

    @Input() forecastPeriods: fromModels.IForecastPeriod[];
    @Output() forecastPeriodUpdate = new EventEmitter<fromModels.IForecastPeriodUpdateReq>();

    public extraOption = {sizeColumnsToFit: true};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
        getRowNodeId: data => data['ForecastPeriodId'],
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
           { headerName: 'Period Id', field: 'ForecastPeriodId', width: 100}, 
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
            { headerName: 'Variable Name', field: 'VariableName'},
            { 
                headerName: 'Forecast Period', 
                field: 'ForecastPeriod', 
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
        const nodeData: fromModels.IForecastPeriod = event.node.data
        let payload: fromModels.IForecastPeriodUpdateReq = {
            enabled: nodeData.Enabled === true ? 1 : 0,
            forecastPeriod: nodeData.ForecastPeriod,
            forecastPeriodId: nodeData.ForecastPeriodId
        }
        this.forecastPeriodUpdate.emit(payload)
    }

}
