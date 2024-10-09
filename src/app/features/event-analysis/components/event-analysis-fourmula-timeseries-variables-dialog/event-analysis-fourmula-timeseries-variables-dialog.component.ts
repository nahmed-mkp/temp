import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { GridApi, GridOptions } from 'ag-grid-community';


@Component({
  selector: 'app-event-analysis-fourmula-timeseries-variables-dialog',
  templateUrl: './event-analysis-fourmula-timeseries-variables-dialog.component.html',
  styleUrls: ['./event-analysis-fourmula-timeseries-variables-dialog.component.scss']
})
export class EventAnalysisFourmulaTimeseriesVariablesDialogComponent implements OnInit {

  private gridApi: GridApi;
  
  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'Name', field: 'name', editable: true},
      {headerName: 'Value', field: 'value', editable: true},
    ],

    getContextMenuItems: (params) => {
      const deleteAction = {
        name: 'Delete',
        action: () => {
          this.gridApi.updateRowData({
            remove: [params.node.data]
          })
        }
      }
      return ['copy', 'copyWithHeaders', 'separator', deleteAction]
    },

    stopEditingWhenGridLosesFocus: true
  }
  public extraOption = {
    sizeColumnsToFit: true,
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EventAnalysisFourmulaTimeseriesVariablesDialogComponent>) 
  {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }

  onAddVariable() {
    const newVariable = {name: undefined, value: undefined};
    this.gridApi.updateRowData({
      add: [newVariable],
      addIndex: 0,
    });
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: 'name'
    })
  }

  onSaveVariables() {
    const variablesSetup = [];
    this.gridApi.forEachNode((node, index) => {
      variablesSetup.push(node.data);
    });
    this.dialogRef.close(variablesSetup);
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
  }

}
