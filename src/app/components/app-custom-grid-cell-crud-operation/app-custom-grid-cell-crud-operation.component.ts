import { Component, OnInit, HostBinding } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-app-custom-grid-cell-crud-operation',
  templateUrl: './app-custom-grid-cell-crud-operation.component.html',
  styleUrls: ['./app-custom-grid-cell-crud-operation.component.scss']
})
export class AppCustomGridCellCrudOperationComponent implements ICellRendererAngularComp {

  @HostBinding('style.width') private width = '100%';
  @HostBinding('style.justify-content') private justifyContent = 'flex-end';

  public params: any;
  public basicMode: boolean;

  agInit(params: any): void {
    this.params = params;
    this.basicMode = params.basicMode;
  }

  refresh(): boolean {
    return false;
  }

  onSave() {
    this.params.onSave(this.params.node);
  }

  onAdd() {
    this.params.onAdd(this.params.node);
  }

  onAddCopy() {
    this.params.onAddCopy(this.params.node);
  }

  onDelete() {
    this.params.onDelete(this.params.node);
  }
}
