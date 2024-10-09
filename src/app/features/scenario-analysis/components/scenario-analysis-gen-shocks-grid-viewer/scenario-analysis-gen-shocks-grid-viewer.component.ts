import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from '../../store';
import { ScenarioAnalysisDeleteCellRendererComponent } from "../cell-renderers/delete-renderer";

import { CellValueChangedEvent, ColumnApi, GridApi, GridOptions, RowNode } from "ag-grid-community";

@Component({
    selector: 'scenario-analysis-gen-shocks-grid-viewer',
    templateUrl: './scenario-analysis-gen-shocks-grid-viewer.component.html',
    styleUrls: ['./scenario-analysis-gen-shocks-grid-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioAnalysisGenShocksGridViewerComponent implements OnChanges {

    @Input() generalShockData;
    @Input() shockTypes: string[];
    @Input() clientServicesThemes: string[];

    public extraOption = {};
    private gridApi: GridApi;
    
    public customGridOption: GridOptions = {
        defaultColDef: {
            cellClass: ['right-border-light', 'yellow-cell'],
            headerClass: 'ag-header-wrap',
            filter: 'agSetColumnFilter',
            editable: true,
            enableCellChangeFlash: false,
            suppressToolPanel: true,
            cellStyle: params => {
                if (typeof params.value === 'number') {
                    return { 'justify-content': 'flex-end', 'padding-right': '10px'}; 
                }
            },
            onCellValueChanged: (params) => {
                this.onCellValueChanged(params);
            }
        },
        getRowNodeId: (data) => data['ClientTheme'],
        columnDefs: [
            { 
                headerName: 'Delete', 
                field: '', 
                headerComponentParams: {template: '<span class="material-icons" style="font-size:20px">delete_forever</span>'}, 
                width: 20, 
                filter: false, 
                cellRenderer: 'ScenarioAnalysisDeleteCellRendererComponent',
                // cellRendererParams: params => params.data,
                onCellClicked: (params) => this.onDeleteRow(params),
                headerTooltip: 'Delete From Config'
            },
            { 
                field: 'ClientTheme',  
                headerName: 'Client Theme', 
                cellEditor: "agSelectCellEditor",
                cellEditorParams: params => {
                    return {
                        values: this.clientServicesThemes,
                    }
                }
            },
            { 
                field: 'ShockType', 
                headerName: 'Shock Type',
                cellEditor: "agSelectCellEditor",
                cellEditorParams: params =>  {
                    return {
                        values: this.shockTypes,
                    }
                }
            },
            { 
                field: 'ShockAmount', 
                headerName: 'Shock Amount'
            },
        ],
        frameworkComponents: {
            ScenarioAnalysisDeleteCellRendererComponent: ScenarioAnalysisDeleteCellRendererComponent
        },
        floatingFilter: true,
    };

    constructor(private store: Store<fromStore.ScenarioAnalysisState>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }
    
    customGridCallBack(params) {
        this.gridApi = params.api;
        this.redrawGrid();
        this.gridApi.sizeColumnsToFit();
    }  

    onCellValueChanged(params: CellValueChangedEvent){
      if(params.data.id === -1){
          if( params.data['ClientTheme'] !== '<Choose Client Theme>' && 
          params.data['ShockType'] !== '<Choose Shock Type>' && 
          params.data['ShockAmount'] !== '<Enter Value>'){
              this.store.dispatch(fromStore.updateGeneralShocks(this.getAllValidRows(params.api)));
          }
      } else {
          this.store.dispatch(fromStore.updateGeneralShocks(this.getAllValidRows(params.api)));
      }
    }

    getAllValidRows(gridApi: GridApi) {
      let rowData = [];
      gridApi.forEachNode( (node: RowNode) => {
          if(node.data.id === -1){
              if(node.data['ClientTheme'] !== '<Choose Client Theme>' &&
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
        if(changes && changes.generalShockData && changes.generalShockData.currentValue !== null && this.gridApi){
          this.redrawGrid();
        }
    }  

    redrawGrid(){
        let inputRow = {
            ClientTheme: '<Choose Client Theme>',
            ShockType: '<Choose Shock Type>',
            ShockAmount: '<Enter Value>',
            id: -1
        }
        this.gridApi.setRowData([])
        this.gridApi.setRowData([...this.generalShockData, inputRow])
    }

    onDeleteRow(params){
        let clientTheme = params.data['ClientTheme'];
        let filteredRowData = [...this.generalShockData]
        filteredRowData = filteredRowData.filter((row) => row['ClientTheme'] !== clientTheme);
        this.store.dispatch(fromStore.updateGeneralShocks(filteredRowData));
    }


}
