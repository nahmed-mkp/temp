import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from '../../models/error.models';

@Component({
  selector: 'app-app-error-report-panel',
  templateUrl: './app-error-report-panel.component.html',
  styleUrls: ['./app-error-report-panel.component.scss']
})
export class AppErrorReportPanelComponent implements OnInit {

  @Input() errorCollection: fromModels.HttpError[];

  @Output() clearAll = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClearAll() {
    this.clearAll.emit();
  }

}
