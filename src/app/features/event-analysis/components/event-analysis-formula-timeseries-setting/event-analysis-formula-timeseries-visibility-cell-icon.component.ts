import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-event-analysis-cell-visibility-icon',
  template: `<span class="icon-cell">
                <i *ngIf="visible" class='material-icons' 
                  style='color: #3f51b5; cursor: pointer' (click)="toggle()">visibility</i>
                <i *ngIf="!visible" class='material-icons' 
                  style='color: #3f51b5; opacity: 0.3; cursor: pointer' (click)="toggle()">visibility_off</i>
              </span>`,
})
export class EventAnalysisCellVisibilityIconComponent implements ICellRendererAngularComp {
  public visible: boolean;
  public params: any;

  agInit(params: any): void {
    this.params = params;

    if (this.params.data.alias !== undefined) {
      this.visible = this.params.context.visibilityInEventPlot[this.params.data.alias];
      if (this.visible === undefined) {
        // newly created timeseries in configuration
        this.visible = true;
        this.params.context.onToggleVisibility({
          [this.params.data.alias]: this.visible
        });
      }
    } else {
      // setting the visible icon to be true when new line created
      this.visible = true;
    }
  }

  public invokeParentMethod() {
    // this.params.context.componentParent.toggleValue(this.params.node);
  }

  toggle() {
    this.visible = !this.visible;
    this.params.context.onToggleVisibility({
      [this.params.data.alias]: this.visible
    });
  }

  refresh(): boolean {
    return false;
  }
}
