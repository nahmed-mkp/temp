import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

import * as fromModels from './../../models';

@Component({
  selector: 'app-scenario-generator-viewer',
  templateUrl: './scenario-generator-viewer.component.html',
  styleUrls: ['./scenario-generator-viewer.component.scss']
})
export class ScenarioGeneratorViewerComponent implements OnInit {

  @Input() defaultScenarios: fromModels.defaultScenario[]

  public customGridOptionForCusips: GridOptions = {
    columnDefs: [
      {headerName: 'Cusip', field: 'Cusip'},
      {headerName: 'GivenType', field: 'GivenType'},
      {headerName: 'GivenValue', field: 'GivenValue'},
      {headerName: 'Notional', field: 'Notional'},
      {headerName: 'ReportGroup', field: 'ReportGroup'},
    ]
  }

  public customGridOptionForScenarios: GridOptions = {
    columnDefs: [
      {headerName: 'Name', field: 'name', cellClass: 'column-highlight-yellow', checkboxSelection: true},
      {headerName: 'Category', field: 'category', cellClass: 'column-highlight-yellow'},
      {headerName: 'ScenarioDescription', field: 'scenarioDescription', cellClass: 'column-highlight-yellow'},
      {headerName: 'Description', field: 'description', cellClass: 'column-highlight-yellow'},
      {headerName: 'ScenName', field: 'scenName'},
      {headerName: 'HPI', field: 'HPI'},
      {headerName: 'HPIStar', field: 'HPIStar'},
      {headerName: 'givenCurve', field: 'givenCurve'},
      {headerName: 'prepayRate', field: 'prepayRate'},
      {headerName: 'prepayCurve', field: 'prepayCurve'},
      {headerName: 'defaultCurve', field: 'defaultCurve'},
      {headerName: 'defaultRate', field: 'defaultRate'},
      {headerName: 'severityRate', field: 'severityRate'},
      {headerName: 'severityCurv', field: 'severityCurv'},
      {headerName: 'delinqRate', field: 'delinqRate'},
      {headerName: 'DelinqCurve', field: 'DelinqCurve'},
      {headerName: 'wacDeter', field: 'wacDeter'},
      {headerName: 'delin', field: 'delin'},
      {headerName: 'OptionRede', field: 'OptionRede'},
      {headerName: 'recoveryLa', field: 'recoveryLa'},
      {headerName: 'extension', field: 'extension'},
      {headerName: 'addOnScen', field: 'addOnScen'},
      {headerName: 'reinvestPric', field: 'reinvestPric'},
      {headerName: 'stepAmount', field: 'stepAmount'},
      {headerName: 'stepSize', field: 'stepSize'},
      {headerName: 'isStressSce', field: 'isStressSce'},
    ]
  }

  // public extraOption = {
  //   autoSizeColumns: true
  // }

  constructor() { }

  ngOnInit() {
  }

}
