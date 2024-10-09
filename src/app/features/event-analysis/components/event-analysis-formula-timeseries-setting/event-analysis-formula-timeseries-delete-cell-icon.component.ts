import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-event-analysis-cell-delete-icon',
  template: `<span class="icon-cell">
                <i class='material-icons' style='color: #f44336; cursor: pointer' (click)="delete()">Close</i>
              </span>`,
})
export class EventAnalysisCellDeleteIconComponent implements ICellRendererAngularComp {
  public visible = true;
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    // this.params.context.componentParent.toggleValue(this.params.node);
  }

  delete() {
    this.params.context.onDeleteTimeseriesFormula(this.params.data);
  }

  refresh(): boolean {
    return false;
  }
}
