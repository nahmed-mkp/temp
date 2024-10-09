import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services/utility.service';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { ExecutionTaggingDeleteCellRendererComponent } from '../delete-cell-renderer';

@Component({
  selector: 'app-execution-tagging-reason-editor-viewer',
  templateUrl: './execution-tagging-reason-editor-viewer.component.html',
  styleUrls: ['./execution-tagging-reason-editor-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExecutionTaggingReasonEditorViewer {

  @Input() data: fromModels.IReason[];
  @Input() loading: boolean;

  @Output() onReasonUpdated = new EventEmitter<fromModels.IReasonsUpdateReq>();

  public extraOption = {};

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public customGridOption: GridOptions = {
    defaultColDef: {
      cellClass: 'right-border-light',
      headerClass: 'ag-header-wrap',
      filter: 'agSetColumnFilter',
      editable: false,
      enableCellChangeFlash: false,
      suppressToolPanel: true,
    },
    columnDefs: [
      { headerName: 'Delete', 
        field: 'Delete', 
        cellRenderer: 'ExecutionTaggingDeleteCellRendererComponent', 
        headerTooltip: 'Delete From Selection', 
        width: 60, 
        minWidth: 60, 
        maxWidth: 60, 
        suppressFilter: true, 
        suppressSorting: true, 
        suppressMenu: true, 
        onCellClicked: (params) => this.deleteRow(params.node.data)
      },
      { headerName: 'Reason', field: 'Reason', editable: true, cellClass: 'yellow-cell right-border-light'},
      { headerName: 'Used By', field: 'UsedBy', editable: true, cellClass: 'yellow-cell right-border-light'},
      { headerName: 'Reason Id', field: 'ReasonId', hide: true},
    ],
    floatingFilter: true,
    rowHeight: 30,
    rowClass: 'medium-row',
    getRowNodeId: node => node['ReasonId'],
    onCellValueChanged: params => this.onCellValueChanged(params),
    frameworkComponents: {
      'ExecutionTaggingDeleteCellRendererComponent': ExecutionTaggingDeleteCellRendererComponent
    }
  };

  constructor(private store: Store<fromStore.ExecutionTaggingState>, private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.data && changes.data.currentValue) {
      this.populateGrid();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.populateGrid();
    this.gridApi.sizeColumnsToFit();
  }
  
  populateGrid(){
    if(this.gridApi){
      let newRow = {
        'Reason': '',
        'ReasonId': null,
        'UsedBy': ''
      }
      this.gridApi.setRowData([...this.data, newRow]);
    }
  }

  onCellValueChanged(params){                                                                                             
    if(this.isValidNewRow(params.node.data)){
      let node = params.node.data;
      let payload: fromModels.IReasonsUpdateReq = {
        reason: node.Reason,
        usedBy: node.UsedBy,
        enteredBy: JSON.parse(localStorage.getItem('currentUser'))['ntName'],
        reasonId: node.ReasonId
      }
      this.onReasonUpdated.emit(payload);
    }
  }

  deleteRow(node: fromModels.IReason){
    if(node.ReasonId){
      let payload: fromModels.IReasonsUpdateReq = {
        reason: null,
        usedBy: null,
        enteredBy: null,
        reasonId: node.ReasonId
      }
      this.onReasonUpdated.emit(payload);
    } 
  }

  isValidNewRow(node: fromModels.IReason) : boolean {
    return (node.Reason && node.UsedBy) ? true : false;
  }
}
