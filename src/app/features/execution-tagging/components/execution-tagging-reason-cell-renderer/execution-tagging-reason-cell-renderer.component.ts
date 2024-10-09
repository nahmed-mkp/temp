import { Component, OnInit, HostBinding } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as fromModels from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
@Component({
    selector: 'app-execution-tagging-reason-cell-renderer',
    templateUrl: './execution-tagging-reason-cell-renderer.component.html',
    styleUrls: ['./execution-tagging-reason-cell-renderer.component.scss']
})
export class ExecutionTaggingReasonCellRenderer {


    public params: any;
    public reasons: fromModels.IReason[];
    public groups: any[] = [];
    public reasonsByGroup: any[] = [];
    public value = -1

    public reason$: Observable<fromModels.IReason[]>;

    constructor(store: Store<fromStore.ExecutionTaggingState>) {
      this.reason$ = store.select(fromStore.getReasons);
      this.reason$.subscribe(reasons => {
        if (reasons) {
          this.createParamGroups(reasons)
        }
      })
    }

    agInit(params: any): void {
      this.params = params;
      this.value = params.node.data['ReasonId']
      this.createParamGroups(params.reasons)
    }

    createParamGroups(reasons: fromModels.IReason[]) {
      this.groups = [];
      this.reasonsByGroup = [];

      reasons.map( reason => {
        if(!this.groups.includes(reason.UsedBy)){
          this.groups.push(reason.UsedBy)
        }
      })

      this.groups.map( group => {
        let filteredReasons = [...reasons].filter( reason => reason.UsedBy === group)
        this.reasonsByGroup.push({group: group, reasons: filteredReasons})
      })
    }

    onSelectionChanged(event) {

      let payload: fromModels.ITagsUpdateReq = {
        orderId: this.params.node.data['OrderId'],
        reasonId: null,
        enteredBy: null
      }

      if(event.value !== -1){
        let currUser = JSON.parse(localStorage.getItem('currentUser'))
        payload.reasonId = event.value
        payload.enteredBy = currUser['ntName']
      }

      this.params.onTagSelectionChanged(payload);
    }

}
