import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-pool-scenario-picker-viewer',
  templateUrl: './pool-scenario-picker-viewer.component.html',
  styleUrls: ['./pool-scenario-picker-viewer.component.scss']
})
export class PoolScenarioPickerViewerComponent implements OnInit {

  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'Portfolio', field: 'Portfolio'},
      {headerName: 'Name', field: 'Name'},
      {headerName: 'Description', field: 'Description'},
      {headerName: 'ScenNam', field: 'ScenNam'},
      {headerName: 'RunDate', field: 'RunDate'},
      {headerName: 'SortOrder', field: 'SortOrder'},
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
