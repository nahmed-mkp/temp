import { Component } from '@angular/core';

@Component({
    selector: 'app-scenario-analysis-delete-cell-renderer',
    template: `<span *ngIf='isDataRow'  class="material-icons" style="font-size:20px;margin-top:5px;">delete_forever</span>`
})

export class ScenarioAnalysisDeleteCellRendererComponent {

    isDataRow: boolean = false;

    agInit(params: any): void {
        this.isDataRow = params.node.id === '<Choose Client Theme>' || params.node.id === '<Enter SID>' ? false : true;
    }

}
