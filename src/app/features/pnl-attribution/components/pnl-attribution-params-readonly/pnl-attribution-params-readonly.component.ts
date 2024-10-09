import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from './../../models';

@Component({
  selector: 'app-pnl-attribution-params-readonly',
  templateUrl: './pnl-attribution-params-readonly.component.html',
  styleUrls: ['./pnl-attribution-params-readonly.component.scss']
})
export class PnlAttributionParamsReadonlyComponent implements OnInit {

  @Input() request: fromModels.IAttributionRequest;
  @Input() gridDisplayMode: any;
  @Input() layoutNames: string[] = [];

  @Output() changeGridDisplayMode = new EventEmitter<any>(); 
  @Output() selectedLayout = new EventEmitter<{layoutName: string; openNewTab: boolean}>();

  constructor() { }

  ngOnInit() {}

  public onChangeDisplayCopy(targetKey: string, targetKey2?: string) {
    let updateDisplayMode = {
        [targetKey]: !this.gridDisplayMode[targetKey]
    };
    if (targetKey2) {
        updateDisplayMode = {...updateDisplayMode, [targetKey2]: !this.gridDisplayMode[targetKey2]}
    }
    this.changeGridDisplayMode.emit(updateDisplayMode);
}

  public onSelectNewlayout(event, layoutName: string, openNewTab: boolean) {
    event.stopPropagation();
    this.selectedLayout.emit({layoutName, openNewTab});
  }

}
