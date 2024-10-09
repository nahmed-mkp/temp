import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import * as fromModels from './../../models';

@Component({
  selector: 'app-pool-configuration-layout',
  templateUrl: './pool-configuration-layout.component.html',
  styleUrls: ['./pool-configuration-layout.component.scss']
})
export class PoolConfigurationLayoutComponent implements OnInit {

  @Output() closeSideNav = new EventEmitter<boolean>();
  @Input() globalSettings: fromModels.setting[];
  @Input() severitySettings: fromModels.setting[];
  @Input() calibrationSettings: fromModels.setting[];

  constructor() { }

  ngOnInit() { }

  onclose() {
    this.closeSideNav.emit(true);
  }
}
