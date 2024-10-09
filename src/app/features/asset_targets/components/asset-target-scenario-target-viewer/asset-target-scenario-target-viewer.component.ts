import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { IScenarioTargetUpdate } from '../../models';
import moment from 'moment';

@Component({
  selector: 'app-asset-target-scenario-target-viewer',
  templateUrl: './asset-target-scenario-target-viewer.component.html',
  styleUrls: ['./asset-target-scenario-target-viewer.component.scss']
})
export class AssetTargetScenarioTargetViewerComponent implements OnChanges {

  @Input() inputData: any;
  @Input() filter: string;
  @Input() limitedAccessLevel: boolean;

  @Output() onEditing = new EventEmitter<IScenarioTargetUpdate>();

  public gridData: any = [];

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  
  public userProbabilityOverrides: {}

  public subscriptions: Subscription[] = [];

  public customGridOption: GridOptions = {
      columnDefs: [
        { field: 'AsOfDate', headerName: 'As Of Date', valueFormatter: params => moment(params.value).format('MM/DD/YYYY')},
        { field: 'CountryCode', headerName: 'Country'},
        { field: 'Security', headerName: 'Security'},
        { field: 'SecurityID', headerName: 'Security ID'},
      ],
      defaultColDef: {
          flex: 1,
          maxWidth: 180,
          minWidth: 120,
          resizable: true,
          autoHeight: true,
          filter: true,
          sortable: true,
          cellStyle: params => {
            return typeof params.value === 'number' ? {'justify-content': 'flex-end', 'border-left': '1px dashed #dcdcdc'} : { 'justify-content': 'center', 'border-left': '1px dashed #dcdcdc' };
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
      headerHeight: 50,
      context: {parentComponent: this},
      deltaRowDataMode: true,
      enableSorting: true, 
      suppressColumnVirtualisation: true,
      rowSelection: 'single',
      getRowNodeId: data => data.SecurityID,

      onCellValueChanged: params => {
        let payload = {
          securityId: Number(params.data.SecurityID),
          scenarioId: Number(params.colDef.field.replace("scenario", "")),
          target: Number(params.data[params.colDef.field])
        }
        this.onEditing.emit(payload)
      }
  };

  public extraOption = {
    sizeColumnsToFit: true
  };

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.ColumnApi;
    this.updateColDefs();
  }

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.gridApi && changes && changes.filter && changes.filter.currentValue){
      this.updateColDefs();
    }
  }

  updateColDefs(){
    let scenarioIdArr = Object.keys(this.inputData.scenarioMap[this.filter]);
    let newColDefs = [...this.customGridOption.columnDefs];
    scenarioIdArr.map( item => {
      newColDefs.push({
        field: item, 
        headerName: this.inputData.scenarioMap[this.filter][item], 
        editable: this.limitedAccessLevel,
        cellClass: this.limitedAccessLevel ? 'yellow-background' : null
      })
    })
    this.gridApi.setColumnDefs([])
    this.gridApi.setColumnDefs(newColDefs)
    this.gridApi.setRowData([])
    this.gridData = this.inputData.data.filter(item => item.CountryCode === this.filter);
  }

}
