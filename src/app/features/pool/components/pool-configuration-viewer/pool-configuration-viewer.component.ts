import { Component, OnInit, Input } from '@angular/core';
import { GridOptions, RowNode } from 'ag-grid-community';

import * as fromModels from './../../models';
import { PoolConfigurationCustomCheckboxComponent } from './pool-configuration-custom-checkbox.component';

@Component({
  selector: 'app-pool-configuration-viewer',
  templateUrl: './pool-configuration-viewer.component.html',
  styleUrls: ['./pool-configuration-viewer.component.scss']
})
export class PoolConfigurationViewerComponent implements OnInit {

  @Input() globalSettings: fromModels.setting[];
  @Input() severitySettings: fromModels.setting[];
  @Input() calibrationSettings: fromModels.setting[];


  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'KeyAsString', field: 'keyAsString', cellClass: 'right-border'},
      {headerName: 'Value', field: 'value', cellClass: ['column-highlight-yellow','right-border']},
      {headerName: 'Ch', field: 'Ch', width: 31, suppressMenu: true, cellClass: ['no-border', 'right-border', 'custom-checkbox'], cellRenderer: 'poolConfigurationCustomCheckboxComponent'},
      {headerName: 'Type', field: 'type', width: 80},
    ],

    frameworkComponents: {
      poolConfigurationCustomCheckboxComponent: PoolConfigurationCustomCheckboxComponent
    },
    
    context: {componentParent: this}
  }

  constructor() {}

  ngOnInit() {}

  toggleValue(node: RowNode) {
    if(node.data.value === 'True') node.setDataValue('value', 'False');
    else node.setDataValue('value', 'True');
  }
}
