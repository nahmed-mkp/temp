import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import { CellValueChangedEvent, ColumnApi, GridApi, GridOptions, IRowModel, RowNode } from "ag-grid-community";
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { ScenarioAnalysisDeleteCellRendererComponent } from "../cell-renderers/delete-renderer";
import { ScenarioAnalysisSIDDropdownCellRendererComponent } from "../cell-renderers/sid-dropdown/sid-dropdown.component";

@Component({
    selector: 'scenario-analysis-custom-shocks-grid-viewer',
    templateUrl: './scenario-analysis-custom-shocks-grid-viewer.component.html',
    styleUrls: ['./scenario-analysis-custom-shocks-grid-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioAnalysisCustomShocksGridViewerComponent implements OnChanges {

    @Input() customShockData: fromModels.ICustomShock[];
    @Input() shockTypes: string[];
    @Input() sidPrompt: any;

    @Output() onSidInput = new EventEmitter<string>();
    @Output() onUpdateCustomShocks = new EventEmitter<fromModels.ICustomShock[]>();
    
    public extraOption = {};
    private gridApi: GridApi;

    public customGridOption: GridOptions = {
        defaultColDef: {
            cellClass: ['right-border-light', 'yellow-cell'],
            headerClass: 'ag-header-wrap',
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            editable: true,
            suppressToolPanel: true,
            cellStyle: params => {
                if (typeof params.value === 'number') {
                    return { 'justify-content': 'flex-end', 'padding-right': '10px'}; 
                }
            },
            onCellValueChanged: (params) => {
                this.onCellValueChanged(params);
            },
        },
        rowHeight: 30,
        getRowNodeId: (data) => data['id'],
        columnDefs: [
            { 
                headerName: 'Delete', 
                field: '', 
                headerComponentParams: {template: '<span class="material-icons" style="font-size:20px">delete_forever</span>'}, 
                width: 20, 
                filter: false, 
                editable: false,
                cellRenderer: 'ScenarioAnalysisDeleteCellRendererComponent',
                onCellClicked: (params) => this.onDeleteRow(params),
                headerTooltip: 'Delete From Config',
            },
            { 
                field: 'SID',  
                editable: false,
                headerName: 'SID', 
                width: 300,
                maxWidth: 300,
                minWidth: 300,
                cellRenderer: 'ScenarioAnalysisSIDDropdownCellRendererComponent',
                cellRendererParams: params => {
                    return {
                      id: params.data.id,
                      sid: params.data.SID,
                      onSIDSelected: this.onSIDSelected
                    }
                }
            },
            { 
                field: 'ShockType', 
                headerName: 'Shock Type',  
                cellEditor: "agSelectCellEditor",
                cellEditorParams: (params) => {
                    return {
                        values: this.shockTypes,
                    }
                },
            },
            { 
                field: 'ShockAmount', 
                headerName: 'Shock Amount'
            },
        ],
        frameworkComponents: {
            ScenarioAnalysisDeleteCellRendererComponent: ScenarioAnalysisDeleteCellRendererComponent,
            ScenarioAnalysisSIDDropdownCellRendererComponent: ScenarioAnalysisSIDDropdownCellRendererComponent
        },
        floatingFilter: true,
    };
    
    constructor(private store: Store<fromStore.ScenarioAnalysisState>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.onSIDSelected = this.onSIDSelected.bind(this);
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.redrawGrid();
        this.gridApi.sizeColumnsToFit();
    }  

    onCellValueChanged(params: CellValueChangedEvent) {
        if(params.data.id === -1){
            if( params.data['SID'] !== '<Enter SID>' && 
            params.data['ShockType'] !== '<Choose Shock Type>' && 
            params.data['ShockAmount'] !== '<Enter Value>'){
                this.onUpdateCustomShocks.emit(this.getAllValidRows(params.api));
            }
        } else {
          this.onUpdateCustomShocks.emit(this.getAllValidRows(params.api));
        }
    }

    getAllValidRows(gridApi: GridApi) {
        let rowData = [];
        gridApi.forEachNode( (node: RowNode) => {
            if(node.data.id === -1){
                if(node.data['SID'] !== '<Enter SID>' && 
                    node.data['ShockType'] !== '<Choose Shock Type>' && 
                    node.data['ShockAmount'] !== '<Enter Value>'){
                      let data = {...node.data};
                      delete data['id']
                      rowData.push(data);
                }
            } else {
              let data = {...node.data};
              delete data['id']
              rowData.push(data);
            }
        });
        return rowData;
    }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes && changes.customShockData && changes.customShockData.currentValue !== null && this.gridApi){
        this.redrawGrid();
      }
    }  

    redrawGrid(){
        let inputRow = {
            SID: null,
            ShockType: '<Choose Shock Type>',
            ShockAmount: '<Enter Value>',
            id: -1
        }
        this.gridApi.setRowData([])
        this.gridApi.setRowData([...this.customShockData, inputRow])
    }

    onDeleteRow(params){
        let elementSID = params.data['SID'];
        let filteredRowData = [...this.customShockData]
        filteredRowData = filteredRowData.filter((row) => row.SID !== elementSID);
        this.onUpdateCustomShocks.emit(filteredRowData);
    }

    onSIDSelected(rowId, value){
      this.gridApi.forEachNode( (node: RowNode) => {
        if(node.data.id === -1){
          node.data['SID'] = value;
        }
      });
      let validRows = this.getAllValidRows(this.gridApi);
      validRows[rowId]['SID'] = value;
      this.onUpdateCustomShocks.emit(validRows);
    }
}

