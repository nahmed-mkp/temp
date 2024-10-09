import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import * as fromModels from './../../models';

@Component({
  selector: 'app-scenario-generator-layout',
  templateUrl: './scenario-generator-layout.component.html',
  styleUrls: ['./scenario-generator-layout.component.scss']
})
export class ScenarioGeneratorLayoutComponent implements OnInit {

  @Input() defaultScenarios: fromModels.defaultScenario[]
  @Output() closeSideNav = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  onclose() {
    this.closeSideNav.emit(true);
  }
}
