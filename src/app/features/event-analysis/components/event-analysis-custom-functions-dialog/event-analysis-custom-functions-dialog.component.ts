import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import * as fromModels from './../../models';
import * as fromStore from './../../store';


@Component({
  selector: 'app-event-analysis-custom-functions-dialog',
  templateUrl: './event-analysis-custom-functions-dialog.component.html',
  styleUrls: ['./event-analysis-custom-functions-dialog.component.scss']
})
export class EventAnalysisCustomFunctionsDialogComponent implements OnInit {

  public customFunctions$: Observable<{description: string; name: string; params: string;}[]>
  public displayedColumns = ['name', 'params', 'description'];

  constructor(
    private store: Store<fromStore.EventAnalysisState>,
    public dialogRef: MatDialogRef<EventAnalysisCustomFunctionsDialogComponent>) {}

  ngOnInit() {
    this.customFunctions$ = this.store.select(fromStore.getCustomFunctionSetEntities);
  }

  onClose() {
    this.dialogRef.close();
  }
}
