import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';

@Component({
  selector: 'app-event-analysis-result-popup',
  templateUrl: './event-analysis-result-popup.component.html',
  styleUrls: ['./event-analysis-result-popup.component.scss']
})
export class EventAnalysisResultPopupComponent implements OnInit {

  public activeConfiguration$: Observable<fromModels.Configuration>;
  public activeMarketDataGridFormated$: Observable<any>;
  public activeEventAnalysisStatisticData$: Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<EventAnalysisResultPopupComponent>,
              private store: Store<fromStore.EventAnalysisState>, ) { }

  ngOnInit() {
    // Analytical Data loading -----------------------------------
    this.activeConfiguration$ = this.store.select(fromStore.getActiveConfigurationSetting);
    this.activeMarketDataGridFormated$ = this.store.select(fromStore.getActiveEventAnalysisMarketDataGridFormated);
    this.activeEventAnalysisStatisticData$ = this.store.select(fromStore.getActiveEventAnalysisStatisticData);
  }

  onClose() {
    this.dialogRef.close();
  }

}
