import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy, Input } from '@angular/core';
import { GridOptions, CellEditingStoppedEvent, GridApi } from 'ag-grid-community';
import uuidv1 from 'uuid/v1';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';

@Component({
  selector: 'app-event-analysis-archive-records-viewer',
  templateUrl: './event-analysis-archive-records-viewer.component.html',
  styleUrls: ['./event-analysis-archive-records-viewer.component.scss']
})
export class EventAnalysisArchiveRecordsViewerComponent implements OnInit, OnDestroy {

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  @Input() analysesRecords: fromModels.TimeseriesAnalysis[];
  @Output() addNewAnalysis: EventEmitter<fromModels.TimeseriesAnalysis> 
    = new EventEmitter<fromModels.TimeseriesAnalysis>();
  @Output() updateAnalysisRecord: EventEmitter<fromModels.TimeseriesAnalysis> 
    = new EventEmitter<fromModels.TimeseriesAnalysis>();
  @Output() deleteAnalysisRecord: EventEmitter<fromModels.TimeseriesAnalysis> 
    = new EventEmitter<fromModels.TimeseriesAnalysis>();
  @Output() loadConfiguration: EventEmitter<string>
    = new EventEmitter<string>();

  private gridApi: GridApi;

  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'Title', field: 'name', filter: 'agTextColumnFilter', checkboxSelection: true, editable: true},
      {headerName: 'Description', field: 'description', filter: 'agTextColumnFilter', editable: true},
      {headerName: 'Created By', field: 'createdBy', filter: 'agTextColumnFilter'},
      {headerName: 'Create On', field: 'createdOn', filter: 'agTextColumnFilter', valueFormatter: (params) => {
        let date = new Date(params.value);
        return date.toLocaleDateString();
      }},
    ],
    floatingFilter: true,

    getContextMenuItems: (params) => {
      const deleteAction = {
        name: 'Delete',
        action: () => {
          this.onDeleteAnalysisRecord(params.node.data)
        }
      }

      return ['copy', 'copyWithHeaders', 'separator', deleteAction]
    },

    onCellEditingStopped: this.onUpdateAnalysisRecord.bind(this)
  }
  public extraOption = {
    sizeColumnsToFit: true
  }

  public newAnalysis: fromModels.TimeseriesAnalysis = {
    guid: null,
    name: null,
    description: null,
  }
  public activeGuid: string;
  public quickFilterValue: string;

  private subscription: Subscription;


  constructor(private store: Store<fromStore.EventAnalysisState>) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.subscription = this.store.select(fromStore.getActiveGuid).subscribe(guid => {
      if(guid) this.activeGuid = guid;
    })
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

  onCloseNewDialsSetMenu(): void {
    this.menuTrigger.closeMenu();
  }

  beginCreateNewAnalysis() {
    const date = new Date()
    this.newAnalysis = {
      guid: uuidv1(),
      name: null,
      description: null,
      //createdOn: date.toLocaleDateString(),
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api
  }

  // CRUD --------------------------

  onSaveNewAnalysis() {
    this.addNewAnalysis.emit(this.newAnalysis);
    this.onCloseNewDialsSetMenu();
  }

  onDeleteAnalysisRecord(record: fromModels.TimeseriesAnalysis) {
    this.deleteAnalysisRecord.emit(record);
  }

  onUpdateAnalysisRecord(event: CellEditingStoppedEvent) {
    const updatedRecord = event.data;
    delete updatedRecord.createdOn;
    this.updateAnalysisRecord.emit(updatedRecord);
  }

  // Ui Function ------------------------------

  onTriggerAnalysis() {
    const selectedRow = this.gridApi.getSelectedRows();
    if(selectedRow.length > 0) {
      this.loadConfiguration.emit(selectedRow[0].guid);
    }
  }

  onQuickFiltering() {
    this.gridApi.setQuickFilter(this.quickFilterValue);
  }

}
