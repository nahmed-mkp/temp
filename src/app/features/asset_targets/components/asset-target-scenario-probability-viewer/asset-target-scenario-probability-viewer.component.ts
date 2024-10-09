import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import moment from 'moment';
import { IScenarioProbabilityUpdate } from '../../models';

@Component({
  selector: 'app-asset-target-scenario-probability-viewer',
  templateUrl: './asset-target-scenario-probability-viewer.component.html',
  styleUrls: ['./asset-target-scenario-probability-viewer.component.scss']
})

export class AssetTargetScenarioProbabilityViewerComponent implements OnChanges {

  @Input() inputData: any;
  @Input() filter: string;
  
  @Output() onEditing = new EventEmitter<IScenarioProbabilityUpdate>();

  public gridData: any = [];

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  
  public extraOption = {sizeColumnsToFit: true};

  public customGridOption: GridOptions = {
    columnDefs: [
      { field: 'AsOfDate', headerName: 'As Of Date', valueFormatter: params => moment(params.value).format('MM/DD/YYYY')},
      { field: 'CountryCode', headerName: 'Country', width: 120},
      { field: 'ScenarioDescription', headerName: 'Description', editable: true, cellStyle: params => { return {'justify-content':'flex-start', 'border-left': '1px dashed #dcdcdc'}}},
      { field: 'Probability', headerName: 'Probability', editable: true,  cellClass: 'yellow-background'},
      { field: 'IsOfficial', headerName: 'Is Official',  width: 150},
      { field: 'CreateName', headerName: 'Creation Name'},
      { field: 'CreateDate', headerName: 'Creation Date', valueFormatter: params => moment(params.value).format('MM/DD/YYYY')},
      { field: 'UpdateName', headerName: 'Update Name'},
      { field: 'UpdateDate', headerName: 'Update Date', valueFormatter: params => moment(params.value).format('MM/DD/YYYY')},     
      { field: 'ScenarioCode', headerName: 'Code'},
      { field: 'ScenarioID', headerName: 'ID',  width: 100}
    ],
    defaultColDef: {
        flex: 1,
        resizable: true,
        autoHeight: true,
        filter: true,
        sortable: false,
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end', 'border-left': '1px dashed #dcdcdc'} : {'justify-content': 'center', 'border-left': '1px dashed #dcdcdc' };
        },
        valueFormatter: params => {
          if (typeof params.value === 'number') {
              return params.value.toLocaleString(undefined, {maximumFractionDigits: 3});
          }
      }
    },
    statusBar: {
      statusPanels: [
      {statusPanel: 'agAggregationComponent'}
      ]
    },
    deltaRowDataMode: true,
    enableSorting: true, 
    rowSelection: 'single',
    getRowNodeId: data => data.ScenarioID,

    onCellValueChanged: params => {
      let payload = {
        scenarioId: params.data.ScenarioID,
        probability: Number(params.data.Probability)
      }
      this.onEditing.emit(payload)
    }
  };

  constructor() {
      this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  customGridCallBack(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.filter && changes.filter.currentValue){
      this.gridData = this.inputData.filter(item => item.CountryCode === this.filter)
    }

  }


}
