import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pool-scenario-picker-layout',
  templateUrl: './pool-scenario-picker-layout.component.html',
  styleUrls: ['./pool-scenario-picker-layout.component.scss']
})
export class PoolScenarioPickerLayoutComponent implements OnInit {

  @Output() closeSideNav = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onclose() {
    this.closeSideNav.emit(true);
  }

}
