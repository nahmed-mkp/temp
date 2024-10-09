import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, CellValueChangedEvent } from 'ag-grid-community';
import * as fromStore from '../../store';
import { AppCustomGridCellCheckboxComponent } from 'src/app/components';

@Component({
  selector: 'app-jpm-agency-config-grid-viewer',
  templateUrl: './jpm-agency-config-grid-viewer.component.html',
  styleUrls: ['./jpm-agency-config-grid-viewer.component.scss']
})
export class JpmAgencyConfigGridViewerComponent implements OnChanges {

  @Input() configData: any;

  // @Output() saveFundBucketRateOverride: EventEmitter<fromModels.IBucketRateUpdate> = new EventEmitter<fromModels.IBucketRateUpdate>();
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions = {
    defaultColDef: {
        suppressMenu: true,
        cellClass: 'right-border-light',
        headerClass: 'ag-header-wrap',
        filter: 'agTextColumnFilter',
        editable: false,
        enableCellChangeFlash: false,
        flex: 1
    },
    onCellValueChanged: (params) => this.onCellValueChanged(params),
    getRowNodeId: data => data['tba'],
    context: this,
    rowHeight: 20,
    rowClass:'medium-row',
    rowSelection: 'single',
    columnDefs: [
        { 
          headerName: 'TBA', 
          field: 'tba',
          width: 120,
          minWidth: 120,
          maxWidth: 120
        },
        { 
          headerName: 'Deliverable', 
          field: 'deliverable',
          editable: true,
          cellClass: 'yellow-cell right-border-light',
          width: 120,
          minWidth: 120,
          maxWidth: 120
        },
        { 
          headerName: 'Active', 
          field: 'active',
          width: 60,
          maxWidth: 60,
          minWidth: 60,
          editable: true,
          cellStyle: {paddingLeft: '0.3rem'},
          cellClass: 'yellow-cell right-border-light',
          cellEditor: 'agCheckboxCellEditor',
          cellRenderer: 'AppCustomGridCellCheckboxComponent', 
          cellRendererParams: { editable: true },
        },
    ],
    frameworkComponents:{
      'AppCustomGridCellCheckboxComponent': AppCustomGridCellCheckboxComponent
    }
  };
  
  constructor(private store: Store<fromStore.AgencyDeliverablesState>) { 
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.configData && changes.configData.currentValue && this.gridApi) {
      this.populateGridData();
    }
  }

  populateGridData() {
    this.gridApi.setRowData([])
    this.gridApi.setRowData(this.configData);
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.populateGridData();
  }

  onCellValueChanged(params:CellValueChangedEvent){
    let deliverableData = {
      tba: params.data.tba,
      deliverable: params.data.deliverable,
      active: params.data.active
    }
    this.store.dispatch(fromStore.updateDeliverableConfigData(deliverableData))
  }
}
