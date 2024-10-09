import { Component } from '@angular/core';

@Component({
    selector: 'app-execution-tagging-delete-cell-renderer',
    template: `<span 
                  *ngIf='isDataRow' 
                  class="material-icons" 
                  style="font-size:20px;margin-top:0.5rem;margin-left:1rem; cursor:pointer"
                >
                  delete_forever
                </span>`
})

export class ExecutionTaggingDeleteCellRendererComponent {

    isDataRow: boolean = false;

    agInit(params: any): void {
        this.isDataRow = params.data['ReasonId'] ? true : false;
    }

}
